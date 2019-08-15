const router = require('express').Router();
const { Transaction, User } = require('../db/models');
const { getSymbolQuote } = require('../iex');

// Make a new stock transaction
router.post('/', async (req, res, next) => {
    try {
        if (req.user) {
            const type = req.body.type;
            const ticker = req.body.ticker.toLowerCase();
            const quantity = req.body.quantity;

            // Getting the current ticker price 
            const tickerData  = await getSymbolQuote(ticker);
            // console.log('tickerData ---> ', tickerData)

            // If invalid symbol  
            if (tickerData === 'Unknown symbol') throw new Error('Unknown ticker symbol');

            // Verifing if a user has enough balance to purchase a stock
            const user = await User.findById(req.user.id);
            const latestPrice = tickerData.latestPrice;

            if (user.balance < quantity * latestPrice) throw new Error('Not enough money');
            else {
                // Update user balance in the Users table
                user.balance -= quantity * latestPrice;
                await user.save();

                // getting stock data to check if has already bought the stock 
                const userExistingStock = await Transaction.findOne({ where: {
                    ticker,
                    userId: req.user.id
                }});

                // uncrement stock quanitity
                if (userExistingStock) {
                    const userStock = await Transaction.update(
                        {
                            quantity: Number(userExistingStock.quantity) + Number(quantity)
                        },
                        { where: {
                            ticker,
                            userId: req.user.id
                        }
                    });
                    res.json(userStock)
                }
                else { 
                    //Create a transaction for user's transaction history
                    const transaction = await Transaction.create({
                        type,
                        ticker,
                        quantity,
                        price: latestPrice, 
                    }); 
                    transaction.setUser(user);
                    res.json(transaction);
                }
                
            }
        }
        else {
            res.send('You must be signed in to make a purchase');
        }
    } 
    catch (error) {
        let errorMessage = error.message;
        if (errorMessage === 'Not enough money') {
            res.status(400).send("You don't have enough money to purchase a stock!")
        } 
        else if(errorMessage === 'Unknown ticker symbol') {
            res.status(404).send('Unknown ticker symbol! Try again.');
        } 
        else {
            next(error);
        }
    }
});

module.exports = router;
