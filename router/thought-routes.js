const app = require('express').Router();
let Thought = require('../models/Thought');

app.get('/api/thoughts', (req, res) => {
    Thought.find({})
        .then(dbUser => {
            console.log(dbUser);
            //res.json(dbUser);
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
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
    // .then(({ _id }) =>
    //   Thought.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true })
    // )    
    .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post('/api/thoughts/:thoughtId/reactions', ({ body, params }, res) => {
    Thought.findOneAndUpdate({_id: params.thoughtId}, { $push: { reactions: body } }, { new: true })
    // .then(({ _id }) =>
    //   Thought.findOneAndUpdate({}, { $push: { reactions: _id } }, { new: true })
    // )    
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
    Thought.findOneAndDelete({ _id: req.params.id })
    
        .then(dbUser => {
            if(!dbUser) {
                res.json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(({ message }) => {
            res.json(message);
        });
})

app.delete('/api/thoughts/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbUser => {
            if(!dbUser) {
                res.json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbUser);
        })
        .catch(({ message }) => {
            res.json(message);
        });
})

module.exports = app;