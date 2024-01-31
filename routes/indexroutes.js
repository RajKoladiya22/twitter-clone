const express = require('express');

const routes = express.Router();
const passport = require('passport');
const multer = require('multer');

const indexroutes = require('../controller//indexcontroller');
const homecontroller = require('../controller/homecontroller');

const FileUpload = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb)=>{
            cb(null, 'uploads');
        },
        filename : (req, file, cb)=>{
            let img = Date.now()+"-"+file.originalname;
            cb(null, img);
        }
    })
}).single('profile')

routes.get('/',indexroutes.indexpage);
routes.post('/addUser',FileUpload,indexroutes.addUser);
routes.get('/logout', indexroutes.logOut);


module.exports=routes;