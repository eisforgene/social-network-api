const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./router/api-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(UserRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
