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
/***********************************************************/
