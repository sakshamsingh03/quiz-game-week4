let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');

let questions = []; 


async function fetchQuestions() {
  const response = await fetch('/questions');
  questions = await response.json();
  displayQuestion(questions[currentQuestionIndex]);
}

function displayQuestion(question) {
  questionElement.textContent = question.question;
  optionsElement.innerHTML = '';  
  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(option, question.answer)); 
    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score++; 
  }

  scoreElement.textContent = `Score: ${score}`;

  setTimeout(nextQuestion, 500);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    alert(`Quiz Over! Your final score is ${score}`);
  }
}

async function startQuiz() {
  await fetchQuestions(); 
}

startQuiz();
