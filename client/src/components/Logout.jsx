import React from 'react'
import {BiPowerOff} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate()
  const logoutFunc = ()=>{
  
    localStorage.removeItem('chat-app-user');
    navigate('/login')
    
  }
  return (
    <div className='bg-purple-400 px-2 py-1 rounded-md' onClick={logoutFunc}>
      <BiPowerOff color='white' fontSize={19}/>
    </div>
  )
}

export default Logout
