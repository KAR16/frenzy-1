/*****  GLOBAL LISTS  *****/
var displayNoneInline = []
var colorIconsFoother = []
var pix = "170px"
/*****  CONTROLLERS  *****/
angular.module('starter.controllers', ['ionic'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {
	// Form data for the login modal
	$scope.loginData = {};
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};
	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		// Simulate a login delay. Removee this and replace with your login code if					 using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
})
// -------------------- LOGIN WITHOUT FACEBOOK ------------------------
// ******************* REGISTER FACEBOOK *******************
.controller('RegisterController', function($scope, $state, $ionicLoading, $rootScope) {
    $scope.user = {};
    $scope.error = {};
    // Object styles for Option Gender Button to Register Account
    $scope.genderMaleBStyle = {};
    $scope.genderFemaleleBStyle = {};
    // Gender variable for to save in Parse
    $scope.optionGender = '';

    $scope.genderMaleStyle= function(){
    	$scope.genderMaleBStyle = {'background-color':'#48D1CC'};
    	$scope.genderFemaleleBStyle = {};
    	$scope.optionGender = 'male';
    }

	$scope.genderFemaleleStyle= function(){
    	$scope.genderFemaleleBStyle = {'background-color':'#48D1CC'};
    	$scope.genderMaleBStyle = {};
    	$scope.optionGender = 'female';
    }
	$scope.Alert = function () {
			if ($scope.user.email == undefined ) {
					sweetAlert('Lo sentimos', 'El campo de correo electrónico no puede estar vacío. Intentelo nuevamente', 'error');
			}else if($scope.user.password == undefined) {
					sweetAlert('Lo sentimos', 'Debe ingresar una contraseña para poder continuar. Intentelo nuevamente', 'error');
			}else {
				$scope.ValidarEmail = "none"
				$scope.Validarpassword = "none"
				$scope.register()
			}
	}
    $scope.register = function() {
			var dateBirthday = $scope.user.birthday;
			if (dateBirthday) {
	//			alert("tiene algo ")
					dateBirthday = dateBirthday.toLocaleDateString()
			}
        // TODO: add age verification step
        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = new Parse.User();
        user.set("username", $scope.user.email);
        user.set("password", $scope.user.password);
        user.set("email", $scope.user.email);
        user.set("birthday", dateBirthday);
        user.set("gender",$scope.optionGender);

        user.signUp(null, {
            success: function(user) {
                $ionicLoading.hide();
                $rootScope.user = user;
                $rootScope.isLoggedIn = true;
                $state.go('login', {

                    clear: true
                });
								Parse.User.logOut();
								/* Alert for validate email */
								swal({
										title: "Bien Hecho!",
										text: "Se envió una confirmación a tu correo electrónico, asegúrate de verificar en la Bandeja de Correo no Deseado si no lo encuentras...",
										type: 'success',
										timer: 3000,
										/* Button ok disable */
										showConfirmButton: false
								});
            },
            error: function(user, error) {
                $ionicLoading.hide();
                if (error.code === 125) {
                    $scope.error.message = 'Please specify a valid email ' + 'address';
										sweetAlert('Atención','Por favor indique una dirección de correo electrónico válida.');
                } else if (error.code === 202) {
                    $scope.error.message = 'The email address is already ' + 'registered';
										sweetAlert('Vaya! parece que hay un error...','La dirección de correo electrónico ya está registrado.','warning')
                } else {
                    $scope.error.message = error.message;
										console.log(error.message)
                }
                $scope.$apply();
            }
        });
    };
})

// ************************ LOGIN WITHOUT FACEBOOK **********************************
.controller('LoginController', function($scope, $state, $rootScope, $ionicLoading) {
		Parse.Cloud.run('verifyFinalizedPromotions',{}, {
			success: function(result) {
				//result is 'Hello world!'
				console.log(result)
			},
				error: function(error) {
				console.log(error)
			}
		});

		Parse.Cloud.run('verifyFinalizedCoupons',{}, {
			success: function(result) {
				//result is 'Hello world!'
				console.log(result)
			},
				error: function(error) {
				console.log(error)
			}
		});

		$scope.user = {
        username: null,
        password: null
    };

    $scope.error = {};
		$scope.currentUser = Parse.User.current();
		// ******* LOGIN VALIDATION *******

		if ($scope.currentUser != null ){
		     if ($scope.currentUser["attributes"].authData != undefined) {
		            IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id);
		            viewPromotion();
		            $state.go('app.playlists');
		     } else {
		            IdUsuario = String($scope.currentUser.id);
		            viewPromotion();
		            $state.go('app.playlists');
		     }

		}
		$scope.forgot = function() {
			$scope.userChoice = prompt("Enter your email")
			$scope.loading = $ionicLoading.show({
					content: 'Sending',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
			});

			Parse.User.requestPasswordReset($scope.userChoice, {
					success: function() {
							// TODO: show success
							$ionicLoading.hide();
							$scope.$apply();
					},
					error: function(err) {
							$ionicLoading.hide();
							if (err.code === 125) {
									$scope.error.message = 'La dirección de correo electrónico no existe';
									sweetAlert('Ha ocurrido un Error', 'La direccón de correo electrónico no existe', 'error');
							} else {
									$scope.error.message = 'Ha ocurrido un Error, ' + 'Por favor intentelo nuevamente';
											sweetAlert('Ha ocurrido un Error', 'Por favor intentelo nuevamente', 'error');
							}
							$scope.$apply();
					}
			});
		};

    $scope.login = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Logging in',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = $scope.user;
        Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
					success: function(user) {
						if (user.attributes.emailVerified == false) {
							$ionicLoading.hide();
							$rootScope.user = user;
							$rootScope.isLoggedIn = true;
							sweetAlert('Atención', 'Aún no se ha confirmado su correo', 'warning');
						}else {
							$ionicLoading.hide();
							$rootScope.user = user;
							$rootScope.isLoggedIn = true;
							IdUsuario = String($rootScope.user.id);
							viewPromotion();
							$state.go('app.playlists', {
							clear: true
							});
						}

					},
            error: function(user, err) {
                $ionicLoading.hide();
                // The login failed. Check error to see why.
                if (err.code === 101) {
                    sweetAlert('Lo sentimos', 'Verifica los datos ingresados', 'error');
                } else {
                    sweetAlert('Lo sentimos', 'Ha ocurrido un error. Intentalo nuevamente', 'error');
                }
                $scope.$apply();
            }
        });
    };

})

// ********************* PAGE_START CONTROLLER ****************************
.controller('CategoryCtrl', function($scope, $ionicLoading) {
	var dimensions = {
		name: 'categoriesMenu'
	};
	Parse.Analytics.track("view", dimensions);

	// Loading scope
	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
	});
	CategoryListName = [];
	var query = new Parse.Query('AppCategory');
	query.each(function(results) {
				CategoryListName.push(results.attributes)
	}).then(function() {
		ReloadFavorite()
	}).then(function() {

		$ionicLoading.hide();
		$('.pageStartBoxPurple').show();
		$('.flechitas').show();
	});
	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
  		setTimeout(function() {
		$scope.$apply(function() {
			$scope.categorys = CategoryListName
		});
	}, 0);
      colorIconsFoother = []
     colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','','Z','','none','none']);
  });
})
// ******************** OUR FAVORITES CONTROLLER **************************
.controller('OurfavoritesCtrl', function($scope, OurFavorites,$ionicLoading) {
/*************************************************/

		$scope.reload = function () {
		    var PromoSavess = new Parse.Query('PromotionSaved')
		    PromoSavess.equalTo("UserID", IdUsuario);
		    PromoSavess.find({

				success: function(results) {
						viewFavorite()
					for (a in results[0].attributes.PromotionID){
						for (b in CurrentPromotion){
							if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
								if (CurrentPromotion[b].ColorPin === "silver") {
									CurrentPromotion[b].ColorPin  = "purple";
								}
							}else {
								CurrentPromotion[b].ColorPin  = "silver";
							}
						}
					}
				},
				error: function(myObject, error) {
					// Error occureds
					console.log( error );
				}
			});
		}

	$scope.SalvadosSaveAndDelete = function (id) {
        var NamePromo = id
        var NameUser = String(IdUsuario)
				console.log(NameUser);
        var Dimensions = {
          name: 'FavoritePin_'+NamePromo,
          user: NameUser
        };
        Parse.Analytics.track("pin", Dimensions);
        var pin = document.getElementById(id).style.color;
        if (pin == "silver") {
            document.getElementById(id).style.color = "purple";
            SavePromotion(IdUsuario, id)
            // $scope.reload()
        } else {
            document.getElementById(id).style.color = "silver";
            DeletePromotion(IdUsuario, id)
          //  $scope.reload()
        }
      //  $scope.reload()
    }
	/**************************************************/

	var dimensions = {
		name: 'frenzyFavorites',
	};
$scope.display = OurFavorites.all();

	Parse.Analytics.track("view", dimensions);
			$scope.ourFavorites = OurFavorites.all();
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {

			//	$ionicLoading.hide();
        colorIconsFoother = []
      colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','','Z','','none']);
    });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, AllFavorite) {
	/*************************************************/

		$scope.reload = function () {
		    var PromoSavess = new Parse.Query('PromotionSaved')
		    PromoSavess.equalTo("UserID", IdUsuario);
		    PromoSavess.find({
				success: function(results) {
					viewFavorite()
					for (a in results[0].attributes.PromotionID){
						for (b in CurrentPromotion){
							if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
								if (CurrentPromotion[b].ColorPin === "silver") {
									CurrentPromotion[b].ColorPin  = "purple";
								}
							}else {
								CurrentPromotion[b].ColorPin  = "silver";
							}
						}
					}
				},
				error: function(myObject, error) {
					// Error occureds
					console.log( error );
				}
			});
		}

	$scope.SalvadosSaveAndDelete = function (id) {
        var NamePromo = id
        var NameUser = String(IdUsuario)
        var Dimensions = {
          name: 'FavoritePin_'+NamePromo,
          user: NameUser
        };
        Parse.Analytics.track("pin", Dimensions);
        var pin = document.getElementById(id).style.color;
        if (pin == "silver") {
            document.getElementById(id).style.color = "purple";
            SavePromotion(IdUsuario, id)
          //  $scope.reload()
        } else {
            document.getElementById(id).style.color = "silver";
            DeletePromotion(IdUsuario, id)
          //  $scope.reload()
        }
      //  $scope.reload()
    }
	/**************************************************/
	var dimensions = {
		name: 'userFavorites',
	};
	Parse.Analytics.track("view", dimensions);

	$scope.$on('$ionicView.enter', function() {
		$scope.chats = AllFavorite.all();
	});
	$scope.getAllFavorites = function() {};
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
       colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','','Z','','none']);
    });
})
// *************************** SAVED CONTROLLER ***************************
.controller('AllPromotionCtrl', function($scope, $stateParams, AllPromotion) {
	var NameUser = String(IdUsuario)
	var dimensions = {
		name: 'Salvados',
		user: NameUser
	};
	Parse.Analytics.track("view", dimensions);

	$scope.reload = function () {

	}


	// ************ DELETE AND SAVE PIN ************
	$scope.SalvadosSaveAndDelete = function (id) {
		var NamePromo = id
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'FavoritePin_'+NamePromo,
		  user: NameUser
		};
		Parse.Analytics.track("pin", Dimensions);
		var pin = document.getElementById(id).style.color;
		if (pin == "silver") {
			document.getElementById(id).style.color = "purple";
			SavePromotion(IdUsuario, id)
			// $scope.reload()
		} else {
			document.getElementById(id).style.color = "silver";
			DeletePromotion(IdUsuario, id)
		//	$scope.reload()
		}
	//	$scope.reload()
	}

	$scope.$on('$ionicView.enter', function() {
		$scope.chats = AllPromotion.all($stateParams.salvadosId);
	});
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
      colorIconsFoother.push(['#A7A9AC','#A7A9AC','#9C28B0','#A7A9AC','','Z','','none']);
    });
})
//********************** Customer CONTROLLER *****************************
.controller('changeColorHeartCtrl', function($scope, $ionicLoading,$stateParams,CustomerAll) {
	$scope.UrlC = function (id) {
		console.log(id);
		var resultSetCs = $.grep(CustomerList, function (e) {
			 return e.NameCategory.indexOf(id) == 0;
		});

		var promotionPage = "#/app/ofertas/"
		var couponPage="#/app/cupones/";

		// Validate if doesn't existing a promotion then redirection to coupons page. 	location.href=couponPage
		if (resultSetCs[0].promo > 0  &&  resultSetCs[0].coupon > 0) {
				location.href=promotionPage+id
		}else if (resultSetCs[0].promo > 0) {
				location.href=promotionPage+id
		}else if( resultSetCs[0].coupon > 0){
			location.href=couponPage+id
		}else {
				location.href=promotionPage+id
		}
	}
	/************ FUNCTION CHANGE COLOR HEART  **********/
	$scope.ChangeColorHeart = function (parametro, category) {
		console.log(category);
		var NamePromo = category
		var NameUser = String(IdUsuario)
		var Dimensions = {
			name: 'Heart_'+NamePromo,
			user: NameUser
		};

		var cssColor = document.getElementById(parametro+" "+category).style.color;
		if (cssColor == "white") {
			document.getElementById(parametro+" "+category).style.color = "red";
			SaveFavorite(IdUsuario, category)
				Parse.Analytics.track("AddHeart", Dimensions);
		} else {
			document.getElementById(parametro+" "+category).style.color = "white";
				Parse.Analytics.track("DelHeart", Dimensions);
			DeleteFavorite(IdUsuario, category)
		}
	};

})
.controller('CustomerCtrl', function($scope, $ionicLoading,$stateParams,CustomerAll) {
	var Direc = [{name:"Supermercado",name2:"supermarketMenu"},{name:"Restaurantes",name2:"restaurantMenu"},{name:"Otros",name2:"otherMenu"},{name:"Electrónicos",name2:"entertainmentMenu"},{name:"Moda",name2:"fashionMenu"},{name:"Entretenimiento",name2:"entertainmentMenu"}]
	var DirecParse = $.grep(Direc, function (e) {
		 return e.name.indexOf($stateParams.IDcustomer) == 0;
	});
	console.log(DirecParse[0].name2);
	var dimensions = {
		name: DirecParse[0].name2
	};

		Parse.Analytics.track("view", dimensions);
	// Loading scope
	$scope.AppCategory = $stateParams.IDcustomer
	$scope.loading = $ionicLoading.show({
      noBackdrop: true,
      template: '<ion-spinner customer1lass="spinner" icon="lines" class = "Loading'+$scope.AppCategory+'"></ion-spinner>'
  });

	/************ FUNCTION CHANGE COLOR HEART  **********/
	$scope.changeColorHeart = function (parametro, category) {
		var cssColor = document.getElementById(parametro+" "+category).style.color;
		if (cssColor == "white") {
			document.getElementById(parametro+" "+category).style.color = "red";
			SaveFavorite(IdUsuario, category)
		} else {
			document.getElementById(parametro+" "+category).style.color = "white";
			console.log(category);
			DeleteFavorite(IdUsuario, category)
		}
	};

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
  		setTimeout(function() {
		$scope.$apply(function() {
			$scope.chats = CustomerAll.all($stateParams.IDcustomer);
			$ionicLoading.hide();
		});
	}, 1000);
      colorIconsFoother = []
    colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.AppCategory,'','none',]);
  });
})
// *************************  OFFERS CONTROLLER	***************************
.controller('currentPromotionCtrl', function($scope, $stateParams, currentPromotion ,$ionicPopover, $ionicPopup, $timeout, $ionicLoading) {
	var dimensions = {
		name: $stateParams.superId,
	};

	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'hello';
	});
	// Pixels quantity of Popover for height div
	$scope.pix = currentPromotion.get($stateParams.superId);
