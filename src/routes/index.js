const { Router } = require('express');
const { getAllDogs, getDogsById, addDog } = require('../controllers/dogs.js');
const { getAllTemperaments } = require('../controllers/temperaments.js');

const router = Router();

// Routers definition
router.get('/dogs', getAllDogs);
router.get('/dogs/:idRaza', getDogsById)
router.post('/dog', addDog);
router.get('/temperament', getAllTemperaments);


module.exports = router;
