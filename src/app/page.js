"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ComingSoon from "@/components/comingSoon";
import TaskNotification from "@/components/taskNotification";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";
import Swal from "sweetalert2";

export default function Home() {
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [taskNotificationFlag, setTaskNotificationFlag] = useState(false);
  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
    getUser();
    getChats();
  }, [user]);
  useEffect(() => {
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.userInfo !== undefined
    ) {
      pusherClient.subscribe(currentUser.userInfo.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat within dashboard", updatedChat);
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
  const getUser = async () => {
    await axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      if (
        user !== null &&
        user.user !== null &&
        user.user.userInfo !== undefined
      ) {
        const filteredUser = res.data.allUsers.find(
          (i) => i.fullname == user.user.userInfo.fullname
        );
        setTaskNotificationFlag(filteredUser.taskNotification);
      }
    });
  };
  const getChats = async () => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo !== null) {
      await axios
        .get(`${apiPath.prodPath}/api/chat/${currentUser.userInfo.id}`)
        .then((res) => {
          const allChatsMessages = res.data.chat.map((i) => {
            return {
              chatId: i._id,
              members: i.members.map((inner) => {
                return { fullname: inner.fullname };
              }),
              messages: i.messages.map((inner) => {
                return {
                  text: inner.text,
                  seenBy: inner.seenBy.map((item) => {
                    return item.fullname;
                  }),
                };
              }),
            };
          });
          var filteredByMember = [];
          var filteredMsg = [];
          allChatsMessages.forEach((element) => {
            element.members.forEach((inner) => {
              if (inner.fullname == currentUser.userInfo.fullname) {
                filteredByMember = [element, ...filteredByMember];
              }
            });
          });
          filteredByMember.forEach((el) => {
            el.messages.forEach((inner) => {
              if (!inner.seenBy.includes(currentUser.userInfo.fullname)) {
                filteredMsg = [{ text: inner.text }, ...filteredMsg];
              }
            });
          });
          if (filteredMsg.length > 0) {
            Swal.fire({
              icon: "info",
              text: `You have ${filteredMsg.length} unread messages`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className={`${poppins.className} wrap-main-dashboard`}>
      {taskNotificationFlag && user !== null ? (
        <TaskNotification user={user.user} />
      ) : (
        <ComingSoon />
      )}
    </section>
  );
}
