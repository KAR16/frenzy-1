// ********* MODULE STARTER *********
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
  var ref = firebase.database().ref('Userss/'+ user.uid)
  return $firebaseArray(ref.child('CrossPromotion'))

}]);

app.factory('UserSave' ,function ($firebaseArray,$firebaseObject) {
  return {
    get:function (id,dataAward) {
      var user = firebase.auth().currentUser;
      var ref = firebase.database().ref('Userss/'+ user.uid)
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

app.factory('UserSaveAward' ,function ($firebaseArray,$firebaseObject) {
  return {
    get:function (AwardID,code,id) {
      console.log(AwardID);
      console.log(code);
      console.log(id);
      var user = firebase.auth().currentUser;
      var refUser = firebase.database().ref('Userss/'+ user.uid)
      var refCrossPromotion = firebase.database().ref('CrossPromotion')
      var AwardChange = $firebaseArray(refUser.child('CrossPromotion').child(id).child('Award'))
      var codeval = $firebaseObject(refCrossPromotion.child(id))
      var actualHour = moment().tz("America/Guatemala").format('LLL');
      // var userchangeAward = $firebaseObject(ref.child('CrossPromotion').child(id))



      codeval.$loaded().then(function () {
        AwardChange.$loaded().then(function () {
          console.log(codeval.VerificationCodes);
          codeval.VerificationCodes.map(function(valueCodes) {
            if (valueCodes == code) {
              console.log(valueCodes);
              console.log(AwardChange);
              AwardChange.map(function(valueAward) {
                if (valueAward.AwardID == AwardID) {
                  //console.log(Object.keys(valueAward));
                  console.log(valueAward);
                  console.log(valueAward.$id);
                  //AwardChange[valueAward.$id].FechaHoraCanjeo = "sadasdas"
                  // valueAward.FechaHoraCanjeo = "sadasdas"
                  // console.log(valueAward.FechaHoraCanjeo);
                  var change = AwardChange.$ref()
                  var savechange = $firebaseObject(change)
                  savechange.$loaded(function () {
                    console.log("------------------------------------------");
                    console.log(savechange[valueAward.$id]);
                    savechange[valueAward.$id].FechaHoraCanjeo = actualHour;
                    savechange[valueAward.$id].Status = true;
                    savechange[valueAward.$id].CodigoCanjeoRedimido = code;
                    savechange.$save()
                  });
                }
              })
              console.log("codigo encontrada mada facar bit");
            }
          })
        });
      });

      // AwardChange.$loaded().then(function () {
      //   var actualHour = moment().tz("America/Guatemala").format('LLL');
      //   AwardChange.$add({AwardID:dataAward.key,CodigoCanjeoRedimido:"",FechaDeSolicitud:actualHour,FechaHoraCanjeo:"",Status:false})
      // }).then(function() {
      //   puntos.Points = puntos.Points - dataAward.Points;
      //   puntos.$save()
      // })
    }
  }
});

app.factory('Awards' ,function ($firebaseArray,Customer,User) {
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
                  promotion.Logo = valCustomer.Logo
                  promotion.Nombre = valCustomer.Name
                  user.map(function (valUser) {
                    if (valUser.$id == promotion.$id) {
                      if (valUser.Award != undefined) {
                        Object.keys(valUser.Award).map(function(valAwardsUser) {
                           Object.keys(promotion.Award).map(function(valAwards) {
                             if (valUser.Award[valAwardsUser].AwardID == valAwards && !valUser.Award[valAwardsUser].Status  ) {
                               console.log(promotion);
                               crossPromotionArray.push({
                                 Nombre:promotion.Nombre,
                                 Logo:promotion.Logo,
                                 Type:promotion.type,
                                 Award:promotion.Award[valAwards],
                                 AwardID: valUser.Award[valAwardsUser].AwardID,
                                 LegalTerms:promotion.LegalTerms,
                                 ExchangePolicy:promotion.ExchangePolicy,
                                 PromotionDescription:promotion.PromotionDescription,
                                 id:promotion.$id
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
      var crossPromotionArray = []
      user.$loaded().then(function () {
        crossPromotion.$loaded().then(function() {
          customer.$loaded().then(function () {
            crossPromotion.map(function (promotion) {
              customer.map(function (valCustomer) {
                if (valCustomer.$id == promotion.customer) {
                  promotion.Logo = valCustomer.Logo
                  promotion.Nombre = valCustomer.Name
                  user.map(function (valUser) {
                    if (valUser.$id == promotion.$id) {
                     promotion.countPromotion = Object.keys(promotion.Award).length
                     promotion.points = valUser.Points
                     promotion.percentagePoints = (100 * valUser.Points )/ promotion.MaxPoints
                     if (isNaN(promotion.points)) {
                          promotion.percentagePoints = 0
                          promotion.points = 0
                      }
                    }
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
