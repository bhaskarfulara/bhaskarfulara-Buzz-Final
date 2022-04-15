import { Avatar, Button, Typography, Dialog } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Post.css'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
    // AddComment
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, likePost, updatePost,deletePost } from '../../Actions/Post'
import { getFollowingPost, getMyPosts,loadUser } from '../../Actions/User';
import User from '../User/User'
import CommentCard from '../comment card/CommentCard';


// import { useAlert } from 'react-alert'; 


const Post = ({ postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    isModerator=false,
}) => {

    // if(isModerator===true){
    //     isAccount=true;
    //     isDelete=true;
    // }

    // const [adminUser] =useSelector()
    const {email}= useSelector(state => state.user.user)
  
    if(email==="admin@tothenew.com"){
        isModerator=true;
        isAccount=true;
        isDelete=true;
    }

    const [liked, setLiked] = useState(false);
    const [likesUser, setlikesUser] = useState(false)
    const [commentValue, setCommnentValue] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [captionValue, setCaptionValue] = useState(caption)
    const [captionToggle, setCaptionToggle] = useState(false)



    const dispatch = useDispatch();
    // const alert=useAlert();

    const changeCol = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId))
        if (!isAccount) {
            dispatch(getFollowingPost());
        }
        else {

            dispatch(getMyPosts(postId));

        }
        // alert.success("Liked");
    }

    const addCommenthandler = async (e) => {

        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));

        if (!isAccount) {
            dispatch(getFollowingPost());
        }
        else {
            dispatch(getMyPosts(postId));
        }
    }

    const { user } = useSelector((state) => state.user)


    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId));
        dispatch(getMyPosts());
    };


    const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
      };


    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id,])





    return (
        <div className='post'>
            <div className="postHeader">
            <div className="postDetails">
                <Avatar src={ownerImage.url} alt='User' sx={{ height: "3vmax", width: "3vmax" }} />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700} style={{marginTop:'-3px'}}>{ownerName}</Typography>
                </Link>
            </div>

                {
                    isAccount ? <Button onClick={()=>setCaptionToggle(!captionToggle)}><MoreVert /></Button> : null
                }
            </div>
            <Typography
                        fontWeight={100}
                        color="rgba(0, 0, 0, 0.8)"
                        style={{ alignSelf: "center" }}
                    >
                        {caption}
                    </Typography>
            
            <img src={postImage} alt='Post' className='postImg'/>

            <button style={{ backgroundColor: "white", border: "none", cursor: "pointer", margin: "1vmax 2vmax" }} onClick={() => setlikesUser(!likesUser)} disabled={likes.length === 0 ? true : false}>{likes.length} Likes</button>
            <div className="postFooter">
                <Button onClick={changeCol}>
                    {
                        liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
                    }
                </Button>
                
                <Button onClick={() => setCommentToggle(!commentToggle)}><ChatBubbleOutline /></Button>
                {isDelete ? <Button onClick={()=>deletePostHandler()}><DeleteOutline /></Button> : null}

            </div>
            <Dialog open={likesUser} onClose={() => setlikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {
                        likes.map((like) => (<User
                            key={like._id}
                            userId={like._id}
                            name={like.name} avatar={like.avatar.url} />))
                    }
                </div>
            </Dialog>



            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className="commentForm" onSubmit={addCommenthandler}>
                        <input type="text" value={commentValue} onChange={(e) => setCommnentValue(e.target.value)} placeholder="Add Comment" required />

                        <Button type="submit" variant="contained">Add</Button>
                    </form>
                    {
                        comments.length > 0 ? comments.map((item) => (
                            <CommentCard
                                key={item._id}
                                userId={item.user._id} name={item.user.name} avatar={item.user.avatar.url} comment={item.comment} commentId={item._id} isAccount={isAccount}
                                postId={postId} />
                        )) : <Typography>No Comment Yet</Typography>
                    }
                </div>
            </Dialog>
            <Dialog
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>

                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption Here..."
                            required
                        />

                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

export default Post;