import { getDogJson } from "./dog.mjs";
import { getCatJson } from "./cat.mjs";

// modules
const catTrivia = [
    { name: "Sphynx", breed_id: "sphy", imgURL: ""},
    { name: "Siamese", breed_id: "siam", imgURL: ""},
    { name: "Himalayan", breed_id: "hima", imgURL: ""},
    { name: "Maine Coon", breed_id: "mcoo", imgURL: ""},
    { name: "Cheetoh", breed_id: "chee", imgURL: ""}
]

const dogTrivia = [
    { name: "Golden Retriever", breed_id: "121", imgURL: ""},
    { name: "German Shepherd", breed_id: "115", imgURL: ""},
    { name: "Husky", breed_id: "8", imgURL: ""},
    { name: "Pug", breed_id: "201", imgURL: ""},
    { name: "Pomeranian", breed_id: "193", imgURL: ""}
]

//using api
async function getCatImageByBreed(breedID) {
    const url = `images/search?breed_ids=${breedID}`;
    const data = await getCatJson(url);
    return data[0].url;
}

async function getDogImageByBreed(breedID) {
    const url = `images/search?breed_ids=${breedID}`;
    const data = await getDogJson(url);
    return data[0].url;
}

// populating quiz page
function getQuizType() {
    const params = new URLSearchParams(window.location.search);
    return params.get("quizType");
}

async function populateTriviaImages(triviaData, quizType) {
    let getImageByType = "";
    if (quizType === "dog") {
        getImageByType = getDogImageByBreed;
    } else {
        getImageByType = getCatImageByBreed;
    }

    for (const breed of triviaData) {
        const imgURL = await getImageByType(breed.breed_id);
        breed.imgURL = imgURL;
    };
}

async function prepareTriviaData() {
    await populateTriviaImages(catTrivia, "cat");
    await populateTriviaImages(dogTrivia, "dog");
    renderQuiz();
}

function quizQuestionTemplate(triviaData, breed, index) {
    return `<div class="quizQuestion"> 
                <img src="${breed.imgURL} " alt="${breed.name} picture">
                <div class="quizOptions">
                    <section class="quizOption"> 
                        <input type="radio" value="${triviaData[0].name}" name="question${index}" required>
                        <label for="answer1" class="trivia-answer">${triviaData[0].name}</label>
                    </section>
                    <section class="quizOption"> 
                        <input type="radio" value="${triviaData[1].name}" name="question${index}" required>
                        <label for="answer1" class="trivia-answer">${triviaData[1].name}</label>
                    </section>
                    <section class="quizOption"> 
                        <input type="radio" value="${triviaData[2].name}" name="question${index}" required>
                        <label for="answer1" class="trivia-answer">${triviaData[2].name}</label>
                    </section>
                    <section class="quizOption"> 
                        <input type="radio" value="${triviaData[3].name}" name="question${index}" required>
                        <label for="answer1" class="trivia-answer">${triviaData[3].name}</label>
                    </section>
                    <section class="quizOption"> 
                        <input type="radio" value="${triviaData[4].name}" name="question${index}" required>
                        <label for="answer1" class="trivia-answer">${triviaData[4].name}</label>
                    </section>
                </div>
            </div>
            `;
}

function getTriviaData(quizType) {
    let triviaData = "";
    if (quizType === "dog") {
        triviaData = dogTrivia;
    } else {
        triviaData = catTrivia;
    }

    return triviaData;
}

function renderQuiz() {
    const quizType = getQuizType();
    const triviaData = getTriviaData(quizType);
    const quizContainer = document.querySelector(".quiz-container");

    let quizHTML = "";
    let index = 1;
    for (const breed of triviaData) {
        quizHTML += quizQuestionTemplate(triviaData, breed, index);
        index += 1
    }
    quizContainer.innerHTML = quizHTML;
}

// quiz submission
async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const quizType = getQuizType();
    const triviaData = getTriviaData(quizType);

    let score = 0;
    triviaData.forEach((breed, index) => {
        const userAnswer = formData.get(`question${index + 1}`);
        const correctAnswer = breed.name;

        console.log(`Question ${index + 1}: User answer = ${userAnswer}, Correct answer = ${correctAnswer}`);

    if(userAnswer === correctAnswer) {
        score += 1;
    }
})
    saveScore(score);
    displayScores();
    alert("Results are at the top!")
}

function saveScore(score) {
    const quizType = getQuizType(); 
    const key = `${quizType}QuizScores`; 
    const scores = JSON.parse(localStorage.getItem(key)) || [];
    scores.push(score); 
    localStorage.setItem(key, JSON.stringify(scores)); 
}

function displayScores() {
    const quizType = getQuizType(); 
    const key = `${quizType}QuizScores`; 
    const scores = JSON.parse(localStorage.getItem(key)) || []; 
    const scoreContainer = document.querySelector(".score-container");
    scoreContainer.innerHTML = "<h2>Results</h2>";

    if (scores.length === 0) {
        scoreContainer.innerHTML += "<p>No attempts yet. Take the quiz!</p>";
        return;
    }

    scores.forEach((score, index) => {
        const scoreMarkup = `<p>Attempt ${index + 1}: You scored ${score} out of 5</p>`;
        scoreContainer.insertAdjacentHTML("beforeend", scoreMarkup);
    });

}


//drop down menu
function updateDropdownSelection() {
    const quizType = new URLSearchParams(window.location.search).get("quizType");
    const dropdown = document.querySelector("#dog-or-cat");
    dropdown.value = quizType;
}

// change the quiz on the drop down menu
document.querySelector("#dog-or-cat").addEventListener('change', function (e) {
    const selectedQuiz = e.target.value;
    window.location.href = `quiz.html?quizType=${selectedQuiz}`;
})

//render the page
prepareTriviaData();
const formElement = document.querySelector("form");
formElement.addEventListener('submit', handleSubmit);
document.addEventListener("DOMContentLoaded", function () {
    displayScores();
    updateDropdownSelection();
})