app.directive('tutorialInfo', function() {
  // body...
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/Tutorial/tutorialTemplate.html'
  }
})
