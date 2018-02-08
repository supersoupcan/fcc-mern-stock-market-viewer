var mongoose = require('mongoose');

const models = {
  Stock : mongoose.model(
    'Stock', 
    mongoose.Schema({
      symbol : String,
      lastUpdated : Date,
      data : [{
        date : Date,
        close : String,
      }]
    })
  )
};

module.exports = models;
