const { expect } = require('chai');
const db = require('../index');
const Transaction = require('./transaction');

describe('Transaction model', () => {
    //clear the database after each spec
    after(function () {
        return db.sync({force: true});
    });

    let test_transaction;
    before(async () => {
        test_transaction = await Transaction.create({
            ticker: 'aapl',
            quantity: 2,
            price: 250.99
        })
    })

    describe('Schema', () => {
        it('requires a "ticker" to a string', async () => {
            expect(test_transaction.ticker).to.be.a('string')
        });

        it('"ticker" should be required', async () =>  {
            expect(!!test_transaction.ticker).to.be.true
        })

        it('requires a "quantity" to a number', async () => {
            expect(test_transaction.quantity).to.be.a('number')
        });

        it('"quantity" should be required', async () =>  {
            expect(!!test_transaction.quantity).to.be.true
        })

        it('"price" should be required', async () =>  {
            expect(!!test_transaction.price).to.be.true
        })

        it('"data" should exist', async () =>  {
            expect(test_transaction.dataValues.data).to.be
        })

        it('"userId" should exist', async () =>  {
            expect(test_transaction.dataValues.userId).to.be
        })

    });// end describe('Schema')
}) // end describe('Transaction model')