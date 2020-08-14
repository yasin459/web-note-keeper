
var notesContainer = document.getElementsByClassName("notes")[0];

function openNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "200px";
}

function closeNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "0";
}

var sidebarItems = document.getElementsByClassName("sidebarItem");

for (let i = 0; i < sidebarItems.length; i++) {
  if (screen.width <= 600) {
    sidebarItems[i].addEventListener("click", (e) => {
      e.preventDefault();
      closeNav();
    });
  }
}

var notesSidebarItem = sidebarItems[0];
var archiveSidebarItem = sidebarItems[1];
var pinSidebarItem = sidebarItems[2];
var binSidebarItem =sidebarItems[3];


notesSidebarItem.addEventListener('click', (e) => {
  notesSidebarItem.classList.add('active')
  archiveSidebarItem.classList.remove('active')
  binSidebarItem.classList.remove("active")
  pinSidebarItem.classList.remove("active")
  document.getElementsByClassName('noteForm')[0].style.display = 'block'
  getNotes("notes")
})

archiveSidebarItem.addEventListener('click', (e) => {
  archiveSidebarItem.classList.add('active')
  notesSidebarItem.classList.remove('active')
  binSidebarItem.classList.remove('active')
  pinSidebarItem.classList.remove("active")
  document.getElementsByClassName('noteForm')[0].style.display = 'none'
  getNotes("archive")
})

binSidebarItem.addEventListener("click",(e)=>{
  binSidebarItem.classList.add('active')
  notesSidebarItem.classList.remove('active')
  archiveSidebarItem.classList.remove('active')
  pinSidebarItem.classList.remove("active")
  document.getElementsByClassName('noteForm')[0].style.display = 'none'
  getNotes("bin")
})

pinSidebarItem.addEventListener("click",(e)=>{
  binSidebarItem.classList.remove('active')
  notesSidebarItem.classList.remove('active')
  archiveSidebarItem.classList.remove('active')
  pinSidebarItem.classList.add("active")
  document.getElementsByClassName('noteForm')[0].style.display = 'none'
  getNotes("pin")
})
var notesToShow = [];


function addNote(title, body, color, id) {
  var noteCard = document.createElement("div");
  noteCard.style.backgroundColor = color;

  var img = document.createElement("img"); 
  img.src = "jack.jpg"; 
  if(id >=10) noteCard.appendChild(img)

  var titleText = document.createTextNode(title);
  var noteTitle = document.createElement("h4");
  noteTitle.appendChild(titleText);
  noteTitle.style.marginTop = 0;

  var bodyText = document.createTextNode(body);
  var noteBody = document.createElement("span");
  noteBody.appendChild(bodyText);

  var noteFooter = document.createElement("div");
  noteFooter.style.display = "flex";
  noteFooter.style.flexDirection = "row";
  noteFooter.style.justifyContent = "center";
  noteFooter.style.marginLeft = 0;

  var pinButton = document.createElement("button");
  var pinIcon = document.createElement("i");
  pinButton.className = "iconButton";
  pinIcon.className = "material-icons";
  var pinText = document.createTextNode("push_pin");
  pinIcon.appendChild(pinText);
  pinButton.appendChild(pinIcon);
  noteFooter.appendChild(pinButton);

  var binButton = document.createElement("button");
  var binIcon = document.createElement("i");
  binButton.className = "iconButton";
  binIcon.className = "material-icons";
  var binText = document.createTextNode("delete");
  binIcon.appendChild(binText);
  binButton.appendChild(binIcon);
  noteFooter.appendChild(binButton);

  var archiveButton = document.createElement("button");
  var archiveIcon = document.createElement("i");
  archiveButton.className = "iconButton";
  archiveIcon.className = "material-icons";
  var archiveText = document.createTextNode("archive");
  archiveIcon.appendChild(archiveText);
  archiveButton.appendChild(archiveIcon);
  noteFooter.appendChild(archiveButton);

  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteBody);
  noteCard.appendChild(noteFooter);

  archiveButton.addEventListener("click", (e) => {
    postNote(title, body, color, id,"archive")
    deleteNote(id,"notes");
  });
  pinButton.addEventListener("click",(e)=>{
    postNote(title, body, color, id,"pin")
    deleteNote(id,"notes");
  })
  binButton.addEventListener("click",(e)=>{
    postNote(title, body, color, id,"bin")
    deleteNote(id,"notes");
  })

  notesContainer.insertBefore(noteCard, notesContainer.firstChild);
}

var selectedColor = null;
var colorPickerButton = document.getElementsByClassName("iconButton")[0];
colorPickerButton.addEventListener("click", (e) => {
  e.preventDefault();
  var picker = new Picker(colorPickerButton);
  picker.onDone = function (color) {
    selectedColor = color.hex;
  };
});
var imagePickerButton = document.getElementsByClassName("iconButton")[1];
imagePickerButton.addEventListener("click",(e)=>{
  var picker = new Picker()
})
var noteTitleInput = document.getElementById("noteTitleInput");
var noteBodyInput = document.getElementById("noteBodyInput");

function submitForm(e) {
  e.preventDefault();
  if (noteTitleInput.value !== "" || noteBodyInput.value !== "") {
    addNote(noteTitleInput.value, noteBodyInput.value, selectedColor);
    postNote(noteTitleInput.value, noteBodyInput.value, selectedColor,null,"notes");
    console.log("after")
    noteTitleInput.value = "";
    noteBodyInput.value = "";
    selectedColor = null;
  }
}

function showNotes() {
  notesContainer.innerHTML = "";
  notesToShow.forEach((note) =>
    addNote(note.title, note.text, note.color, note.id)
  );
}


var noteFormSubmitButton = document.querySelector("input[type=submit]");
noteFormSubmitButton.addEventListener("click", submitForm);

function getNotes(type) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      showNotes()
    }
  };
  xhttp.open("GET", `http://localhost:3000/${type}`, true);
  xhttp.send();
}



getNotes("notes");

function postNote(noteTitle, noteBody, color,id,type) {
  console.log("before: "+ id)
  console.log("before: "+ type)

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `http://localhost:3000/${type}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    id:id,
    title: noteTitle,
    text: noteBody,
    color: color,
  };
  xhttp.send(JSON.stringify(data));
}
function deleteNote(id,type) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/${type}/${id}`, true);
  xhttp.send();
}