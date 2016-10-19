

// ************************ App Definition ************************
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova', 'firebase'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
})
// ************************ CORDOVA PLUGINS START LOAD ************************
.run(function($ionicPlatform, $rootScope) {

		$ionicPlatform.ready(function() {

			// StatusBar.hide();
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
						});
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
		templateUrl: "templates/menu/menu.html"
	})
  // ******** loading *****
  	.state('loading', {
  		url: "/loading",
  		templateUrl: "templates/loading/loading.html",
  		controller:"loadingCtrl"
  })
  // ******** loading For Login User *****
  	.state('loadingLoginUser', {
  		url: "/loadingLoginUser",
  		templateUrl: "templates/loading/loading.html",
  		controller:"loadingCtrlLogin"
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
    	controller: "LoginCtrlEmail"
	})
	// ******** LOGIN AND CONTROLLER ******
	.state('loginAndRegister', {
		url: "/loginAndRegister",
		templateUrl: "templates/login_and_register/loginAndRegister.html"
	})
  // ******** FACEBOOK *****
	.state('login2', {
		url: "/login2",
		templateUrl: "templates/login2/login2.html",
    	controller: "RegisterController"
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
	// ****************  OFFERTS DESCRIPTION  *************
	.state('app.descripcionOfertas', {
		url: "/descripcionOfertas/:promotionId",
		views: {
			'menuContent': {
				templateUrl: "templates/offer_description/offerDescription.html",
				controller: 'PromotionsDescription'
			}
		}
	})
	.state('app.termsAndConditionsOffers', {
			url: "/termsAndConditionsOffers/:promotionId",
			views: {
				'menuContent': {
					templateUrl: "templates/term_and_conditions/termsAndConditionsForOffers.html",
					controller: 'PromotionsDescription'
				}
			}
		})
	// ******* PLAYLIST *******
	.state('app.playlists', {
		url: "/playlists",
		views: {
			'menuContent': {
				templateUrl: "templates/home/home.html",
				controller: 'HomeCtrl'
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
	//****************  CUPONS DESCRIPTION  *************
	.state('app.descripcionCupones', {
		url: "/descripcionCupones/:couponId",
		views: {
			'menuContent': {
				templateUrl: "templates/coupon_description/couponDescription.html",
				controller: 'DescriptionCuponCtrl'
			}
		}
	})
	.state('app.termsAndConditions', {
		url: "/termsAndConditions/:couponId",
		views: {
			'menuContent': {
				templateUrl: "templates/term_and_conditions/termsAndConditionsForCoupons.html",
				controller: 'DescriptionCuponCtrl'
			}
		}
	})
	// ******* YOUR POINTS
	.state('app.points', {
		url: "/points",
		views: {
			'menuContent': {
				templateUrl: "templates/points/points.html",
				controller: 'yourPointsCtrl'
			}
		}
	})
	// ****************  Points DESCRIPTION  *************
	.state('app.pointsDescription', {
		url: "/pointsDescription/:idPromotion",
		views: {
			'menuContent': {
				templateUrl: "templates/pointsDescription/pointsDescription.html",
				controller: 'pointsDescriptionCtrl'
			}
		}
	})
	// ******* AWARD VIEWS *******
	.state('app.regalos', {
		url: "/regalos",
		views: {
			'menuContent': {
				templateUrl: "templates/award/award.html",
				controller: 'awardCtrl'
			}
		}
	})
	// ******* AWARD VIEWS *******
	.state('app.awardDescription', {
		url: "/awardDescription",
		views: {
			'menuContent': {
				templateUrl: "templates/awardDescription/awardDescription.html",
				controller: 'awardDescriptionCtrl'
			}
		}
	})
	// **************** termsAndConditions puntos  *************
	.state('app.termsAndConditionsPointss', {
		url: "/termsAndConditionsPoints/:idCondition",
		views: {
			'menuContent': {
				templateUrl: "templates/term_and_conditions/termsAndConditionsForOffers.html",
				controller: 'termsAndConditionsPointsCtrl'
			}
		}
	})
	// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');
});








/************* SEBAS ******************/
/********************************************/
/********************************************/


var IdUsuario;
var IdGender;
// ***********  FUNCTION BACK ***************
function goBack() {
	window.history.back();
}
/********************************************/
var CustomerList = [];

// ************* THIS FUNCTION IS FOR HIDE THE OPTIONS IN TOOLS ***********************/
document.write('<style type="text/css">div.cp_oculta{display: none;}</style>');
function MostrarOcultar(capa,enlace){
	if (document.getElementById){
		var aux = document.getElementById(capa).style;
		aux.display = aux.display? "":"block";
	}
}
/**********  PAGE_START EXIT APP FUNCTION  *****************/
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
 	if(document.URL == 'file:///android_asset/www/index.html#/app/playlists'){

		swal({
			title: 'Salir',
			text: 'Deseas salir?',
			imageUrl: 'img/payaso.png',
			showConfirmButton: true,
			confirmButtonText: 'Salir',
			confirmButtonColor: '#00BAB9',
			showCancelButton: true,
			cancelButtonText: 'No'
		},
		function(isConfirm) {
				if(isConfirm){
						navigator.app.exitApp();
				} else {
						console.log("quedar");
				}
		});
	} else if(document.URL == 'file:///android_asset/www/index.html#/loginAndRegister'){

			swal({
				title: 'Salir',
				text: 'Deseas salir?',
				imageUrl: 'img/payaso.png',
				showConfirmButton: true,
				confirmButtonText: 'Salir',
				confirmButtonColor: '#00BAB9',
				showCancelButton: true,
				cancelButtonText: 'No'
			},
			function(isConfirm) {
					if(isConfirm){
							navigator.app.exitApp();
					} else {
							console.log("quedar");
					}
			});
		} else  {
		window.history.back();
	}
}


var ListPromotion;
