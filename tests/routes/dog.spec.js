/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const {v4: uuidv4} = require('uuid');

const agent = session(app);
const id = uuidv4()

const dog = {
  name: 'Pug',
  height: '30 - 60',
  weight: '6 - 14',
  years: '12 - 20',
  id
};

describe('Dog app routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('responds with json', () =>
    agent.get('/dogs').then((res) => {
      expect('Content-Type', /json/)
    })); 
    it('responds with the dog just created', () =>
    agent.get('/dogs').then((res) => {
      expect(res.body[0].name).to.be.equal("Pug");
    }));
    it('responds with the first dog from the api', () =>
    agent.get('/dogs').then((res) => {
      expect(res.body[1].id).to.be.equal("1");
    }));
    it('includes the necessary data for the Home Page', () =>
    agent.get('/dogs').then((res) => {
      expect(function(res) {
        expect(res.body[1]).to.eql({id: '1', name: 'Affenpinscher', temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving", 
        image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'})
      })  
    }));
  });
});
