import { Button, getImageListItemBarUtilityClass, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(name.endsWith("@gmail.com")){
      alert("mail")
    }
    else{
      dispatch(getAllUsers(name));
    }
  };

  return (
    <div className='search-container'>
      <div className="Search">
      <form className="searchForm" onSubmit={submitHandler}>
        <input
          type="text"
          value={name}
          placeholder="Search User"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit" style={{display:'none'}} >
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default Search;
