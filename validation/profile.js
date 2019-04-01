const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function vip(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if(!Validator.isLength(data.handle,{ min:4, max:60})){
      errors.handle = 'length of handle should be between 4 and 60';
  }

  if(Validator.isEmpty(data.handle)){
      errors.handle = 'handle cant be empty';
  }

  if(Validator.isEmpty(data.status)){
      errors.status = 'status cannot be empty';
  }

  if(Validator.isEmpty(data.skills)){
      errors.skills = 'skills cannot be empty';
  }

  if(!isEmpty(data.website)){
      if(!Validator.isURL(data.website)){
          errors.website = 'not a valid form of website';
      }
  }

  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
        errors.facebook = 'not a valid form of facebook';
    }
}

if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)){
        errors.linkedin = 'not a valid form of linkedin';
    }
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};