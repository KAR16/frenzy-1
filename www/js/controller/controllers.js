var displayNoneInline = []
var colorIconsFoother = []
var pix = "170px"
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

var mainApp =  firebase.initializeApp(config);
	var secondaryApp = firebase.initializeApp(config2, "Secondary");
  // mainApp.database().ref('Favorite/').push({
  //   CustomerID: ["Dominos"],
  //   UserID: "Facebook"
  //   });
  // mainApp.database().ref('PromotionSaved/').push({
  //   UserID: "Facebook"
  //   });

	///////////////////////////////////////////////CALL CUSTOMER////////////////////////////////////////////////////////////////
			var countC2 = 0;
		 secondaryApp.database().ref('Customer').once('value', function(snapshot) {
			console.log("entro----------------------------customer---------------------------------------------------");

					for (x in snapshot.val()) {
						CustomerList[countC2] = snapshot.val()[x]
						CustomerList[countC2]["suma"] =snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"]
						CustomerList[countC2]["oferta"] = 'existe';
						CustomerList[countC2]["colorHeart"] = 'white';
						CustomerList[countC2]["lastText"] = 'favorite';
						countC2++
					}
					countC2 = 0

		///	console.log(CustomerF);
		}).then(function () {
    //   console.log("funcionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //   console.log(CustomerList);
    //   ///////////////////////////Favorite heart////////////////////////////////////
     //
    //   mainApp.database().ref('Favorite').on('value', function(snapshot) {
    //     console.log("entro----------------------------Favorite reload-----------------------------------");
    //     var CountFF = 0;
    //     for (x in snapshot.val()) {
    //       if (snapshot.val()[x].UserID == "896608317075508") {
    //         for (i in snapshot.val()[x].CustomerID) {
    //           for (c in CustomerList) {
     //
    //             if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
    //               console.log("--------------------------------------");
    //               console.log(snapshot.val()[x].CustomerID[i]);
    //               console.log("--------------------------------------");
    //               CustomerList[c].colorHeart = "red"
    //             }
    //           }
    //         }
    //         console.log("usario encontrado");
    //         FirebaseFavorite[CountFF] = snapshot.val()[x]
    //         FirebaseFavorite[CountFF]["FavoriteID"] = x
    //         console.log(FirebaseFavorite);
    //         CountFF++
    //       }
     //
    //     }
    //  });
      //////////////////////////////////////////////////////////////////////////
    }).then(function() {
      console.log("3ro-------------------------------------------------------------");

      	/////////////////////////////////////////////CALL PROMOTION//////////////////////////////////////////////////////////////////
      			var countP = 0;
      		 mainApp.database().ref('Promotion').on('value', function(snapshot) {
      			 //console.log("entro---------------------------------------promooooo----------------------------------------");
      			 //	console.log(snapshot.val());
      			 var GuatemalaDay= moment.tz("America/Guatemala").format('DD/MM/YYYY');
      			 var GuatemalaMonth =moment.tz("America/Guatemala").format('MM');
      			 var GuatemalaYear =moment.tz("America/Guatemala").format('YYYY');

      			 console.log(GuatemalaDay);
      			  //console.log(GuatemalaMonth);
      				 //console.log(GuatemalaYear);
      					for (x in snapshot.val()) {
      					// var moment =  moment(snapshot.val()[x]["EndDate"].iso).format('DD/MM/YYYY');
      					// console.log(moment);
      					//console.log(snapshot.val()[x]["EndDate"].iso);
      					var DatePromoDay = moment(snapshot.val()[x]["EndDate"].iso).format('DD/MM/YYYY')
      					var DatePromoMonth = moment(snapshot.val()[x]["EndDate"].iso).format('MM')
      					var DatePromoYear = moment(snapshot.val()[x]["EndDate"].iso).format('YYYY')
      					var fre = moment(snapshot.val()[x]["EndDate"].iso).format('DD/MM/YYYY')

      					////////////////////////////////////////////////////////////////////////////////////////////
      					if (DatePromoYear >= GuatemalaYear) {
      					//	console.log("las promociones son de este anio");
      						if (DatePromoMonth  >=  GuatemalaMonth) {
      								//console.log("las promociones son despues del 6 o son del 6");
      								if (DatePromoDay > GuatemalaDay) {
      									//console.log("promociones disponibles");
      									//console.log(fre);
      									for (i in snapshot.val()[x].Customer) {
      										if (snapshot.val()[x].Photo === null || snapshot.val()[x].Photo === undefined) {
      											if (snapshot.val()[x].TypePromotion === 'DirectDiscount') {
      													var ahorroString = snapshot.val()[x].BasePrice - snapshot.val()[x].PromotionalPrice;
      													var basePriceString = snapshot.val()[x].BasePrice;
      													var PromotionalPriceString = snapshot.val()[x].PromotionalPrice;
      													ahorroString = ahorroString.toString();
      													basePriceString = basePriceString.toString();
      													PromotionalPriceString = PromotionalPriceString.toString();
      													CurrentPromotion[countP] = snapshot.val()[x];
      													CurrentPromotion[countP]["nul"] = "sin";
      													CurrentPromotion[countP]["basePrice"] = 'Q'+basePriceString;
      													CurrentPromotion[countP]["promotionalPrice"] = 'Q'+PromotionalPriceString;
      													CurrentPromotion[countP]["texDiscount"] = "Ahorra";
      													CurrentPromotion[countP]["ahorro"] = 'Q'+ahorroString;
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



      											}else if (snapshot.val()[x].TypePromotion === 'Percentage') {
      												CurrentPromotion[countP] = snapshot.val()[x];
      												CurrentPromotion[countP]["nul"] = "sin";
      												CurrentPromotion[countP]["promotionalPrice"] = 'Descuento '+snapshot.val()[x].Percentage+'%';
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

      											}else if (snapshot.val()[x].TypePromotion === 'SpecialPromotion') {
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
      										}else {
      											if (snapshot.val()[x].TypePromotion === 'DirectDiscount') {
      													var ahorroString = snapshot.val()[x].BasePrice - snapshot.val()[x].PromotionalPrice;
      													var basePriceString = snapshot.val()[x].BasePrice;
      													var PromotionalPriceString = snapshot.val()[x].PromotionalPrice;
      													ahorroString = ahorroString.toString();
      													basePriceString = basePriceString.toString();
      													PromotionalPriceString = PromotionalPriceString.toString();
      													CurrentPromotion[countP] = snapshot.val()[x];
      													CurrentPromotion[countP]["nul"] = "con";
      													CurrentPromotion[countP]["basePrice"] = 'Q'+basePriceString;
      													CurrentPromotion[countP]["promotionalPrice"] = 'Q'+PromotionalPriceString;
      													CurrentPromotion[countP]["texDiscount"] = "Ahorra";
      													CurrentPromotion[countP]["ahorro"] = 'Q'+ahorroString;
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


      											}else if (snapshot.val()[x].TypePromotion === 'Percentage') {
      												CurrentPromotion[countP] = snapshot.val()[x];
      												CurrentPromotion[countP]["nul"] = "con";
      												CurrentPromotion[countP]["promotionalPrice"] = 'Descuento '+snapshot.val()[x].Percentage+'%';
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

      											}else if (snapshot.val()[x].TypePromotion === 'SpecialPromotion') {
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
      								}
      						}else {
      						//	console.log("antes del 6");
      						}
      					}else {
      						//console.log("no lo son");
      					}
      					/////////////////////////////////////////////////////////////////////////////////////////////////
      					// var DayPromo =  GuatemalaDay - DatePromoDay;
      					// var MonthPromo = GuatemalaMonth - DatePromoMonth;
      					// var YearPromo = GuatemalaYear - DatePromoYear;
      					// console.log("----------verificando------------");
      					// console.log(DayPromo);
      					// console.log(MonthPromo);
      					// console.log(YearPromo);
      					console.log("---------------------------------");
      					//console.log(prueba);
      				//console.log("************************************");;




      						// CustomerList[countC2]["oferta"] = 'existe';
      						// CustomerList[countC2]["colorHeart"] = 'white';
      						// CustomerList[countC2]["lastText"] = 'favorite';

      					}
      					countP = 0
      		console.log("*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*");
      		console.log(CurrentPromotion);
      		});
      	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      	///////////////////////////////////////////////CALL CUSTOMER////////////////////////////////////////////////////////////////
      			var countCp = 0;
      			// ********* CUPONS *********
      			//xvar Cupons = [];
      		 mainApp.database().ref('Coupon').on('value', function(snapshot) {
      			 console.log("entro----------------------------Cupones----------------------------------------------");
      			 	console.log(snapshot.val());
      					for (x in snapshot.val()) {
      						for (i in snapshot.val()[x].Customer) {
      							if (snapshot.val()[x].PhotoCoupon === null || snapshot.val()[x].PhotoCoupon === undefined) {
      								console.log('sin imagen');
      									CurrentPromotion[countP] = snapshot.val()[x];
      									Cupons[countCp]["nul"] = 'sin';
      									Cupons[countCp]["name"] = snapshot.val()[x].Name;
      									Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
      									Cupons[countCp]["Canjea"] = snapshot.val()[x].CouponDiscount;
      									Cupons[countCp]["Category"] = snapshot.val()[x].Customer[i];
      									Cupons[countCp]["cupon"] = "existe";
      									Cupons[countCp]["ColorPinCupon"] = "silver";
      									Cupons[countCp]["BarCodePhoto"] = snapshot.val()[x].BarCodePhoto;
      									Cupons[countCp]["Presentation"] = snapshot.val()[x].Presentation;
      									Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
      									Cupons[countCp]["customer"] = snapshot.val()[x].Customer[i];
      									Cupons[countCp]["PhotoCupon"] = snapshot.val()[x].PhotoCoupon;
      									Cupons[countCp]["Publication_Date"] = snapshot.val()[x].PublicationDate.iso;
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
      							}else {
      								console.log('con imagen');
      								Cupons[countCp] = snapshot.val()[x];
      								Cupons[countCp]["nul"] = "con";
      								Cupons[countCp]["name"] = snapshot.val()[x].Name;

      								Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
      								Cupons[countCp]["Canjea"] = snapshot.val()[x].CouponDiscount;
      								Cupons[countCp]["Category"] = snapshot.val()[x].Customer[i];
      								Cupons[countCp]["cupon"] = "existe";
      								Cupons[countCp]["ColorPinCupon"] = "silver";
      								Cupons[countCp]["BarCodePhoto"] = snapshot.val()[x].BarCodePhoto;
      								Cupons[countCp]["Presentation"] = snapshot.val()[x].Presentation;
      								Cupons[countCp]["description"] = snapshot.val()[x].PromotionDescription;
      								Cupons[countCp]["customer"] = snapshot.val()[x].Customer[i];
      								Cupons[countCp]["PhotoCupon"] = snapshot.val()[x].PhotoCoupon;
      								Cupons[countCp]["Publication_Date"] = moment(snapshot.val()[x].PublicationDate.iso).format('DD/MM/YYYY');
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
      					countCp = 0
      console.log("************************************");
      			console.log(Cupons);
      console.log("************************************");
      		});
      	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }).then(function() {
    //   ///////////////////////////SAVED PIN////////////////////////////////////
     //
    //   mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
    //     console.log("entro----------------------------PromotionSaved reload-----------------------------------");
    //     console.log(CurrentPromotion);
    //     var CountPS = 0;
    //     for (x in snapshot.val()) {
    //       if (snapshot.val()[x].UserID == "896608317075508") {
     //
    //         for (i in snapshot.val()[x].PromotionID) {
    //           for (c in CurrentPromotion) {
    //             // console.log("/////////////////////////////////////////////////");
    //             // console.log(snapshot.val()[x].PromotionID[i]);
    //             // console.log(CurrentPromotion[c].Name);
    //             // console.log("/////////////////////////////////////////////////");
    //             if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
    //               console.log(snapshot.val()[x].PromotionID[i]);
    //               console.log(CurrentPromotion[c].IDpromotion);
    //               console.log("---------------*****************************-----------------------");
    //               console.log(snapshot.val()[x].PromotionID[i]);
    //               console.log("--------------------*********************------------------");
    //               console.log("purple");
    //               CurrentPromotion[c].ColorPin = "purple"
    //             }else {
    //               console.log("no encontro nada ");
    //             }
    //           }
    //         }
    //         console.log("usario encontrado");
    //         FirebasePromotionSaved[CountPS] = snapshot.val()[x]
    //         FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
    //         console.log(FirebasePromotionSaved);
    //         CountPS++
    //       }
     //
    //     }
    //  });
    //   //////////////////////////////////////////////////////////////////////////



    });
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*****  CONTROLLERS  *****/
angular.module('starter.controllers', ['ionic'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {
	// Form data for the login modal
	$scope.loginData = {};
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};
	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		// Simulate a login delay. Removee this and replace with your login code if					 using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
})
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
  $scope.genderMaleStyle= function(){
    $scope.genderMaleBStyle = {'background-color':'#263147 ','color':'white'};
    $scope.genderFemaleleBStyle = {'color':'#263147  '};
    $scope.optionGender = 'male';
  }
  $scope.genderFemaleleStyle= function(){
    $scope.genderFemaleleBStyle = {'background-color':'#263147 ','color':'white'};
    $scope.genderMaleBStyle = {'color':'#263147  '};
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
        },2000);
      });
    })
  }
  // This Function works for to Validate fields of the form
  $scope.Alert = function () {
    if ($scope.user.email == undefined ) {
      sweetAlert('Lo sentimos', 'El campo de correo electrónico no puede estar vacío. Intentelo nuevamente', 'error');
    }else if($scope.user.password == undefined) {
      sweetAlert('Lo sentimos', 'Debe ingresar una contraseña para poder continuar. Intentelo nuevamente', 'error');
    }else {
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
      if(ErrorCodeFirebase == 'auth/email-already-in-use'){
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
          },2000)
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
            "$birthday":dateBirthday,
            "$name": name,
            "$typeLogin": "Email"

          });
        if(snapshot.val() == null) {
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
          for(x in snapshot.val()){
            if(x != user.uid) {
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
                IdGender =snapshot.val()[x].Gender
              }
            }
          });
        } else {
          sweetAlert('Oops', 'Por favor verifica tu correo electrónico e intenta nuevamente.', 'warning');
        }
      })
    }
    // This Function works for to do Login with Parse and to migrate the data to Firebase
    $scope.loginWithParse = function(user) {

      // New Users Variables
      $scope.newUserFirebase = '';
      $scope.newPasswordFirebase = user.password;
      $scope.newEmailFirebase = '';
      $scope.newGenderFirebase = '';
      $scope.newBirthdayFirebase = '';

      $scope.parseCurrentUser = Parse.User.current();

      // Login ParseJS
      Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
        success: function(userSuccess) {

            // $rootScope.userSuccess = userSuccess;
            // $rootScope.isLoggedIn = true;
            // IdUsuario = String($rootScope.userSuccess.id);

            // Connect to User entity Parse
            var query = new Parse.Query(Parse.User);
            query.equalTo("username", user.username);
            // Retrieve Data User Parse
            query.each(function(userParse) {
              // Validate if the user in ParseJS have a name
              if(userParse.attributes.name == undefined){
                $scope.newUserFirebase = userParse.attributes.username;
              } else {
                $scope.newUserFirebase = userParse.attributes.name;
              }
              // Save Data User into Variable
              $scope.newEmailFirebase = userParse.attributes.username;
              $scope.newGenderFirebase = userParse.attributes.gender;
              $scope.newBirthdayFirebase = userParse.attributes.birthday;
            }).then(function() {
              // Save Users in Firebase Auth
              mainApp.auth().createUserWithEmailAndPassword($scope.newEmailFirebase, $scope.newPasswordFirebase).then(function() {
                // Call to Users Entity Firebase Data
                mainApp.database().ref('Users').once('value', function(snapshot) {
                  // If doesn't exist anything data then to save the new data
                  if(snapshot.val() == null) {
                    mainApp.database().ref('Users/' + mainApp.auth().currentUser.uid).update({
                      Username: $scope.newUserFirebase,
                      Email: $scope.newEmailFirebase,
                      Gender: $scope.newGenderFirebase,
                      Birthday: $scope.newBirthdayFirebase,
                      Parse: true
                    })
                  } else {
                    mainApp.database().ref('Users/' + mainApp.auth().currentUser.uid).update({
                      Username: $scope.newUserFirebase,
                      Email: $scope.newEmailFirebase,
                      Gender: $scope.newGenderFirebase,
                      Birthday: $scope.newBirthdayFirebase,
                      Parse: true
                    })
                  }
                })
              }).then(function() {
                // Login With Firebase
                mainApp.auth().signInWithEmailAndPassword(user.username,user.password).then(function() {
                  $scope.parseCurrentUser = Parse.User.current();
                  // Delete User of ParseJS
                  var query = new Parse.Query(Parse.User);
                  query.get($scope.parseCurrentUser.id, {
                    success: function(deleteUser) {
                      deleteUser.destroy({});
                    },
                    error: function(object, error) {}
                  });
                })
              }).then(function() {
                $state.go('loadingLoginUser');
              })
            })
        },
        error: function(user, err) {
          // $ionicLoading.hide();
          // The login failed. Check error to see why.
          if (err.code === 101) {
            Parse.User.logOut();
            mainApp.auth().signOut();
            sweetAlert('Datos Inválidos', 'Por favor verifica tu correo y tu contraseña', 'error');
          }
        }
      })
    }

    $scope.loginWithEmail = function(user) {

      if(typeof user==='undefined'){
        sweetAlert('Datos Inválidos', 'Debes ingresar correo y contraseña', 'error');
      } else if(user['username']===undefined || user['username']==='') {
        sweetAlert('Datos Inválidos', 'Por favor Verifica los campos requeridos', 'error');
        delete user;
      } else if(user['password']===undefined || user['password']==='') {
        sweetAlert('Datos Inválidos', 'Por favor Verifica los campos requeridos', 'error');
        delete user
      } else {
        // If the User is Logged
        if (mainApp.auth().currentUser) {
          mainApp.auth().signOut(); //Loggout Sesion Firebase
        }
        var currentUser = Parse.User.current();
        if (currentUser) {
          Parse.User.logOut();
        }

        // Login With Firebase
        mainApp.auth().signInWithEmailAndPassword(user.username,user.password).catch(function(error) {
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
          if(mainApp.auth().currentUser==null){
            $scope.loginWithParse(user);
          } else {
            mainApp.database().ref('Users').once('value', function(snapshot) {
              if(snapshot.val()[mainApp.auth().currentUser.uid]['Parse'] == true){
                $state.go('loadingLoginUser');
              } else if(snapshot.val()[mainApp.auth().currentUser.uid]['Parse'] == undefined){
                $scope.VerifyEmail()
              }
            })
          }
        })
      }
    }
})
// ********************* PAGE_START CONTROLLER ****************************
.controller('CategoryCtrl', function($scope, $ionicLoading) {
	var dimensions = {
		name: 'categoriesMenu'
	};
	var NameUser = String(IdUsuario);
	var countApp = 0;
	Parse.Analytics.track("view", dimensions);
	mixpanel.track("view", { "type" : "Categorys","Gender":IdGender,"User":NameUser});
	// Loading scope
	$scope.loading = $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
	});
	CategoryListName = [];
	var query = new Parse.Query('AppCategory');
  //
	// query.each(function(results) {
	// 		//	CategoryListName.push(results.attributes)
	// }).then(function() {
	// 	ReloadFavorite()
	// }).then(function() {
  //
  //
	// 	$('.pageStartBoxPurple').show();
	// 	$('.flechitas').show();
	// });
	/////////////////////////////////////////////////////////////////////////////
