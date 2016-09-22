var displayNoneInline = [];
var FirebaseFavorite = [];
var FirebasePromotionSaved = [];

/****FIREBASE***/
var config = {
    apiKey: "AIzaSyCCkqPKuZh8QtKM_tU2nFDAcjjzufcVX6c",
    authDomain: "frenzyapplication.firebaseapp.com",
    databaseURL: "https://frenzyapplication.firebaseio.com",
    storageBucket: "frenzyapplication.appspot.com",
};

var config2 = {
    apiKey: "AIzaSyDIbQh6IA6D9HHhfogQUZP63omtjwzAiBA",
    authDomain: "frenzydashboard.firebaseapp.com",
    databaseURL: "https://frenzydashboard.firebaseio.com",
    storageBucket: "frenzydashboard.appspot.com",
};

var mainApp = firebase.initializeApp(config);
var secondaryApp = firebase.initializeApp(config2, "Secondary");
///////////////////////////////////////////////CALL CUSTOMER////////////////////////////////////////////////////////////////

/*****  CONTROLLERS  *****/
angular.module('starter.controllers', ['ionic', 'firebase'])
// -------------------- LOGIN WITHOUT FACEBOOK ------------------------
// ************************* LOGIN WITH FACEBOOK *************************
.controller('RegisterController', function($scope, $state, $ionicLoading, $rootScope) {

    $scope.user = {};
    $scope.error = {};
    // Object styles for Option Gender Button to Register Account
    $scope.genderMaleBStyle = {};
    $scope.genderFemaleleBStyle = {};
    // Gender variable for to save in Parse
    $scope.optionGender = '';
    // Color Button Selected in Register Form if the user is Male or Female
    $scope.genderMaleStyle = function() {
        $scope.genderMaleBStyle = {
            'background-color': '#263147 ',
            'color': 'white'
        };
        $scope.genderFemaleleBStyle = {
            'color': '#263147  '
        };
        $scope.optionGender = 'male';
    };

    $scope.genderFemaleleStyle = function() {
            $scope.genderFemaleleBStyle = {
                'background-color': '#263147 ',
                'color': 'white'
            };
            $scope.genderMaleBStyle = {
                'color': '#263147  '
            };
            $scope.optionGender = 'female';
    };

    // This Function works for to send email to the new User Firebase before of the register
    $scope.SendEmail = function() {
          // This Function works for to send email verification
          mainApp.auth().currentUser.sendEmailVerification().then(function() {
              /* Alert for validate email */
              swal({
                      title: "Bien Hecho!",
                      text: "Se envió una confirmación a tu correo electrónico, asegúrate de verificar en la Bandeja de Correo no Deseado si no lo encuentras...",
                      imageUrl: "img/sobre.png",
                      timer: 3000,
                      /* Button ok disable */
                      showConfirmButton: false
                  },
                  function() {
                      setTimeout(function() {
                          // Logout User Firebase
                          mainApp.auth().signOut(); //Else bug
                          swal.close(); //Close Alert
                          $state.go('login'); //Redirect to Login
                      }, 2000);
                  });
          });
      };
        // This Function works for to Validate fields of the form
    $scope.Alert = function() {
        if ($scope.user.email === undefined) {
            sweetAlert('Lo sentimos', 'El campo de correo electrónico no puede estar vacío. Intentelo nuevamente', 'error');
        } else if ($scope.user.password === undefined) {
            sweetAlert('Lo sentimos', 'Debe ingresar una contraseña para poder continuar. Intentelo nuevamente', 'error');
        } else {
            $scope.ValidarEmail = "none";
            $scope.Validarpassword = "none";
                // Redirect to Register Function for to create a new user in Firebase
            $scope.register();
        }
    };
        // Register Function for to create a new User in Firebase
    $scope.register = function() {

        $ionicLoading.show({
            noBackdrop: true,
            template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner> <p style = "color:white">Cargando...</p>'
        });

        mainApp.auth().signOut();
        // Global Variables
        var name = $scope.user.NameRegister;
        var email = $scope.user.email;
        var password = $scope.user.password;
        var gender = $scope.optionGender;
        var dateBirthday = $scope.user.birthday;
        // To convert a date the birthday field
        if (dateBirthday) {
            dateBirthday = dateBirthday.toLocaleDateString();
        }
        // Save Users in Firebase Auth
        mainApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var ErrorCodeFirebase = error.code;
            if (ErrorCodeFirebase == 'auth/email-already-in-use') {
                $ionicLoading.hide();
                // Alert and Functionality when the user is registered in Firebase
                swal({
                        title: 'Lo sentimos',
                        text: 'El usuario ya está registrado, por favor inicia sesión.',
                        type: 'error',
                        showCancelButton: false,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                    // On click Event Alert
                    function() {
                        setTimeout(function() {
                            // Clean Register Form
                            $('.createUserName').val('');
                            $('.createUserEmail').val('');
                            $('.createUserPassword').val('');
                            $('.createUserBirthday').val('');
                            $scope.genderMaleBStyle = {};
                            $scope.genderFemaleleBStyle = {};
                            // Close the SweetAlert
                            swal.close();
                            // Redirect to Login Form
                            $state.go('login');
                        }, 2000);
                    });
            }
        }).then(function() {
            // Clean Register Form
            $('.createUserName').val('');
            $('.createUserEmail').val('');
            $('.createUserPassword').val('');
            $('.createUserBirthday').val('');
            $scope.genderMaleBStyle = {};
            $scope.genderFemaleleBStyle = {};

            // Connect to User Entity on Firebase
            var user = mainApp.auth().currentUser;
            // Call to Users Entity Firebase Data
            mainApp.database().ref('Users').once('value', function(snapshot) {
                // If doesn't exist anything data then to save the new data
                mixpanel.identify(email);
                mixpanel.people.set({
                    "$email": email,
                    "$gender": gender,
                    "$birthday": dateBirthday,
                    "$name": name,
                    "$typeLogin": "Email"

                });
                if (snapshot.val() === null) {
                    mainApp.database().ref('Users/' + user.uid).update({
                        Username: name,
                        Email: email,
                        Gender: gender,
                        Birthday: dateBirthday
                    });
                    $ionicLoading.hide();
                    $scope.SendEmail();
                } else {
                    // Verify each UID user and if doesn't exist add the new register
                    for (var x in snapshot.val()) {
                        if (x != user.uid) {
                            mainApp.database().ref('Users/' + user.uid).update({
                                Username: name,
                                Email: email,
                                Gender: gender,
                                Birthday: dateBirthday
                            });
                            $ionicLoading.hide();
                            $scope.SendEmail();
                        }
                    }
                }
            });
        });
    };
})

