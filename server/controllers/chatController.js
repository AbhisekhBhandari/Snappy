const  Chat  = require("../models/chatModel");

exports.createChat = async(req,res, next) =>{
    const {from , to }= req.body;
    const chatCheck = await Chat.findOne({users:{$all:[from,to]}})
    if(chatCheck) return res.json({chatCheck});
    else{
        const newChat = new Chat({
            users: [from, to]
        })
       const chat = await newChat.save();
       return res.json({chat})
    }
}