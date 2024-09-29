let quizData = {'intrebari': []};

// Function to load questions JSON
const loadQuestionsJSON = async () => {
    const resp = await fetch('./questions.json');
    quizData = await resp.json();
}
  

const questionContainer = document.getElementById("question-container");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("new-question-btn");
const resultContainer = document.getElementById("result-container");
const explanation = document.getElementById("explanation-container");

// Choose random question from loaded data
const getRandomQuestion = () => {
    return quizData.intrebari[Math.floor(Math.random() * quizData.intrebari.length)];
}

let randomQuestion = getRandomQuestion();

// Generate HTML for questions and answers
const generateQuestionHTML = () => {
    questionContainer.innerHTML = '';
    resultContainer.innerHTML = '';
    explanation.innerHTML = '';
    randomQuestion = getRandomQuestion();
    const questionHTML = `
    <h2>${randomQuestion.text}</h2>
    <ul>
        ${randomQuestion.raspunsuri.map((answer, index) => `
            <li>
                <input type="radio" name="answer" value="${index}" id="answer${index}">
                <label for="answer${index}">${answer.text}</label>
            </li>
        `).join('')}
    </ul>
    `;
    questionContainer.innerHTML = questionHTML;
};

// Add event to check correct answer
submitButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        const answerObj = randomQuestion.raspunsuri[answerIndex];

        if (answerObj.corect) {
            resultContainer.innerHTML = "<p class='right'>Răspuns corect!</p>";
            explanation.innerText = answerObj.explicatie
        } else {
            resultContainer.innerHTML = "<p class='wrong'>Răspuns incorect. Încearcă din nou!</p>";
        }
    } else {
        resultContainer.innerHTML = "<p class='wrong'>Te rugăm să selectezi un răspuns înainte de a verifica.</p>";
    }
});

// Add events for handling data load, question generation
document.addEventListener('DOMContentLoaded',  async () => {
    await loadQuestionsJSON();
    generateQuestionHTML()
});
nextButton.addEventListener("click",  generateQuestionHTML);
