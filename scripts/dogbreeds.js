import { getDogJson } from "./dog.mjs";

let allDogData = [];

async function fetchDogData() {
    const dogData = await getDogJson("breeds");
    allDogData = dogData;
    renderBreeds(dogData);
}

function renderBreeds(data) {
    const container = document.querySelector(".breeds");
    container.innerHTML = "";
    data.forEach(breed => {
        if (!breed.image || !breed.image.url) {
            return; 
        }
        const breedHTML = dogBreedTemplate(breed);
        container.innerHTML += breedHTML;
    })
}

function dogBreedTemplate(data) {
    const bredFor = data.bred_for || "unknown";
    return `
    <div class="breed">
    <img src="${data.image.url}" alt="Picture of ${data.name} dog">
    <section class="breed-info">
        <h2>${data.name}</h2>
        <p>Life Span: ${data.life_span}</p>
        <p>Height: ${data.height.imperial} inches</p>
        <p>Weight: ${data.weight.imperial} pounds</p>
        <p>Temperament: ${data.temperament}</p>
        <p>Bred for: ${bredFor}</p>
        </section>
    </div>
    `;
}

function filter(input) {
    const filtered = allDogData.filter(breed => {
        const name = (breed.name || '').toLowerCase();
        const life_span = breed.life_span ? breed.life_span.toString() : '';
        const weight = breed.weight.imperial ? breed.weight.imperial.toString() : '';
        const height = breed.height.imperial ? breed.height.imperial.toString() : '';
        const temperament = (breed.temperament || '').toLowerCase();
        const bredFor = (breed.bred_for || '').toLowerCase();

        return name.includes(input) ||
            life_span.includes(input) ||
            weight.includes(input) ||
            height.includes(input) ||
            temperament.includes(input) ||
            bredFor.includes(input);
    });

    return filtered;
}

function searchHandler(e) {
    e.preventDefault();
    const userInput = document.querySelector("#input").value;
    const lowerInput = userInput.toLowerCase();
    const filteredBreeds = filter(lowerInput);
    renderBreeds(filteredBreeds);
}

fetchDogData();

document.querySelector("#search").addEventListener("click", searchHandler);
document.querySelector("#input").addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchHandler(e);
    }
});
