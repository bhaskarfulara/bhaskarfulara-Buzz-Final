import {configureStore} from '@reduxjs/toolkit'
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';
import { postOfFollowingReducer, userReducer,allUsersReducer, usersProfileReducer } from './Reducers/User';




const store=configureStore({
    reducer:{
        user:userReducer,
        postOffollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostsReducer,
        userProfile:usersProfileReducer,
        userPosts:userPostsReducer,
    }
});

export default store;