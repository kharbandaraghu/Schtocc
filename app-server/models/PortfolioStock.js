// Stock model for the PortfolioStocks collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PortfolioStock = new Schema({
  name: {
    type: String
  },
  ticker: {
    type: String
  },
  purchasePrice: {
    type: Number
  },
  exchange: {
    type: String
  },
  unitsHeld: {
    type: Number
  },
  targetAllocation: {
    type: Number
  }
}, {
  collection: 'PortfolioStocks'
  });

module.exports = mongoose.model('PortfolioStock', PortfolioStock)
