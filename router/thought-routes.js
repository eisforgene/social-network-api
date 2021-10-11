const app = require('express').Router();
let Thought = require('../models/Thought');

app.get('/api/thoughts', (req, res) => {
    Thought.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get('/api/thoughts/:id', (req, res) => {
    Thought.findById(req.params.id)
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post('/api/thoughts', ({ body }, res) => {
    Thought.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true })
    )    
    .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put('/api/thoughts/:id', (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, { $set: req.body })
        .populate({
            path: 'thought',
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

app.delete('/api/thoughts/:id', (req, res) => {
    Thought.destroy({ _id: req.params.id })
        .then(dbUser => {
            console.log(dbUser);
        })
        .catch(({ message }) => {
            console.log(message);
        });
})

module.exports = app;