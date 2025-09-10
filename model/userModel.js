const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on SAVE(CREATE) NOT UPDATE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
