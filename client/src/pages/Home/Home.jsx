import React, { useState } from "react";
import Header from "../../components/Headers/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import styles from "./Home.module.css";
import StoryView from "../../components/StoryView/StoryView";

export default function Home({ isLoggedIn, handleLogout }) {
  return (
    <div className={styles.homePage}>
      <div className={styles.navbar}>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <div className={styles.body}>
        <StoryView />
      </div>
    </div>
  );
}