// ************************* LOGIN WITH FRENZY *************************
.controller('LoginCtrlEmail', function($scope, $state, $rootScope, $ionicLoading) {

    // Verify Email with Firebase
    $scope.VerifyEmail = function() {
        mainApp.auth().onAuthStateChanged(function(user) {
            // Email already verified

            if (user.emailVerified) {
                $state.go('loadingLoginUser');
                IdUsuario = user.uid;
                mainApp.database().ref('Users').on('value', function(snapshot) {
                    for (var x in snapshot.val()) {
                        if (x == IdUsuario) {
                            IdGender = snapshot.val()[x].Gender;
                        }
                    }
                });
            } else {
                sweetAlert('Oops', 'Por favor verifica tu correo electrónico e intenta nuevamente.', 'warning');
            }
        });
    };

    $scope.loginWithEmail = function(user) {
        mixpanel.track("LoginClick", {
            "loginButton": "Email"
        });
        if (typeof user === 'undefined') {
            sweetAlert('Datos Inválidos', 'Debes ingresar correo y contraseña', 'error');
        } else if (user['username'] === undefined || user['username'] === '') {
            sweetAlert('Datos Inválidos', 'Por favor Verifica los campos requeridos', 'error');
            delete user;
        } else if (user['password'] === undefined || user['password'] === '') {
            sweetAlert('Datos Inválidos', 'Por favor Verifica los campos requeridos', 'error');
            delete user
        } else {
            // If the User is Logged
            if (mainApp.auth().currentUser) {
                mainApp.auth().signOut(); //Loggout Sesion Firebase
            }
            //TODO
            // var currentUser = Parse.User.current();
            // if (currentUser) {
            //   Parse.User.logOut();
            // }

            // Login With Firebase
            mainApp.auth().signInWithEmailAndPassword(user.username, user.password).catch(function(error) {
                // // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // If the User password is incorrect
                // if (errorCode === 'auth/wrong-password') {
                //   sweetAlert('Oops', 'Contraseña Incorrecta, Intenta nuevamente', 'error');
                // }
                //  else {
                // $scope.loginWithParse()
                // }
            }).then(function() {
                if (mainApp.auth().currentUser == null) {
                    // TODO sign in error.



                } else {
                    IdUsuario = mainApp.auth().currentUser.uid;
                    mainApp.database().ref('Users').once('value', function(snapshot) {
                        if (snapshot.val()[mainApp.auth().currentUser.uid]['Parse'] == true) {
                            IdGender = snapshot.val()[mainApp.auth().currentUser.uid].Gender;
                            $state.go('loadingLoginUser');
                        } else if (snapshot.val()[mainApp.auth().currentUser.uid]['Parse'] == undefined) {
                            $scope.VerifyEmail()
                        }
                    })
                }
            })
        }
    }
})

