// IdUsuario of Facebook or Frenzy for Pines and hearts
var IdUsuario;
var userVerificate= Parse.User.current();
// ***********  FUNCTION BACK ***************
function goBack() {
	window.history.back();
}
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
//
function onBackKeyDown() {
// 	if(document.URL == 'file:///android_asset/www/index.html#/app/playlists'){
// 		//
// 		// swal({
// 		// 	title: 'Salir',
// 		// 	text: 'Deseas salir?',
// 		// 	type: 'warning',
// 		// 	showConfirmButton: true,
// 		// 	confirmButtonText: 'Salir',
// 		// 	showCancelButton: true,
// 		// 	cancelButtonText: 'No'
// 		// },
// 		// function(isConfirm) {
// 		// 		if(isConfirm){
// 		// 				navigator.app.exitApp();
// 		// 		} else {
// 		// 				swal.close();
// 		// 		}
// 		// })
//
// 		if (confirm("Desea salir de frenzy!") == true) {
// 			navigator.app.exitApp();
// 		}
// 		else{
// 			console.log("salir");
// 		}
// 	}
}
//*********** DEVICE READY SPLASHSCREEN  *******************
document.addEventListener("deviceready", function($scope) {
	 if (userVerificate==null) {
	 		window.location.replace('file:///android_asset/www/index.html#/tutorial');
			setTimeout(function() {
  			navigator.splashscreen.hide();
			}, 6000);

	}else {
		if (userVerificate["attributes"].authData == undefined) {
			IdUsuario = String($scope.currentUser.id)
					viewPromotion()
		}else {
			IdUsuario = String(userVerificate["attributes"].authData.facebook.id)
					viewPromotion()
		}
		window.location.replace('file:///android_asset/www/index.html#/app/playlists');
		setTimeout(function() {
			navigator.splashscreen.hide();
		}, 6000);	}
}, false);
//**************************************************************************************************
var CustomerList;
function ReloadFavorite() {
	var FavoriteHeartCustomer = new Parse.Query('Favorite')
	FavoriteHeartCustomer.equalTo("UserID", IdUsuario);
	FavoriteHeartCustomer.find({
		success: function(results) {
			for (a in results[0].attributes.CustomerID){
				for (b in CustomerList){
					if (results[0].attributes.CustomerID[a] === CustomerList[b].NameCategory){
						if (CustomerList[b].colorHeart === "white") {
							CustomerList[b].colorHeart  = "red";
						}
					}else {
							CustomerList[b].colorHeart  = "white";
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
var ListPromotion;
Parse.Cloud.run('GetPromotionsApp', {},{
	success:function (results) {
		console.log("promociones");
		console.log(results);
		CurrentPromotion = results
	},
	error:function (error) {
	 console.log(error);
	}
})

/***********************************************************/
/**********  PAGE_START EXIT APP FUNCTION  *****************/
// document.addEventListener("backbutton", onBackKeyDown, false);
// 	function onBackKeyDown() {
//
// 		if(document.URL == 'file:///android_asset/www/index.html#/app/playlists'){
// 			navigator.app.exitApp();
// 		}
// 	}
/***********************************************************/
