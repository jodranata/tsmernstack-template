import { validationResult } from 'express-validator';

const validateEmptyForm = (req, res, next) => {
  // validate the req headers
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(err => err.msg);
    return res.status(422).json({
      success: false,
      message: 'Cannot handle request',
      error: firstError,
    });
  }
  const { body } = req;
  const bodyErrors = {};

  // check if req.body has the properties or value for firstname, username & email
  Object.keys(body)
    .filter(key => key !== 'lastname' && key !== 'lastName')
    .forEach(key => {
      if (!body[key]) bodyErrors[key] = `${key} cannot be empty`;
    });

  if (Object.values(bodyErrors).filter(val => val).length > 0) {
    res
      .status(400)
      .json({ success: false, message: 'Failed to validate form', error: bodyErrors });
    throw new Error(bodyErrors);
  }
  req.auth = body;
  return next();
};

export default validateEmptyForm;
