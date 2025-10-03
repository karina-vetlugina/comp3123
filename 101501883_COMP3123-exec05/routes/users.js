const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
    try {
      const filePath = path.join(__dirname, '..', 'user.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      const user = JSON.parse(data);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read user.json' });
    }
  });

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
    try {
      const { username, password } = req.body;
      const filePath = path.join(__dirname, '..', 'user.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      const user = JSON.parse(data);
  
      if (username !== user.username) {
        return res.json({ status: false, message: 'User Name is invalid' });
      }
  
      if (password !== user.password) {
        return res.json({ status: false, message: 'Password is invalid' });
      }
  
      return res.json({ status: true, message: 'User Is valid' });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logout.</b>`);
  });
  
  module.exports = router;