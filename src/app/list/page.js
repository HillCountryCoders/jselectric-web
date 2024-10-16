"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Tools from "../../components/tools";
import Devices from "../../components/devices";
import Vehicles from "../../components/vehicles";
import VehicleInspectionComp from "../../components/vehicleInspection";
import Clients from "../../components/clients";
import Schedule from "../../components/schedule/schedule";
import Tagout from "../../components/tagout/index";
import GeneralContract from "../../components/generalContract/index";
import "./list.scss";
import Link from "next/link";
import NeedTagComp from "@/components/needTagComp/needTag-component";
import ToolDamagedComp from "@/components/toolDamageComp/toolDamaged-component";
import ToolTrackComp from "@/components/toolTrackComp/toolTrack-component";
import { pusherClient } from "@/utils/pusher";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function List() {
  const [show, setShow] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  const path = usePathname();
  const [activeLink, setActiveLink] = useState("Tools");
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
        console.log("updatedChat list", updatedChat);
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
    var innerText = e.target.innerText.replace("+", "");
    innerText = e.target.innerText.replace("-", "");
    console.log(innerText);
    setActiveLink(innerText);
  };
  const handleShow = () => {
    setShow(!show);
  };
  const handleVehicleShow = () => {
    setShowVehicles(!showVehicles);
  };
  return (
    <main className={`${poppins.className} home-dashboard`}>
      <section className="links-wrap">
        <ul onClick={handleLinks} className={poppins.className}>
          <li
            className={
              activeLink == "Tools+" || activeLink == "Tools"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Tools
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
            <div className={`${poppins.className} inner-links-wrap`}>
              <p
                onClick={() => setActiveLink("Tool Track")}
                className={
                  activeLink == "Tool Track"
                    ? `${poppins.className} activeP`
                    : `${poppins.className} links`
                }
              >
                Tool Track
              </p>
              <p
                onClick={() => setActiveLink("Need Tag")}
                className={
                  activeLink == "Need Tag"
                    ? `${poppins.className} activeP`
                    : `${poppins.className} links`
                }
              >
                Need Tag
              </p>
              <p
                onClick={() => setActiveLink("Tool Damaged")}
                className={
                  activeLink == "Tool Damaged"
                    ? `${poppins.className} activeP`
                    : `${poppins.className} links`
                }
              >
                Tool Damaged
              </p>
            </div>
          ) : null}
          <li
            className={
              activeLink == "Devices" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Devices
          </li>
          <li
            className={
              activeLink == "Vehicles+" || activeLink == "Vehicles"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Vehicles
            {showVehicles == false ? (
              <span className="plus-minus" onClick={handleVehicleShow}>
                +
              </span>
            ) : null}
            {showVehicles ? (
              <span className="plus-minus" onClick={handleVehicleShow}>
                -
              </span>
            ) : null}
          </li>
          {showVehicles ? (
            <div className={`${poppins.className} inner-links-wrap`}>
              <p
                onClick={() => setActiveLink("Inspections")}
                className={
                  activeLink == "Inspections"
                    ? `${poppins.className} activeP`
                    : `${poppins.className} links`
                }
              >
                Inspections
              </p>
            </div>
          ) : null}
          <li
            className={
              activeLink == "Clients" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Clients
          </li>
          <li
            className={
              activeLink == "Schedules" ? "activeLink simpleLink" : "simpleLink"
            }
          >
            Schedules
          </li>
          <li
            className={
              activeLink == "Lockout/Tagout"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            Lockout/Tagout
          </li>
          <li
            className={
              activeLink == "General Contractors"
                ? "activeLink simpleLink"
                : "simpleLink"
            }
          >
            General Contractors
          </li>
        </ul>
      </section>

      {activeLink == "Need Tag" ? (
        <NeedTagComp
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Need Tag"}
        />
      ) : null}
      {activeLink == "Tool Damaged" ? (
        <ToolDamagedComp
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Tool Damaged"}
        />
      ) : null}
      {activeLink == "Tool Track" ? (
        <ToolTrackComp
          userInfo={currentUser == null ? "" : currentUser.userInfo}
          picklistName={"Tool Track"}
        />
      ) : null}
      {activeLink == "Tools+" || activeLink == "Tools" ? (
        <Tools picklistName={"Tools"} />
      ) : null}
      {activeLink == "Devices" ? <Devices picklistName={"Tools"} /> : null}
      {activeLink == "Vehicles+" || activeLink == "Vehicles" ? (
        <Vehicles picklistName={"Vehicles"} />
      ) : null}
      {activeLink == "Inspections" ? (
        <VehicleInspectionComp picklistName={"Inspection"} />
      ) : null}
      {activeLink == "Clients" ? <Clients picklistName={"Clients"} /> : null}
      {activeLink == "Schedules" ? (
        <Schedule picklistName={"Schedules"} />
      ) : null}
      {activeLink == "Lockout/Tagout" ? (
        <Tagout user={currentUser !== null ? currentUser.userInfo : ""} />
      ) : null}
      {activeLink == "General Contractors" ? (
        <GeneralContract
          user={currentUser !== null ? currentUser.userInfo : ""}
        />
      ) : null}
    </main>
  );
}
