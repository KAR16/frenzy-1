// ********* PHOTO *********
var CurrentPromotion = [];
// ********* CATEGORIES VARIABLE *********
var IdCategory;
// ********* ALL FAVORITE, PROMOTION, INFOSHOP VARIABLE *********
var AllFavorite = [];
var AllPromotion = [];

// ********* MODULE STARTER *********
var app = angular.module('starter.services', []);

//*************** Customer APP FACTORY **************
app.factory('CustomerAll', function() {
	return {
		all: function(IDCostumer) {

			var AllCustomer = [];
			for (var a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].CategoryApp) {
					AllCustomer.push(CustomerList[a]);
				}
			}
			if (AllCustomer.length === 0) {
				AllCustomer.push({oferta:"noHay"});
			}
			return AllCustomer;
		},
		get: function(chatId) {
			for (var i = 0; i < AllCustomer.length; i++) {
				if (AllCustomer[i].id === parseInt(chatId)) {
					return AllCustomer[i];
				}
			}
			return null;
		}
	};
});

// ************* DATA VARIABLE *************
var dato = []; /* Push data popover */
var ContPromo = []; /* Count of promotions */
var Cupcont=[]; /* Count of Cupons */
// ************* PAIZ APP FACTORY *************
app.factory('currentPromotion', function() {
	return {
		all: function(superId) {},
		get: function(superId) {
			console.log("entro");
			ALL = [];
			Category = [];
			dato = [];
			ContPromo = [];
			IdCategory = superId;
			Cupcont=[];
			var validar = "existe";

			var resultSet = $.grep(CustomerList, function (e) {
				 return e.Name.indexOf(superId) === 0;
			});


			for (c in CurrentPromotion) {
				if (superId === CurrentPromotion[c].Category) {
					if (CurrentPromotion[c].ShopOnline == undefined || CurrentPromotion[c].ShopOnline == '') {
							CurrentPromotion[c].Display = "none"
							CurrentPromotion[c].colPrice = "33"
							CurrentPromotion[c].colPricePromo = "33"
					}else {
						CurrentPromotion[c].Display = "";
					}
					if (CurrentPromotion[c].Photo ==null || CurrentPromotion[c].Photo ==undefined || CurrentPromotion[c].Photo == ''){
						CurrentPromotion[c]["Photo"] = "img/frenzy_back.png"
					}
					if ( CurrentPromotion[c].TermsAndConditions == null  || CurrentPromotion[c].TermsAndConditions ==undefined || CurrentPromotion[c].TermsAndConditions =='') {
								CurrentPromotion[c]["DisplayTerms"] = "none";
					}
					Category.push(CurrentPromotion[c]);
				}
			}

			for (c in Category) {
				if (Category[c].TypePromotion == "SpecialPromotion") {
					Category[c]["colum"] = "55"
					Category[c]["columIcon"] = "40"
					Category[c]["columDisplay"] = "none"
				}else if (Category[c].TypePromotion == "DirectDiscount") {
					Category[c]["colum"] = "33"
				}else {
					Category[c]["colum"] = "55"
					Category[c]["columIcon"] = "40"
					Category[c]["columDisplay"] = "none"
				}
				//	console.log(Category[c]);
			}

			if (Category.length == 0) {
				ContPromo.push({conteo:Category.length})
				Category.push({oferta:"noHay"});

			} else {
				ContPromo.push({conteo:Category.length})
			}

			for (z in InfoShop) {

				if (superId === InfoShop[z].name){
					if (InfoShop[z].url == '' && InfoShop[z].cel == '') {
					dato.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"60px",margin:"0px"});
				}else if (InfoShop[z].cel == '') {
					dato.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",url:InfoShop[z].url,webUrl:InfoShop[z].webUrl,webUrlIcon:InfoShop[z].webUrlIcon,margin:"-40px"})
				}else if (InfoShop[z].url == '') {
						dato.push({cel:InfoShop[z].cel,call:InfoShop[z].call,callIcon:InfoShop[z].callIcon,name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",margin:"0"})
				}else {
						dato.push(InfoShop[z]);
					}
				}
			}

			if (CurrentPromotion) {
				if (resultSet[0]["QuantityCoupon"] == 0) {
					validar = "no"
				}
				if(resultSet[0]['QuantityPromotion'] == 0){
					ALL.push(Category)
					ALL.push(dato)
					ALL.push([{contCoupon:resultSet[0]["QuantityCoupon"],contPromotion:resultSet[0]["QuantityPromotion"],t:dato[0].name,Validar:validar,ocultar:'none'}])
				}
				ALL.push(Category)
				ALL.push(dato)
				ALL.push([{contCoupon:resultSet[0]["QuantityCoupon"],contPromotion:resultSet[0]["QuantityPromotion"],t:dato[0].name,Validar:validar}])
				console.log(ALL);
				return ALL;
			}
			return null;
		}
	};
});
// ************* ALL FAVORITE APP FACTORY *************
app.filter("commaBreak",

    function () {
        return function ( value ) {
            if( !value.length ) return;
            return value.split('-').join(" ")
        }
});

