"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Job from "../../components/job/job";
import JobNumber from "../../components/jobNumber/index";
import ServiceTools from "../../components/serviceTools/index";
import JobEstimates from "../../components/jobEstimates/index";
import ServiceComp from "../../components/services/index";
import ServiceToolTrack from "../../components/serviceToolTrackComp/serviceToolTrack-comp";
import { pusherClient } from "@/utils/pusher";

import "./job.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function JobPage() {
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Service Tickets");
  const [show, setShow] = useState(false);
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
        console.log("updatedChat jobs", updatedChat);
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
  const handleInnerLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  const handleShow = () => {
    setShow(!show);
  };
  console.log("@#@#@#@", activeLink);
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <ul onClick={handleLinks} className={poppins.className}>
          <li
            className={
              activeLink == "Service Tickets" ||
              activeLink == "Service Tickets-" ||
              activeLink == "Service Tickets+"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Service Tickets
            {show == false ? (
              <span className="plus-minus" onClick={handleShow}>
                +
              </span>
            ) : null}
            {show ? (
              <span className="plus-minus" onClick={handleShow}>
                -
              </span>
            ) : null}
          </li>
          {show ? (
            <ul
              className={`${poppins.className} inner-links-wrap`}
              onClick={handleInnerLinks}
            >
              <li
                className={
                  activeLink == "zJobs" ? "activeLink simpleLink" : "simpleLink"
                }
              >
                zJobs
              </li>
              <li
                className={
                  activeLink == "zJob Numbers"
                    ? "activeLink simpleLink"
                    : "simpleLink"
                }
              >
                zJob Numbers
              </li>
              <li
                className={
                  activeLink == "zJob Estimates"
                    ? "activeLink simpleLink"
                    : "simpleLink"
                }
              >
                zJob Estimates
              </li>
              <li
                className={
                  activeLink == "zJob Estimates"
                    ? "activeLink simpleLink"
                    : "simpleLink"
                }
              >
                zJob Estimates
              </li>
            </ul>
          ) : null}
          {currentUser == undefined || currentUser == null ? null : currentUser
              .userInfo.fullname == "Zach Acosta" ||
            currentUser.userInfo.fullname == "Anton Groschev" ||
            currentUser.userInfo.fullname == "Jamie Schmidt" ||
            currentUser.userInfo.fullname == "Kevin Baumhover" ||
            currentUser.userInfo.fullname == "Ralph Macias" ? (
            <li
              className={
                activeLink == "Service Tools"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Service Tools
            </li>
          ) : null}
          {currentUser == undefined || currentUser == null ? null : currentUser
              .userInfo.fullname == "Zach Acosta" ||
            currentUser.userInfo.fullname == "Anton Groschev" ||
            currentUser.userInfo.fullname == "Jamie Schmidt" ||
            currentUser.userInfo.fullname == "Kevin Baumhover" ||
            currentUser.userInfo.fullname == "Ralph Macias" ? (
            <li
              className={
                activeLink == "Service Tool Track"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Service Tool Track
            </li>
          ) : null}
        </ul>
      </section>
      {activeLink == "zJobs" ? <Job /> : null}
      {activeLink == "zJob Numbers" ? <JobNumber /> : null}
      {activeLink == "zJob Estimates" ? <JobEstimates /> : null}

      {activeLink == "Service Tickets" ||
      activeLink == "Service Tickets-" ||
      activeLink == "Service Tickets+" ? (
        <ServiceComp currentUser={currentUser} />
      ) : null}
      {activeLink == "Service Tools" ? (
        <ServiceTools picklistName={"Service Tools"} />
      ) : null}
      {activeLink == "Service Tool Track" ? (
        <ServiceToolTrack
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Service Tool Track"}
        />
      ) : null}
    </main>
  );
}
