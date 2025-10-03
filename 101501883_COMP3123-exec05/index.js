const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/users');

// Middlewares
app.use(express.json());

// Add User Router
app.use('/api/v1/users', userRouter);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.get('/home', (req, res) => {
  const p = path.join(__dirname, 'public', 'home.html');
  res.sendFile(p);
});

// Root for sanity
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'COMP3123 exec05', version: '1.0.0' });
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});