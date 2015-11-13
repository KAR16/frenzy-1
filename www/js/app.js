// *********  CHANGE OF COLOR ICONS FUNCTION ******************
var IdUsuario;
function reload() {
    var PromoSavess = new Parse.Query('PromotionSaved')
    PromoSavess.equalTo("UserID", IdUsuario);
    PromoSavess.find({
		success: function(results) {
			for (a in results[0].attributes.PromotionID){
				for (b in PhotoPaiz){
					if (results[0].attributes.PromotionID[a] === PhotoPaiz[b].IDpromotion){
						if (PhotoPaiz[b].ColorPin === "silver") {
							PhotoPaiz[b].ColorPin  = "purple";
						}
					}else {
						PhotoPaiz[b].ColorPin  = "silver";
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
// ***************  EXCHANGE BUTTON DISPLAY NONE********************
function botonCanjear(){
	$('.botonCanjear').click(function(){
		$(this).hide();
		$('.exchangeBoxBarCode').show();
	})
}
// ***********  FUNCTION BACK ***************
function goBack() {
	window.history.back();
}
// ************* SETTINGS HIDE PAGE TEXT FUNCTION ***********************/
document.write('<style type="text/css">div.cp_oculta{display: none;}</style>');
function MostrarOcultar(capa,enlace){
	if (document.getElementById){
		var aux = document.getElementById(capa).style;
		aux.display = aux.display? "":"block";
	}
}
/************ FUNCTION CHANGE COLOR HEART  **********/
function changeColorHeart(parametro, category) {
	var cssColor = document.getElementById(parametro).style.color;
	var categ;
	var cont = 0;
	var ct = category.split(" ");

	for (j in ct) {
		if (j > 0) {
			cont = cont + 1
			if (cont === 1) {
				categ = ct[j]
			} else {
				categ = categ + " " + ct[j]
			}
		}
	}

	if (cssColor == "white") {
		document.getElementById(parametro).style.color = "red";
		SaveFavorite(IdUsuario, categ)
	} else {
		document.getElementById(parametro).style.color = "white";
		DeleteFavorite(IdUsuario, categ)
	}
};
// ************ FUNCTION CHANGE COLOR PIN OFFERTS ************
function changeColorPinOfferts(id, IDPromotion) {
	var cssColorpinOfferts = document.getElementById(id).style.color;
	var Promo;
	var Conts = 0;
	var Pr = IDPromotion.split(" ");

	for (j in Pr) {
		if (j > 0) {
			Conts = Conts + 1
			if (Conts === 1) {
				Promo = Pr[j]
			} else {
				Promo = Promo + " " + Pr[j]
			}
		}
	}

	if (cssColorpinOfferts == "silver") {
		document.getElementById(id).style.color = "purple";
		SavePromotion(IdUsuario, Promo)
		reload()
	} else {
		document.getElementById(id).style.color = "silver";
		DeletePromotion(IdUsuario, Promo)
		reload()
	}
	reload()
};
// ************ DELETE AND SAVE PIN ************
function SalvadosSaveAndDelete(id) {
	var pin = document.getElementById(id).style.color;
	if (pin == "silver") {
		document.getElementById(id).style.color = "purple";
		SavePromotion(IdUsuario, id)
		reload()
	} else {
		document.getElementById(id).style.color = "silver";
		DeletePromotion(IdUsuario, id)
		reload()
	}
	reload()
}
// *********** FUNCTION CHANGE COLOR PIN OFFERTS WITHOUT IMAGE **********
function changeColorPinOffertsWithoutImage(id, IDPromotion) {
	var cssColorpinOffertsWithoutImage = document.getElementById(id).style.color;
	var promo;
	var conts = 0;
	var pr = IDPromotion.split(" ");

	for (j in pr) {
		if (j > 0) {
			conts = conts + 1
			if (conts === 1) {
				promo = pr[j]
			} else {
				promo = promo + " " + pr[j]
			}
		}
	}

	if (cssColorpinOffertsWithoutImage == "silver") {
		document.getElementById(id).style.color = "purple";
		SavePromotion(IdUsuario, promo)
		reload()
	} else {
		document.getElementById(id).style.color = "silver";
		DeletePromotion(IdUsuario, promo)
		reload()
	}
};
// ************ FUNCTION CHANGE COLOR PIN CUPON *************
function changeColorPinCupon(id) {
	var cssColorCuponPin = document.getElementById(id).style.color;
	if (cssColorCuponPin == "silver") {
		document.getElementById(id).style.color = "purple";
    saveCuponFavorite(IdUsuario, id)
	} else {
    deleteFavoriteCupon(IdUsuario, id)
		document.getElementById(id).style.color = "silver";
	}
};
// *********** FUNCTION CHANGE COLOR HEART FOLLOW **********
function changeColorHeartFollow(parametro) {
	var cssColorHeartFollow = document.getElementById("heartFollow").style.color;
	if (cssColorHeartFollow == "silver") {
		document.getElementById("heartFollow").style.color = "red";
	} else {
		document.getElementById("heartFollow").style.color = "silver";
	}
};
// *********** FUNCTION CHANGE COLOR PIN SAVED **********
function changeColorPinSaved(parametro) {
	var cssColorpinSaved = document.getElementById("pinSaved").style.color;
	if (cssColorpinSaved == "silver") {
		document.getElementById("pinSaved").style.color = "purple";
	} else {
		document.getElementById("pinSaved").style.color = "silver";
	}
};
// *********** FUNCTION CHANGE COLOR PIN  FAVORITES  **********
function changeColorPinFavorites(parametro) {
	var cssColorpinFavorites = document.getElementById("pinFavorites").style.color;
	if (cssColorpinFavorites == "silver") {
		document.getElementById("pinFavorites").style.color = "purple";
	} else {
		document.getElementById("pinFavorites").style.color = "silver";
	}
};

// *********** FUNCTION CHANGE COLOR PIN  YOUR FAVORITES  **********
function changeColorPinYourFavorites(parametro) {
	var cssColorpinYourFavorites = document.getElementById("pinYourFavorites").style.color;
	if (cssColorpinYourFavorites == "silver") {
		document.getElementById("pinYourFavorites").style.color = "purple";
	} else {
		document.getElementById("pinYourFavorites").style.color = "silver";
	}
};
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
	// ******** FACEBOOK *****
	.state('login', {
		url: "/login",
		templateUrl: "templates/login/login.html"
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
	$urlRouterProvider.otherwise('/login');
})
// ############## //
//  Controllers   //
// ############## //
.controller('rootCtrl', ['$state', function($state) {
  $state.go('app.playlists');
}])
// ********************* LOGOUT SESSION OF PARSE ACCOUNT *********************
.controller('homeCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.logout = function() {
		Parse.User.logOut();
		$state.go('login');
	};
}])
// ********************* LOGIN WITH FACEBOOK *********************
.controller('loginCtrl', function($scope, $state, $cordovaFacebook) {
	$scope.currentUser = Parse.User.current();
	// ******* LOGIN VALIDATION *******
	if ($scope.currentUser == null ){
    console.log($scope.currentUser);
  } else {
		IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id)
		viewPromotion()
		$state.go('app.playlists');
	}
	//===============LOGIN WITH FB==========//
	$scope.loginfb = function(){
		var permissions = ["public_profile", "email", "user_birthday","user_hometown"];
		// ******* Browser Login *******
		if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					IdUsuario = user.changed.authData.facebook.id
					viewPromotion()
					if (!user.existed()) {} else {}
					$state.go('app.playlists');
				},
				error: function(user, error) {}
			});
		}
		// ******* Native Login *******
		else {
			$cordovaFacebook.login(permissions).then(function(success){

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
						if (!user.existed()) {} else {}
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
});
