import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ChatDrawer({ open, onClose, item }) {
  const toolsData = item.filter((i) => i.toolNumber !== undefined);
  const clientsData = item.filter((i) => i.customerCode !== undefined);
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
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        {clientsData.map((i) => {
          return (
            <div key={i._id} className={`${poppins.className} data-row`}>
              <div>
                <label className={poppins.className}>Customer Code</label>
                <p className={poppins.className}>{i.customerCode}</p>
              </div>
              <div>
                <label className={poppins.className}>Customer Name</label>
                <p className={poppins.className}>{i.customerName}</p>
              </div>
              <div>
                <label className={poppins.className}>Customer Type</label>
                <p className={poppins.className}>{i.customerType}</p>
              </div>
              <div>
                <label className={poppins.className}>Customer Name</label>
                <p className={poppins.className}>{i.customerName}</p>
              </div>
              <div>
                <label className={poppins.className}>Status</label>
                <p className={poppins.className}>{i.status}</p>
              </div>
            </div>
          );
        })}
        {toolsData.map((i) => {
          return (
            <div key={i._id} className={`${poppins.className} data-row`}>
              <div>
                <label>Tool Number</label>
                <p>{i.toolNumber}</p>
              </div>
              <div>
                <label>Categoroy</label>
                <p>{i.category}</p>
              </div>
              <div>
                <label>Description</label>
                <p>{i.description}</p>
              </div>
              <div>
                <label>Tech Assigned</label>
                <p>{i.techAssigned}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}

export default ChatDrawer;
