const docs = [
  "Madanapalle Institute of Technology and Science also known as MITS is a Deemed to be University located in Madanapalle Andhra Pradesh.",
  "MITS was established in 1998 and became a Deemed to be University in the year 2020.",
  "MITS offers undergraduate postgraduate and doctoral programs in engineering technology management and sciences.",
  "The major departments in MITS include Computer Science Engineering Artificial Intelligence Data Science Electronics and Communication Electrical Mechanical Civil and MBA.",
  "MITS has excellent infrastructure including modern classrooms advanced laboratories central library and research centers.",
  "The central library of MITS contains thousands of books journals research papers and digital learning resources.",
  "MITS provides on campus hostel facilities for both boys and girls with good accommodation and food services.",
  "The placement cell of MITS provides strong career opportunities and training for students with many top recruiters visiting the campus.",
  "Top recruiting companies visiting MITS include TCS Infosys Wipro Accenture Capgemini Cognizant and many startups.",
  "MITS conducts various technical cultural and sports events including the annual techno cultural fest ASHV.",
  "MITS encourages students to participate in hackathons research projects innovation challenges and startup incubation programs.",
  "The campus of MITS is eco friendly and spread across a large green area providing a peaceful learning environment.",
  "MITS follows outcome based education and focuses on skill development industry exposure and holistic growth.",
  "The university supports student clubs technical societies coding communities robotics clubs and entrepreneurship cells."
];
const index = {};
const input = document.getElementById("query");
const results = document.getElementById("results");

function tokenize(text){
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function buildIndex(){
  docs.forEach((doc, id) => {
    tokenize(doc).forEach(word => {
      if(!index[word]) index[word] = [];
      index[word].push(id);
    });
  });
}

function search(q){
  results.innerHTML = "";
  if(!q) return;

  const words = tokenize(q);
  const score = {};

  words.forEach(w => {
    (index[w] || []).forEach(id => {
      score[id] = (score[id] || 0) + 1;
    });
  });

  Object.entries(score)
    .sort((a,b) => b[1] - a[1])
    .forEach(([id]) => {
      const div = document.createElement("div");
      div.className = "result";
      div.innerHTML = highlight(docs[id], words);
      results.appendChild(div);
    });
}

function highlight(text, words){
  let out = text;
  words.forEach(w => {
    const reg = new RegExp(`(${w})`, "gi");
    out = out.replace(reg, "<mark>$1</mark>");
  });
  return out;
}

input.addEventListener("input", () => {
  search(input.value.trim());
});

buildIndex();