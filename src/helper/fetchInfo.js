import axios from "axios";

/**
 * This function fetches all breeds from the Api
 * @returns {object} an object containing a response from the request
 */
export async function getDogs() {
    let dogs = await axios({
      url: 'https://dog.ceo/api/breeds/list/all',
      method: 'get'
    });
    console.log(dogs);

    return dogs
}

/**
 * 
 * @param {String} breed This is the selected dog breed
 * @param {String} subBreed This is the selected subbreed from the breed
 * @returns {String} The url of a random dog image
 */
export async function fetchImage(breed, subBreed) {
    let response = await axios({
        url: `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`,
        method: 'get'
    });
    
    return response.data.message
}
