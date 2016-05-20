// ********* LIST NAME CATEGORY *********
var List_name = [];
var promociones = [];
var listSupermercado = [];
var listRestaurantes = [];
var promedio = [];
var listNameSupermercado = [];
var listNameRestaurantes = [];
var Super = [];
var Restaurantes = [];
var Modas = [];
var Entretenimientos = [];
var Electronico = [];
var Otro = [];
var listPromoSuper = [];
var name = "";
var nameRestaurantes = "";
var listaNameSuperComparar = [];
var listaNameSuperConteo = [];
// ********* COUNT VARIABLE *********
var conteoPromociones = [];
var conteoPromo = {};
var total = 0;
// ********* PHOTO *********
var CurrentPromotion = [];
// ********* CATEGORIES VARIABLE *********
var Category = [];
var IdCategory;
var Categorys= [];
var contt = 0;
// ********* ALL FAVORITE, PROMOTION, INFOSHOP VARIABLE *********
var AllFavorite = [];
var AllPromotion = [];
var InfoShop = [];
// ********* CUPONS *********
var Cupons = [];
// ********* MODULE STARTER *********
var app = angular.module('starter.services', [])

// ************* CATEGORIES APP FACTORY *************
app.factory('Categorys', function() {
	// Might use a resource here that returns a JSON array
	for (a in promociones) {
		var C = promociones.length;
	}

	var categorys = CategoryListName
	return {
		all: function() {
			return categorys;
		},
		get: function(chatId) {
			for (var i = 0; i < categorys.length; i++) {
				if (categorys[i].id === parseInt(chatId)) {
					return categorys[i];
				}
			}
			return null;
		}
	};
})
//*************** Customer APP FACTORY **************
app.factory('CustomerAll', function() {
	return {
		all: function(IDCostumer) {
				var AllCustomer = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					AllCustomer.push(CustomerList[a])
				}
			}
			if (AllCustomer.length == 0) {
				AllCustomer.push({oferta:"noHay"});
			}
			for (g in AllCustomer) {
				AllCustomer[g]["suma"] = AllCustomer[g]["promo"] +  AllCustomer[g]["coupon"]
			}
			console.log(AllCustomer);
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
// ************* SUPERMARKET APP FACTORY *************
app.factory('Supermercados', function() {
	// Might use a resource here that returns a JSON array Some fake testing data


	return {
		all: function(IDCostumer) {
			var supermercados = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					supermercados.push(CustomerList[a])
				}
			}
			if (supermercados.length == 0) {
				supermercados.push({oferta:"noHay"});
			}
			return supermercados;
		},
		get: function(chatId) {
			for (var i = 0; i < chsupermercadosats.length; i++) {
				if (supermercados[i].id === parseInt(chatId)) {
					return supermercados[i];
				}
			}
			return null;
		}
	};
});
// ************* ENTERTAINMENT APP FACTORY *************
app.factory('Entretenimiento', function() {
	// Some fake testing data
	return {
		all: function(IDCostumer) {
				var entretenimiento = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					entretenimiento.push(CustomerList[a])
				}
			}
			if (entretenimiento.length == 0) {
				entretenimiento.push({oferta:"noHay"});
			}
			return entretenimiento;
		},
		get: function(chatId) {
			for (var i = 0; i < entretenimiento.length; i++) {
				if (entretenimiento[i].id === parseInt(chatId)) {
					return entretenimiento[i];
				}
			}
			return null;
		}
	};
});
// ************* FASION APP FACTORY *************
app.factory('Moda', function() {
	return {
		all: function(IDCostumer) {
				var moda = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					moda.push(CustomerList[a])
				}
			}
			if (moda.length == 0) {
				moda.push({oferta:"noHay"});
			}
			return moda;
		},
		get: function(chatId) {
			for (var i = 0; i < moda.length; i++) {
				if (moda[i].id === parseInt(chatId)) {
					return moda[i];
				}
			}
			return null;
		}
	};
});
// ************* ELECTRONICS APP FACTORY *************
app.factory('Electronicos', function() {

	return {
		all: function(IDCostumer) {
			var electronicos = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					electronicos.push(CustomerList[a])
				}
			}
			if (electronicos.length == 0) {
				electronicos.push({oferta:"noHay"});
			}
			return electronicos;
		},
		get: function(chatId) {
			for (var i = 0; i < electronicos.length; i++) {
				if (electronicos[i].id === parseInt(chatId)) {
					return electronicos[i];
				}
			}
			return null;
		}
	};
})
// ************* RESTAURANTS APP FACTORY *************
app.factory('Restaurante', function() {


	return {
		all: function(IDCostumer) {
			var restaurantes = [];

			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					restaurantes.push(CustomerList[a])
				}
			}
			if (restaurantes.length == 0) {
				restaurantes.push({oferta:"noHay"});
			}
			return restaurantes;
		},
		get: function(chatId) {
			for (var i = 0; i < restaurantes.length; i++) {
				if (restaurantes[i].id === parseInt(chatId)) {
					return restaurantes[i];
				}
			}
			return null;
		}
	};
});
// ************* OTHERS APP FACTORY *************
app.factory('Otros', function() {
	return {
		all: function(IDCostumer) {
			var Others = [];
			for (a in CustomerList) {
			//	console.log(CustomerList[a].Category);
				if (IDCostumer == CustomerList[a].Category) {
					console.log("encontro ");
					Others.push(CustomerList[a])
				}
			}
			if (Others.length == 0) {
				Others.push({oferta:"noHay"});
			}
			return Others;
		},
		get: function(chatId) {
			for (var i = 0; i < restaurantes.length; i++) {
				if (restaurantes[i].id === parseInt(chatId)) {
					return restaurantes[i];
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
			ALL = []
			Category = [];
			dato = [];
			ContPromo = [];
			IdCategory = superId;
			Cupcont=[];
			var validar = "existe"

			var resultSet = $.grep(CustomerList, function (e) {
				 return e.NameCategory.indexOf(superId) == 0;
			});

			//console.log(JSON.stringify(resultSet[0]["promo"]))

			for (a in Cupons) {
				if (superId == Cupons[a].Category) {
					Cupcont.push(Cupons[a])

				}
			}

			for (c in CurrentPromotion) {
			//	console.log(CurrentPromotion[c]);
				if (superId === CurrentPromotion[c].Category) {
					if (CurrentPromotion[c].ShopOnline == undefined) {
							CurrentPromotion[c].Display = "none"
							CurrentPromotion[c].colPrice = "33"
							CurrentPromotion[c].colPricePromo = "33"
					}else {
						CurrentPromotion[c].Display = "";
					}
					if (CurrentPromotion[c].photo ==null || CurrentPromotion[c].photo ==undefined){
						CurrentPromotion[c]["photo"] = "http://estaticos.tonterias.com/wp-content/uploads/2005/03/932_Reunion-en-una-sala-roja.jpg"
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
					console.log(Category[c]);
			}

			if (Category.length == 0) {
				ContPromo.push({conteo:Category.length})
				Category.push({oferta:"noHay"});

			} else {
				ContPromo.push({conteo:Category.length})
			}

			for (z in InfoShop) {

				if (superId === InfoShop[z].name){
					if (InfoShop[z].url == undefined && InfoShop[z].cel == undefined) {
					dato.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"60px",margin:"0px"});
				}else if (InfoShop[z].cel == undefined) {
					dato.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",url:InfoShop[z].url,webUrl:InfoShop[z].webUrl,webUrlIcon:InfoShop[z].webUrlIcon,margin:"-40px"})
				}else if (InfoShop[z].url == undefined) {
						dato.push({cel:InfoShop[z].cel,call:InfoShop[z].call,callIcon:InfoShop[z].callIcon,name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",margin:"0"})
				}else {
						dato.push(InfoShop[z]);
					}
				}
			}

			if (CurrentPromotion) {
				if (resultSet[0]["coupon"] == 0) {
					validar = "no"
				}
				if(resultSet[0]['promo'] == 0){
					ALL.push(Category)
					ALL.push(dato)
					ALL.push([{contCoupon:resultSet[0]["coupon"],contPromotion:resultSet[0]["promo"],t:dato[0].name,Validar:validar,ocultar:'none'}])
				}
				ALL.push(Category)
				ALL.push(dato)
				ALL.push([{contCoupon:resultSet[0]["coupon"],contPromotion:resultSet[0]["promo"],t:dato[0].name,Validar:validar}])
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
			if (AllFavorite.length == 0) {
				AllFavorite.push({oferta:"noHay"});
			}
			favorites = AllFavorite;
			console.log(favorites);
			return favorites;
		},
		get: function() {
			return favorites;
		}
	};
});
// ************* ALL PROMOTION APP FACTORY *************
app.factory('AllPromotion', function() {
	var promotio = AllPromotion;

	return {
		all: function(salvadosId) {
			if (AllPromotion.length == 0) {
				AllPromotion.push({oferta:"noHay"});
			}
			promotio = AllPromotion;
		//	console.log(promotio);
			return promotio;
		},
		get: function() {
			return promotio;
		}
	};
});
// ************* ALL OUR FAVORITES APP FACTORY *************
var AllourFavorites = [];

app.factory('OurFavorites', function() {
    AllourFavorites = [];
    var OurFavorites = CurrentPromotion

    return {
        all: function() {
            AllourFavorites = [];
						Logo = [];
                var Customer = new Parse.Query('Customer');
            for (a in CurrentPromotion) {
                if (CurrentPromotion[a].Our_Favorites === true ) {
                    AllourFavorites.push(CurrentPromotion[a]);
                    Customer.equalTo("Name",CurrentPromotion[a].Category);
										Customer.each(function(results) {
												for(x in AllourFavorites){
														if(AllourFavorites[x].Category === results.attributes.Name){
																AllourFavorites[x]["Logo"] = results.attributes.Logo._url;
																AllourFavorites[x]["oferta"] = "existe"
														}
												}

										})
                }
            }
						for (c in AllourFavorites) {
							if (AllourFavorites[c].TypePromotion == "SpecialPromotion") {
								AllourFavorites[c]["colum"] = "67"
								AllourFavorites[c]["columDisplay"] = "none"
							}else if (AllourFavorites[c].TypePromotion == "DirectDiscount") {
								AllourFavorites[c]["colum"] = "33"
							}else {
								AllourFavorites[c]["colum"] = "67"
								AllourFavorites[c]["columDisplay"] = "none"
							}
								console.log(AllourFavorites[c]);
						}
            var OurFavorites = AllourFavorites
            if (OurFavorites.length == 0) {
                OurFavorites.push({oferta : 'noHay'})
                OurFavorites.push({display : 'none'})
            }
            return OurFavorites
        },get: function(){}
    };
});
// ************* COUPONS APP FACTORY *************
app.factory('Coupons', function() {
	return {
		all: function(salvadosId) {
			console.log(Cupons);
			var AllCupon = [];
			var DatoCupon = [];
			var CuponALL = [];
			var ContCupon = []; //conteo de copunes
			var validar = "existe";
			var resultSetC = $.grep(CustomerList, function (e) {
				 return e.NameCategory.indexOf(salvadosId) == 0;
			});

			console.log(JSON.stringify(resultSetC[0]))
			for (a in Cupons) {
				if (salvadosId == Cupons[a].Category) {
					if (Cupons[a].ShopOnline == undefined) {
							Cupons[a].Display = "none"
					}else {
						Cupons[a].Display = ""
					}
					if (Cupons[a].TypeOfExchange == "DirectDiscount") {
						console.log("directe");
						Cupons[a]["CanjeaQ"] = "Q."
					}else {
							Cupons[a]["CanjeaP"] = "%"
					}
					if (Cupons[a].PhotoCupon ==null || Cupons[a].PhotoCupon ==undefined){
						Cupons[a]["PhotoCupons"] = "http://estaticos.tonterias.com/wp-content/uploads/2005/03/932_Reunion-en-una-sala-roja.jpg"
						Cupons[a]["DisplayWithoutImageCoupons"] = "none"
					}
					if (Cupons[a].PhotoCupon !=null) {
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
					if (InfoShop[z].url == undefined && InfoShop[z].cel == undefined) {
					DatoCupon.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"60px",margin:"0px"});
				}else if (InfoShop[z].cel == undefined) {
					DatoCupon.push({name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",url:InfoShop[z].url,webUrl:InfoShop[z].webUrl,webUrlIcon:InfoShop[z].webUrlIcon,margin:"-40px"})
				}else if (InfoShop[z].url == undefined) {
						DatoCupon.push({cel:InfoShop[z].cel,call:InfoShop[z].call,callIcon:InfoShop[z].callIcon,name:InfoShop[z].name,namecategory:InfoShop[z].namecategory,pixels:"110px",margin:"0"})
				}else {
						DatoCupon.push(InfoShop[z]);
					}
				}
			}
			if (resultSetC[0]["promo"] == 0) {
				validar = "no"
			}

			// INSTEAD ALL COUPON IN ALL COUPON VARIABLE
			allCupon = AllCupon;

			if (CurrentPromotion) {
				CuponALL.push(allCupon)
				CuponALL.push(DatoCupon)
				CuponALL.push(ContCupon)
				CuponALL.push([{contCoupon:resultSetC[0]["coupon"],contPromotion:resultSetC[0]["promo"],Validar:validar}])
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
					if (Cupons[a].TypeOfExchange == "DirectDiscount") {
						console.log("directe");
						Cupons[a]["CanjeaQ"] = "Q."
					}else {
							Cupons[a]["CanjeaP"] = "%"
					}
					AllCuponDescription.push(Cupons[a])
				}
			}
			allCuponDescription = AllCuponDescription;
			return allCuponDescription;
		},get: function(){}
	};
});
// ************* CALL PARSE PROMOTIONS *************
var Promo = Parse.Object.extend('Promotion');
var promotion = new Parse.Query(Promo);

var customer = new Parse.Query('Customer');
var favorite = new Parse.Query('Favorite');
var PromoSave = new Parse.Query('PromotionSaved')


function couponFunction() {
			// ************* CALL DATA PARSE *************
			//query limit hace la llamada de mas elementos
			Parse.Cloud.run('GetCouponsApp', {},{
				success:function (results) {
					console.log("copunes");
				//	console.log(results);
					Cupons = results
					console.log(Cupons);
				},
				error:function (error) {
				 console.log(error);
				}
			}).then(function(){
					var PromoSavess = new Parse.Query('PromotionSaved')

					PromoSavess.equalTo("UserID", IdUsuario);
					PromoSavess.find({
						success: function(results) {
							for (a in results[0].attributes.CuponID){
								for (b in Cupons){
									if (results[0].attributes.CuponID[a] === Cupons[b].IDCupon){
										if (Cupons[b].ColorPinCupon === "silver") {
											Cupons[b].ColorPinCupon  = "purple";
										}
									}
								}
							}

						},
						error: function(myObject, error) {
							// Error occureds
							console.log( error );
						}
					});

				});
}

couponFunction();
// function couponFunction() {
// 	Cupons = [];
// 	var Cupon = new Parse.Query('Cupon');
// 	var cup = Cupon.find({
// 		success: function(results) {
// 			for (x in results) {
// 				for (i in results[x].attributes.Customer){
// 					if (true === results[x].attributes.Status){
// 						if (results[x].attributes.PhotoCupon === null || results[x].attributes.PhotoCupon === undefined){
// 							Cupons.push({nul:"sin",
// 								name:results[x].attributes.Name,
// 								description:results[x].attributes.PromotionDescription,
// 								Canjea:results[x].attributes.CuponDiscount,
// 								Category:results[x].attributes.Customer[i],
// 								cupon:"existe",
// 								ColorPinCupon: "silver",
// 								BarCodePhoto:results[x].attributes.BarCodePhoto,
// 								Presentation:results[x].attributes.Presentation,
// 								description:results[x].attributes.PromotionDescription,
// 								customer:results[x].attributes.Customer[i],
// 								PhotoCupon:results[x].attributes.PhotoCupon,
// 								Publication_Date:results[x].attributes.PublicationDate,
// 								End_Date:results[x].attributes.EndDate,
// 								IDCupon:results[x].id,
// 								Categoryapp:results[x].attributes.CategoryApp,
// 								TypeCoupon:results[x].attributes.TypeCoupon,
// 								QuantityCoupons:results[x].attributes.QuantityCoupons,
// 								QuantityExchanged:results[x].attributes.QuantityExchanged,
// 								ShopOnline:results[x].attributes.ShopOnline,
// 								Display:"",
// 							});
// 						}else{
// 							Cupons.push({nul:"con",
// 								name:results[x].attributes.Name,
// 								description:results[x].attributes.PromotionDescription,
// 								Canjea:results[x].attributes.CuponDiscount,
// 								Category:results[x].attributes.Customer[i],
// 								cupon:"existe",
// 								ColorPinCupon: "silver",
// 								BarCodePhoto:results[x].attributes.BarCodePhoto,
// 								Presentation:results[x].attributes.Presentation,
// 								description:results[x].attributes.PromotionDescription,
// 								customer:results[x].attributes.Customer[i],
// 								PhotoCupon:results[x].attributes.PhotoCupon,
// 								Publication_Date:results[x].attributes.PublicationDate,
// 								End_Date:results[x].attributes.EndDate,
// 								IDCupon:results[x].id,
// 								Categoryapp:results[x].attributes.CategoryApp,
// 								TypeCoupon:results[x].attributes.TypeCoupon,
// 								QuantityCoupons:results[x].attributes.QuantityCoupons,
// 								QuantityExchanged:results[x].attributes.QuantityExchanged,
// 								ShopOnline:results[x].attributes.ShopOnline,
// 								Display:"",
// 							});
// 						}
// 					}
// 				}
// 			}
// 			console.log(Cupons)
// 		},
//
// 		error: function(myObject, error) {
// 			// Error occured
// 			console.log( error );
// 		}
// 	});
// 	// ************* WHEN THE PROMISE CATEGORIES IS READY *************
// 	cup.then(function(){
// 		var PromoSavess = new Parse.Query('PromotionSaved')
//
// 		PromoSavess.equalTo("UserID", IdUsuario);
// 		PromoSavess.find({
// 			success: function(results) {
// 				for (a in results[0].attributes.CuponID){
// 					for (b in Cupons){
// 						if (results[0].attributes.CuponID[a] === Cupons[b].IDCupon){
// 							if (Cupons[b].ColorPinCupon === "silver") {
// 								Cupons[b].ColorPinCupon  = "purple";
// 							}
// 						}
// 					}
// 				}
//
// 			},
// 			error: function(myObject, error) {
// 				// Error occureds
// 				console.log( error );
// 			}
// 		});
//
// 	});
// }
//
// couponFunction();
// ************* THE QUERY CALL MORE ELEMENTS *************
promotion = promotion.limit(100);
customer = customer.limit(100);

// var prom = promotion.find({
// 	success: function(results) {
// 		CurrentPromotion = [];
//
// 		for (x in results) {
//
// 			listPromoSuper.push(results[x].attributes.Customer)
// 			for (i in results[x].attributes.Customer){
// 				if (true === results[x].attributes.Status){
// 						promociones.push(results[x])
// 					if (results[x].attributes.Photo === null || results[x].attributes.Photo === undefined){
// 						CurrentPromotion.push({nul:"sin",name:results[x].attributes.Name,
// 							presentation:results[x].attributes.Presentation,
// 							description:results[x].attributes.PromotionDescription,
// 							basePrice:results[x].attributes.BasePrice,
// 							promotionalPrice:results[x].attributes.PromotionalPrice,
// 							ahorro:results[x].attributes.BasePrice - results[x].attributes.PromotionalPrice
// 							,Category:results[x].attributes.Customer[i],
// 							ID:"pinOffertsWithoutImage"+x,IDpromotion: results[x].id,
// 							conteo:0,
// 							oferta:"existe",
// 							Our_Favorites:results[x].attributes.OurFavorite,
// 							PhotoFavorite: results[x].attributes.PhotoFavorite,
// 							Logo:"",
// 							ColorPin: "silver",
// 							ShopOnline:results[x].attributes.ShopOnline,
// 							IconShopOnline: "j",
// 							Display: "",
// 						});
// 					}else{
// 						CurrentPromotion.push({nul:"con",photo:results[x].attributes.Photo._url,
// 							name:results[x].attributes.Name,
// 							presentation:results[x].attributes.Presentation,
// 							description:results[x].attributes.PromotionDescription,
// 							basePrice:results[x].attributes.BasePrice,
// 							promotionalPrice:results[x].attributes.PromotionalPrice,
// 							ahorro:results[x].attributes.BasePrice - results[x].attributes.PromotionalPrice
// 							, Category:results[x].attributes.Customer[i],
// 							ID:"pinOfferts"+x,IDpromotion: results[x].id,
// 							conteo:0,
// 							oferta:"existe",
// 							Our_Favorites:results[x].attributes.OurFavorite,
// 							PhotoFavorite: results[x].attributes.PhotoFavorite,
// 							Logo:"",
// 							ColorPin: "silver",
// 							ShopOnline:results[x].attributes.ShopOnline,
// 							IconShopOnline: "j",
// 							Display: "",
// 						});
// 					}
// 				}
// 			}
// 		}
// 		return CurrentPromotion;
// 	},
// 	error: function(myObject, error) {
// 		// Error occureds
// 		console.log( error );
// 	}
// });
// // ************* WHEN THE PROMISE PROMOTIONS IS READY *************
// prom.then(function(){
// 	var PromoSavess = new Parse.Query('PromotionSaved')
// 	PromoSavess.equalTo("UserID", IdUsuario);
// 	PromoSavess.find({
// 		success: function(results) {
// 			for (a in results[0].attributes.PromotionID){
// 				for (b in CurrentPromotion){
// 					if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
// 						if (CurrentPromotion[b].ColorPin === "silver") {
// 							CurrentPromotion[b].ColorPin  = "purple";
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
// });
// ************* CATEGORY LIST NAME VARIABLE *************
var CategoryListName = [];
var CategoryListNameConteo = [];

// *************** CALL GET PROMOTIONS FUNCTION IN PARSE CLOUD CODE ***************
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
                        AddPromotions(result);
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
// *************** ADD PROMOTION FUNCTION ***************
var GameScore = Parse.Object.extend("Promotion");
var query = new Parse.Query(GameScore);

function AddPromotions(Array) {
	customer.find().then(function(results) {
		for (x in results) {
			var CountPromotions = 0;
			listaNameSuperConteo.push(results[x].attributes.Name)
			InfoShop.push({
				cel:results[x].attributes.PhoneNumber,name:results[x].attributes.Name,url:results[x].attributes.URL,id:"favorite"+x,
				namecategory:results[x].attributes.CategoryApp,id:results[x].id,call:'Llamar',callIcon:'Q',webUrl:'Ir a pagina Web',webUrlIcon:'R',pixels:"170px",margin:"0"
			});

			if ("Supermercado" ==  results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listaNameSuperComparar.push(results[x].attributes.Name);
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
			}else if("Restaurantes" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
			}else if ("Moda" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
			}else if ("Entretenimiento" == results[x].attributes.CategoryApp){
			name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
			}else if ("Electrónicos" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
			};
		};
	});
};
// *************** HEART POPOVER FUNCTION ***************
var HeartPopover = [];
function Heart(id){
	favorite.find({
		success: function(results) {
			for (x in results) {
				if (results[x].attributes.UserID===IdUsuario){
					for (a in Categorys){
						for(b in results[x].attributes.CustomerID){
							if(Categorys[a].nameCategory ===results[x].attributes.CustomerID[b]){
								if (id === Categorys[a].names){
									document.getElementById(Categorys[a].ID+" "+Categorys[a].nameCategory).style.color="red";
								}
							}
						}
					}
				}else{}
			}
		},
		error: function(myObject, error) {
			// Error occureds
			console.log( error );
		}
	});
}
// *************** VIEW FAVORITE FUNCTION ****************
function viewFavorite() {
	AllFavorite = [];
	var favorite = new Parse.Query('Favorite');
	favorite.equalTo("UserID", IdUsuario);
	favorite.each(function(results) {
		for(b in results.attributes.CustomerID){
				for (c in CurrentPromotion){
					if (CurrentPromotion[c].Category === results.attributes.CustomerID[b]){

						AllFavorite.push(CurrentPromotion[c]);

					}
				}
		}

	}).then(function () {
		console.log(AllFavorite);
		var PromoSavess = new Parse.Query('PromotionSaved')
		PromoSavess.equalTo("UserID", IdUsuario);
		PromoSavess.find({
		success: function(results) {
			for (a in results[0].attributes.PromotionID){
				for (b in AllFavorite){
					if (results[0].attributes.PromotionID[a] === AllFavorite[b].IDpromotion){
						if (AllFavorite[b].ColorPin === "silver") {
							AllFavorite[b].ColorPin  = "purple";
						}
					}
				}
			}
		},
		error: function(myObject, error) {
			// Error occureds
			console.log( error );
		}
	});
	})
}

// *************** VIEW PROMOTION FUNCTION ***************
function viewPromotion(PromotionId,verificar){
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
				}
			}
		}
	},
	error: function(myObject, error) {
		// Error occureds
		console.log( error );
	}
}).then(function () {
	if (verificar == "eliminar") {
		console.log("se elimno");
		for (b in CurrentPromotion){
			if (PromotionId === CurrentPromotion[b].IDpromotion){
				console.log("************************");
				console.log(PromotionId);
				console.log(CurrentPromotion[b].IDpromotion);
				console.log("************************");
				if (CurrentPromotion[b].ColorPin === "purple") {

					CurrentPromotion[b].ColorPin  = "silver";
					console.log("----------------------------");
					console.log(CurrentPromotion[b].ColorPin);
				}
			}
		}

	}
}).then(function () {
	AllPromotion = [];
	var promotionSavedData = Parse.Object.extend("PromotionSaved");
	var query = new Parse.Query(promotionSavedData);
	query.equalTo("UserID", IdUsuario);
	query.find({
		success: function(results) {
			console.log(results);
			for (var i = 0; i < results[0].attributes.PromotionID.length; i++){
				for(x in CurrentPromotion) {
					if (results[0].attributes.PromotionID[i] === CurrentPromotion[x].IDpromotion) {
						console.log(CurrentPromotion[x].IDpromotion);

						AllPromotion.push(CurrentPromotion[x]);
						// AllPromotion[con]["PromotionId"] = promociones[x].id;
						// AllPromotion[con]["oferta"] = "existe";
						//con = con + 1;
					};
				};
			};
			for (var a = 0; a < results[0].attributes.CuponID.length; a++) {
				for (c in Cupons) {
					if (results[0].attributes.CuponID[a] === Cupons[c].IDCupon) {
						AllPromotion.push(Cupons[c]);
					};
				}
			}
		},
		error: function(error) {
			// Error occureds
			console.log(error);
		}
	}).then(function () {

		 viewFavorite()
	})
	})

}
// *************** SAVE FAVORITE FUNCTION ***************
function SaveFavorite(UserId, CustomerId) {
	// This function save favorite customer selected by user in Favorite class in parse
	result = {
		'UserID':UserId,
		'CustomerID':CustomerId
	};

	var saveFavoriteCustomer = Parse.Cloud.run('SaveFavorite', {"Array":result});
	saveFavoriteCustomer.then(function () {
		ReloadFavorite()
	});
};
// *************** DELETE FAVORITE FUNCTION ***************
function DeleteFavorite(UserId, CustomerId) {
	// This function delete favorite customer selected by user in Favorite class in parse
	result = {
		'UserID':UserId,
		'CustomerID':CustomerId
	};

  var DeleteFavoriteCustomer = Parse.Cloud.run('DeleteFavorite', {"Array":result});
	DeleteFavoriteCustomer.then(function () {
		ReloadFavoriteDelete(CustomerId)
	});
};
// *************** SAVE PROMOTION FUNCTION ***************
function SavePromotion(UserId, PromotionId) {
	// This function save favorite promotion selected by user in PromotionSaved class in parse
	result = {
		'UserID':UserId,
		'PromotionID': PromotionId
	};

	var Savepromotion = Parse.Cloud.run('SavePromotion', {"Array":result});

	Savepromotion.then(function(){
		viewPromotion()
	});
};
// *************** DELETE PROMOTION FUNCTION ***************
function DeletePromotion(UserId, PromotionId) {
	// This function delete favorite promotion selected by user in PromotionSaved class in parse
	result = {
		'UserID':UserId,
		'PromotionId':PromotionId
	};

	var Deletepromotion = Parse.Cloud.run('DeletePromotion', {"Array":result});

	Deletepromotion.then(function(){
		viewPromotion(PromotionId,"eliminar")
	});
};
// *************** SAVE FAVORITE CUPON FUNCTION ***************
function saveCuponFavorite(UserId, CuponID) {
	// This function save favorite cupon selected by user in PromotionSaved class in parse
	result = {
		'UserID':UserId,
		'CuponID': CuponID
	};
	var saveCupon = Parse.Cloud.run('saveFavoriteCupon', {"Array":result});

	saveCupon.then(function(){
		viewPromotion()
	});
};

// ************ DELETE FAVORIT CUPON ***************************
function deleteFavoriteCupon(UserId, CuponID) {
   /* This function save favorite promotion selected by user in PromotionSaved class
   in parse */

  result = {
      'UserID':UserId,
      'CuponID': CuponID
  };
  var deleteCupon = Parse.Cloud.run('deleteFavoriteCupon', {"Array":result});
  deleteCupon.then(function(){
    viewPromotion()
  });

};
