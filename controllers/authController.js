const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
  };
  
  const bcrypt = require('bcryptjs');
  
  const handleLogin = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required" });
    }
  
    const foundUser = usersDB.users.find(user => user.username === username);
    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }
  
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      res.json({ message: "User Logged In" });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };
  
  module.exports = { handleLogin };
  