const express = require('express');
const app = express();
const playerRoute = express.Router();

let Player = require('../models/player');

//add player to db
playerRoute.route('/add').post((req,res,next) =>{
  Player.create(req.body, (error,player) => {
    if(error){
      return next(error)
    } else {
      console.log(player);
    }
  })
})

//get all players for the leaderboard
playerRoute.route('/').get((req,res) => {
  Player.find((error,data) => {
    if(error){
      return next(error)
    } else {
      res.json(data)
      console.log(data);
    }
  })
})

module.exports = playerRoute;
