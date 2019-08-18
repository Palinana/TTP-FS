const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
    //clear the database after each spec
    after(function () {
        return db.sync({force: true});
    });

    let cody;
    before(async () => {
        cody = await User.create({
            username: 'Cody',
            email: 'cody@test.com',
            password: 'test'
        })
    })

    describe('Schema', () => {
        it('requires a "name" to a string', async () => {
            expect(cody.username).to.be.a('string')
        });

        it('"name" should be required', async () =>  {
            expect(!!cody.username).to.be.true
        })

        it('requires a "email" to a string', async () => {
            expect(cody.username).to.be.a('string')
        });

        it('"email" should be required', async () => {
            expect(!!cody.email).to.be.true
        })

        it('requires a "password" to a string', async () => {
            expect(cody.username).to.be.a('string')
        });

        it('"password" should be required', async () =>  {
            expect(!!cody.password).to.be.true
        })

    });// end describe('Schema')
  
    describe('instanceMethods', () => {
      describe('correctPassword', () => {
        it('returns true if the password is correct', () => {
          expect(cody.correctPassword('test')).to.be.equal(true)
        })
  
        it('returns false if the password is incorrect', () => {
          expect(cody.correctPassword('testing')).to.be.equal(false)
        })
      }) // end describe('correctPassword')
    }) // end describe('instanceMethods')
}) // end describe('User model')