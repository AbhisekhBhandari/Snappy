import React from 'react'
import LoaderImg from '../assets/LoaderImg.gif';
const Loader = () => {
  return (
    <div className=" bg-registerBg h-screen w-screen flex items-center justify-center flex-col gap-5">
    <img src={LoaderImg} className="" alt="Loader" />
  </div>
  )
}

export default Loader;
