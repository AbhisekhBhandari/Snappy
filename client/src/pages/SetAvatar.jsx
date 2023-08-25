import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";

import axios from "axios";
const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  console.log("twice");
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
  const setProfilePicture = async () => {
    console.log("heter", selectedAvatar, avatars);
    if (selectedAvatar === undefined) {
      showToast("Please Select An Avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        console.log("data", data);
        user.avatarImage = data.image;
        console.log("user", user);
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        showToast("Error setting avatar. Please try again.");
      }
    }
  };
  const fetchAvatars = async () => {
    const data = [];
    const apiKey = "McX1Tr4DfIFPnh";
    for (let i = 0; i < 4; i++) {
      console.log(i);
      const apiName = `${api}/${Math.round(
        Math.random() * 1000
      )}?apikey=${apiKey}`;
      const image = await axios.get(apiName);
      console.log("Image", image);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    console.log("dine");
    setAvatars(data);
    setLoading(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      fetchAvatars();
    }
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className=" bg-registerBg h-screen w-screen flex items-center justify-center flex-col gap-5">
        <div className="text-4xl font-semibold text-white">
          <h1>Pick an avatar as your profile picture:</h1>
        </div>
        <div className="flex gap-x-10">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedAvatar(index);
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  className={`h-28 p-1 ${
                    selectedAvatar === index
                      ? " border-registerInput border-8 rounded-full"
                      : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setProfilePicture()}
          className="bg-registerButton px-4 py-3 mt-5 rounded-md text-white font-semibold text-lg hover:bg-buttonHover"
        >
          Set as Profile Picture
        </button>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default SetAvatar;
