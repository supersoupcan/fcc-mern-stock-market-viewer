const axios = require('axios');
const Stock = require('./models').Stock;
const config = require('./config');

const methods = {
  getStocks : function(ws){
    Stock.find({}).exec()
    .catch((err) => {
      if(err) throw err;
    })
    .then(stocks => {
      ws.send(
        JSON.stringify({
          type : "INIT",
          payload : stocks
        })
      );
    });
  },
  addSymbol : function(symbol, wssClients){
    console.log('adding', symbol);
    const url = (
      'https://www.alphavantage.co/query?' + 
      'function=TIME_SERIES_DAILY_ADJUSTED' +
      '&outputsize=compact' +
      '&symbol=' + symbol +
      '&apikey=' + config.alphaVantageKey
    );
    axios(url)
    .catch((err) => {
      if(err) throw err;
    })
    .then((res) => {
      let update = {
        symbol : symbol,
        lastUpdated : new Date(res.data['Meta Data']['3. Last Refreshed']),
        data : Object.keys(res.data['Time Series (Daily)']).map((key) => {
          return {
            date : new Date(key),
            close : res.data['Time Series (Daily)'][key]['4. close']
          };
        })
      };
      Stock.findOneAndUpdate(
        {symbol : symbol}, 
        update, 
        {upsert : true, new : true, rawResult : true}
      )
      .catch((err) => {
        if(err) throw err;
      })
      .then((data) => {
        let mode = data.lastErrorObject.updatedExisting ? "UPDATE" : "ADD";
        wssClients.forEach(ws => {
          ws.send(
            JSON.stringify({
              type : mode,
              payload : data.value
          }));
        });
      });
    });
  },
  removeSymbol : function(symbol, wssClients){
    Stock.findOneAndRemove(
      {symbol : symbol }
    ).exec()
    .catch((err) => {
      if(err) throw err;
    })
    .then(() => {
      wssClients.forEach(ws => {
        ws.send(
          JSON.stringify({
             type : "REMOVE",
             payload : symbol
          })
        );
      });
    });
  }
};

module.exports = methods;

