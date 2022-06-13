const Card = require('../models/card');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT,
} = require('../errors/errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards.map((card) => {
      const {
        _id, name, link, owner, likes, createdAt,
      } = card;
      return {
        _id, name, link, owner, likes, createdAt,
      };
    })))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send({ message: 'Карточка была успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: 'true', runValidators: 'true' })
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: 'true', runValidators: 'true' })
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
      }
    });
};
