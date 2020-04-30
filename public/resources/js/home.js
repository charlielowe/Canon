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

  var storageRef = firebase
    .storage()
    .ref("images/" + firebase.auth().currentUser.uid + "/" + postId);

  storageRef.put(file);
});

/* 
Uploads post using the url from images

Posts don't work atm 

async function sendPost() {
  var url =
    "https://firebasestorage.googleapis.com/v0/b/canon-d4c8a.appspot.com/o/images/" +
    firebase.auth().currentUser.uid +
    "/" +
    postId;
  console.log(url);
  docRef = firestore.doc(
    "posts/" + firebase.auth().currentUser.uid + "/" + postId
  );
  docRef
    .set({
      picture: url,
      caption: captions.value,
    })
    .catch(function (error) {
      console.log(error);
    });
}
*/
