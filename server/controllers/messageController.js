const Chat = require("../models/chatModel");
const Messages = require("../models/messageModal");
exports.addMessage = async (req, res, next) => {
  try {
    console.log("here now", req.body);
    const { from, to, message } = req.body;
    const chatCheck = await Chat.findOne({
      users: { $all: [from, to] },
    });
    let chatId;
    if (chatCheck) {
      console.log(chatCheck);
      chatId = chatCheck._id;
    } else {
      const createChat = new Chat({
        users: [from, to],
      });
      const chat = await createChat.save();
      chatId = chat._id;
    }

    const data = await Messages.create({
      message: { text: message },
      chat: chatId,
      sender: from,
    });
    if (data) return res.json({ msg: "Message Added Successfully" });
    return res.json({ msg: "Failed to load messages" });
  } catch (err) {
    next(err);
  }
};
exports.getAllMessage = async (req, res, next) => {
  try {
      const { from, to } = req.body;

    const getChatId = await Chat.findOne({users:{$all:[from, to]}})
    if(!getChatId) return res.json([]);
    const fetchMessages = await Messages.find({chat: getChatId._id}).sort({upadatedAt:1});

    const projectedMessages = fetchMessages.map(message=>{
        return{
            fromSelf: message.sender.toString() === from,
            message: message.message.text
        }
    })
    res.json(projectedMessages)
  } catch (err) {
    next(err);
  }
};
