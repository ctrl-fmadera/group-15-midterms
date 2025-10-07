exports.validateRegister = ({ username, password, role }) => {
  if (!username || !password) return 'Username and password are required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (role && !['student', 'instructor'].includes(role)) return 'Invalid role';
  return null;
};

exports.validateLogin = ({ username, password }) => {
  if (!username || !password) return 'Both username and password are required';
  return null;
};
