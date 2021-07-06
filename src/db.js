require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DOGAPP_DB_USER, DOGAPP_DB_PASSWORD, DOGAPP_DB_HOST, DOGAPP_DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${ DOGAPP_DB_USER}:${DOGAPP_DB_PASSWORD}@${DOGAPP_DB_HOST}/${DOGAPP_DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

/*The relation between both models is many-to-many:
- Many dogs --> many temperaments
- Many temperaments --> many dogs */
const dog_temperament = sequelize.define('dog_temperament', {}, { timestamps: false });
Dog.belongsToMany(Temperament, {through: dog_temperament});
Temperament.belongsToMany(Dog, {through: dog_temperament});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,   
};
