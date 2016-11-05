var displayNoneInline = [];
var FirebaseFavorite = [];
var FirebasePromotionSaved = [];
var Check =  true
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
                mixpanel.identify(firebase.auth().currentUser.uid);
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
                        Birthday: dateBirthday,
                        config: {analyticsAlias: true}
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
.controller('LoginCtrlEmail', function($scope, $state, $rootScope, $ionicLoading, $firebaseObject) {

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
            // Login With Firebase
            mainApp.auth().signInWithEmailAndPassword(user.username, user.password).catch(function(error) {
                  sweetAlert('Oops', 'Por favor revisa que tu correo y contraseña sea correcta  ', 'error');
            }).then(function() {
                if (mainApp.auth().currentUser != null) {

                  var ref = firebase.database().ref('User/' +  firebase.auth().currentUser.uid);
                  var user = $firebaseObject(ref);
                    //  check if Email is verified.
                    IdUsuario = mainApp.auth().currentUser.uid;
                    if (user.Parse == true) {
                        IdGender = snapshot.val()[mainApp.auth().currentUser.uid].Gender;
                        $state.go('loadingLoginUser');
                    } else if (user.Parse == undefined) {
                        $scope.VerifyEmail();
                    }
                    // Check if user has already been passed to new Mixpanel ID.
                    if(!user.config.analyticsAlias) {
                        mixpanel.alias(firebase.auth().currentUser.uid);
                        user.config.analyticsAlias = true;
                        user.$save();
                    } else {
                      mixpanel.identify(firebase.auth().currentUser.uid);
                    }

                }
            })
        }
    }
})
// ********************* PAGE_START CONTROLLER ****************************

