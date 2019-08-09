import axios from 'axios';
import iexApiToken from '../../secrets';
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



