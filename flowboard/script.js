let tasks = JSON.parse(localStorage.getItem("flowTasks")) || [];

const input = document.getElementById("taskInput");

input.addEventListener("keydown", e => {
  if(e.key === "Enter" && input.value.trim()){
    addTask(input.value.trim());
    input.value="";
  }
});

function addTask(text){
  tasks.push({
    id: Date.now(),
    text,
    status:"todo",
    created:Date.now()
  });
  save();
}

function save(){
  localStorage.setItem("flowTasks", JSON.stringify(tasks));
  render();
}

function render(){
  document.querySelectorAll(".list").forEach(l => l.innerHTML="");

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${priority(task.created)}`;
    div.textContent = task.text;
    div.draggable = true;

    div.ondragstart = e => {
      e.dataTransfer.setData("id", task.id);
    };

    document.querySelector(`[data-status="${task.status}"] .list`)
      .appendChild(div);
  });
}

document.querySelectorAll(".column").forEach(col => {
  col.ondragover = e => e.preventDefault();

  col.ondrop = e => {
    const id = e.dataTransfer.getData("id");
    const task = tasks.find(t => t.id == id);
    task.status = col.dataset.status;
    save();
  };
});

function priority(time){
  const hrs = (Date.now()-time)/3600000;
  if(hrs < 6) return "low";
  if(hrs < 24) return "medium";
  return "high";
}

render();
