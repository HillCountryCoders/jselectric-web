import React, { useState, useEffect, use } from "react";
import ChatBox from "./chatBox";
import { apiPath } from "@/utils/routes";

import { useRouter } from "next/navigation";
import axios from "axios";
import { pusherClient } from "@/utils/pusher";
import { useSelector } from "react-redux";
const ChatList = ({ currentUser, currentChatId }) => {
  const [allChats, setAllChats] = useState([]);
  const [loader, setLoader] = useState(false);
  // const refreshChat = useSelector((state) => state.refreshChat.refreshChat);
  const router = useRouter();
  var called = 0;
  useEffect(() => {
    if (currentUser == null || currentUser == undefined) {
      router.push("/login");
    }
    if (currentUser && currentUser.userInfo && currentUser.userInfo !== null) {
      getChats();
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
        console.log("updatedChat chatList", updatedChat);
        setAllChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };
      const handleNewChat = (newChat) => {
        console.log("within new chat", newChat);
        setAllChats((allChats) => [...allChats, newChat]);
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      pusherClient.bind("new-chat", handleNewChat);
      return () => {
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
          pusherClient.unbind("new-chat", handleNewChat);
        }
      };
    }
  }, [currentUser, currentChatId]);

  const getChats = async () => {
    setLoader(true);
    if (currentUser && currentUser.userInfo && currentUser.userInfo !== null) {
      setLoader(true);
      await axios
        .get(`${apiPath.prodPath}/api/chat/${currentUser.userInfo.id}`)
        .then((res) => {
          setAllChats(res.data.chat);

          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const handleSeen = (chatId) => {
  //   const dataObj = {
  //     currentUserId: currentUser.id,
  //   };
  //   axios
  //     .post(`${apiPath.prodPath}/api/chat/seenBy/${chatId}`, dataObj)
  //     .then((res) => {})
  //     .catch((err) => console.log(err));
  // };
  console.log("####", allChats);
  return loader ? (
    <p>Loading...</p>
  ) : (
    allChats &&
      allChats.map((chat, index) => {
        return (
          <div
            // onClick={() => {
            //   handleSeen(chat.id);
            //   router.push(`/chat/${chat.id}`);
            // }}
            key={chat.id}
            className={chat.isGroup ? "group-chatbox" : "single-chatbox"}
          >
            {currentUser == null || currentUser == undefined ? null : (
              <ChatBox
                chat={chat}
                currentChatId={currentChatId}
                index={index}
                user={currentUser}
              />
            )}
          </div>
        );
      })
  );
};
export default ChatList;
