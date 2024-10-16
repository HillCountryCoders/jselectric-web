import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoVendor from "../../topInfo/topInfoVendor";
import Locations from "../../vendor/locations";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function VehiclesInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Locations");
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
        <TopInfoVendor item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Locations" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Locations
          </li>
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Locations" ? <Locations vendorId={item.id} /> : null}
      </div>
    </Drawer>
  );
}

export default VehiclesInfo;
