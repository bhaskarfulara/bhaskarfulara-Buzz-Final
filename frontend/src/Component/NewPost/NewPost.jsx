import { Button, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost, createNewPostCaption } from '../../Actions/Post'
import { loadUser } from '../../Actions/User'
import './NewPost.css'
function NewPost() {

    const[image,setImage]=useState(null)
    const[caption,setCaption]=useState("")

    const {loading,error,message}=useSelector((state)=>state.like);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setImage(Reader.result);
          }
        };
      };

    const dispatch=useDispatch();
    
    const submitHandler=async(e)=>{
        
        e.preventDefault();
        

       await dispatch(createNewPost(caption,image));
        
        
        dispatch(loadUser());

    }


    useEffect(() => {
        if(error){
          alert(error)
            dispatch({type:"clearErrors"});
        }
        if(message){
          alert(message)
            dispatch({type:"clearMessage"});
        }
    }, [dispatch,error,message])

  return (
    <div className='newPost'>
        <form className="newPostForm" onSubmit={submitHandler}>
        {/* <Typography variant='h3'>New Post</Typography> */}
        {image? <div style={{width:'100px',height:'100px',borderRadius:'50%'}}>
          <img src={image} alt="post" className='imgFile'/>
          </div> : null}
        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <input type="text" placeholder='Start a Post....' value={caption} onChange={(e)=>setCaption(e.target.value)}/>
        <Button disabled={loading} type='submit' className='postBtn'>Post</Button>
        </form>
    </div>
  )
}

export default NewPost;