var UsuarioF = true;
var UsuarioP = true;
	mainApp.database().ref('AppCategory').once('value', function(snapshot) {

			 for (x in snapshot.val()) {
				 CategoryListName[countApp] = snapshot.val()[x]
				 countApp++
			 }
			// console.log("askjkdhakjshdkajsdh");
			 countApp = 0

 }).then(function() {
   ///////////////////////////Favorite heart////////////////////////////////////

   mainApp.database().ref('Favorite').on('value', function(snapshot) {
     console.log("entro----------------------------Favorite reload-----------------------------------");
     console.log(IdUsuario);
     var CountFF = 0;
     var countFavorite = 0;
     for (x in snapshot.val()) {
       if (snapshot.val()[x].UserID == IdUsuario) {
         UsuarioF = false
         for (i in snapshot.val()[x].CustomerID) {
           for (c in CustomerList) {

             if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
               console.log("--------------------------------------");
               console.log(snapshot.val()[x].CustomerID[i]);
               console.log("--------------------------------------");
               CustomerList[c].colorHeart = "red"
             //  AllFavoriteF[countFavorite] = CustomerList[c]
             //  countFavorite++
             }
           }
         }
         console.log("usario encontrado");
         FirebaseFavorite[CountFF] = snapshot.val()[x]
         FirebaseFavorite[CountFF]["FavoriteID"] = x
         console.log(FirebaseFavorite);
         CountFF++
       }

     }
     if (UsuarioF == true) {
       mainApp.database().ref('Favorite/').push({
         UserID: IdUsuario
         });
     }

  });
   //////////////////////////////////////////////////////////////////////////
   ///////////////////////////SAVED PIN////////////////////////////////////

   mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
     console.log("entro----------------------------PromotionSaved reload-----------------------------------");
     console.log(CurrentPromotion);
     var CountPS = 0;
     var countPromo = 0;
     for (x in snapshot.val()) {
       if (snapshot.val()[x].UserID == IdUsuario) {
         UsuarioP = false;
         for (i in snapshot.val()[x].PromotionID) {
           for (c in CurrentPromotion) {
             // console.log("/////////////////////////////////////////////////");
             // console.log(snapshot.val()[x].PromotionID[i]);
             // console.log(CurrentPromotion[c].Name);
             // console.log("/////////////////////////////////////////////////");
             if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
               console.log(snapshot.val()[x].PromotionID[i]);
               console.log(CurrentPromotion[c].IDpromotion);
               console.log("---------------*****************************-----------------------");
               console.log(snapshot.val()[x].PromotionID[i]);
               console.log("--------------------*********************------------------");
               console.log("purple");
               AllPromotionF[countPromo] = CurrentPromotion[c]
               countPromo++
               CurrentPromotion[c].ColorPin = "purple"

             }else {
               console.log("no encontro nada ");
             }
           }
         }
         console.log("usario encontrado");
         console.log(AllPromotionF);
         FirebasePromotionSaved[CountPS] = snapshot.val()[x]
         FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
         console.log(FirebasePromotionSaved);
         CountPS++
       }

     }

     if (UsuarioP == true) {
       mainApp.database().ref('PromotionSaved/').push({
         UserID: IdUsuario
         });
     }
  });
   //////////////////////////////////////////////////////////////////////////



 }).then(function () {
   // mainApp.database().ref('Favorite/').push({
   //   CustomerID: ["Dominos"],
   //   UserID: "Facebook"
   //   });
   // mainApp.database().ref('PromotionSaved/').push({
   //   UserID: "Facebook"
   //   });
   console.log(FirebaseFavorite.length);
   console.log(FirebasePromotionSaved.length);

   $ionicLoading.hide();
 });
 ////////////////////////////////////////////////////////////////////////////////////
	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER $ionicView.loaded	 *****
  $scope.$on('$ionicView.enter', function() {

			$scope.categorys = CategoryListName

      colorIconsFoother = []
     colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC','','img/icn-35.png','','none','none']);
  });
})
// ******************* YOUR FAVORITE CONTROLLER ***************************
.controller('AllFavoriteCtrl', function($scope, $stateParams, AllFavorite) {
	/*************************************************/
	var NameUser = String(IdUsuario);
		mixpanel.track("view", { "type" : "YourFavorites","Gender":IdGender,"User":NameUser});
		$scope.reload = function () {
		    var PromoSavess = new Parse.Query('PromotionSaved')
		    PromoSavess.equalTo("UserID", IdUsuario);
		    PromoSavess.find({
				success: function(results) {
					viewFavorite()
					for (a in results[0].attributes.PromotionID){
						for (b in CurrentPromotion){
							if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
								if (CurrentPromotion[b].ColorPin === "silver") {
									CurrentPromotion[b].ColorPin  = "purple";
								}
							}else {
								CurrentPromotion[b].ColorPin  = "silver";
							}
						}
					}
				},
				error: function(myObject, error) {
					// Error occureds
					console.log( error );
				}
			});
		}

	$scope.SalvadosSaveAndDelete = function (id) {
        var NamePromo = id
        var NameUser = String(IdUsuario)
        var Dimensions = {
          name: 'FavoritePin_'+NamePromo,
          user: NameUser
        };
        var ValSend = true
        for (x in FirebasePromotionSaved[0].PromotionID) {
          console.log(FirebasePromotionSaved[0].PromotionID[x]);
          if (FirebasePromotionSaved[0].PromotionID[x] == id) {
            console.log("//////////*//*/*/*/*/*/**//*/*/*/*/*/**//*/*/*/*/*/*/*/*/*/*/*/*/*");

            ValSend = false
            console.log("son iguales-------------------------------------");
          }
        }

//        Parse.Analytics.track("pin", Dimensions);
        var pin = document.getElementById(id).style.color;
        if (pin == "silver") {
					mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
            document.getElementById(id).style.color = "purple";
            if (ValSend == true) {
            //  alert("se puede mandar")
              var newPostKey = firebase.database().ref().child('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').push().key;
              var Cus = {}
              Cus[newPostKey] = id
              firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').update(Cus);
            }
            //SavePromotion(IdUsuario, id)
          //  $scope.reload()
        } else {
					mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
            document.getElementById(id).style.color = "silver";
            for (i in FirebasePromotionSaved[0].PromotionID) {

              if (FirebasePromotionSaved[0].PromotionID[i] == id) {
                firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID/'+i).remove();
                console.log(FirebasePromotionSaved[0].PromotionID[i]);
                console.log(i);
                console.log("-------------asdasd--------aqui-------");
              }
            }

            for (a in CurrentPromotion) {
                if (CurrentPromotion[a].IDpromotion == id) {
                  CurrentPromotion[a].ColorPin = "silver"
                }
            }
          //  DeletePromotion(IdUsuario, id)
          //  $scope.reload()

        }
      //  $scope.reload()
    }
	/**************************************************/
	var dimensions = {
		name: 'userFavorites',
	};
	Parse.Analytics.track("view", dimensions);

	$scope.$on('$ionicView.enter', function() {
		$scope.chats = AllFavorite.all();
	});
	$scope.getAllFavorites = function() {};
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
       colorIconsFoother.push(['#A7A9AC','#FF5252','#A7A9AC','#A7A9AC','','img/icn-35.png','','none']);
    });
})
// *************************** SAVED CONTROLLER ***************************
.controller('AllPromotionCtrl', function($scope, $stateParams, AllPromotion) {
	var NameUser = String(IdUsuario);
	mixpanel.track("view", { "type" : "PinSaved","Gender":IdGender,"User":NameUser});
	var NameUser = String(IdUsuario)
	var dimensions = {
		name: 'Salvados',
		user: NameUser
	};
	Parse.Analytics.track("view", dimensions);

	$scope.reload = function () {

	}


	// ************ DELETE AND SAVE PIN ************
	$scope.SalvadosSaveAndDelete = function (id) {
		var NamePromo = id
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'FavoritePin_'+NamePromo,
		  user: NameUser
		};
    var ValSend = true
    for (x in FirebasePromotionSaved[0].PromotionID) {
      console.log(FirebasePromotionSaved[0].PromotionID[x]);
      if (FirebasePromotionSaved[0].PromotionID[x] == id) {
        console.log("//////////*//*/*/*/*/*/**//*/*/*/*/*/**//*/*/*/*/*/*/*/*/*/*/*/*/*");

        ValSend = false
        console.log("son iguales-------------------------------------");
      }
    }

		//Parse.Analytics.track("pin", Dimensions);
		var pin = document.getElementById(id).style.color;
		if (pin == "silver") {
			mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
			document.getElementById(id).style.color = "purple";
      if (ValSend == true) {
      //  alert("se puede mandar")
        var newPostKey = firebase.database().ref().child('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').push().key;
        var Cus = {}
        Cus[newPostKey] = id
        firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').update(Cus);
      }
			//SavePromotion(IdUsuario, id)
			// $scope.reload()
		} else {
			mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
			document.getElementById(id).style.color = "silver";
      for (i in FirebasePromotionSaved[0].PromotionID) {

        if (FirebasePromotionSaved[0].PromotionID[i] == id) {
          firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID/'+i).remove();
          console.log(FirebasePromotionSaved[0].PromotionID[i]);
          console.log(i);
          console.log("-------------asdasd--------aqui-------");
        }
      }

      for (a in CurrentPromotion) {
          if (CurrentPromotion[a].IDpromotion == id) {
            CurrentPromotion[a].ColorPin = "silver"
          }
      }
			//DeletePromotion(IdUsuario, id)
		//	$scope.reload()
		}
	//	$scope.reload()
	}

	$scope.$on('$ionicView.enter', function() {
		$scope.chats = AllPromotion.all($stateParams.salvadosId);
	});
		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
        colorIconsFoother = []
      colorIconsFoother.push(['#A7A9AC','#A7A9AC','#9C28B0','#A7A9AC','','img/icn-35.png','','none']);
    });
})
//********************** Customer CONTROLLER *****************************
.controller('changeColorHeartCtrl', function($scope, $ionicLoading,$stateParams,CustomerAll) {
	$scope.UrlC = function (id) {
    console.clear();
		console.log(id);
		var resultSetCs = $.grep(CustomerList, function (e) {
			 return e.Name.indexOf(id) == 0;
		});

		var promotionPage = "#/app/ofertas/"
		var couponPage="#/app/cupones/";
    console.log(resultSetCs[0]);
		// Validate if doesn't existing a promotion then redirection to coupons page. 	location.href=couponPage
		if (resultSetCs[0].QuantityPromotion > 0  &&  resultSetCs[0].QuantityCoupon > 0) {
      console.log('las dos tienen');
				location.href=promotionPage+id
		}else if (resultSetCs[0].QuantityPromotion > 0) {
      console.log('solo hay promos');
				location.href=promotionPage+id
		}else if( resultSetCs[0].QuantityCoupon > 0){
      console.log('solo hay cupoones');
			location.href=couponPage+id
		}else {
				location.href=promotionPage+id
		}
	}
	/************ FUNCTION CHANGE COLOR HEART  **********/
	$scope.ChangeColorHeart = function (parametro, category) {
    //alert("firebase")

    console.log("************************************************************");
console.log(FirebaseFavorite);
    var ValSend = true
    for (x in FirebaseFavorite[0].CustomerID) {
      console.log(FirebaseFavorite[0].CustomerID[x]);
      if (FirebaseFavorite[0].CustomerID[x] == category) {
        console.log("//////////*//*/*/*/*/*/**//*/*/*/*/*/**//*/*/*/*/*/*/*/*/*/*/*/*/*");

        ValSend = false
        console.log("son iguales-------------------------------------");
      }
    }


		console.log(category);
		var NamePromo = category
		var NameUser = String(IdUsuario)
		var Dimensions = {
			name: 'Heart_'+NamePromo,
			user: NameUser
		};

		var cssColor = document.getElementById(parametro+" "+category).style.color;
		if (cssColor == "white") {
			mixpanel.track("ClickHeart", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
			document.getElementById(parametro+" "+category).style.color = "red";
      if (ValSend == true) {
      //  alert("se puede mandar")
        var newPostKey = firebase.database().ref().child('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID').push().key;
        var Cus = {}
        Cus[newPostKey] = category
        firebase.database().ref('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID').update(Cus);
        }

		//	SaveFavorite(IdUsuario, category)
			//	Parse.Analytics.track("AddHeart", Dimensions);
		} else {
				mixpanel.track("ClickHeart", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
			document.getElementById(parametro+" "+category).style.color = "white";
        console.log("-*-*-*-*-asdas*d-as*d-as*d-a*s-*as-d*a-sd*a-s*d");
      for (i in FirebaseFavorite[0].CustomerID) {

        if (FirebaseFavorite[0].CustomerID[i] == category) {
          firebase.database().ref('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID/'+i).remove();
          //console.log(FirebaseFavorite[0].CustomerID[i]);
          console.log(i);
          console.log("-------------asdasd--------aqui-------");
        }
      }
      for (a in CustomerList) {
          if (CustomerList[a].Name == category) {
            CustomerList[a].colorHeart = "white"
          }
      }

			//	Parse.Analytics.track("DelHeart", Dimensions);
		//remove	DeleteFavorite(IdUsuario, category)
		}
	};

})
.controller('CustomerCtrl', function($scope, $ionicLoading,$stateParams,CustomerAll) {
	var Direc = [{name:"Supermercado",name2:"supermarketMenu"},{name:"Restaurantes",name2:"restaurantMenu"},{name:"Otros",name2:"otherMenu"},{name:"Electronicos",name2:"entertainmentMenu"},{name:"Moda",name2:"fashionMenu"},{name:"Entretenimiento",name2:"entertainmentMenu"}]
	var DirecParse = $.grep(Direc, function (e) {
		 return e.name.indexOf($stateParams.IDcustomer) == 0;
	});
	var NameUser = String(IdUsuario)
//	console.log(DirecParse[0].name2);

	var dimensions = {
		name: DirecParse[0].name2
	};
mixpanel.track("view", { "type" : "Customers","Gender":IdGender,"User":NameUser});
mixpanel.track("ClickCategory", { "NameCategory" :  DirecParse[0].name2,"Gender":IdGender,"User":NameUser});
		Parse.Analytics.track("view", dimensions);
	// Loading scope
	$scope.AppCategory = $stateParams.IDcustomer
	$scope.loading = $ionicLoading.show({
      noBackdrop: true,
      template: '<ion-spinner customer1lass="spinner" icon="lines" class = "Loading'+$scope.AppCategory+'"></ion-spinner>'
  });

	/************ FUNCTION CHANGE COLOR HEART  **********/
	$scope.changeColorHeart = function (parametro, category) {



		var cssColor = document.getElementById(parametro+" "+category).style.color;
		if (cssColor == "white") {
			document.getElementById(parametro+" "+category).style.color = "red";
			SaveFavorite(IdUsuario, category)
		} else {
			document.getElementById(parametro+" "+category).style.color = "white";
			console.log(category);
			DeleteFavorite(IdUsuario, category)
		}
	};

	// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
  $scope.$on('$ionicView.enter', function() {
  		setTimeout(function() {
		$scope.$apply(function() {
			$scope.chats = CustomerAll.all($stateParams.IDcustomer);
			console.log(JSON.stringify($scope.chats))
			$ionicLoading.hide();
		});
	}, 1000);
      colorIconsFoother = []
    colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.AppCategory,'','none',]);
  });
})
.controller('PromotionsDescription',function($scope, $stateParams, DescriptionOfferts ,$ionicPopover, $ionicPopup, $timeout, $ionicLoading) {
	mixpanel.track("view", { "type" : "PromotionsDescription","Gender":IdGender,"User":IdUsuario});
	$scope.chats = DescriptionOfferts.all($stateParams.superId);
	console.log($scope.chats[0].Category);
//	$scope.heartMenu = resultSetPopover[0].colorHeart;
	$scope.custumerName = $scope.chats[0].Category.replace(/-/g," ");
			$scope.$on('$ionicView.enter', function() {
				console.log();
				colorIconsFoother = []
				colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.custumerName,'','none']);
			});
})
// *************************  OFFERS CONTROLLER	***************************
.controller('currentPromotionCtrl', function($scope, $stateParams, currentPromotion ,$ionicPopover, $ionicPopup, $timeout, $ionicLoading) {
	var dimensions = {
		name: $stateParams.superId,
	};
	var NameUser = String(IdUsuario);
	mixpanel.track("view", { "type" : "Promotions","Gender":IdGender,"User":NameUser,"Namepromotion": $stateParams.superId});
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'hello';
	});
	// Pixels quantity of Popover for height div
	$scope.pix = currentPromotion.get($stateParams.superId);
