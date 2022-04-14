// import { PanoramaSharp } from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import {  followAndUnfollowUser,getUserPosts, getUserProfile} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";

function UserProfile() {
    const dispatch = useDispatch();
    const { user, loading: userLoading,error:userError } = useSelector((state) => state.userProfile);

    const { user: me } = useSelector((state) => state.user);


    const params = useParams();

    const [friendsToggle, setFriendsToggle] = useState(false);

    const { loading, error, posts } = useSelector((state) => state.userPosts)
    const {
        error: followError,
        message,
        loading: followLoading
    } = useSelector((state) => state.like);

    // const [friendToggle, setFriendToggle] = useState(false);
    // const [friendfollowToggle, setFriendfollowToggle] = useState(false);
    const [addfriend, setAddFriend] = useState(false);
    const [myProfile, setMyProfile] = useState(false);


    const addFriendHandler = async() => {
        setAddFriend(!addfriend);

        await dispatch(followAndUnfollowUser(user._id));
        dispatch(getUserProfile(params.id))
    }

    useEffect(() => {
        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));
        
    }, [dispatch, params.id])

    
    useEffect(() => {
        if (me._id === params.id) {
            setMyProfile(true);
        }
        if(user){
            user.friends.forEach(item=>{
                if(item._id === me._id){
                    setAddFriend(true)
                }
                else{
                    setAddFriend(false)
                }
            })
        }

    }, [user,me._id,params.id])

    useEffect(() => {
        if (followError) {
            // alert.error(message);
            alert(followError)
            dispatch({ type: "clearErrors" });
        }
        if (userError) {
            // alert.error(message);
            alert(userError)
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert(message)
            dispatch({ type: "clearMessage" });
        }
    }, [message, followError,userError, dispatch, error])



    return (
        loading === true || userLoading === true ? <Loader /> : (<div className='account'>
            <div className="accountleft">
                <main style={{width:'60%'}}>
                {
                    posts && posts.length > 0 ? posts.map((post) => (
                        <Post
                            key={posts._id}
                            caption={post.caption}
                            postId={post._id}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                        />
                    )) : <Typography variant="h6">User has not made any post</Typography>
                }
                </main>
               
            </div>
            <div className="accountright">
                {
                    user && (<>
                        <Avatar src={user.avatar.url} sx={{ height: "8vmax", width: "8vmax" }} />

                        <Typography variant="h5">{user.name}</Typography>
                        <div>
                            <button onClick={() => setFriendsToggle(!friendsToggle)}><Typography>Friends</Typography></button>
                            <Typography>{user.friends.length}</Typography>
                        </div>
                        <div>
                            <Typography>Post</Typography>
                            <Typography>{user.posts.length}</Typography>
                        </div>

                        {myProfile === true ? null : <Button style={{ backgroundColor: addfriend ? "red" : "blue" }} variant="contained"
                            onClick={addFriendHandler} disabled={followLoading}
                        >{addfriend ? "UnFriend" : "Add Friend"}</Button>}
                    </>
                    )
                }


                <Dialog open={friendsToggle} onClose={() => setFriendsToggle(!friendsToggle)}>
                    <div className="DialogBox">
                        <Typography variant="h4">Friends</Typography>
                        {
                            user && user.friends.length > 0 ?
                                user.friends.map((friend) => (<User
                                    key={friend._id}
                                    userId={friend._id}
                                    name={friend.name} avatar={friend.avatar.url} />)) : <Typography style={{ margin: "2vmax" }}>No Friends</Typography>
                        }
                    </div>
                </Dialog>
            </div>
        </div>)
    )
}

export default UserProfile
