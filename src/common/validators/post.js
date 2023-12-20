const Joi = require("joi");

const postSchema = Joi.object({
  description: Joi.string().required(),
  published: Joi.boolean(),
  tags: Joi.string(),
  content: Joi.allow(),
  thumbnail: Joi.allow(),
});

const postQuerySchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});

module.exports = {
  postSchema,
};
