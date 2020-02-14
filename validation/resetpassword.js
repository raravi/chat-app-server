const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateResetPasswordInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.resetcode = !isEmpty(data.resetcode) ? data.resetcode : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Reset Code checks
  if (Validator.isEmpty(data.resetcode)) {
    errors.resetcode = "Reset code is required";
  } else if ( !Validator.isNumeric(data.resetcode, {no_symbols: false}) &&
              data.resetcode.length !== 6) {
    errors.email = "Reset Code is in invalid format";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