.controller('HomeCtrl', function($scope, $rootScope, $ionicLoading, $timeout, $firebaseArray, $ionicModal,User,$firebaseArray,$firebaseObject) {

    var refs = firebase.database().ref('User/' + firebase.auth().currentUser.uid);
    // First Mini Tutorial html file. Ionic Modal
    $ionicModal.fromTemplateUrl('templates/mini_tutorials/getUpCodePromotion.html', function(modal) {
      $scope.FirstModal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: false
    });

    // First Mini Tutorial html file. Ionic Modal
 $ionicModal.fromTemplateUrl('templates/mini_tutorials/youWinWithACode.html', {scope: $scope}).then(function(modal2) {$scope.SecondModal = modal2;
     }, {
      animation: 'slide-in-up',
      focusFirstInput: false
    });

    var ref = mainApp.database().ref().child('AppCategory');
    $scope.categories = $firebaseArray(ref);


    ////////////////////////////////////////////////////////////////////////////////////
    var user = firebase.auth().currentUser;

    var ref = firebase.database().ref('Users/'+IdUsuario);
    // var ref = firebase.database().ref('Users')
    var refuserObject = $firebaseObject(ref); ///// h
    var refuserArray = $firebaseArray(ref); ///firebaseArray firebaseObject /// j
    console.log(IdUsuario);
    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER $ionicView.loaded	 *****
    ///////////////////////////////////////////////////////////
    var refUser = firebase.database().ref('Users/'+ IdUsuario)
    $scope.VerifyArrayUser = $firebaseArray(refUser)
    /////////////////////////////////////////////////////////
    $scope.userService = User;
    $scope.refCrossPromotion = firebase.database().ref('CrossPromotion')
    $scope.crossPromotion = $firebaseArray($scope.refCrossPromotion)
    $scope.refCustomer = secondaryApp.database().ref('Customer')
    $scope.user = firebase.auth().currentUser;
    $scope.$on('$ionicView.enter', function() {
      /////////////////////////// tutorial True or false
      $scope.$parent.config = $firebaseObject(refs.child('config'));
      $scope.config.$loaded().then(function () {
        if (typeof($scope.config.$value) == 'object') {
          $scope.config.tutorial =  true
          $scope.config.$save();
        }
      })
      ///////////////////////////////////////////////////////////
      $scope.modalInfo = {};
      $scope.getCodePromotion = function (code) {
        mixpanel.track("ClickCrossPromotion", {"Code":code});
        $scope.ref = firebase.database().ref('CouponCodes/'+ code);
        $scope.objCouponCode = $firebaseObject($scope.ref);
        $scope.Valdiacion = $firebaseArray($scope.ref);
        $scope.objCouponCode.$loaded().then(function () {
          console.log($scope.Valdiacion);
          console.log($scope.Valdiacion.$indexFor('Status'));
          var valCode =  $scope.Valdiacion.$indexFor('Status');
          if (valCode != -1 && $scope.Valdiacion[valCode].$value == false) {
            console.log("si se puede cambiar la promocion");
            console.log($scope.Valdiacion[valCode].$value);
            var actualHour = moment().tz("America/Guatemala").format('LLL');
            $scope.objCouponCode.DateTimeExchange = actualHour;
            $scope.objCouponCode.Status = false;
            $scope.objCouponCode.UserId = IdUsuario;
            $scope.objCouponCode.$save();
            $scope.userService.$loaded().then(function () {
              var userInfoService = $scope.userService.$ref()
              var objUserInfoService = $firebaseObject(userInfoService)
              var ids = $scope.objCouponCode.CrossPromotion;
              var Crossinfo =  $firebaseObject($scope.refCrossPromotion.child(ids));
              objUserInfoService.$loaded(function () {
                Crossinfo.$loaded(function () {
                  if ($scope.objCouponCode.type == "Points") {
                    try {
                      if (objUserInfoService[ids].Points == undefined) {}
                    } catch (e) {
                      if (e.message == "Cannot read property 'Points' of undefined") {
                        objUserInfoService[ids] = {Points:0,Status:true,"Award": {"dahgshdgaASDJjssjd": {"AwardID": "-KTLUFOTkCHBSUOBHCSL","FechaDeSolicitud":"","Status":true,"CodigoCanjeoRedimido":"","FechaHoraCanjeo":""}}}
                      }
                    } finally {
                        mixpanel.track("RedeemCrossPromotion", {"CrossPromotionId": Crossinfo.$id, "Points":$scope.objCouponCode.CouponValue, "Type": "Points"});
                        objUserInfoService[ids].Points +=  $scope.objCouponCode.CouponValue;
                        if (objUserInfoService[ids].Points > Crossinfo.MaxPoints) {
                          objUserInfoService[ids].Points =  Crossinfo.MaxPoints
                          objUserInfoService.$save()
                        }else{
                          objUserInfoService.$save()
                        }

                    }
                  }else if ($scope.objCouponCode.type == "directAward") {
                    console.log("-----------------directAward------------------");
                    console.log($scope.objCouponCode);
                    console.log(ids);
                    mixpanel.track("RedeemCrossPromotion", {"CrossPromotionId": Crossinfo.$id ,"Type": "directAward"});
                    var newAwardObjet = $firebaseObject(objUserInfoService.$ref().child(ids))
                    newAwardObjet.$loaded(function () {
                      console.log(newAwardObjet);
                      newAwardObjet[code] = {CodigoCanjeoRedimido:"",FechaHoraCanjeo:"",Status:false,AwardID:$scope.objCouponCode.AwardID}
                      console.log(newAwardObjet);
                      newAwardObjet.$save()
                    })
                  }
                })
              }).then(function() {
                $scope.userService.$loaded().then(function () {
                $scope.crossPromotion.$loaded().then(function () {
                  $scope.crossPromotion.map(function (promotion) {
                    var refInfoCustomer =  $scope.refCustomer.child(promotion.customer)
                    var objInfoCustomer = $firebaseObject(refInfoCustomer)
                    if ($scope.objCouponCode.type == "Points") { //directAward
                      $scope.userService.map(function (user) {
                          if (user.$id == promotion.$id) {
                            objInfoCustomer.$loaded(function () {
                              if (objInfoCustomer.$id == promotion.customer) {
                                $scope.modalInfo.Name =  objInfoCustomer.Name;
                                $scope.modalInfo.Logo = objInfoCustomer.Logo;
                                $scope.modalInfo.Points = $scope.objCouponCode.CouponValue;
                                $scope.modalInfo.type = $scope.objCouponCode.type;
                                $ionicLoading.hide();
                                $scope.SecondModal.show() ;
                              }
                            })
                          }

                      })
                    }else if ($scope.objCouponCode.type == "directAward") {
                      Object.keys(promotion.Award).map(function (key) {
                          $scope.userService.map(function (user) {
                            if ( $scope.objCouponCode.AwardID == key ) {
                              if (user.$id == promotion.$id) {
                                objInfoCustomer.$loaded(function () {
                                  if (objInfoCustomer.$id == promotion.customer) {
                                    $scope.modalInfo.Name =  objInfoCustomer.Name;
                                    $scope.modalInfo.Logo = objInfoCustomer.Logo;
                                    $scope.modalInfo.Points = $scope.objCouponCode.CouponValue;
                                    $scope.modalInfo.type = $scope.objCouponCode.type;
                                    $scope.modalInfo.NameAward = promotion.Award[$scope.objCouponCode.AwardID].Name;
                                    $scope.modalInfo.Photo = promotion.Award[$scope.objCouponCode.AwardID].Photo;
                                    $ionicLoading.hide();
                                    $scope.SecondModal.show() ;
                                  }
                                })
                              }
                            }
                          })
                      })   //
                    }

                  })
                })
                })
              })
             })
        }else{
          sweetAlert('Lo sentimos', 'El Codigo que ingresaste no es valido', 'error');
          mixpanel.track("ClickCrossPromotion", {"type":"Invalid Code"});
          $ionicLoading.hide()
        }
      })
      }
      // Show Loading Icon
      $scope.loading = $ionicLoading.show({
          noBackdrop: true,
          template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
      });

      $timeout(function() {
          $ionicLoading.hide();
      }, 2000);
      $scope.$parent.dataT = {
        checked: Check
      };

      $scope.$parent.data = {
    			heading: '',
    			image: 'img/icn-35.png',
    			footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
    			backButton: false,
          toolsIcon: true,
          footer: true
      };
      $scope.$apply();

      mixpanel.track("view", {"type": "Categorys"});
    });

})
//********************** termsAndConditions puntos     *****************************
.controller('termsAndConditionsPointsCtrl',function($scope,$ionicLoading, $ionicModal,$stateParams) {
  // First Mini Tutorial html file. Ionic Modal

  $scope.Name;
  $scope.dataPromotion.map(function(value) {
    if (value.$id == $stateParams.idCondition) {
      $scope.promotion = {TermsAndConditions: value.LegalTerms};
      $scope.Name = value.Nombre;
    }
  });
  $scope.$on('$ionicView.enter', function() {

    $scope.$parent.data = {
        heading: '',
        image: 'img/icn-35.png',
        footerIconColors: ['#A7A9AC', '#A7A9AC', '#FFD922', '#A7A9AC'],
        backButton: true,
        toolsIcon: false,
        footer: true
    };
    $scope.$apply();
  });
})
//********************** POINTS CONTROLLER *****************************
.controller('yourPointsCtrl',function($scope,$ionicLoading, $ionicModal,CrossPromotionAcumulatePoints,User) {
  // First Mini Tutorial html file. Ionic Modal
  $scope.TutorialActives = {checked: Check};
  $scope.pushNotificationChange = function() {
    Check = $scope.TutorialActives.checked
    $scope.$parent.dataT = {checked:$scope.TutorialActives.checked}
  };
  $ionicModal.fromTemplateUrl('templates/mini_tutorials/howIWinPoints.html', function(modal) {
    $scope.FirstModal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: false
  });

  $scope.$on('$ionicView.enter', function() {
    $scope.crossPromotion = CrossPromotionAcumulatePoints.get();
    $scope.$parent.dataPromotion = $scope.crossPromotion;
    $scope.user = User
    $scope.$parent.data = {
        heading: '',
        image: 'img/icn-35.png',
        footerIconColors: ['#A7A9AC', '#A7A9AC', '#FFD922', '#A7A9AC'],
        backButton: false,
        toolsIcon: false,
        footer: true
    };
    $scope.$apply();

    // Analytics
    mixpanel.track("view", {"type": "YourPoints"});

  });
})

