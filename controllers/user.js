const User = require("../models/user");

const Chat = require("../models/chat");

exports.signup = (req, res, next) => {
  const { name, email, number, password } = req.body;
  if (
    name == undefined ||
    name.length === 0 ||
    email == undefined ||
    email.length === 0 ||
    number == undefined ||
    number.length === 0 ||
    password == undefined ||
    password.length === 0
  ) {
    return res.status(400).json({ err: "Parameters Missing" });
  }
  User.findAll({ where: { email: email } })
    .then((user) => {
      if (user[0]) {
        res.status(500).json({ message: "user already exists" });
      } else {
        User.create({ name, email, number, password }).then((response) => {
          res
            .status(201)
            .json({ success: true, message: "User Successfully Created" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: err });
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (
    email == undefined ||
    email.length === 0 ||
    password == undefined ||
    password.length === 0
  ) {
    return res
      .status(400)
      .json({ err: "Email Id or Password Missing", success: false });
  }
  User.findAll({ where: { email: email } }).then((user) => {
    if (!user[0]) {
      res.status(500).json({ message: "User Does not exist" });
    }
    if (user[0]) {
      if (email == user[0].email && password == user[0].password) {
        res.status(200).json({ message: "Successfully logged in",userId:user[0].id });
      } else {
        res.status(500).json({ message: "Invalid Credentials" });
      }
    }
  });
};

exports.chat = (req, res, next) => {
  const { message, userId } = req.body;
  if (message == undefined || message.length === 0) {
    return res.status(400).json({ err: "Parameters Missing", success: false });
  } else {
    Chat.create({ message: message, userId: userId })
      .then((response) => {
        res.status(201).json({ success: true, message: "Successfully Sent" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err });
      });
  }
};

exports.getChats = (req, res, next) => {
  Chat.findAll({
    include: [
      {
        model: User,
        required: false,
      },
    ],
  })
  .then(response=>{
    res.status(200).json({success:true,data:response})
  })
  .catch(err=>{
    res.status(500).json({success:false,message:err})
  })
};
