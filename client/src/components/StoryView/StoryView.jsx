import React, { useState, useEffect } from "react";
import axios from "axios";
import StoryViewer from "../OpenOneStory/StoryViewer";
import { useNavigate } from "react-router-dom";
import styles from "./StoryView.module.css";

export default function AllStories() {
  const [storiesByCategory, setStoriesByCategory] = useState({});
  const [visibleStories, setVisibleStories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [increment, setIncrement] = useState(4);
  const [selectedStory, setSelectedStory] = useState(null);
  const [userStories, setUserStories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllStories();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      getAllStories(storedUsername);
    }
  }, []);

  const getAllStories = async (username) => {
    try {
      const response = await axios.get("http://localhost:3000/api/allstory");
      //   console.log("Response Data:", response.data);
      const stories = response.data;
      // Group stories by category
      const groupedStories = {};
      stories.forEach((story) => {
        story.slides.forEach((slide) => {
          const category = slide.category;
          if (!groupedStories[category]) {
            groupedStories[category] = [];
          }
          groupedStories[category].push(story);
        });
      });
      //   console.log("Grouped Stories:", groupedStories);
      setStoriesByCategory(groupedStories);

      // Initialize visible stories state
      const initialVisibleStories = {};
      Object.keys(groupedStories).forEach((category) => {
        initialVisibleStories[category] = increment;
      });
      setVisibleStories(initialVisibleStories);

      // Filter stories for the logged-in user
      const loggedInUserStories = stories.filter(
        (story) => story.user === username
      );
      setUserStories(loggedInUserStories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeMore = (category) => {
    setVisibleStories((prevVisibleStories) => ({
      ...prevVisibleStories,
      [category]: prevVisibleStories[category] + increment,
    }));
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    navigate(`/${story._id}`);
    // {
    //   selectedStory && (
    //     <StoryViewer story={selectedStory} onClose={handleCloseStoryViewer} />
    //   );
    // }
  };

  return (
    <div className={styles.BodyOfHome}>
      <div className={styles.categoryNavbar}>
        <button
          onClick={() => handleCategoryFilter("All")}
          className={`${styles["category-button"]} ${styles["allCategory"]}`}
        >
          All
        </button>
        {Object.keys(storiesByCategory).map((category) => (
          <button
            // key={category}
            className={`${styles["category-button"]} ${
              styles[category.replace(/\s+/g, "")]
            }`}
            // className={`${styles["category-button"]} ${styles[category]}`}
            onClick={() => handleCategoryFilter(category)}
          >
            <h4 className={styles.names}> {category}</h4>
          </button>
        ))}
      </div>

      {/* <div className={styles.BodyOfHome}>
        <h1>User Stories</h1>
        {loggedInUserStories.length === 0 ? (
          <div>No stories available</div>
        ) : (
          <div>
            {loggedInUserStories.map((story) => (
              <div key={story._id} onClick={() => handleStoryClick(story)}>
                <h2>{story.storyId}</h2>
                {story.slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.imageURL} alt="slide" />
                    <h3>{slide.heading}</h3>
                    <p>{slide.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className={styles.bodyofStory}>
        {Object.keys(storiesByCategory).map((category) => (
          <div
            className={styles.layout}
            // key={category}
            style={{
              display:
                selectedCategory === category || selectedCategory === "All"
                  ? "block"
                  : "none",
            }}
          >
            {/* <h2 className={styles.categoryheading}> */}
            <span className={styles.categoryheading}>
              Top Stories About {category}
            </span>
            {/* </h2> */}
            <ul>
              {storiesByCategory[category]
                .slice(0, visibleStories[category])
                .map((story) => (
                  <li
                    // key={story._id}
                    onClick={() => handleStoryClick(story)}
                    className={styles.storyTemplate}
                    style={{
                      backgroundImage: `url(${story.slides[0].imageURL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* {story.slides.map((slide, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundImage: `url(${slide.imageURL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img src={slide.imageURL} alt="error" />
                      <h2>{slide.heading}</h2>
                      <p>{slide.description}</p>
                    </div>
                  ))} */}

                    <div
                    // style={{
                    //   backgroundImage: `url(${story.slides[0].imageURL})`,
                    //   backgroundSize: "cover",
                    //   backgroundPosition: "center",
                    //   backgroundRepeat: "no-repeat",
                    // }}
                    >
                      <h3>{story.slides[0].heading}</h3>
                      <p>{story.slides[0].description}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <div className={styles.morebuttondiv}>
              {visibleStories[category] <
                storiesByCategory[category].length && (
                <button
                  onClick={() => handleSeeMore(category)}
                  className={styles.button}
                >
                  See More
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
