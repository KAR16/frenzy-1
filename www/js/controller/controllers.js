var displayNoneInline = [];
var colorIconsFoother = [];
var pix = "170px";
var FirebaseFavorite = [];
var FirebasePromotionSaved = [];
var AllFavoriteF = [];
var AllPromotionF = [];
var Cupons = [];
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
var InfoShop = [];
var mainApp = firebase.initializeApp(config);
var secondaryApp = firebase.initializeApp(config2, "Secondary");
///////////////////////////////////////////////CALL CUSTOMER////////////////////////////////////////////////////////////////
var countC2 = 0;
var info = 0;
secondaryApp.database().ref('Customer').once('value', function(snapshot) {

    for (var x in snapshot.val()) {
        CustomerList[countC2] = snapshot.val()[x];
        CustomerList[countC2]["suma"] = snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"];
        CustomerList[countC2]["oferta"] = 'existe';
        CustomerList[countC2]["colorHeart"] = 'white';
        CustomerList[countC2]["lastText"] = 'favorite';

        countC2++;
    }
    countC2 = 0;

}).then(function() {
    for (var x in CustomerList) {
        InfoShop.push({
            cel: CustomerList[x].PhoneNumber,
            name: CustomerList[x].Name,
            url: CustomerList[x].URL,
            id: "favorite" + x,
            namecategory: CustomerList[x].CategoryApp,
            id: CustomerList[x].id,
            call: 'Llamar',
            callIcon: 'Q',
            webUrl: 'Ir a pagina Web',
            webUrlIcon: 'R',
            pixels: "170px",
            margin: "0"
        });
    }

}).then(function() {

    /////////////////////////////////////////////CALL PROMOTION//////////////////////////////////////////////////////////////////
    var countP = 0;
    mainApp.database().ref('Promotion').on('value', function(snapshot) {
        var GuatemalaDay = moment.tz("America/Guatemala").format('DD/MM/YYYY');
        var GuatemalaMonth = moment.tz("America/Guatemala").format('MM');
        var GuatemalaYear = moment.tz("America/Guatemala").format('YYYY');
        console.log(GuatemalaDay);
        console.log(GuatemalaMonth);
        console.log(GuatemalaYear);
        //console.log(JSON.stringify(snapshot.val()));
        for (x in snapshot.val()) {
            var DatePromoDay = moment(snapshot.val()[x]["EndDate"].iso).format('DD/MM/YYYY')
            var DatePromoMonth = moment(snapshot.val()[x]["EndDate"].iso).format('MM')
            var DatePromoYear = moment(snapshot.val()[x]["EndDate"].iso).format('YYYY')
            var fre = moment(snapshot.val()[x]["EndDate"].iso).format('DD/MM/YYYY')


            ////////////////////////////////////////////////////////////////////////////////////////////
            if (snapshot.val()[x].Status === true) {

                // console.log(snapshot.val()[x]);

                for (i in snapshot.val()[x].Customer) {
                    if (snapshot.val()[x].Photo === null || snapshot.val()[x].Photo === undefined || snapshot.val()[x].Photo === '') {
                        if (snapshot.val()[x].TypePromotion === 'DirectDiscount') {
                            var ahorroString = snapshot.val()[x].BasePrice - snapshot.val()[x].PromotionalPrice;
                            var basePriceString = snapshot.val()[x].BasePrice;
                            var PromotionalPriceString = snapshot.val()[x].PromotionalPrice;
                            ahorroString = ahorroString.toString();
                            basePriceString = basePriceString.toString();
                            PromotionalPriceString = PromotionalPriceString.toString();
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "sin";
                            CurrentPromotion[countP]["basePrice"] = 'Q' + basePriceString;
                            CurrentPromotion[countP]["promotionalPrice"] = 'Q' + PromotionalPriceString;
                            CurrentPromotion[countP]["texDiscount"] = "Ahorra";
                            CurrentPromotion[countP]["ahorro"] = 'Q' + ahorroString;
                            CurrentPromotion[countP]["before"] = "Antes";
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';
                            CurrentPromotion[countP]["Logo"] = '';



                        } else if (snapshot.val()[x].TypePromotion === 'Percentage') {
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "sin";
                            CurrentPromotion[countP]["promotionalPrice"] = 'Descuento ' + snapshot.val()[x].Percentage + '%';
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["display"] = 'none';
                            CurrentPromotion[countP]["logo"] = '';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';

                        } else if (snapshot.val()[x].TypePromotion === 'SpecialPromotion') {
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "sin";
                            CurrentPromotion[countP]["promotionalPrice"] = 'Promoción Especial';
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["display"] = 'none';
                            CurrentPromotion[countP]["logo"] = '';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';
                            CurrentPromotion[countP]["icon"] = 'c';
                        }
                    } else {
                        if (snapshot.val()[x].TypePromotion === 'DirectDiscount') {
                            var ahorroString = snapshot.val()[x].BasePrice - snapshot.val()[x].PromotionalPrice;
                            var basePriceString = snapshot.val()[x].BasePrice;
                            var PromotionalPriceString = snapshot.val()[x].PromotionalPrice;
                            ahorroString = ahorroString.toString();
                            basePriceString = basePriceString.toString();
                            PromotionalPriceString = PromotionalPriceString.toString();
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "con";
                            CurrentPromotion[countP]["basePrice"] = 'Q' + basePriceString;
                            CurrentPromotion[countP]["promotionalPrice"] = 'Q' + PromotionalPriceString;
                            CurrentPromotion[countP]["texDiscount"] = "Ahorra";
                            CurrentPromotion[countP]["ahorro"] = 'Q' + ahorroString;
                            CurrentPromotion[countP]["before"] = "Antes";
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';
                            CurrentPromotion[countP]["Logo"] = '';


                        } else if (snapshot.val()[x].TypePromotion === 'Percentage') {
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "con";
                            CurrentPromotion[countP]["promotionalPrice"] = 'Descuento ' + snapshot.val()[x].Percentage + '%';
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["display"] = 'none';
                            CurrentPromotion[countP]["logo"] = '';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';

                        } else if (snapshot.val()[x].TypePromotion === 'SpecialPromotion') {
                            CurrentPromotion[countP] = snapshot.val()[x];
                            CurrentPromotion[countP]["nul"] = "con";
                            CurrentPromotion[countP]["promotionalPrice"] = 'Promoción Especial';
                            CurrentPromotion[countP]["ID"] = "pinOfferts";
                            CurrentPromotion[countP]["IDpromotion"] = x;
                            CurrentPromotion[countP]["Category"] = snapshot.val()[x].Customer[i];
                            CurrentPromotion[countP]["conteo"] = 0;
                            CurrentPromotion[countP]["oferta"] = 'existe';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["display"] = 'none';
                            CurrentPromotion[countP]["logo"] = '';
                            CurrentPromotion[countP]["ColorPin"] = 'silver';
                            CurrentPromotion[countP]["IconShopOnline"] = 'j';
                            CurrentPromotion[countP]["Display"] = '';
                            CurrentPromotion[countP]["icon"] = 'c';
                        }
                    }
                }
                countP++


            } else {
                //console.log("no lo son");
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////

        }
        countP = 0;
        //  console.log(CurrentPromotion);
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////CALL CUSTOMER////////////////////////////////////////////////////////////////
    var countCp = 0;
    // ********* CUPONS *********
    //xvar Cupons = [];
    mainApp.database().ref('Coupon').on('value', function(snapshot) {
        //console.log('-------------------');
        // console.log(snapshot);
        for (x in snapshot.val()) {
            for (i in snapshot.val()[x].Customer) {
                if (snapshot.val()[x].PhotoCoupon === null || snapshot.val()[x].PhotoCoupon === undefined) {
                    CurrentPromotion[countP] = snapshot.val()[x];
                    Cupons[countCp]["nul"] = 'sin';
                    Cupons[countCp]["name"] = snapshot.val()[x].Name;
                    Cupons[countCp]["description"] = snapshot.val()[x].CouponDescription;
                    Cupons[countCp]["Canjea"] = snapshot.val()[x].CouponDiscount;
                    Cupons[countCp]["Category"] = snapshot.val()[x].Customer[i];
                    Cupons[countCp]["cupon"] = "existe";
                    Cupons[countCp]["ColorPinCupon"] = "silver";
                    Cupons[countCp]["BarCodePhoto"] = snapshot.val()[x].BarCodePhoto;
                    Cupons[countCp]["Presentation"] = snapshot.val()[x].Presentation;
                    Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
                    Cupons[countCp]["customer"] = snapshot.val()[x].Customer[i];
                    Cupons[countCp]["PhotoCupon"] = snapshot.val()[x].PhotoCoupon;
                    Cupons[countCp]["Publication_Date"] = snapshot.val()[x].PublicationDate.substring(0, 10);
                    Cupons[countCp]["End_Date"] = snapshot.val()[x].EndDate;
                    Cupons[countCp]["IDCupon"] = x;
                    Cupons[countCp]["TermsAndConditions"] = snapshot.val()[x].TermsAndConditions;
                    Cupons[countCp]["Categoryapp"] = snapshot.val()[x].CategoryApp;
                    Cupons[countCp]["TypeCoupon"] = snapshot.val()[x].TypeCoupon;
                    Cupons[countCp]["QuantityCoupons"] = snapshot.val()[x].QuantityCoupons;
                    Cupons[countCp]["QuantityExchanged"] = snapshot.val()[x].QuantityExchanged;
                    Cupons[countCp]["ShopOnline"] = snapshot.val()[x].ShopOnline;
                    Cupons[countCp]["Display"] = '';
                    Cupons[countCp]["TypeOfExchange"] = snapshot.val()[x].TypeOfExchange;
                } else {
                    Cupons[countCp] = snapshot.val()[x];
                    Cupons[countCp]["nul"] = "con";
                    Cupons[countCp]["name"] = snapshot.val()[x].Name;

                    Cupons[countCp]["description"] = snapshot.val()[x].CouponDescription;
                    Cupons[countCp]["Canjea"] = snapshot.val()[x].CouponDiscount;
                    Cupons[countCp]["Category"] = snapshot.val()[x].Customer[i];
                    Cupons[countCp]["cupon"] = "existe";
                    Cupons[countCp]["ColorPinCupon"] = "silver";
                    Cupons[countCp]["BarCodePhoto"] = snapshot.val()[x].BarCodePhoto;
                    Cupons[countCp]["Presentation"] = snapshot.val()[x].Presentation;
                    Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
                    Cupons[countCp]["customer"] = snapshot.val()[x].Customer[i];
                    Cupons[countCp]["PhotoCupon"] = snapshot.val()[x].PhotoCoupon;
                    Cupons[countCp]["Publication_Date"] = snapshot.val()[x].PublicationDate.substring(0, 10);
                    Cupons[countCp]["End_Date"] = moment(snapshot.val()[x].EndDate.iso).format('DD/MM/YYYY');
                    Cupons[countCp]["IDCupon"] = x;
                    Cupons[countCp]["TermsAndConditions"] = snapshot.val()[x].TermsAndConditions;
                    Cupons[countCp]["Categoryapp"] = snapshot.val()[x].CategoryApp;
                    Cupons[countCp]["TypeCoupon"] = snapshot.val()[x].TypeCoupon;
                    Cupons[countCp]["QuantityCoupons"] = snapshot.val()[x].QuantityCoupons;
                    Cupons[countCp]["QuantityExchanged"] = snapshot.val()[x].QuantityExchanged;
                    Cupons[countCp]["ShopOnline"] = snapshot.val()[x].ShopOnline;
                    Cupons[countCp]["Display"] = '';
                    Cupons[countCp]["TypeOfExchange"] = snapshot.val()[x].TypeOfExchange;
                }
            }
            countCp++
        }
        for (a in Cupons) {
            var EndDateC = new Date(moment(Cupons[a]["EndDate"], 'DD/MM/YYYY'));
            var fechaFinal = new Date(moment(Cupons[a]["EndDate"], 'DD/MM/YYYY HH:mm:ss'));
            fechaFinal = moment(fechaFinal).format('x')
            var End_Date_Coupons = moment.tz(EndDateC, 'America/Guatemala').format('DD/MM/YYYY');
            var End_Date_Milisec = fechaFinal
            var Guatemala_Date = moment.tz("America/Guatemala").format('x');
            var DaysToFinalize = Math.round(((End_Date_Milisec - Guatemala_Date) / (24 * 60 * 60 * 1000)))

            Cupons[a]["EndDate"] = End_Date_Coupons
            Cupons[a]["DaysToFinalize"] = DaysToFinalize;
        }

        countCp = 0
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    }
    $scope.genderFemaleleStyle = function() {
            $scope.genderFemaleleBStyle = {
                'background-color': '#263147 ',
                'color': 'white'
            };
            $scope.genderMaleBStyle = {
                'color': '#263147  '
            };
            $scope.optionGender = 'female';
        }
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
            })
        }
        // This Function works for to Validate fields of the form
    $scope.Alert = function() {
            if ($scope.user.email == undefined) {
                sweetAlert('Lo sentimos', 'El campo de correo electrónico no puede estar vacío. Intentelo nuevamente', 'error');
            } else if ($scope.user.password == undefined) {
                sweetAlert('Lo sentimos', 'Debe ingresar una contraseña para poder continuar. Intentelo nuevamente', 'error');
            } else {
                $scope.ValidarEmail = "none"
                $scope.Validarpassword = "none"
                    // Redirect to Register Function for to create a new user in Firebase
                $scope.register()
            }
        }
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
            dateBirthday = dateBirthday.toLocaleDateString()
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
                        }, 2000)
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
                if (snapshot.val() == null) {
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
                    for (x in snapshot.val()) {
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
    }
})

