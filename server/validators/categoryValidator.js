const Joi = require("joi");

exports.validateCategory = (data) =>
  Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(200).optional(),
  }).validate(data);
