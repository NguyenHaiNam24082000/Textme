const Joi = require("joi");

const createFriendRequest = {
  body: Joi.object().keys({
    username: Joi.string().min(4).required(),
    discriminator: Joi.string().min(5).max(5).required(),
  }),
};

module.exports = {
  createFriendRequest,
};
