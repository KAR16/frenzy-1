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
