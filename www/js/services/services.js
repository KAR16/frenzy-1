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

app.filter('removeDashes', function() {
  return function(input) {
    input = input || '';
    out = input.replace(new RegExp(/-/, 'g'), ' ');
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
