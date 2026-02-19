const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `${note} <button onclick="deleteNote(${index})">X</button>`;
    notesList.appendChild(div);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const text = noteInput.value.trim();
  if (text === "") return;
  notes.push(text);
  noteInput.value = "";
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

renderNotes();
