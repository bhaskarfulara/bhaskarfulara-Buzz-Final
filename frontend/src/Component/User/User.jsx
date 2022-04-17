import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
 

function User({userId,name,avatar}) {

  const {user}=useSelector((state)=>state.user);

  if(user._id.toString()===userId.toString()){
    return (null)
  }
  return (
    
    <div>
            <Link to={`/user/${userId}`} style={{textDecoration:'none',color:'black'}}> 
            <div style={{display:'flex',padding:'0.3rem'}}>
                <img src={avatar} className="ContactImg"></img>
                <p style={{marginLeft:'1rem',marginTop:'1rem',}}>{name}</p>
            </div>
            </Link>
        </div>
  )
}

export default User