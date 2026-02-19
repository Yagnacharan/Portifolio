const quizData = [
  {
    question: "What does the clutch pedal do in a manual car?",
    options: ["Stops engine", "Disconnects engine from gearbox", "Applies brakes", "Controls fuel"],
    answer: 1
  },
  {
    question: "Which gear provides maximum torque?",
    options: ["1st Gear", "3rd Gear", "5th Gear", "Reverse"],
    answer: 0
  },
  {
    question: "What happens if you release the clutch too fast?",
    options: ["Smooth start", "Engine stall", "Better mileage", "Higher speed"],
    answer: 1
  },
  {
    question: "What is engine braking?",
    options: ["Using engine to slow vehicle", "Brake failure", "High RPM driving", "Fuel cut-off"],
    answer: 0
  },
  {
    question: "Which gear is best for overtaking?",
    options: ["Highest gear", "Neutral", "Lower gear", "Reverse"],
    answer: 2
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");

function loadQuestion() {
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";

  const q = quizData[current];
  questionEl.textContent = q.question;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(btn, index) {
  const correct = quizData[current].answer;

  if (index === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }

  Array.from(optionsEl.children).forEach(b => b.disabled = true);

  nextBtn.style.display = "block";
}

function nextQuestion() {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionEl.textContent = "🏁 Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreBox.innerHTML = `Your Score: <b>${score} / ${quizData.length}</b>`;
}

loadQuestion();
