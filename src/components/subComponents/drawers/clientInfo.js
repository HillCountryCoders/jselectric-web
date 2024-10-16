import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoClients from "../../topInfo/topInfoClients";
import Invoices from "../../clients/invoices";
import ClientAttachments from "../tabs/clientAttachments";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ClientInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Invoices");
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
        <TopInfoClients item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Invoices" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Invoices
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Pics / Files" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Pics / Files
          </li>
          {/* <li
            onClick={tabHandler}
            className={
              activeTab == "History" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            History
          </li> */}
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Invoices" ? <Invoices allData={item} /> : null}
        {activeTab == "Pics / Files" ? (
          <ClientAttachments
            clientId={item.id}
            attachments={item.attachments}
          />
        ) : null}
        {/* {activeTab == "History" ? <HistoryTab /> : null} */}
      </div>
    </Drawer>
  );
}

export default ClientInfo;
