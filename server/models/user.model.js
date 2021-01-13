import mongoose from 'mongoose';
import bCrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: { type: String, trim: true, lowercase: true },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.virtual('password').set(function (password) {
  this._password = password;
});

UserSchema.methods = {
  authenticate(preHashedPass, callback) {
    // compare preHashedPassword with the hashed password
    // if error when comparing, return error, if done comparing,
    // the result returned as second argument of callback (isMatch)
    bCrypt.compare(preHashedPass, this.hashed_password, (err, isMatch) => {
      if (err) return callback(err);
      return callback(null, isMatch);
    });
  },
  encryptPassword(password, callback) {
    bCrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      return callback(null, hashedPassword);
    });
  },
};

UserSchema.pre('validate', function (next) {
  if (!this._password) return next();
  this.encryptPassword(this._password, (err, hashed) => {
    if (err) return next(err);
    this.hashed_password = hashed;
    return next();
  });
});

export default mongoose.model('User', UserSchema);
