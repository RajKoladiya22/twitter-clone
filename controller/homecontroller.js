const TweetModel = require('../model/tweetmodel')
const SignupModel = require('../model/signupmodel')


const HomePage = async(req, res)=>{
    try{
        let allTweet = await TweetModel.find({userId : res.locals.users._id}).populate("userId");
        let UserDetalis = await SignupModel.find({})
        console.log(allTweet);
        return res.render('home', { allTweet, UserDetalis });
    }catch(err){
        console.log(err);
        return false;
    }
}

const loginUser = async(req, res)=>{
    return res.redirect('/home')
}
const addTweet = async(req, res)=>{
    try{
        const {user, post_content, post_date}=req.body
        const TWEET = await TweetModel.create({
            user, post_content, post_date,
            post_imgs : req.file.path,
            userId : req.body.userid
        });
        if(TWEET){
            console.log(`Tweet Sucsessfully`);
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
module.exports={
    HomePage,
    loginUser,
    addTweet,
}