const Card = require('../models/card');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT,
} = require('../errors/error-codes');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'ValidationError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ message: 'Карточка была успешно удалена' });
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: 'true' })
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: 'true' })
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      let responseStatus = ERROR_CODE_DEFAULT;
      if (err.name === 'CastError') {
        responseStatus = ERROR_CODE_VALIDATION;
      }
      res.status(responseStatus).send({ message: err.message });
    });
};
