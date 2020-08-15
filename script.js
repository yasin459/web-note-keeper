var allNotesContainer = document.getElementsByClassName("notes");
var allNotes=[];
// var notesContainer = document.getElementsByClassName("notes")[0];

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


function addNote(title, body, color, id,type) {
  var noteCard = document.createElement("div");
  noteCard.style.backgroundColor = color;
  
  
  if(imageSrc!==undefined && imageSrc!==null)
{
 
 
    // console.log(" image:   " +image_src)
    
    var img = document.createElement("img"); 
    img.src=imageSrc
    
    // console.log(img.src = image)
    console.log(" img:   "+img)
    noteCard.appendChild(img)
    console.log("bbbbaaaaaah")
  
  }
  

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
  console.log(id)
  archiveButton.addEventListener("click", (e) => {
    postNote(title, body, color, id,"archive")
    // if(notesSidebarItem.classList.contains("active"))
    deleteNote(id,type);
  });
  pinButton.addEventListener("click",(e)=>{
    postNote(title, body, color, id,"pin")
    deleteNote(id,type);
  })
  binButton.addEventListener("click",(e)=>{
    postNote(title, body, color, id,"bin")
    deleteNote(id,type);
  })
  allNotes.push(noteCard)
  // notesContainer.insertBefore(noteCard, notesContainer.firstChild);
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
// const reader = new FileReader();

var selectedImage =null;
var imagePickerButton = document.getElementsByClassName("iconButton")[1];
var imageSrc=null;
const reader = new FileReader();
var fileInput = document.createElement('input');
fileInput.type = 'file';
// const fileInput = document.getElementById("file");
// const img = document.getElementById("img");
reader.onload = e => {
  // console.log("title ::::::"+title)
  imageSrc = e.target.result;
  console.log("did it????")
}
fileInput.addEventListener('change', e => {
  selectedImage = e.target.files[0];
  reader.readAsDataURL(selectedImage);
})
imagePickerButton.addEventListener("click",(e)=>{
    fileInput.click();
})

var noteTitleInput = document.getElementById("noteTitleInput");
var noteBodyInput = document.getElementById("noteBodyInput");

function submitForm(e) {
  e.preventDefault();
  console.log("image in submit form : "+selectedImage)
  if (noteTitleInput.value !== "" || noteBodyInput.value !== "") {
    addNote(noteTitleInput.value, noteBodyInput.value, selectedColor,null,"notes");
    addDivsToCol();
    postNote(noteTitleInput.value, noteBodyInput.value, selectedColor,null,"notes");
    console.log("after")
    noteTitleInput.value = "";
    noteBodyInput.value = "";
    selectedColor = null;
    selectedImage=null;
    imageSrc=null;
  }
}

function showNotes() {
  console.log("shownote : enter")
  console.log("notes to show "+notesToShow)
  allNotes=[]
  console.log("before " +allNotes)
  notesToShow.forEach((note) =>{
    imageSrc=note.image
      addNote(note.title, note.text, note.color, note.id,note.type)
  });
  
  console.log(allNotes)
  addDivsToCol();
}


var noteFormSubmitButton = document.querySelector("input[type=submit]");
noteFormSubmitButton.addEventListener("click", submitForm);

function getNotes(type) {
  console.log("entering get note")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      console.log(notesToShow)
      showNotes()
    }
  };
  console.log("before get")
  xhttp.open("GET", `http://localhost:3000/${type}`, true);
  console.log("after get before send")
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
    image : imageSrc,
    type : type,
  };
  console.log("this is image src: "+imageSrc)
  xhttp.send(JSON.stringify(data));
}
function deleteNote(id,type) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/${type}/${id}`, true);
  xhttp.send();
}


var elements = document.getElementsByClassName("column notes grabbable-grid");
var state = 4
// Declare a loop variable
var i;

function addDivsToCol(){
  console.log("all note : " +allNotes)
  for (myObj of allNotesContainer) {
    myObj.innerHTML=""
  }
  if(state===1){
    var container1=allNotesContainer[0]
    for (note of allNotes) {
      container1.appendChild(note)
    }
  }else if(state===2){
    var container1=allNotesContainer[0]
    var container2=allNotesContainer[1]
    var temp=0
    for (note of allNotes) {
      if(temp===0){
        temp=1
        container1.appendChild(note)
      }else{
        temp=0
        container2.appendChild(note)
      }
    }

  }else if(state===4){
    var container1=allNotesContainer[0]
    var container2=allNotesContainer[1]
    var container3=allNotesContainer[2]
    var container4=allNotesContainer[3]
    var temp=0
    for (note of allNotes) {
      if(temp===0){
        temp=1
        container1.appendChild(note)
      }else if(temp===1){
        temp=2
        container2.appendChild(note)
      }else if(temp===2){
        temp=3
        container3.appendChild(note)
      }else {
        temp=0
        container4.appendChild(note)
      }
    }
  }
  console.log(" add div ended")
}
// Full-width images
function one() {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "100%";  // IE10
    elements[i].style.flex = "100%";
  }
}

// Two images side by side
function two() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "35%";  // IE10
    elements[i].style.flex = "35%";
  }
}

// Four images side by side
function four() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "16%";  // IE10
    elements[i].style.flex = "16%";
  }
}

// Add active class to the current button (highlight it)
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    if(i===0) state=1;
    if(i===1) state=2;
    if(i===2) state=3;
    var current = document.getElementsByClassName("btn active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}