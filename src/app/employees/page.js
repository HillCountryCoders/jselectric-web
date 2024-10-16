"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apiPath } from "@/utils/routes";
import InvoiceComp from "../../components/invoices";
import StatementComp from "../../components/statements";

import "./finance.scss";
import axios from "axios";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";
import TimeTrack from "@/components/timeTrack";
import Employees from "@/components/employees";

export default function EmployeePage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Employee");
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState("");
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
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
              activeLink == "Employee" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Employee
          </li>
          <li
            className={
              activeLink == "Time Track"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Time Track
          </li>
        </ul>
      </section>

      {activeLink == "Time Track" ? <TimeTrack /> : null}

      {activeLink == "Employee" ? <Employees /> : null}
    </main>
  );
}
