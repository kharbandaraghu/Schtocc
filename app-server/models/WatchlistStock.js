const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let WatchlistStock = new Schema({
  name: {
    type: String
  },
  ticker: {
    type: String
  },
  listId: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  collection: 'WatchlistStock'
})
module.exports = mongoose.model('Stock', WatchlistStock)