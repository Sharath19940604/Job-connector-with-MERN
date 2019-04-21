const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function veducationp(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  
// schooling checks
  if (Validator.isEmpty(data.school)) {
    errors.school = "schooling field is required";
  } 
// deg checks
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "deg field is required";
  }

//from check
if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

if (Validator.isEmpty(data.to)) {
    errors.to = "to field is required";
  }

if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Areaofstudy field is required";
  }


return {
    errors,
    isValid: isEmpty(errors)
  };
};