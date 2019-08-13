const axios = require('axios');
const iexApiToken = require('../../secrets');

const getSymbolQuote = async tickerSymbol => {
    try {
        const { data } = await axios.get(`https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=${iexApiToken}`);
        return data;
    } catch (error) {
        return "Unknown symbol";
    }
};

module.exports = { getSymbolQuote };
