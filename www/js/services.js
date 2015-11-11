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
var PhotoPaiz = [];
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
// ************* SUPERMARKET APP FACTORY *************
app.factory('Supermercados', function() {
	// Might use a resource here that returns a JSON array Some fake testing data
	var supermercados = Super;

	return {
		all: function() {
			if (Super.length == 0) {
				Super.push({oferta:"noHay"});
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
	var entretenimiento = Entretenimientos;

	return {
		all: function() {
			if (Entretenimientos.length == 0) {
				Entretenimientos.push({oferta:"noHay"});
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
	for (a in promociones) {
		var C = promociones.length;
	}

	var moda = Modas;

	return {
		all: function() {
			if (Modas.length == 0) {
				Modas.push({oferta:"noHay"});
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
	var electronicos = Electronico;

	return {
		all: function() {
			if (Electronico.length == 0) {
				Electronico.push({oferta:"noHay"});
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
app.factory('Restaurantes', function() {
	var restaurantes = Restaurantes;

	return {
		all: function() {
			if (Restaurantes.length == 0) {
				Restaurantes.push({oferta:"noHay"});
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
	var Others = Otro;

	return {
		all: function() {
			if (Otro.length == 0) {
				Otro.push({oferta:"noHay"});
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
app.factory('Paiz', function() {
	var paiz = Category;

	return {
		all: function(superId) {},
		get: function(superId) {
			ALL = []
			Category = [];
			dato = [];
			ContPromo = [];
			IdCategory = superId;
			Cupcont=[];

			for (a in Cupons) {
				if (superId == Cupons[a].Category) {
					Cupcont.push(Cupons[a])
				}
			}

			for (c in PhotoPaiz) {
				if (superId === PhotoPaiz[c].Category) {
					Category.push(PhotoPaiz[c]);
				}
			}

			if (Category.length == 0) {
				Category.push({oferta:"noHay"});
			} else {
				ContPromo.push({conteo:Category.length})
			}

			for (z in InfoShop) {
				if (superId === InfoShop[z].name){
					dato.push(InfoShop[z]);
				}
			}

			if (PhotoPaiz) {
				ALL.push(Category)
				ALL.push(dato)
				ALL.push(ContPromo)
				return ALL;
			}
			return null;
		}
	};
});
// ************* ALL FAVORITE APP FACTORY *************
app.factory('AllFavorite', function() {
	var favorites = AllFavorite;

	return {
		all: function() {
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
	var promotio = AllPromotion;

	return {
		all: function(salvadosId) {
			if (AllPromotion.length == 0) {
				AllPromotion.push({oferta:"noHay"});
			}
			promotio = AllPromotion;
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
	var OurFavorites = PhotoPaiz
	var Customer = new Parse.Query('Customer');

	return {
		all: function() {
			AllourFavorites = [];
			for (a in PhotoPaiz) {
				if (PhotoPaiz[a].Our_Favorites === true ) {
					AllourFavorites.push(PhotoPaiz[a]);
					Customer.equalTo("Name",PhotoPaiz[a].Category);
					var cust = Customer.find({
						success: function(results) {
							for (i in AllourFavorites) {
								AllourFavorites[i]["logo"] = results[0].attributes.Logo._url;
							}
							cust.then(function(){});
						},
						error: function(myObject, error) {
							// Error occureds
							console.log( error );
						}
					});
				}
			}
			var OurFavorites = AllourFavorites
			return OurFavorites
		},get: function(){}
	};
});
// ************* CUPONS APP FACTORY *************
app.factory('Cupons', function() {
	return {
		all: function(salvadosId) {
			var AllCupon = [];
			var DatoCupon = [];
			var CuponALL = [];
			var ContCupon = [];

			for (a in Cupons) {
				if (salvadosId == Cupons[a].Category) {
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
					DatoCupon.push(InfoShop[z]);
				}
			}
			// INSTEAD ALL CUPON IN ALL CUPON VARIABLE
			allCupon = AllCupon;

			if (PhotoPaiz) {
				CuponALL.push(allCupon)
				CuponALL.push(DatoCupon)
				CuponALL.push(ContCupon)
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
var Cupon = new Parse.Query('Cupon');

// ************* CALL DATA PARSE *************
//var query = new Parse.Query('AppCategory');
//query limit hace la llamada de mas elementos
var cup = Cupon.find({
	success: function(results) {
		for (x in results) {
			for (i in results[x].attributes.Customer){
				if (true === results[x].attributes.Status){
					if (results[x].attributes.PhotoCupon === null || results[x].attributes.PhotoCupon === undefined){
						Cupons.push({nul:"sin",
							name:results[x].attributes.Name,
							description:results[x].attributes.PromotionDescription,
							Canjea:results[x].attributes.CuponDiscount,
							Category:results[x].attributes.Customer[i],
							cupon:"existe",
							ColorPinCupon: "silver",
							BarCodePhoto:results[x].attributes.BarCodePhoto,
							Presentation:results[x].attributes.Presentation,
							description:results[x].attributes.PromotionDescription,
							customer:results[x].attributes.Customer[i],
							PhotoCupon:results[x].attributes.PhotoCupon,
							IDCupon:results[x].id,
							Categoryapp:results[x].attributes.CategoryApp
						});
					}else{
						Cupons.push({nul:"con",
							name:results[x].attributes.Name,
							description:results[x].attributes.PromotionDescription,
							Canjea:results[x].attributes.CuponDiscount,
							Category:results[x].attributes.Customer[i],
							cupon:"existe",
							ColorPinCupon: "silver",
							BarCodePhoto:results[x].attributes.BarCodePhoto,
							Presentation:results[x].attributes.Presentation,
							description:results[x].attributes.PromotionDescription,
							customer:results[x].attributes.Customer[i],
							PhotoCupon:results[x].attributes.PhotoCupon,
							IDCupon:results[x].id,
							Categoryapp:results[x].attributes.CategoryApp
						});
					}
				}
			}
		}
	},
	error: function(myObject, error) {
		// Error occured
		console.log( error );
	}
});
// ************* WHEN THE PROMISE CATEGORIES IS READY *************
cup.then(function(){
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
// ************* THE QUERY CALL MORE ELEMENTS *************
promotion = promotion.limit(100);
customer = customer.limit(100);

var prom = promotion.find({
	success: function(results) {
		PhotoPaiz = [];

		for (x in results) {
			promociones.push(results[x])
			listPromoSuper.push(results[x].attributes.Customer)
			for (i in results[x].attributes.Customer){
				if (true === results[x].attributes.Status){
					if (results[x].attributes.Photo === null || results[x].attributes.Photo === undefined){
						PhotoPaiz.push({nul:"sin",name:results[x].attributes.Name,
							presentation:results[x].attributes.Presentation,
							description:results[x].attributes.PromotionDescription,
							basePrice:results[x].attributes.BasePrice,
							promotionalPrice:results[x].attributes.PromotionalPrice,
							ahorro:results[x].attributes.BasePrice - results[x].attributes.PromotionalPrice
							,Category:results[x].attributes.Customer[i],
							ID:"pinOffertsWithoutImage"+x,IDpromotion: results[x].id,
							conteo:0,
							oferta:"existe",
							Our_Favorites:results[x].attributes.OurFavorite,
							PhotoFavorite: results[x].attributes.PhotoFavorite,
							Logo:"",
							ColorPin: "silver"
						});
					}else{
						PhotoPaiz.push({nul:"con",photo:results[x].attributes.Photo._url,
							name:results[x].attributes.Name,
							presentation:results[x].attributes.Presentation,
							description:results[x].attributes.PromotionDescription,
							basePrice:results[x].attributes.BasePrice,
							promotionalPrice:results[x].attributes.PromotionalPrice,
							ahorro:results[x].attributes.BasePrice - results[x].attributes.PromotionalPrice
							, Category:results[x].attributes.Customer[i],
							ID:"pinOfferts"+x,IDpromotion: results[x].id,
							conteo:0,
							oferta:"existe",
							Our_Favorites:results[x].attributes.OurFavorite,
							PhotoFavorite: results[x].attributes.PhotoFavorite,
							Logo:"",
							ColorPin: "silver"
						});
					}
				}
			}
		}
		return PhotoPaiz;
	},
	error: function(myObject, error) {
		// Error occureds
		console.log( error );
	}
});
// ************* WHEN THE PROMISE PROMOTIONS IS READY *************
prom.then(function(){
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
// ************* CATEGORY LIST NAME VARIABLE *************
var CategoryListName = [];
var CategoryListNameConteo = [];
// query = query.limit(100);
// query.find({
// 	success: function(results) {
// 		// cycle through the results
// 		var PromotionS = Parse.Object.extend("Promotion");
// 		var q = new Parse.Query(PromotionS);
// 		for ( x in results) {
// 			List_name.push(results[x].attributes.CategoryName)
// 			q.equalTo("CategoryApp", results[x].attributes.CategoryName);
// 			var pro = q.find({
// 				success: function(results) {
// 					for (a in results){
// 						if (results[a].attributes.Status === true) {
// 							CategoryListNameConteo.push({cont:results[a].attributes.CategoryApp})
// 						}
// 					}
// 				},
// 				error: function(error) {
// 					// Error occureds
// 					console.log(error);
// 				}
// 			});
// 			CategoryListName.push({
// 				name: results[x].attributes.CategoryName,direc:results[x].attributes.CategoryName,cont_promo:0,icon: results[x].attributes.IconCategory,
// 				color : results[x].attributes.ColorCategory, cont_cupones:0
// 			})
// 			name  = results[x].attributes.CategoryName
// 		}
// 		pro.then(function(){
//
// 			for (w in CategoryListName){
// 				for (i in Cupons) {
// 					if(CategoryListName[w].name == Cupons[i].Categoryapp){
// 						CategoryListName[w].cont_cupones = CategoryListName[w].cont_cupones + 1
// 					}
// 				}
// 				for(s in CategoryListNameConteo){
//
// 					if(CategoryListName[w].name == CategoryListNameConteo[s].cont){
// 						CategoryListName[w].cont_promo = CategoryListName[w].cont_promo + 1
// 					}
//
// 				}
// 			}
//
//
// 		});
// 	},
// 	error: function(myObject, error) {
// 		// Error occured
// 		console.log( error );
// 	}
// });
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
				namecategory:results[x].attributes.CategoryApp,id:results[x].id
			});

			// if (results[x].attributes.Name in Array.Quantities[0]) {
			// 	CountPromotions =  Array.Quantities[0][results[x].attributes.Name];
			// 	average = Array.averageSavingscustomer[results[x].attributes.Name];
			// } else {
			// 	CountPromotions = 0;
			// 	average = 0;
			// };

			if ("Supermercado" ==  results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listaNameSuperComparar.push(results[x].attributes.Name);
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
				// Super.push({
				// 	id:x, name: listSupermercado[x], promo: CountPromotions,promedio:average,
				// 	lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name,oferta : 'existe'
				// });
			}else if("Restaurantes" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
				// Restaurantes.push({
				// 	id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
				// 	lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name ,oferta : 'existe'
				// });
			}else if ("Moda" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
				// Modas.push({
				// 	id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
				// 	lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name,oferta : 'existe'
				// });
			}else if ("Entretenimiento" == results[x].attributes.CategoryApp){
			name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
				// Entretenimientos.push({
				// 	id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
				// 	lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name,oferta : 'existe'
				// });
			}else if ("Electrónicos" == results[x].attributes.CategoryApp){
				name = results[x].attributes.Name;
				listSupermercado.push(results[x].attributes.Logo._url);
				listNameSupermercado.push(name.split(" ").join("_"));
				Categorys.push({
					nameCategory:results[x].attributes.Name,ID:"favorite"+x,names:results[x].attributes.CategoryApp
				})
				// Electronico.push({
				// 	id:x,name: listSupermercado[x], promo: CountPromotions,promedio:average,
				// 	lastText: "favorite"+x,img_class:listNameSupermercado[x], NameCategory: results[x].attributes.Name,oferta : 'existe'
				// });
			};
		};
	});
};
// *************** PROMOTIONS FUNCTION ***************
function Promotions(id){
	PromoSave.find({
		success: function(results) {
			for (x in results) {
				if (results[x].attributes.UserID === IdUsuario){
					for (a in results[x].attributes.PromotionID){
						for (b in PhotoPaiz){
							if (results[x].attributes.PromotionID[a] === PhotoPaiz[b].IDpromotion && id === PhotoPaiz[b].Category){
								var cssColorpinOffer = document.getElementById(PhotoPaiz[b].ID+" "+results[x].attributes.PromotionID[a]).style.color;
								if (cssColorpinOffer=="silver"){
									document.getElementById(PhotoPaiz[b].ID+" "+results[x].attributes.PromotionID[a]).style.color="purple";
								}
							}
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
}
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
	favorite.each(function(results) {
		for(b in results.attributes.CustomerID){
			if(results.attributes.UserID===IdUsuario){
				for (c in PhotoPaiz){
					if (PhotoPaiz[c].Category === results.attributes.CustomerID[b]){
						AllFavorite.push(PhotoPaiz[c]);
					}
				}
			}
		}
	});
}
// *************** VIEW PROMOTION FUNCTION ***************
function viewPromotion(){
	AllPromotion = [];
	var con = 0;
	var promotionSavedData = Parse.Object.extend("PromotionSaved");
	var query = new Parse.Query(promotionSavedData);
	query.equalTo("UserID", IdUsuario);
	query.find({
		success: function(results) {

			for (var i = 0; i < results[0].attributes.PromotionID.length; i++){
				for(x in promociones) {
					if (results[0].attributes.PromotionID[i] === promociones[x].id) {
						AllPromotion.push(promociones[x].attributes);
						AllPromotion[con]["PromotionId"] = promociones[x].id;
						AllPromotion[con]["oferta"] = "existe";
						con = con + 1;
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
	});
}
// *************** SAVE FAVORITE FUNCTION ***************
function SaveFavorite(UserId, CustomerId) {
	// This function save favorite customer selected by user in Favorite class in parse
	result = {
		'UserID':UserId,
		'CustomerID':CustomerId
	};

	Parse.Cloud.run('SaveFavorite', {"Array":result});
};
// *************** DELETE FAVORITE FUNCTION ***************
function DeleteFavorite(UserId, CustomerId) {
	// This function delete favorite customer selected by user in Favorite class in parse
	result = {
		'UserID':UserId,
		'CustomerID':CustomerId
	};

	Parse.Cloud.run('DeleteFavorite', {"Array":result});
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
		viewPromotion()
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
