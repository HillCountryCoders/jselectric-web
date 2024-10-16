import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { apiPath } from "@/utils/routes";
import { Poppins } from "next/font/google";
import { pusherClient } from "../../utils/pusher/index";
import MessageBox from "../../components/chat/messageBox";
import { useDispatch, useSelector } from "react-redux";
import { storeNotification } from "@/store/slices/notification";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatDetailComp({ chatId, currentUser }) {
  const [chat, setChat] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const notification = useSelector((state) => state.notification.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    pusherClient.subscribe(chatId);
    const handleMessage = async (newMessage) => {
      console.log("this is new message", newMessage);
      dispatch(storeNotification(notification));
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };
    pusherClient.bind("new-message", handleMessage);
    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);
  useEffect(() => {
    if (currentUser && chatId) {
      getChatDetails();
    }
  }, [chatId, currentUser]);
  const getChatDetails = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${apiPath.prodPath}/api/chat/?chatId=${chatId}`)
        .then((res) => {
          setLoading(false);
          setChat(res.data.chat);
        })
        .catch((error) => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChatSend = (e) => {
    e.preventDefault();
    const dataObj = {
      currentUserId: currentUser.id,
      chatId: chatId,
      text: message,
    };
    axios
      .post(`${apiPath.prodPath}/api/message/addMessage`, dataObj)
      .then((res) => {
        setMessage("");
      })
      .catch((err) => console.log(err));
  };
  const filteredChatUser =
    chat !== undefined &&
    chat.isGroup == false &&
    chat.members.filter((i) => i._id !== currentUser.id);
  return loading ? (
    <p>Loading</p>
  ) : chat.length == 0 && chat.members == undefined ? (
    <p>No Chats found</p>
  ) : (
    <div className="chat-detail-inner">
      {chat == undefined ? null : (
        <div className="top-section">
          {chat && chat.isGroup == true ? (
            <p>
              {chat.name} <span>({chat.members.length} members)</span>
            </p>
          ) : (
            <p>
              {chat == undefined ||
              chat.length == 0 ||
              chat.members == undefined
                ? ""
                : filteredChatUser.length
                ? filteredChatUser[0].fullname
                : ""}
            </p>
          )}
        </div>
      )}
      <div className="middle-content">
        {chat !== undefined && chat.messages !== undefined
          ? chat.messages.map((message, index) => {
              return (
                <MessageBox
                  key={index}
                  message={message}
                  currentUser={currentUser}
                />
              );
            })
          : null}
      </div>

      <div className="message-inp-wrap">
        <form onSubmit={handleChatSend}>
          <input
            type="text"
            placeholder="Enter Message..."
            className={`${poppins.className} msg-inp`}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <input
            type="submit"
            className={`${poppins.className} send-btn`}
            value="&#10148;"
          />
        </form>
      </div>
    </div>
  );
}

export default ChatDetailComp;
