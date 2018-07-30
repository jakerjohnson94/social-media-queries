const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
  database: 'social-media',
});

app.listen(3000, () => {
  client.connect();
  console.log('we here');
});

app.get('/users', (req, res) => {
  client.query('SELECT * FROM users', (err, result) => {
    res.send(result.rows);
  });
});

app.post('/users', (req, res) => {
  const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';

  const values = [req.body.username, req.body.bio];
  client.query(text, values, (err, result) => {
    res.send(result.rows[0]);
  });
});

app.get('/users/:id', (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  const text = 'SELECT * FROM users WHERE id = $1';
  const values = [userID];
  client.query(text, values, (err, result) => {
    res.send(result.rows);
  });
});
