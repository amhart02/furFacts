import { getCatJson } from "./cat.mjs";

let allCatData = [];

async function fetchCatData() {
    const catData = await getCatJson("breeds");
    allCatData = catData;
    renderBreeds(catData);
}

function renderBreeds(data) {
    const container = document.querySelector(".breeds");
    container.innerHTML = "";
    data.forEach(breed => {
        if (!breed.image || !breed.image.url) {
            return; 
        }
        const breedHTML = catBreedTemplate(breed);
        container.innerHTML += breedHTML;
    })
}

function catBreedTemplate(data) {
    return `
    <div class="breed">
    <img src="${data.image.url}" alt="Picture of ${data.name} cat">
    <section class="breed-info">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <p>${data.origin}</p>
        <p>Life Span: ${data.life_span}</p>
        <p>Weight: ${data.weight.imperial} pounds</p>
        <p>Temperament: ${data.temperament}</p>
        </section>
    </div>
    `;
}

function filter(input) {
    const filtered = allCatData.filter(breed => {
        const name = (breed.name || '').toLowerCase();
        const description = (breed.description || '').toLowerCase();
        const origin = (breed.origin || '').toLowerCase();
        const life_span = breed.life_span ? breed.life_span.toString() : '';
        const weight = breed.weight.imperial ? breed.weight.imperial.toString() : '';
        const temperament = (breed.temperament || '').toLowerCase();

        return name.includes(input) ||
            description.includes(input) ||
            origin.includes(input) ||
            life_span.includes(input) ||
            weight.includes(input) ||
            temperament.includes(input);
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

fetchCatData();

document.querySelector("#search").addEventListener("click", searchHandler);
document.querySelector("#input").addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchHandler(e);
    }
});
