const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const chatController = require('./controllers/chatController')
const {Server} = require("socket.io");
require("dotenv").config();
const path = require('path')

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log("utl", req.method, req.url);
  next();
});

app.use(express.json());

app.use("/api/auth", userRoutes);
app.post('/api/chatcheck',chatController.createChat)

app.use("/api/messages", messageRoutes);



mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
  })
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT, () => {
});

const io = new Server(server, {
  cors:{
    origin:["http://localhost:5173","https://ssnappy.netlify.app"]
  }

})


io.on('connection', (socket)=>{
  socket.on('join-chat',(chatID)=>{
    socket.join(chatID);
    console.log('JOINED', chatID);
    // console.log('rroms', socket.rooms);
  })
  socket.on('send-message',(data)=>{
    socket.to(data.chatId).emit('receive-message', data.msg)
  })
})


// global.onlineUsers = new Map();
// io.on('connection', (socket)=>{
//   global.chatSocket = socket;

//   socket.on('add-user',(userId)=>{
//     socket.handshake.query.myRoomId = []
//     console.log('setting', socket.rooms, socket.id);
//     onlineUsers.set(userId, socket.id)
//   });

//   socket.on('send-msg',(data)=>{
//     const sendUserSocket = onlineUsers.get(data.to);
  
//     console.log('data',data);
    
//     if(sendUserSocket){
//       socket.to(sendUserSocket).emit('msg-receive', data.msg)
//     }
//   })



// })





// io.on("connection", (socket)=>{
//     socket.on("setup",(userData)=>{
//       console.log(userData._id);
//       socket.join(userData._id)
//       console.log('socketRooms',socket.rooms);
//     })

//     socket.on('sent-message', (message, room)=>{
//       console.log('message,',message, room);
//       socket.to(room).emit('receive-message', message)
//     })

// })