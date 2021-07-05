const { Op } = require("sequelize");
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const { Dog, Temperament } = require('../db');
const { BASE_URL, DOGS_URL, API_KEY } = require('../../const');


// Get all breeds from DB and API
function getAllDogs(req, res) {
    // Require the query name
    const { name } = req.query;
    // If name provided: 
    // Get all the api and db breeds that match the name
    if (name) {
        // Declare a constant where we call the API through the provided endpoint
        const api_dogs = axios.get(`${BASE_URL}${DOGS_URL}${name}&&${API_KEY}`)
        // We do the same to the general '/breeds' endpoint to obtain the dog's images
        const api_img = axios.get(`${BASE_URL}?${API_KEY}`)

        // Declare a constant where we query the DB for breeds that match the provided name
        const db_dogs = Dog.findAll({
            where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
            },
            // Query for temperaments too
            include: [{
                model: Temperament, 
                attributes: {
                    include: ['name'],// the temperament is return in the prop 'temperaments': [{name: 'Friendly',...}, {name: 'Quiet',...}]
                }
            }] 
        })

        // Execute both promises
        Promise.all([api_img, api_dogs, db_dogs])
            .then(response => {
                // Define two arrays with the responses that return the promises execution
                let [r_api_img, r_api_dogs, r_db_dogs] = response;
                
                // Declare an empty array where we only save the required data
                let required_api_dog = []
                // Declare a variable where we save the image drom the search endpoint
                let ref_image = ''

                r_api_dogs.data.forEach(dog => {
                    // Iterate through the breeds endpoint to find the image url required
                    r_api_img.data.forEach(img => {
                        if (img.reference_image_id == dog.reference_image_id) {
                            ref_image = img.image.url
                        }
                    })

                    // Get the average weight of the api dog's weight provided
                    let weight = dog.weight.imperial.split(' - ');
                    weight = (parseInt(weight[0]) + parseInt(weight[1])) / 2
                    
                    // Save only the necessary data from the api
                    required_api_dog.push({
                        id : String(dog.id),
                        name: dog.name,
                        temperament: dog.temperament,
                        image: ref_image,
                        weight_show: dog.weight.imperial,
                        weight: weight
                    }) 
                });
                
                // Send the answer to the client
                let array = r_db_dogs.concat(required_api_dog);
                if (array.length) return res.json(array)
                // If nothing found, send message to client
                else return res.json({error:404, message: `Cannot find anydog with '${name}' as name`}) 
            })
            // If error occurred, catch error
            .catch(err => console.log(err))
    
    } else {
        // If not name provided:
        
        // Declare a constant where we call the API through axios
        const api_dogs = axios.get(`${BASE_URL}?${API_KEY}`);
        
        // Declare a constant where we query the DB for breeds that match the provided name
        const db_dogs = Dog.findAll({
            // Query for temperaments too
            include: [{
                model: Temperament, 
                attributes: {
                    include: ['name'],// the temperament is return in the prop 'temperaments': [{name: 'Friendly',...}, {name: 'Quiet',...}]
                }
            }]
        });

        // Query for temperaments too
        Promise.all([api_dogs, db_dogs])
            .then(response => {
                // Define two arrays with the responses that return the promises execution
                let [r_api_dogs, r_db_dogs] = response;
                
                // Declare an empty array where we only save the required data
                let required_api_dogs = [];                
                
                r_api_dogs.data.forEach(dog => {
                    
                    // Get the average weight of the api dog's weight provided
                    let weight = dog.weight.imperial.split(' - ');
                    weight = (parseInt(weight[0]) + parseInt(weight[1])) / 2
                 

                    // Save only the necessary data from the api
                    required_api_dogs.push({
                        id : String(dog.id),
                        name: dog.name,
                        temperament: dog.temperament,
                        image: dog.image.url,
                        weight_show: dog.weight.imperial,
                        weight: weight
                    }) 
                });
                // Send the answer to the client
                let arr = r_db_dogs.concat(required_api_dogs)
                
                if (arr.length > 0) return res.json(arr)
                // If nothing found, send message to client
                else return res.json({error:404, message: 'Cannot find any dog'}) 
            })
             // If error occurred, catch error
             .catch(err => console.log(err))
    }
}


// Get breed that match with provided id
function getDogsById(req, res) {
    // Require id provided by params
    const { idRaza } = req.params;

    // We start searching in DB breeds
    if (idRaza.length > 5) {
        Dog.findByPk(idRaza, {
             // Query for temperaments too
            include: [{
                model: Temperament, 
                attributes: {
                    include: ['name'],// the temperament is return in the prop 'temperaments': [{name: 'Friendly',...}, {name: 'Quiet',...}]
                }
            }] 
        })
        .then (r => {
            // If founded, we send the answer to client
            if (r) return res.json(r)      
        })
        // If error ocurred, show in console
        .catch( err => console.log(err))
    }  else {  
        // If nothing was found in the DB, we call the api
        axios.get(`${BASE_URL}?${API_KEY}`)
        .then (response => {
            // Declare an empty array where we only save the required data
            let required_api_dogs = [];

           
            response.data.forEach(dog => {

                // Obtenemos el peso promedio ingresado
                let weight = dog.weight.imperial.split(' - ');
                weight = (parseInt(weight[0]) + parseInt(weight[1])) / 2


                if (dog.id == idRaza){

                    // Save only the necessary data from the api
                    required_api_dogs.push({
                        id : dog.id,
                        name: dog.name,
                        temperament: dog.temperament,
                        image: dog.image.url,
                        height: dog.height.imperial,
                        weight_show: dog.weight.imperial,
                        weight: weight,
                        years: dog.life_span
                    })
                } 
            }); 
            // Send the answer to the client
            if (required_api_dogs.length) return res.json(required_api_dogs[0])
            // If nothing found, send message to client
            else return res.json({error: 404, message: `Cannot find any dog with '${idRaza}' as id`})
        })
        // If error occurred, catch error
        .catch( err => console.log(err))
    }
}


// Add new breed to DB
function addDog(req, res) {
    // Create new id
    const id = uuidv4()
    // Require data that ws sent by the client in the form and add the created id
    const dog = { ...req.body, id };

        // If not exists, insert breed into the DB
        return Dog.findOrCreate({
            where: {
                id,
                name: dog.name,
                height: dog.height,
                weight_show: dog.weight_show,
                weight: dog.weight,
                years: dog.years,
                image: dog.image
            }
        })
        .then(([newDog, created]) => {
            if (created) {
                // If breed corrected succesfully, insert temperaments through with temperament table
                newDog.addTemperaments(dog.temperament)
                .then(r => { return res.json({message: `'${req.body.name}' was added succesfully to the DB`}) })
                .catch(error => console.log(error))
            }
        })
        // If error occured, send message to client
        .catch(err => {
            res.json({error: err, message: `couldn't add ${req.body.name} to the DB`})
        })
}

module.exports = {
    getDogsById,
    getAllDogs,
    addDog
};