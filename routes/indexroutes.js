const express = require('express');

const routes = express.Router();
const passport = require('passport');

const indexroutes = require('../controller//indexcontroller');
const homecontroller = require('../controller/homecontroller');

routes.get('/',indexroutes.indexpage);
routes.post('/addUser',indexroutes.addUser);



module.exports=routes;