//*********************  MENU CONTROLLER  *******************************
.controller('menuCtrl', function($scope, $state) {


})
// ********************* PAGE_START CONTROLLER ****************************
.controller('HomeCtrl', function($scope, $rootScope, $ionicLoading, $timeout, $firebaseArray) {

    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "Categorys",
        "Gender": IdGender,
        "User": NameUser
    });

    var ref = mainApp.database().ref().child('AppCategory');
    $scope.categories = $firebaseArray(ref);

    ////////////////////////////////////////////////////////////////////////////////////
    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER $ionicView.loaded	 *****
    $scope.$on('$ionicView.enter', function() {

      // Show Loading Icon
      $scope.loading = $ionicLoading.show({
          noBackdrop: true,
          template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
      });

      $timeout(function() {
          $ionicLoading.hide();
      }, 2000);

      $scope.$parent.data = {
    			heading: '',
    			image: 'img/icn-35.png',
    			footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
    			backButton: false
      };

    });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, Customer, Promotion, Favorite) {

  $scope.favorites = Favorite;
  $scope.customers = Customer;
  $scope.promotions = Promotion;

  var customersLoaded = false;

  $scope.customers.$loaded(function(){
    getFavoriteCount();
    customersLoaded = true;
  });

  var getFavoriteCount = function() {
    $scope.favoritesCount = 0;
    for(var i in $scope.customers) {
      var customer = $scope.customers[i];
      console.log(customer);
      if ($scope.favorites[customer.$id] === true) {
        $scope.favoritesCount += 1;
      }
    }
  };

  $scope.favoritesCount = 0;
  $scope.favorites.$watch(function(event) {
    if (customersLoaded === true) {
      getFavoriteCount();
    }
  });

    /*************************************************/
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "YourFavorites",
        "Gender": IdGender,
        "User": NameUser
    });
        /**************************************************/

    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: '',
          image: 'img/icn-35.png',
          footerIconColors: ['#A7A9AC', '#FF5252', '#A7A9AC', '#A7A9AC'],
          backButton: false
      };
      $scope.$apply();
    });

})
// *************************** SAVED CONTROLLER ***************************
.controller('AllPromotionCtrl', function($scope, $stateParams, Promotion, Coupon, Pin) {
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "PinSaved",
        "Gender": IdGender,
        "User": NameUser
    });

    $scope.pins = Pin;
    $scope.promotions = Promotion;
    $scope.coupons = Coupon;

    var promotionsLoaded = false;
    var couponsLoaded = false;
    $scope.contentLoaded = false;

    $scope.promotions.$loaded(function(){
      promotionsLoaded = true;
      if (couponsLoaded) {
        getPinCount();
        $scope.contentLoaded = true;
      }
    });
    $scope.coupons.$loaded(function(){
      couponsLoaded = true;
      if (promotionsLoaded) {
        getPinCount();
        $scope.contentLoaded = true;
      }
    });

    $scope.pinsCount = 0;
    console.log($scope.pinsCount);
    $scope.pins.$watch(function(event) {

      if ($scope.contentLoaded) {
        getPinCount();
      }

    });


    var getPinCount = function() {
      $scope.pinsCount = 0;
      for(var i in $scope.promotions) {
        var promotion = $scope.promotions[i];
        if ($scope.pins[promotion.$id] === true) {
          $scope.pinsCount += 1;
        }
      }
      for(var j in $scope.coupons) {
        var cupon = $scope.coupons[j];
        if ($scope.pins[cupon.$id] === true) {
          $scope.pinsCount += 1;
        }
      }
      console.log($scope.pinsCount);
    };


    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: '',
          image: 'img/icn-35.png',
          footerIconColors: ['#A7A9AC', '#A7A9AC', '#9C28B0', '#A7A9AC'],
          backButton: false
      };
      $scope.$apply();
    });

})
//********************** Customer CONTROLLER *****************************
.controller('changeColorHeartCtrl', function($scope, Favorite) {

  $scope.favorites = Favorite;

  $scope.ChangeColorHeart = function(customerId) {
    console.log('calling changecolorheart', customerId);
    //Check if customerId is in Current Users Favorites
    if(customerId in $scope.favorites) {
      // Switch boolean value
      $scope.favorites[customerId] = !$scope.favorites[customerId];
    } else {
      $scope.favorites[customerId] = true;
    }
    // Save to DB
    $scope.favorites.$save().then(function(ref){
      console.log('Favorite. Changed - ', customerId);
    }, function(error){
      console.log("Error:", error);
    });
  };
})