// ************************* LOGIN WITH FRENZY *************************
.controller('LoginCtrlEmail', function($scope, $state, $rootScope, $ionicLoading) {

    // Verify Email with Firebase
    $scope.VerifyEmail = function() {
        mainApp.auth().onAuthStateChanged(function(user) {
            // Email already verified

            if (user.emailVerified) {
                $state.go('loadingLoginUser');
                IdUsuario = user.uid
                mainApp.database().ref('Users').on('value', function(snapshot) {
                    for (x in snapshot.val()) {
                        if (x == IdUsuario) {
                            IdGender = snapshot.val()[x].Gender
                        }
                    }
                });
            } else {
                sweetAlert('Oops', 'Por favor verifica tu correo electrónico e intenta nuevamente.', 'warning');
            }
        })
    }

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
// ********************* PAGE_START CONTROLLER ****************************
.controller('HomeCtrl', function($scope, $ionicLoading, $timeout, $firebaseArray) {

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

      // Change footer colors
      colorIconsFoother = []
      colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', '', 'img/icn-35.png', '', 'none', 'none']);
    });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, AllFavorite, $firebaseObject, Customer, Promotion, Favorite) {

  $scope.favorites = Favorite;

  $scope.customers = Customer;
  $scope.promotions = Promotion;

    /*************************************************/
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "YourFavorites",
        "Gender": IdGender,
        "User": NameUser
    });

    $scope.SalvadosSaveAndDelete = function(id) {
            var NamePromo = id
            var NameUser = String(IdUsuario)
            var Dimensions = {
                name: 'FavoritePin_' + NamePromo,
                user: NameUser
            };
            var ValSend = true
            for (x in FirebasePromotionSaved[0].PromotionID) {
                if (FirebasePromotionSaved[0].PromotionID[x] == id) {
                    ValSend = false
                }
            }

            var pin = document.getElementById(id).style.color;
            if (pin == "silver") {
                mixpanel.track("ClickPin", {
                    "NameCategory": NamePromo,
                    "User": NameUser,
                    "Action": "Add",
                    "Gender": IdGender
                });
                document.getElementById(id).style.color = "purple";
                if (ValSend == true) {
                    var newPostKey = firebase.database().ref().child('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').push().key;
                    var Cus = {}
                    Cus[newPostKey] = id
                    firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').update(Cus);
                }
            } else {
                mixpanel.track("ClickPin", {
                    "NameCategory": NamePromo,
                    "User": NameUser,
                    "Action": "Delete",
                    "Gender": IdGender
                });
                document.getElementById(id).style.color = "silver";
                for (i in FirebasePromotionSaved[0].PromotionID) {

                    if (FirebasePromotionSaved[0].PromotionID[i] == id) {
                        firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID/' + i).remove();
                    }
                }

                for (a in CurrentPromotion) {
                    if (CurrentPromotion[a].IDpromotion == id) {
                        CurrentPromotion[a].ColorPin = "silver"
                    }
                }

            }
        }
        /**************************************************/

    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC', '#FF5252', '#A7A9AC', '#A7A9AC', '', 'img/icn-35.png', '', 'none']);
    });

})
// *************************** SAVED CONTROLLER ***************************
.controller('AllPromotionCtrl', function($scope, $stateParams, AllPromotion) {
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "PinSaved",
        "Gender": IdGender,
        "User": NameUser
    });
    var NameUser = String(IdUsuario)
    var dimensions = {
        name: 'Salvados',
        user: NameUser
    };



    // ************ DELETE AND SAVE PIN ************
    $scope.SalvadosSaveAndDelete = function(id) {
        var NamePromo = id
        var NameUser = String(IdUsuario)
        var Dimensions = {
            name: 'FavoritePin_' + NamePromo,
            user: NameUser
        };
        var ValSend = true
        for (x in FirebasePromotionSaved[0].PromotionID) {

            if (FirebasePromotionSaved[0].PromotionID[x] == id) {
                ValSend = false;
            }
        }
        var pin = document.getElementById(id).style.color;
        if (pin == "silver") {
            mixpanel.track("ClickPin", {
                "NameCategory": NamePromo,
                "User": NameUser,
                "Action": "Add",
                "Gender": IdGender
            });
            document.getElementById(id).style.color = "purple";
            if (ValSend == true) {
                var newPostKey = firebase.database().ref().child('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').push().key;
                var Cus = {}
                Cus[newPostKey] = id
                firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').update(Cus);
            }
        } else {
            mixpanel.track("ClickPin", {
                "NameCategory": NamePromo,
                "User": NameUser,
                "Action": "Delete",
                "Gender": IdGender
            });
            document.getElementById(id).style.color = "silver";
            for (i in FirebasePromotionSaved[0].PromotionID) {

                if (FirebasePromotionSaved[0].PromotionID[i] == id) {
                    firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID/' + i).remove();
                }
            }

            for (a in CurrentPromotion) {
                if (CurrentPromotion[a].IDpromotion == id) {
                    CurrentPromotion[a].ColorPin = "silver"
                }
            }
        }
    }

    $scope.$on('$ionicView.enter', function() {
        $scope.chats = AllPromotion.all($stateParams.salvadosId);
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC', '#A7A9AC', '#9C28B0', '#A7A9AC', '', 'img/icn-35.png', '', 'none']);
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
      console.log('Favorite. Added - ', customerId);
    }, function(error){console.log("Error:", error)});
  };

    //TODO check if this does not break anything. Else delete.
    // $scope.UrlC = function(id) {
    //         console.clear();
    //         console.log(id);
    //         var resultSetCs = $.grep(CustomerList, function(e) {
    //             return e.Name.indexOf(id) == 0;
    //         });
    //
    //         var promotionPage = "#/app/ofertas/"
    //         var couponPage = "#/app/cupones/";
    //         console.log(resultSetCs[0]);
    //         // Validate if doesn't existing a promotion then redirection to coupons page. 	location.href=couponPage
    //         if (resultSetCs[0].QuantityPromotion > 0 && resultSetCs[0].QuantityCoupon > 0) {
    //
    //             location.href = promotionPage + id
    //         } else if (resultSetCs[0].QuantityPromotion > 0) {
    //
    //             location.href = promotionPage + id
    //         } else if (resultSetCs[0].QuantityCoupon > 0) {
    //
    //             location.href = couponPage + id
    //         } else {
    //             location.href = promotionPage + id
    //         }
    //     }
})

