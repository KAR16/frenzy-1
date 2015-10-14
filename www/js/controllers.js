//****************************************************
angular.module('starter.controllers', ['ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    // TODO cambie `browse.html` a `login.html`. Estaba dando error.
    // Tambien comment out todo esto, parecia no estar haciendo nada.

    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Removee this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })
  //**************************************************************
  //*********************  POPOVER  ******************************


.controller('PopoverCtrl', function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
    $scope.message = 'hello';
  });

})

.controller('PopoverNewCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/popoverNew.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
      $scope.message = 'cheers';
    });
  })
  //**************************************************************
  .controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Supermercado',
      icon: 'E',
      id: 'supermercado'
    }, {
      title: 'Restaurantes',
      icon: 'F',
      id: 'restaurantes'
    }, {
      title: 'Moda',
      icon: 'G',
      id: 'moda'
    }, {
      title: 'Entretenimiento',
      icon: 'H',
      id: 'entretenimiento'
    }, {
      title: 'Electrónicos',
      icon: 'I',
      id: 'electronicos'
    }, {
      title: 'Otros',
      icon: 'J',
      id: 'otros'
    }];
  })

.controller('Supermercado', function($scope) {
  $scope.playlists = [{
    title: 'La TorreL',
    id: 'supermer'
  }, {
    title: 'wallmart',
    id: 'restaurantes'
  }, {
    title: 'paiz',
    id: 'centro'
  }];
})

.controller('Supermer', function($scope) {
    $scope.playlists = [{
      title: 'La Torre 2*1',
      id: '2x1'
    }, {
      title: 'la torre -20%',
      id: '20'
    }, {
      title: 'la torre platos',
      id: 'platos'
    }];
  })
  //********************************************************
  //********************************************************


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
})

