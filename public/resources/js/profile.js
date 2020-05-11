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
    var counter = 0;
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var temp = document.getElementsByTagName("template")[0];
          var clon = temp.content.cloneNode(true);
          document.body.querySelector("#gal").append(clon);
          document.getElementsByClassName("galimg")[
            counter
          ].src = doc.data().picture;

          var modal = document.getElementById("myModal");

          // Get the image and insert it inside the modal - use its "alt" text as a caption
          var img = document.getElementsByClassName("Img");
          var modalImg = document.getElementById("img01");
          var captionText = document.getElementById("caption");

          var body = document.querySelector(body);
          document
            .getElementsByClassName("galimg")
            [counter].addEventListener("click", function () {
              modal.style.display = "block";
              modalImg.src = this.src;
              captionText.innerHTML = this.alt;
            });

          modalImg.onclick = function () {
            modal.style.display = "none";
          };
          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];
          counter += 1;
        });
      });
  }
});
