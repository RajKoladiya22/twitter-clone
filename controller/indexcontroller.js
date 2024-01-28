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
    const { name, email, phone, password, c_password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let Add = await SignupModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      c_password: hashedPassword,
    });
    if (Add) {
      console.log(`User Registred`);
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  indexpage,
  addUser,
};