.controller('SupermercadoCtrl', function($scope, Supermercados) {
  var dimensions = {
    name: 'supermarketMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Supermercados.all();
})

.controller('RestaurantesCtrl', function($scope, Restaurantes) {
  var dimensions = {
    name: 'restaurantMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Restaurantes.all();
})

.controller('ModaCtrl', function($scope, Moda) {
  var dimensions = {
    name: 'fashionMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Moda.all();
})

.controller('EntretenimientoCtrl', function($scope, Entretenimiento) {
  var dimensions = {
    name: 'entertainmentMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Entretenimiento.all();
})

.controller('ElectronicosCtrl', function($scope, Electronicos) {
  var dimensions = {
    name: 'electronicsMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Electronicos.all();
})
.controller('OtrosCtrl', function($scope, Otros) {
  var dimensions = {
    name: 'othersMenu'
  };
  Parse.Analytics.track("view", dimensions);

  $scope.chats = Otros.all();
})

.controller('CategoryCtrl', function($scope, Categorys) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    var dimensions = {
      name: 'categoriesMenu'
    };
    Parse.Analytics.track("view", dimensions);

    $scope.categorys = Categorys.all();

  })
  /****************************  tamayo  *****************************************/
  .controller('PaizCtrl', function($scope, $stateParams, Paiz) {
    console.log("calling PaizCtrl");

    var dimensions = {
      name: $stateParams.superId,
    };
    Parse.Analytics.track("view", dimensions);

    $scope.$on('$ionicView.enter', function() {
      $scope.chats = Paiz.get($stateParams.superId);
      $scope.popover = Paiz.all($stateParams.superId);

      $scope.heartMenu = "silver";


      $scope.heartPopover = function(id){
      /*    console.log("exitoso", HeartPopover)
          */
          //console.log(dato)
          console.log("id",id);
          console.log("userId", IdUsuario);

          var favorite = new Parse.Query('Favorite');
          favorite.equalTo("UserID", IdUsuario);
          favorite.equalTo("CustomerID", id);

          favorite.find({
            success: function(results) {
              // If result is returned with with at least one element
              // then it is true
              if ( results.length > 0 ) {
                $scope.heartMenu = "red";
              }
            },
            error: function(myObject, error) {
              // Error occureds
              console.log( error );
            }
          });
      }
    });
    console.log(Paiz);
  })
  /****************************  tamayo  final*****************************************/

.controller('ChatDetailCtrl', function($scope, $stateParams, Categorys) {
  $scope.chat = Categorys.get($stateParams.chatId);
})

.controller('OurfavoritesCtrl', function($scope, OurFavorites) {
  $scope.ourFavorites = OurFavorites.all();
  var PromoSaves = new Parse.Query('PromotionSaved')
  PromoSaves.equalTo("UserID", IdUsuario);
  PromoSaves.find({
    success: function(results) {
      // If result is returned with with at least one element
      // then it is true
      console.log(results[0].attributes)
      for (a in results[0].attributes.PromotionID){
            for (b in PhotoPaiz){
              //console.log(PhotoPaiz[b])
                if (results[0].attributes.PromotionID[a] === PhotoPaiz[b].IDpromotion){
                    console.log("Encontrado")
                    console.log( PhotoPaiz[b].IDpromotion,"bbbbbbbb")
                     //document.getElementById(PhotoPaiz[b].IDpromotion).style.color="purple";
                     //console.log("-----------------")
                     //console.log( results[x].attributes.PromotionID[a])
                    var cssColorpinOffer = document.getElementById(PhotoPaiz[b].IDpromotion).style.color;
                    if (cssColorpinOffer=="silver"){
                      document.getElementById(PhotoPaiz[b].IDpromotion).style.color="purple";
                               }
                 }
            }
      }
    },
    error: function(myObject, error) {
      // Error occureds
      console.log( error );
    }
  });

  var dimensions = {
    name: 'frenzyFavorites',
  };
  Parse.Analytics.track("view", dimensions);

})

.controller('BarraCtrl', function($scope, Barra) {
  $scope.chats = Barra.get();
})

.controller('AllFavoriteCtrl', function($scope, $stateParams, AllFavorite) {
  console.log("Called AllFavoriteCtrl");
  console.log(AllFavorite);

  var dimensions = {
    name: 'userFavorites',
  };
  Parse.Analytics.track("view", dimensions);


  $scope.$on('$ionicView.enter', function() {
    $scope.chats = AllFavorite.all();
    var PromoSaves = new Parse.Query('PromotionSaved')
    PromoSaves.equalTo("UserID", IdUsuario);
    PromoSaves.find({
      success: function(results) {
        // If result is returned with with at least one element
        // then it is true
        console.log(results[0].attributes)
        for (a in results[0].attributes.PromotionID){
              for (b in PhotoPaiz){
                //console.log(PhotoPaiz[b])
                  if (results[0].attributes.PromotionID[a] === PhotoPaiz[b].IDpromotion){
                      console.log("Encontrado")
                      console.log( PhotoPaiz[b].IDpromotion,"bbbbbbbb")
                       //document.getElementById(PhotoPaiz[b].IDpromotion).style.color="purple";
                       //console.log("-----------------")
                       //console.log( results[x].attributes.PromotionID[a])
                      var cssColorpinOffer = document.getElementById(PhotoPaiz[b].IDpromotion).style.color;
                      if (cssColorpinOffer=="silver"){
                        document.getElementById(PhotoPaiz[b].IDpromotion).style.color="purple";
                                 }
                   }
              }
        }
      },
      error: function(myObject, error) {
        // Error occureds
        console.log( error );
      }
    });
  });


  //$scope.chats = AllFavorite.get($stateParams.superId);




  $scope.getAllFavorites = function() {

  };

})


.controller('AllPromotionCtrl', function($scope, $stateParams, AllPromotion) {
  //console.log("calling PaizCtrl");
  var dimensions = {
    name: 'allPromotions',
  };
  Parse.Analytics.track("view", dimensions);

  $scope.$on('$ionicView.enter', function() {
    $scope.chats = AllPromotion.all($stateParams.salvadosId);
  });
  console.log("AllPromotionCtrl called");
  console.log(AllPromotion);
})


.controller('AccountCtrl', function($scope) {
  var dimensions = {
    name: 'settings',
  };
  Parse.Analytics.track("view", dimensions);

  $scope.settings = {
    enableFriends: true
  };
});
