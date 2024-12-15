const { loginService, createAccountService, getUser } = require("../services/accountService");

const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    const data = await loginService(username, password);

    return res.status(200).json(data);
}

const getProfile = async (req, res) => {
    const {username} = req.query;
    const data = await getUser(username);
    return data;
}

const createUser = async (req, res) => {
    const {username, password, role} = req.body;
    const data = await createAccountService(username, password, role);
    return res.status(200).json(data);
}


module.exports = {
    handleLogin, getProfile, createUser
}