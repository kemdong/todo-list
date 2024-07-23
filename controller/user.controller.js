const UserService = require('../services/user.services');

exports.register = async (req, res, next) => {
  try {
    console.log('Registration request received:', req.body);
    const { username, email, password } = req.body;

    const existingUser = await UserService.checkUser(email);
    if (existingUser) {
      return res.status(400).json({ status: false, message: "Email is already registered" });
    }

    const successRes = await UserService.registerUser(username, email, password);
    res.json({ status: true, success: "User registered successfully" });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ status: false, message: 'Registration failed' });
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    const user = await UserService.checkUser(email);
    if (!user) {
      return res.status(404).json({ status: false, message: "User does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Incorrect password" });
    }

    const payload = { _id: user._id, email: user.email };

    const secretKey = "your_secret_key";
    const expiresIn = '1h';

    const token = await UserService.generateToken(payload, secretKey, expiresIn);

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Login failed' });
  }
};
