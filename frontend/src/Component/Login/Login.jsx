
import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from './../../images/to_the_new.jpg';
import {GoogleLogin} from 'react-google-login';
// import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Actions/User";
import { loadUser } from "../../Actions/User";

// import { useAlert } from "react-alert";

const Login=()=> {
  const clientId = '84959396412-n09ftpd9v4vf233p8osgf5eg36fm9v74.apps.googleusercontent.com';
  const [email,setemail]=useState("");
  const [password,setPass]=useState();
  // const [avatar,setAvatar]=useState("");
  const [name,setName]=useState("");
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


  const responseGoogle=async(response)=>{
    // console.log(response)
    if(response.profileObj.email.endsWith("tothenew.com")){
      setemail(response.profileObj.email)
      setPass('Bhaskar');
      setName(response.profileObj.givenName)
      await dispatch(registerUser(name, email, password));
      // await dispatch(loginUser(email, password));
      // loginHandler();
      // console.log(response.profileObj.email,response.profileObj.givenName,response.profileObj.imageUrl);
    }
    else{
      alert("use your tothenew official mail to login");
    }
  }

  

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
                        onSuccess={responseGoogle} 
                        // onFailure={responseGoogle}
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