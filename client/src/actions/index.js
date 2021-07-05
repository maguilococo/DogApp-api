// Const api calls
import { api_dogs, api_dogs_name, api_dogs_id, api_temperaments, api_dog } from '../const';
// Actions types
import { GET_ALL_BREEDS, GET_BREED_BY_NAME, GET_BREED_BY_ID, GET_ALL_TEMPERAMENTS, ADD_BREED, FILTER, ORDER, SELECTED_TAGS, FILTER_BY_TEMP } from './types';
import axios from 'axios';
import default_img from '../img/no-content.png'

// Get all breeds
export function getAllBreeds () {
    return function (dispatch) {
        return axios.get(api_dogs)
            .then(r => {
                let dogs = [];
                r.data.forEach(e => {
                    // If the dog comes from db
                    if (e.id.length > 5) {
                         // Obtein the temperament's list
                        let temperament = []
                        e.temperaments.map(t => (temperament.push(t.name)))

                        // If not image included, insert a default image
                        if (e.image === '') e.image = default_img
                        // Fill the empty array with the data ready to be display
                        dogs.push({
                                id: e.id,
                                name: e.name,
                                image: e.image,
                                temperament: temperament.join(', '),
                                weight: e.weight,
                                weight_show: e.weight_show
                            })
                    }
                    // If the dog comes from the api, we just push it into the empty array
                    else { dogs.push(e)}
                })
                dispatch({
                    type: GET_ALL_BREEDS,
                    payload: dogs
                })
            })
            .catch(err => console.log(err))
    }
};

// Action to search breeds by name
export function getBreedByName (name) {
    return function (dispatch) {
        return axios.get(api_dogs_name+name)
            .then(r => {
                let dogs = [];
                r.data?.forEach(e => {
                    // If the dog comes from db
                    if (e.id.length > 5) {
                        // Obtein the temperament's list
                        let temperament = []
                        e.temperaments.map(t => (temperament.push(t.name)))
                        // If not image included, insert a default image
                        if (e.image === '') e.image = default_img
                        // Fill the empty array with the data ready to be display
                        dogs.push({
                                id: e.id,
                                name: e.name,
                                image: e.image,
                                temperament: temperament.join(', '),
                                weight: e.weight,
                                weight_show: e.weight_show
                            })
                    }
                    // If the dog comes from the api, we just push it into the empty array
                    else { dogs.push(e)}
                })
                dispatch({
                    type: GET_BREED_BY_NAME,
                    payload: dogs
                }) 
            })
            .catch(err => console.log(err))
    }
};

// Action to get the details of an specific breed
export function getBreedById(idRaza) {
    return function (dispatch) {
        return axios.get(api_dogs_id+idRaza)
            .then(r => {
                // If not image included, insert a default image
                if (r.data.image === '') r.data.image = default_img
                dispatch({
                    type: GET_BREED_BY_ID,
                    payload: r.data
                })
            })
            .catch(err => console.log(err))
    }
};

// Action to get all the temperaments
export function getAllTemperaments () {
    return function (dispatch) {
        return axios.get(api_temperaments)
            .then(r => {
                dispatch({
                    type: GET_ALL_TEMPERAMENTS,
                    payload: r.data
                })
            })
            .catch(err => console.log(err))
    }
};

// Action to add breed and post it to the backend
export function addBreed (dog) {
    return function (dispatch) {
        return axios.post(api_dog, dog)
            .then(r => {
                dispatch({
                    type: ADD_BREED,
                    payload: r.data
                })
            })
            .catch(err => console.log(err))
    }
};

// Filter by dogs from --> api / db / both
export function filterApi (filters) {
    return function (dispatch) {
        dispatch({
            type: FILTER,
            payload: filters
        }) 
    }
}

// Filter by breed's temperament
export function filterByTemp(tags) {
    return function (dispatch) {
        dispatch({
            type: FILTER_BY_TEMP,
            payload: tags
        })
    }
}

// Sort function by *Alphabet --> asc / desc  | *Weight --> asc / desc
export function sort (breeds, orders) {
    return function (dispatch) {
        let order_breeds = breeds.slice();
        switch (orders) {
            // Alphabet
            case 'al-asc':
                order_breeds = order_breeds.sort( (a, b) => (a.name > b.name ? 1 : -1))
                break;
                
            case 'al-desc':
                order_breeds = order_breeds.sort( (a, b) => (a.name > b.name ? -1 : 1))
                break;

            // Weight
            case 'w-asc':
                order_breeds = order_breeds.sort( (a, b) => (a.weight > b.weight ? 1 : -1))
                break;

            case 'w-desc':
                order_breeds = order_breeds.sort( (a, b) => (a.weight > b.weight ? -1 : 1))
                break;

            default:
                return order_breeds
        }
            
        dispatch({
            type: ORDER,
            payload: {
                orders: orders,
                breeds: order_breeds 
            }
        })
    }
}

// Action to save the temperaments tags
export function selectedTags (tags) {
    return function (dispatch) {
        dispatch({
            type: SELECTED_TAGS,
            payload: tags
        }) 
    }
}