app.directive('tutorialInfo', function() {
  // body...
  return {
    restrict: 'E',
    scope: {
      customer: '='
    },
    templateUrl: 'js/directives/Tutorial/tutorialTemplate.html'
  };
});
