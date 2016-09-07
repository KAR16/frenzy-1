
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
		})
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
			})
		} else  {
		window.history.back();
	}
}
//**************************************************************************************************
function ReloadFavoriteDelete(CustomerID) {
	for (b in CustomerList){
		if (CustomerID === CustomerList[b].NameCategory){
			console.log(CustomerList[b]);
			if (CustomerList[b].colorHeart === "red") {
				CustomerList[b].colorHeart  = "white";
			console.log(CustomerList[b]);
			}
		}
	}
}

var ListPromotion;
