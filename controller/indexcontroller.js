const SignupModel = require("../model/signupmodel");
const bcrypt = require("bcrypt");

const indexpage = async (req, res) => {
    if(res.locals.users){
        return res.redirect('/home')
    }
  return res.render("index");
};

const addUser = async (req, res) => {
  try {
    let usercode = Math.floor(Math.random() * 100);
    const { name, email, phone, password, } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let Add = await SignupModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      username: `${name}@${usercode}`,
      profile: req.file.path,
    });
    if (Add) {
      console.log(`User Registered`);
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


const logOut = (req, res) => {
  req.logout((err) => {
      if (err) {
          console.log(err);
          return false;
      }
      return res.redirect('/');
  });
};


module.exports = {
  indexpage,
  addUser,
  logOut,
};
