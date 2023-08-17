const { Joi } = require("../../utils/validators");

const login = Joi.object().keys({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  rememberme:Joi.optional(),
  subscription:Joi.optional(),
});
module.exports = { login };