//	console.log($scope.pix);
	$scope.pixels = $scope.pix[1][0].pixels;


	$scope.reload = function () {
	    var PromoSavess = new Parse.Query('PromotionSaved')
	    PromoSavess.equalTo("UserID", IdUsuario);
	    PromoSavess.find({
			success: function(results) {
				viewFavorite()
				for (a in results[0].attributes.PromotionID){
					for (b in CurrentPromotion){
						if (results[0].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion){
							if (CurrentPromotion[b].ColorPin === "silver") {
								CurrentPromotion[b].ColorPin  = "purple";
							}
						}else {
							CurrentPromotion[b].ColorPin  = "silver";
						}
					}
				}
			},
			error: function(myObject, error) {
				// Error occureds
				console.log( error );
			}
		});
	}

	// ************ FUNCTION CHANGE COLOR PIN OFFERTS ************
	$scope.changeColorPinOfferts = function (id, IDPromotion,Namepromotion) {
		var NamePromo = Namepromotion
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'PromotionPin_'+NamePromo,
		  user: NameUser
		};

    console.log("************************************************************");
    console.log(FirebasePromotionSaved[0].PromotionSavedID);
    var ValSend = true
    for (x in FirebasePromotionSaved[0].PromotionID) {
      console.log(FirebasePromotionSaved[0].PromotionID[x]);
      if (FirebasePromotionSaved[0].PromotionID[x] == IDPromotion) {
        console.log("//////////*//*/*/*/*/*/**//*/*/*/*/*/**//*/*/*/*/*/*/*/*/*/*/*/*/*");

        ValSend = false
        console.log("son iguales-------------------------------------");
      }
    }

		//Parse.Analytics.track("pin", Dimensions);
		var cssColorpinOfferts = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOfferts == "silver") {
			mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
      if (ValSend == true) {
      //  alert("se puede mandar")
        var newPostKey = firebase.database().ref().child('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').push().key;
        var Cus = {}
        Cus[newPostKey] = IDPromotion
        firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID').update(Cus);
      }
		//	SavePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
	    //viewPromotion()
		} else {
      AllPromotionF = [];
			mixpanel.track("ClickPin", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
      for (i in FirebasePromotionSaved[0].PromotionID) {

        if (FirebasePromotionSaved[0].PromotionID[i] == IDPromotion) {
          firebase.database().ref('PromotionSaved/'+FirebasePromotionSaved[0].PromotionSavedID+'/PromotionID/'+i).remove();
          console.log(FirebasePromotionSaved[0].PromotionID[i]);
          console.log(i);
          console.log("-------------asdasd--------aqui-------");
        }
      }

      for (a in CurrentPromotion) {
        //console.log(IDPromotion);
          if (CurrentPromotion[a].IDpromotion == IDPromotion) {
            CurrentPromotion[a].ColorPin = "silver"
            console.log("--------------puto aquiiiiiiiiiiiiiiiiiiiiiiii---------------------------");
            console.log(CurrentPromotion[a].IDpromotion);
            console.log(CurrentPromotion[a].ColorPin);
          }

      }

      console.log(CurrentPromotion);

		//	DeletePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
	    //viewPromotion()
		}
	//$scope.reload()
	};
	// *********** FUNCTION CHANGE COLOR PIN OFFERTS WITHOUT IMAGE **********
	$scope.changeColorPinOffertsWithoutImage = function (id, IDPromotion) {
		var cssColorpinOffertsWithoutImage = document.getElementById(id+" "+IDPromotion).style.color;

		if (cssColorpinOffertsWithoutImage == "silver") {
			document.getElementById(id+" "+IDPromotion).style.color = "purple";
			SavePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
		} else {
			document.getElementById(id+" "+IDPromotion).style.color = "silver";
			DeletePromotion(IdUsuario, IDPromotion)
		//	$scope.reload()
		}
	};
	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell,name){
		var NameUser = String(IdUsuario);
		var Dimensions = {
			name: 'Promotion_call'+name,
			user: NameUser
		};
		mixpanel.track("ClickCall", {"Costumer" :name,"User":NameUser,"Gender":IdGender});
		Parse.Analytics.track("CallsPromotion", Dimensions);
		var a = cell.toString();
		var b = 'tel:'
		var callPhone = b + a;
    //This action works for to do call
	  document.location.href = callPhone

	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url,id,name){
		var NamePromo = name.split(" ").join("_")
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'Promotion_'+NamePromo+"_"+id,
		  user: NameUser
		};
		if (id == "web") {
			mixpanel.track("ClickWeb", { "Costumer" :name,"User":NameUser,"Gender":IdGender});
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("WebShopPromotion", Dimensions);
		}else {
				mixpanel.track("ClickCartShop", { "Costumer" :name,"User":NameUser,"Gender":IdGender});
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("cartShopPromotion", Dimensions);
		}

	}
	// *************** PROMOTIONS FUNCTION ***************
	$scope.Promotions =function (id){
		PromoSave.find({
			success: function(results) {
				for (x in results) {
					if (results[x].attributes.UserID === IdUsuario){
						for (a in results[x].attributes.PromotionID){
							for (b in CurrentPromotion){
								if (results[x].attributes.PromotionID[a] === CurrentPromotion[b].IDpromotion && id === CurrentPromotion[b].Category){
									var cssColorpinOffer = document.getElementById(CurrentPromotion[b].ID+" "+results[x].attributes.PromotionID[a]).style.color;
									if (cssColorpinOffer=="silver"){
										document.getElementById(CurrentPromotion[b].ID+" "+results[x].attributes.PromotionID[a]).style.color="purple";
									}
								}
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
	}


	$scope.$on('$ionicView.enter', function() {

		$scope.Promotions($stateParams.superId);
		// Redirection page variable to coupons
		var couponPage="#/app/cupones/";
		idRoute = currentPromotion.get($stateParams.superId);
		// IdPromotion with redirection page
		couponPage = couponPage+$stateParams.superId
		var NamePromo = $stateParams.superId
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'HeartPopover_'+NamePromo,
		  user: NameUser
		};
		$scope.changeColorHeartFollow = function(id) {
    //  alert("popover");
      var ValSend = true
      for (x in FirebaseFavorite[0].CustomerID) {
        console.log(FirebaseFavorite[0].CustomerID[x]);
        if (FirebaseFavorite[0].CustomerID[x] == id) {
          console.log("//////////*//*/*/*/*/*/**//*/*/*/*/*/**//*/*/*/*/*/*/*/*/*/*/*/*/*");

          ValSend = false
          console.log("son iguales-------------------------------------");
        }
      }




    //  alert("popover heart")
			if ($scope.heartMenu == "silver") {
				mixpanel.track("ClickHeart", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
			//	Parse.Analytics.track("AddHeartPopover", Dimensions);
      if (ValSend == true) {
        //  alert("se puede mandar")
          var newPostKey = firebase.database().ref().child('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID').push().key;
          var Cus = {}
          Cus[newPostKey] = id
          firebase.database().ref('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID').update(Cus);
        }
				$scope.heartMenu = "red";
//SaveFavorite(IdUsuario, id)
			} else {
				mixpanel.track("ClickHeart", { "NameCategory" : NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
				//Parse.Analytics.track("DelHeartPopover", Dimensions);
        console.log("-*-*-*-*-asdas*d-as*d-as*d-a*s-*as-d*a-sd*a-s*d");
        for (i in FirebaseFavorite[0].CustomerID) {

          if (FirebaseFavorite[0].CustomerID[i] == id) {
            firebase.database().ref('Favorite/'+FirebaseFavorite[0].FavoriteID+'/CustomerID/'+i).remove();
            //console.log(FirebaseFavorite[0].CustomerID[i]);
            console.log(i);
            console.log("-------------asdasd--------aqui-------");
          }
        }
				$scope.heartMenu = "silver";
        for (a in CustomerList) {
            if (CustomerList[a].Name == id) {
              CustomerList[a].colorHeart = "white"
            }
        }
			//	DeleteFavorite(IdUsuario, id)
			}
		}
		/* **************************************************** */
		$scope.askPromotion = function (IDPromotion) {
			var NamePromo = $stateParams.superId
			var NameUser = String(IdUsuario)
			var Dimensions = {
				name: 'peticionPromo_'+NamePromo,
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
				if(isConfirm){
					mixpanel.track("ClickRequestPromotion", { "NameCostumer" : NamePromo,"User":NameUser,"Gender":IdGender});
					Parse.Analytics.track("petition", Dimensions);
					SaveFavorite(IdUsuario, IDPromotion)
					$scope.loading = $ionicLoading.show({
						template: "<ion-spinner customer1lass='spinner' icon='lines' style='stroke: #00BAB9;fill: #00BAB9;'></ion-spinner><br><p style='font-size:18px'>Agregando a <spam style='font-size:24px;font-weight:bold;'>" + $stateParams.superId + "</spam> como una de tus tiendas favoritas, espera un momento... </p>"
					});

					$timeout(function () {
						$ionicLoading.hide();
					}, 2000);
				}
			});
		}
		/* **************************************************** */
		$scope.chats = currentPromotion.get($stateParams.superId);

		$scope.popover = currentPromotion.all($stateParams.superId);
		$scope.heartMenu = "silver";
		$scope.Cupcon = Cupcont.length
		$scope.heartPopover = function(id){
			var resultSetPopover = $.grep(CustomerList, function (e) {
				 return e.Name.indexOf(id) == 0;
			});
			console.log(resultSetPopover);
			if (resultSetPopover[0].colorHeart == "white") {
					$scope.heartMenu = "silver";
			}else {
				$scope.heartMenu = resultSetPopover[0].colorHeart;
			}

		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
	//***** SCOPE $ON TO REFRESH MENU CONTROLLER
	$scope.custumerName = $stateParams.superId.replace(/-/g," ");
	$scope.$on('$ionicView.enter', function() {
		console.log();
		colorIconsFoother = []
		colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.custumerName,'','none']);
	});
})
// ********************* CUPON CONTROLLER *********************************
.controller('CuponCtrl', function($scope, $stateParams ,Coupons, $ionicLoading) {
	var NameUser = String(IdUsuario);
	mixpanel.track("view", { "type" : "copuns","Gender":IdGender,"User":NameUser});
		// For to update QuantityExchanged
		var CuponClassExchanged = Parse.Object.extend("Cupon");
		var cuponClassExchanged = new CuponClassExchanged();
		var query = new Parse.Query("Cupon");

        query.equalTo('Status', true);

		$scope.pix = Coupons.all($stateParams.CuponID);
		$scope.pixels = $scope.pix[1][0].pixels;

	/*****  fill displayNoneInline list to call after
						in cupons_description for show barcode
						or hide it  ****/
	// *************** CALL PHONE FUNCTION ***************
	$scope.call= function(cell){
		a = cell.toString();
		b = 'tel:'
		window.open(b+a);
	}
	// *************** URL BROWSER SHOP FUNCTION ***************
	$scope.shopUrl = function(Url,id,name){
		var NamePromo = name.split(" ").join("_")
		var NameUser = String(IdUsuario)
		var Dimensions = {
		  name: 'Coupons_'+NamePromo+"_"+id,
		  user: NameUser
		};

		if (id == "web") {
			z = Url;
			mixpanel.track("ClickWeb", { "Costumer" :name,"User":NameUser,"Gender":IdGender});
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("WebShopCoupon", Dimensions);
		}else {
			mixpanel.track("ClickCartShop", { "Costumer" :name,"User":NameUser,"Gender":IdGender});
			z = Url;
			window.open=cordova.InAppBrowser.open(z, '_blank', 'location=yes');
			Parse.Analytics.track("cartShopCoupon", Dimensions);
		}

	}

    $scope.showCouponDescription = function(id){
      var QuantityExchangedSum =0;
        mainApp.database().ref('Coupon').once('value', function(snapshot) {

          for (x in snapshot.val()) {
            if (x == id) {

              if(snapshot.val()[x].TypeCoupon === 'Fecha'){
                // alert("vamo a calmarnos")
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
                          function(isConfirm){
                              if (isConfirm) {

                                  swal({
                                      title: 'Perfecto!',
                                      text: 'Has cambiado tu Cupón',
              												type: "success",
                                      timer: 2000,
                                      showConfirmButton: false,

                                  })

                                  var couponPages="#/app/descripcionCupones/";
                                  location.href=couponPages+id;

              										mixpanel.track("clickCanjear", { "type" : "fecha","Gender":IdGender,"User":NameUser,"NameCoupon":id});
                                  QuantityExchangedSuma = snapshot.val()[x].QuantityExchanged + 1
                                  mainApp.database().ref('Coupon/'+x).update({
                                        QuantityExchanged: QuantityExchangedSuma
                                  });
                                  //cuponClassExchanged.id = id; //////////////// //////////////// ////////////////
                                //  cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1); //////////////// //////////////// //////////////// ////////////////
                                //  cuponClassExchanged.save(); //////////////// //////////////// ////////////////
                                //console.clear();
                              } else {
                              swal("Cancelado", "Esperamos que luego puedas disfrutar de nuestros cupones", "error");

                              }
                          });

                      }else if(snapshot.val()[x].TypeCoupon === 'Cupon'){
                        alert("vamo a calmarno 2")
              					if (parseInt(snapshot.val()[x].QuantityExchanged) < parseInt(snapshot.val()[x].QuantityCoupons)) {
              											$scope.cupons[0][0].QuantityExchanged +=1;
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
              	                    function(isConfirm){
              	                        if (isConfirm) {
              	                            swal({
              	                                title: 'Perfecto!',
              	                                text: 'Has cambiado tu Cupón',
              	                                timer: 2000,
              	                                showConfirmButton: false,
              	                                type: "success"
              	                            });
              															mixpanel.track("clickCanjear", { "type" : "Cupon","Gender":IdGender,"User":NameUser,"NameCoupon":id});
              	                            // couponCash.then(function(){
              																	var element = document.getElementById("QuantityExchangedText");
              																	element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + snapshot.val()[x].QuantityCoupons;
              	                                var couponPages="#/app/descripcionCupones/";
              	                                // IdPromotion with redirection page
              	                                couponPages = couponPages+id;
              	                                location.href=couponPages;
              	                            // });
                                            QuantityExchangedSuma = snapshot.val()[x].QuantityExchanged + 1
                                            mainApp.database().ref('Coupon/'+x).update({
                                                  QuantityExchanged: QuantityExchangedSuma
                                            });
              	                           // cuponClassExchanged.id = id;  //////////////// //////////////// //////////////// ////////////////
              	                            //cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1); ///// /////////////////////////// //////////////// ////////////////
              	                            //cuponClassExchanged.save(); //////////////// //////////////// //////////////// ////////////////
                                    	} else {
              														$scope.cupons[0][0].QuantityExchanged -=1;
              														var element = document.getElementById("QuantityExchangedText");
              														element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + snapshot.val()[x].QuantityCoupons;
              	                      }
              	                    });
              										} else {
              												$scope.cupons[0].QuantityExchanged =  parseInt(snapshot.val()[x].QuantityCoupons);

                                      mainApp.database().ref('Cupon/'+x).update({
                                            Status: false
                                      });
              											//	cuponClassExchanged.id = id;  //////////////// //////////////// //////////////// ////////////////
              											//	cuponClassExchanged.set("Status", false); //////////////// //////////////// ////////////////
              											//	cuponClassExchanged.save(); //////////////// / /////////////////////////////// ////////////////

              												swal({
              													title: 'Lo sentimos!',
              													text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
              													type: 'warning'
              												},
              												function(isConfirm) {
              														if(isConfirm){
              															$scope.loading = $ionicLoading.show({
              																	showBackdrop: true,
              																	template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
              														});

              											// 			Parse.Cloud.run('CountCouponCustomer', {}, {
              											// 					success: function(resultCustomer) {
              											// 						console.log(resultCustomer);
              											// 							Parse.Cloud.run('CountCouponCategories', {}, {
              											// 									success:function(result) {
              											// 										CategoryListName = [];
              											// 										var query = new Parse.Query('AppCategory');
              											// 										query.each(function(results) {
              											// 												CategoryListName.push(results.attributes)
              											// 										}).then(function() {
              											// 												ReloadFavorite()
              											// 										}).then(function() {
              											// 												Parse.Cloud.run('GetCustomer', {},{
              											// 														success:function (results) {
              											// 															//	console.log(results);
              											// 															CustomerList = results
              											// 														},
              											// 														error:function (error) {
              											// 														 console.log(error);
              											// 														}
              											// 												}).then(function() {
              											// 													$ionicLoading.hide();
              											// 													var couponPages="#/app/playlists";
              											// 													location.href=couponPages;
              											// 												})
              											// 											});
                                    //
              											// 									},
              											// 									error: function(error) {
              											// 											/* Show error if call failed */
              											// 											console.log(error);
              											// 									}
              											// 							});
              											// 					},
              											// 					error: function(error) {
              											// 							/* Show error if call failed */
              											// 							console.log(error);
              											// 					}
              											// });

                                    $ionicLoading.hide();
                                  	var couponPages="#/app/playlists";
                                  	location.href=couponPages;
              											}
              										})
              									}
              								}
            }





          }
       });
        //
        // query.equalTo("objectId",id)
        // var couponCash =	query.find({
        //     success: function(results){
        //
        //         console.log('entro a la funcion');
        //         if(results[0].attributes.TypeCoupon === 'Fecha'){
        //
        //             swal({
        //                 title: "Estas Seguro?",
        //                 text: "Quieres canjear este cupon?",
        //                 type: "warning",
        //                 showCancelButton: true,
        //                 cancelButtonText: 'No',
        //                 confirmButtonColor: '#00BAB9',
        //                 confirmButtonText: "Canjear!",
        //                 closeOnConfirm: false
        //             },
        //             function(isConfirm){
        //                 if (isConfirm) {
        //                     swal({
        //                         title: 'Perfecto!',
        //                         text: 'Has cambiado tu Cupón',
				// 												type: "success",
        //                         timer: 2000,
        //                         showConfirmButton: false,
        //
        //                     });
				// 										mixpanel.track("clickCanjear", { "type" : "fecha","Gender":IdGender,"User":NameUser,"NameCoupon":id});
        //                     cuponClassExchanged.id = id; //////////////// //////////////// ////////////////
        //                     cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1); //////////////// //////////////// //////////////// ////////////////
        //                     cuponClassExchanged.save(); //////////////// //////////////// ////////////////
        //                     var couponPages="#/app/descripcionCupones/";
        //                     location.href=couponPages+id;
        //                 } else {
        //                 swal("Cancelado", "Esperamos que luego puedas disfrutar de nuestros cupones", "error");
        //                 }
        //             });
        //
        //         }else if(results[0].attributes.TypeCoupon === 'Cupon'){
				// 						if (parseInt(results[0].attributes.QuantityExchanged) < parseInt(results[0].attributes.QuantityCoupons)) {
				// 							$scope.cupons[0][0].QuantityExchanged +=1;
				// 							swal({
	      //                   title: "Estas Seguro?",
	      //                   text: "Quieres canjear este cupon?",
	      //                   type: "warning",
	      //                   showCancelButton: true,
	      //                   cancelButtonText: 'No',
	      //                   confirmButtonColor: '#00BAB9',
	      //                   confirmButtonText: "Canjear!",
	      //                   closeOnConfirm: false
	      //               },
	      //               function(isConfirm){
	      //                   if (isConfirm) {
	      //                       swal({
	      //                           title: 'Perfecto!',
	      //                           text: 'Has cambiado tu Cupón',
	      //                           timer: 2000,
	      //                           showConfirmButton: false,
	      //                           type: "success"
	      //                       });
				// 											mixpanel.track("clickCanjear", { "type" : "Cupon","Gender":IdGender,"User":NameUser,"NameCoupon":id});
	      //                       couponCash.then(function(){
				// 													var element = document.getElementById("QuantityExchangedText");
				// 													element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + results[0].attributes.QuantityCoupons;
	      //                           var couponPages="#/app/descripcionCupones/";
	      //                           // IdPromotion with redirection page
	      //                           couponPages = couponPages+id;
	      //                           location.href=couponPages;
	      //                       });
        //
	      //                       cuponClassExchanged.id = id;  //////////////// //////////////// //////////////// ////////////////
	      //                       cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1); ///// /////////////////////////// //////////////// ////////////////
	      //                       cuponClassExchanged.save(); //////////////// //////////////// //////////////// ////////////////
        //               	} else {
				// 										$scope.cupons[0][0].QuantityExchanged -=1;
				// 										var element = document.getElementById("QuantityExchangedText");
				// 										element.innerHTML = "Cupones Canjeados: " + $scope.cupons[0][0].QuantityExchanged + " de " + results[0].attributes.QuantityCoupons;
	      //                 }
	      //               });
				// 						} else {
				// 								$scope.cupons[0].QuantityExchanged =  parseInt(results[0].attributes.QuantityCoupons);
				// 								cuponClassExchanged.id = id;  //////////////// //////////////// //////////////// ////////////////
				// 								cuponClassExchanged.set("Status", false); //////////////// //////////////// ////////////////
				// 								cuponClassExchanged.save(); //////////////// / /////////////////////////////// ////////////////
        //
				// 								swal({
				// 									title: 'Lo sentimos!',
				// 									text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
				// 									type: 'warning'
				// 								},
				// 								function(isConfirm) {
				// 										if(isConfirm){
				// 											$scope.loading = $ionicLoading.show({
				// 													showBackdrop: true,
				// 													template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
				// 										});
        //
				// 										Parse.Cloud.run('CountCouponCustomer', {}, {
				// 												success: function(resultCustomer) {
				// 													console.log(resultCustomer);
				// 														Parse.Cloud.run('CountCouponCategories', {}, {
				// 																success:function(result) {
				// 																	CategoryListName = [];
				// 																	var query = new Parse.Query('AppCategory');
				// 																	query.each(function(results) {
				// 																			CategoryListName.push(results.attributes)
				// 																	}).then(function() {
				// 																			ReloadFavorite()
				// 																	}).then(function() {
				// 																			Parse.Cloud.run('GetCustomer', {},{
				// 																					success:function (results) {
				// 																						//	console.log(results);
				// 																						CustomerList = results
				// 																					},
				// 																					error:function (error) {
				// 																					 console.log(error);
				// 																					}
				// 																			}).then(function() {
				// 																				$ionicLoading.hide();
				// 																				var couponPages="#/app/playlists";
				// 																				location.href=couponPages;
				// 																			})
				// 																		});
        //
				// 																},
				// 																error: function(error) {
				// 																		/* Show error if call failed */
				// 																		console.log(error);
				// 																}
				// 														});
				// 												},
				// 												error: function(error) {
				// 														/* Show error if call failed */
				// 														console.log(error);
				// 												}
				// 							});
				// 							}
				// 						})
				// 					}
				// 				}
        //     	}
        // 	});
					displayNoneInline=[{none:"none",inline:"inline",position:"absolute",bottom:0}];
  		}


	$scope.llenar1=function(id){
		$scope.countCoupon(id);
        displayNoneInline=[{none:"none",inline:"inline"}];
      };

      $scope.llenar2=function(){
        displayNoneInline=[{none:"inline",inline:"none"}];
      };
	// ************ FUNCTION CHANGE COLOR PIN CUPON *************
	$scope.changeColorPinCupon = function (id,NameCoupon) {
		var NamePromo = NameCoupon
		var NameUser = String(IdUsuario)
		var Dimensions = {
			name: 'CouponPin_'+NamePromo,
			user: NameUser
		};
		Parse.Analytics.track("pin", Dimensions);
		var cssColorCuponPin = document.getElementById(id).style.color;
		if (cssColorCuponPin == "silver") {
			mixpanel.track("ClickPin", { "NameCategory" :NamePromo,"User":NameUser,"Action":"Add","Gender":IdGender});
			document.getElementById(id).style.color = "purple";
			saveCuponFavorite(IdUsuario, id)
		} else {
			mixpanel.track("ClickPin", { "NameCategory" :NamePromo,"User":NameUser,"Action":"Delete","Gender":IdGender});
			deleteFavoriteCupon(IdUsuario, id)
			document.getElementById(id).style.color = "silver";
		}
	};
	/*****  functions *****/
	$scope.$on('$ionicView.enter', function() {

		$scope.cupons = Coupons.all($stateParams.CuponID);
		$scope.heartMenu = "silver";
		$scope.ConteoPro = ContPromo


		$scope.heartPopover = function(id){
			var resultSetPopover = $.grep(CustomerList, function (e) {
				 return e.NameCategory.indexOf(id) == 0;
			});
			console.log(resultSetPopover);
			if (resultSetPopover[0].colorHeart == "white") {
					$scope.heartMenu = "silver";
			}else {
				$scope.heartMenu = resultSetPopover[0].colorHeart;
			}

		}
		$scope.changeColorHeartFollow = function(id) {
			if ($scope.heartMenu == "silver") {
				$scope.heartMenu = "red";
				SaveFavorite(IdUsuario, id)
			} else {
				$scope.heartMenu = "silver";
				DeleteFavorite(IdUsuario, id)
			}
		}
	});
	//***** FUNCTION FOOTER CHANCE COLOR  *****
 //***** SCOPE $ON TO REFRESH MENU CONTROLLER

 $scope.$on('$ionicView.enter', function() {
	  	$scope.categoryNameCoupon = Coupons.all($stateParams.CuponID);
			console.log($scope.categoryNameCoupon);
		 colorIconsFoother = []
		 colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.categoryNameCoupon[0][0].Category,'','none']);
 });
})
// ********************* CUPON DESCRIPTION CONTROLLER *********************
.controller('DescriptionCuponCtrl', function($scope, $stateParams ,DescriptionCupons, $ionicLoading) {

  $scope.llenar2=function(){
    displayNoneInline=[{none:"inline",inline:"none"}];
  };

	mixpanel.track("view", { "type" : "DescriptionCupon","Gender":IdGender,"User":IdUsuario});
	$scope.reloadpage = function(){
		$scope.cupons[0].QuantityExchanged +=1
	}
	// ***************  EXCHANGE BUTTON DISPLAY NONE********************
	$scope.buttonCash = function(){
		$('.botonCanjear').click(function(){
			$(this).hide();
			$('.exchangeBoxBarCode').show();
		})
	}

	// ************ FUNCTION CHANGE COLOR PIN CUPON *************
	$scope.changeColorPinCupon = function (id) {
		var cssColorCuponPin = document.getElementById(id).style.color;
		if (cssColorCuponPin == "silver") {
			document.getElementById(id).style.color = "purple";
			saveCuponFavorite(IdUsuario, id)
		} else {
			deleteFavoriteCupon(IdUsuario, id)
			document.getElementById(id).style.color = "silver";
		}
	};

		// For to update QuantityExchanged
		var CuponClassExchanged = Parse.Object.extend("Cupon");
		var cuponClassExchanged = new CuponClassExchanged();
		var query = new Parse.Query("Cupon");
		query.equalTo("objectId",$stateParams.DescriptionID);
		query.equalTo("Status",true);

		$scope.HideStyleButtonExchangePosition = "absolute";
		$scope.HideStyleButtonExchangeBottom = "0";

		$scope.countCoupon = function(){
      var QuantityExchangedsu = 0;
			$scope.HideStyleButtonExchangePosition = "none"
			$scope.HideStyleButtonExchangeBottom = "none"
      // mainApp.database().ref('Cupon/'+x).update({
      //       Status: false
      // });
console.clear();
console.log($stateParams.DescriptionID);

        mainApp.database().ref('Coupon').once('value', function(snapshot) {
            for (x in snapshot.val()) {

                    if(snapshot.val()[x].TypeCoupon === "Coupon"){
                                              // ------------------------------------------------------------------------------------------------------------------------------------------------
                        if (parseInt(snapshot.val()[x].QuantityExchanged) < parseInt(snapshot.val()[x].QuantityCoupons)) {

                                  QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1
                                  mainApp.database().ref('Coupon/'+$stateParams.DescriptionID).update({
                                        QuantityExchanged: QuantityExchangedsu
                                  });
                  								  // cuponClassExchanged.id = $stateParams.DescriptionID;
                  									// cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
                  									// cuponClassExchanged.save();
                  									mixpanel.track("clickCanjear", { "type" : "Cupon","Gender":IdGender,"User":NameUser,"NameCoupon":$stateParams.DescriptionID});
                  									swal({
                  											title: "Perfecto!",
                  											text: "Has cambiado tu cupón",
                  											type: "success",
                  											timer: 2000,
                  											showConfirmButton: false
                  									});
                                                } else {

                  								$scope.cupons[0].QuantityExchanged =  parseInt(snapshot.val()[x].QuantityCoupons);

                                  mainApp.database().ref('Coupon/'+$stateParams.DescriptionID).update({
                                        Status: false
                                  });
                  								// cuponClassExchanged.id = $stateParams.DescriptionID;
                  								// cuponClassExchanged.set("Status", false);
                  								// cuponClassExchanged.save();

                  								swal({
                  									title: 'Lo sentimos!',
                  									text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
                  									type: 'warning'
                  								},
                  								function(isConfirm) {
                  										if(isConfirm){

                  											$scope.loading = $ionicLoading.show({
                  												showBackdrop: true,
                  												template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
                  											});
                                        //
                  											// Parse.Cloud.run('CountCouponCustomer', {}, {
                  											// 		success: function(resultCustomer) {
                  											// 			console.log(resultCustomer);
                  											// 				Parse.Cloud.run('CountCouponCategories', {}, {
                  											// 						success:function(result) {
                                        //
                  											// 							CategoryListName = [];
                  											// 							var query = new Parse.Query('AppCategory');
                  											// 							query.each(function(results) {
                  											// 										CategoryListName.push(results.attributes)
                  											// 							}).then(function() {
                  											// 								ReloadFavorite()
                  											// 							}).then(function() {
                                        //
                  											// 								Parse.Cloud.run('GetCustomer', {},{
                  											// 									success:function (results) {
                  											// 									//	console.log(results);
                  											// 										CustomerList = results
                  											// 									},
                  											// 									error:function (error) {
                  											// 									 console.log(error);
                  											// 									}
                  											// 								}).then(function() {
                  											// 									$ionicLoading.hide();
                  											// 									var couponPages="#/app/playlists";
                  											// 									location.href=couponPages;
                  											// 								})
                  											// 							});
                                        //
                  											// 						},
                  											// 						error: function(error) {
                  											// 								/* Show error if call failed */
                  											// 								console.log(error);
                  											// 						}
                  											// 				});
                  											// 		},
                  											// 		error: function(error) {
                  											// 		/* Show error if call failed */
                  											// 		console.log(error);
                  											// 		}
                  											// });
                                        $ionicLoading.hide();
                                      	var couponPages="#/app/playlists";
                                        location.href=couponPages;
                  										}
                  								})
                  						}
                              // ------------------------------------------------------------------------------------------------------------------------------------------------
                          } else if(snapshot.val()[x].TypeCoupon === "Fecha"){
                                  console.log('tiene que sumar')
      														mixpanel.track("clickCanjear", { "type" : "fecha","Gender":IdGender,"User":NameUser,"NameCoupon":$stateParams.DescriptionID});
                                          // cuponClassExchanged.id = $stateParams.DescriptionID;
      									                  // cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
      									                  // cuponClassExchanged.save();
                                          QuantityExchangedsu = snapshot.val()[x].QuantityExchanged + 1
                                          mainApp.database().ref('Coupon/'+$stateParams.DescriptionID).update({
                                                QuantityExchanged: QuantityExchangedsu
                                          });
                          }





                  }

        });

				// var couponCash2 = query.find({
				// 	success: function(results){
        //       if(results[0].attributes.TypeCoupon === "Cupon"){
        //                                 // ------------------------------------------------------------------------------------------------------------------------------------------------
        //           if (parseInt(results[0].attributes.QuantityExchanged) < parseInt(results[0].attributes.QuantityCoupons)) {
        //     								  cuponClassExchanged.id = $stateParams.DescriptionID;
        //     									cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
        //     									cuponClassExchanged.save();
        //     									mixpanel.track("clickCanjear", { "type" : "Cupon","Gender":IdGender,"User":NameUser,"NameCoupon":$stateParams.DescriptionID});
        //     									swal({
        //     											title: "Perfecto!",
        //     											text: "Has cambiado tu cupón",
        //     											type: "success",
        //     											timer: 2000,
        //     											showConfirmButton: false
        //     									});
        //                                   } else {
        //
        //     								$scope.cupons[0].QuantityExchanged =  parseInt(results[0].attributes.QuantityCoupons);
        //
        //     								cuponClassExchanged.id = $stateParams.DescriptionID;
        //     								cuponClassExchanged.set("Status", false);
        //     								cuponClassExchanged.save();
        //
        //     								swal({
        //     									title: 'Lo sentimos!',
        //     									text: 'En estos momentos no contamos con mas cupones, Espera un momento mientras actualizamos la informacion',
        //     									type: 'warning'
        //     								},
        //     								function(isConfirm) {
        //     										if(isConfirm){
        //
        //     											$scope.loading = $ionicLoading.show({
        //     												showBackdrop: true,
        //     												template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #00BAB9; fill: #00BAB9;"></ion-spinner>'
        //     											});
        //
        //     											Parse.Cloud.run('CountCouponCustomer', {}, {
        //     													success: function(resultCustomer) {
        //     														console.log(resultCustomer);
        //     															Parse.Cloud.run('CountCouponCategories', {}, {
        //     																	success:function(result) {
        //
        //     																		CategoryListName = [];
        //     																		var query = new Parse.Query('AppCategory');
        //     																		query.each(function(results) {
        //     																					CategoryListName.push(results.attributes)
        //     																		}).then(function() {
        //     																			ReloadFavorite()
        //     																		}).then(function() {
        //
        //     																			Parse.Cloud.run('GetCustomer', {},{
        //     																				success:function (results) {
        //     																				//	console.log(results);
        //     																					CustomerList = results
        //     																				},
        //     																				error:function (error) {
        //     																				 console.log(error);
        //     																				}
        //     																			}).then(function() {
        //     																				$ionicLoading.hide();
        //     																				var couponPages="#/app/playlists";
        //     																				location.href=couponPages;
        //     																			})
        //     																		});
        //
        //     																	},
        //     																	error: function(error) {
        //     																			/* Show error if call failed */
        //     																			console.log(error);
        //     																	}
        //     															});
        //     													},
        //     													error: function(error) {
        //     													/* Show error if call failed */
        //     													console.log(error);
        //     													}
        //     											});
        //
        //     										}
        //     								})
        //     						}
        //                 // ------------------------------------------------------------------------------------------------------------------------------------------------
        //             } else if(results[0].attributes.TypeCoupon === "Fecha"){
        //                     console.log('tiene que sumar')
				// 										mixpanel.track("clickCanjear", { "type" : "fecha","Gender":IdGender,"User":NameUser,"NameCoupon":$stateParams.DescriptionID});
        //                             cuponClassExchanged.id = $stateParams.DescriptionID;
				// 					cuponClassExchanged.set("QuantityExchanged", results[0].attributes.QuantityExchanged + 1);
				// 					cuponClassExchanged.save();
        //             }
        //
				// 	}
				// })

		}
		/*****  noneDisplay equalTo displayNoneInline for
		 				call the list and show or hide barcode image
						in DescriptionCupons  *****/
		// colorIconsFoother=$scope.$on('$ionicView.enter', function() {});[];

		// ***** CHANGE COLOR FOOTER FUNCTION AND $ON SCOPE TO REFRESH MENU CONTROLLER *****
    $scope.$on('$ionicView.enter', function() {
			$scope.noneDisplay=displayNoneInline;
			// console.log($scope.noneDisplay[0].position);
			if ($scope.noneDisplay[0].position == "absolute") {
				$scope.HideStyleButtonExchangePosition = "none"
				$scope.HideStyleButtonExchangeBottom = "none"
			}

			$scope.cupons = DescriptionCupons.all($stateParams.DescriptionID);
        colorIconsFoother = []
          colorIconsFoother.push(['#00DDC1','#A7A9AC','#A7A9AC','#A7A9AC',$scope.cupons[0].Category,'','none']);
    });
})
//*********************  MENU CONTROLLER  *******************************
.controller('menuCtrl', function($scope,$stateParams){
	$scope.$on('$ionicView.enter', function() {
		$scope.footerChangeColor=colorIconsFoother;
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
.controller('PopoverCtrl2', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('templates/popover2.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'hello';
	});
})
//*******************  NEW CONTROLLER POPOVER  ************************
.controller('PopoverNewCtrl', function($scope, $ionicPopover) {
$scope.Analytics = function (id,nameShare) {
	var NameUser = String(IdUsuario)
	var Dimensions = {
	  name: 'share_'+id,
	  user: NameUser
	};
	if (nameShare == "promotion") {
		mixpanel.track("ClickShare", { "NameShareID" :id,"User":NameUser,"Gender":IdGender});
		Parse.Analytics.track("SharePromotion", Dimensions);
	}else {
		mixpanel.track("ClickShare", { "NameShareID" :id,"User":NameUser,"Gender":IdGender});
		Parse.Analytics.track("ShareCoupon", Dimensions);
	}

}
	$ionicPopover.fromTemplateUrl('templates/popoverNew.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.message = 'cheers';
	});
});
// ************************  ROUTES WITH LOGIN AND TUTORIAL CONTROLLERS ********************
// ************************ CONTROLLER ROUTER ************************
var myApp = angular.module('reallyCoolApp', ['ionic','ngCordova']);
myApp.config(function($ionicConfigProvider) {
	// note that you can also chain configs
	$ionicConfigProvider.navBar.alignTitle('center');
});
// ************************ MODULE SERVICES ************************
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
})
// ************************ CORDOVA PLUGINS START LOAD ************************
.run(function($ionicPlatform) {

		$ionicPlatform.ready(function() {

			StatusBar.hide();
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleLightContent();
			}
		});
		// Disable back for app
		$ionicPlatform.registerBackButtonAction(function(event) {
				if ($state.current.name == 'app.playlists') {
						$ionicPopup.confirm({
								title: 'System warning',
								template: 'are you sure you want to exit?'
						}).then(function(res) {
								if (res) {
										ionic.Platform.exitApp();
								}
						})
				}
		}, 100);

})

// ************************ ROUTER PROVIDER CONFIGURATION ************************
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	// ************************ INITIAL ************************
	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu/menu.html",
		controller: 'menuCtrl'
	})
  // ******** loading *****
  	.state('loading', {
  		url: "/loading",
  		templateUrl: "templates/loading/loading.html",
  		controller:"loadingCtrl"
  })
  // ******** loading For Login User *****
  	.state('loadingLoginUser', {
  		url: "/loadingLoginUser",
  		templateUrl: "templates/loading/loading.html",
  		controller:"loadingCtrlLogin"
  })
  // ******** TUTORIAL *****
	.state('tutorial', {
		url: "/tutorial",
		templateUrl: "templates/tutorial/tutorial.html",
		controller:"tutorialController"
})
// ******** TUTORIAL2 *****
	.state('tutorial2', {
		url: "/tutorial2",
		templateUrl: "templates/tutorial2/tutorial2.html",
		controller:"tutorial2Controller"
  })
	// ******** FACEBOOK *****
	.state('login', {
		url: "/login",
		templateUrl: "templates/login/login.html",
    	controller: "LoginCtrlEmail"
	})
	// ******** LOGIN AND CONTROLLER ******
	.state('loginAndRegister', {
		url: "/loginAndRegister",
		templateUrl: "templates/login_and_register/loginAndRegister.html"
	})
  // ******** FACEBOOK *****
	.state('login2', {
		url: "/login2",
		templateUrl: "templates/login2/login2.html",
    	controller: "RegisterController"
	})
	// ******* YOUR FAVORITE
	.state('app.tusFavoritos', {
		url: "/tusFavoritos",
		views: {
			'menuContent': {
				templateUrl: "templates/your_favorites/your_favorites.html",
				controller: 'AllFavoriteCtrl'
			}
		}
	})
	// ******* SAVED *******
	.state('app.salvados', {
		url: "/salvados",
		views: {
			'menuContent': {
				templateUrl: "templates/saved/saved.html",
				controller: 'AllPromotionCtrl'
			}
		}
	})
  // ******* SETTINGS *******
	.state('app.herramientas', {
		url: "/herramientas",
		views: {
			'menuContent': {
				templateUrl: "templates/tools/tools.html",
				controller: 'toolsCtrl'
			}
		}
	})
	// ******* OFFERS *******
	.state('app.browse', {
		url: "/ofertas/:superId",
		views: {
			'menuContent': {
				templateUrl: "templates/offers/offers.html",
				controller: 'currentPromotionCtrl'
			}
		}
	})
	// ****************  OFFERTS DESCRIPTION  *************
	.state('app.descripcionOfertas', {
		url: "/descripcionOfertas/:superId",
		views: {
			'menuContent': {
				templateUrl: "templates/offer_description/offerDescription.html",
				controller: 'PromotionsDescription'
			}
		}
	})
	.state('app.termsAndConditionsOffers', {
			url: "/termsAndConditionsOffers/:superId",
			views: {
				'menuContent': {
					templateUrl: "templates/term_and_conditions/termsAndConditionsForOffers.html",
					controller: 'currentPromotionCtrl'
				}
			}
		})
	// ******* PLAYLIST *******
	.state('app.playlists', {
		url: "/playlists",
		views: {
			'menuContent': {
				templateUrl: "templates/page_start/page_start.html",
				controller: 'CategoryCtrl'
			}
		}
	})
	// ******* OTHER CATEGORIES *******
	.state('app.singlessssss', {
		url: "/playlists/:IDcustomer",
		views: {
			'menuContent': {
				templateUrl: "templates/categories/Customer.html",
				controller: 'CustomerCtrl'
			}
		}
	})
	// ****************  CUPONS  *************
	.state('app.cupones', {
		url: "/cupones/:CuponID",
		views: {
			'menuContent': {
				templateUrl: "templates/coupon/coupon.html",
				controller: 'CuponCtrl'
			}
		}
	})
	//****************  CUPONS DESCRIPTION  *************
	.state('app.descripcionCupones', {
		url: "/descripcionCupones/:DescriptionID",
		views: {
			'menuContent': {
				templateUrl: "templates/coupon_description/couponDescription.html",
				controller: 'DescriptionCuponCtrl'
			}
		}
	})
	.state('app.termsAndConditions', {
		url: "/termsAndConditions/:DescriptionID",
		views: {
			'menuContent': {
				templateUrl: "templates/term_and_conditions/termsAndConditionsForCoupons.html",
				controller: 'DescriptionCuponCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');
})
// ############## //
//  Controllers   //
// ############## //

/*************************  BODY CONTROLLER  ******************************/

.controller('loadingCtrlLogin', function($scope, $state,$ionicLoading,$timeout) {

  // Loading Login User
  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.show({
      noBackdrop: true,
      template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FFFFFF; fill: #FFFFFF;"></ion-spinner> <p style = "color:white">Cargando...</p>'
    });

    $timeout(function () {
      $ionicLoading.hide();
      $state.go('app.playlists');
    }, 2000);

  });



})




