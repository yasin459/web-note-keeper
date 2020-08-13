var noteBodyInput = document.getElementById("noteBodyInput");
var noteTitleInput = document.getElementById("noteTitleInput");
var noteFormFooter = document.querySelector("div.formFooter");
noteBodyInput.addEventListener("focus", () => {
  noteTitleInput.style.display = "block";
  noteFormFooter.style.display = "flex";
  noteBodyInput.focus();
});
document.addEventListener('click', function(event) {
  var isClickInside = document.getElementsByClassName("noteForm")[0].contains(event.target);
  if (!isClickInside) {
    noteTitleInput.style.display = "none";
  noteFormFooter.style.display = "none";
  }
});
