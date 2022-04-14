import React from 'react'
import {Link} from "react-router-dom"
import './Contact.css';
function Contact({userId, name, avatar}){
    return(
        <div>
            <Link to={`/user/${userId}`}>
            <div style={{display:'flex',padding:'5px'}}>
                <img src={avatar} className="ContactImg"></img>
                <p style={{marginLeft:'10px',marginTop:'10px'}}>{name}</p>
            </div>
            </Link>
        </div>
    )
}

export default Contact;