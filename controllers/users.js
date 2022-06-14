const User = require('../models/user');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT,
} = require('../errors/error-codes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'ValidationError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: 'true' })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: 'true' })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};
