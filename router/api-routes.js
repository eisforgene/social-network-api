const app = require('express').Router();
let User = require('../models/User');

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

app.post('/api/users/:userId/friends/:friendId', ({ body }, res) => {
    User.create(body)
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put('/api/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
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

app.delete('/api/users/:id', (req, res) => {
    User.destroy({ _id: req.params.id })
        .then(dbUser => {
            console.log(dbUser);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.destroy({ _id: req.params.id })
        .then(dbUser => {
            console.log(dbUser);
        })
        .catch(({ message }) => {
            console.log(message);
        });
})

module.exports = app;