//////////////////////
.controller('CustomerCtrl', function($scope, $ionicLoading, $stateParams, CustomerAll, Customer) {

    $scope.customers = Customer;
    $scope.category = $stateParams.IDcustomer;

    //
    var Direc = [{
        name: "Supermercado",
        name2: "supermarketMenu"
    }, {
        name: "Restaurantes",
        name2: "restaurantMenu"
    }, {
        name: "Otros",
        name2: "otherMenu"
    }, {
        name: "Electronicos",
        name2: "entertainmentMenu"
    }, {
        name: "Moda",
        name2: "fashionMenu"
    }, {
        name: "Entretenimiento",
        name2: "entertainmentMenu"
    }]
    var DirecParse = $.grep(Direc, function(e) {
        return e.name.indexOf($stateParams.IDcustomer) == 0;
    });
    var NameUser = String(IdUsuario)

    var dimensions = {
        name: DirecParse[0].name2
    };
    mixpanel.track("view", {
        "type": "Customers",
        "Gender": IdGender,
        "User": NameUser
    });
    mixpanel.track("ClickCategory", {
        "NameCategory": DirecParse[0].name2,
        "Gender": IdGender,
        "User": NameUser
    });
    // Loading scope
    $scope.loading = $ionicLoading.show({
        noBackdrop: true,
        template: '<ion-spinner customer1lass="spinner" icon="lines" class = "Loading' + $scope.AppCategory + '"></ion-spinner>'
    });

    /************ FUNCTION CHANGE COLOR HEART  **********/
    // $scope.changeColorHeart = function(parametro, category) {
    //
    //     var cssColor = document.getElementById(parametro + " " + category).style.color;
    //     if (cssColor == "white") {
    //         document.getElementById(parametro + " " + category).style.color = "red";
    //         SaveFavorite(IdUsuario, category)
    //     } else {
    //         document.getElementById(parametro + " " + category).style.color = "white";
    //         console.log(category);
    //         DeleteFavorite(IdUsuario, category)
    //     }
    // };

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        setTimeout(function() {
            $ionicLoading.hide();
        }, 1000);


        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', $scope.AppCategory, '', 'none', ]);
    });
})
///////////


