var optionBox = document.getElementById("optionBox");
var loginBox = document.getElementById("loginBox");
var signupBox = document.getElementById("signupBox");
var register = document.querySelector(".signup");
var login = document.querySelector(".login");
var signout = document.querySelector(".signout");
var firestore = firebase.firestore();
var nospace = document.getElementsByClassName("nospace");

function hider(option) {
  optionBox.style.visibility = "hidden";
  if (option == "login") {
    loginBox.style.visibility = "visible";
    signupBox.style.visibility = "hidden";
  } else {
    loginBox.style.visibility = "hidden";
    signupBox.style.visibility = "visible";
  }
}

/*Register*/
register.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = register.email.value;
  const password = register.password.value;
  const username = register.username.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      docRef = firestore.doc("users/" + result.user.uid);
      docRef
        .set({
          username: username,
          bio: null,
          pfp: null,
        })
        .then(function () {
          /*
          TODO: Unique usernames
          */
          console.log("good");
          window.location.replace("editprofile.html");
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});

/*Login*/
login.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = login.email.value;
  const password = login.password.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      login.reset();
      login.querySelector(".error").textContent = "Success";
      window.location.replace("editprofile.html");
    })
    .catch((e) => {
      login.querySelector(".error").textContent = e.message;
    });
});

/*User state*/
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    login.classList.add("hidden");
    register.classList.add("hidden");
    window.location.replace("editprofile.html");
  } else {
    login.classList.remove("hidden");
    register.classList.remove("hidden");
  }
});

/*Prevents entering spaces*/
for (i = 0; i < 5; i++) {
  nospace[i].addEventListener("keypress", function (event) {
    var key = event.keyCode;
    if (key === 32) {
      event.preventDefault();
    }
  });
}

/*Check state*/
(function () {
  firebase.auth().onAuthStateChanged((result) => {
    if (result != null) {
      window.location.replace("editprofile.html");
    }
  });
})();
