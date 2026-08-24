const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Invalid email'] // imported isEmail email from validator, to validate email
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 chars']
  }
}, { timestamps: true }); //automatically adds created/update at time

// Add hashed password
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
});


// Save user to DB
userSchema.post('save', function (doc) {
  console.log('New user was created & saved', doc);
  // modern mongoose doesn't require next()
})

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); // this refers to User model
  // check if we have the user
  if (user) {
    const auth = await bcrypt.compare(password, user.password); //comparing pw user signs in with the hashed password, bcrypt will handle the hashing for us
    if (auth) { // truthy if password and hashed pw match
      return user;
    };
    throw Error('incorrect password');
  };
  throw Error('incorrect email');
};

const User = mongoose.model('User', userSchema) // must be singlecase user here for Mongodb. userSchema matches defined schmema above

module.exports = User;