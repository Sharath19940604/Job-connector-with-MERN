const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function veducationp(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.schooling = !isEmpty(data.schooling) ? data.schooling : "";
  data.deg = !isEmpty(data.deg) ? data.deg : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.Areaofstudy = !isEmpty(data.Areaofstudy) ? data.Areaofstudy : "";
  
// schooling checks
  if (Validator.isEmpty(data.schooling)) {
    errors.schooling = "schooling field is required";
  } 
// deg checks
  if (Validator.isEmpty(data.deg)) {
    errors.deg = "deg field is required";
  }

//from check
if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

if (Validator.isEmpty(data.to)) {
    errors.to = "to field is required";
  }

if (Validator.isEmpty(data.Areaofstudy)) {
    errors.Areaofstudy = "Areaofstudy field is required";
  }


return {
    errors,
    isValid: isEmpty(errors)
  };
};