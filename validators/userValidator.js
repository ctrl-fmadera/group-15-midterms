const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (data) => {
  const { username, password, role } = data;

  const existing = await User.findOne({ username });
  if (existing) throw new Error('Username already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });

  return user;
};

exports.loginUser = async (data) => {
  const { username, password } = data;

  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // generate token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user: { id: user._id, username: user.username, role: user.role } };
};
