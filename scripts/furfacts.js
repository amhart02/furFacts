import {getCatJson} from "./cat.mjs";
import {getDogJson} from "./dog.mjs";
import {dogDayTemplate, catDayTemplate, dogBreedTemplate, catBreedTemplate} from "./templates.mjs";


async function getDogData() {
    const dogData = await getDogJson("breeds");
    console.log(dogData);
    renderDogDayCard(dogData);
    renderDogBreeds(dogData);
}

function renderDogDayCard(data) {
    const container = document.querySelector(".dotd-card");
    container.innerHTML = "";
    let random = Math.floor(Math.random() * data.length);

    const breedHTML = dogDayTemplate(data[random]);
    container.innerHTML += breedHTML;

}

// function renderDogBreeds(data) {
//     const container = document.querySelector(".gallery");

//     const alaskanHusky = data[7];
//     console.log(alaskanHusky);
//     const alaskanHuskyHTML = dogBreedTemplate(alaskanHusky);
//     container.innerHTML += alaskanHuskyHTML;

    
//     const germanShepherd = data[82];
//     console.log(germanShepherd);
//     const germanShepherdHTML = dogBreedTemplate(germanShepherd);
//     container.innerHTML += germanShepherdHTML;
    
//     const goldenRetriever = data[86];
//     console.log(goldenRetriever);
//     const goldenRetrieverHTML = dogBreedTemplate(goldenRetriever);
//     container.innerHTML += goldenRetrieverHTML;
    
//     const pomeranian = data[125];
//     console.log(pomeranian);
//     const pomeranianHTML = dogBreedTemplate(pomeranian);
//     container.innerHTML += pomeranianHTML;
    
//     const pug = data[128];
//     console.log(pug);
//     const pugHTML = dogBreedTemplate(pug);
//     container.innerHTML += pugHTML;
    
// }

function renderDogBreeds(data) {
    const container = document.querySelector(".gallery");

    const featuredBreeds = [
        "Alaskan Husky",
        "German Shepherd Dog",
        "Golden Retriever",
        "Pomeranian",
        "Pug"
    ];

    for (const name of featuredBreeds) {
        const breed = data.find(b => b.name === name);
        if (breed) {
            const breedHTML = dogBreedTemplate(breed);
            container.innerHTML += breedHTML;
        } else {
            console.warn(`Breed "${name}" not found in API data`);
        }
    }
}



async function getCatData() {
    const catData = await getCatJson("breeds");
    renderCatBreeds(catData);
    renderCatDayCard(catData);
}

function renderCatDayCard(data) {
    const container = document.querySelector(".cotd-card");
    container.innerHTML = "";
    let random = Math.floor(Math.random() * data.length);
    const breedHTML = catDayTemplate(data[random]);
    container.innerHTML += breedHTML;
}

function renderCatBreeds(data) {
    const container = document.querySelector(".gallery");
    container.innerHTML = "";

    const cheetoh = data[21];
    const cheetohHTML = catBreedTemplate(cheetoh);
    container.innerHTML += cheetohHTML;

    const himalayan = data[33];
    const himalayanHTML = catBreedTemplate(himalayan);
    container.innerHTML += himalayanHTML;

    const maineCoon = data[40];
    const maineCoonHTML = catBreedTemplate(maineCoon);
    container.innerHTML += maineCoonHTML;

    const siamese = data[56];
    const siameseHTML = catBreedTemplate(siamese);
    container.innerHTML += siameseHTML;

    const sphynx = data[61];
    const sphynxHTML = catBreedTemplate(sphynx);
    container.innerHTML += sphynxHTML;

}

function innit() {
    getDogData();
    getCatData();
}

innit();
