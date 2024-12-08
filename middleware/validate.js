const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    middleName: 'string',
    lastName: 'required|string',
    year: 'required|integer|min:1|max:7',
    birthday: 'required|date',
    userId: 'required|string',
    // Exclude 'house' to enforce random assignment
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveStudent,
};