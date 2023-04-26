const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    userName: Joi.string().require().label('User Name'),
    email: Joi.string().email().require().label('Email'),
    password: passwordComplexity().require().label('Password'),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().require().label('Email'),
    password: Joi.string().require().label('Password'),
  });
  return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().require().label('Refresh Token'),
  });
  return schema.validate(body);
};

const customerBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().require().label('Email'),
    name: Joi.string().require().label('Name'),
    balance: Joi.number().label('Balance'),
  });
  return schema.validate(body);
};

module.exports = { signUpBodyValidation, logInBodyValidation, refreshTokenBodyValidation, customerBodyValidation };
