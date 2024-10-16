"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apiPath } from "@/utils/routes";
import VendorComp from "../../components/vendor/index";
import TrackingComp from "../../components/tracking/index";

import StorageLocationComp from "../../components/storageLocation/index";
import PurchasingOrderComp from "../../components/purchasingOrder/index";
import Overstock from "../../components/overstock/index";

import "./purchase.scss";
import axios from "axios";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";

export default function PurchasingPage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Storage Locations");
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
              activeLink == "Storage Locations"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Storage Locations
          </li>
          <li
            className={
              activeLink == "Vendors" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Vendors
          </li>
          {/* <li
            className={
              activeLink == "Tracking" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Tracking
          </li> */}
          <li
            className={
              activeLink == "Overstock" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Overstock
          </li>
          <li
            className={
              activeLink == "Purchase Order/Tracking"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Purchase Order/Tracking
          </li>
        </ul>
      </section>
      {activeLink == "Vendors" ? <VendorComp /> : null}
      {/* {activeLink == "Tracking" ? <TrackingComp /> : null} */}
      {activeLink == "Storage Locations" ? <StorageLocationComp /> : null}
      {activeLink == "Overstock" ? <Overstock /> : null}
      {activeLink == "Purchase Order/Tracking" ? <PurchasingOrderComp /> : null}
    </main>
  );
}