.controller('PromotionsDescription', function($scope, $stateParams, DescriptionOfferts, $ionicPopover, $ionicPopup, $timeout, $ionicLoading) {
    mixpanel.track("view", {
        "type": "PromotionsDescription",
        "Gender": IdGender,
        "User": IdUsuario
    });
    $scope.chats = DescriptionOfferts.all($stateParams.superId);
    console.log($scope.chats);
    $scope.custumerName = $scope.chats[0].Category.replace(/-/g, " ");
    $scope.$on('$ionicView.enter', function() {
        console.log();
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', $scope.custumerName, '', 'none']);
    });
})
// *************************  OFFERS CONTROLLER	***************************
.controller('currentPromotionCtrl', function($scope, $stateParams, currentPromotion, $ionicPopover, $ionicPopup, $timeout, $ionicLoading, $cordovaSocialSharing, $cordovaInAppBrowser) {
    var dimensions = {
        name: $stateParams.superId,
    };
    var NameUser = String(IdUsuario);
    mixpanel.track("view", {
        "type": "Promotions",
        "Gender": IdGender,
        "User": NameUser,
        "Namepromotion": $stateParams.superId
    });
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
        $scope.message = 'hello';
    });
    $scope.share = function(images) {
            console.log(images);
            window.plugins.socialsharing.share("frenzy", "Entra a nuestra app para ver mas promocioines", null, images)

        }

    $scope.pix = currentPromotion.get($stateParams.superId);
    //	console.log($scope.pix);
    $scope.pixels = $scope.pix[1][0].pixels;

    $scope.sendSms = function() {
        $cordovaSocialSharing.shareViaSMS('Visitanos en: http://frenzy.com.gt para encontrar las mejores ofertas :)', '').then(function(result) {}, function(err) {
            console.log('error mensaje');
        });
    }

    // ************ FUNCTION CHANGE COLOR PIN OFFERTS ************
    $scope.changeColorPinOfferts = function(id, IDPromotion, Namepromotion) {
        var NamePromo = Namepromotion
        var NameUser = String(IdUsuario)
        var Dimensions = {
            name: 'PromotionPin_' + NamePromo,
            user: NameUser
        };

        var ValSend = true
        for (x in FirebasePromotionSaved[0].PromotionID) {
            console.log(FirebasePromotionSaved[0].PromotionID[x]);
            if (FirebasePromotionSaved[0].PromotionID[x] == IDPromotion) {
                ValSend = false;
            }
        }
        var cssColorpinOfferts = document.getElementById(id + " " + IDPromotion).style.color;

        if (cssColorpinOfferts == "silver") {
            mixpanel.track("ClickPin", {
                "NameCategory": NamePromo,
                "User": NameUser,
                "Action": "Add",
                "Gender": IdGender
            });
            document.getElementById(id + " " + IDPromotion).style.color = "purple";
            if (ValSend == true) {
                var newPostKey = firebase.database().ref().child('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').push().key;
                var Cus = {}
                Cus[newPostKey] = IDPromotion
                firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID').update(Cus);
            }
        } else {
            AllPromotionF = [];
            mixpanel.track("ClickPin", {
                "NameCategory": NamePromo,
                "User": NameUser,
                "Action": "Delete",
                "Gender": IdGender
            });
            document.getElementById(id + " " + IDPromotion).style.color = "silver";
            for (i in FirebasePromotionSaved[0].PromotionID) {

                if (FirebasePromotionSaved[0].PromotionID[i] == IDPromotion) {
                    firebase.database().ref('PromotionSaved/' + FirebasePromotionSaved[0].PromotionSavedID + '/PromotionID/' + i).remove();
                }
            }

            for (a in CurrentPromotion) {
                if (CurrentPromotion[a].IDpromotion == IDPromotion) {
                    CurrentPromotion[a].ColorPin = "silver"
                }

            }
        }
    };
    // *********** FUNCTION CHANGE COLOR PIN OFFERTS WITHOUT IMAGE **********
    $scope.changeColorPinOffertsWithoutImage = function(id, IDPromotion) {
        var cssColorpinOffertsWithoutImage = document.getElementById(id + " " + IDPromotion).style.color;

        if (cssColorpinOffertsWithoutImage == "silver") {
            document.getElementById(id + " " + IDPromotion).style.color = "purple";
            SavePromotion(IdUsuario, IDPromotion);
        } else {
            document.getElementById(id + " " + IDPromotion).style.color = "silver";
            DeletePromotion(IdUsuario, IDPromotion);
        }
    };
    // *************** CALL PHONE FUNCTION ***************
    $scope.call = function(cell, name) {
            var NameUser = String(IdUsuario);
            mixpanel.track("ClickCall", {
                "Costumer": name,
                "User": NameUser,
                "Gender": IdGender
            });
            var a = cell.toString();
            var b = 'tel:'
            var callPhone = b + a;
            //This action works for to do call
            document.location.href = callPhone

        }
        // *************** URL BROWSER SHOP FUNCTION ***************
    $scope.shopUrl = function(url, id, name) {
        var NamePromo = name.split(" ").join("_")
        var NameUser = String(IdUsuario)

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
    }

    $scope.$on('$ionicView.enter', function() {

        // Redirection page variable to coupons
        var couponPage = "#/app/cupones/";
        idRoute = currentPromotion.get($stateParams.superId);
        // IdPromotion with redirection page
        couponPage = couponPage + $stateParams.superId
        var NamePromo = $stateParams.superId
        var NameUser = String(IdUsuario)
        var Dimensions = {
            name: 'HeartPopover_' + NamePromo,
            user: NameUser
        };
        $scope.changeColorHeartFollow = function(id) {
                var ValSend = true
                for (x in FirebaseFavorite[0].CustomerID) {
                    console.log(FirebaseFavorite[0].CustomerID[x]);
                    if (FirebaseFavorite[0].CustomerID[x] == id) {
                        ValSend = false;
                    }
                }

                if ($scope.heartMenu == "silver") {
                    mixpanel.track("ClickHeart", {
                        "NameCategory": NamePromo,
                        "User": NameUser,
                        "Action": "Add",
                        "Gender": IdGender
                    });
                    if (ValSend == true) {
                        var newPostKey = firebase.database().ref().child('Favorite/' + FirebaseFavorite[0].FavoriteID + '/CustomerID').push().key;
                        var Cus = {}
                        Cus[newPostKey] = id
                        firebase.database().ref('Favorite/' + FirebaseFavorite[0].FavoriteID + '/CustomerID').update(Cus);
                    }
                    $scope.heartMenu = "red";

                } else {
                    mixpanel.track("ClickHeart", {
                        "NameCategory": NamePromo,
                        "User": NameUser,
                        "Action": "Delete",
                        "Gender": IdGender
                    });

                    for (i in FirebaseFavorite[0].CustomerID) {
                        if (FirebaseFavorite[0].CustomerID[i] == id) {
                            firebase.database().ref('Favorite/' + FirebaseFavorite[0].FavoriteID + '/CustomerID/' + i).remove();
                        }
                    }
                    $scope.heartMenu = "silver";
                    for (a in CustomerList) {
                        if (CustomerList[a].Name == id) {
                            CustomerList[a].colorHeart = "white"
                        }
                    }
                }
            }
            /* **************************************************** */
        $scope.askPromotion = function(IDPromotion) {
                var NamePromo = $stateParams.superId
                var NameUser = String(IdUsuario)
                var Dimensions = {
                    name: 'peticionPromo_' + NamePromo,
                    user: NameUser
                };

                swal({
                        title: "<p class='home' style='font-size:70px;color:blue'>b</p> <p style='font-weight:bold;color:#343434;font-size:20px'>Tu petición por más <br>Ofertas ha sido envida</p>",
                        text: "<div class='row'> <div class = 'col'></div>  <p class = 'padin open_sans col col-75'>  ¿Te gustaria agregar a <spam class='colorShopName'>" + $stateParams.superId + "</spam> como una de tus tiendas favoritas?</p>  <div class = 'col'></div>  </div>",
                        html: true,
                        confirmButtonColor: "#00BAB9",
                        confirmButtonText: "Agregar",
                        // Si se quiere cancelar pulsando otra parte de la aplicacion
                        allowOutsideClick: true
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            mixpanel.track("ClickRequestPromotion", {
                                "NameCostumer": NamePromo,
                                "User": NameUser,
                                "Gender": IdGender
                            });
                            SaveFavorite(IdUsuario, IDPromotion)
                            $scope.loading = $ionicLoading.show({
                                template: "<ion-spinner customer1lass='spinner' icon='lines' style='stroke: #00BAB9;fill: #00BAB9;'></ion-spinner><br><p style='font-size:18px'>Agregando a <spam style='font-size:24px;font-weight:bold;'>" + $stateParams.superId + "</spam> como una de tus tiendas favoritas, espera un momento... </p>"
                            });

                            $timeout(function() {
                                $ionicLoading.hide();
                            }, 2000);
                        }
                    });
            }
            /* **************************************************** */
        $scope.chats = currentPromotion.get($stateParams.superId);
        console.log($scope.chats);
        $scope.popover = currentPromotion.all($stateParams.superId);
        $scope.heartMenu = "silver";
        $scope.Cupcon = Cupcont.length
        $scope.heartPopover = function(id) {
            var resultSetPopover = $.grep(CustomerList, function(e) {
                return e.Name.indexOf(id) == 0;
            });

            if (resultSetPopover[0].colorHeart == "white") {
                $scope.heartMenu = "silver";
            } else {
                $scope.heartMenu = resultSetPopover[0].colorHeart;
            }

        }
    });
    //***** FUNCTION FOOTER CHANCE COLOR  *****
    //***** SCOPE $ON TO REFRESH MENU CONTROLLER
    $scope.custumerName = $stateParams.superId.replace(/-/g, " ");
    $scope.$on('$ionicView.enter', function() {
        console.log();
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', $scope.custumerName, '', 'none']);
    });
})
// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams, Coupons, $ionicLoading, $cordovaSocialSharing, $cordovaInAppBrowser, Coupon, Promotion, Customer, Favorite, $ionicPopover) {


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

    colorIconsFoother = []
    colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', $scope.customer.CategoryApp, '', 'none']);
    console.log('Customer is' ,$scope.customer);
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
    }

    // *************** CALL PHONE FUNCTION ***************
    $scope.call = function(cell) {
            a = cell.toString();
            b = 'tel:'
            window.open(b + a);
        }
        // *************** URL BROWSER SHOP FUNCTION ***************
    $scope.shopUrl = function(Url, id, name) {
        var NamePromo = name.split(" ").join("_")
        var NameUser = String(IdUsuario)
        var Dimensions = {
            name: 'Coupons_' + NamePromo + "_" + id,
            user: NameUser
        };

        if (id == "web") {
            z = Url;
            mixpanel.track("ClickWeb", {
                "Costumer": name,
                "User": NameUser,
                "Gender": IdGender
            });
            window.open = $cordovaInAppBrowser.open(z, '_blank', 'location=yes');
        } else {
            mixpanel.track("ClickCartShop", {
                "Costumer": name,
                "User": NameUser,
                "Gender": IdGender
            });
            z = Url;
            window.open = $cordovaInAppBrowser.open(z, '_blank', 'location=yes');
        }

    }

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
    }, function(error){console.log("Error:", error)});
  };

})


// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams, DescriptionCupons, $ionicLoading) {

    $scope.llenar2 = function() {
        displayNoneInline = [{
            none: "inline",
            inline: "none"
        }];
    };

    mixpanel.track("view", {
        "type": "DescriptionCupon",
        "Gender": IdGender,
        "User": IdUsuario
    });
    $scope.reloadpage = function() {
        $scope.cupons[0].QuantityExchanged += 1
    }

    // ***************  EXCHANGE BUTTON DISPLAY NONE********************
    $scope.buttonCash = function() {
        $('.botonCanjear').click(function() {
            $(this).hide();
            $('.exchangeBoxBarCode').show();
        })
    }

    // ************ FUNCTION CHANGE COLOR PIN CUPON *************
    $scope.changeColorPinCupon = function(id) {
        var cssColorCuponPin = document.getElementById(id).style.color;
        if (cssColorCuponPin == "silver") {
            document.getElementById(id).style.color = "purple";
            saveCuponFavorite(IdUsuario, id)
        } else {
            deleteFavoriteCupon(IdUsuario, id)
            document.getElementById(id).style.color = "silver";
        }
    };


    $scope.HideStyleButtonExchangePosition = "absolute";
    $scope.HideStyleButtonExchangeBottom = "0";

    $scope.countCoupon = function() {
            var QuantityExchangedsu = 0;
            $scope.HideStyleButtonExchangePosition = "none"
            $scope.HideStyleButtonExchangeBottom = "none"
                // mainApp.database().ref('Cupon/'+x).update({
                //       Status: false
                // });


            mainApp.database().ref('Coupon').once('value', function(snapshot) {
                for (x in snapshot.val()) {

                    if (snapshot.val()[x].TypeCoupon === "Coupon") {
                        // ------------------------------------------------------------------------------------------------------------------------------------------------
                        if (parseInt(snapshot.val()[x].QuantityExchanged) < parseInt(snapshot.val()[x].QuantityCoupons)) {

                            QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1
                            mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
                                QuantityExchanged: QuantityExchangedsu
                            });
                            mixpanel.track("clickCanjear", {
                                "type": "Cupon",
                                "Gender": IdGender,
                                "User": NameUser,
                                "NameCoupon": $stateParams.DescriptionID
                            });
                            swal({
                                title: "Perfecto!",
                                text: "Has cambiado tu cupón",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } else {

                            $scope.cupons[0].QuantityExchanged = parseInt(snapshot.val()[x].QuantityCoupons);

                            mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
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
                        // ------------------------------------------------------------------------------------------------------------------------------------------------
                    } else if (snapshot.val()[x].TypeCoupon === "Fecha") {

                        mixpanel.track("clickCanjear", {
                            "type": "fecha",
                            "Gender": IdGender,
                            "User": IdUsuario,
                            "NameCoupon": $stateParams.DescriptionID
                        });
                        QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1
                        mainApp.database().ref('Coupon/' + $stateParams.DescriptionID).update({
                            QuantityExchanged: QuantityExchangedsu
                        });
                    }

                }

            });

        }
        /*****  noneDisplay equalTo displayNoneInline for
         				call the list and show or hide barcode image
        				in DescriptionCupons  *****/
        // colorIconsFoother=$scope.$on('$ionicView.enter', function() {});[];

    // ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        $scope.noneDisplay = displayNoneInline;
        if ($scope.noneDisplay[0].position == "absolute") {
            $scope.HideStyleButtonExchangePosition = "none"
            $scope.HideStyleButtonExchangeBottom = "none"
        }

        $scope.cupons = DescriptionCupons.all($stateParams.DescriptionID);
        colorIconsFoother = []
        colorIconsFoother.push(['#00DDC1', '#A7A9AC', '#A7A9AC', '#A7A9AC', $scope.cupons[0].Category, '', 'none']);
    });
})
//*********************  MENU CONTROLLER  *******************************
.controller('menuCtrl', function($scope, $stateParams) {

    $scope.$on('$ionicView.enter', function() {
        $scope.footerChangeColor = colorIconsFoother;
    });
})
//*****************	POPOVER CONTROLLER FOR OFFERS	*******************************
.controller('PopoverCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
        $scope.message = 'hello';
    });
})
//*****************	POPOVER CONTROLLER FOR COUPONS	*******************************
// .controller('PopoverCtrl2', function($scope, $ionicPopover) {
//     $ionicPopover.fromTemplateUrl('templates/popover2.html', {
//         scope: $scope,
//     }).then(function(popover) {
//         $scope.popover = popover;
//     });
//
//
// })
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
        $scope.message = 'cheers';
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
                for (x in snapshot.val()) {
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
.controller('tutorialController', ['$scope', '$state', function($scope, $state) {
    var guate = moment.tz("America/Guatemala");
    mixpanel.track("viewTurorial");
    // IdUsuario of Facebook or Frenzy for Pines and hearts

    $scope.slideChanged = function(index) {
        switch (index) {
            case 3:
                $state.go('loginAndRegister');
                break;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var FireCustomer;
    var CustomerF = [];

    var countC = 0;
    secondaryApp.database().ref('Customer').on('value', function(snapshot) {
        FireCustomer = snapshot.val();
        for (x in snapshot.val()) {
            CustomerF[countC] = snapshot.val()[x]
            CustomerF[countC]["suma"] = snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"]
            countC++
        }
        countC = 0
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.TutorialPromotion = CustomerF;
}])
/*************************  TUTORIAL NO.2 ******************************/
.controller('tutorial2Controller', ['$scope', '$state', function($scope, $state) {
    $scope.slideChanged = function(index) {
        switch (index) {
            case 0:
                $state.go('app.herramientas');
                break;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var FireCustomer;
    var CustomerF = [];

    var countC = 0;
    secondaryApp.database().ref('Customer').on('value', function(snapshot) {
        FireCustomer = snapshot.val();
        for (x in snapshot.val()) {
            CustomerF[countC] = snapshot.val()[x]
            CustomerF[countC]["suma"] = snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"]
            countC++
        }
        countC = 0;
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.TutorialPromotion = CustomerF;
}])
/******************************************************/
.controller('toolsCtrl', ['$scope', '$state', function($scope, $state) {
    var NameUser = String(IdUsuario)
    var Dimensions = {
        name: 'tools',
        user: NameUser
    };
    mixpanel.track("view", {
        "type": "Tools",
        "Gender": IdGender,
        "User": NameUser
    });
    $scope.AnalyticsTools = function(id) {
        var NameUser = String(IdUsuario)
        var dimensions = {
            name: 'tools_' + id,
            user: NameUser
        };
        mixpanel.track("ClickOtros", {
            "type": id,
            "Gender": IdGender,
            "User": NameUser
        });
    }
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
        colorIconsFoother = []
        colorIconsFoother.push(['#A7A9AC', '#A7A9AC', '#A7A9AC', '#3F51B5', '', 'img/icn-35.png', '', 'none']);
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
                                    mainApp.database().ref('Favorite').on('value', function(snapshot) {
                                        var CountFF = 0;
                                        for (x in snapshot.val()) {
                                            if (snapshot.val()[x].UserID == UserUID) {
                                                for (i in snapshot.val()[x].CustomerID) {
                                                    for (c in CustomerList) {

                                                        if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
                                                            CustomerList[c].colorHeart = "red"
                                                        }
                                                    }
                                                }
                                                FirebaseFavorite[CountFF] = snapshot.val()[x]
                                                FirebaseFavorite[CountFF]["FavoriteID"] = x
                                                CountFF++
                                            }

                                        }
                                    });
                                    //////////////////////////////////////////////////////////////////////////
                                    ///////////////////////////SAVED PIN////////////////////////////////////

                                    mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
                                        var CountPS = 0;
                                        for (x in snapshot.val()) {
                                            if (snapshot.val()[x].UserID == UserUID) {

                                                for (i in snapshot.val()[x].PromotionID) {
                                                    for (c in CurrentPromotion) {
                                                        if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
                                                            CurrentPromotion[c].ColorPin = "purple"
                                                        } else {
                                                            console.log("no encontro nada ");
                                                        }
                                                    }
                                                }
                                                FirebasePromotionSaved[CountPS] = snapshot.val()[x]
                                                FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
                                                CountPS++
                                            }

                                        }
                                    });
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
                                    })

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
})
