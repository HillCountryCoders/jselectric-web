import React, { useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { storeNotification } from "@/store/slices/notification";
import { useDispatch, useSelector } from "react-redux";
function ChatBox({ chat, user, index, currentChatId }) {
  useEffect(() => {}, [chat]);
  const router = useRouter();
  console.log("$$$", chat);
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  const filteredChatUser =
    chat !== undefined &&
    chat.isGroup == false &&
    chat.members.filter((i) => i._id !== user.userInfo.id);
  const seen = lastMessage
    ? lastMessage.seenBy.find((member) => member._id == user.userInfo.id)
      ? true
      : false
    : false;
  return (
    <div
      className="chatbox-inner-wrap"
      onClick={() => router.push(`/chat/${chat.id}`)}
    >
      <div className="top">
        {chat?.isGroup ? (
          <span className="name">{chat?.name}</span>
        ) : (
          <span className="name">
            {filteredChatUser.length ? filteredChatUser[0].fullname : ""}
          </span>
        )}
        <span className="time">
          {!lastMessage
            ? moment(chat?.createdAt).format("MM/DD/YYYY hh:mm a")
            : moment(chat?.lastMessageAt).format("MM/DD/YYYY hh:mm a")}
        </span>
      </div>
      <div className="bottom">
        {!lastMessage ? (
          <p className="no-chats">Started A Chat</p>
        ) : (
          <p className={`last-chat ${seen ? "light-grey" : "dark-black"}`}>
            {lastMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
