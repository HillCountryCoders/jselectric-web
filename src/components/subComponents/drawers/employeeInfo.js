import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import PicFile from "../../picFile";
import TopInfo from "../../topInfo/topInfo";
import BadgeTab from "../tabs/badgeTab";
import Notes from "../../notes/notes";
import "./style.scss";
import ScheduleTab from "../tabs/scheduleTab";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function EmployeeInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Badges");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} info-modal`}>
        <p className="close" onClick={() => onClose()}>
          x
        </p>
        <TopInfo item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Badges" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Badges
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Notes" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Notes
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Pic/Files" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Pic/Files
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Schedules" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Schedules
          </li>
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Badges" ? (
          <BadgeTab
            item={item}
            closeModal={onClose}
            refreshData={refreshData}
          />
        ) : null}
        {activeTab == "Notes" ? <Notes userId={item.id} /> : null}
        {activeTab == "Pic/Files" ? (
          <PicFile userId={item.id} attachments={item.attachments} />
        ) : null}
        {activeTab == "Schedules" ? (
          <ScheduleTab schedules={item.schedules} />
        ) : null}
      </div>
    </Drawer>
  );
}

export default EmployeeInfo;
