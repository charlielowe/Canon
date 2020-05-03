var caption = document.querySelector(".captionBox");
var firestore = firebase.firestore();
/*Check state*/
firebase.auth().onAuthStateChanged((result) => {
  if (result == null) {
    window.location.replace("index.html");
  }
});
var postId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

/*Uploading images*/
var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function (e) {
  var file = e.target.files[0];
  console.log(postId);

  var storageRef = firebase.storage().ref();

  var imagesRef = storageRef.child(
    "images/" + firebase.auth().currentUser.uid + "/" + postId
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
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);

        docRef = firebase
          .firestore()
          .collection("posts/")
          .doc(firebase.auth().currentUser.uid);
        docRef
          .set({
            picture: downloadURL,
            caption: caption.value,
            uid: postId,
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  );
});
