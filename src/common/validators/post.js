const Joi = require("joi");

const postSchema = Joi.object({
  description: Joi.string().required(),
  published: Joi.boolean(),
  tags: Joi.string(),
  content: Joi.allow(),
  thumbnail: Joi.allow(),
});

module.exports = {
  postSchema,
};
