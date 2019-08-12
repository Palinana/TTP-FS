const axios = require('axios');
const iexApiToken = require('../../secrets');
const token = process.env.IEX_API_TOKEN || iexApiToken;

const getSymbolQuote = async tickerSymbol => {
    try {
        const { data } = await axios.get(`https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=${token}`);
        return data;
    } catch (error) {
        return -1;
    }
};

module.exports = { getSymbolQuote };



