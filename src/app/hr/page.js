"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import TrainingComp from "../../components/training/index";
import WriteUpComp from "../../components/writeUp/index";
import TimeOutComp from "../../components/timeout/index";
import "./purchase.scss";
import axios from "axios";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";

export default function HRPage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Training");
  useEffect(() => {
    console.log("####!!!!",currentUser)
    if (currentUser == null || currentUser.userInfo == null) {
      console.log("@@@here in use")
      router.push("/login");

    }
  }, [currentUser]);
  useEffect(() => {
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.userInfo !== undefined
    ) {
      pusherClient.subscribe(currentUser.userInfo.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat finance", updatedChat);
        // setAllChats((allChats) =>
        //   allChats.map((chat) => {
        //     if (chat._id === updatedChat.id) {
        //       return { ...chat, messages: updatedChat.messages };
        //     } else {
        //       return chat;
        //     }
        //   })
        // );
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [currentUser]);
  const handleLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <ul onClick={handleLinks} className={poppins.className}>
          <li
            className={
              activeLink == "Training" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Training
          </li>
          <li
            className={
              activeLink == "Write Up" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Write Up
          </li>
          <li
            className={
              activeLink == "Timeout" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Timeout
          </li>
        </ul>
      </section>
      {activeLink == "Training" ? (
        <TrainingComp
          user={
            currentUser == null || currentUser == undefined
              ? ""
              : currentUser.userInfo
          }
        />
      ) : null}
      {activeLink == "Write Up" ? (
        <WriteUpComp
          user={
            currentUser == null || currentUser == undefined
              ? ""
              : currentUser.userInfo
          }
        />
      ) : null}
      {activeLink == "Timeout" ? <TimeOutComp user={
            currentUser == null || currentUser == undefined
              ? ""
              : currentUser.userInfo
          }  /> : null}
    </main>
  );
}
