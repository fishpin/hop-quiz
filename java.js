//showQuestion + nextQuestion are built to work regardless of number of questions.
let activeQuestion = 0;
const questionForms = document.querySelectorAll('.questionForms');
const correctAnswers = ['lop','danger','kit','legomorph','broccoli'];


function showQuestion(index) {
    questionForms.forEach(function(q) {q.classList.remove('active');});
    questionForms[index].classList.add('active');
}

function nextQuestion() {

  if (activeQuestion < questionForms.length - 1) {
    activeQuestion++;
    showQuestion(activeQuestion);
  }
  else {
    document.getElementById('results').classList.add('active');
    questionForms[activeQuestion].classList.remove('active');
  }

  quizResult();
}

showQuestion(activeQuestion);

//this block is for score tracking and displaying feedback for users
let score = 0;

function checkAnswer(questionNumber) {
  const selected = document.querySelector(`input[name="q${questionNumber}Answer"]:checked`);

  if (!selected) {
    document.getElementById(`q${questionNumber}Result`).textContent = "Please select an answer.";
    return;
  }

  const correctAnswer = correctAnswers[questionNumber - 1];
  
  if (selected.value === correctAnswer) {
    document.getElementById(`q${questionNumber}Result`).textContent = "Correct!";
    score++;
  } 
  else {
    document.getElementById(`q${questionNumber}Result`).textContent = "Incorrect.";
  }

  document.getElementById(`submitQ${questionNumber}`).disabled = true;

  const nextButtonId =
    questionNumber === 5 ? "goToResult" : `goToQ${questionNumber + 1}`;

  const nextButton = document.getElementById(nextButtonId);
  if (nextButton) {
    nextButton.disabled = false;
 }
}

//Displaying the final score for user
const quizScore = document.getElementById('quizScore');

function quizResult() {
    if (score === 0) {
        quizScore.textContent = "Uh oh, you got 0 / 5. Want to play again?";
    }
    else if (score === 1) {
        quizScore.textContent = "You got 1 / 5. Give it another try!";
    }
    else if (score === 2) {
        quizScore.textContent = "You got 2 / 5. Give it another try!";
    }
    else if (score === 3) {
        quizScore.textContent = "You got 3 / 5. Want to try again?";
    }
    else if (score === 4) {
        quizScore.textContent = "You got 4 / 5. Want to try again?";
    }
    else if (score === 5) {
        quizScore.textContent = "Nice work! You got 5 / 5."
    }
}

//Function to reset score, enabled/disabled and active elements on click
const reset = document.getElementById('reset');

function startOver() {
  score = 0;
  activeQuestion = 0;

  document.getElementById('results').classList.remove('active');

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`submitQ${i}`).disabled = false;
    document.getElementById(`q${i}Result`).textContent = "";
    
    const checked = document.querySelector(`input[name="q${i}Answer"]:checked`);
    if (checked) checked.checked = false;
  }

  for (let i = 1; i <= 4; i++) {
    const nextBtn = document.getElementById(`goToQ${i + 1}`);
    if (nextBtn) nextBtn.disabled = true;
  }

  document.getElementById('goToResult').disabled = true;

  showQuestion(activeQuestion);
}
