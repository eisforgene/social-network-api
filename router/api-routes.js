const app = require('express').Router();
let User = require('../models/User');

User.create({ name: 'Ernest Hemingway' })
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get('/api/users', (req, res) => {
  User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    }); 
});

app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/api/users', ({ body }, res) => {
  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/populate', (req, res) => {
  User.find({})
    .populate({
      path: 'notes',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});