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

app.post('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId,
        { $push: { friends: req.params.friendId } }, { new: true })
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
    User.findOneAndDelete({ _id: req.params.id })
        .then(dbUser => {
            if (!dbUser) {
                res.json({ message: 'No id found!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(({ message }) => {
            res.json(message);
        });
});

app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId } }, { new: true })
        .then(dbUser => {
            if (!dbUser) {
                res.json({ message: 'No id found!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(({ message }) => {
            res.json(message);
        });
});

module.exports = app;