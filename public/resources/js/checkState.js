firebase.auth().onAuthStateChanged((result) => {
  if (!result) {
    window.location.replace("index.html");
  }
});

