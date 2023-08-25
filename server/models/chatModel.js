const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    users:[{type:mongoose.Types.ObjectId, ref: 'User'} ]
},{timestamps:true});


module.exports = mongoose.model('Chat', chatSchema)