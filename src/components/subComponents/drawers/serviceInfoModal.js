import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoService from "../../topInfo/topInfoServices";
import PicFileService from "../../services/pic-file";
import Payments from "../../services/payments";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ServiceInfoDrawer({ open, onClose, id, refreshData }) {
  const [activeTab, setActiveTab] = useState("Pics / Files");
  const [data, setData] = useState("Pics / Files");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [open]);
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  const getData = () => {
    console.log("Called");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        const filteredData = res.data.services.find((i) => i.id == id);
        setData(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} info-modal`}>
        <p className="close" onClick={() => onClose(data)}>
          x
        </p>
        {loading ? <p>Loading....</p> : <TopInfoService item={data} />}
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
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
              activeTab == "Payments" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Payments
          </li>
        </ul>
      </div>
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Pics / Files" ? (
          loading ? (
            <p>Loading...</p>
          ) : (
            <PicFileService
              serviceId={data.id}
              attachments={data.attachments}
            />
          )
        ) : null}
        {activeTab == "Payments" ? (
          loading ? (
            <p>Loading...</p>
          ) : (
            <Payments
              remaining={data.remaining}
              allPayments={data.payments}
              total={data.total}
              refreshData={getData}
              serviceId={data.id}
            />
          )
        ) : null}
      </div>
    </Drawer>
  );
}

export default ServiceInfoDrawer;
