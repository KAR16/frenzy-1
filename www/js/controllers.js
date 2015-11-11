/*****  GLOBAL LISTS  *****/
var displayNoneInline = []
var colorIconsFoother = []
	console.log(colorIconsFoother)
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
// ********************* PAGE_START CONTROLLER ****************************
.controller('CategoryCtrl', function($scope) {
	var dimensions = {
		name: 'categoriesMenu'
	};
	Parse.Analytics.track("view", dimensions);

	var query = new Parse.Query('AppCategory');
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

    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
				$scope.categorys = CategoryListName
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','frenzy']);
    });
})
// ******************** OUR FAVORITES CONTROLLER **************************
.controller('OurfavoritesCtrl', function($scope, OurFavorites) {
	var dimensions = {
		name: 'frenzyFavorites',
	};
	Parse.Analytics.track("view", dimensions);
	$scope.ourFavorites = OurFavorites.all();
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','Favoritos']);
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
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','Tus Favoritos']);
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
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC','#A7A9AC','#9C28B0','#A7A9AC','Salvados']);
    });
})
//*************************** TOOLS CONTROLLER ***************************
.controller('toolsCtrl', function($scope, $stateParams){
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC','#A7A9AC','#A7A9AC','#3F51B5','Herramientas']);
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
			customer1.find().then(function(results) {
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
							id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
						});
					}
				};
				if (Super.length == 0) {
					Super.push({oferta:"noHay"});
				}
			});
	}

    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
				$scope.chats = Super;
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Supermercados']);
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
			customer2.find().then(function(results) {
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
							id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
						});
					}
				};
				if (Restaurantes.length == 0) {
					Restaurantes.push({oferta:"noHay"});
				}
			});
	}

	setTimeout(function () {
			$scope.$apply(function () {
								$scope.chats = Restaurantes;
			});
	}, 2000);
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {

        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Restaurantes']);
    });
})
// ************************* FASION CONTROLLER ****************************
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
			customer3.find().then(function(results) {
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
							id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
						});
					}
				};
				if (Modas.length == 0) {
					Modas.push({oferta:"noHay"});
				}
			});
	}

		setTimeout(function () {
				$scope.$apply(function () {
					$scope.chats = Modas
				});
		}, 2000);

    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {

        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Moda']);
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
			customer4.find().then(function(results) {
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
							id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
						});
					}
				};
				if (Entretenimientos.length == 0) {
					Entretenimientos.push({oferta:"noHay"});
				}
			});
	}

    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
				$scope.chats = Entretenimientos;
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Entretenimiento']);
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
			customer5.find().then(function(results) {
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
							id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
							lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
						});
					}
				};
				if (Electronico.length == 0) {
					Electronico.push({oferta:"noHay"});
				}
			});
	}


    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
				$scope.chats = Electronico;
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Electronicos']);
    });
})
// *************************** OTHERS CONTROLLER **************************
.controller('OtrosCtrl', function($scope, Otros) {
	var dimensions = {
		name: 'othersMenu'
	};
	Parse.Analytics.track("view", dimensions);
	$scope.chats = Otros.all();
	//***** FUNCTION FOOTER CHANCE COLOR  *****
	//***** SCOPE $ON TO REFRESH MENU CONTROLLER
	$scope.$on('$ionicView.enter', function() {
			colorIconsFoother = []
			colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Otros']);
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
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Ofertas']);
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
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Cupones']);
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
	//***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','Cupones']);
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