.controller('loadingCtrl', function($scope, $state,$ionicLoading,$timeout) {
  $ionicLoading.show({
		noBackdrop: true,
		template: '<ion-spinner customer1lass="spinner" icon="lines" style="stroke: #FFFFFF; fill: #FFFFFF;"></ion-spinner> <p style = "color:white">Cargando...</p>'
	});
  $timeout(function () {



  var user = firebase.auth().currentUser;
  var credential;

  // Prompt the user to re-provide their sign-in credentials
  console.clear()

//mainApp.auth().onAuthStateChanged(function(user) {


    if (user) {

      //$state.go('app.playlists');
      // User is signed in.
      console.log("/////////////////////////////user///////////////////////////////////////////");
      console.log(user);
      console.log(user.providerData[0].uid);
      if(user.providerData[0].providerId == 'facebook.com'){

          IdUsuario = user.providerData[0].uid;
          console.log("facebook");
          console.log(IdUsuario);
          mainApp.database().ref('Users').once('value', function(snapshot) {

                  console.log('---------------------');

                  for (x in snapshot.val()) {
                     if (x == IdUsuario) {
                       IdGender =snapshot.val()[x].Gender
                  //      console.log("asdasd");
                  //    console.log(snapshot.val()[x]);
                  //   console.log(snapshot.val()[x]);
                  //  console.log(snapshot.val()[x].Gender);
                     }


                  }

        }).then(function() {

        });

        $timeout(function () {
          $ionicLoading.hide();
          $state.go('app.playlists');

        }, 1000);
      }else{
        console.clear()
        IdUsuario = user.uid;
        console.log("correo");
        console.log(IdUsuario);
          mainApp.database().ref('Users').once('value', function(snapshot) {

                  console.log('---------------------');

                  for (x in snapshot.val()) {
                     if (x == IdUsuario) {
                       IdGender =snapshot.val()[x].Gender
                  //      console.log("asdasd");
                  //    console.log(snapshot.val()[x]);
                  //   console.log(snapshot.val()[x]);
                  //  console.log(snapshot.val()[x].Gender);
                     }


                  }

        });
      }

      //alert("user signed")
    //  $state.go('app.playlists');

    } else {
      $timeout(function () {
        $ionicLoading.hide();
        $state.go('tutorial');

        }, 1000);

      // No user is signed in.
      //alert("no login")
    }


        }, 1000);
//});

        // setTimeout(function() {
        // 		navigator.splashscreen.hide();
        // }, 4000);

})

