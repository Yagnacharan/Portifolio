const CAPACITY = 5;
let map = {};
let list = [];

function put(){
  const k = key.value.trim();
  const v = value.value.trim();
  if(!k || !v) return alert("Key and Value required");

  if(map[k]){
    list = list.filter(x => x !== k);
  }

  list.unshift(k);
  map[k] = v;

  if(list.length > CAPACITY){
    const removed = list.pop();
    delete map[removed];
  }

  render();
}

function get(){
  const k = key.value.trim();
  if(!map[k]) return alert("Key not found");

  list = list.filter(x => x !== k);
  list.unshift(k);

  alert(`Value = ${map[k]}`);
  render();
}

function render(){
  const box = document.getElementById("cache");
  box.innerHTML="";

  list.forEach(k=>{
    const div = document.createElement("div");
    div.className="node";
    div.textContent = `${k}:${map[k]}`;
    box.appendChild(div);
  });
}
