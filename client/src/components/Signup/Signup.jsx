import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Login/Login.module.css";
import close from "../../assets/cross.jpg";
import eye from "../../assets/eye.png";

export default function Signup({ setLoggedIn }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  console.log(setLoggedIn);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://52.87.252.232:3000/auth/register",
      formData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.data.error) {
      setError(`Username already exist`);
    } else {
      setError(`Successfully SignIn`);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      // localStorage.setItem("userId", response.data.user._id);

      navigate("/");
      console.log("loggedin");
      setLoggedIn(true);

      // handleLogin()
    }
  };

  return (
    <div className={styles.popupcontainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.maindiv}>
          <img
            src={close}
            alt="cross"
            onClick={handleClose}
            className={styles.closeicon}
          />
          <span className={styles.heading}>Register to SwipTory</span>
          <div className={styles.container}>
            <div className={styles.detailDiv}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                id="username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className={styles.detailpassword}>
              <label htmlFor="password">Password</label>
              <div className={styles.passworddiv}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <img
                  src={eye}
                  alt="eye"
                  className={styles.imgeye}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className={styles.footer}>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.button}>
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
