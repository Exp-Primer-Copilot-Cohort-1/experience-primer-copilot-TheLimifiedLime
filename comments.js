// Create web server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create a simple in-memory database
const comments = {};

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a new comment
app.post('/comments', (req, res) => {
  const {message} = req.body;
  const id = Math.floor(Math.random() * 999999);
  comments[id] = {id, message};
  res.json(comments[id]);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  res.json(comments[req.params.id]);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const {message} = req.body;
  comments[req.params.id].message = message;
  res.json(comments[req.params.id]);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  delete comments[req.params.id];
  res.json({message: 'Success'});
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});