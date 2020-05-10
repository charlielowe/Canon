
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName("Img");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var counter = 0;
var body=document.querySelector(body);
for (i=0; i<img.length; i++){
    
    
    img[i].addEventListener("click", function(){
        
        
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        
    });

   
}


modalImg.onclick = function() { 
    modal.style.display = "none";
  }
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal


