const Joi = require("joi");

exports.validatePost = (data) =>
  Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().required(),
    excerpt: Joi.string().max(200).optional(),
    featuredImage: Joi.string().optional(),
    slug: Joi.string().optional(),
    author: Joi.string().hex().length(24).required(),
    category: Joi.string().hex().length(24).required(),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublished: Joi.boolean().optional(),
  }).validate(data);
