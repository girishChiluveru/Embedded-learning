const quizData = [{
        question: "Which animal is this?",
        image: "quiz_images/lion.jpg",
        options: ["Lion", "Tiger", "Elephant", "Leopard"],
        correct: 0
    },
    {
        question: "Identify this fruit:",
        image: "quiz_images/banana.jpg",
        options: ["Apple", "Banana", "Grapes", "Orange"],
        correct: 1
    },
    {
        question: "What vegetable is this?",
        image: "quiz_images/tomato.jpg",
        options: ["Brinjal", "Tomato", "Potato", "Bitter gourd"],
        correct: 1
    },
    {
        question: "Which vehicle is this?",
        image: "quiz_images/bus.jpg",
        options: ["Car", "Bike", "Cycle", "Bus"],
        correct: 3
    },
    {
        question: "Which bird is this?",
        image: "quiz_images/peacock.jpg",
        options: ["Eagle", "Parrot", "Sparrow", "Peacock"],
        correct: 3
    },
    {
        question: "What is this?",
        image: "quiz_images/pen.jpg",
        options: ["Pen", "Eraser", "Scale", "Compass"],
        correct: 0
    },
    {
        question: "What Shape is this?",
        image: "quiz_images/triangle.jpg",
        options: ["Circle", "Square", "Triangle", "Rectangle"],
        correct: 2
    },
    {
        question: "What color is this?",
        image: "quiz_images/orange.jpg",
        options: ["Blue", "Orange", "Brown", "Pink"],
        correct: 1
    },
    {
        question: "What animal is this?",
        image: "quiz_images/dog.jpg",
        options: ["Dog", "Cat", "Cow", "Goat"],
        correct: 0
    },
    {
        question: "Which sea creature is this?",
        image: "quiz_images/fish.jpg",
        options: ["Fish", "Octopus", "Jellyfish", "Seahorse"],
        correct: 0
    }
];


let selectedQuestions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let timeLeft = 90; // 1 minute 30 seconds for each question
let timerInterval;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffle(quizData); // Shuffle questions
    selectedQuestions = quizData.slice(0, 3); // Select only the first 3 questions
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionData = selectedQuestions[currentQuestion];
    document.getElementById("question-container").innerHTML = `
      <h4>${questionData.question}</h4>
      <img id="question-image" src="${questionData.image}" class="img-fluid mb-3" alt="Question Image">
    `;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear old options
    questionData.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-outline-primary", "mb-2"); // Use btn-default for default styling
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    const questionData = selectedQuestions[currentQuestion];
    const optionsContainer = document.getElementById("options");
    const buttons = Array.from(optionsContainer.children);
    const correctIndex = questionData.correct;

    // Check if the selected answer is correct and increment the score
    if (selectedIndex === correctIndex) {
        correctAnswers++;
    }

    // Apply styles and disable buttons
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === selectedIndex) {
            button.style.backgroundColor = index === correctIndex ? 'lightgreen' : 'lightcoral';
        } else if (index === correctIndex) {
            button.style.backgroundColor = 'lightgreen';
        } else {
            button.style.backgroundColor = ''; // Default button style
        }
    });

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < selectedQuestions.length) {
            resetTimer();
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // 1-second delay
}


function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // Automatically move to the next question on timeout
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 90; // Reset to 1 minute 30 seconds for each new question
}

function endQuiz() {
    clearInterval(timerInterval);
    if (correctAnswers >= 2) {
        startConfetti()
    }
    const totalQuestions = selectedQuestions.length;
    const scorePercent = (correctAnswers / totalQuestions) * 100;

    let resultMessage = `Quiz Over! You got ${correctAnswers} out of ${totalQuestions} correct.`;


    document.getElementById("question-container").innerHTML = `<h4>${resultMessage}</h4>`;
    document.getElementById("options").innerHTML = "";
}

function startConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FF6347', '#FFD700', '#7CFC00', '#00CED1', '#FF69B4'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation ends
    setTimeout(() => {
        while (confettiContainer.firstChild) {
            confettiContainer.removeChild(confettiContainer.firstChild);
        }
    }, 5000);
}


window.onload = startQuiz;