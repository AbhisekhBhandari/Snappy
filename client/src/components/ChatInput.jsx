import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const toggleShowEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  return (
    <div className="flex items-center gap-4 py-4 px-4">
      <div className="relative cursor-pointer bg-transparent">
        <BsEmojiSmileFill
          color="yellow"
          fontSize={22}
          onClick={toggleShowEmojiPicker}
        />
        {showEmojiPicker && (
          <div className="absolute top-[-310px] ">
            <Picker
              theme="dark"
              searchDisabled={true}
              onEmojiClick={handleEmojiClick}
              height={300}
              width={300}
            />
          </div>
        )}
      </div>
      <div className="bg-[#ffffff34] text-white flex-1 flex rounded-xl overflow-clip">
        <input
          type=" text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 py-3 bg-transparent px-3 outline-none "
        />
        <button className="h-full bg-[#9a86f3]  flex items-center justify-center py-4 px-6">
          <IoMdSend fontSize={22} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
