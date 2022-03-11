const Message = require('../models/messageModel');


const getChat = async (req, res) => {
    const myId = req.uid;
    const fromMessages = req.params.from; 
    const last30 = await Message.find({
        $or: [{from: myId, to: fromMessages}, {from: fromMessages, to: myId}]
    }).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok : true,
        messages: last30
    });
    
}

module.exports = {
    getChat
}