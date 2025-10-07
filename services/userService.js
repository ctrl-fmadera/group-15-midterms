const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (data) => {
  const { username, password, role } = data;

  const existing = await User.findOne({ username });
  if (existing) throw new Error('Username already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });

  return user;
};
