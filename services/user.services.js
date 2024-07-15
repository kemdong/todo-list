const User = require('../schemas/user');
const jwt = require('jsonwebtoken');

class UserService {
  static async registerUser(username, email, password) {
    try {
      const createUser = new User({ username, email, password });
      return await createUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async checkUser(email) {  // Ensure method name matches
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(tokenData, secretKey, jwtExpire) {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwtExpire });
  }
}

module.exports = UserService;