app.directive('categoryInfo', function() {
  // body...
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/categoryApp.html'
  }
})
