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

export default function FinancePage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Invoices");
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState("");
  useEffect(() => {
    if (currentUser && currentUser.userInfo && currentUser.userInfo == null) {
      router.push("/login");
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/clients/`)
        .then((res) => {
          setLoading(false);
          setClients(res.data.clients);
        })
        .catch((err) => console.log(err));
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
              activeLink == "Invoices" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Invoices
          </li>
          <li
            className={
              activeLink == "Statements"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Statements
          </li>
        </ul>
      </section>

      {activeLink == "Invoices" ? (
        loading ? (
          <p className={poppins.className}>Loading...</p>
        ) : (
          <InvoiceComp allClients={clients} />
        )
      ) : null}

      {activeLink == "Statements" ? (
        loading ? (
          <p className={poppins.className}>Loading...</p>
        ) : (
          <StatementComp allClients={clients} />
        )
      ) : null}
    </main>
  );
}
