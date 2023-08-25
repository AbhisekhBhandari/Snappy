import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.svg";
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className="flex flex-col items-center pt-2 bg-[#080420] h-full gap-3">
      <div className="flex items-center h-[10%]">
        <img src={Logo} alt="Snappy" className="h-7" />
        <span className=" text-xl font-semibold text-white">SNAPPY</span>
      </div>
      <div id="style-3" className="w-full px-1  h-[80%] overflow-auto ">
        {contacts?.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={` flex  items-center gap-2 w-full py-2 px-2 bg-[#ffffff34] cursor-pointer ${currentSelected === index ? 'bg-[#9a86f3]' :''}`}
              onClick={()=>changeCurrentChat(index, contact)}
            >
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt="avatar"
                className="h-12"
              />
              <p className=" font-bold text-white">{contact.username}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 h-[10%]">
        <img
          src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
          alt="Avatar"
          className="h-11 "
        />
        <p className="  md:text-2xl font-bold text-white ">
          {currentUser.username}
        </p>
      </div>
    </div>
  );
};

export default Contacts;