.controller('pinCtrl', function($scope, Pin) {

  $scope.pins = Pin;

  $scope.changeColorPinCupon = function(id) {
    //Check if customerId is in Current Users Favorites
    if(id in $scope.pins) {
      // Switch boolean value
      $scope.pins[id] = !$scope.pins[id];
    } else {
      $scope.pins[id] = true;
    }
    // Save to DB
    $scope.pins.$save().then(function(ref){
      console.log('Pins. Changed - ', id);
    }, function(error){
      console.log("Error:", error);
    });
  };

})

//////////////////////
.controller('CustomerCtrl', function($scope, $rootScope, $ionicLoading, $stateParams, Customer) {

    $scope.customers = Customer;
    $scope.category = $stateParams.IDcustomer;

    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "Customers",
        "Gender": IdGender,
        "User": NameUser
    });
    mixpanel.track("ClickCategory", {
        "NameCategory": $scope.category,
        "Gender": IdGender,
        "User": NameUser
    });
    // Loading scope
    $scope.loading = $ionicLoading.show({
        noBackdrop: true,
        template: '<ion-spinner customer1lass="spinner" icon="lines" class = "Loading' + $scope.category + '"></ion-spinner>'
    });

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        setTimeout(function() {
            $ionicLoading.hide();
        }, 800);

        $scope.$parent.data = {
            heading: $scope.category,
            image: '',
            footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
            backButton: true
        };

    });
})
///////////


.controller('PromotionsDescription', function($scope, $stateParams, Promotion) {
    mixpanel.track("view", {
        "type": "PromotionsDescription",
        "Gender": IdGender,
        "User": IdUsuario
    });

    $scope.promotions = Promotion;
    $scope.promotions.$loaded(function(data){
      for (var i in $scope.promotions) {
        if ($scope.promotions[i].$id == $stateParams.promotionId) {
          $scope.promotion = $scope.promotions[i];
        }
      }
    });

})

// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams, $ionicLoading, $cordovaSocialSharing, $cordovaInAppBrowser, Coupon, Promotion, Customer, Favorite, $ionicPopover) {


  $ionicPopover.fromTemplateUrl('templates/popover2.html', {
      scope: $scope,
  }).then(function(popover) {
      $scope.popover = popover;
  });

  $scope.viewCoupons = true;
  $scope.setViewCoupons = function(bool) {
    $scope.viewCoupons = bool;
  };

  $scope.customerId = $stateParams.CuponID;
  console.log('Customer ID', $stateParams.CuponID);

  var coupons = Coupon;
  var promotions = Promotion;
  var customers = Customer;

  $scope.customerCoupons = [];
  $scope.customerPromotions = [];
  $scope.favorites = Favorite;

  //When all coupons are loaded, filter only coupons of current customer
  coupons.$loaded(function(){
    for (var i in coupons) {
      if(coupons[i].Provider == $scope.customerId) {
        $scope.customerCoupons.push(coupons[i]);
      }
    }
    if ($scope.customerCoupons.length < 1) {
      $scope.viewCoupons = false;
    }
    console.log('Customer Coupons' ,$scope.customerCoupons);
  });

  //When all promotions are loaded, filter only promotions of current customer
  promotions.$loaded(function(){
    for (var i in promotions) {
      if(promotions[i].Provider == $scope.customerId) {
        $scope.customerPromotions.push(promotions[i]);
      }
    }
    console.log('Customer Promotions' ,$scope.customerPromotions);
  });

  // Select current customer
  customers.$loaded(function(){
    for (var i in customers) {
      if(customers[i].Name == $scope.customerId) {
        $scope.customer = customers[i];
        break;
      }
    }
  });

    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "copuns",
        "Gender": IdGender,
        "User": NameUser
    });
    // For to update QuantityExchanged


    $scope.sendSms = function() {
        $cordovaSocialSharing.shareViaSMS('Visitanos en: http://frenzy.com.gt para encontrar las mejores ofertas :)', '').then(function(result) {}, function(err) {
            console.log('error mensaje');
        });
    };

    // *************** CALL PHONE FUNCTION ***************
    $scope.call = function(cell) {
        a = cell.toString();
        b = 'tel:';
        window.open(b + a);
    };
        // *************** URL BROWSER SHOP FUNCTION ***************
    $scope.shopUrl = function(url, id, name) {
        var NamePromo = name.split(" ").join("_");
        var NameUser = String(IdUsuario);

        if (id == "web") {
            mixpanel.track("ClickWeb", {
                "Costumer": name,
                "User": NameUser,
                "Gender": IdGender
            });
            window.open = $cordovaInAppBrowser.open(url, '_blank', 'location=yes');
        } else {
            mixpanel.track("ClickCartShop", {
                "Costumer": name,
                "User": NameUser,
                "Gender": IdGender
            });
            window.open = $cordovaInAppBrowser.open(url, '_blank', 'location=yes');
        }
    };

    $scope.showCouponDescription = function(id) {
        var QuantityExchangedSuma = 0;
        mainApp.database().ref('Coupon').once('value', function(snapshot) {
            console.clear();
            console.log(id);
            for (x in snapshot.val()) {
                if (x == id) {
                    console.log(id);
                    console.log(x);
                    if (snapshot.val()[x].TypeCoupon === 'Fecha') {
                        swal({
                                title: "Estas Seguro?",
                                text: "Quieres canjear este cupon?",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: 'No',
                                confirmButtonColor: '#00BAB9',
                                confirmButtonText: "Canjear!",
                                closeOnConfirm: false
                            },
                            function(isConfirm) {
                                if (isConfirm) {
                                    console.log("----------------------------------");
                                    console.log(id);
                                    console.log(x);
                                    console.log("confirmo");
                                    swal({
                                        title: 'Perfecto!',
                                        text: 'Has cambiado tu Cupón',
                                        type: "success",
                                        timer: 2000,
                                        showConfirmButton: false,

                                    })
                                    console.log("----------------------------");
                                    console.log(snapshot.val()[id].QuantityExchanged);

                                    mixpanel.track("clickCanjear", {
                                        "type": "fecha",
                                        "Gender": IdGender,
                                        "User": NameUser,
                                        "NameCoupon": id
                                    });
                                    QuantityExchangedSuma = snapshot.val()[id].QuantityExchanged + 1
                                    mainApp.database().ref('Coupon/' + id).update({
                                        QuantityExchanged: QuantityExchangedSuma
                                    });

                                    var couponPages = "#/app/descripcionCupones/";
                                    location.href = couponPages + id;
                                } else {
                                    swal("Cancelado", "Esperamos que luego puedas disfrutar de nuestros cupones", "error");

                                }
                            });

                    } else if (snapshot.val()[x].TypeCoupon === 'Cupon') {
                        if (parseInt(snapshot.val()[x].QuantityExchanged) < parseInt(snapshot.val()[x].QuantityCoupons)) {
                            $scope.cupons[0][0].QuantityExchanged += 1;
                            swal({
                                    title: "Estas Seguro?",
                                    text: "Quieres canjear este cupon?",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: 'No',
                                    confirmButtonColor: '#00BAB9',
                                    confirmButtonText: "Canjear!",
                                    closeOnConfirm: false
                                },
                                function(isConfirm) {
                                    if (isConfirm) {
                                        swal({
                                            title: 'Perfecto!',
                                            text: 'Has cambiado tu Cupón',
                                            timer: 2000,
                                            showConfirmButton: false,
                                            type: "success"
                                        });
                                        mixpanel.track("clickCanjear", {
                                            "type": "Cupon",
                                            "Gender": IdGender,
                                            "User": NameUser,
                                            "NameCoupon": id
                                        });

                                        var element = document.getElementById("QuantityExchangedText");
                                        element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + snapshot.val()[x].QuantityCoupons;
                                        var couponPages = "#/app/descripcionCupones/";
                                        // IdPromotion with redirection page
                                        couponPages = couponPages + id;
                                        location.href = couponPages;

                                        QuantityExchangedSuma = snapshot.val()[x].QuantityExchanged + 1
                                        mainApp.database().ref('Coupon/' + x).update({
                                            QuantityExchanged: QuantityExchangedSuma
                                        });
                                    } else {
                                        $scope.cupons[0][0].QuantityExchanged -= 1;
                                        var element = document.getElementById("QuantityExchangedText");
                                        element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + snapshot.val()[x].QuantityCoupons;
                                    }
                                });
                        } else {
                            $scope.cupons[0].QuantityExchanged = parseInt(snapshot.val()[x].QuantityCoupons);

                            mainApp.database().ref('Cupon/' + x).update({
                                Status: false
                            });
                            swal({
                                    title: 'Lo sentimos!',
                                    text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
                                    type: 'warning'
                                },
                                function(isConfirm) {
                                    if (isConfirm) {
                                        $scope.loading = $ionicLoading.show({
                                            showBackdrop: true,
                                            template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
                                        });


                                        $ionicLoading.hide();
                                        var couponPages = "#/app/playlists";
                                        location.href = couponPages;
                                    }
                                })
                        }
                    }
                }
            }
        });
        displayNoneInline = [{
            none: "none",
            inline: "inline",
            position: "absolute",
            bottom: 0
        }];
    }

    $scope.llenar1 = function(id) {
        $scope.countCoupon(id);
        displayNoneInline = [{
            none: "none",
            inline: "inline"
        }];
    };

    $scope.llenar2 = function() {
        displayNoneInline = [{
            none: "inline",
            inline: "none"
        }];
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: $scope.customerId,
          image: '',
          footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
          backButton: true
      };
    });

})

// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams, $ionicLoading, Coupon) {

  $scope.coupons = Coupon;
  $scope.coupons.$loaded(function(data){
    for (var i in $scope.coupons) {
      if ($scope.coupons[i].$id == $stateParams.couponId) {
        $scope.cupon = $scope.coupons[i];
      }
    }
  });

  mixpanel.track("view", {
      "type": "DescriptionCupon",
      "Gender": IdGender,
      "User": IdUsuario
  });
  // $scope.reloadpage = function() {
  //     $scope.cupons[0].QuantityExchanged += 1;
  // };
  //
  // // ***************  EXCHANGE BUTTON DISPLAY NONE********************
  // $scope.buttonCash = function() {
  //     $('.botonCanjear').click(function() {
  //         $(this).hide();
  //         $('.exchangeBoxBarCode').show();
  //     });
  // };

  // // ************ FUNCTION CHANGE COLOR PIN CUPON *************
  // $scope.changeColorPinCupon = function(id) {
  //     var cssColorCuponPin = document.getElementById(id).style.color;
  //     if (cssColorCuponPin == "silver") {
  //         document.getElementById(id).style.color = "purple";
  //         saveCuponFavorite(IdUsuario, id);
  //     } else {
  //         deleteFavoriteCupon(IdUsuario, id);
  //         document.getElementById(id).style.color = "silver";
  //     }
  // };
  //
  //
  // $scope.HideStyleButtonExchangePosition = "absolute";
  // $scope.HideStyleButtonExchangeBottom = "0";

  // $scope.countCoupon = function() {
  //         var QuantityExchangedsu = 0;
  //         $scope.HideStyleButtonExchangePosition = "none"
  //         $scope.HideStyleButtonExchangeBottom = "none"
  //             // mainApp.database().ref('Cupon/'+x).update({
  //             //       Status: false
  //             // });
  //
  //
  //         mainApp.database().ref('Coupon').once('value', function(snapshot) {
  //             for (x in snapshot.val()) {
  //
  //                 if (snapshot.val()[x].TypeCoupon === "Coupon") {
  //                     // ------------------------------------------------------------------------------------------------------------------------------------------------
  //                     if (parseInt(snapshot.val()[x].QuantityExchanged) < parseInt(snapshot.val()[x].QuantityCoupons)) {
  //
  //                         QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1
  //                         mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
  //                             QuantityExchanged: QuantityExchangedsu
  //                         });
  //                         mixpanel.track("clickCanjear", {
  //                             "type": "Cupon",
  //                             "Gender": IdGender,
  //                             "User": NameUser,
  //                             "NameCoupon": $stateParams.DescriptionID
  //                         });
  //                         swal({
  //                             title: "Perfecto!",
  //                             text: "Has cambiado tu cupón",
  //                             type: "success",
  //                             timer: 2000,
  //                             showConfirmButton: false
  //                         });
  //                     } else {
  //
  //                         $scope.cupons[0].QuantityExchanged = parseInt(snapshot.val()[x].QuantityCoupons);
  //
  //                         mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
  //                             Status: false
  //                         });
  //
  //                         swal({
  //                                 title: 'Lo sentimos!',
  //                                 text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
  //                                 type: 'warning'
  //                             },
  //                             function(isConfirm) {
  //                                 if (isConfirm) {
  //
  //                                     $scope.loading = $ionicLoading.show({
  //                                         showBackdrop: true,
  //                                         template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
  //                                     });
  //
  //                                     $ionicLoading.hide();
  //                                     var couponPages = "#/app/playlists";
  //                                     location.href = couponPages;
  //                                 }
  //                             })
  //                     }
  //                     // ------------------------------------------------------------------------------------------------------------------------------------------------
  //                 } else if (snapshot.val()[x].TypeCoupon === "Fecha") {
  //
  //                     mixpanel.track("clickCanjear", {
  //                         "type": "fecha",
  //                         "Gender": IdGender,
  //                         "User": IdUsuario,
  //                         "NameCoupon": $stateParams.DescriptionID
  //                     });
  //                     QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1;
  //                     mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
  //                         QuantityExchanged: QuantityExchangedsu
  //                     });
  //                 }
  //
  //             }
  //
  //         });
  //
  //     };

  $scope.$on('$ionicView.enter', function() {

    $scope.$parent.data = {
        heading: '',
        image: '',
        footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
        backButton: false
    };

  });
})

