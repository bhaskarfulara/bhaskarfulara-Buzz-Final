import './Header.css'
import logo from '../../images/to_the_new.jpg';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
function Header(){
  const dispatch = useDispatch();
      const { user, loading: userLoading } = useSelector((state) => state.user);
    
    return(
      
        <>
            <div className='header'>
                <Link to='/'>
                <img src={logo} alt='logo' className='logo' style={{width:'50px'}}></img>
                </Link>
                
                <div className='profile'>
                    <Link to='/account' className='pro'>
                        <img src={user.avatar.url}alt="profile" className='profileImage' />&nbsp;&nbsp;
                        <p><b>{user.name}</b></p>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='messages'>
                        <div className='messages'>
                            <i className="fa-brands fa-facebook-messenger"></i>
                        </div>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='friendReq'>
                        <div className='frndReq'>
                            <i className="fa-solid fa-user-plus"></i>
                        </div>
                    </Link> 

                </div>
            </div>
        </>
    )
}

export default Header;





// import React, { useEffect,useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";
// // import logo from './../../images/to_the_new.jpg';


// import {
//   Home,
//   HomeOutlined,
//   Add,
//   AddOutlined,
//   SearchOutlined,
//   Search,
//   AccountCircle,
//   AccountCircleOutlined,
// } from "@mui/icons-material";

// const Header = () => {
//   const [tab, setTab] = useState(window.location.pathname);
//   return (
//     // <div className='header'>
//     //             <img src={logo} alt='logo' className='logo'></img>
//     //             <div className='profile'>
//     //                 <Link to='/profile' className='pro'>
//     //                     <img src="https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg" alt="profile" className='profileImage' />&nbsp;&nbsp;
//     //                     <p><b>Ashish Mehra</b></p>
//     //                 </Link>&nbsp;&nbsp;&nbsp;&nbsp;
//     //                 <Link to='messages'>
//     //                     <div className='messages'>
//     //                         <i className="fa-brands fa-facebook-messenger"></i>
//     //                     </div>
//     //                 </Link>&nbsp;&nbsp;&nbsp;&nbsp;
//     //                 <Link to='friendReq'>
//     //                     <div className='frndReq'>
//     //                         <i className="fa-solid fa-user-plus"></i>
//     //                     </div>
//     //                 </Link> 
//     //             </div>
//     //         </div>
//     <div className="header">
//       <Link to="/" onClick={() => setTab("/")}>
//         {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
//       </Link>

//       <Link to="/newpost" onClick={() => setTab("/newpost")}>
//         {tab === "/newpost" ? (
//           <Add style={{ color: "black" }} />
//         ) : (
//           <AddOutlined />
//         )}
//       </Link>

//       <Link to="/search" onClick={() => setTab("/search")}>
//         {tab === "/search" ? (
//           <Search style={{ color: "black" }} />
//         ) : (
//           <SearchOutlined />
//         )}
//       </Link>

//       <Link to="/account" onClick={() => setTab("/account")}>
//         {tab === "/account" ? (
//           <AccountCircle style={{ color: "black" }} />
//         ) : (
//           <AccountCircleOutlined />
//         )}
//       </Link>
//     </div>
//   );
// };

// export default Header;

