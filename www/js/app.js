// *********  CHANGE OF COLOR ICONS FUNCTION ******************
// IdUsuario of Facebook or Frenzy
var IdUsuario;
function reload() {
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
    viewPromotion()
	} else {
		document.getElementById(id).style.color = "silver";
		DeletePromotion(IdUsuario, Promo)
		reload()
    viewPromotion()
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