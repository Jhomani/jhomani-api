const Joi = require('joi');

const schema = {
  email: 'string',
  password: 'string',
  name: 'string',
};

const registerSchema = Joi.object({
  email: Joi.string().email().min(4).max(25).required(),
  password: Joi.string().min(6).max(32).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(4).max(25).required(),
  password: Joi.string().min(6).max(32).required(),
});

const patchSchema = Joi.object({
  email: Joi.string().email().min(4).max(25),
  password: Joi.string().min(6).max(32),
  name: Joi.string(),
});

module.exports = { loginSchema, patchSchema, registerSchema, schema };