// Get the modal
var modal = document.querySelector(".modal-container");

// Get the button that opens the modal
var btn = document.getElementById("mybtn");

// Get the close button
var closeBtn = document.getElementById("close");

// Apply CSS styles to the modal
modal.style.display = "none"; // Initially hide the modal
modal.style.position = "fixed";
modal.style.top = "50%";
modal.style.left = "50%";
modal.style.transform = "translate(-50%, -50%)";
modal.style.padding = "20px";
modal.style.borderRadius = "5px";
modal.style.border = "1px solid #888";

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
