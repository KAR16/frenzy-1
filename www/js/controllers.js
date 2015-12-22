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
			alert("No puede estar vacio, porfavor ingrese un correo")
		}else if($scope.user.password == undefined) {
				alert("No puede estar vacio, porfavor ingrese una contraseña")
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
								alert("Se envio una confirmacion a tu correo electronico")
            },
            error: function(user, error) {
                $ionicLoading.hide();
                if (error.code === 125) {
                    $scope.error.message = 'Please specify a valid email ' +
                        'address';
										alert("Por favor, indique una dirección de correo electrónico válida")
                } else if (error.code === 202) {
                    $scope.error.message = 'The email address is already ' +
                        'registered';
										alert('La dirección de correo electrónico ya está registrado')
                } else {
                    $scope.error.message = error.message;
										alert(error.message)
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
		if ($scope.currentUser == null ){
		} else {
			if ($scope.currentUser["attributes"].authData == undefined) {
				IdUsuario = String($scope.currentUser.id)
				        viewPromotion()
			}else {
				IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id)
				        viewPromotion()
			}
			$state.go('app.playlists');
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
									$scope.error.message = 'Email address does not exist';
									alert('Email address does not exist')
							} else {
									$scope.error.message = 'An unknown error has occurred, ' +
											'please try again';
											alert('An unknown error has occurred,please try again');
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
							alert("no se ha verificado su correo")
						}else {
							$ionicLoading.hide();
							$rootScope.user = user;
							$rootScope.isLoggedIn = true;
							$state.go('app.playlists', {
							clear: true
							});
						}

					},
            error: function(user, err) {
                $ionicLoading.hide();
                // The login failed. Check error to see why.
                if (err.code === 101) {
                    $scope.error.message = 'Invalid login credentials';
                } else {
                    $scope.error.message = 'An unexpected error has ' +
                        'occurred, please try again.';
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

	var query = new Parse.Query('AppCategory');
	CategoryListName = [];
	CategoryListNameConteo=[];
	query = query.limit(100);
	query.find({
		success: function(results) {
			// cycle through the results
			var PromotionS = Parse.Object.extend("Promotion");
			var q = new Parse.Query(PromotionS);
			for ( x in results) {
				List_name.push(results[x].attributes.CategoryName)
				q.equalTo("CategoryApp", results[x].attributes.CategoryName);
				var pro = q.find({
					success: function(results) {
						for (a in results){
							if (results[a].attributes.Status === true) {
								CategoryListNameConteo.push({cont:results[a].attributes.CategoryApp})
							}
						}
					},
					error: function(error) {
						// Error occureds
						console.log(error);
					}
				});
				CategoryListName.push({
					name: results[x].attributes.CategoryName,direc:results[x].attributes.CategoryName,cont_promo:0,icon: results[x].attributes.IconCategory,
					color : results[x].attributes.ColorCategory, cont_cupones:0
				})
				name  = results[x].attributes.CategoryName
			}
			pro.then(function(){

				for (w in CategoryListName){
					for (i in Cupons) {
						if(CategoryListName[w].name == Cupons[i].Categoryapp){
							CategoryListName[w].cont_cupones = CategoryListName[w].cont_cupones + 1
						}
					}
					for(s in CategoryListNameConteo){

						if(CategoryListName[w].name == CategoryListNameConteo[s].cont){
							CategoryListName[w].cont_promo = CategoryListName[w].cont_promo + 1
						}
					}
				}
				$ionicLoading.hide();
				$('.pageStartBoxPurple').show();
				$('.flechitas').show();

			});
		},
		error: function(myObject, error) {
			// Error occured
			console.log( error );
		}
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
.controller('OurfavoritesCtrl', function($scope, OurFavorites) {
	var dimensions = {
		name: 'frenzyFavorites',
	};
	Parse.Analytics.track("view", dimensions);
	$scope.ourFavorites = OurFavorites.all();
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
      colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','','Z','','none']);
    });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, AllFavorite) {
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
	var dimensions = {
		name: 'allPromotions',
	};
	Parse.Analytics.track("view", dimensions);

	$scope.reload = function () {
	    var PromoSavess = new Parse.Query('PromotionSaved')
	    PromoSavess.equalTo("UserID", IdUsuario);
	    PromoSavess.find({
			success: function(results) {
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


	// ************ DELETE AND SAVE PIN ************
	$scope.SalvadosSaveAndDelete = function (id) {
		var pin = document.getElementById(id).style.color;
		if (pin == "silver") {
			document.getElementById(id).style.color = "purple";
			SavePromotion(IdUsuario, id)
			$scope.reload()
		} else {
			document.getElementById(id).style.color = "silver";
			DeletePromotion(IdUsuario, id)
			$scope.reload()
		}
		$scope.reload()
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

// ********************* SUPERMARKET CONTROLLER ***************************
.controller('SupermercadoCtrl', function($scope, $ionicLoading) {
	Super=[]
	var dimensions = {
		name: 'supermarketMenu'
	};
	// Loading scope
	$scope.loading = $ionicLoading.show({
      noBackdrop: true,
      template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
	var customer1 = new Parse.Query('Customer');
	Parse.Cloud.run('GetPromotions', {}, {
			success: function(result) {
					/* Call GetQuantityPromotions function in Parse Cloud Code and
					send result like parameter */
					Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
							success: function(result) {
									/* Call GetAverageSavings function in Parse Cloud Code and
									send result like parameter */
									Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
											success: function(result) {
													/* Call AddPromotions function and send result like parameter */
													AddPromotionsSupermercado(result);

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
			},
			error: function(error) {
					/* Show error if call failed */
					console.log(error);
			}
	});
	function AddPromotionsSupermercado(Array) {
		var cust = customer1.find().then(function(results) {
				for (x in results) {
					var CountPromotions = 0;
					if (results[x].attributes.Name in Array.Quantities[0]) {
						CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
						average = Array.averageSavingscustomer[results[x].attributes.Name];
					} else {
						CountPromotions = 0;
						average = 0;
					};
					if("Supermercado" == results[x].attributes.CategoryApp){
						name = results[x].attributes.Name;
						listSupermercado.push(results[x].attributes.Logo._url);
						listNameSupermercado.push(name.split(" ").join("_"));
						Categorys.push({
							nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
						})
						Super.push({
							id:x,name: results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
							colorHeart: "white"
						});
					}
				};
				if (Super.length == 0) {
					Super.push({oferta:"noHay"});
				}
			});

			cust.then(function(){
				var FavoriteHeart = new Parse.Query('Favorite')
				FavoriteHeart.equalTo("UserID", IdUsuario);
				FavoriteHeart.find({
					success: function(results) {
						for (a in results[0].attributes.CustomerID){
							for (b in Super){
								if (results[0].attributes.CustomerID[a] === Super[b].NameCategory){
									if (Super[b].colorHeart === "white") {
										Super[b].colorHeart  = "red";
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
				$ionicLoading.hide();
			});
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
  		setTimeout(function() {
		$scope.$apply(function() {
			$scope.chats = Super;
		});
	}, 1000);
      colorIconsFoother = []
    colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Supermercados','','none',]);
  });
})
// *********************** RESTAURANTS CONTROLLER *************************
.controller('RestaurantesCtrl', function($scope, $ionicLoading) {

	var dimensions = {
		name: 'restaurantMenu'
	};

	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FF5252; fill: #FF5252;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
	var customer2 = new Parse.Query('Customer');
	Restaurantes = []
	Parse.Cloud.run('GetPromotions', {}, {
	    success: function(result) {
	        /* Call GetQuantityPromotions function in Parse Cloud Code and
	        send result like parameter */
	        Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
	            success: function(result) {
	                /* Call GetAverageSavings function in Parse Cloud Code and
	                send result like parameter */
	                Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
	                    success: function(result) {
	                        /* Call AddPromotions function and send result like parameter */
	                        AddPromotionsRestaurantes(result);
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
	    },
	    error: function(error) {
	        /* Show error if call failed */
	        console.log(error);
	    }
	});
	function AddPromotionsRestaurantes(Array) {
			var cust2 = customer2.find().then(function(results) {
				for (x in results) {
					var CountPromotions = 0;
					if (results[x].attributes.Name in Array.Quantities[0]) {
						CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
						average = Array.averageSavingscustomer[results[x].attributes.Name];
					} else {
						CountPromotions = 0;
						average = 0;
					};
					if("Restaurantes" == results[x].attributes.CategoryApp){
						name = results[x].attributes.Name;
						listSupermercado.push(results[x].attributes.Logo._url);
						listNameSupermercado.push(name.split(" ").join("_"));
						Categorys.push({
							nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
						})
						Restaurantes.push({
							id:x,name: results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
							colorHeart: "white"
						});
					}
				};
				if (Restaurantes.length == 0) {
					Restaurantes.push({oferta:"noHay"});
				}
			});

			cust2.then(function(){
				var FavoriteHeart2 = new Parse.Query('Favorite')
				FavoriteHeart2.equalTo("UserID", IdUsuario);
				FavoriteHeart2.find({
					success: function(results) {
						for (a in results[0].attributes.CustomerID){
							for (b in Restaurantes){
								if (results[0].attributes.CustomerID[a] === Restaurantes[b].NameCategory){
									if (Restaurantes[b].colorHeart === "white") {
										Restaurantes[b].colorHeart  = "red";
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
			$ionicLoading.hide();
		  });
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
		setTimeout(function() {
			$scope.$apply(function() {
			$scope.chats = Restaurantes;
		});
	}, 1000);
        colorIconsFoother = []
		colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Restaurantes','','none']);
    });
})
// ************************* FASHION CONTROLLER ****************************
.controller('ModaCtrl', function($scope, $ionicLoading) {
	var dimensions = {
		name: 'fashionMenu'
	};

	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FFD922; fill: #FFD922;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
	var customer3 = new Parse.Query('Customer');
	Modas = []
	Parse.Cloud.run('GetPromotions', {}, {
			success: function(result) {
					/* Call GetQuantityPromotions function in Parse Cloud Code and
					send result like parameter */
					Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
							success: function(result) {
									/* Call GetAverageSavings function in Parse Cloud Code and
									send result like parameter */
									Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
											success: function(result) {
													/* Call AddPromotions function and send result like parameter */
													AddPromotionsModa(result);
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
			},
			error: function(error) {
					/* Show error if call failed */
					console.log(error);
			}
	});
	function AddPromotionsModa(Array) {
			var cust3 = customer3.find().then(function(results) {
				for (x in results) {
					var CountPromotions = 0;
					if (results[x].attributes.Name in Array.Quantities[0]) {
						CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
						average = Array.averageSavingscustomer[results[x].attributes.Name];
					} else {
						CountPromotions = 0;
						average = 0;
					};
					if("Moda" == results[x].attributes.CategoryApp){
						name = results[x].attributes.Name;
						listSupermercado.push(results[x].attributes.Logo._url);
						listNameSupermercado.push(name.split(" ").join("_"));
						Categorys.push({
							nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
						})
						Modas.push({
							id:x,name: results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
							colorHeart: "white"
						});
					}
				};
				if (Modas.length == 0) {
					Modas.push({oferta:"noHay"});
				}
			});


			cust3.then(function(){
				var FavoriteHeart3 = new Parse.Query('Favorite')
				FavoriteHeart3.equalTo("UserID", IdUsuario);
				FavoriteHeart3.find({
					success: function(results) {
						for (a in results[0].attributes.CustomerID){
							for (b in Modas){
								if (results[0].attributes.CustomerID[a] === Modas[b].NameCategory){
									if (Modas[b].colorHeart === "white") {
										Modas[b].colorHeart  = "red";
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
				$ionicLoading.hide();
			});
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
    setTimeout(function () {
		$scope.$apply(function () {
			$scope.chats = Modas
		});
	}, 1000);
        colorIconsFoother = []
      colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Moda','','none']);
    });
})
// ************************** ENTERTAINMENT CONTROLLER ********************
.controller('EntretenimientoCtrl', function($scope, $ionicLoading) {
	Entretenimientos=[]
	var dimensions = {
		name: 'entertainmentMenu'
	};

	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #9C28B0; fill: #9C28B0;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
		var customer4 = new Parse.Query('Customer');
	Parse.Cloud.run('GetPromotions', {}, {
			success: function(result) {
					/* Call GetQuantityPromotions function in Parse Cloud Code and
					send result like parameter */
					Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
							success: function(result) {
									/* Call GetAverageSavings function in Parse Cloud Code and
									send result like parameter */
									Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
											success: function(result) {
													/* Call AddPromotions function and send result like parameter */
													AddPromotionsEntretenimiento(result);
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
			},
			error: function(error) {
					/* Show error if call failed */
					console.log(error);
			}
	});
	function AddPromotionsEntretenimiento(Array) {
			var cust4 = customer4.find().then(function(results) {
				for (x in results) {
					var CountPromotions = 0;
					if (results[x].attributes.Name in Array.Quantities[0]) {
						CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
						average = Array.averageSavingscustomer[results[x].attributes.Name];
					} else {
						CountPromotions = 0;
						average = 0;
					};
					if("Entretenimiento" == results[x].attributes.CategoryApp){
						name = results[x].attributes.Name;
						listSupermercado.push(results[x].attributes.Logo._url);
						listNameSupermercado.push(name.split(" ").join("_"));
						Categorys.push({
							nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
						})
						Entretenimientos.push({
							id:x,name: results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
							colorHeart: "white"
						});
					}
				};
				if (Entretenimientos.length == 0) {
					Entretenimientos.push({oferta:"noHay"});
				}
			});

			cust4.then(function(){
				var FavoriteHeart4 = new Parse.Query('Favorite')
				FavoriteHeart4.equalTo("UserID", IdUsuario);
				FavoriteHeart4.find({
					success: function(results) {
						for (a in results[0].attributes.CustomerID){
							for (b in Entretenimientos){
								if (results[0].attributes.CustomerID[a] === Entretenimientos[b].NameCategory){
									if (Entretenimientos[b].colorHeart === "white") {
										Entretenimientos[b].colorHeart  = "red";
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
				$ionicLoading.hide();
			});
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.chats = Entretenimientos;
			});
		}, 1000);
        colorIconsFoother = []
      colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Entretenimiento','','none']);
    });
})
// *************************** ELECTRONICS CONTROLLER *********************
.controller('ElectronicosCtrl', function($scope, $ionicLoading) {
	Electronico=[]
	var dimensions = {
		name: 'electronicsMenu'
	};

	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #3F51B5; fill: #3F51B5;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
		var customer5 = new Parse.Query('Customer');
	Parse.Cloud.run('GetPromotions', {}, {
			success: function(result) {
					/* Call GetQuantityPromotions function in Parse Cloud Code and
					send result like parameter */
					Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
							success: function(result) {
									/* Call GetAverageSavings function in Parse Cloud Code and
									send result like parameter */
									Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
											success: function(result) {
													/* Call AddPromotions function and send result like parameter */
													AddPromotionsElectronicos(result);
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
			},
			error: function(error) {
					/* Show error if call failed */
					console.log(error);
			}
	});
	function AddPromotionsElectronicos(Array) {
		var cust5 =	customer5.find().then(function(results) {
				for (x in results) {
					var CountPromotions = 0;
					if (results[x].attributes.Name in Array.Quantities[0]) {
						CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
						average = Array.averageSavingscustomer[results[x].attributes.Name];
					} else {
						CountPromotions = 0;
						average = 0;
					};
					if("Electrónicos" == results[x].attributes.CategoryApp){
						name = results[x].attributes.Name;
						listSupermercado.push(results[x].attributes.Logo._url);
						listNameSupermercado.push(name.split(" ").join("_"));
						Categorys.push({
							nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
						})
						Electronico.push({
							id:x,name: results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
							colorHeart: "white"
						});
					}
				};
				if (Electronico.length == 0) {
					Electronico.push({oferta:"noHay"});
				}
			});

			cust5.then(function(){
				var FavoriteHeart5 = new Parse.Query('Favorite')
				FavoriteHeart5.equalTo("UserID", IdUsuario);
				FavoriteHeart5.find({
					success: function(results) {
						for (a in results[0].attributes.CustomerID){
							for (b in Electronico){
								if (results[0].attributes.CustomerID[a] === Electronico[b].NameCategory){
									if (Electronico[b].colorHeart === "white") {
										Electronico[b].colorHeart  = "red";
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
				$ionicLoading.hide();
			});
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.chats = Electronico;
			});
		}, 1000);
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Electronicos','','none']);
    });
})
// *************************** OTHERS CONTROLLER **************************
.controller('OtrosCtrl', function($scope, $ionicLoading) {

	var dimensions = {
		name: 'othersMenu'
	};

	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00DDC1; fill: #00DDC1;"></ion-spinner>'
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

	Parse.Analytics.track("view", dimensions);
	var customer6 = new Parse.Query('Customer');
	Parse.Cloud.run('GetPromotions', {}, {
		success: function(result) {
				/* Call GetQuantityPromotions function in Parse Cloud Code and
				send result like parameter */
				Parse.Cloud.run('GetQuantityPromotions', {"Array":result}, {
						success: function(result) {
								/* Call GetAverageSavings function in Parse Cloud Code and
								send result like parameter */
								Parse.Cloud.run('GetAverageSavings', {"Array":result}, {
										success: function(result) {
												/* Call AddPromotions function and send result like parameter */
												AddPromotionsOtros(result);
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
		},
		error: function(error) {
				/* Show error if call failed */
				console.log(error);
		}
	});

	function AddPromotionsOtros(Array) {
	var cust6 =	customer6.find().then(function(results) {
		Otro = [];
			for (x in results) {
				var CountPromotions = 0;
				if (results[x].attributes.Name in Array.Quantities[0]) {
					CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
					average = Array.averageSavingscustomer[results[x].attributes.Name];
				} else {
					CountPromotions = 0;
					average = 0;
				};
				if("Otros" == results[x].attributes.CategoryApp){
					name = results[x].attributes.Name;
					listSupermercado.push(results[x].attributes.Logo._url);
					listNameSupermercado.push(name.split(" ").join("_"));
					Categorys.push({
						nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
					})
					Otro.push({
						id:x,name:results[x].attributes.Logo._url, promo: CountPromotions,promedio:average,
						lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe',
						colorHeart: "white"
					});
				}
			};
			if (Otro.length == 0) {
				Otro.push({oferta:"noHay"});
			}
		});

		cust6.then(function(){
			var FavoriteHeart6 = new Parse.Query('Favorite')
			FavoriteHeart6.equalTo("UserID", IdUsuario);
			FavoriteHeart6.find({
				success: function(results) {
					for (a in results[0].attributes.CustomerID){
						for (b in Otro){
							if (results[0].attributes.CustomerID[a] === Otro[b].NameCategory){
								if (Otro[b].colorHeart === "white") {
									Otro[b].colorHeart  = "red";
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
			$ionicLoading.hide();
		});
	}

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
	$scope.$on('$ionicView.enter', function() {
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.Others = Otro;
			});
		}, 1000);
			colorIconsFoother = []
			colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Otros','','none']);
	});
})
// *************************  OFFERS CONTROLLER	***************************
.controller('PaizCtrl', function($scope, $stateParams, Paiz) {
	var dimensions = {
		name: $stateParams.superId,
	};
	// Pixels quantity of Popover for height div
	$scope.pix = Paiz.get($stateParams.superId);
	console.log($scope.pix);
	$scope.pixels = $scope.pix[1][0].pixels;

	$scope.reload = function () {
	    var PromoSavess = new Parse.Query('PromotionSaved')
	    PromoSavess.equalTo("UserID", IdUsuario);
	    PromoSavess.find({
			success: function(results) {
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
	$scope.changeColorPinOfferts = function (id, IDPromotion) {
		var cssColorpinOfferts = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOfferts == "silver") {
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
			SavePromotion(IdUsuario, IDPromotion)
			$scope.reload()
	    viewPromotion()
		} else {
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
			DeletePromotion(IdUsuario, IDPromotion)
			$scope.reload()
	    viewPromotion()
		}
		$scope.reload()
	};
	// *********** FUNCTION CHANGE COLOR PIN OFFERTS WITHOUT IMAGE **********
	$scope.changeColorPinOffertsWithoutImage = function (id, IDPromotion) {
		var cssColorpinOffertsWithoutImage = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOffertsWithoutImage == "silver") {
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
			SavePromotion(IdUsuario, IDPromotion)
			$scope.reload()
		} else {
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
			DeletePromotion(IdUsuario, IDPromotion)
			$scope.reload()
		}
	};


	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell){
		a = cell.toString();
		b = 'tel:'
		window.open(b+a);
	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url){
		z = Url;
		window.open(z);
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

	Parse.Analytics.track("view", dimensions);
	$scope.$on('$ionicView.enter', function() {

		$scope.Promotions($stateParams.superId);
		// Redirection page variable to coupons
		var couponPage="#/app/cupones/";
		idRoute = Paiz.get($stateParams.superId);
		// IdPromotion with redirection page
		couponPage = couponPage+$stateParams.superId
		// Validate if doesn't existing a promotion then redirection to coupons page.
		if (idRoute[2][0].conteo == 0 && idRoute[3][0].cont == 0) {
			$('.pageFavoritesSecondRow').css("display","none");
		} else if(idRoute[2][0].conteo == 0){
			location.href=couponPage
			$('.pageFavoritesSecondRow').show();;
		}else {
			$('.pageFavoritesSecondRow').show();
		}

		$scope.chats = Paiz.get($stateParams.superId);
		$scope.popover = Paiz.all($stateParams.superId);
		$scope.heartMenu = "silver";
		$scope.Cupcon = Cupcont.length
		$scope.heartPopover = function(id){
			var favorite = new Parse.Query('Favorite');
			favorite.equalTo("UserID", IdUsuario);
			favorite.equalTo("CustomerID", id);
			favorite.find({
				success: function(results) {
					if ( results.length > 0 ) {
						$scope.heartMenu = "red";
					}
				},
				error: function(myObject, error) {
					// Error occureds
					console.log( error );
				}
			});
		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
	//***** SCOPE $ON TO REFRESH MENU CONTROLLER
	$scope.categoryNameCoupon = Paiz.get($stateParams.superId);
	$scope.$on('$ionicView.enter', function() {
		colorIconsFoother = []
		colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
	});
})
// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams ,Cupons) {

	// For to update QuantityExchanged
	var CuponClassExchanged = new Parse.Object.extend("Cupon");
	var cuponClassExchanged = new CuponClassExchanged();
	var query = new Parse.Query("Cupon");
	$scope.pix = Cupons.all($stateParams.CuponID);
	console.log($scope.pix);
	$scope.pixels = $scope.pix[1][0].pixels;

	$scope.countCoupon = function(id){

		query.equalTo("objectId",id)
		var couponCash =	query.find({
			success: function(results){
				if(results == false) {
					alert("No hay cupones para canjear sorry :c	!!")
					couponFunction()
				}
				else if(parseInt(results[0].attributes.QuantityExchanged) < parseInt(results[0].attributes.QuantityCoupons)){
					cuponClassExchanged.id = id;
					cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
					cuponClassExchanged.save();
					couponFunction()
					alert("Has cambiado tu cupon!!");
				} else {
					cuponClassExchanged.id = id;
					cuponClassExchanged.set("Status", false);
					cuponClassExchanged.save();
					couponFunction()
					alert("No hay cupones para canjear sorry :c	!!")
				}
			}
		})
		couponCash.then(function(){
			$scope.cupons[0][0].QuantityExchanged +=1;
			var couponPages="#/app/descripcionCupones/";
			// IdPromotion with redirection page
			couponPages = couponPages+id;
			location.href=couponPages;
		});
	}

	/*****  fill displayNoneInline list to call after
						in cupons_description for show barcode
						or hide it  ****/
	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell){
		a = cell.toString();
		b = 'tel:'
		window.open(b+a);
	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url){
		z = Url;
		window.open(z);
	}
	$scope.llenar1=function(id){
		$scope.countCoupon(id);
		displayNoneInline=[{none:"none",inline:"inline"}];
  };
  $scope.llenar2=function(){
    displayNoneInline=[{none:"inline",inline:"none"}];
  };
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
	/*****  functions *****/
	$scope.$on('$ionicView.enter', function() {

		$scope.cupons = Cupons.all($stateParams.CuponID);
		$scope.heartMenu = "silver";
		$scope.ConteoPro = ContPromo

		$scope.heartPopover = function(id){
			var favorite = new Parse.Query('Favorite');
			favorite.equalTo("UserID", IdUsuario);
			favorite.equalTo("CustomerID", id);
			favorite.find({
				success: function(results) {
					if ( results.length > 0 ) {
						$scope.heartMenu = "red";
					}
				},
				error: function(myObject, error) {
					// Error occureds
					console.log( error );
				}
			});
		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
 //***** SCOPE $ON TO REFRESH MENU CONTROLLER

 $scope.$on('$ionicView.enter', function() {
	  	$scope.categoryNameCoupon = Cupons.all($stateParams.CuponID);
		 colorIconsFoother = []
		 colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
 });
})
// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams ,DescriptionCupons) {

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
		var CuponClassExchanged = new Parse.Object.extend("Cupon");
		var cuponClassExchanged = new CuponClassExchanged();
		var query = new Parse.Query("Cupon");
		query.equalTo("objectId",$stateParams.DescriptionID)
		query.equalTo("Status",true)

		$scope.countCoupon = function(){
				var couponCash2 = query.find({
					success: function(results){
						if(results == false) {
						alert("No hay cupones para canjear sorry :c	!!")

					} else if(parseInt(results[0].attributes.QuantityExchanged) < parseInt(results[0].attributes.QuantityCoupons)){
								cuponClassExchanged.id = $stateParams.DescriptionID;
								cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
								cuponClassExchanged.save();
								alert("Has cambiado tu cupon!!")
					} else if(parseInt(results[0].attributes.QuantityExchanged) === parseInt(results[0].attributes.QuantityCoupons)){
								cuponClassExchanged.id = $stateParams.DescriptionID;
								cuponClassExchanged.set("Status", false);
								cuponClassExchanged.save();
								alert("No hay cupones para canjear sorry :c	!!")
					}
					}
				})

				couponCash2.then(function(){
					couponFunction()
				});
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
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleLightContent();
		}
	});
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
	// ******** SPLASH *****
.state('splash', {
	url: "/splash",
	templateUrl: "templates/splash/splash.html",
	controller:"splashController"
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
				controller: 'PaizCtrl'
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
	// ******* SUPERMARKET CATEGORIES *******
	.state('app.single', {
		url: "/playlists/Supermercado",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/supermarkets.html",
				controller: 'SupermercadoCtrl'
			}
		}
	})
	// ******* RESTAURANT'S CATEGORIES *******
	.state('app.singles', {
		url: "/playlists/Restaurantes",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/restaurants.html",
				controller: 'RestaurantesCtrl'
			}
		}
	})
	// ******* FASHION CATEGORIES *******
	.state('app.singless', {
		url: "/playlists/Moda",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/fashion.html",
				controller: 'ModaCtrl'
			}
		}
	})
	// ******* ENTERTAINMENT CATEGORIES *******
	.state('app.singlesss', {
		url: "/playlists/Entretenimiento",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/entertainment.html",
				controller: 'EntretenimientoCtrl'
			}
		}
	})
	// ******* ELECTRONICS CATEGORIES *******
	.state('app.singlessss', {
		url: "/playlists/Electrónicos",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/electronics.html",
				controller: 'ElectronicosCtrl'
			}
		}
	})
	// ******* OTHER CATEGORIES *******
	.state('app.singlesssss', {
		url: "/playlists/Otros",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/others.html",
				controller: 'OtrosCtrl'
			}
		}
	})
	// ****************  OFFERS  *************
	.state('ofertas', {
		url: "/ofertas",
		views: {
			'menuContent': {
				templateUrl: "templates/offers/offers.html",
				controller: 'PaizCtrl'
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
	$urlRouterProvider.otherwise('/splash');
})
// ############## //
//  Controllers   //
// ############## //
.controller('rootCtrl', ['$state', function($state) {
  $state.go('app.playlists');
}])
/*************************  SPLASH  ******************************/
.controller('splashController', ['$scope', '$state', function($scope, $state) {
	function doSomething(){
	}
	$scope.currentUser = Parse.User.current();
	if ($scope.currentUser == null ){
		$state.go('tutorial')
			} else {
				if ($scope.currentUser["attributes"].authData == undefined) {
					IdUsuario = String($scope.currentUser.id)
							viewPromotion()
				}else {
					IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id)
							viewPromotion()
				}
				$state.go('app.playlists');
			}
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
        case 3:
          $state.go('app.herramientas');
          break;
      }
    }
}])

/******************************************************/
.controller('toolsCtrl', ['$scope', '$state', function($scope, $state) {

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

.controller('loginCtrl', function($scope, $state, $cordovaFacebook) {

    $scope.currentUser = Parse.User.current();
    if ($scope.currentUser == null ){
    }else{
        IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id)
        viewPromotion()
        $state.go('app.playlists');
    }
    //===============LOGIN WITH FB==========//
    $scope.loginfb = function(){
  	var permissions = ["public_profile", "email", "user_birthday","user_hometown"];
    //Browser Login
    if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){

      Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          IdUsuario = user.changed.authData.facebook.id
          viewPromotion()
          if (!user.existed()) {
          } else {
          }
          $state.go('app.playlists');
        },
        error: function(user, error) {
        }
      });
    }
    //Native Login
    else {
      $cordovaFacebook.login(permissions).then(function(success){
        //alert(success);
        IdUsuario = success.authResponse.userID
        viewPromotion()
        //Need to convert expiresIn format from FB to date
        var expiration_date = new Date();
        expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
        expiration_date = expiration_date.toISOString();

        var facebookAuthData = {
          "id": success.authResponse.userID,
          "access_token": success.authResponse.accessToken,
          "expiration_date": expiration_date
        };

        Parse.FacebookUtils.logIn(facebookAuthData, {
          success: function(user) {
            //alert(JSON.stringify(user));
            if (!user.existed()) {
            } else {
            }
             $state.go('app.playlists');
          },
          error: function(user, error) {
            alert(JSON.stringify(error));
          }
        });
      }, function(error){
        console.log(error);
      });
    }
  };
    // //===============/LOGIN WITH FB==========//
});
