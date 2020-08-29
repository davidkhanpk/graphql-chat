const { User } = require('../models');
const bcrypt = require('bcryptjs')
const { UserInputError } = require("apollo-server")
module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch(e) {

            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args
            let errors = {}
            try {
                if(email.trim() == '') errors.email = "Email must not be empty"
                if(username.trim() == '') errors.username = "Username must not be empty"
                if(password.trim() == '') errors.password= "Password must not be empty"
                if(confirmPassword.trim() == '') errors.confirmPassword = "Confirm Password must not be empty"
                if(confirmPassword != password) errors.password = "Password must match"

                // const checkUserByUsername = await User.findOne({where: {username}})
                // const checkUserByEmail = await User.findOne({where: {username}})
                // if(checkUserByUsername) errors.username = "Username is taken"
                // if(checkUserByEmail) errors.email = "Email is taken"

                if(Object.keys(errors).length) {
                    throw errors
                }
                password = await  bcrypt.hash(password, 6)
                const user = await User.create({
                    username, email, password, 
                })
                return user;
            } catch(err) {
                console.log(err);
                if(err.name == "SequelizeUniqueConstraintError") {
                    err.errors.forEach((e) => {
                        errors[e.path] = `${e.path} is already taken`
                    })
                }
                else if(err.name == "SequelizeValidationError") {
                    err.errors.forEach((e) => {
                        errors[e.path] = e.message
                    })
                }
                throw new UserInputError("Bad input", {errors})
            }
        }
    }
}