const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Transaction = db.model('transaction');

describe('User transactions routes', () => {
    //empty the table after each spec
    after(function () {
        return Promise.all([
            Transaction.truncate({ cascade: true })
        ]);
    });
    
    //gets all user transactions data
    describe('GET /api/users/:id/transaction', () => {  
        it('gets all transactions that a user owns', () => {
            return request(app)
            .get('/api/users/2/transactions')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.ticker).to.be
                expect(res.body.quantity).to.be
                expect(res.body.price).to.be
            })
        })
    }) // end describe('GET /api/users/:id/transaction'')

    //gets user data for portfolio
    describe('GET /api/users/:id/portfolio', () => {  
        it('gets all transactions that a user owns', () => {
            return request(app)
            .get('/api/users/2/portfolio')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.ticker).to.be
                expect(res.body.quantity).to.be
            })
        })
    }) // end describe('GET /api/users/:id/portfolio')
}) // end describe('Auth routes')