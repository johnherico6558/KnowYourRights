// Quiz Data
var questions = [
	{
		question: "Everyone has the right to go to school.",
		answer: true,
		explanation: "Education is a basic human right."
	},
	{
		question: "It is acceptable to discriminate against someone because of their religion.",
		answer: false,
		explanation: "People should not be treated unfairly because of their religion."
	},
	{
		question: "Every child has the right to protection and care.",
		answer: true,
		explanation: "Children deserve safety, care, and support."
	},
	{
		question: "Freedom of speech allows people to harm others with hateful speech.",
		answer: false,
		explanation: "Freedom of speech does not mean hurting others or spreading hate."
	},
	{
		question: "Everyone should be treated equally under the law.",
		answer: true,
		explanation: "Equality under the law means everyone should be treated fairly."
	}
];

// Quiz state variables
var currentQuestion = 0;
var score = 0;
var answered = false;

// Select HTML Elements
var questionText = document.getElementById("question-text");
var trueButton = document.getElementById("true-button");
var falseButton = document.getElementById("false-button");
var feedback = document.getElementById("feedback");
var nextButton = document.getElementById("next-button");
var restartButton = document.getElementById("restart-button");
var scoreText = document.getElementById("score-text");

// Display Question
function showQuestion() {
	// Reset the quiz area before showing the next question.
	answered = false;
	feedback.textContent = "";
	feedback.style.color = "";
	scoreText.textContent = "";
	nextButton.hidden = true;
	restartButton.hidden = true;
	trueButton.disabled = false;
	falseButton.disabled = false;

	if (currentQuestion >= questions.length) {
		showFinalScore();
		return;
	}

	var question = questions[currentQuestion];
	questionText.textContent = (currentQuestion + 1) + ". " + question.question;
}

// Check Answer
function checkAnswer(userChoice) {
	if (answered) {
		return;
	}

	answered = true;
	trueButton.disabled = true;
	falseButton.disabled = true;

	var question = questions[currentQuestion];
	var isCorrect = userChoice === question.answer;

	if (isCorrect) {
		score = score + 1;
		feedback.textContent = "Correct!";
		feedback.style.color = "green";
	} else {
		feedback.textContent = "Incorrect!";
		feedback.style.color = "red";
	}

	feedback.textContent += " " + question.explanation;
	scoreText.textContent = "Score: " + score + " / " + questions.length;

	nextButton.hidden = false;
	if (currentQuestion === questions.length - 1) {
		nextButton.textContent = "See Results";
	} else {
		nextButton.textContent = "Next Question";
	}
}

// Next Question
nextButton.addEventListener("click", function () {
	if (currentQuestion < questions.length - 1) {
		currentQuestion = currentQuestion + 1;
		showQuestion();
	} else {
		showFinalScore();
	}
});

// Show Final Score
function showFinalScore() {
	questionText.textContent = "Quiz Complete!";
	feedback.textContent = "";
	scoreText.textContent = "Your final score is " + score + " out of " + questions.length + ".";
	nextButton.hidden = true;
	trueButton.disabled = true;
	falseButton.disabled = true;
	restartButton.hidden = false;

	var message = "";

	if (score === questions.length) {
		message = "Excellent! You know your rights very well.";
	} else if (score >= questions.length / 2) {
		message = "Great job! You understand many important rights.";
	} else {
		message = "You are learning. Keep practicing and reading about human rights.";
	}

	feedback.textContent = message;
	feedback.style.color = "blue";
}

// Restart Quiz
function restartQuiz() {
	currentQuestion = 0;
	score = 0;
	answered = false;
	showQuestion();
}

restartButton.addEventListener("click", restartQuiz);

// Event listeners for answer buttons
trueButton.addEventListener("click", function () {
	checkAnswer(true);
});

falseButton.addEventListener("click", function () {
	checkAnswer(false);
});

// Start the quiz
showQuestion();
