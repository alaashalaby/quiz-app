let userName = document.getElementById("name");
let startBtn = document.querySelector(".start_btn");
let form = document.querySelector("form");
let errorMessage = document.querySelector(".error-message");
let startBox = document.querySelector(".start_box");
let rulesBox = document.querySelector(".rules_box");
let quizBox = document.querySelector(".quiz_box");
let resultBox = document.querySelector(".result_box");
let answersList = document.querySelector(".answers_list");
let exitBtn = document.querySelector(".exit_btn");
let continueBtn = document.querySelector(".continue_btn");
let nextBtn = document.querySelector(".next_btn");
let restartBtn = document.querySelector(".restart_btn");
let closeBtn =document.querySelector(".close_btn");
let totalQuestion = quizBox.querySelector(".total_question");
let timer = document.querySelector(".timer");
let correctIcon = `<span><i class='bx bx-check icon correct'></i></span>`;
let wrongIcon = `<span><i class='bx bx-x icon wrong'></i></span>`;
let currentQuestionIndex = 0;
let score = 0;
let time = 15;
let timerInterval;

// prevent default behavior of form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// function to show error message
let showErrorMessage = (message) => {
  errorMessage.style.display = "block";
  errorMessage.innerHTML = message;
};

// function to hide error message
let hideErrorMessage = () => {
  errorMessage.style.display = "none";
};

// function to startQuiz
let startQuiz = () => {
  if (userName.value.trim() === "") {
    showErrorMessage("Please Enter a Valid Name");
  } else {
    localStorage.setItem("username", userName.value);
    hideErrorMessage();
    startBox.style.display = "none";
    rulesBox.style.display = "block";
    startTimer(time);
  }
};

// function to exit Quiz
let exitQuiz = () => {
  localStorage.removeItem("username");
  userName.value = "";
  startBox.style.display = "block";
  rulesBox.style.display = "none";
};
startBtn.addEventListener("click", startQuiz);
exitBtn.addEventListener("click", exitQuiz);
// function to start Timer
function startTimer(time) {
  timerInterval = setInterval(() => {
    timer.textContent = time < 10 ? "0" + time : time;
    time--;
    if (time < 0) {
      clearInterval(timerInterval);
      timer.innerHTML = "00";
      autoSelectAnswer();
      setTimeout(nextQuestion, 800);
    }
  }, 1000);
}

// function to automatically select the correct answer when time runs out
function autoSelectAnswer() {
  let answers = answersList.querySelectorAll(".answer");
  let correctAnswer = questions[currentQuestionIndex].correctAnswer;
  answers.forEach((answer) => {
    let selectedAnswer = answer.querySelector("p").innerHTML;
    if (selectedAnswer === correctAnswer) {
      answer.classList.add("correct");
      answer.innerHTML += correctIcon;
    }
    answer.classList.add("disabled");
  });
}

// function to show questions
function showQuestions() {
  let questionText = document.querySelector(".question_text");
  let currentQuestion = questions[currentQuestionIndex];
  questionText.innerHTML = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;
  answersList.innerHTML = "";
  currentQuestion.answers.forEach((answer, i) => {
    let answerContent = `<div class="answer">
                        <p>${answer}</p>
                        </div>`;
    answersList.innerHTML += answerContent;
  });
  let answers = answersList.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.addEventListener("click", () => selectAnswer(answer));
  });
  if(currentQuestionIndex===questions.length-1){
    nextBtn.innerHTML = "Finish Quiz";
  } else {
    nextBtn.innerHTML = "Next Question";
  }
  nextBtn.setAttribute("disabled", true)
}
// function to select correct Answer
function selectAnswer(answer) {
  clearInterval(timerInterval);
  let selectedAnswer = answer.querySelector("p").innerHTML;
  let correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (selectedAnswer === correctAnswer) {
    answer.classList.add("correct");
    answer.innerHTML += correctIcon;
    score++;
  } else {
    answer.classList.add("wrong");
    answer.innerHTML += wrongIcon;
    let correctAnswerIndex = Array.from(answersList.children).findIndex(
      (child) => child.querySelector("p").innerHTML === correctAnswer
    );
    answersList.children[correctAnswerIndex].classList.add("correct");
    answersList.children[correctAnswerIndex].innerHTML += correctIcon;
  }

  let answers = answersList.querySelectorAll(".answer");
  answers.forEach((answer) => {
    answer.classList.add("disabled");
  });

    nextBtn.removeAttribute("disabled");
}

continueBtn.addEventListener("click", () => {
  rulesBox.style.display = "none";
  quizBox.style.display = "block";
  let welcomeMessage = document.querySelector(".welcome_message");
  welcomeMessage.innerHTML = `Welcome, ${localStorage.getItem("username")} 🤩`;
  showQuestions(currentQuestionIndex);
  showTotalQuestion();
});

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestions(currentQuestionIndex);
    showTotalQuestion();
    clearInterval(timerInterval);
    startTimer(time);
  }
  else {
    clearInterval(timerInterval);
    showResult()
  }
}

// display Next question
nextBtn.addEventListener("click", nextQuestion);

// display total question
function showTotalQuestion() {
  totalQuestion.innerHTML = "";
  let totalQuestionContent = `<p><span>${currentQuestionIndex + 1}</span> of <span>${questions.length}</span> Questions</p>`;
  totalQuestion.innerHTML = totalQuestionContent;
}

// function to show result
function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  let congratsText = document.querySelector(".congrats_text");
  let completeQuiz = document.querySelector(".complete_text")
  let scoreText = document.querySelector(".score_text");
  let ballon_1 = document.querySelector(".ballon_1");
  let ballon_2= document.querySelector(".ballon_2");
  congratsText.innerHTML = `Congratulations, ${localStorage.getItem("username")} 🥳!`;
  completeQuiz.innerHTML = `You have completed Quiz ❤️`;
  scoreText.innerHTML = `Your Score is ${score}`;
  if (score > 5) {
    ballon_1.style.display = "block";
    ballon_2.style.display = "block";
  }
}
// close quiz
closeBtn.addEventListener("click", () => {
  // resultBox.style.display = "none";
  // exitQuiz()
  // currentQuestionIndex = 0;
  // score = 0;
  // time = 15;
  // clearInterval(timerInterval);
  // startTimer(time);
  // showQuestions(currentQuestionIndex);
  // showTotalQuestion();
  window.location.href = "index.html"
})

// restart quiz
restartBtn.addEventListener("click", () => {
  quizBox.style.display = "block";
  resultBox.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  time = 15;
  clearInterval(timerInterval);
  startTimer(time);
  showQuestions(currentQuestionIndex);
  showTotalQuestion();
});