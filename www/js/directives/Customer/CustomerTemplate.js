app.directive('customerInfo', function() {
  // body...
  return {
    restrict: 'E',
    scope: {
      customer: '='
    },
    templateUrl: 'js/directives/Customer/CustomerTemplate.html'
  };
});