.controller('bodyCtrl', ['$state', function($state,$ionicLoading) {
	var userVerificate= Parse.User.current();

	// *********** DEVICE READY SPLASHSCREEN  *******************
	document.addEventListener("deviceready", function($scope) {
    // var user = firebase.auth().currentUser;
    //
    //
    //   if (user) {
    //     $state.go('app.playlists');
    //     // User is signed in.
    //     console.log("/////////////////////////////user///////////////////////////////////////////");
    //     console.log(user);
    //     console.log(user.providerData[0].uid);
    //     if(user.providerData[0].providerId == 'facebook.com'){
    //       console.clear()
    //         IdUsuario = user.providerData[0].uid;
    //         console.log("facebook");
    //         console.log(IdUsuario);
    //         firebase.database().ref('Users').on('value', function(snapshot) {
    //
    //                 console.log('---------------------');
    //
    //                 for (x in snapshot.val()) {
    //                    if (x == IdUsuario) {
    //                      IdGender =snapshot.val()[x].Gender
    //                 //      console.log("asdasd");
    //                 //    console.log(snapshot.val()[x]);
    //                 //   console.log(snapshot.val()[x]);
    //                 //  console.log(snapshot.val()[x].Gender);
    //                    }
    //
    //
    //                 }
    //
    //       });
    //     }else{
    //       console.clear()
    //       IdUsuario = user.uid;
    //       console.log("correo");
    //       console.log(IdUsuario);
    //         firebase.database().ref('Users').on('value', function(snapshot) {
    //
    //                 console.log('---------------------');
    //
    //                 for (x in snapshot.val()) {
    //                    if (x == IdUsuario) {
    //                      IdGender =snapshot.val()[x].Gender
    //                 //      console.log("asdasd");
    //                 //    console.log(snapshot.val()[x]);
    //                 //   console.log(snapshot.val()[x]);
    //                 //  console.log(snapshot.val()[x].Gender);
    //                    }
    //
    //
    //                 }
    //
    //       });
    //     }
    //
    //     //alert("user signed")
    //   //  $state.go('app.playlists');
    //
    //   } else {
    //     $state.go('tutorial');
    //     // No user is signed in.
    //     //alert("no login")
    //   }
    //   		// setTimeout(function() {
		// 			// 		navigator.splashscreen.hide();
		// 			// }, 4000);
		var notificationOpenedCallback = function(jsonData) {
		console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
	};

	window.plugins.OneSignal.init("b95e0734-b67a-400e-bfd3-a494d841d736",
																 {googleProjectNumber: "621898809225"},
																 notificationOpenedCallback);

	// Show an alert box if a notification comes in when the user is in your app.
	window.plugins.OneSignal.enableInAppAlertNotification(true);
		///////////////////////////////////////


		//$scope.currentUser = Parse.User.current();
    // var user = firebase.auth().currentUser;
    //
    // if (user) {
    //   // User is signed in.
    //   $state.go('app.playlists');
    // } else {
    //   // No user is signed in.
    // }

			//  if (userVerificate==null) {
			// 		 $state.go('tutorial');
			// }else {
			// 		if (userVerificate["attributes"].authData == undefined) {
			// 			console.log("---------------------------------******************************************************************************");
			// 				IdUsuario = String($scope.currentUser.id)
			// 				IdGender = String($scope.currentUser.attributes.gender);
			// 								viewPromotion()
			// 		}else {
			// 			console.log("---------------------------------******************************************************************************");
			// 				IdUsuario = String(userVerificate["attributes"].authData.facebook.id)
			// 				IdGender = String($scope.currentUser.attributes.gender);
			// 								viewPromotion()
			// 		}
			// 		$state.go('app.playlists');
			// 		// setTimeout(function() {
			// 		// 		navigator.splashscreen.hide();
			// 		// }, 6000);
			// 	}
	}, false);
}])


