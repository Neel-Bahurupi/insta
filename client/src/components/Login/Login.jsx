import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../../assets/cross.jpg";
import axios from "axios";
import styles from "./Login.module.css";
import eye from "../../assets/eye.png";

export default function Login({ handleLogin }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      formData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.data.error) {
      setError(`Please enter valid username`);
    } else {
      setError(`Logged in Successfully!`);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);

      handleLogin();
      navigate("/");
    }
  };

  return (
    <div className={styles.popupcontainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.maindiv}>
          <img
            src={close}
            alt="cross"
            className={styles.closeicon}
            onClick={handleClose}
          />
          <span className={styles.heading}>Login to SwipTory</span>
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
                Log In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
