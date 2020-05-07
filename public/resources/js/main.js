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
          bio: "Hello, I'm new",
          pfp:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Temp_plate.svg/601px-Temp_plate.svg.png",
        })
        .then(function () {
          /*
          TODO: Unique usernames
          */
          console.log("good");
          window.location.replace("profile.html");
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
      window.location.replace("profile.html");
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
    //window.location.replace("profile.html");
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
