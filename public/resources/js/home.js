/*Check state*/
firebase.auth().onAuthStateChanged((result) => {
  if (result == null) {
    window.location.replace("index.html");
  }
});

/*Uploading images*/
var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var postId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  console.log(postId);

  var storageRef = firebase
    .storage()
    .ref("images/" + firebase.auth().currentUser.uid + "/" + postId);

  storageRef.put(file);
});

/*Uploads post using the url from images*/

