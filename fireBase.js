var app_fireBase = {};


(function(){
    
  
  var firebaseConfig = {
    apiKey: "AIzaSyC44nffvmmBJUMP8LgAkf_p53R79g2kYLI",
    authDomain: "canon-project-454fa.firebaseapp.com",
    databaseURL: "https://canon-project-454fa.firebaseio.com",
    projectId: "canon-project-454fa",
    storageBucket: "canon-project-454fa.appspot.com",
    messagingSenderId: "192527673577",
    appId: "1:192527673577:web:6e5bcb53996525623ca878",
    measurementId: "G-0ZX6TPDRT1"
  };
 
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_fireBase = firebase;
})()
