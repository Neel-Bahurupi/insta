import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Bookmark.module.css";
import Header from "../Headers/Header";
import { useNavigate } from "react-router-dom";
import StoryViewer from "../OpenOneStory/StoryViewer";

const BookmarksPage = ({ handleLogout }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // Retrieve username from localStorage
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!username) {
          console.error("Username not found in localStorage");
          return;
        }
        const response = await axios.get(
          `http://localhost:3000/save/bookmarks/${username}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (bookmarkId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/save/bookmarks/${bookmarkId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // Update bookmarks state after removing the bookmark
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark._id !== bookmarkId)
      );
      console.log("Bookmark removed successfully");
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const handleClick = (storyId) => {
    navigate(`/${storyId}`);
  };
  return (
    <div>
      <Header isLoggedIn={true} handleLogout={handleLogout} />
      <h1 className={styles.head}>Your Bookmarks</h1>
      <ul className={styles.ula}>
        {bookmarks.map((bookmark) => (
          <li
            onClick={() => handleClick(bookmark.story._id)}
            key={bookmark._id}
            className={styles.storyDiv}
            style={{
              backgroundImage: `url(${bookmark.story.slides[0].imageURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Display bookmark details */}
            {/* Story ID: {bookmark.story._id}, User: {bookmark.user} */}
            {/* <img src={bookmark.story.slides[0].imageURL} /> */}
            <div className={styles.details}>
              <h3>{bookmark.story.slides[0].heading}</h3>
              <div>{bookmark.story.slides[0].description}</div>
            </div>
            {/* <button onClick={() => handleRemoveBookmark(bookmark._id)}>
              Remove Bookmark
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksPage;