// Point Description Controller
.controller('pointsDescriptionCtrl', function($scope,$state,$ionicLoading,$timeout,$ionicModal,$stateParams,pointsDescripcion,UserSave,$firebaseArray) {

  $ionicModal.fromTemplateUrl('templates/modal.html', {
     scope: $scope
    }).then(function(modal) {

     $scope.modal = modal;
   });
  $scope.dataAward = [];
  $scope.goAward = false ;
  $scope.openModal = function (key , goAward) {
    $scope.dataAward = $scope.pointsDescripcion.Award[key];
    $scope.dataAward['key'] = key;
    $scope.modal.show();
  };
  $scope.$parent.exchangeArray =  [];
  $scope.exchange = function (dataAward , changeModal) {
    $scope.user = UserSave.get($stateParams.idPromotion,dataAward);
    $scope.goAdwards = changeModal;
  };
  $scope.closeModal = function () {
     $scope.modal.hide();
     $timeout(function() {
        $scope.goAdwards =  !$scope.goAdwards ;
      }, 1000);
  };

   $ionicModal.fromTemplateUrl('templates/modal2.html', {scope: $scope}).then(function(modal2) {
      $scope.modal2 = modal2;
    });
    $scope.$on('$ionicView.enter', function() {
      $scope.pointsDescripcion  = pointsDescripcion.get($stateParams.idPromotion,$scope.dataPromotion)
      $scope.$parent.data = {
          heading: '',
          footerIconColors: ['#A7A9AC', '#A7A9AC', '#FFD922', '#A7A9AC'],
          backButton: true,
          toolsIcon: false,
          footer: false
      };
      $scope.$apply();

      // Analytics
      mixpanel.track("view", {"type": "PointsDescription"});

    });

})
// Award Controller View
.controller('awardCtrl',function($scope, $state, $ionicModal,$stateParams,Awards,CrossPromotionAcumulatePoints) {

  // Analytics
  mixpanel.track("view", {"type": "Awards"});

  $scope.sendSms = function() {
    $cordovaSocialSharing.shareViaSMS('Visitanos en: http://frenzy.com.gt para encontrar las mejores ofertas :)', '').then(function(result) {}, function(err) {
      console.log('error mensaje');
    });
  };

  // First Mini Tutorial html file. Ionic Modal
  $ionicModal.fromTemplateUrl('templates/mini_tutorials/ExchangeMyAwards.html', function(modal) {
    $scope.FirstModal = modal;
  }).then(function(modal) {
    $scope.modFirstModal = modal;
  })

  // First Mini Tutorial html file. Ionic Modal
  $ionicModal.fromTemplateUrl('templates/modal.html', {
     scope: $scope
   }).then(function(modal) {
     $scope.modal = modal;
   });
  $scope.awardid = '';
  $scope.openModal = function(id) {
    $scope.awardid = id;
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$ionicView.enter', function() {
    $scope.instantAdwards = Awards.get();
    console.log("---------------------------------");
    console.log($scope.instantAdwards);
    console.log("---------------------------------");
    $scope.$parent.instantAdwardsDescription = $scope.instantAdwards;
    console.log($scope.instantAdwards);
    $scope.$parent.data = {
        heading: '',
        image: 'img/icn-35.png',
        footerIconColors: ['#A7A9AC', '#A7A9AC', '#A7A9AC', '#9C28B0'],
        backButton: false,
        toolsIcon: false,
        footer: true
    };
    $scope.$apply();
  });

})

