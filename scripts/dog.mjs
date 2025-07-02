const baseURL = "https://api.thedogapi.com/v1/";
const apiKey = "live_N0KX4HDQfvOZye7XUtK79dhez98YS7mPyJxC3vGRQLH56NBFovhNx8qbvx9Lcuab";

export async function getDogJson(url) {
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

