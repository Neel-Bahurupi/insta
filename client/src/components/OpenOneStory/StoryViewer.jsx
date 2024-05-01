import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./StoryViewer.module.css";
import right from "../../assets/right.png";
import left from "../../assets/left.png";
import share from "../../assets/share.png";
import cross from "../../assets/close.png";
import bookmark from "../../assets/bookmark.png";
import like from "../../assets/like.png";
import clicked from "../../assets/clicked.png";
import liked from "../../assets/liked.png";

export default function StoryViewer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [story, setStory] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // State variable for like button
  const [slideIndicators, setSlideIndicators] = useState([]);

  const navigate = useNavigate();
  const { storyId } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/story/${storyId}`
        );
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();

    return () => {};
  }, [storyId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextSlide();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentSlideIndex]);

  useEffect(() => {
    if (story) {
      // Initialize slide indicators based on the number of slides in the story
      setSlideIndicators(Array.from({ length: story.slides.length }));
    }
  }, [story]);

  const handleNextSlide = () => {
    if (story && currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleShare = () => {
    if (story) {
      const storyLink = `${window.location.origin}/${story._id}`;
      navigator.clipboard
        .writeText(storyLink)
        .then(() => {
          alert("Story link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  const onClose = () => {
    navigate("/");
  };

  const handleLike = () => {
    // Logic to like story
    setIsLiked(!isLiked);
  };

  const handleBookmark = async () => {
    try {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!username) {
        console.error("Username not found");
        navigate("/signup");

        return;
      }
      setIsBookmarked((prevStatus) => !prevStatus);

      const response = await axios.post(
        `http://localhost:3000/save/bookmarks`,
        {
          storyId: storyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error bookmarking story:", error);
    }
  };

  return (
    <div className={styles.story_viewer}>
      <div className={styles.story_popup}>
        <div className={styles.navigation}>
          <div>
            <img
              src={left}
              alt="left"
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
            />
            {/* Previous */}
          </div>
        </div>
        <div
          className={styles.story_container}
          style={{
            backgroundImage: `url(${
              story && story.slides[currentSlideIndex].imageURL
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className={styles.bar}></div> */}
          <div className={styles.storyBar}>
            {slideIndicators.map((_, index) => (
              <div key={index} className={styles.bar}></div>
            ))}
          </div>

          <div className={styles.actions}>
            {/* <button> */}
            <img src={cross} alt="close" onClick={onClose} />
            {/* </button> */}

            {/* <button> */}
            <img src={share} alt="share" onClick={handleShare} />
            {/* </button> */}
          </div>
          {story && (
            <div className={styles.slide}>
              {/* <h1>Story ID: {storyId}</h1> */}
              <h4>{story.slides[currentSlideIndex].heading}</h4>

              <div className={styles.description}>
                {story.slides[currentSlideIndex].description}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <div>
              {isBookmarked ? (
                <img
                  src={clicked}
                  alt="clicked"
                  onClick={handleBookmark}
                  className={styles.bookmarkClicked}
                />
              ) : (
                <img
                  src={bookmark}
                  alt="bookmark"
                  onClick={handleBookmark}
                  className={styles.bookmarkImg}
                />
              )}
            </div>

            <div>
              {isLiked ? (
                <img
                  src={liked}
                  alt="liked"
                  onClick={handleLike}
                  className={styles.likeClicked}
                />
              ) : (
                <img
                  src={like}
                  alt="like"
                  onClick={handleLike}
                  className={styles.likeImg}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.navigation}>
          <div
            onClick={handleNextSlide}
            disabled={currentSlideIndex === (story && story.slides.length - 1)}
          >
            <img src={right} alt="right" />
            {/* Next */}
          </div>
        </div>
      </div>
    </div>
  );
}