.controller('awardDescriptionCtrl',function($scope, $ionicModal,$stateParams,$firebaseArray,$firebaseObject) {
  $scope.idAwards = $stateParams.idAward;
  console.log($scope.instantAdwardsDescription);
  $scope.Date = moment().tz("America/Guatemala").format('DD/MM/YYYY');

  // First Mini Tutorial html file. Ionic Modal
  $ionicModal.fromTemplateUrl('templates/exchangeModal/exchangeAwardModal.html', {scope: $scope}).then(function(modal) {
     $scope.FirstModals = modal;
   }, {
     animation: 'slide-in-left',
     focusFirstInput: false
   });

  $scope.openModal = function(AwardID,code,id,IdCouponCode,IdUserAward) {
    var user = firebase.auth().currentUser;
    var refUser = firebase.database().ref('Users/'+ IdUsuario)
    var refCrossPromotion = firebase.database().ref('CrossPromotion')
    var AwardChange = $firebaseArray(refUser.child('CrossPromotion').child(id).child('Award'))
    var codeval = $firebaseObject(refCrossPromotion.child(id))
    var actualHour = moment().tz("America/Guatemala").format('LLL');

    codeval.$loaded().then(function () {
      if (codeval.type == "points") {
        AwardChange.$loaded().then(function () {
          codeval.VerificationCodes.map(function(valueCodes) {
            if (valueCodes == code) {
              $scope.valChange = true;
              $scope.FirstModals.show();
              AwardChange.map(function(valueAward) {
                if (valueAward.AwardID == AwardID) {
                  mixpanel.track("RedeemAward", {"AwardId": valueAward.AwardID});
                  var change = AwardChange.$ref()
                  var savechange = $firebaseObject(change.child(IdUserAward))
                  savechange.$loaded(function () {
                    savechange.FechaHoraCanjeo = actualHour;
                    savechange.Status = true;
                    savechange.CodigoCanjeoRedimido = code;
                    savechange.$save()
                  });
                }
              })
              //
            }
          })
        }).then(function() {
          if ($scope.valChange == false) {
            sweetAlert('Lo sentimos', 'El Codigo que ingresaste no es valido', 'error');
          }
        });
      }else if (codeval.type == "directAward") {
        var AwardDirecChange = $firebaseObject(refUser.child('CrossPromotion').child(id).child(IdCouponCode))
            codeval.VerificationCodes.map(function(valueCodes) {
              if (valueCodes == code) {
                mixpanel.track("RedeemAward", {"IdCouponCode": IdCouponCode});
                $scope.valChangeDirectAward = true;
                AwardDirecChange.$loaded().then(function () {
                  $scope.FirstModals.show();
                  AwardDirecChange.CodigoCanjeoRedimido = code
                  AwardDirecChange.FechaHoraCanjeo = actualHour
                  AwardDirecChange.Status = true;
                  AwardDirecChange.$save();
                }).then(function() {
                  if ($scope.valChangeDirectAward == false) {
                    sweetAlert('Lo sentimos', 'El Codigo que ingresaste no es valido', 'error');
                  }
                })
              }
            })

      }
    }).then(function() {


    });
    setTimeout(function(){
      $scope.closeModal();
    }, 5000);
  };

  $scope.closeModal = function() {
    $scope.FirstModals.hide();
  };

  $scope.$on('$ionicView.enter', function() {
    $scope.valChangeDirectAward = false
    $scope.valChange = false;
    $scope.$parent.data = {
        heading: '',
        footerIconColors: ['#A7A9AC', '#A7A9AC', '#A7A9AC', '#9C28B0'],
        backButton: true,
        toolsIcon: false,
        footer: false
    };
    $scope.$apply();

    // Analytics
    mixpanel.track("view", {"type": "AwardDescription"});

  });

})

