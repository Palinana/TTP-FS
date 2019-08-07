const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('Auth routes', () => {
    //empty the table after each spec
    after(function () {
        return Promise.all([
          User.truncate({ cascade: true })
        ]);
    });
    
    //creates a new user 
    describe('POST /signup', () => {  
        it('creates a new user', () => {
            return request(app)
            .post('/auth/signup')
            .send({
                name: 'Cody',
                email: 'cody@test.com',
                password: 'test'
              })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('Cody');
                expect(res.body.email).to.equal('cody@test.com');
                expect(res.body.balance).to.equal(5000);
            })
        })

        // This one should fail with a 409 as user already exists
        it('does not create a new article without content', () => {
            return request(app)
            .post('/auth/signup')
            .send({
                name: 'Cody',
                email: 'cody@test.com',
                password: 'test'
            })
            .expect(409);
        });
    }) // end describe('POST /signup')

    describe('POST /login', () => {  
        it('login as existing user', () => {
            return request(app)
            .post('/auth/login')
            .send({
                name: 'Cody',
                email: 'cody@test.com',
                password: 'test'
              })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('Cody');
                expect(res.body.email).to.equal('cody@test.com');
                expect(res.body.balance).to.equal(5000);
            })
        })
    
        // This one should fail with a 404 as user is not found
        it('does not create a new article without content', () => {
            return request(app)
            .post('/auth/login')
            .send({
                name: '',
                email: '',
                password: ''
            })
            .expect(404);
        });
    }) // end describe('POST /login')
}) // end describe('Auth routes')