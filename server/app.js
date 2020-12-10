const express = require('express');
const path = require('path');
const db = require('../database/models.js');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendStatus(200);
});



//UPDATE README WHEN YOU CHANGE THESE

// Inserts a user's tour request to the database
app.post('/api/tours/:id/requests', (req, res) => {
  const id = req.params.id;
  db.insertRequest(id, req.body)
  .then(() => res.sendStatus(200))
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Gets list of all agents and send to the client.
app.get('/api/tours/:id/agents', (req, res) => {
  const id = req.params.id;
  db.getAgents(id)
  .then((agents) => res.status(200).send(agents))
  .catch((err) => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Get date and time of every request in db for the given property
app.get('/api/tours/:id/requests', (req, res) => {
  const id = req.params.id;
  db.getRequests(id)
  .then((results) => res.status(200).send(results))
  .catch((err) => res.status(500).send(err));
});

  // Update date and time of user tour in db (fix function)
app.put('/api/tours/:id/requests', (req, res) => {
  const id = req.params.id;
  db.getRequests(id, req.body)
  .then((results) => res.status(200).send(results))
  .catch((err) => res.status(500).send(err));
});

// Delete a date and time tour request for a user in db (fix function)
app.delete('/api/tours/:id/requests', (req, res) => {
  const id = req.params.id;
  db.getRequests(id)
  .then((results) => res.status(200).send(results))
  .catch((err) => res.status(500).send(err));
});


module.exports = app;
