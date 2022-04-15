import React,{useEffect} from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import {useDispatch, useSelector} from 'react-redux'
import { getFollowingPost,getAllUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import NewPost from "./../NewPost/NewPost";
import Contact from './../Contacts/Contact';
import Search from './../Search/Search';

function Home() {
  const dispatch = useDispatch();
    const { user, loading: userLoading } = useSelector((state) => state.user);
  
  const {loading,posts,error}= useSelector(state => state.postOffollowing)

  const {users,loading:usersLoading}=useSelector((state)=>state.allUsers);

  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  },[dispatch])

  const {likeerror,message}=useSelector((state)=>state.like)


  useEffect(() => {
    if(likeerror){
        // alert.error(message);
        dispatch({type:"clearErrors"});
    }
    if(message){
        dispatch({type:"clearMessage"});
    }
}, [message,likeerror,dispatch,error])



  return (
       <div className='home'>
        <div className="profileContainer">
                <div className='backgroundImage'>
                    
                </div>
                <div className='proImage'>
                    <img src={user.avatar.url} alt="" className='img'></img>
                </div>
                <div className='userDetail'>
                    <h3><b>{user.name}</b></h3>
                </div>

                <div className='profileDetail'>
                    <div>
                        {user.friends.length}
                        <p style={{color:'grey'}}>Friends</p>
                    </div>
                    <div>
                        {user.posts.length}
                        <p style={{color:'grey'}}>Posts</p>
                    </div>
                </div>
            </div>
            <div className='sidebarComponent'>
                <div> 
                    <p><b>Recent</b></p>
                    <li><i className="fa-solid fa-hashtag fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;&nbsp;#javascript</li>
                    <li><i className="fa-solid fa-calendar-check fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;&nbsp;Mobile Trends conference</li>
                    <li><i className="fa-solid fa-user-group fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;Freelance Developers</li>
                    <li style={{color:'skyblue'}}><i class="fa-solid fa-chevron-down"></i>&nbsp;&nbsp;Show More</li>
                </div><br/>
                <hr/><br/>
                <div>
                    <p><b>Groups</b></p>
                    <li><i className="fa-solid fa-hashtag fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;&nbsp;#javascript</li>
                    <li><i className="fa-solid fa-calendar-check fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;&nbsp;Mobile Trends conference</li>
                    <li><i className="fa-solid fa-user-group fa-sm" style={{color:'black'}}></i>&nbsp;&nbsp;Freelance Developers</li>
                    <li style={{color:'skyblue'}}><i class="fa-solid fa-chevron-down"></i>&nbsp;&nbsp;Show More</li>
                </div><br/>
                <hr/><br/>
                <div>
                   <p><b>Subscriptions</b></p> 
                    <li>
                        <div style={{display:'inline-block', width:'25px', height:'25px',border:'1px solid black', borderRadius:'50%',textAlign:'center',color:'green'}}>
                        <i class="fa-solid fa-lightbulb fa-sm"style={{marginTop:'0.8rem'}}></i>
                        </div>
                        &nbsp;&nbsp;Programming With Mosh
                    </li>
                    <li>
                        <div style={{display:'inline-block', width:'25px', height:'25px',border:'1px solid black', borderRadius:'50%',textAlign:'center' }}>    
                        <i class="fa-solid fa-graduation-cap fa-sm" style={{color:'skyblue',marginTop:'0.8rem'}}></i>
                        </div>
                        &nbsp;&nbsp;E-learning Bridge
                    </li>
                    <li>
                        <div style={{display:'inline-block', width:'25px', height:'25px',border:'1px solid black', borderRadius:'50%',textAlign:'center' }}>
                        <i class="fa-solid fa-code fa-sm" style={{color:'black',marginTop:'0.8rem'}}></i>
                        </div>
                        &nbsp;&nbsp;Clever Programmer
                    </li>
                    <li style={{color:'skyblue'}}><i class="fa-solid fa-chevron-down"></i>&nbsp;&nbsp;&nbsp;&nbsp;Show More</li>
                </div>
            </div>
            <NewPost/>
            <main className='feed'>
            {loading || usersLoading===true  ? <Loader/> :<div>
            { posts && posts.length > 0 ? posts.map((post)=>(
        <Post 
        key={posts._id}
        caption={post.caption}
        postId={post._id}
        postImage={post.image.url}
        likes={post.likes}
        comments={post.comments}
        ownerImage={post.owner.avatar}
        ownerName={post.owner.name}
        ownerId= {post.owner._id}
        />

      )) : <Typography variant='h6'>No post yet</Typography>
    }
            </div>}
            </main>
            <Search id='search-box'/>

            {/* <div className="Contacts">
        <div className='ContactHead'>
                <h2>Users</h2>
                <span className='searchIcon'>
                <i class="fa-solid fa-magnifying-glass" style={{color:'darkgrey'}}></i>
                </span>
            </div><br></br>
            <div>
            {
          users &&  users.length>0 ? users.map((user)=>(
            <User className='user'
            key={user._id}
            userId={user._id}
            name={user.name} avatar={user.avatar.url}/>
          )):<Typography>No users yet</Typography>
        }
            </div> */}
        {/* </div> */}



        {/* <div className="homeright">
        {
          users &&  users.length>0 ? users.map((user)=>(
            <Contact
            key={user._id}
            userId={user._id}
            name={user.name} avatar={user.avatar.url}/>
          )):<Typography>No users yet</Typography>
        }
      </div> */}
      </div>
    
  )
}

export default Home;