.controller('rootCtrl', ['$state', function($state) {
 $state.go('app.playlists');
}])

.controller('rootCtrl', ['$state', function($state) {
  $state.go('app.playlists');
}])
/*************************  TUTORIAL  ******************************/
.controller('tutorialController', ['$scope', '$state', function($scope, $state) {

// mainApp.auth().signOut().then(function() {
//   // Sign-out successful.
//   console.log("Sign-out successful.");
// }, function(error) {
//   // An error happened.
// });
	var guate    = moment.tz("America/Guatemala");



mixpanel.track("viewTurorial");
	// IdUsuario of Facebook or Frenzy for Pines and hearts

	$scope.slideChanged = function(index) {
    switch(index) {
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
					CustomerF[countC]["suma"] =snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"]
					countC++
				}
				countC = 0

	///	console.log(CustomerF);
	});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$scope.TutorialPromotion = CustomerF;
}])
/*************************  TUTORIAL NO.2 ******************************/
.controller('tutorial2Controller', ['$scope', '$state', function($scope, $state) {
  $scope.slideChanged = function(index) {
    switch(index) {
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
    					CustomerF[countC]["suma"] =snapshot.val()[x]["QuantityCoupon"] + snapshot.val()[x]["QuantityPromotion"]
    					countC++
    				}
    				countC = 0

    	///	console.log(CustomerF);
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
	mixpanel.track("view", { "type" : "Tools","Gender":IdGender,"User":NameUser});
	Parse.Analytics.track("Tools", Dimensions);
	$scope.AnalyticsTools= function (id) {
		var NameUser = String(IdUsuario)
		var dimensions = {
			name: 'tools_'+id,
			user: NameUser
		};
		mixpanel.track("ClickOtros", { "type" : id,"Gender":IdGender,"User":NameUser});
		Parse.Analytics.track("Tools", dimensions);
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
		colorIconsFoother.push(['#A7A9AC','#A7A9AC','#A7A9AC','#3F51B5','','img/icn-35.png','','none']);
	});
}])
/**********************  FACEBOOK LOGIN CONTROLLER  **********************************/