//	console.log($scope.pix);
	$scope.pixels = $scope.pix[1][0].pixels;


	$scope.reload = function () {
	    var PromoSavess = new Parse.Query('PromotionSaved')
	    PromoSavess.equalTo("UserID", IdUsuario);
	    PromoSavess.find({
			success: function(results) {
				viewFavorite()
				for (a in results[0].attributes.PromotionID){
					for (b in CurrentPromotion){
						if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
							if (CurrentPromotion[b].ColorPin === "silver") {
								CurrentPromotion[b].ColorPin  = "purple";
							}
						}else {
							CurrentPromotion[b].ColorPin  = "silver";
						}
					}
				}
			},
			error: function(myObject, error) {
				// Error occureds
				console.log( error );
			}
		});
	}

	// ************ FUNCTION CHANGE COLOR PIN OFFERTS ************
	$scope.changeColorPinOfferts = function (id, IDPromotion,Namepromotion) {
		var NamePromo = Namepromotion
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'PromotionPin_'+NamePromo,
		  user: NameUser
		};
		Parse.Analytics.track("pin", Dimensions);
		var cssColorpinOfferts = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOfferts == "silver") {
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
			SavePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
	    //viewPromotion()
		} else {
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
			DeletePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
	    //viewPromotion()
		}
	//$scope.reload()
	};
	// *********** FUNCTION CHANGE COLOR PIN OFFERTS WITHOUT IMAGE **********
	$scope.changeColorPinOffertsWithoutImage = function (id, IDPromotion) {
		var cssColorpinOffertsWithoutImage = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOffertsWithoutImage == "silver") {
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
			SavePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
		} else {
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
			DeletePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
		}
	};
	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell,name){
		var NameUser = String(IdUsuario);
		var Dimensions = {
			name: 'Promotion_call'+name,
			user: NameUser
		};

		Parse.Analytics.track("CallsPromotion", Dimensions);
		var a = cell.toString();
		var b = 'tel:'
		var callPhone = b + a;

		window.open(callPhone)

	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url,id,name){
		var NamePromo = name.split(" ").join("_")
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'Promotion_'+NamePromo+"_"+id,
		  user: NameUser
		};
		if (id == "web") {
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("WebShopPromotion", Dimensions);
		}else {
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("cartShopPromotion", Dimensions);
		}

	}
	// *************** PROMOTIONS FUNCTION ***************
	$scope.Promotions =function (id){
		PromoSave.find({
			success: function(results) {
				for (x in results) {
					if (results[x].attributes.UserID === IdUsuario){
						for (a in results[x].attributes.PromotionID){
							for (b in CurrentPromotion){
								if (results[x].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion && id === CurrentPromotion[b].Category){
									var cssColorpinOffer = document.getElementById(CurrentPromotion[b].ID+" "+results[x].attributes.PromotionID[a]).style.color;
									if (cssColorpinOffer=="silver"){
										document.getElementById(CurrentPromotion[b].ID+" "+results[x].attributes.PromotionID[a]).style.color="purple";
									}
								}
							}
						}
					}
				}
			},
			error: function(myObject, error) {
				// Error occureds
				console.log( error );
			}
		});
	}


	$scope.$on('$ionicView.enter', function() {

		$scope.Promotions($stateParams.superId);
		// Redirection page variable to coupons
		var couponPage="#/app/cupones/";
		idRoute = currentPromotion.get($stateParams.superId);
		// IdPromotion with redirection page
		couponPage = couponPage+$stateParams.superId
		var NamePromo = $stateParams.superId
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'HeartPopover_'+NamePromo,
		  user: NameUser
		};
		$scope.changeColorHeartFollow = function(id) {

			if ($scope.heartMenu == "silver") {
				Parse.Analytics.track("AddHeartPopover", Dimensions);
				$scope.heartMenu = "red";
				SaveFavorite(IdUsuario, id)
			} else {
				Parse.Analytics.track("DelHeartPopover", Dimensions);
				$scope.heartMenu = "silver";
				DeleteFavorite(IdUsuario, id)
			}
		}
		/* **************************************************** */
		$scope.askPromotion = function (IDPromotion) {
			var NamePromo = $stateParams.superId
			var NameUser = String(IdUsuario)
			var Dimensions = {
				name: 'peticionPromo_'+NamePromo,
				user: NameUser
			};

			swal({
				title: "<p class='home' style='font-size:70px;color:blue'>b</p> <p style='font-weight:bold;color:#343434;font-size:20px'>Tu petición por más <br>Ofertas ha sido envida</p>",
				text: "<div class='row'> <div class = 'col'></div>  <p class = 'padin open_sans col col-75'>  ¿Te gustaria agregar a <spam class='colorShopName'>" + $stateParams.superId + "</spam> como una de tus tiendas favoritas?</p>  <div class = 'col'></div>  </div>",
				html: true,
				confirmButtonColor: "#00BAB9",
				confirmButtonText: "Agregar",
				// Si se quiere cancelar pulsando otra parte de la aplicacion
				allowOutsideClick: true
			},
			function(isConfirm) {
				if(isConfirm){
					Parse.Analytics.track("petition", Dimensions);
					SaveFavorite(IdUsuario, IDPromotion)
					$scope.loading = $ionicLoading.show({
						template: "<ion-spinner customer1lass='spinner' icon='lines' style='stroke: #00BAB9;fill: #00BAB9;'></ion-spinner><br><p style='font-size:18px'>Agregando a <spam style='font-size:24px;font-weight:bold;'>" + $stateParams.superId + "</spam> como una de tus tiendas favoritas, espera un momento... </p>"
					});

					$timeout(function () {
						$ionicLoading.hide();
					}, 2000);
				}
			});
		}
		/* **************************************************** */
		$scope.chats = currentPromotion.get($stateParams.superId);
		$scope.popover = currentPromotion.all($stateParams.superId);
		$scope.heartMenu = "silver";
		$scope.Cupcon = Cupcont.length
		$scope.heartPopover = function(id){
			var resultSetPopover = $.grep(CustomerList, function (e) {
				 return e.NameCategory.indexOf(id) == 0;
			});
			console.log(resultSetPopover);
			if (resultSetPopover[0].colorHeart == "white") {
					$scope.heartMenu = "silver";
			}else {
				$scope.heartMenu = resultSetPopover[0].colorHeart;
			}

		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
	//***** SCOPE $ON TO REFRESH MENU CONTROLLER
	$scope.custumerName = $stateParams.superId.replace("-"," ");
	$scope.$on('$ionicView.enter', function() {
		console.log();
		colorIconsFoother = []
		colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.custumerName,'','none']);
	});
})
// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams ,Coupons) {

		// For to update QuantityExchanged
		var CuponClassExchanged = Parse.Object.extend("Cupon");
		var cuponClassExchanged = new CuponClassExchanged();
		var query = new Parse.Query("Cupon");

        query.equalTo('Status', true);

		$scope.pix = Coupons.all($stateParams.CuponID);
		$scope.pixels = $scope.pix[1][0].pixels;

	/*****  fill displayNoneInline list to call after
						in cupons_description for show barcode
						or hide it  ****/
	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell){
		alert("call 2")
		a = cell.toString();
		b = 'tel:'
		window.open(b+a);
	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url,id,name){
		var NamePromo = name.split(" ").join("_")
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'Coupons_'+NamePromo+"_"+id,
		  user: NameUser
		};

		if (id == "web") {
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("WebShopCoupon", Dimensions);
		}else {
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("cartShopCoupon", Dimensions);
		}

	}

    $scope.showCouponDescription = function(id){

        query.equalTo("objectId",id)
        var couponCash =	query.find({
            success: function(results){
                console.log('entro a la funcion');
                if(results[0].attributes.TypeCoupon === 'Fecha'){

                    swal({
                        title: "Estas Seguro?",
                        text: "Quieres canjear este cupon?",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: 'No',
                        confirmButtonColor: '#00BAB9',
                        confirmButtonText: "Canjear!",
                        closeOnConfirm: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal({
                                title: 'Perfecto!',
                                text: 'Has cambiado tu Cupón',
                                timer: 2000,
                                showConfirmButton: false,
                                imageUrl: "../../img/Pulgar_Arriba.jpg"
                            });

                            cuponClassExchanged.id = id;
                            cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
                            cuponClassExchanged.save();
                            var couponPages="#/app/descripcionCupones/";
                            location.href=couponPages+id;
                        } else {
                        swal("Cancelado", "Esperamos que luego puedas disfrutar de nuestros cupones", "error");
                        }
                    });

                }else if(results[0].attributes.TypeCoupon === 'Cupon'){
                    swal({
                        title: "Estas Seguro?",
                        text: "Quieres canjear este cupon?",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: 'No',
                        confirmButtonColor: '#00BAB9',
                        confirmButtonText: "Canjear!",
                        closeOnConfirm: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal({
                                title: 'Perfecto!',
                                text: 'Has cambiado tu Cupón',
                                timer: 2000,
                                showConfirmButton: false,
                                imageUrl: "../../img/Pulgar_Arriba.jpg"
                            });

                            couponCash.then(function(){
                                $scope.cupons[0][0].QuantityExchanged +=1;
                                var couponPages="#/app/descripcionCupones/";
                                // IdPromotion with redirection page
                                couponPages = couponPages+id;
                                location.href=couponPages;
                            });

                            cuponClassExchanged.id = id;
                            cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
                            cuponClassExchanged.save();
                        } else {
                        swal("Cancelado", "Esperamos que luego puedas disfrutar de nuestros cupones", "error");
                        }
                    });
                }
            }
        })

    displayNoneInline=[{none:"none",inline:"inline"}];
    }

	$scope.llenar1=function(id){
		$scope.countCoupon(id);
        displayNoneInline=[{none:"none",inline:"inline"}];
      };

      $scope.llenar2=function(){
        displayNoneInline=[{none:"inline",inline:"none"}];
      };
	// ************ FUNCTION CHANGE COLOR PIN CUPON *************
	$scope.changeColorPinCupon = function (id,NameCoupon) {
		var NamePromo = NameCoupon
		var NameUser = String(IdUsuario)
		var Dimensions = {
			name: 'CouponPin_'+NamePromo,
			user: NameUser
		};
		Parse.Analytics.track("pin", Dimensions);
		var cssColorCuponPin = document.getElementById(id).style.color;
		if (cssColorCuponPin == "silver") {
			document.getElementById(id).style.color = "purple";
			saveCuponFavorite(IdUsuario, id)
		} else {
			deleteFavoriteCupon(IdUsuario, id)
			document.getElementById(id).style.color = "silver";
		}
	};
	/*****  functions *****/
	$scope.$on('$ionicView.enter', function() {

		$scope.cupons = Coupons.all($stateParams.CuponID);
		$scope.heartMenu = "silver";
		$scope.ConteoPro = ContPromo


		$scope.heartPopover = function(id){
			var resultSetPopover = $.grep(CustomerList, function (e) {
				 return e.NameCategory.indexOf(id) == 0;
			});
			console.log(resultSetPopover);
			if (resultSetPopover[0].colorHeart == "white") {
					$scope.heartMenu = "silver";
			}else {
				$scope.heartMenu = resultSetPopover[0].colorHeart;
			}

		}
		$scope.changeColorHeartFollow = function(id) {
			if ($scope.heartMenu == "silver") {
				$scope.heartMenu = "red";
				SaveFavorite(IdUsuario, id)
			} else {
				$scope.heartMenu = "silver";
				DeleteFavorite(IdUsuario, id)
			}
		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
 //***** SCOPE $ON TO REFRESH MENU CONTROLLER

 $scope.$on('$ionicView.enter', function() {
	  	$scope.categoryNameCoupon = Coupons.all($stateParams.CuponID);
		 colorIconsFoother = []
		 colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
 });
})
// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams ,DescriptionCupons, $ionicLoading) {

	$scope.reloadpage = function(){
		$scope.cupons[0].QuantityExchanged +=1
	}
	// ***************  EXCHANGE BUTTON DISPLAY NONE********************
	$scope.buttonCash = function(){
		$('.botonCanjear').click(function(){
			$(this).hide();
			$('.exchangeBoxBarCode').show();
		})
	}

	// ************ FUNCTION CHANGE COLOR PIN CUPON *************
	$scope.changeColorPinCupon = function (id) {
		var cssColorCuponPin = document.getElementById(id).style.color;
		if (cssColorCuponPin == "silver") {
			document.getElementById(id).style.color = "purple";
			saveCuponFavorite(IdUsuario, id)
		} else {
			deleteFavoriteCupon(IdUsuario, id)
			document.getElementById(id).style.color = "silver";
		}
	};

		// For to update QuantityExchanged
		var CuponClassExchanged = Parse.Object.extend("Cupon");
		var cuponClassExchanged = new CuponClassExchanged();
		var query = new Parse.Query("Cupon");
		query.equalTo("objectId",$stateParams.DescriptionID);
		query.equalTo("Status",true);

		$scope.countCoupon = function(){
				var couponCash2 = query.find({
					success: function(results){

                        console.log(results[0].attributes.TypeCoupon)


                        if(results[0].attributes.TypeCoupon === "Cupon"){
                            // ------------------------------------------------------------------------------------------------------------------------------------------------
                               if (parseInt(results[0].attributes.QuantityExchanged) < parseInt(results[0].attributes.QuantityCoupons)) {
								    cuponClassExchanged.id = $stateParams.DescriptionID;
									cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
									cuponClassExchanged.save();

									swal({
											title: "Perfecto!",
											text: "Has cambiado tu cupón",
											imageUrl: "../../img/Pulgar_Arriba.jpg",
											timer: 2000,
											showConfirmButton: false
									});
                              } else {

								$scope.cupons[0].QuantityExchanged =  parseInt(results[0].attributes.QuantityCoupons);

								cuponClassExchanged.id = $stateParams.DescriptionID;
								cuponClassExchanged.set("Status", false);
								cuponClassExchanged.save();

								swal({
									title: 'Lo sentimos!',
									text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
									type: 'warning'
								},
								function(isConfirm) {
										if(isConfirm){

											$scope.loading = $ionicLoading.show({
													content: 'Sending',
													animation: 'fade-in',
													showBackdrop: true,
													maxWidth: 200,
													showDelay: 0
											});

											Parse.Cloud.run('CountCouponCustomer', {}, {
													success: function(resultCustomer) {
														console.log(resultCustomer);
															Parse.Cloud.run('CountCouponCategories', {}, {
																	success:function(result) {

																		CategoryListName = [];
																		var query = new Parse.Query('AppCategory');
																		query.each(function(results) {
																					CategoryListName.push(results.attributes)
																		}).then(function() {
																			ReloadFavorite()
																		}).then(function() {

																			Parse.Cloud.run('GetCustomer', {},{
																				success:function (results) {
																				//	console.log(results);
																					CustomerList = results
																				},
																				error:function (error) {
																				 console.log(error);
																				}
																			}).then(function() {
																				$ionicLoading.hide();
																				var couponPages="#/app/playlists";
																				location.href=couponPages;
																			})
																		});

																	},
																	error: function(error) {
																			/* Show error if call failed */
																			console.log(error);
																	}
															});
													},
													error: function(error) {
													/* Show error if call failed */
													console.log(error);
													}
											});

										}
								})
						}
                        // ------------------------------------------------------------------------------------------------------------------------------------------------
                    } else if(results[0].attributes.TypeCoupon === "Fecha"){
                            console.log('tiene que sumar')
                                    cuponClassExchanged.id = $stateParams.DescriptionID;
									cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
									cuponClassExchanged.save();
                    }

					}
				})

		}
		/*****  noneDisplay equalTo displayNoneInline for
		 				call the list and show or hide barcode image
						in DescriptionCupons  *****/
		// colorIconsFoother=$scope.$on('$ionicView.enter', function() {});[];

		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
			$scope.noneDisplay=displayNoneInline;
			$scope.cupons = DescriptionCupons.all($stateParams.DescriptionID);
        colorIconsFoother = []
          colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.cupons[0].Category,'','none']);
    });
})
//*********************  MENU CONTROLLER  *******************************
.controller('menuCtrl', function($scope,$stateParams){
	$scope.$on('$ionicView.enter', function() {
		$scope.footerChangeColor=colorIconsFoother;
	});
})
//*****************	POPOVER CONTROLLER FOR OFFERS	*******************************
.controller('PopoverCtrl', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'hello';
	});
})
//*****************	POPOVER CONTROLLER FOR COUPONS	*******************************
.controller('PopoverCtrl2', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('templates/popover2.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'hello';
	});
})


