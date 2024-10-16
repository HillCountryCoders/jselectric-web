"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Employees from "../../components/employees";
import TimeTrack from "../../components/timeTrack";
import TaskNotificationModal from "../../components/subComponents/modal/taskNotificationModal";
import SalesTaxModal from "../../components/subComponents/modal/salesTaxModal";
import { pusherClient } from "@/utils/pusher";

import PicklistComp from "../../components/Picklists/picklist";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
export default function Settings() {
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.user);

  const router = useRouter();
  const [activeLink, setActiveLink] = useState("User Type");
  const [showPick, setShowPick] = useState(true);
  const [showEmp, setShowEmp] = useState(true);
  const [showNot, setShowNot] = useState(false);
  const [taskModalNotificationModal, setTaskModalNotificationModal] =
    useState(false);
  const [salesTaxModal, setSalesTaxModal] = useState(false);

  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.userInfo !== undefined
    ) {
      pusherClient.subscribe(currentUser.userInfo.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat settings", updatedChat);
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
        {/* <p onClick={() => setShowEmp(!showEmp)}>
          Employees {showEmp ? "-" : "+"}
        </p>
        {showEmp ? (
          <ul
            onClick={handleLinks}
            className={`${poppins.className} inner-links`}
          >
            <li
              className={
                activeLink == "Employee"
                  ? "activeLink simpleLink"
                  : "simpleLink"
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
        ) : null} */}
        <p onClick={() => setShowNot(!showNot)}>
          Notifications {showNot ? "-" : "+"}
        </p>
        {showNot ? (
          <ul
            onClick={handleLinks}
            className={`${poppins.className} inner-links`}
          >
            <li
              onClick={() =>
                setTaskModalNotificationModal(!taskModalNotificationModal)
              }
              className={
                activeLink == "Tasks" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Tasks
            </li>
          </ul>
        ) : null}
        <p
          onClick={() => {
            console.log("clicked", salesTaxModal);
            setSalesTaxModal(!salesTaxModal);
          }}
          className={
            activeLink == "Sales Tax" ? "activeLink simpleLink" : "simpleLink"
          }
        >
          Sales Tax
        </p>
        <p onClick={() => setShowPick(!showPick)}>
          Picklist {showPick ? "-" : "+"}
        </p>
        {showPick ? (
          <ul onClick={handleLinks} className="inner-links">
            <li
              className={
                activeLink == "User Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              User Type
            </li>
            <li
              className={
                activeLink == "Position"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Position
            </li>
            <li
              className={
                activeLink == "Building"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Building
            </li>
            <li
              className={
                activeLink == "Storage Id"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Storage Id
            </li>
            <li
              className={
                activeLink == "Tool Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tool Category
            </li>
            <li
              className={
                activeLink == "Tool Sub-Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tool Sub-Category
            </li>
            <li
              className={
                activeLink == "Device Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Device Category
            </li>
            <li
              className={
                activeLink == "Task Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Task Category
            </li>
            <li
              className={
                activeLink == "Timeout Reason"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Timeout Reason
            </li>
            <li
              className={
                activeLink == "Task Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Task Status
            </li>
            <li
              className={
                activeLink == "Task Priority"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Task Priority
            </li>
            <li
              className={
                activeLink == "Notes Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Notes Status
            </li>
            <li
              className={
                activeLink == "Notes Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Notes Category
            </li>
            <li
              className={
                activeLink == "Customer Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Customer Type
            </li>
            <li
              className={
                activeLink == "Customer Term"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Customer Term
            </li>
            <li
              className={
                activeLink == "Tax Code"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Tax Code
            </li>
            <li
              className={
                activeLink == "Material Level"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Material Level
            </li>
            <li
              className={
                activeLink == "Labor Level"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Labor Level
            </li>
            <li
              className={
                activeLink == "Salesperson Code"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Salesperson Code
            </li>
            <li
              className={
                activeLink == "Job Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Job Type
            </li>
            <li
              className={
                activeLink == "Job Tag" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Job Tag
            </li>
            <li
              className={
                activeLink == "Job PM" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Job PM
            </li>
            <li
              className={
                activeLink == "Job Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Job Status
            </li>
            <li
              className={
                activeLink == "Job Sources"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Job Sources
            </li>
            <li
              className={
                activeLink == "Job CTM" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Job CTM
            </li>
            <li
              className={
                activeLink == "Training Category"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Training Category
            </li>
            <li
              className={
                activeLink == "Overstock Categories"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Overstock Categories
            </li>
            <li
              className={
                activeLink == "Phase" ? "activeLink simpleLink" : "simpleLink"
              }
            >
              Phase
            </li>
            <li
              className={
                activeLink == "Service Ticket Terms"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Service Ticket Terms
            </li>
            <li
              className={
                activeLink == "Reimbursal Type"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Reimbursal Type
            </li>
            <li
              className={
                activeLink == "PO Status"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              PO Status
            </li>
            <li
              className={
                activeLink == "Warnings"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Warnings
            </li>
            <li
              className={
                activeLink == "Offences"
                  ? "activeLink simpleLink"
                  : "simpleLink"
              }
            >
              Offences
            </li>
          </ul>
        ) : null}
      </section>
      <section className={`${poppins.className} content-wrap`}>
        {/* {activeLink == "Employee" ? <Employees /> : null} */}
        {activeLink == "Tasks" ? (
          <TaskNotificationModal
            user={user.user}
            open={taskModalNotificationModal}
            onClose={() =>
              setTaskModalNotificationModal(!taskModalNotificationModal)
            }
          />
        ) : null}
        {salesTaxModal ? (
          <SalesTaxModal
            open={salesTaxModal}
            onClose={() => setSalesTaxModal(!salesTaxModal)}
          />
        ) : null}
        {/* {activeLink == "Time Track" ? <TimeTrack /> : null} */}
        {activeLink == "User Type" ? (
          <PicklistComp picklistName={"User Type"} />
        ) : null}
        {activeLink == "Position" ? (
          <PicklistComp picklistName={"Position"} />
        ) : null}
        {activeLink == "Building" ? (
          <PicklistComp picklistName={"Building"} />
        ) : null}
        {activeLink == "Storage Id" ? (
          <PicklistComp picklistName={"Storage Id"} />
        ) : null}
        {activeLink == "Tool Category" ? (
          <PicklistComp picklistName={"Tool Category"} />
        ) : null}
        {activeLink == "Tool Sub-Category" ? (
          <PicklistComp picklistName={"Tool Sub-Category"} />
        ) : null}
        {activeLink == "Device Category" ? (
          <PicklistComp picklistName={"Device Category"} />
        ) : null}
        {activeLink == "Task Category" ? (
          <PicklistComp picklistName={"Task Category"} />
        ) : null}
        {activeLink == "Timeout Reason" ? (
          <PicklistComp picklistName={"Timeout Reason"} />
        ) : null}
        {activeLink == "Task Status" ? (
          <PicklistComp picklistName={"Task Status"} />
        ) : null}
        {activeLink == "Task Priority" ? (
          <PicklistComp picklistName={"Task Priority"} />
        ) : null}
        {activeLink == "Notes Status" ? (
          <PicklistComp picklistName={"Notes Status"} />
        ) : null}
        {activeLink == "Notes Category" ? (
          <PicklistComp picklistName={"Notes Category"} />
        ) : null}
        {activeLink == "Customer Type" ? (
          <PicklistComp picklistName={"Customer Type"} />
        ) : null}
        {activeLink == "Customer Term" ? (
          <PicklistComp picklistName={"Customer Term"} />
        ) : null}
        {activeLink == "Tax Code" ? (
          <PicklistComp picklistName={"Tax Code"} />
        ) : null}
        {activeLink == "Material Level" ? (
          <PicklistComp picklistName={"Material Level"} />
        ) : null}
        {activeLink == "Labor Level" ? (
          <PicklistComp picklistName={"Labor Level"} />
        ) : null}
        {activeLink == "Salesperson Code" ? (
          <PicklistComp picklistName={"Salesperson Code"} />
        ) : null}
        {activeLink == "Job Type" ? (
          <PicklistComp picklistName={"Job Type"} />
        ) : null}
        {activeLink == "Job Tag" ? (
          <PicklistComp picklistName={"Job Tag"} />
        ) : null}
        {activeLink == "Job PM" ? (
          <PicklistComp picklistName={"Job PM"} />
        ) : null}
        {activeLink == "Job Status" ? (
          <PicklistComp picklistName={"Job Status"} />
        ) : null}
        {activeLink == "Job Sources" ? (
          <PicklistComp picklistName={"Job Sources"} />
        ) : null}
        {activeLink == "Job CTM" ? (
          <PicklistComp picklistName={"Job CTM"} />
        ) : null}
        {activeLink == "PO Status" ? (
          <PicklistComp picklistName={"PO Status"} />
        ) : null}
        {activeLink == "Training Category" ? (
          <PicklistComp picklistName={"Training Category"} />
        ) : null}
        {activeLink == "Overstock Categories" ? (
          <PicklistComp picklistName={"Overstock Categories"} />
        ) : null}
        {activeLink == "Service Ticket Terms" ? (
          <PicklistComp picklistName={"Service Ticket Terms"} />
        ) : null}
        {activeLink == "Warnings" ? (
          <PicklistComp picklistName={"Warnings"} />
        ) : null}
        {activeLink == "Offences" ? (
          <PicklistComp picklistName={"Offences"} />
        ) : null}
        {activeLink == "Phase" ? <PicklistComp picklistName={"Phase"} /> : null}
        {activeLink == "Reimbursal Type" ? (
          <PicklistComp picklistName={"Reimbursal Type"} />
        ) : null}
      </section>
    </main>
  );
}
