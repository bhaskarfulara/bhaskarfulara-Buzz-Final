import axios from "axios"


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })

        const { data } = await axios.post("/api/login", { email, password }, { headers: { "Content-type": "application/json" } })


        dispatch({ type: "LoginSuccess", payload: data.user })


    } catch (error) {

        dispatch({ type: "LoginFailure", payload: error.response.data.message })
    }
}


export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/api/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };


export const logoutUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest"
        })

        await axios.get("/api/logout");


        dispatch({ type: "LogoutUserSuccess" })


    } catch (error) {

        dispatch({ type: "LogoutUserFailure", payload: error.response.data.message })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoaUserRequest"
        })

       const {data}= await axios.get("/api/me");


        dispatch({ type: "LoadUserSuccess", payload: data.user })


    } catch (error) {

        dispatch({ type: "LoadUserFailure", payload: error.response.data.message })
    }
};

export const getFollowingPost=()=>async(dispatch)=>{
    try {

        dispatch({
            type: "postOfFollowingRequest",
        })

        const {data}=await axios.get("api/posts")

        dispatch({
            type:"postOfFollowingSuccess",
            payload: data.posts,
        })
        
    } catch (error) {
        dispatch({ type: "postOfFollowingFailure", payload: error.response.data.message })
    }
}


export const getAllUsers=(name="")=>async(dispatch)=>{
    try {

        dispatch({
            type: "allUsersRequest",
        })

        const {data}=await axios.get(`api/users?name=${name}`)

        dispatch({
            type:"allUsersSuccess",
            payload: data.users,
        })
        
    } catch (error) {
        dispatch({ type: "allUsersFailure", payload: error.response.data.message })
    }
}


export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get("/api/my/posts");
      dispatch({
        type: "myPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };






  export const updateProfile =
  (name, email,avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const { data } = await axios.put(
        "/api/update/profile",
        { name, email,avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const deleteMyProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
  
      const { data } = await axios.delete("/api/delete/me");
  
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  };



  export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userPostsRequest",
      });
  
      const { data } = await axios.get(`/api/userposts/${id}`);
      dispatch({
        type: "userPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "userPostsFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
      const { data } = await axios.get(`/api/user/${id}`);
      dispatch({
        type: "userProfileSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
      const { data } = await axios.get(`/api/follow/${id}`);
      dispatch({
        type: "followUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  };
