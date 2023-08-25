import React, { useEffect, useState, useRef } from "react";
import Contacts from "../components/Contacts";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host, chatCheck } from "../utils/APIRoutes";
import Loader from "../components/Loader";
import WelcomeChat from "../components/WelcomeChat";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [chatId, setChatId] = useState(undefined);
  const navigate = useNavigate();
  const socketRef = useRef();

  const showToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    return false;
  };

  const fetchnow = async () => {
    const userId = await JSON.parse(localStorage.getItem("chat-app-user"))._id;
    const fetchNow = await fetch(`${allUsersRoute}/${userId}`);
    const json = await fetchNow.json();
    if (!fetchNow.status) {
      showToast("Error fetching Contacts. Please try again later.");
    } else {
      setContacts(json.users);
    }
  };

  const onChatChange = async () => {
    if (currentUser && currentChat) {
      const chatChecker = await axios.post(chatCheck, {
        from: currentUser._id,
        to: currentChat._id,
      });

      setChatId(chatChecker.data.chatCheck._id);
    }
  };
  useEffect(() => {
    if (chatId) {
      console.log("chatId", chatId);

      socketRef.current.emit("join-chat", chatId);
    }
  }, [chatId]);

  const changeChat = (contact) => {
    setCurrentChat(contact);
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        fetchnow();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    socketRef.current = io(host);
  }, []);

  useEffect(() => {
    onChatChange();
    if (currentUser) {
    }
  }, [currentChat]);

  if (!currentUser) {
    return <Loader />;
  }

  return (
    <div className=" bg-chatBg h-screen w-screen flex items-center justify-center">
      <div className=" md:h-[85vh] h-full w-full  flex md:w-[85vw] bg-chatContainer ">
        <div className="w-2/5  md:w-1/4 bg-slate-400 h-full">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={changeChat}
          />
        </div>
        <div className="w-3/5 md:w-3/4 h-full">
          {currentChat === undefined ? (
            <WelcomeChat currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socketRef.current}
              chatId={chatId}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
