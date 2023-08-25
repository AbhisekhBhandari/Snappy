import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";


const ChatContainer = ({ currentChat, currentUser, socket, chatId }) => {
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    const getMessages = async () => {
      if(currentChat){

        const response = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        console.log(response.data);
        setMessages(response.data);
      };
    }
      getMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    setMessages(prev=>[...prev,{
      fromSelf: true,
      message: msg
    }])
    socket.emit('send-message', {
      to:currentChat._id,
      from: currentUser._id,
      msg,chatId
    })

  };
useEffect(()=>{
  socket.on('receive-message',(message)=>{
    setMessages(prev=>[...prev,{
      fromSelf:false,
      message: message
    }])
  })

},[])

  


  return (
    <div className=" h-full  w-full relative">
      <div className="flex w-full  bg-black items-center justify-between px-6 py-4">
        <div className="flex  items-center gap-2">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="Avatar"
            className="h-10"
          />
          <p className="text-white">{currentChat.username}</p>
        </div>
        <Logout />
      </div>
      <div className=" h-[82%] overflow-auto mx-3 " id="style-3">
          {messages?.map((message, index) => {
            return (
              <div key={index}  className="mb-3 ">
                <div className={`flex items-center ${message.fromSelf ? ' justify-end' :' justify-start'}`}>
                  <div className={` text-white px-4 py-3 rounded-xl ${message.fromSelf ? 'bg-[#4f04ff21] ' : 'bg-[#9900ff20]'}`}>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className=" absolute bottom-0 w-full">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};

export default ChatContainer;
