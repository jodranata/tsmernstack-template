import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../config/env.config.js';

export const loginController = (req, res) => {
  const { auth } = req;
  const query = {};
  if (auth.userName) {
    query.userName = auth.userName;
  } else if (auth.email) {
    query.email = auth.email;
  }

  User.findOne(query).exec((findErr, user) => {
    if (findErr) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error', error: findErr });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.authenticate(auth.password, (authErr, isMatch) => {
      if (authErr) {
        return res.status(422).json({
          success: false,
          message: 'Failed to authenticate user',
          error: authErr,
        });
      }
      if (!isMatch) {
        return res
          .status(403)
          .json({ success: false, message: 'Wrong password, please try again' });
      }

      const { userName, firstName, lastName, _id } = user;

      jwt.sign({ _id }, config.JWT_SIGNIN_KEY, { expiresIn: '3h' }, (signErr, token) => {
        if (signErr) {
          return res
            .status(4004)
            .json({ success: false, message: 'Cannot create token' });
        }
        return res.status(200).json({
          success: true,
          message: `welcome back ${firstName}`,
          user: {
            firstName,
            lastName,
            userName,
          },
          token,
        });
      });
    });
  });
};

export const registerController = (req, res) => {
  const { auth } = req;
  User.findOne({ userName: auth.userName }, (findErr, user) => {
    if (findErr) {
      return res.status(500).json({ success: false, message: findErr.message });
    }
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Account with that username exist' });
    }

    const newUser = new User(auth);
    newUser
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: 'Account is created, please sign in' }),
      )
      .catch(regisErr =>
        res
          .status(400)
          .json({ success: false, message: 'internal server error', error: regisErr }),
      );
  });
};
