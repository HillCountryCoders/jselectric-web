import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopTimeoutInfo from "../../topInfo/topTimeoutInfo";
import "./style.scss";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TimeoutInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Pics / Files");
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
        <TopTimeoutInfo item={item} />
      </div>
      {/* <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Pics / Files" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Pics / Files
          </li>
        </ul>
      </div> */}
      {/* <div className={`${poppins.className} innerTabsWrap`}> */}
      {/* {activeTab == "Parts / Items" ? (
          <PartsItems
            parts={item.parts}
            refreshData={refreshData}
            toolId={item.id}
          />
        ) : null} */}
      {/* {activeTab == "Pics / Files" ? (
          <VehiclePicFile vehicleId={item.id} attachments={item.attachments} />
        ) : null} */}
      {/* {activeTab == "History" ? <HistoryTab history={item.history} /> : null} */}
      {/* </div> */}
    </Drawer>
  );
}

export default TimeoutInfo;
