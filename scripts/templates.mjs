export function  catDayTemplate(data) {
    return `
    <div class="breed">
    <h2>Cat of the day</h2>
    <img src="${data.image.url}" alt="Picture of ${data.name} cat">
    <h2>${data.name}</h2>
    `;
}

export function dogDayTemplate(data) {
    return `
    <div class="breed">
    <h2>Dog of the day</h2>
    <img src="${data.image.url}" alt="Picture of ${data.name} dog">
    <h2>${data.name}</h2>
    `;
}

export function dogBreedTemplate(data) {
    const bredFor = data.bred_for || "unknown";
    return `
    <section class="gallery-card">
    <img src="${data.image.url}" alt="Picture of ${data.name} dog">
    <section class="breed-info">
        <h2>${data.name}</h2>
        <p>Life Span: ${data.life_span}</p>
        <p>Height: ${data.height.imperial} inches</p>
        <p>Weight: ${data.weight.imperial} pounds</p>
        <p>Temperament: ${data.temperament}</p>
        <p>Bred for: ${bredFor}</p>
        </section>
    </section>
    `;
}

export function catBreedTemplate(data) {
    return `
    <section class="gallery-card">
    <img src="${data.image.url}" alt="Picture of ${data.name} cat">
    <section class="breed-info">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <p>${data.origin}</p>
        <p>Life Span: ${data.life_span}</p>
        <p>Weight: ${data.weight.imperial} pounds</p>
        <p>Temperament: ${data.temperament}</p>
        </section>
    </section>
    `;
}