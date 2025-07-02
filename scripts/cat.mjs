const baseURL = "https://api.thecatapi.com/v1/";
const apiKey = "live_ZsuSFgHn00xI0Vvimbt9yeottf8IFJ6vT0XZKrVNTsufOmbvYPzvOYfkdbhGUzJu";

export async function getCatJson(url) {
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey
      }
    };
    let data = {};
    const response = await fetch(baseURL + url, options);
    if (response.ok) {
      data = await response.json();
    } else throw new Error("response not ok");
    return data;
  }

