const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({ 
name: {
  type: String
},
score:{
  type: String
}})

module.exports = mongoose.model('Player',PlayerSchema);
