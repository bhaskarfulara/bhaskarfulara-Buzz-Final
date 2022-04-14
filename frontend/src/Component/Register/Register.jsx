// import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";


function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setAvatar(Reader.result);
          }
        };
      };

      const submitHandler = (e) => {
        e.preventDefault();
        if(email.endsWith('@tothenew.com')){
          if(avatar===""){
            dispatch(registerUser(name, email, password));
          }
          else{

            dispatch(registerUser(name, email, password, avatar));
          }
        }
        else{
          alert('Enter a Email that ends with @tothenew.com');
        }
      };

      useEffect(() => {
        if (error) {
          dispatch({ type: "clearErrors" });
        }
      }, [dispatch, error]);
    
    return (
      <div className="signUp">
        <div className='withSignup'>
          <h2>Welcome to Buzzz</h2><br/>
          <form action="" onSubmit={submitHandler}>
              {
                (avatar === '') ? <img alt=''style={{display:'none'}}></img>:<img src={avatar} alt='' className="selAvatar"/>
              }<br/>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input type="text"  placeholder='Enter Your Name' require value={name} required onChange={(e)=> setName(e.target.value)} /><br/><br/>
            <input type="email"  placeholder='Enter Your Email' require value={email} required onChange={(e)=> setEmail(e.target.value)} /><br/><br/>
            <input type="password" placeholder='Enter Password'required value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/><br/>
            <Link to='/'>
              <p className="signInBtn">Already Signed In? Log In</p>
            </Link>
            <br/><br/>
            <input type="submit" value='Register' disabled={loading}/>
          </form>
        </div>
      </div>
        // <div className='register' onSubmit={submitHandler}>
        //     <form action="" className="registerForm">
        //         <Typography variant="h3" style={{ padding: "2vmax" }}>
        //             Social Aap
        //         </Typography>

        //         <Avatar
        //             src={avatar}
        //             alt="User"
        //             sx={{ height: "10vmax", width: "10vmax" }}
        //         />

        //         <input type="file" accept="image/*" onChange={handleImageChange} />

        //         <input
        //             type="text"
        //             value={name}
        //             placeholder="Name"
        //             className="registerInputs"
        //             required
        //             onChange={(e) => setName(e.target.value)}
        //         />

        //         <input
        //             type="email"
        //             placeholder="Email"
        //             className="registerInputs"
        //             required
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />

        //         <input
        //             type="password"
        //             className="registerInputs"
        //             placeholder="Password"
        //             required
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <Link to="/">
        //             <Typography>Already Signed Up? Login Now</Typography>
        //         </Link>

        //         <Button disabled={loading} type="submit">
        //             Sign Up
        //         </Button>
        //     </form>
        // </div>
    )
}

export default Register