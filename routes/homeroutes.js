const express = require('express');

const routes = express.Router();
const passport = require('passport');
const multer = require('multer');

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
}).single('post_imgs');

routes.get('/home',passport.chekUser,homecontroller.HomePage);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),homecontroller.loginUser);
routes.post('/addTweet',FileUpload,homecontroller.addTweet);

module.exports=routes;