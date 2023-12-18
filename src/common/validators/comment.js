const Joi = require("joi");

const commentSchema = Joi.object({
    message: Joi.string().min(1).max(40)
});

module.exports = {
    commentSchema,
};
