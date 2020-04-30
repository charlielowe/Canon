var button = document.querySelector(".update");
var firestore = firebase.firestore();
const outputText = document.querySelector(".outputText");
const nospace = document.querySelector(".nospace");
const photo = document.querySelector(".photo");
const bio = document.querySelector(".bio");

/*Sign out*/
function signOut() {
  firebase.auth().signOut();
}

/*Update user*/
button.addEventListener("click", function () {
  //console.log(firebase.auth().currentUser.uid);
  var docRef = firestore.doc("users/" + firebase.auth().currentUser.uid);
  docRef
    .set({
      username: username.value,
      bio: bio.value,
      pfp: photo.value,
    })
    .then(function () {
      outputText.textContent = "Success!";
    })
    .catch(function (error) {
      outputText.textContent = error;
    });
});

/*Prevents entering spaces*/
nospace.addEventListener("keypress", function (event) {
  var key = event.keyCode;
  if (key === 32) {
    event.preventDefault();
  }
});

/*Get profile*/
function load() {
  var docRef = firestore
    .collection("users")
    .doc(firebase.auth().currentUser.uid);
  docRef
    .get()
    .then(function (doc) {
      username.value = doc.data().username;
      bio.value = doc.data().bio;
      photo.value = doc.data().pfp;
      console.log("Profile loaded.");
    })
    .catch(function (error) {
      outputText.textContent = error;
    });
}

/*Check state*/
firebase.auth().onAuthStateChanged((result) => {
  if (result == null) {
    window.location.replace("index.html");
  } else {
    load();
    //console.log(result);
  }
});
