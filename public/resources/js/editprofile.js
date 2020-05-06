var button = document.querySelector(".update");
var firestore = firebase.firestore();
const outputText = document.querySelector(".outputText");
const nospace = document.querySelector(".nospace");
const photo = document.querySelector(".photo");
const bio = document.querySelector(".bio");
const username = document.querySelector(".username");

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
      pfp: downloadURLFunc.downloadURL,
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
firebase.auth().onAuthStateChanged((result) => {
  if (result) {
    var userId = firebase.auth().currentUser.uid;
    var docRef = firebase.firestore().collection("users").doc(userId);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:");
          bio.value = doc.data().bio;
          username.value = doc.data().username;
          downloadURLFunc.downloadURL = doc.data().pfp;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
function downloadURLFunc(downloadURL) {
  downloadURLFunc.downloadURL = downloadURL;
}
/*Uploading images*/
var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function (e) {
  var postId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  var file = e.target.files[0];
  console.log(postId);

  var storageRef = firebase.storage().ref();

  var imagesRef = storageRef.child(
    "pfp/" + firebase.auth().currentUser.uid + "/" + postId
  );

  var uploadTask = imagesRef.put(file);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      console.log(error);
    },
    function () {
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          console.log("File available at", downloadURL);
          downloadURLFunc(downloadURL);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
});
