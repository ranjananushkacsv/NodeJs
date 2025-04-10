const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
  };
  
  const fsPromises = require('fs').promises;
  const path = require('path');
  const bcrypt = require('bcryptjs');
  
  const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required!" });
    }
  
    const duplicate = userDb.users.find(user => user.username === username);
    if (duplicate) {
      return res.sendStatus(409); // Conflict
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, password: hashedPassword };
      userDb.setUsers([...userDb.users, user]);
  
      await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(userDb.users, null, 2)  // Optional: pretty print
      );
  
      res.status(201).json({ message: "New user created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { handleNewUser };
  