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