//*****************	POPOVER CONTROLLER FOR OFFERS	*******************************
.controller('PopoverCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
})

//*******************  NEW CONTROLLER POPOVER  ************************
.controller('PopoverNewCtrl', function($scope, $ionicPopover) {
    $scope.Analytics = function(id, nameShare) {
        var NameUser = String(IdUsuario)
        var Dimensions = {
            name: 'share_' + id,
            user: NameUser
        };
        if (nameShare == "promotion") {
            mixpanel.track("ClickShare", {
                "NameShareID": id,
                "User": NameUser,
                "Gender": IdGender
            });
        } else {
            mixpanel.track("ClickShare", {
                "NameShareID": id,
                "User": NameUser,
                "Gender": IdGender
            });
        }

    }
    $ionicPopover.fromTemplateUrl('templates/popoverNew.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
})

.controller('loadingCtrlLogin', function($scope, $state, $ionicLoading, $timeout) {

// Loading Login User
$scope.$on('$ionicView.enter', function() {
    $ionicLoading.show({
        noBackdrop: true,
        template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FFFFFF; fill: #FFFFFF;"></ion-spinner> <p style = "color:white">Cargando...</p>'
    });

    $timeout(function() {
        $ionicLoading.hide();
        $state.go('app.playlists');
    }, 2000);

});
})

.controller('loadingCtrl', function($scope, $state, $ionicLoading, $timeout) {
  $ionicLoading.show({
      noBackdrop: true,
      template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FFFFFF; fill: #FFFFFF;"></ion-spinner> <p style = "color:white">Cargando...</p>'
  });

  $timeout(function() {

      var user = firebase.auth().currentUser;
      var credential;

      if (user) {

          if (user.providerData[0].providerId == 'facebook.com') {

              IdUsuario = user.providerData[0].uid;
              mainApp.database().ref('Users').once('value', function(snapshot) {

                  for (x in snapshot.val()) {
                      if (x == IdUsuario) {
                          IdGender = snapshot.val()[x].Gender
                      }
                  }

              }).then(function() {
                  console.log();
              });

              $timeout(function() {
                  $ionicLoading.hide();
                  $state.go('app.playlists');

              }, 2000);
          } else {
              IdUsuario = user.uid;

              mainApp.database().ref('Users').once('value', function(snapshot) {
                  for (var x in snapshot.val()) {
                      if (x == IdUsuario) {
                          IdGender = snapshot.val()[x].Gender
                      }
                  }
              });
          }
          $state.go('app.playlists');

      } else {
          $timeout(function() {
              $ionicLoading.hide();
              $state.go('tutorial');

          }, 1000);
      }
  }, 1000);

})

.controller('bodyCtrl', ['$state', function($state, $ionicLoading) {

  // *********** DEVICE READY SPLASHSCREEN  *******************
  document.addEventListener("deviceready", function($scope) {

      var notificationOpenedCallback = function(jsonData) {
          console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("b95e0734-b67a-400e-bfd3-a494d841d736", {
              googleProjectNumber: "621898809225"
          },
          notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
      ///////////////////////////////////////

  }, false);
}])


.controller('rootCtrl', ['$state', function($state) {
    $state.go('app.playlists');
}])
/*************************  TUTORIAL  ******************************/
.controller('tutorialController', ['$scope', '$state', function($scope, $state, Customer) {

  $scope.customers = Customer;

    var guate = moment.tz("America/Guatemala");
    mixpanel.track("viewTurorial");
    // IdUsuario of Facebook or Frenzy for Pines and hearts

    $scope.slideChanged = function(index) {
        switch (index) {
            case 3:
                $state.go('loginAndRegister');
                break;
        }
    };

}])
/*************************  TUTORIAL NO.2 ******************************/
.controller('tutorial2Controller', ['$scope', '$state', 'Customer', function($scope, $state, Customer) {

  $scope.customers = Customer;

  $scope.data = {};

  $scope.data.sliderOptions = {
    initialSlide: 0,
    direction: 'horizontal', //or vertical
    speed: 300 //0.3s transition
  };

  //create delegate reference to link with slider
  $scope.data.sliderDelegate = null;

  //watch our sliderDelegate reference, and use it when it becomes available
  $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
    if (newVal !== null) {
      $scope.data.sliderDelegate.on('slideChangeEnd', function() {
        $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
        //use $scope.$apply() to refresh any content external to the slider
        $scope.$apply();
      });
    }
  });

}])
/******************************************************/
.controller('toolsCtrl', ['$scope', '$state', function($scope, $state) {
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "Tools",
        "Gender": IdGender,
        "User": NameUser
    });
    $scope.AnalyticsTools = function(id) {
        var NameUser = String(IdUsuario);
        mixpanel.track("ClickOtros", {
            "type": id,
            "Gender": IdGender,
            "User": NameUser
        });
    };
    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
        $state.go('loginAndRegister');
    };

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: '',
          image: 'img/icn-35.png',
          footerIconColors: ['#A7A9AC', '#A7A9AC', '#A7A9AC', '#3F51B5'],
          backButton: false
      };
    });
}])
    /**********************  FACEBOOK LOGIN CONTROLLER  **********************************/

