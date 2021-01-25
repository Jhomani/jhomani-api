const Joi = require('joi');

const schema = {
  name: 'string',
  price: 'number',
  description: 'string',
};

const postSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(10).max(1000).required(),
  description: Joi.string().min(10).max(100).required(),
  categoryId: Joi.string()
});

const patchSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(10).max(1000),
  description: Joi.string().min(10).max(100),
  categoryId: Joi.string()
});

module.exports = { patchSchema, postSchema, schema };