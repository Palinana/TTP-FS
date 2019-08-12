const router = require('express').Router();
const { Transaction, User } = require('../db/models');
const { getSymbolQuote } = require('../iex');

// Make a new stock transaction
router.post('/', async (req, res, next) => {
    try {
        if (req.user) {
            const ticker = req.body.ticker.toUpperCase();
            const quantity = req.body.quantity;

            // Getting the current ticker price 
            const { latestPrice } = await getSymbolQuote(ticker);
            console.log('latestPrice ---> ', latestPrice)

            // If invalid symbol  
            if (latestPrice === 'Unknown symbol') throw new Error('Unknown ticker symbol! Try again.');

            // Verifing if a user has enough balance to purchase a stock
            const user = await User.findById(req.user.id);
            if (user.balance < numberOfShares * latestPrice * 100) {
                res.status(304).send("You don't have enough money to purchase a stock!");
            }
            else {
                // Update user balance in the Users table
                user.balance -= numberOfShares * latestPrice * 100;
                await user.save();

                //Create a transaction for user's transaction history
                const transaction = await Transaction.create({
                    ticker,
                    quantity,
                    price: latestPrice, 
                }); 
                transaction.setUser(user);

                res.status(201).send('Successfully purchased!');
            }
        }
        else {
            res.send('You must be signed in to make a purchase');
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;