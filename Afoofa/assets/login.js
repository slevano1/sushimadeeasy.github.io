
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmRmKBcQXTh21nByDlywCtanlrlLO9ESY",
    authDomain: "login-40fe2.firebaseapp.com",
    databaseURL: "https://login-40fe2.firebaseio.com",
    projectId: "login-40fe2",
    storageBucket: "",
    messagingSenderId: "1084137670775"
  };
  firebase.initializeApp(config);
  //get elements
  var txtEmail = document.getElementById('txtEmail');
  var txtPassword = document.getElementById('txtPassword');
  var btnLogin = document.getElementById('btnLogin');
  var btnSignUp = document.getElementById('btnSignUp');
  var btnLogout = document.getElementById('btnLogout');
  //add login event
  btnLogin.addEventListener('click',function(){
    //get email and pass
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    //sign in
    var promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
  });
    //add sign up
    btnSignUp.addEventListener('click', function(){
        //get email and pass
        //to do: check for real email
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    //sign in
    var promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
    });
    btnLogout.addEventListener('click', function(){
        firebase.auth().signOut();
    });
    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
    } else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
    }
    });