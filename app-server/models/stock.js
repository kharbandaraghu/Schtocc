const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Stock = new Schema({
  name: {
    type: String
  },
  ticker: {
    type: String
  },
  tags: {
    type: String
  }
}, {
  collection: 'books'
})
module.exports = mongoose.model('Book', Book)