app.factory('AllFavorite', function() {
	var favorites = AllFavorite;

	return {
		all: function() {
			AllFavorite = [];
			for (c in CustomerList) {

				 if (CustomerList[c].colorHeart == 'red') {
					 	for (x in CurrentPromotion) {
							if (CustomerList[c].Name == CurrentPromotion[x].Category) {
								AllFavorite.push(CurrentPromotion[x])
							}
	 					}
				 }
			}
			if (AllFavorite.length == 0) {
				AllFavorite.push({oferta:"noHay"});
			}
			favorites = AllFavorite;
			return favorites;
		},
		get: function() {
			return favorites;
		}
	};
});
// ************* ALL PROMOTION APP FACTORY *************
app.factory('AllPromotion', function() {
	var promotio = AllPromotionF;

	return {
		all: function(salvadosId) {
			AllPromotionF = [];
			for (x in CurrentPromotion) {
					if (CurrentPromotion[x].ColorPin == 'purple') {
						AllPromotionF.push(CurrentPromotion[x])
					}
			}
			if (AllPromotionF.length == 0) {
				AllPromotionF.push({oferta:"noHay"});
			}
			promotio = AllPromotionF;
			return promotio;
		},
		get: function() {
			return promotio;
		}
	};
});
// ************* ALL OUR FAVORITES APP FACTORY *************

