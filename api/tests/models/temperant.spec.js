const { Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('add new temperament', () => {
      it('should work when required fields are provided', () => {
        Temperament.create({ name: 'Lazy' })
        .then(() => done('Should have been created correctly'))
        .catch(() => done());
      });
      it('should throw an error if inserted two times the same value', () => {
        Temperament.create({ name: 'Lazy' })
        .then(() => done(new Error("Shouldn't have been created - repeated name")))
        .catch(() => done());
      });
      it('should throw an error if required fields are null', (done) => {
        Temperament.create({})
        .then(() => done(new Error("Shouldn't have been created - not-null required fields")))
        .catch(() => done());
      });
    });
  });
});
