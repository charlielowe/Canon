firebase.auth().onAuthStateChanged((result) => {
  if (result) {
    var username = document.querySelector("#username");
    var bio = document.querySelector("#bio");
    var photo = document.querySelector("#profpic");
    console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var docRef = firebase.firestore().collection("users").doc(userId);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:");
          bio.textContent = doc.data().bio;
          username.textContent = doc.data().username;
          photo.setAttribute("src", doc.data().pfp);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