//********************** termsAndConditions award     *****************************
.controller('termsAndConditionsAwardsCtrl',function($scope,$ionicLoading, $ionicModal,$stateParams) {
  $scope.instantAdwardsDescription.map(function(value) {
    if (value.AwardID == $stateParams.idterms) {
      $scope.promotion = {TermsAndConditions: value.LegalTerms};
    }
  });
  $scope.$on('$ionicView.enter', function() {
    $scope.$parent.data = {
        heading: '',
        footerIconColors: ['#A7A9AC', '#A7A9AC', '#A7A9AC', '#9C28B0'],
        backButton: true,
        toolsIcon: false,
        footer: false
    };
    $scope.$apply();
  });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, Customer, Promotion, Favorite, Coupon) {

  $scope.favorites = Favorite;
  $scope.customers = Customer;
  $scope.promotions = Promotion;
  $scope.coupons = Coupon;

  var customersLoaded = false;

  $scope.viewMyPromotion = false;

  $scope.customers.$loaded(function(){
    getFavoriteCount();
    customersLoaded = true;
  });

  var getFavoriteCount = function() {
    $scope.favoritesCount = 0;
    for(var i in $scope.customers) {
      var customer = $scope.customers[i];
      if ($scope.favorites[customer.$id] === true) {
        $scope.favoritesCount += 1;
      }
    }
    mixpanel.track("view", {"type": "YourFavorites", "#favorites": $scope.favoritesCount});
  };

  $scope.favoritesCount = 0;
  $scope.favorites.$watch(function(event) {
    if (customersLoaded === true) {
      getFavoriteCount();
    }
  });

  $scope.filterFavorite = function(item) {
    return $scope.favorites[item.$id];
  };

    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: '',
          image: 'img/icn-35.png',
          footerIconColors: ['#A7A9AC', '#FF5252', '#A7A9AC', '#A7A9AC'],
          backButton: false,
          toolsIcon: false,
          footer: true
      };
      $scope.$apply();
    });

})
// *************************** SAVED CONTROLLER ***************************
.controller('AllPromotionCtrl', function($scope, $stateParams, Promotion, Coupon, Pin) {

    $scope.viewMyPromotion = true;
    $scope.setViewMyPromotions = function(bool) {
        $scope.viewMyPromotion =  !$scope.viewMyPromotion;
    };

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

    $scope.filterPinned = function(item) {
        return ($scope.pins[item.$id] && item.Status);
    };

    $scope.pins.$watch(function(event) {
      if ($scope.contentLoaded) {
        getPinCount();
      }
    });

    $scope.pinsCount = 0;

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

      mixpanel.track("view", {"type": "PinSaved", "#pins": $scope.pinsCount});
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.$parent.data = {
          heading: '',
          image: 'img/icn-35.png',
          footerIconColors: ['#A7A9AC', '#FF5252', '#A7A9AC', '#A7A9AC'],
          backButton: false,
          toolsIcon: false,
          footer: true
      };
      $scope.$apply();
    });

})
//********************** Customer CONTROLLER *****************************
.controller('changeColorHeartCtrl', function($scope, Favorite) {

  $scope.favorites = Favorite;

  $scope.ChangeColorHeart = function(customerId) {
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

    // Analytics
    mixpanel.track("ClickHeart", {"CustomerId": customerId, "Customer": $scope.favorites[customerId].Name });

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

    // Analytics
    mixpanel.track("ClickPin", {"PinId": id });
  };

})

