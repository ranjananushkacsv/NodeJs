const userDb ={
    users:require('../models/users.json'),
    setUsers: function(data){this.users=data}
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcryptjs')

const handelNewUser = async(req.res) => {
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({message:"username and password required!"})
        const duplicate = userDb.users.find(user=>user.username===username)
        if(duplicate)
            res.sendstatus(400)
        try{
            const hashedPassword = await  bcrypt.hash(password,10)
            const user = {username,passowrd:hashedPassword}
            userDb.setUsers( [...userDb.users,newuser])
            await fsPromises.writeFile(path.join(__dirname,'..','models','user.json' ),JSON.stringify(userDb.users))
            res.status(201)
        } catch (error) {
            res.status(500).json({ message: error.message });
          }

          



        }

}
module.exports = { handleNewUser };


