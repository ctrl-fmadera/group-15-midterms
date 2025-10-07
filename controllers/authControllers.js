const { registerUser, loginUser } = require('../services/userService');
const { validateRegister, validateLogin } = require('../utils/validator');

exports.register = async (req, res) => {
  try {
    const error = validateRegister(req.body);
    if (error) return res.status(400).json({ msg: error });

    const user = await registerUser(req.body);
    res.status(201).json({ msg: "Registered successfully", user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return res.status(400).json({ msg: error });

    const { token, user } = await loginUser(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