//////////////////////
.controller('CustomerCtrl', function($scope, $rootScope, $ionicLoading, $stateParams, Customer) {

    $scope.customers = Customer;
    $scope.category = $stateParams.IDcustomer;

    $scope.customerCount = 0;
    $scope.customers.$loaded(function(){
      for (var i in $scope.customers) {
        if ($scope.customers[i].CategoryApp == $scope.category) {
          $scope.customerCount += 1;
        }
      }
      $ionicLoading.hide();
    });

    // Loading scope
    $scope.loading = $ionicLoading.show({
        noBackdrop: true,
        template: '<ion-spinner customer1lass="spinner" icon="lines" class = "Loading' + $scope.category + '"></ion-spinner>'
    });

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {

        $scope.$parent.data = {
            heading: $scope.category,
            image: '',
            footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
            backButton: true,
            toolsIcon: false,
            footer: true
        };

        // Analytics
        mixpanel.track("view", {"type": "Customers", "Category":$scope.category});
        mixpanel.track("ClickCategory", {"NameCategory": $scope.category});
    });
})
///////////
.controller('PromotionsDescription', function($scope, $stateParams, Promotion) {

    $scope.promotions = Promotion;
    $scope.promotions.$loaded(function(data){
      for (var i in $scope.promotions) {
        if ($scope.promotions[i].$id == $stateParams.promotionId) {
          $scope.promotion = $scope.promotions[i];
        }
      }
    });

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        $scope.$parent.data = {
            heading: $scope.promotion.Provider,
            image: '',
            footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
            backButton: true,
            toolsIcon: false,
            footer: true
        };

        mixpanel.track("view", {"type": "PromotionsDescription", "PromotionId": $stateParams.promotionId});
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
  var coupons = Coupon;
  var promotions = Promotion;
  var customers = Customer;

  $scope.customerCoupons = [];
  $scope.customerPromotions = [];
  $scope.favorites = Favorite;

  //When all coupons are loaded, filter only coupons of current customer
  coupons.$loaded(function(){
    for (var i in coupons) {
      if(coupons[i].Provider == $scope.customerId && coupons[i].Status === true) {
        $scope.customerCoupons.push(coupons[i]);
      }
    }
    if ($scope.customerCoupons.length < 1) {
      $scope.viewCoupons = false;
      mixpanel.track("view", {"type": "Promotion","Namepromotion": $scope.customerId});
    }
  });

  //When all promotions are loaded, filter only promotions of current customer
  promotions.$loaded(function(){
    for (var i in promotions) {
      if(promotions[i].Provider == $scope.customerId && promotions[i].Status === true) {
        $scope.customerPromotions.push(promotions[i]);
      }
    }
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

    $scope.sendSms = function() {
        $cordovaSocialSharing.shareViaSMS('Visitanos en: http://frenzy.com.gt para encontrar las mejores ofertas :)', '').then(function(result) {}, function(err) {
            console.log('error mensaje');
        });
        mixpanel.track("ClickSMS", {"Customer": $scope.customer.Name})
    };


        // *************** URL BROWSER SHOP FUNCTION ***************
    $scope.shopUrl = function(url, id, name) {
        var options = {
          location: 'yes',
          clearcache:'yes',
          toolbar:'yes'
        };

        if (id == "web") {
            mixpanel.track("ClickWeb", {
                "Costumer": name
            });
            window.open = cordova.InAppBrowser.open(url, '_blank', options);
        } else {
            mixpanel.track("ClickCartShop", {
                "Costumer": name
            });
            window.open = cordova.InAppBrowser.open(url, '_blank', options);
        }
    };

    $scope.showCouponDescription = function(id) {
        var QuantityExchangedSuma = 0;
        mainApp.database().ref('Coupon').once('value', function(snapshot) {
            for (x in snapshot.val()) {
                if (x == id) {
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
                                    swal({
                                        title: 'Perfecto!',
                                        text: 'Has cambiado tu Cupón',
                                        type: "success",
                                        timer: 2000,
                                        showConfirmButton: false,

                                    })
                                    mixpanel.track("clickCanjear", {
                                        "type": "fecha",
                                        "NameCoupon": id
                                    });
                                    QuantityExchangedSuma = snapshot.val()[id].QuantityExchanged + 1
                                    mainApp.database().ref('Coupon/' + id).update({
                                        QuantityExchanged: QuantityExchangedSuma
                                    });

                                    var couponPages = "#/app/descripcionCupones/";
                                    location.href = couponPages + id;
                                    $(".botonCanjear").hide();
                                    $(".exchangeBoxBarCode").show();
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

                            mainApp.database().ref('Coupon/' + x).update({
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
          backButton: true,
          toolsIcon: false,
          footer: true
      };

      // Analytics
      mixpanel.track("view", {"type": "copuns","CustomerId": $scope.customerId});
      mixpanel.track("ClickCustomer", {"Name": $scope.customerId,"CustomerId": $scope.customerId});

    });

})

// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $state, $stateParams, $ionicLoading, $firebaseObject) {

  var ref = mainApp.database().ref('Coupon').child($stateParams.couponId);
  $scope.cupon = $firebaseObject(ref);

  // Analytics for view
  mixpanel.track("view", {"type": "DescriptionCupon", "CouponId": $stateParams.couponId});

  //
  // // ***************  EXCHANGE BUTTON DISPLAY NONE********************
  $scope.buttonCash = function() {
      $('.botonCanjear').click(function() {
          $(this).hide();
          $('.exchangeBoxBarCode').show();
      });
  };

  // // ************ FUNCTION CHANGE COLOR PIN CUPON *************
  //
  //

  var updateCupon = function() {

    $scope.cupon.QuantityExchanged += 1;
    $scope.cupon.$save(function(data){
      console.log(data);
    });


    mixpanel.track("clickCanjear", {
        "type": "Cupon",
        "NameCoupon": $stateParams.couponId
    });

    swal({
        title: "Perfecto!",
        text: "Has cambiado tu cupón",
        type: "success",
        timer: 2000,
        showConfirmButton: false
    });
  };

  $scope.countCoupon = function() {


    if ($scope.cupon.TypeCoupon == "Coupon" && ($scope.cupon.QuantityExchanged < $scope.cupon.QuantityCoupons))  {
      updateCupon();
    } else if($scope.cupon.TypeCoupon == 'Fecha') {
      updateCupon();
    } else {
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

                  $state.go('app.playlists');
              }
          });
    }

    if ($scope.cupon.QuantityExchanged >= $scope.cupon.QuantityCoupons && $scope.cupon.TypeCoupon == "Coupon") {
      $scope.cupon.Status = false;
      $scope.cupon.$save(function(data){
        console.log(data);
      });
    }
  };
  $scope.$on('$ionicView.enter', function() {

    $scope.$parent.data = {
        heading: $scope.cupon.Provider,
        image: '',
        footerIconColors: ['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC'],
        backButton: true,
        toolsIcon: false,
        footer: true
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
      mixpanel.track("ClickShare", {"NameShareID": id});
    };
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
.controller('tutorialController', ['$scope', '$state', 'Customer', '$ionicSlideBoxDelegate', '$timeout', function($scope, $state, Customer, $ionicSlideBoxDelegate, $timeout) {
  // IdUsuario of Facebook or Frenzy for Pines and hearts
  $scope.customers = Customer;
  mixpanel.track("viewTurorial");
  // Disable slide Box into Tutorial
  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  // Next Button Tutorial
  $scope.next = function() {
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.next();
    $ionicSlideBoxDelegate.enableSlide(false);
  };
  // Back Button Tutorial
  $scope.previous = function() {
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.previous();
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    if(index === 0){
      $('#backTutorial').hide();
      $('#nextButtonTutorial').show();
    }
    if(index > 0){
      $('#backTutorial').show();
    }
    if(index === 1){
      $('#nextButtonTutorial').show();
    }
    if(index === 2){
      $('#nextButtonTutorial').hide();
    }
  }


}])
/*************************  TUTORIAL NO.2 ******************************/
.controller('tutorial2Controller', ['$scope', '$state', 'Customer', '$timeout', '$ionicSlideBoxDelegate', function($scope, $state, Customer, $timeout, $ionicSlideBoxDelegate) {

  $scope.customers = Customer;

  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  // Next Button Tutorial
  $scope.next = function() {
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.next();
    $ionicSlideBoxDelegate.enableSlide(false);
  };
  // Back Button Tutorial
  $scope.previous = function() {
    $ionicSlideBoxDelegate.enableSlide(true);
    $ionicSlideBoxDelegate.previous();
    $ionicSlideBoxDelegate.enableSlide(false);
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {

    if(index === 0){
      $('.footerBarStyle').show();
      $('#backTutorial').hide();
      $('#nextButtonTutorial').show();
    }
    if(index > 0){
      $('#backTutorial').show();
    }
    if(index === 1){
      // $('#thirdSlideTutorial').hide();
      $('#nextButtonTutorial').show();
    }
    if(index === 2){
      $('#nextButtonTutorial').show();
    }

    if(index === 3){
      $('.footerBarStyle').hide();
      $('#backTutorial').hide();
      $('#nextButtonTutorial').hide();
      setTimeout(function(){
        $ionicSlideBoxDelegate.slide(0);
        $state.go('app.playlists');
      }, 1000);
    }
  }

}])
/******************************************************/
.controller('toolsCtrl', function($scope, $state, $firebaseObject) {

  var ref = firebase.database().ref('User/' + firebase.auth().currentUser.uid);
  $scope.config = $firebaseObject(ref.child('config'));

  // Analytics Calls
  mixpanel.track("view", {"type": "Tools"});

  $scope.AnalyticsTools = function(id) {
      mixpanel.track("ClickOtros", {"type": id});
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
        backButton: false,
        toolsIcon: false,
        footer: true
    };
    $scope.$apply();
  });
})
    /**********************  FACEBOOK LOGIN CONTROLLER  **********************************/

.controller('loginCtrlFacebook', function($scope, $state, $cordovaFacebook, $q, $ionicLoading, $timeout, $firebaseObject) {

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
            function(response) {
                info.resolve(response);
            },
            function(response) {
                info.reject(response);
            }
        );
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

                    }
                });
            }).then(function() {
              var ref = firebase.database().ref('User/' +  firebase.auth().currentUser.uid);
              var user = $firebaseObject(ref);

              if(!user.IdFacebook) {

                    $cordovaFacebook.getLoginStatus()
                        .then(function(success) {
                            $cordovaFacebook.api('/me?fields=id,name,birthday,email,gender,hometown&access_token=' + success.authResponse.accessToken, null)
                                .then(function(success) {

                                    mixpanel.identify(firebase.auth().currentUser.uid);
                                    mixpanel.people.set({
                                        "$email": success.email,
                                        "$gender": success.gender,
                                        "$birthday": success.birthday,
                                        "$name": success.name,
                                        "$typeLogin": "Facebook"

                                    });
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
                  }
              //
              if(!user.config.analyticsAlias) {
                  mixpanel.alias(firebase.auth().currentUser.uid);
                  user.config.analyticsAlias = true;
                  user.$save();
              }
            });
    };
});
