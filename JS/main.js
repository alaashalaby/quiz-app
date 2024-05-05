let userName = document.getElementById("name");
let startBtn = document.querySelector(".start_btn");
let form = document.querySelector("form");
let errorMessage = document.querySelector(".error-message");
let startBox = document.querySelector(".start_box");
let rulesBox = document.querySelector(".rules_box");
let quizBox = document.querySelector(".quiz_box");
let answersList = document.querySelector(".answers_list");
let exitBtn = document.querySelector(".exit_btn");
let continueBtn = document.querySelector(".continue_btn");
let nextBtn = document.querySelector(".next_btn");
let totalQuestion = quizBox.querySelector(".total_question");
let timer = document.querySelector(".timer");

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
  }
};
