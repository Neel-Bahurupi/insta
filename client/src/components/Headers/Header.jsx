import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

import book from "../../assets/bookmark.jpg";
import user from "../../assets/user.png";
import hamburger from "../../assets/hamburger.png";
import cross from "../../assets/cross.jpg";

// export default function Header({ isLoggedIn, handleLogout }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [username, setUsername] = useState("");
//   const [showUserDetails, setShowUserDetails] = useState(false);

//   useEffect(() => {
//     const username = localStorage.getItem("user");
//     if (username) {
//       setUsername(username);
//     }
//   }, []);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//     console.log(!showMenu);
//     console.log("clicked");
//     // setShowUserDetails(false);
//   };

//   const toggleUserDetails = () => {
//     setShowUserDetails(!showUserDetails);
//     // setShowMenu(false);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUsername("");
//     handleLogout();

//     // console.log("click");
//   };

//   return (
//     <div className={styles.header}>
//       <h2>SwipTory</h2>
//       <div>
//         <div className={styles.desktop}>
//           {!isLoggedIn ? (
//             <div className={styles.beforeLogin}>
//               <Link to="/signup">
//                 <button className={styles.btn}>Register Now</button>
//               </Link>
//               <Link to="/login">
//                 <button className={styles.login}>Sign In</button>
//               </Link>
//             </div>
//           ) : (
//             <div className={styles.afterLogin}>
//               <Link to="/bookmarks">
//                 <div className={styles.btn}>
//                   <img src={book} alt="bm" className={styles.bookimg} />
//                   <span>Bookmarks</span>
//                 </div>
//               </Link>

//               <Link to="/addstory">
//                 <button className={styles.btn}>Add Story</button>
//               </Link>

//               <img src={user} alt="user" className={styles.userphoto} />
//               <div onClick={toggleUserDetails} className={styles.divham}>
//                 <img src={hamburger} alt="hb" className={styles.btnham} />
//               </div>
//               <div
//                 className={`${styles.userDetails} ${
//                   showUserDetails ? styles.show : ""
//                 }`}
//               >
//                 {showUserDetails && (
//                   <div className={styles.detailuser}>
//                     <div>{username}</div>
//                     <button className={styles.btn} onClick={logout}>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//         {/* //for mobile mode  */}
//         <div>
//           <button className={styles.hamburger} onClick={toggleMenu}>
//             <img src={hamburger} alt="ham" />
//           </button>
//           <span className={`${styles.menu} ${showMenu ? styles.show : ""}`}>
//             {!isLoggedIn ? (
//               <div className={styles.mobileloginbefore}>
//                 <img
//                   src={cross}
//                   alt="cross"
//                   className={styles.close}
//                   onClick={toggleMenu}
//                 />
//                 <div className={styles.mobilebefore}>
//                   <Link to="/login">
//                     <button className={styles.btn}>Login</button>
//                   </Link>
//                   <Link to="/signup">
//                     <button className={styles.btn}>Register</button>
//                   </Link>
//                 </div>
//               </div>
//             ) : (
//               <div className={styles.mobileheader}>
//                 <div className={styles.details}>
//                   <img src={user} alt="user" className={styles.userphoto} />
//                   <span> {username}name</span>
//                   <img
//                     src={cross}
//                     alt="cross"
//                     className={styles.cross}
//                     onClick={toggleMenu}
//                   />
//                 </div>
//                 <div className={styles.buttons}>
//                   <button className={styles.btn}>Your Story</button>
//                   <button className={styles.btn}>Add Story</button>
//                   <button className={styles.btn}>
//                     <img src={book} alt="book" />
//                     Bookmarks
//                   </button>

//                   <button onClick={logout} className={styles.btn}>
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function Header({ isLoggedIn, handleLogout }) {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("user");
    if (username) {
      setUsername(username);
    }
  }, []);

  const toggleMobileMenu = () => {
    console.log("clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleHam = () => {
    console.log("click");
    setUserInfo(!userInfo);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername("");
    handleLogout();

    // console.log("click");
  };

  return (
    <div className={styles.loggedin}>
      <div className={styles.header}>
        <div>
          <h2
            onClick={() => {
              navigate("/");
            }}
          >
            SwipTory
          </h2>
        </div>
        <div>
          <div className={styles.desktop}>
            {!isLoggedIn ? (
              <div className={styles.beforeLogin}>
                <Link to="/signup">
                  <button className={styles.btn}>Register Now</button>
                </Link>
                <Link to="/login">
                  <button className={styles.login}>Sign In</button>
                </Link>
              </div>
            ) : (
              <div>
                <div className={styles.afterLogin}>
                  <Link to="/bookmarks">
                    <div className={styles.btn}>
                      <img src={book} alt="bm" className={styles.bookimg} />
                      <span>Bookmarks</span>
                    </div>
                  </Link>

                  <Link to="/addstory">
                    <button className={styles.btn}>Add Story</button>
                  </Link>

                  <img src={user} alt="user" className={styles.userphoto} />
                  <div className={styles.divham} onClick={handleToggleHam}>
                    <img src={hamburger} alt="hb" className={styles.btnham} />
                  </div>
                </div>
                <div className={styles.infologout}>
                  {userInfo && (
                    <div>
                      <div className={styles.detailuser}>
                        <div>{username}</div>
                        <button className={styles.btn} onClick={logout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* //for mobile mode  */}
          <div className={styles.mobileContain}>
            <button onClick={toggleMobileMenu} className={styles.hamburger}>
              <img src={hamburger} alt="ham" />
            </button>
            {isMenuOpen && (
              <span className={styles.mobileMenu}>
                {!isLoggedIn ? (
                  <div className={styles.mobileloginbefore}>
                    <img
                      src={cross}
                      alt="cross"
                      className={styles.close}
                      onClick={toggleMobileMenu}
                    />
                    <div className={styles.mobilebefore}>
                      <Link to="/login">
                        <button className={styles.btn}>Login</button>
                      </Link>
                      <Link to="/signup">
                        <button className={styles.btn}>Register</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.mobileheader}>
                    <div className={styles.details}>
                      <img src={user} alt="user" className={styles.userphoto} />
                      <span> {username}</span>
                      <img
                        src={cross}
                        alt="cross"
                        className={styles.cross}
                        onClick={toggleMobileMenu}
                      />
                    </div>
                    <div className={styles.buttons}>
                      <button className={styles.btn}>Your Story</button>
                      <Link to="/addstory">
                        <button className={styles.btn}>Add Story</button>
                      </Link>
                      <Link to="/bookmarks">
                        <button className={styles.btn}>
                          <img src={book} alt="book" />
                          Bookmarks
                        </button>
                      </Link>

                      <button onClick={logout} className={styles.btn}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div className={styles.infologout}>
        {userInfo && (
          <div>
            <div className={styles.detailuser}>
              <div>{username}</div>

              <button className={styles.btn} onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