//*******************  NEW CONTROLLER POPOVER  ************************
.controller('PopoverNewCtrl', function($scope, $ionicPopover) {
$scope.Analytics = function (id,nameShare) {
	var NameUser = String(IdUsuario)
	var Dimensions = {
	  name: 'share_'+id,
	  user: NameUser
	};
	if (nameShare == "promotion") {
		Parse.Analytics.track("SharePromotion", Dimensions);
	}else {
		Parse.Analytics.track("ShareCoupon", Dimensions);
	}

}
	$ionicPopover.fromTemplateUrl('templates/popoverNew.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'cheers';
	});
});
// ************************  ROUTES WITH LOGIN AND TUTORIAL CONTROLLERS ********************
// ************************ CONTROLLER ROUTER ************************
var myApp = angular.module('reallyCoolApp', ['ionic','ngCordova']);
myApp.config(function($ionicConfigProvider) {
	// note that you can also chain configs
	$ionicConfigProvider.navBar.alignTitle('center');
});
// ************************ MODULE SERVICES ************************
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
})
// ************************ CORDOVA PLUGINS START LOAD ************************
.run(function($ionicPlatform) {

		$ionicPlatform.ready(function() {
			StatusBar.hide();
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleLightContent();
			}
		});
		// Disable back for app
		$ionicPlatform.registerBackButtonAction(function(event) {
				if ($state.current.name == 'app.playlists') {
						$ionicPopup.confirm({
								title: 'System warning',
								template: 'are you sure you want to exit?'
						}).then(function(res) {
								if (res) {
										ionic.Platform.exitApp();
								}
						})
				}
		}, 100);

})

