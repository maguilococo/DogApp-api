const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('add new dog', () => {
      it('should work when required fields are provided', () => {
        Dog.create({ name: 'Pug', height: '30 - 60', weight: '6 - 14',  years: '12 - 20' })
        .then(() => done('Should have been created correctly'))
        .catch(() => done());
      });
      it('should throw an error if url is not valid', () => {
        Dog.create({ name: 'Pug', height: '30 - 60', weight: '6 - 14',  years: '12 - 20', image:'not a valid url' })
        .then(() => done(new Error("Shouldn't have been created - not a valid url")))
        .catch(() => done());
      });
      it('should throw an error if inserted two times the same value', () => {
          Dog.create({ name: 'Pug', height: '30 - 60', weight: '6 - 14',  years: '12 - 20' })
          .then(() => done(new Error("Shouldn't have been created - repeated name")))
          .catch(() => done());
        });
    
      it('should throw an error if required fields are null', (done) => {
          Dog.create({})
            .then(() => done(new Error("Shouldn't have been created - not-null required fields")))
            .catch(() => done());
      });
    });
  });
});
