"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import CreateChatModal from "../../components/subComponents/modal/createChat";
import ChatList from "../../components/chat/chatlist";
import "./style.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
  style: ["normal"],
});
function ChatPage() {
  const [createChatModal, setCreateChatModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      console.log("here");
      router.push("/login");
    }
    getUsers();
  }, [currentUser]);

  const getUsers = async () => {
    setLoader(true);
    await axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setAllUsers(res.data.allUsers);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateModal = () => {
    setCreateChatModal(!createChatModal);
  };
  return (
    <section className={`${poppins.className} chat-wrap-main`}>
      <div className="chat-btn-wrap">
        <h1>Create a Single or Group chat</h1>
        <button onClick={handleCreateModal} className={`${poppins.className}`}>
          Create Chat
        </button>
      </div>
      <div className="chat-inner-con">
        <div className="chatlist-wrap">
          {loader && currentUser && currentUser.userInfo !== null ? (
            <p>Loading</p>
          ) : (
            <ChatList currentUser={currentUser} />
          )}
        </div>
      </div>
      <CreateChatModal
        modalFlag={createChatModal}
        modalClose={handleCreateModal}
        allUsers={allUsers}
        currentUser={currentUser}
      />
    </section>
  );
}

export default ChatPage;
