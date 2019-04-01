const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function vep(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  
// title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  } 
// company checks
  if (Validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }

//from check
if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

//if (Validator.isEmpty(data.to)) {
  //  errors.to = "to field is required";
 // }

return {
    errors,
    isValid: isEmpty(errors)
  };
};