.controller('loginCtrlFacebook', function($scope, $state, $cordovaFacebook, $q, $ionicLoading, $timeout) {

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
            function(response) {
                console.log(response);
                info.resolve(response);
            },
            function(response) {
                console.log(response);
                info.reject(response);
            }
        );
        console.log(info.promise);
        return info.promise;
    };

    ///////////////////

    //===============LOGIN WITH FB==========//
    $scope.loginfb = function() {
        mixpanel.track("LoginClick", {
            "loginButton": "Facebook"
        });


        $ionicLoading.show({
            noBackdrop: true,
            template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner> <p style = "color:white">Cargando...</p>'
        });
        var UserUID;
        $cordovaFacebook.login(["public_profile", "user_birthday", "email", "user_hometown"])
            .then(function(success) {

                var credential = firebase.auth.FacebookAuthProvider.credential(success.authResponse.accessToken);
                mainApp.auth().signInWithCredential(credential).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });

            }, function(error) {
                //alert(error)
                // error
            }).then(function() {

                mainApp.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        // User is signed in.
                        UserUID = user.providerData[0].uid;

                    } else {
                        // No user is signed in.
                    }
                });
            }).then(function() {

                $timeout(function() {
                    $cordovaFacebook.getLoginStatus()
                        .then(function(success) {
                            console.log(success);
                            $cordovaFacebook.api('/me?fields=id,name,birthday,email,gender,hometown&access_token=' + success.authResponse.accessToken, null)
                                .then(function(success) {
                                    mixpanel.identify(success.id);
                                    mixpanel.people.set({
                                        "$email": success.email,
                                        "$gender": success.gender,
                                        "$birthday": success.birthday,
                                        "$name": success.name,
                                        "$typeLogin": "Facebook"

                                    });
                                    // success
                                    ///////////////////////////Favorite heart////////////////////////////////////
                                    // mainApp.database().ref('Favorite').on('value', function(snapshot) {
                                    //     var CountFF = 0;
                                    //     for (x in snapshot.val()) {
                                    //         if (snapshot.val()[x].UserID == UserUID) {
                                    //             for (i in snapshot.val()[x].CustomerID) {
                                    //                 for (c in CustomerList) {
                                    //
                                    //                     if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
                                    //                         CustomerList[c].colorHeart = "red"
                                    //                     }
                                    //                 }
                                    //             }
                                    //             FirebaseFavorite[CountFF] = snapshot.val()[x]
                                    //             FirebaseFavorite[CountFF]["FavoriteID"] = x
                                    //             CountFF++
                                    //         }
                                    //
                                    //     }
                                    // });
                                    // //////////////////////////////////////////////////////////////////////////
                                    // ///////////////////////////SAVED PIN////////////////////////////////////
                                    //
                                    // mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
                                    //     var CountPS = 0;
                                    //     for (x in snapshot.val()) {
                                    //         if (snapshot.val()[x].UserID == UserUID) {
                                    //
                                    //             for (i in snapshot.val()[x].PromotionID) {
                                    //                 for (c in CurrentPromotion) {
                                    //                     if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
                                    //                         CurrentPromotion[c].ColorPin = "purple"
                                    //                     } else {
                                    //                         console.log("no encontro nada ");
                                    //                     }
                                    //                 }
                                    //             }
                                    //             FirebasePromotionSaved[CountPS] = snapshot.val()[x]
                                    //             FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
                                    //             CountPS++
                                    //         }
                                    //
                                    //     }
                                    // });
                                    //////////////////////////////////////////////////////////////////////////
                                    IdUsuario = UserUID;
                                    IdGender = success.gender;
                                    mainApp.database().ref('Users/' + UserUID).update({
                                        Username: success.name,
                                        Email: success.email,
                                        Gender: success.gender,
                                        Birthday: success.birthday,
                                        Hometown: success.hometown,
                                        IdFacebook: success.id
                                    });

                                    $state.go('app.playlists');
                                }, function(error) {
                                    // error
                                });
                        }, function(error) {
                            // error
                        });
                    $ionicLoading.hide();
                }, 2000);

            });

    };
    // //===============/LOGIN WITH FB==========//
});
