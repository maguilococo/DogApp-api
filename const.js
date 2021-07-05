// Constants used in the backend

const { apiKey } = process.env;

const BASE_URL = 'https://api.thedogapi.com/v1/breeds';
const DOGS_URL = '/search?q=';
const API_KEY = `apikey=${apiKey}`;

module.exports = {
    BASE_URL,
    DOGS_URL, 
    API_KEY
}