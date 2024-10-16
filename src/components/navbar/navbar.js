"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "600"],
  subsets: ["latin"],
});
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { pusherClient } from "@/utils/pusher";
import { storeUser } from "../../store/slices/userSlice";
import { storeNotification } from "@/store/slices/notification";
import useSound from "use-sound";
// import Pusher from "pusher-js";

// var pusher = new Pusher("07be80edc6aa2291c746", {
//   cluster: "ap2",
// });
// var channel;

function Navbar() {
  const user = useSelector((state) => state.user);
  // const [play] = useSound(
  //   `https://notificationsounds.com/storage/sounds/file-sounds-1111-to-the-point.mp3`
  // );
  const notification = useSelector((state) => state.notification.notification);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const [filterNotification, setFilteredNotification] = useState([]);
  const handleLogout = () => {
    dispatch(storeUser(null));
    router.push("/login");
  };

  useEffect(() => {
    if (
      user.user !== undefined &&
      user.user !== null &&
      user.user.userInfo !== undefined
    ) {
      pusherClient.subscribe(user.user.userInfo.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat within navbar", updatedChat);
        console.log("worked");
        play();
        setFilteredNotification(updatedChat);
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (user.user !== undefined && user.user !== null) {
          pusherClient.unsubscribe(user.user.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [notification]);
  function play() {
    var audio = document.getElementById("a1");
    audio.play();
  }
  const test =
    filterNotification !== undefined &&
    user !== undefined &&
    user.user !== null &&
    user.user !== undefined &&
    user.user.userInfo !== undefined
      ? filterNotification.messages
        ? filterNotification.messages[filterNotification.messages.length - 1]
            .sender._id !== user.user.userInfo.id
          ? filterNotification.messages[
              filterNotification.messages.length - 1
            ].seenBy.filter((i) => i._id == user.user.userInfo.id).length
            ? false
            : true
          : false
        : false
      : false;

  const clearNotification = () => {
    setFilteredNotification(undefined);
    dispatch(storeNotification(false));
  };
  return (
    <>
      {user.user == null || user.user.error ? null : (
        <div className={`${poppins.className} navbar-wrap`}>
          {/* <button
            onClick={() => {
              console.log("clicked");
              play();
            }}
          >
            Play
          </button> */}
          <Link href={"/"} className={path == "/" ? "activeTop" : ""}>
            Dashboard
          </Link>
          <Link href={"/list"} className={path == "/list" ? "activeTop" : ""}>
            List
          </Link>
          <Link
            href={"/purchasing"}
            className={path == "/purchasing" ? "activeTop" : ""}
          >
            Purchasing
          </Link>
          <Link href={"/jobs"} className={path == "/jobs" ? "activeTop" : ""}>
            Jobs
          </Link>
          <Link
            href={"/finance"}
            className={path == "/finance" ? "activeTop" : ""}
          >
            Finance
          </Link>
          <Link
            href={"/reports"}
            className={path == "/reports" ? "activeTop" : ""}
          >
            Reports
          </Link>
          <Link
            href={"/pics&files"}
            className={path == "/pics&files" ? "activeTop" : ""}
          >
            Pic / Files
          </Link>
          <Link href={"/hr"} className={path == "/hr" ? "activeTop" : ""}>
            HR
          </Link>
          <Link
            href={"/employees"}
            className={path == "/employees" ? "activeTop" : ""}
          >
            Employees
          </Link>
          <Link
            href={"/settings"}
            className={path == "/settings" ? "activeTop" : ""}
          >
            Settings
          </Link>
          <div className="logout-wrap">
            <div className="img-wrap">
              <Link href={"/task"}>
                <img
                  src={
                    path.includes("/chat/")
                      ? "../checklist.png"
                      : "./checklist.png"
                  }
                  className="chat-img"
                />
              </Link>
            </div>
            <div className="img-wrap" style={{ position: "relative" }}>
              <Link href={"/chat"} onClick={clearNotification}>
                <img
                  src={path.includes("/chat/") ? "../chat.png" : "./chat.png"}
                  className="chat-img"
                />
              </Link>
              {test ? <p className="dot-red"></p> : null}
              {/* https://notificationsounds.com/storage/sounds/file-sounds-1111-to-the-point.mp3 */}
              <audio
                id="a1"
                src="https://notificationsounds.com/storage/sounds/file-sounds-1111-to-the-point.mp3"
              ></audio>
            </div>
            <button
              className={`${poppins.className} logout`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