// ************* COUPONS APP FACTORY *************
app.factory('Coupons', function() {
	return {
		all: function(salvadosId) {
			var AllCupon = [];
			var DatoCupon = [];
			var CuponALL = [];
			var ContCupon = []; //conteo de copunes
			var validar = "existe";
			var resultSetC = $.grep(CustomerList, function (e) {
				 return e.Name.indexOf(salvadosId) == 0;
			});
			for (a in Cupons) {
				if (salvadosId == Cupons[a].Category) {
					if (Cupons[a].ShopOnline == undefined || Cupons[a].ShopOnline == '') {
							Cupons[a].Display = "none"
					}else {
						Cupons[a].Display = ""
					}
					if (Cupons[a].TypeOfExchange == "DirectDiscount") {
						Cupons[a]["CanjeaQ"] = "Q."
					}else {
							Cupons[a]["CanjeaP"] = "%"
					}
					if (Cupons[a].PhotoCupon ==null || Cupons[a].PhotoCupon ==undefined || Cupons[a].PhotoCupon == ''){
						Cupons[a]["PhotoCupons"] = "img/frenzy_back.png"
						Cupons[a]["DisplayWithoutImageCoupons"] = "none"
					}
					if (Cupons[a].PhotoCupon !=null || Cupons[a].PhotoCupon != '') {
								Cupons[a]["DisplayWithImageCoupons"] = "none";
					}

					AllCupon.push(Cupons[a])
				}
			}

			if (Cupons.length == 0) {
				Cupons.push({oferta:"noHay"});
			} else {
				ContCupon.push({conteo:AllCupon.length})
			}

			for (z in InfoShop) {
				if (salvadosId === InfoShop[z].name){
					if (InfoShop[z].url == '' && InfoShop[z].cel == '') {
					DatoCupon.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"60px",margin:"0px"});
				}else if (InfoShop[z].cel == '') {
					DatoCupon.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",url:InfoShop[z].url,webUrl:InfoShop[z].webUrl,webUrlIcon:InfoShop[z].webUrlIcon,margin:"-40px"})
				}else if (InfoShop[z].url == '') {
						DatoCupon.push({cel:InfoShop[z].cel,call:InfoShop[z].call,callIcon:InfoShop[z].callIcon,name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",margin:"0"})
				}else {
						DatoCupon.push(InfoShop[z]);
					}
				}
			}
			if (resultSetC[0]["QuantityPromotion"] == 0) {
				validar = "no"
			}

			// INSTEAD ALL COUPON IN ALL COUPON VARIABLE
			allCupon = AllCupon;

			if (CurrentPromotion) {
				CuponALL.push(allCupon)
				CuponALL.push(DatoCupon)
				CuponALL.push(ContCupon)
				CuponALL.push([{contCoupon:resultSetC[0]["QuantityCoupon"],contPromotion:resultSetC[0]["QuantityPromotion"],Validar:validar}])
				console.log(CuponALL);
				return CuponALL;
			}
		},get: function(){}
	};
});
// ************* DESCRIPTION CUPONS APP FACTORY *************
app.factory('DescriptionCupons', function() {
	return {
		all: function(salvadosId) {
			var AllCuponDescription = [];
			for (a in Cupons) {
				if (salvadosId == Cupons[a].IDCupon) {
					Cupons[a]["DisplayWithImageCoupons"] = 'none'
					if (Cupons[a].TypeOfExchange == "DirectDiscount") {

						Cupons[a]["CanjeaQ"] = "Q."
					}else {
							Cupons[a]["CanjeaP"] = "%"
					}
					if (Cupons[a].PhotoCupon ==null || Cupons[a].PhotoCupon ==undefined || Cupons[a].PhotoCupon == ''){
						Cupons[a]["PhotoCupons"] = "img/frenzy_back.png"
						Cupons[a]["DisplayWithoutImageCoupons"] = "none"
					}
					if (Cupons[a].TermsAndConditions == null || Cupons[a].TermsAndConditions == undefined || Cupons[a].TermsAndConditions == '') {
						Cupons[a]["DisplayTerms"] = "none";
					}
					AllCuponDescription.push(Cupons[a])
				}
			}
			allCuponDescription = AllCuponDescription;
			return allCuponDescription;
		},get: function(){}
	};
});
// ************* DESCRIPTION offert APP FACTORY *************
app.factory('DescriptionOfferts', function() {
	return {
		all: function(superId) {
			console.clear();
			var AllOffertsDescription = [];
			for (a in CurrentPromotion) {
				if (superId == CurrentPromotion[a].IDpromotion) {

					if (CurrentPromotion[a].TypeOfExchange == "DirectDiscount") {
						CurrentPromotion[a]["CanjeaQ"] = "Q."
					}else {
							CurrentPromotion[a]["CanjeaP"] = "%"
					}
					if (CurrentPromotion[a].TermsAndConditions == null || CurrentPromotion[a].TermsAndConditions == undefined || CurrentPromotion[a].TermsAndConditions == '') {
						CurrentPromotion[a]["DisplayTerms"] = "none";
					}

					AllOffertsDescription.push(CurrentPromotion[a])
				}
			}
			var allDescription = AllOffertsDescription	;
			return allDescription;
		},get: function(){}
	};
});
