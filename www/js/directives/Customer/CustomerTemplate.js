app.directive('customerInfo', function() {
  // body...
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/Customer/CustomerTemplate.html'
  };
});
