const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Portfolio = new Schema({
  name: {
    type: String,
    unique: true
  },
  stocks: [{
    type: Schema.Types.ObjectId,
    ref: 'PortfolioStock'
  }],
  inceptionDate: {
    type: Date
  },
  revisitDate: {
    type: Date
  },
  rebalancePeriod: {
    type: String
  },
  modelPortfolio: {
    type: Boolean
  }
}, {
  collection: 'Portfolios'
});
module.exports = mongoose.model('Portfolio', Portfolio)