.controller('loginCtrlFacebook', function($scope, $state, $cordovaFacebook,UserService,$q) {

/*
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
    console.log("/////////////////////////////user///////////////////////////////////////////");
    console.log(user);
    console.log(user.providerData[0].uid);

    if(user.providerData[0].providerId == 'facebook.com'){
      console.clear()
        IdUsuario = user.providerData[0].uid;
        console.log("facebook");
        console.log(IdUsuario);

        mainApp.database().ref('Users').on('value', function(snapshot) {

                console.log('---------------------');

                for (x in snapshot.val()) {
                   if (x == IdUsuario) {
                     IdGender =snapshot.val()[x].Gender
                //      console.log("asdasd");
                //    console.log(snapshot.val()[x]);
                //   console.log(snapshot.val()[x]);
                //  console.log(snapshot.val()[x].Gender);
                   }


                }

      });
    }else{
      console.clear()
      IdUsuario = user.uid;
      console.log("correo");
      console.log(IdUsuario);
        mainApp.database().ref('Users').on('value', function(snapshot) {

                console.log('---------------------');

                for (x in snapshot.val()) {
                   if (x == IdUsuario) {
                     IdGender =snapshot.val()[x].Gender
                //      console.log("asdasd");
                //    console.log(snapshot.val()[x]);
                //   console.log(snapshot.val()[x]);
                //  console.log(snapshot.val()[x].Gender);
                   }


                }

      });
    }
    //alert("user signed")
    $state.go('app.playlists');
  //   ///////////////////////////Favorite heart////////////////////////////////////
   //
  //   mainApp.database().ref('Favorite').on('value', function(snapshot) {
  //     console.log("entro----------------------------Favorite reload-----------------------------------");
  //     var CountFF = 0;
  //     var countFavorite = 0;
  //     for (x in snapshot.val()) {
  //       if (snapshot.val()[x].UserID == user.providerData[0].uid) {
  //         for (i in snapshot.val()[x].CustomerID) {
  //           for (c in CustomerList) {
   //
  //             if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
  //               console.log("--------------------------------------");
  //               console.log(snapshot.val()[x].CustomerID[i]);
  //               console.log("--------------------------------------");
  //               CustomerList[c].colorHeart = "red"
  //             //  AllFavoriteF[countFavorite] = CustomerList[c]
  //             //  countFavorite++
  //             }
  //           }
  //         }
  //         console.log("usario encontrado");
  //         FirebaseFavorite[CountFF] = snapshot.val()[x]
  //         FirebaseFavorite[CountFF]["FavoriteID"] = x
  //         console.log(FirebaseFavorite);
  //         CountFF++
  //       }
   //
  //     }
  //  });
  //   //////////////////////////////////////////////////////////////////////////
  //   ///////////////////////////SAVED PIN////////////////////////////////////
   //
  //   mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
  //     console.log("entro----------------------------PromotionSaved reload-----------------------------------");
  //     console.log(CurrentPromotion);
  //     var CountPS = 0;
  //     var countPromo = 0;
  //     for (x in snapshot.val()) {
  //       if (snapshot.val()[x].UserID == user.providerData[0].uid) {
   //
  //         for (i in snapshot.val()[x].PromotionID) {
  //           for (c in CurrentPromotion) {
  //             // console.log("/////////////////////////////////////////////////");
  //             // console.log(snapshot.val()[x].PromotionID[i]);
  //             // console.log(CurrentPromotion[c].Name);
  //             // console.log("/////////////////////////////////////////////////");
  //             if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
  //               console.log(snapshot.val()[x].PromotionID[i]);
  //               console.log(CurrentPromotion[c].IDpromotion);
  //               console.log("---------------*****************************-----------------------");
  //               console.log(snapshot.val()[x].PromotionID[i]);
  //               console.log("--------------------*********************------------------");
  //               console.log("purple");
  //               AllPromotionF[countPromo] = CurrentPromotion[c]
  //               countPromo++
  //               CurrentPromotion[c].ColorPin = "purple"
   //
  //             }else {
  //               console.log("no encontro nada ");
  //             }
  //           }
  //         }
  //         console.log("usario encontrado");
  //         console.log(AllPromotionF);
  //         FirebasePromotionSaved[CountPS] = snapshot.val()[x]
  //         FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
  //         console.log(FirebasePromotionSaved);
  //         CountPS++
  //       }
   //
  //     }
  //  });
  //   //////////////////////////////////////////////////////////////////////////

  } else {
    // No user is signed in.
    //alert("no login")
  }
 // $scope.currentUser = Parse.User.current();
 // console.log($scope.currentUser)
 // if ($scope.currentUser != null ){
 //  if ($scope.currentUser["attributes"].authData != undefined) {
 // 		IdUsuario = String($scope.currentUser["attributes"].authData.facebook.id);
 // 		viewPromotion();
 // 		$state.go('app.playlists');
 //  } else {
 // 		IdUsuario = String($scope.currentUser.id);
 // 		viewPromotion();
 // 		$state.go('app.playlists');
 //  }
 //
 // }

			var fbLogged = new Parse.Promise();
 var fbLoginSuccess = function(response) {
		 if (!response.authResponse){
				 fbLoginError("Cannot find the authResponse");
				 return;
		 }
		 var expDate = new Date(
				 new Date().getTime() + response.authResponse.expiresIn * 1000
		 ).toISOString();

		 var authData = {
				 id: String(response.authResponse.userID),
				 access_token: response.authResponse.accessToken,
				 expiration_date: expDate
		 }
		 fbLogged.resolve(authData);
 };

 var fbLoginError = function(error){
		 fbLogged.reject(error);
 };
 */
 // This method is to get the user profile info from the facebook api
var getFacebookProfileInfo = function (authResponse) {
  var info = $q.defer();

  facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
    function (response) {
      console.log(response);
      info.resolve(response);
    },
    function (response) {
      console.log(response);
      info.reject(response);
    }
  );
  console.log(info.promise);
  return info.promise;
};

///////////////////

 //===============LOGIN WITH FB==========//
 $scope.loginfb = function(){
	 	mixpanel.track("LoginClick", { "loginButton" : "Facebook"});
    console.log("tutoriaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal");

// var p1 = new Promise(
//   function () {
//     console.log("hola");
//
//   }
// )
//
// p1.then(function (val) {
//   console.log(val);
//   console.log("promesa activada");
//   alert("promoesa")
// });
// facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError)
// console.log(facebookConnectPlugin);
// console.log(fbLoginSuccess);
////////////////////////////////////////////////////////////



$cordovaFacebook.login(["public_profile","user_birthday" ,"email","user_hometown"])
  .then(function(success) {
    console.log(success);
    //alert("suceeces")
    var credential = firebase.auth.FacebookAuthProvider.credential(success.authResponse.accessToken);
    console.log(credential);
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

    // { id: "634565435",
    //   lastName: "bob"
    //   ...
    // }
  }, function (error) {
    alert(error)
    // error
  }).then(function() {
    //alert("ultima promesa")

      //alert(UserUID)
      //
      //


          $cordovaFacebook.getLoginStatus()
            .then(function(success) {
              console.log(success);
              $cordovaFacebook.api('/me?fields=id,name,birthday,email,gender,hometown&access_token=' + success.authResponse.accessToken, null)
                  .then(function(success) {
                    mixpanel.identify(success.id);
                    mixpanel.people.set({
                      "$email":success.email,
                      "$gender": success.gender,
                      "$birthday":success.birthday,
                      "$name": success.name,
                      "$typeLogin": "Facebook"

                    });
                    // success
                    var UserUID;
                    mainApp.auth().onAuthStateChanged(function(user) {
                      if (user) {
                        // User is signed in.
                        var UserUID = user.providerData[0].uid;
                        console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer");
                        console.log(success);
                        console.log(user);
                      } else {
                        // No user is signed in.
                      }
                    });
                  //  var user = firebase.auth().currentUser;

                      ///////////////////////////Favorite heart////////////////////////////////////
                      mainApp.database().ref('Favorite').on('value', function(snapshot) {
                        console.log("entro----------------------------Favorite reload-----------------------------------");
                        var CountFF = 0;
                        for (x in snapshot.val()) {
                          if (snapshot.val()[x].UserID == UserUID) {
                            for (i in snapshot.val()[x].CustomerID) {
                              for (c in CustomerList) {

                                if (snapshot.val()[x].CustomerID[i] == CustomerList[c].Name) {
                                  console.log("--------------------------------------");
                                  console.log(snapshot.val()[x].CustomerID[i]);
                                  console.log("--------------------------------------");
                                  CustomerList[c].colorHeart = "red"
                                }
                              }
                            }
                            console.log("usario encontrado------------------------------****************************");
                            FirebaseFavorite[CountFF] = snapshot.val()[x]
                            FirebaseFavorite[CountFF]["FavoriteID"] = x
                            console.log("mi lista---------------------------------------------------------//////////////////////////");
                            console.log(FirebaseFavorite);
                            CountFF++
                          }

                        }
                     });
                      //////////////////////////////////////////////////////////////////////////
                      ///////////////////////////SAVED PIN////////////////////////////////////

                      mainApp.database().ref('PromotionSaved').on('value', function(snapshot) {
                        console.log("entro----------------------------PromotionSaved reload-----------------------------------");
                        console.log(CurrentPromotion);
                        var CountPS = 0;
                        for (x in snapshot.val()) {
                          if (snapshot.val()[x].UserID == UserUID) {

                            for (i in snapshot.val()[x].PromotionID) {
                              for (c in CurrentPromotion) {
                                // console.log("/////////////////////////////////////////////////");
                                // console.log(snapshot.val()[x].PromotionID[i]);
                                // console.log(CurrentPromotion[c].Name);
                                // console.log("/////////////////////////////////////////////////");
                                if (snapshot.val()[x].PromotionID[i] == CurrentPromotion[c].IDpromotion) {
                                  console.log(snapshot.val()[x].PromotionID[i]);
                                  console.log(CurrentPromotion[c].IDpromotion);
                                  console.log("---------------*****************************-----------------------");
                                  console.log(snapshot.val()[x].PromotionID[i]);
                                  console.log("--------------------*********************------------------");
                                  console.log("purple");
                                  CurrentPromotion[c].ColorPin = "purple"
                                }else {
                                  console.log("no encontro nada ");
                                }
                              }
                            }
                            console.log("usario encontrado");
                            FirebasePromotionSaved[CountPS] = snapshot.val()[x]
                            FirebasePromotionSaved[CountPS]["PromotionSavedID"] = x
                            console.log("mi lista---------------------------------------------------------");
                            console.log(FirebasePromotionSaved);
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
                    console.log(success);
                      $state.go('app.playlists');
                  }, function (error) {
                    // error
                  });
            }, function (error) {
              // error
            });



  });

/*
    facebookConnectPlugin.getLoginStatus(function(success){

      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        alert("login con facebookConnectPlugin")
        alert(success)
        console.log('getLoginStatus', success);


        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            //$state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          alert("ya tenia login");
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            //$state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        //  $state.go('app.home');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.
        alert("no login")
        alert(success.status)
        alert(success)
        console.log('getLoginStatus', success.status);

        // $ionicLoading.show({
        //   template: 'Logging in...'
        // });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        //facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);


          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError)
          console.log(facebookConnectPlugin);
          $state.go('app.playlists');






      }



    });
*/

//////////////////////////////////////////////////////////////////////////////////////

    // var provider = new firebase.auth.FacebookAuthProvider();
    //  provider.addScope('user_birthday');
    //  provider.addScope('email');
    //  provider.addScope('user_friends');
    //  provider.addScope('user_hometown');
    //
    //  secondaryApp.auth().signInWithPopup(provider).then(function(result) {
    //    var token = result.credential.accessToken;
    //    FB.api(
    //    '/me?fields=id,name,birthday,gender,hometown,email', {access_token: token}, function(response) {
    //        console.log(response);
    //    }
    // );
    // $state.go('app.playlists');
    // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww");
    //  }).catch(function(error) {
    //    // Handle Errors here.
    //    alert(error);
    //    var errorCode = error.code;
    //    var errorMessage = error.message;
    //    // The email of the user's account used.
    //    var email = error.email;
    //    // The firebase.auth.AuthCredential type that was used.
    //    var credential = error.credential;
    //    // ...
    //  })
			// setTimeout(function(){
      //
			// 	 if(!window.cordova){
			// 			 facebookConnectPlugin.browserInit('426922250825103');
			// 	 }
      //
			// 	 facebookConnectPlugin.login(['email', 'public_profile', 'user_birthday', 'user_hometown'], fbLoginSuccess, fbLoginError);
      //
			// 	 fbLogged.then(function(authData) {
      //
			// 			 $state.go('app.playlists');
			// 			 return Parse.FacebookUtils.logIn(authData);
			// 	 })
      //
			// 	 .then(function(userObject) {
			// 				 var authData = userObject.get('authData');
			// 				 var consoles = Parse.User.current();
			// 				 facebookConnectPlugin.api('me?fields=id,name,birthday,hometown,gender,email', null,
			// 				 function(response) {
			// 					 mixpanel.identify(consoles.id);
			// 					 mixpanel.people.set({
			// 						 "$email": consoles.attributes.email,
			// 						 "$gender": consoles.attributes.gender,
			// 						 "$created":consoles.attributes.createdAt,
			// 						 "$birthday":consoles.attributes.birthday,
			// 						 "$name": consoles.attributes.name,
			// 						 "$typeLogin": "Facebook"
      //
			// 					 });
			// 						 userObject.set('name', response.name);
			// 						 userObject.set('birthday', response.birthday);
			// 						 userObject.set('gender', response.gender);
			// 						 userObject.set('hometown', response.hometown);
			// 						 userObject.save();
			// 				 },
			// 				 function(error) {
			// 												 console.log(error);
			// 				 })
			// 	 })
			//  }, 1000);

	 };
 // //===============/LOGIN WITH FB==========//
})


.controller('TutorialCostumer', function($scope, $ionicPopover) {




//CustomerF.push(snapshot.val()[x]);
	// Parse.Cloud.run('GetCustomer', {},{
	// 	success:function (results) {
	// 		console.log(results);
	// 		var Result = results
	// 		for (g in Result) {
	// 			Result[g]["suma"] = Result[g]["promo"] +  Result[g]["coupon"]
	// 		}
	// 		$scope.TutorialPromotion = Result
	// 	},
	// 	error:function (error) {
	// 	 console.log(error);
	// 	}
	// })
	//[{"Category":"Restaurantes","NameCategory":"Mr-Sushi","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-3a4902eb-7c6a-4419-84fe-93d852ffec9e-logo%20mr%20sushi.png","oferta":"existe","promedio":15,"promo":1,"suma":1},{"Category":"Restaurantes","NameCategory":"Dominos","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-5814f869-746e-4030-a5d7-17616c55870a-220x220.jpg","oferta":"existe","promedio":59,"promo":3,"suma":3},{"Category":"Restaurantes","NameCategory":"MARGHERITA","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-52085c6c-ffb3-4739-a50b-43f81e54173a-Logo_Margherita_converted.png","oferta":"existe","promedio":52,"promo":2,"suma":2},{"Category":"Restaurantes","NameCategory":"Astoria","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-35023ccc-d86e-43ec-929f-12999efb0480-LOGO.png","oferta":"existe","promedio":0,"promo":0,"suma":0},{"Category":"Restaurantes","NameCategory":"ALTUNA","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-d3818ae3-0aae-403b-b84d-d59c60c98bfe-imagen%202%2072%20dpi-01.jpg","oferta":"existe","promedio":0,"promo":0,"suma":0},{"Category":"Restaurantes","NameCategory":"Don-Carnitas","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-aafa6d05-f2d6-4227-b037-92be2848e58d-Nuestro%20Logo.jpg","oferta":"existe","promedio":24.67,"promo":3,"suma":3},{"Category":"Moda","NameCategory":"MNG","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-bdaee8f4-36f2-4cd5-ba9b-2a7909065e81-logoMNGBjpg_converted.jpg","oferta":"existe","promedio":0,"promo":0,"suma":0},{"Category":"Moda","NameCategory":"Piel-De-Toro","colorHeart":"red","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-66f5b440-3f8b-4002-a89e-b587fb9a14d2-rsz_logo_piel.png","oferta":"existe","promedio":892.5,"promo":4,"suma":4},{"Category":"Moda","NameCategory":"Claire's","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-bddb919b-4a61-4fb7-bd36-bbcf1bf4debe-claire.jpg","oferta":"existe","promedio":0,"promo":0,"suma":0},{"Category":"Moda","NameCategory":"TIFFANY-HAIR-FASHION","colorHeart":"white","coupon":0,"lastText":"favorite","name":"http://files.parsetfss.com/7b5cc5e4-dfc9-487f-a0f2-a0984ed5cc24/tfss-d54c21…4299-9510-6f9cd80e8004-10991123_1074933285855798_5623932414552156501_n.png","oferta":"existe","promedio":0,"promo":0,"suma":0}]
});
