import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import StoryForm from "./components/StoryForm/StoryForm";
import StoryView from "./components/StoryView/StoryView";
import StoryViewer from "./components/OpenOneStory/StoryViewer";
import Bookmark from "./components/Bookmark/Bookmark";
import axios from "axios";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  async function validateToken() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://52.87.252.232:3000/auth/validateToken",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            }
          />
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/addstory" element={<StoryForm />} />
          {/* <Route path="/story" element={<StoryView />} /> */}
          <Route path="/:storyId" element={<StoryViewer />} />
          <Route path="/bookmarks" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
