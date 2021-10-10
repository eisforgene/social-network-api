db.User.create({ name: 'Ernest Hemingway' })
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get('/notes', (req, res) => {
  db.Note.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/user', (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/submit', ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/populate', (req, res) => {
  db.User.find({})
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