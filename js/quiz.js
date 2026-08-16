/* =========================================
   QUIZ QUESTIONS
========================================= */

const questions = [
    {
        question: "What are human rights?",

        answers: [
            "Privileges given only to certain people",
            "Basic freedoms and protections that belong to every person",
            "Rules that only apply to government officials",
            "Rewards people receive for good behavior"
        ],

        correct: 1
    },

    {
        question: "Why is it important for young people to know their rights?",

        answers: [
            "So they can avoid following all rules",
            "So they can make informed choices and speak up when something is unfair",
            "So they can have more rights than adults",
            "So they can decide which laws apply to other people"
        ],

        correct: 1
    },

    {
        question: "Which of the following is an example of respecting another person's rights?",

        answers: [
            "Ignoring someone's opinions because you disagree",
            "Preventing someone from expressing themselves",
            "Listening to others and treating them with dignity",
            "Only respecting people who agree with you"
        ],

        correct: 2
    },

    {
        question: "What should you do if you believe someone's rights are being violated?",

        answers: [
            "Ignore the situation completely",
            "Take revenge against the person responsible",
            "Seek help from a trusted person or appropriate authority",
            "Share unverified information about the situation"
        ],

        correct: 2
    },

    {
        question: "Why should human rights apply equally to everyone?",

        answers: [
            "Because every person has equal human dignity and deserves respect",
            "Because everyone must have exactly the same opinions",
            "Because only certain groups deserve protection",
            "Because rights should depend on a person's popularity"
        ],

        correct: 0
    }
];


/* =========================================
   QUIZ VARIABLES
========================================= */

let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);


/* =========================================
   GET HTML ELEMENTS
========================================= */

const questionNumber =
    document.getElementById("question-number");

const currentQuestionElement =
    document.getElementById("current-question");

const progressPercent =
    document.getElementById("progress-percent");

const progressFill =
    document.getElementById("progress-fill");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const quizCard =
    document.getElementById("quiz-card");

const resultCard =
    document.getElementById("result-card");

const scoreElement =
    document.getElementById("score");

const resultTitle =
    document.getElementById("result-title");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-button");


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    const current = questions[currentQuestion];

    /* Question number */

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    currentQuestionElement.textContent =
        currentQuestion + 1;


    /* Progress */

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressPercent.textContent =
        `${progress}%`;

    progressFill.style.width =
        `${progress}%`;


    /* Question */

    questionElement.textContent =
        current.question;


    /* Clear old answers */

    answersElement.innerHTML = "";


    /* Create answer buttons */

    current.answers.forEach((answer, index) => {

        const answerButton =
            document.createElement("button");

        answerButton.type = "button";

        answerButton.classList.add("answer-option");


        /* Remember selected answer */

        if (userAnswers[currentQuestion] === index) {

            answerButton.classList.add("selected");

        }


        /* Letter */

        const letter =
            document.createElement("span");

        letter.classList.add("answer-letter");

        letter.textContent =
            String.fromCharCode(65 + index);


        /* Answer text */

        const answerText =
            document.createElement("span");

        answerText.classList.add("answer-text");

        answerText.textContent =
            answer;


        answerButton.appendChild(letter);

        answerButton.appendChild(answerText);


        /* Select answer */

        answerButton.addEventListener("click", () => {

            selectAnswer(index);

        });


        answersElement.appendChild(answerButton);

    });


    /* Previous button */

    previousButton.disabled =
        currentQuestion === 0;


    /* Next button */

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "Finish Quiz";

    } else {

        nextButton.textContent =
            "Next Question";

    }

}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(index) {

    userAnswers[currentQuestion] = index;


    const answerButtons =
        document.querySelectorAll(".answer-option");


    answerButtons.forEach((button, buttonIndex) => {

        if (buttonIndex === index) {

            button.classList.add("selected");

        } else {

            button.classList.remove("selected");

        }

    });

}


/* =========================================
   NEXT QUESTION
========================================= */

nextButton.addEventListener("click", () => {

    /* Don't continue without an answer */

    if (userAnswers[currentQuestion] === null) {

        alert("Please choose an answer before continuing.");

        return;

    }


    /* Finish quiz */

    if (currentQuestion === questions.length - 1) {

        showResults();

        return;

    }


    currentQuestion++;

    loadQuestion();

});


/* =========================================
   PREVIOUS QUESTION
========================================= */

previousButton.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});


/* =========================================
   SHOW RESULTS
========================================= */

function showResults() {

    let score = 0;


    /* Calculate score */

    questions.forEach((question, index) => {

        if (userAnswers[index] === question.correct) {

            score++;

        }

    });


    /* Display score */

    scoreElement.textContent =
        score;


    /* Result message */

    if (score === 5) {

        resultTitle.textContent =
            "Excellent!";

        resultMessage.textContent =
            "You have a strong understanding of human rights and why they matter in our communities.";

    }

    else if (score >= 3) {

        resultTitle.textContent =
            "Good Job!";

        resultMessage.textContent =
            "You understand many of the basics of human rights. Keep learning and continue putting respect and equality into practice.";

    }

    else {

        resultTitle.textContent =
            "Keep Learning!";

        resultMessage.textContent =
            "Everyone starts somewhere. Learning about human rights is an important first step toward understanding and respecting the rights of others.";

    }


    /* Hide quiz */

    quizCard.style.display =
        "none";

    progressAreaHide();


    /* Show results */

    resultCard.classList.add("show");


    /* Scroll to result */

    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   HIDE PROGRESS AFTER QUIZ
========================================= */

function progressAreaHide() {

    const progressArea =
        document.querySelector(".progress-area");

    progressArea.style.display =
        "none";

}


/* =========================================
   RESTART QUIZ
========================================= */

restartButton.addEventListener("click", () => {

    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);


    /* Hide result */

    resultCard.classList.remove("show");


    /* Show quiz */

    quizCard.style.display =
        "block";


    /* Show progress */

    const progressArea =
        document.querySelector(".progress-area");

    progressArea.style.display =
        "block";


    loadQuestion();


    /* Scroll back to quiz */

    quizCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================
   START QUIZ
========================================= */

loadQuestion();