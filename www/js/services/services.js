// ********* MODULE STARTER **********
var app = angular.module('starter.services', []);

app.factory('Auth', ['$firebaseAuth',
  function ($firebaseAuth) {
     return $firebaseAuth();
 }]);

//******************************************************************************//
app.factory('Customer', ['$firebaseArray', function($firebaseArray) {

	var ref = secondaryApp.database().ref('Customer');
	return $firebaseArray(ref);

}]);

app.factory('Promotion', ['$firebaseArray', function($firebaseArray) {

	var ref = firebase.database().ref('Promotion');
	return $firebaseArray(ref);

}]);

app.factory('Coupon', ['$firebaseArray', function($firebaseArray) {

	var ref = firebase.database().ref('Coupon');
	return $firebaseArray(ref);

}]);

app.factory('Favorite', ['$firebaseObject', function($firebaseObject) {

	var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('Users/' + user.uid);
  return $firebaseObject(ref.child('Favorites'));

}]);

app.factory('Pin', ['$firebaseObject', function($firebaseObject) {

	var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('Users/' + user.uid);
  return $firebaseObject(ref.child('Pins'));

}]);

app.factory('User' , ['$firebaseArray' , function ($firebaseArray) {
  var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('Users/'+ IdUsuario)
  return $firebaseArray(ref.child('CrossPromotion'))

}]);

app.factory('UserSave' ,function ($firebaseArray,$firebaseObject) {
  return {
    get:function (id,dataAward) {
      var user = firebase.auth().currentUser;
      var ref = firebase.database().ref('Users/'+ IdUsuario)
      var AwardChange = $firebaseArray(ref.child('CrossPromotion').child(id).child("Award"))
      var puntos = $firebaseObject(ref.child('CrossPromotion').child(id))
      AwardChange.$loaded().then(function () {
        var actualHour = moment().tz("America/Guatemala").format('LLL');
        AwardChange.$add({AwardID:dataAward.key,CodigoCanjeoRedimido:"",FechaDeSolicitud:actualHour,FechaHoraCanjeo:"",Status:false})
      }).then(function() {
        puntos.Points = puntos.Points - dataAward.Points;
        puntos.$save()
      })
    }
  }
});

app.factory('Awards' ,function ($firebaseArray,Customer,User,$firebaseObject) {
  return {
    get : function () {
      var customer  = Customer;
      var user = User
      var cross = firebase.database().ref("CrossPromotion");
      var crossPromotion = $firebaseArray(cross);
      var crossPromotionArray = []
      user.$loaded().then(function () {
        crossPromotion.$loaded().then(function() {
          customer.$loaded().then(function () {
            crossPromotion.map(function (promotion) {
              customer.map(function (valCustomer) {
                if (valCustomer.$id == promotion.customer) {
                  console.log(promotion);
                  promotion.Logo = valCustomer.Logo
                  promotion.Nombre = valCustomer.Name
                  user.map(function (valUser) {
                    if (valUser.$id == promotion.$id) {
                      if (promotion.type == "directAward") {
                        Object.keys(valUser).map(function (keyAward) {
                          try {
                            if (valUser[keyAward].AwardID != null && !valUser[keyAward].Status ) {
                              crossPromotionArray.push({
                                Nombre:promotion.Nombre,
                                Logo:promotion.Logo,
                                Type:promotion.type,
                                Award:promotion.Award[valUser[keyAward].AwardID],
                                AwardID:valUser[keyAward].AwardID,
                                LegalTerms:promotion.LegalTerms,
                                ExchangePolicy:promotion.ExchangePolicy,
                                PromotionDescription:promotion.PromotionDescription,
                                id:promotion.$id,
                                IdCouponCode:keyAward
                              })
                            }
                          } catch (e) {

                          } finally {

                          }
                        })
                      }
                      if (valUser.Award != undefined) {
                        Object.keys(valUser.Award).map(function(valAwardsUser) {
                           Object.keys(promotion.Award).map(function(valAwards) {
                             if (valUser.Award[valAwardsUser].AwardID == valAwards && !valUser.Award[valAwardsUser].Status) {
                               crossPromotionArray.push({
                                 Nombre:promotion.Nombre,
                                 Logo:promotion.Logo,
                                 Type:promotion.type,
                                 Award:promotion.Award[valAwards],
                                 AwardID: valUser.Award[valAwardsUser].AwardID,
                                 LegalTerms:promotion.LegalTerms,
                                 ExchangePolicy:promotion.ExchangePolicy,
                                 PromotionDescription:promotion.PromotionDescription,
                                 id:promotion.$id,
                                 IdUserAward: valAwardsUser
                               })
                             }
                           })

                        })
                      }
                    }
                  })
                }
              })
            })
          })
        })
      })
      return crossPromotionArray
    }
  }

});

