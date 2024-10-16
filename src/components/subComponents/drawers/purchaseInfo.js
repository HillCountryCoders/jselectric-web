import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoPurchaseOrder from "../../topInfo/topInfoPurchaseOrder";
import PartsItems from "../../tools/parts-items";
import "./style.scss";
import VehiclePicFile from "../../vehiclePicFile/index";
import HistoryTab from "../../tools/history";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function PurchaseOrderInfo({ open, onClose, item, refreshData }) {
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
        <TopInfoPurchaseOrder item={item} />
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
      <div className={`${poppins.className} innerTabsWrap`}>
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
      </div>
    </Drawer>
  );
}

export default PurchaseOrderInfo;
