const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).max(20).required(),
  reapetPassword: Joi.ref("password"),
  gender: Joi.string().valid("male", "female"),
});

module.exports = {
  authSchema,
};
