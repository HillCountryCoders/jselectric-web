"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import ChatList from "../../../components/chat/chatlist";
import ChatDetailsComp from "../../../components/chat/chatDetail";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import "../style.scss";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatDetails() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const { chatId } = useParams();
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    }
    if (currentUser && chatId) {
      setSeenBy();
    }
  }, []);
  const setSeenBy = () => {
    const dataObj = {
      currentUserId: currentUser.userInfo.id,
    };
    axios
      .post(`${apiPath.prodPath}/api/chat/seenBy/${chatId}`, dataObj)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${poppins.className} chat-detail-con`}>
      <div className="chatlist-wrap">
        {currentUser !== null && currentUser.userInfo !== null ? (
          <ChatList currentChatId={chatId} currentUser={currentUser} />
        ) : null}
      </div>
      <div className="single-chat-detail">
        <ChatDetailsComp
          chatId={chatId}
          currentUser={
            currentUser !== null && currentUser.userInfo !== null
              ? currentUser.userInfo
              : ""
          }
        />
      </div>
    </div>
  );
}

export default ChatDetails;
