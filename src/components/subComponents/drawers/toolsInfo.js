import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoTools from "../../topInfo/topInfoTools";
import PartsItems from "../../tools/parts-items";
import "./style.scss";
import PicsFiles from "../../tools/pics-file";
import HistoryTab from "../../tools/history";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ToolsInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Parts / Items");
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
        <TopInfoTools item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Parts / Items"
                ? "activeTab simpleTab"
                : "simple Tab"
            }
          >
            Parts / Items
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Pics / Files" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Pics / Files
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "History" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            History
          </li>
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Parts / Items" ? (
          <PartsItems
            parts={item.parts}
            refreshData={refreshData}
            toolId={item.id}
          />
        ) : null}
        {activeTab == "Pics / Files" ? (
          <PicsFiles toolsId={item.id} attachments={item.attachments} />
        ) : null}
        {activeTab == "History" ? <HistoryTab toolsInfo={item} /> : null}
      </div>
    </Drawer>
  );
}

export default ToolsInfo;
