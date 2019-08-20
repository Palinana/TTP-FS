const router = require('express').Router();
const { Transaction } = require('../db/models');

// Get a user's transactions
router.get('/:id/transactions', async (req, res, next) => {
    try {
        if (req.user) {
            const transactions = await Transaction.findAll({
                where: {
                    userId: req.params.id,
                },
            });
            res.json(transactions);
        } 
        else {
            res.send('You must be signed in to see transactions');
        }
    } 
    catch (error) {
        next(error);
    }
});
  
//Get a user's portfolio (stocks that user owns)
router.get('/:id/portfolio', async (req, res, next) => {
    try {
        if (req.user) {
            const transactions = await Transaction.findAll({
                where: {
                    userId: req.params.id,
                },
                attributes: ['ticker', 'quantity']
            });
            res.json(transactions);
        } 
        else {
            res.send('You must be signed in to see portfolio');
        }
    } 
    catch (error) {
        next(error);
    }
});
  
module.exports = router;
