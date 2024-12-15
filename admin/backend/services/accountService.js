require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountModel = require("../models/Account");
const saltRounds = 10;

const loginService = async(username, password) => {
    try {
        //fetch email
        const user = await accountModel.findOne({username: username});
        if(user){
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if(!isMatchPassword){
                return{
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            }else{
                //create access token
                const payload = {
                    username: user.username,
                    role: user.role
                }

                const access_token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return {
                    EC:0,
                    access_token,
                    user: {
                        username: user.username,
                        role: user.role
                    }
                };
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createAccountService = async(username, password, role) => {
    try {
        //check user exist
        const user = await accountModel.findOne({username});
        if(user){
            return null;
        }

        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
    
        //save user to datebase
        let result = await accountModel.create({
            username: username,
            password: hashPassword,
            role: role
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUser = async(username)=>{
    try {
        const user = accountModel.findOne({username: username});
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    loginService, createAccountService, getUser
}