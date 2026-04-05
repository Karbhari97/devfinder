import { useEffect, useState } from "react";
import Body from "./components/Body";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Login/LoginScree";
import SignupScreen from "./Signup/SignupScreen";
import Feed from "./Feed/Feed";
import Main from "./components/Main";
import Connections from "./connections/Connections";
import EditProfile from "./editProfile/EditProfile";

function App() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const handleMouseMove = (e: any) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };
    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateRing();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Route>
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </div>
  );
}

export default App;
