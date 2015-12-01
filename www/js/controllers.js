/*****  GLOBAL LISTS  *****/
var displayNoneInline = []
var colorIconsFoother = []
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
		alert("call function")
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
        // TODO: add age verification step
        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

		var dateBirthday = $scope.user.birthday;
		dateBirthday = dateBirthday.toLocaleDateString()

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
    $scope.user = {
        username: null,
        password: null
    };

    $scope.error = {};
		$scope.currentUser = Parse.User.current();
		// ******* LOGIN VALIDATION *******
		if ($scope.currentUser == null ){
			console.log($scope.currentUser);
		} else {
			console.log($scope.currentUser.id);
			if ($scope.currentUser["attributes"].authData == undefined) {
				console.log("este si casi psy ");
				IdUsuario = String($scope.currentUser.id)
				        viewPromotion()
			}else {
				IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id)
				        viewPromotion()
				console.log("facebook");
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
						console.log(user);
						if (user.attributes.emailVerified == false) {
							$ionicLoading.hide();
							$rootScope.user = user;
							$rootScope.isLoggedIn = true;
							console.log("no se ha verificado su correo");
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
.controller('CategoryCtrl', function($scope) {
	var dimensions = {
		name: 'categoriesMenu'
	};
	Parse.Analytics.track("view", dimensions);

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
			});
		},
		error: function(myObject, error) {
			// Error occured
			console.log( error );
		}
	});

	setTimeout(function() {
		$scope.$apply(function() {
			$scope.categorys = CategoryListName
		});
	}, 1500);
	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
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
.controller('SupermercadoCtrl', function($scope) {
	var dimensions = {
		name: 'supermarketMenu'
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
			});
	}

	setTimeout(function() {
		$scope.$apply(function() {
			$scope.chats = Super;
		});
	}, 2000);
	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
      colorIconsFoother = []
    colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Supermercados','','none',]);
  });
})
// *********************** RESTAURANTS CONTROLLER *************************
.controller('RestaurantesCtrl', function($scope) {
	var dimensions = {
		name: 'restaurantMenu'
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
		  });
	}

	setTimeout(function() {
		$scope.$apply(function() {
			$scope.chats = Restaurantes;
		});
	}, 2000);
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
         colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Restaurantes','','none']);
    });
})
// ************************* FASHION CONTROLLER ****************************
.controller('ModaCtrl', function($scope) {
	var dimensions = {
		name: 'fashionMenu'
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
									console.log(Modas[b].NameCategory);
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
			});
	}

	setTimeout(function () {
		$scope.$apply(function () {
			$scope.chats = Modas
		});
	}, 2000);

		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
      colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Moda','','none']);
    });
})
// ************************** ENTERTAINMENT CONTROLLER ********************
.controller('EntretenimientoCtrl', function($scope) {
	var dimensions = {
		name: 'entertainmentMenu'
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
			});
	}

	setTimeout(function() {
		$scope.$apply(function() {
				$scope.chats = Entretenimientos;
		});
	}, 2000);
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
      colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Entretenimiento','','none']);
    });
})
// *************************** ELECTRONICS CONTROLLER *********************
.controller('ElectronicosCtrl', function($scope) {
	var dimensions = {
		name: 'electronicsMenu'
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
			});
	}

	setTimeout(function() {
		$scope.$apply(function() {
				$scope.chats = Electronico;
		});
	}, 2000);
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Electronicos','','none']);
    });
})
// *************************** OTHERS CONTROLLER **************************
.controller('OtrosCtrl', function($scope) {


	var dimensions = {
		name: 'othersMenu'
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
		console.log(Otro,"asdasd");
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
			console.log(Otro,"otro");
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
		});
	}

	setTimeout(function() {
		$scope.$apply(function() {
				$scope.Others = Otro;
		});
	}, 2000);
	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
	$scope.$on('$ionicView.enter', function() {
			colorIconsFoother = []
			colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Otros','','none']);
	});
})
// *************************  OFFERS CONTROLLER	***************************
.controller('PaizCtrl', function($scope, $stateParams, Paiz) {
	var dimensions = {
		name: $stateParams.superId,
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

	Parse.Analytics.track("view", dimensions);
	$scope.$on('$ionicView.enter', function() {
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
			console.log($scope.categoryNameCoupon[0][0].Category);
			colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
	});
})
// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams ,Cupons) {
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
	$scope.llenar1=function(){
		displayNoneInline=[{none:"none",inline:"inline"}];
  };
  $scope.llenar2=function(){
    displayNoneInline=[{none:"inline",inline:"none"}];
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
 $scope.categoryNameCoupon = Cupons.all($stateParams.CuponID);
 $scope.$on('$ionicView.enter', function() {
		 colorIconsFoother = []
		 colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
 });
})
// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams ,DescriptionCupons) {
		/*****  noneDisplay equalTo displayNoneInline for
		 				call the list and show or hide barcode image
						in DescriptionCupons  *****/
		colorIconsFoother=$scope.$on('$ionicView.enter', function() {});[];
		$scope.noneDisplay=displayNoneInline;
		$scope.cupons = DescriptionCupons.all($stateParams.DescriptionID);
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
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
//*****************	CONTROLLER POPOVER	*******************************
.controller('PopoverCtrl', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
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
})
//$scope.$on('$ionicView.enter', function() {});
