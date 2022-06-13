const User = require('../models/user');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT,
} = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users.map((user) => {
      const {
        _id, name, about, avatar,
      } = user;
      return {
        _id, name, about, avatar,
      };
    })))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const {
        _id, name, about, avatar,
      } = user;
      res.send({
        _id, name, about, avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: 'true' })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: 'true' })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};
