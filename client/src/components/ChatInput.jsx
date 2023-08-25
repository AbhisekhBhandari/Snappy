import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && 
            <div className="absolute top-[-500px]">
            <Picker  onEmojiClick={handleEmojiClick} />
            </div>
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" >
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

// import React, { useState } from "react";
// import { IoMdSend } from "react-icons/io";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import Picker from "emoji-picker-react";

// const ChatInput = () => {
//   const [showEmojiPicker,setShowEmojiPicker] = useState(false);
//   const[ msg, setMsg] = useState('')

//   const toggleShowEmojiPicker = ()=>{
//     setShowEmojiPicker(prev=>!prev)
//   };
//   const handleEmojiClick=(event, emojiObject)=>{
//     let message = msg;
//     message += emojiObject.emoji;
//     setMsg(message)

//   }

//   return (
//     <div className=" h-full flex w-full items-center px-3">
//       <div className="relative cursor-pointer w-[5%] bg-transparent">
//         <BsEmojiSmileFill color="yellow" fontSize={22} onClick={toggleShowEmojiPicker}/>
//         {showEmojiPicker && 
//             <div className="absolute top-[-310px] ">
//             <Picker theme="dark" searchDisabled={true} onEmojiClick={handleEmojiClick} height={300} width={300}/>
//             </div>
//         }
//       </div>
//       <div className="bg-[#ffffff34] w-[95%] flex   rounded-xl h-[90%]">
//         <input
//           type=" text"
//           value={msg}
//           onChange={(e)=>setMsg(e.target.value)}
//           className=" w-[85%] h-full bg-transparent px-3  outline-none  rounded-xl  "
//         />
//         <button className="w-[15%] h-full bg-[#9a86f3] rounded-xl flex items-center justify-center ">
//           <IoMdSend fontSize={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;