app.factory('CrossPromotionAcumulatePoints', ['$firebaseArray' , 'Customer' , 'User', function($firebaseArray,Customer,User) {
  return {
    get : function () {
      var customer  = Customer;
      var user = User
      var cross = firebase.database().ref("CrossPromotion");
      var crossPromotion = $firebaseArray(cross);
      var crossPromotionArrayss = []
      user.$loaded().then(function () {
        crossPromotion.$loaded().then(function() {
          customer.$loaded().then(function () {
            crossPromotion.map(function (promotion) {
              customer.map(function (valCustomer) {
                if (valCustomer.$id == promotion.customer && promotion.Status == true && promotion.type == 'points') {
                  promotion.Logo = valCustomer.Logo
                  promotion.Nombre = valCustomer.Name
                  promotion.countPromotion = Object.keys(promotion.Award).length;
                  promotion.points = 0;
                  promotion.percentagePoints = (100 * promotion.points )/ promotion.MaxPoints
                  user.map(function (valUser) {
                    if (valUser.$id == promotion.$id) {
                     promotion.points = valUser.Points
                     promotion.percentagePoints = (100 * valUser.Points )/ promotion.MaxPoints
                     if (isNaN(promotion.points)) {
                          promotion.percentagePoints = 0
                          promotion.points = 0
                      }
                    }else{
                      if (isNaN(promotion.points)) {
                           promotion.percentagePoints = 0
                           promotion.points = 0
                       }
                    }
                  //  crossPromotionArrayss.push(promotion)
                  })
                }
              })
            })
          })
        })
      })
      return crossPromotion
    }
  }
}]);
app.factory('pointsDescripcion',function () {
  return {
    get : function (id,crossPromotion) {
      var arrayPromotion = ''
      crossPromotion.map(function (value) {
        if (value.$id == id) {
          arrayPromotion = value
        }
      })
     return arrayPromotion
    }
  }
});
app.factory('requestStore',function ($firebaseArray) {
  var ref = firebase.database().ref('RequestStore');
  return $firebaseArray(ref);
})
app.filter('removeDashes', function() {
  return function(input) {
    input = input || "";
    out = input.replace(/-/g,' ');
    return out;
  };
});

app.filter('timeDifference', function() {
  return function(dateString) {

    var date = moment(dateString, 'DD/MM/YYYY');
    var d = new Date(date);
    var today = new Date();

    var diff = Math.abs(d.getTime() - today.getTime());
    var out =  Math.ceil(diff / (1000 * 3600 * 24));
    return out;
  };
});

app.filter('getDate', function() {
  return function(dateString) {
    var date = moment(dateString, 'DD/MM/YYYY');
    return date.format('DD/MM/YYYY');
  };
});


app.filter('filterAward', function() {
  return function(Awards,id) {
    var NewAwards = [];
    Awards.map(function(value) {
      if (value.AwardID == id) {
        NewAwards.push(value)
      }
    })
    return NewAwards;
  };
});

app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;
    var array = [];
    for(var objectKey in input) {
        input[objectKey]['key'] = objectKey;
        array.push(input[objectKey]);
    }
    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return b - a;
    });
    return array;
 }
});
