import React from 'react';
import Robot from '../assets/robot.gif'

const WelcomeChat = ({currentUser}) => {
  return (
    <div className='flex flex-col h-full w-full  items-center justify-center'>
      <img src={Robot} alt='Robot' className=' h-[350px]'/>
      <p className='text-xl font-bold text-white' >Welcome, <span className='text-darkBlue'>{currentUser.username}</span></p>
      <p className='text-xl font-bold text-white'>Please select a chat to start messaging.</p>
    </div>
  )
}


export default WelcomeChat
WelcomeChat