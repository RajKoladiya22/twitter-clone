const express = require('express');

const routes = express.Router();
const passport = require('passport');

const homecontroller = require('../controller/homecontroller');

routes.get('/home',passport.chekUser,homecontroller.HomePage);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),homecontroller.HomePage);

module.exports=routes;