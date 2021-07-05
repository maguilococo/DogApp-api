const axios = require('axios');
const { BASE_URL } = require('../../const');
const { Temperament } = require('../db');

// Get all temperaments from api
function getAllTemperaments(req, res, next) {
    // Call the api through axios
    axios.get(`${BASE_URL}`)
    .then(response => {
        response.data.map (dog => {
            // If exists temperament
            if (dog.temperament){
                // Separate the string into an array
                const temp = dog.temperament.split(', ');
                // Define empty array to push the temperaments
                let temperaments = []
                while (temp.length){
                    // Check that the temperament has not been included to the list and iterate until there are no more temperaments in that dog
                    if (!temperaments.includes(temp[0])) {
                        temperaments.push(temp[0])
                        // If not exists in the db, insert it
                        Temperament.findOrCreate({
                            where: {
                                name: temp[0]
                            }
                        })
                        // If error occurred, send it to client
                        .catch({error: 500, message: `Error adding temperament`})                         
                    }
                    temp.shift()
                }
            }
        })
        
    })
    // If error occurred while calling the api, print error in console
    .catch(error => console.log(error))

    // Get all temperaments from DB
    Temperament.findAll()
    // If succeed, send answer to client
    .then(temp => {return res.send(temp)})
    // If error occurred, print error in console 
    .catch(error => console.log(error))
}

module.exports = {
    getAllTemperaments
};