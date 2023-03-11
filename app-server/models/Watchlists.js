const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Watchlist = new Schema({
  name: {
    type: String
  }
}, {
  collection: 'Watchlists'
});
module.exports = mongoose.model('Watchlist', Watchlist)
