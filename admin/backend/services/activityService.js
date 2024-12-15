const activityModel = require("../models/Activitis");

const setActivityService = async (activity)=>{
    try {
        const res = await activityModel.create(activity);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    setActivityService
}