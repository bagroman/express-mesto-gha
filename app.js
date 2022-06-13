const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '62a4c1f56396be4661019f96',
  };
  next();
});

app.get('/users', require('./routes/users'));
app.get('/users/:userId', require('./routes/users'));
app.post('/users', require('./routes/users'));
app.get('/cards', require('./routes/cards'));
app.post('/cards', require('./routes/cards'));
app.delete('/cards/:userId', require('./routes/cards'));
app.patch('/users/me', require('./routes/users'));
app.patch('/users/me/avatar', require('./routes/users'));
app.put('/cards/:cardId/likes', require('./routes/cards'));
app.delete('/cards/:cardId/likes', require('./routes/cards'));

app.listen(PORT, () => {});
