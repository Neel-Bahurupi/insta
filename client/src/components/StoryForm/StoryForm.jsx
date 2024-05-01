import React, { useState, useEffect } from "react";
import styles from "./StoryForm.module.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import close from "../../assets/cross.jpg";

export default function StoryForm() {
  const [slides, setSlides] = useState([
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
  ]);
  const [user, setUser] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const generateRandomStoryId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const handlePerviousButton = () => {
    //will go to pervious slide
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      console.log(currentSlide);
    }
  };

  const handleNextButton = () => {
    //will go to next slide
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      console.log(currentSlide + 1);
    }
  };

  const handleSubmit = async () => {
    if (slides.length < 3) {
      console.error("Minimum 3 slides required");
      return;
    }
    const user = localStorage.getItem("user");

    try {
      const response = await axios.post("http://localhost:3000/api/story", {
        storyId: generateRandomStoryId(),
        slides,
        user,
      });
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [
        ...prevSlides,
        { heading: "", description: "", image: "", category: "" },
      ]);
    }
  };

  const removeSlide = (index) => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
    }
  };

  const handlecloseButton = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.popupOverlay}></div>

      <div className={styles.storyForm}>
        <div>
          <img
            src={close}
            alt="close"
            className={styles.closeBtn}
            onClick={handlecloseButton}
          />
        </div>
        <div>
          <div className={styles.storySlides}>
            <div className={styles.contentContainer}>
              <div className={styles.slideButtons}>
                {/* {[...Array(slides.length)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.slideButton} ${
                currentSlide === index ? styles.active : ""
              }`}
            >
              Slide {index + 1}
            </button>

            
          ))} */}

                {slides.map((_, index) => (
                  <div key={index} className={styles.slideButtonWrapper}>
                    <button
                      onClick={() => setCurrentSlide(index)}
                      className={`${styles.slideButton} ${
                        currentSlide === index ? styles.active : ""
                      }`}
                    >
                      Slide {index + 1}
                    </button>
                    {index >= 3 && (
                      <span
                        onClick={() => removeSlide(index)}
                        className={styles.removeButton}
                      >
                        <img
                          src={close}
                          alt="close"
                          className={styles.img}
                          onClick={() => removeSlide(index)}
                        />
                      </span>
                    )}
                  </div>
                ))}
                {slides.length < 6 && (
                  <button onClick={addSlide} className={styles.addSlideButton}>
                    Add Slide
                  </button>
                )}
              </div>
              <div className={styles.form}>
                <div className={styles.formContain}>
                  <div className={styles.div_for_form_contain}>
                    <label>Heading :</label>
                    <input
                      type="text"
                      placeholder="Your heading"
                      value={slides[currentSlide].heading}
                      onChange={(e) =>
                        handleSlideChange(
                          currentSlide,
                          "heading",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.div_for_form_contain}>
                    <label>Description : </label>
                    <input
                      type="text"
                      placeholder="Story Desciption"
                      value={slides[currentSlide].description}
                      onChange={(e) =>
                        handleSlideChange(
                          currentSlide,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.div_for_form_contain}>
                    <label>Image URL : </label>
                    <input
                      type="text"
                      placeholder="Add Image url"
                      value={slides[currentSlide].image}
                      onChange={(e) =>
                        handleSlideChange(currentSlide, "image", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.div_for_form_contain}>
                    <label>Category : </label>
                    <select
                      value={slides[currentSlide].category}
                      onChange={(e) =>
                        handleSlideChange(
                          currentSlide,
                          "category",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select category</option>
                      <option value="food">food</option>
                      <option value="health and fitness">
                        health and fitness
                      </option>
                      <option value="travel">travel</option>
                      <option value="movies">movies</option>
                      <option value="education">education</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_functional_A}>
            <div className={styles.button_functional}>
              <button
                onClick={handlePerviousButton}
                className={styles.pervious}
              >
                Previous
              </button>
              <button onClick={handleNextButton} className={styles.next}>
                Next
              </button>
            </div>
            <button onClick={handleSubmit} className={styles.post}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
