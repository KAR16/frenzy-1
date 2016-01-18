// IdUsuario of Facebook or Frenzy for Pines and hearts
var IdUsuario;
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
	function onBackKeyDown() {
		if(document.URL == 'file:///android_asset/www/index.html#/app/playlists'){
			if (confirm("Desea salir de frenzy!") == true) {
				navigator.app.exitApp();
	    }
			else{
				$state.go('app.playlists');
			}
		}
	}
//**************************************************************************************************


//**************************************************************************************************
var CustomerList;
function ReloadFavorite() {
	console.log("recargo");
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
// var Customer = new Parse.Query('Customer');
// Customer.each(function(results) {
// 				CustomerList.push({name: results.attributes.Logo._url, promo: results.attributes.QuantityPromotion,promedio:results.attributes.AverageSaving,
// 											lastText: "favorite", NameCategory: results.attributes.Name ,oferta : 'existe',
// 											colorHeart: "white",Category:results.attributes.CategoryApp})
// }).then(function(){
// 	var FavoriteHeartCustomer = new Parse.Query('Favorite')
// 	FavoriteHeartCustomer.equalTo("UserID", IdUsuario);
// 	FavoriteHeartCustomer.find({
// 		success: function(results) {
// 			for (a in results[0].attributes.CustomerID){
// 				for (b in CustomerList){
// 					if (results[0].attributes.CustomerID[a] === CustomerList[b].NameCategory){
// 						if (CustomerList[b].colorHeart === "white") {
// 							CustomerList[b].colorHeart  = "red";
// 						}
// 					}
// 				}
// 			}
// 		},
// 		error: function(myObject, error) {
// 			// Error occureds
// 			console.log( error );
// 		}
// 	});
//
// });
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