// ************************ ROUTER PROVIDER CONFIGURATION ************************
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	// ************************ INITIAL ************************
	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu/menu.html",
		controller: 'menuCtrl'
	})

  // ******** TUTORIAL *****
	.state('tutorial', {
		url: "/tutorial",
		templateUrl: "templates/tutorial/tutorial.html",
		controller:"tutorialController"
})
// ******** TUTORIAL2 *****
	.state('tutorial2', {
		url: "/tutorial2",
		templateUrl: "templates/tutorial2/tutorial2.html",
		controller:"tutorial2Controller"
  })
	// ******** FACEBOOK *****
	.state('login', {
		url: "/login",
		templateUrl: "templates/login/login.html",
    	controller: "LoginController"
	})
  // ******** FACEBOOK *****
	.state('login2', {
		url: "/login2",
		templateUrl: "templates/login2/login2.html",
    	controller: "RegisterController"
	})
	// ******* FAVORITE *******
	.state('app.favoritos', {
		url: "/favoritos",
		views: {
			'menuContent': {
				templateUrl: "templates/favorite/favorites.html",
				controller: 'OurfavoritesCtrl'
			}
		}
	})
	// ******* YOUR FAVORITE
	.state('app.tusFavoritos', {
		url: "/tusFavoritos",
		views: {
			'menuContent': {
				templateUrl: "templates/your_favorites/your_favorites.html",
				controller: 'AllFavoriteCtrl'
			}
		}
	})
	// ******* SAVED *******
	.state('app.salvados', {
		url: "/salvados",
		views: {
			'menuContent': {
				templateUrl: "templates/saved/saved.html",
				controller: 'AllPromotionCtrl'
			}
		}
	})
  // ******* SETTINGS *******
	.state('app.herramientas', {
		url: "/herramientas",
		views: {
			'menuContent': {
				templateUrl: "templates/tools/tools.html",
				controller: 'toolsCtrl'
			}
		}
	})
	// ******* OFFERS *******
	.state('app.browse', {
		url: "/ofertas/:superId",
		views: {
			'menuContent': {
				templateUrl: "templates/offers/offers.html",
				controller: 'currentPromotionCtrl'
			}
		}
	})
	// ******* PLAYLIST *******
	.state('app.playlists', {
		url: "/playlists",
		views: {
			'menuContent': {
				templateUrl: "templates/page_start/page_start.html",
				controller: 'CategoryCtrl'
			}
		}
	})

	// ******* OTHER CATEGORIES *******
	.state('app.singlessssss', {
		url: "/playlists/:IDcustomer",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/Customer.html",
				controller: 'CustomerCtrl'
			}
		}
	})
	// ****************  CUPONS  *************
	.state('app.cupones', {
		url: "/cupones/:CuponID",
		views: {
			'menuContent': {
				templateUrl: "templates/coupon/coupon.html",
				controller: 'CuponCtrl'
			}
		}
	})
	// ****************  OFFERTS DESCRIPTION  *************
	.state('app.descripcionOfertas', {
		url: "/descripcionOfertas",
		views: {
			'menuContent': {
				templateUrl: "templates/offer_description/offerDescription.html",
				controller: 'homeCtrl'
			}
		}
	})
	//****************  CUPONS DESCRIPTION  *************
	.state('app.descripcionCupones', {
		url: "/descripcionCupones/:DescriptionID",
		views: {
			'menuContent': {
				templateUrl: "templates/coupon_description/couponDescription.html",
				controller: 'DescriptionCuponCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
//$urlRouterProvider.otherwise('/tutorial');
})
// ############## //
//  Controllers   //
// ############## //

/*************************  BODY CONTROLLER  ******************************/

.controller('bodyCtrl', ['$state', function($state) {
	var userVerificate= Parse.User.current();
	// *********** DEVICE READY SPLASHSCREEN  *******************
	document.addEventListener("deviceready", function($scope) {
		$scope.currentUser = Parse.User.current();
			 if (userVerificate==null) {
					 $state.go('tutorial');
			}else {
					if (userVerificate["attributes"].authData == undefined) {
							IdUsuario = String($scope.currentUser.id)
											viewPromotion()
					}else {
							IdUsuario = String(userVerificate["attributes"].authData.facebook.id)
											viewPromotion()
					}
					$state.go('app.playlists');
					// setTimeout(function() {
					// 		navigator.splashscreen.hide();
					// }, 6000);
				}
	}, false);
}])


.controller('rootCtrl', ['$state', function($state) {
 $state.go('app.playlists');
}])

.controller('rootCtrl', ['$state', function($state) {
  $state.go('app.playlists');
}])
/*************************  TUTORIAL  ******************************/
.controller('tutorialController', ['$scope', '$state', function($scope, $state) {
	$scope.slideChanged = function(index) {
    switch(index) {
        case 3:
          $state.go('login2');
          break;
      }
    }
}])
/*************************  TUTORIAL NO.2 ******************************/
.controller('tutorial2Controller', ['$scope', '$state', function($scope, $state) {
  $scope.slideChanged = function(index) {
    switch(index) {
        case 0:
          $state.go('app.herramientas');
          break;
      }
    }
}])
/******************************************************/
.controller('toolsCtrl', ['$scope', '$state', function($scope, $state) {
	var NameUser = String(IdUsuario)
	var Dimensions = {
	  name: 'tools',
	  user: NameUser
	};
	Parse.Analytics.track("Tools", Dimensions);
	$scope.AnalyticsTools= function (id) {
		var NameUser = String(IdUsuario)
		var dimensions = {
			name: 'tools_'+id,
			user: NameUser
		};
		Parse.Analytics.track("Tools", dimensions);
	}
	$scope.logout = function() {
		Parse.User.logOut();
		$state.go('login');
	};

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
	$scope.$on('$ionicView.enter', function() {
		colorIconsFoother = []
		colorIconsFoother.push(['#A7A9AC','#A7A9AC','#A7A9AC','#3F51B5','','Z','','none']);
	});
}])
/**********************  FACEBOOK LOGIN CONTROLLER  **********************************/

.controller('loginCtrl', function($scope, $state, $cordovaFacebook) {

	$scope.currentUser = Parse.User.current();
	console.log($scope.currentUser)
 if ($scope.currentUser != null ){
	 if ($scope.currentUser["attributes"].authData != undefined) {
			IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id);
			viewPromotion();
			$state.go('app.playlists');
	 } else {
			IdUsuario = String($scope.currentUser.id);
			viewPromotion();
			$state.go('app.playlists');
	 }

 }

			var fbLogged = new Parse.Promise();

 var fbLoginSuccess = function(response) {
		 if (!response.authResponse){
				 fbLoginError("Cannot find the authResponse");
				 return;
		 }
		 var expDate = new Date(
				 new Date().getTime() + response.authResponse.expiresIn * 1000
		 ).toISOString();

		 var authData = {
				 id: String(response.authResponse.userID),
				 access_token: response.authResponse.accessToken,
				 expiration_date: expDate
		 }
		 fbLogged.resolve(authData);
 };

 var fbLoginError = function(error){
		 fbLogged.reject(error);
 };

 //===============LOGIN WITH FB==========//
 $scope.loginfb = function(){
			setTimeout(function(){

				 if(!window.cordova){
						 facebookConnectPlugin.browserInit('426922250825103');
				 }

				 facebookConnectPlugin.login(['email', 'public_profile', 'user_birthday', 'user_hometown'], fbLoginSuccess, fbLoginError);

				 fbLogged.then(function(authData) {
						 $state.go('app.playlists');
						 return Parse.FacebookUtils.logIn(authData);
				 })

				 .then(function(userObject) {
							 var authData = userObject.get('authData');
							 facebookConnectPlugin.api('me?fields=id,name,birthday,hometown,gender', null,
							 function(response) {
									 userObject.set('name', response.name);
									 userObject.set('birthday', response.birthday);
									 userObject.set('gender', response.gender);
									 userObject.set('hometown', response.hometown);
									 userObject.save();
							 },
							 function(error) {
															 console.log(error);
							 })
				 })
			 }, 1000);

	 };
 // //===============/LOGIN WITH FB==========//
})

.controller('loginCtrl2', function($scope, $state, $cordovaFacebook) {

    $scope.currentUser = Parse.User.current();
    console.log($scope.currentUser)
if ($scope.currentUser != null ){
     if ($scope.currentUser["attributes"].authData != undefined) {
            IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id);
            console.log("correo1");
            viewPromotion();
            $state.go('app.playlists');
     } else {
            IdUsuario = String($scope.currentUser.id);
            viewPromotion();
            console.log("correo2");
            $state.go('app.playlists');
     }

}

            var fbLogged = new Parse.Promise();

var fbLoginSuccess = function(response) {
         if (!response.authResponse){
                 fbLoginError("Cannot find the authResponse");
                 return;
         }
         var expDate = new Date(
                 new Date().getTime() + response.authResponse.expiresIn * 1000
         ).toISOString();

         var authData = {
                 id: String(response.authResponse.userID),
                 access_token: response.authResponse.accessToken,
                 expiration_date: expDate
         }
         fbLogged.resolve(authData);
};

var fbLoginError = function(error){
         fbLogged.reject(error);
};

//===============LOGIN WITH FB==========//
$scope.loginfb = function(){
    setTimeout(function(){

         if(!window.cordova){
               facebookConnectPlugin.browserInit('426922250825103');
         }

         facebookConnectPlugin.login(['email', 'public_profile', 'user_birthday', 'user_hometown'], fbLoginSuccess, fbLoginError);

         fbLogged.then(function(authData) {
                         $state.go('app.playlists');
                         return Parse.FacebookUtils.logIn(authData);
         })

         .then(function(userObject) {
             var authData = userObject.get('authData');
             facebookConnectPlugin.api('me?fields=id,name,birthday,hometown,gender', null,
             function(response) {
               userObject.set('name', response.name);
               userObject.set('birthday', response.birthday);
               userObject.set('gender', response.gender);
               userObject.set('hometown', response.hometown);
               userObject.save();
             },
             function(error) {
              console.log(error);
             })
         })
     }, 1000);

};
});
