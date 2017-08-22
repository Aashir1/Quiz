/* ******************************* For Styling ******************************** */

$(function () {
    $('.field-input').focus(function () {
        $(this).parent().addClass('is-focused has-label');
    });

    $('.field-input').blur(function () {
        $parent = $(this).parent();


        if ($(this).val().length === 0) {
            $parent.removeClass('has-label');
        }
        $parent.removeClass('is-focused');
    });
});
var config = {
    apiKey: "AIzaSyCgHLBiynCPsitE3Xvu9dL_gvptznZDrXs",
    authDomain: "twitter-responsive-ui.firebaseapp.com",
    databaseURL: "https://twitter-responsive-ui.firebaseio.com",
    projectId: "twitter-responsive-ui",
    storageBucket: "twitter-responsive-ui.appspot.com",
    messagingSenderId: "690105762097"
};
firebase.initializeApp(config);
var auth = firebase.auth();

// function validateEmail(inputText) {
//     var userInput = document.getElementById(inputText);
//     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (userInput.value.match(mailformat)) {
//         userInput.focus();
//         return true;
//     }
//     else {

//         userInput.focus();
//         return false;
//     }
// }

var email = document.getElementById('email'),
    password = document.getElementById('password'),
    loginBtn = document.getElementById('login'),
    signupBtn = document.getElementById('signup'),
    logoutBtn = document.getElementById('signout');
signupBtn.addEventListener('click', function () {
    email = email.value;
    password = password.value;
    if (validateEmail('email') && password.length > 4) {
        console.log(email, password)
        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            if (error.code === 'auth/weak-password') {
                alert('weak password');
            }
            else {
                alert(error.message);
            }
            console.log(error)
        })
    } else {
        alert('invalid email address detected');
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('email').focus();
    }
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('email').focus();
});


logoutBtn.addEventListener('click', function () {
    firebase.auth().signOut();
});




loginBtn.addEventListener('click', function () {
    // email = email.value;
    // password = password.value;
    // console.log(email, password)

    if (validateEmail('email') && password.value.length > 4) {
        email = email.value;
        password = password.value;
        console.log('this is if ')
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            console.log(error.code, error.message);
            alert(error.message);
        });
    }
    else {
        alert('invalid email or password')
        email= "";
        password = "";
        document.getElementById('email').focus();
    }
    email= "";
    password = "";
    document.getElementById('email').focus();
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        window.location.replace("quiz/index.html");
        logoutBtn.style.display = 'block';
    } else {
        logoutBtn.style.display = 'none';
        // window.location.replace('../index.html')
        console.log('no user logedin');
    }
});

/* ******************************* Validation function ******************************** */
function validateEmail(inputText) {
    var userInput = document.getElementById(inputText);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userInput.value.match(mailformat)) {
        userInput.focus();
        return true;
    }
    else {

        userInput.focus();
        return false;
    }
}

