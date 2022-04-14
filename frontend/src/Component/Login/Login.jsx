
import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from './../../images/to_the_new.jpg';
import {GoogleLogin} from 'react-google-login';
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { loadUser } from "../../Actions/User";

// import { useAlert } from "react-alert";

const Login=()=> {
  const clientId = '946055713868-fpartl9o2lbbg64redt4pc66bkbm4g0q.apps.googleusercontent.com';
  const [email,setemail]=useState("");
  const [password,setPass]=useState();
  const dispatch =useDispatch();
  const {error}=useSelector(state=>state.user)  
  const {message}=useSelector(state=>state.user)

    const loginHandler = async(e) => {
    e.preventDefault();
    // console.log(email,password);
    if(email.endsWith('@tothenew.com')){
      await dispatch(loginUser(email, password));
      dispatch(loadUser());
    }
    else{
      alert('Enter a valid Email');
    }
 
  };

  useEffect(() => {
    if(error){
      alert(error)
      dispatch({type:"clearErrors"})
    }
    if(message){
      alert(message)
      dispatch({type:"clearMessage"})
    }
  }, [error,dispatch,message])

  


  return (
    <>
            <div className='login'>
                <div className='withGoogle'>
                    <img src={logo} alt="logo" className='logo' /><br/><br/>
                    <div className='text'>
                        <h2>Enters Your Details and Start your journey with us</h2>
                    </div><br/>
                    <p>Dont stop until you're proud</p><br/><br/>
                    <GoogleLogin
                        clientId={clientId}
                        render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='Signinbtn'>Sign In with Google</button>
                        )}
                        buttonText="Login"
                        onSuccess='' 
                        onFailure=''
                        cookiePolicy={'single_host_origin'}
                    />
                    {/* <button className='Signinbtn'>Sign In with Google</button> */}
                </div>  
                <div className='withLogin'>
                    <h3>Login To Your Account</h3><br/><br/>
                    <form action="" onSubmit={loginHandler}>
                        <input type="text" name="" id="" placeholder='TTN Username'required
                        value={email} onChange={(e) => setemail(e.target.value)}/><br/><br/>
                        <input type="password" name="" id="" placeholder='Password'required value={password} onChange={(e) => setPass(e.target.value)}/><br/><br/><br/>
                        <Link to='/register'>
                          <p className="NewUserBtn">New User?</p>
                        </Link>
                        <br/><br/><br/>
                        <input type="submit" value='Sign In'/>
                    </form>
                </div>
            </div>
        </>
  //   <div className="login">
  //   <form className="loginForm" onSubmit={loginHandler} >
  //     <Typography variant="h3" style={{ padding: "2vmax" }}>
  //       Social Aap
  //     </Typography>

  //     <input
  //       type="email"
  //       placeholder="Email"
  //       required
  //       value={email}
  //       onChange={(e) => setemail(e.target.value)}
  //     />

  //     <input
  //       type="password"
  //       placeholder="Password"
  //       required
  //       value={password}
  //       onChange={(e) => setPass(e.target.value)}
  //     />

  //     <Button type="submit">Login</Button>

  //     <Link to="/register">
  //       <Typography>New User?</Typography>
  //     </Link>
  //   </form>
  // </div>
  )
}

export default Login