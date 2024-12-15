const { setActivityService } = require("../services/activityService");

const setActivity = async(req, res) =>{
    const data = {
        username: req.body.username,
        type: req.body.type,
        time: Date(),
        idBill: req.body.idBill
    }
    try {
        const responce = await setActivityService(data);
        res.json(responce);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    setActivity
}