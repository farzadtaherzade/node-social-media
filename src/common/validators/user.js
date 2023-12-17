const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().lowercase(),
  email: Joi.string().email(),
  phone: Joi.number(),
  bio: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});

module.exports = {
  userSchema,
};
