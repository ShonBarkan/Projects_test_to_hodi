
const express = require('express')
const {User} = require('../Models/Users')
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

//add new user
const newUser = async (req, res) => {
    try {
      const {email,userName,password} = req.body;

      const checkUser1 = await User.findOne({ email })
      if(checkUser1) return res.status(201).json({ message: 'Email already exists' });
    
      const checkUser2 = await User.findOne({ userName })
      if(checkUser2) return res.status(201).json({ message: 'User Name already exists' });
    
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({email,userName,password:passwordHash});
      await newUser.save();

      const token = jwt.sign({userName},'BonTheKing');
      res.status(201).json(token);

    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

// LogIn
const logIn = async (req, res) => {
    try {
      const {email, password} = req.body;
  
      const user = await User.findOne({ email: email });
      if (!user) return res.status(201).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(201).json({ message: 'password is incorrect' });
    
      const token = jwt.sign({userName:user.userName},'BonTheKing');
      res.status(201).json(token);

    } catch (error) {
      res.status(500).json([error, error.message]);
    }
};

  //*********** exports **************//
  module.exports = {newUser,logIn};