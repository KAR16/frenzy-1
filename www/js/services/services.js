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

app.factory('CrossPromotion', ['$firebaseArray' , 'Customer' , 'User', function($firebaseArray,Customer,User) {
  return {
    get : function () {
      var customer  = Customer;
      var user = User;
      var cross = firebase.database().ref("CrossPromotion");
      var crossPromotion = $firebaseArray(cross);
      var crossPromotionArray = []
      user.$loaded().then(function () {
        crossPromotion.$loaded().then(function() {
          customer.$loaded().then(function () {
            for (a in crossPromotion) {
              if (typeof crossPromotion[a] == 'object') {
                for (i in customer) {
                  if (customer[i].$id == crossPromotion[a].customer && typeof customer[i] == 'object') {
                    crossPromotion[a]["Logo"] = customer[i].Logo
                    crossPromotion[a]["Nombre"] = customer[i].Name
                  }
                }
              }
            }
          })  
        })
      })
      return crossPromotion
    }
  }
}]);

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
