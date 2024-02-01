const TweetModel = require('../model/tweetmodel')
const SignupModel = require('../model/signupmodel')
const fs = require('fs');


const HomePage = async(req, res)=>{
    try{
        let allTweet = await TweetModel.find({userId : res.locals.users._id}).populate("userId");
        let UserDetalis = await SignupModel.find({});
        let editId = req.query.id;
        let single = await TweetModel.findById(editId);
        return res.render('home', { allTweet, UserDetalis, single });
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
 
const DeleteTweet = async(req, res)=>{
    try{
        let DelId = req.query.id;
        if(req.file){
            let DelImg = await TweetModel.findById(DelId);
        fs.unlinkSync(DelImg.post_imgs);    
        }
        DelTweet = await TweetModel.findByIdAndDelete(DelId);
        if(DelTweet){
            console.log('Tweet Deleted');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const EditTweet = async(req, res)=>{
    try {
        let editId = req.query.id;
        let single = await TweetModel.findById(editId);
        let UserDetalis = await SignupModel.find({});

        if (!single) {
            console.log(`News not found for id: ${editId}`);
        }

        return res.render('edittweet', { single, UserDetalis });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const UpdateTweet = async (req, res) => {
    try {
        const { EditId, post_content } = req.body;

        
        //const updatedPostContent = Array.isArray(post_content) ? post_content.join(', ') : post_content;

        const oldTweet = await TweetModel.findById(EditId);

        if (!oldTweet) {
            console.log("Tweet not found");
            return res.status(404).send("Tweet not found");
        }

        if (req.file) {
            if (oldTweet.post_imgs) {
                fs.unlinkSync(oldTweet.post_imgs);
            }

            const updatedTweet = await TweetModel.findByIdAndUpdate(EditId, {
                post_content,
                post_imgs: req.file.path,
            }, { new: true });

            if (updatedTweet) {
                console.log("Record updated with new image");
                return res.redirect("/home");
            }
        } else {
            const updatedTweet = await TweetModel.findByIdAndUpdate(EditId, {
                post_content,
            }, { new: true });

            if (updatedTweet) {
                console.log("Record updated without changing the image");
                return res.redirect("/home");
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};





module.exports={
    HomePage,
    loginUser,
    addTweet,
    DeleteTweet,
    EditTweet,
    UpdateTweet,
}