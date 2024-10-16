import React, { useState, useEffect } from "react";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import AddBadge from "../forms/addBadge";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import moment from "moment";
function BadgeTab({ refreshData, closeModal, item }) {
  const [editFlag, setEditFlag] = useState(false);
  const [infoData, setInfoData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const currentUser = res.data.allUsers.find(
          (i) => i.id == item.id
        ).badges;
        setInfoData(currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const addBadgeHandler = (data, editFlag) => {
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editBadges/${item.id}`;
    } else {
      url = `${apiPath.prodPath}/api/users/addBadges/${item.id}`;
    }
    axios
      .patch(url, data)
      .then((res) => {
        setInfoData(res.data.userInd.badges);
      })
      .catch((error) => console.log(error));
  };
  return loading ? (
    <section>
      <h1>Loading...</h1>
    </section>
  ) : (
    <div className="badges-tab">
      <AddBadge
        editFlag={infoData == undefined ? false : true}
        dataToBeEdited={infoData == undefined ? "" : infoData}
        addBadgeFunc={addBadgeHandler}
      />
      <div className="content-bottom-main">
        {infoData == undefined || infoData == "" ? (
          <p>No data for badges found</p>
        ) : (
          <div className="badgeInfo-data">
            <div className="single-item">
              <label>AISD</label>
              <p>{infoData.AISD}</p>
            </div>
            <div className="single-item">
              <label>AISD Exp Date</label>
              <p>
                {moment(infoData.AISDExpDate).format("MM-DD-YY") ==
                "Invalid date"
                  ? ""
                  : moment(infoData.AISDExpDate).format("MM-DD-YY")}
              </p>
            </div>
            <div className="single-item">
              <label>COA Water Dep</label>
              <p>{infoData.COAWaterDep}</p>
            </div>
            <div className="single-item">
              <label>COA Water Dept Exp Date</label>
              <p>
                {moment(infoData.COAWaterDepExpDate).format("MM-DD-YY") ==
                "Invalid date"
                  ? ""
                  : moment(infoData.COAWaterDepExpDate).format("MM-DD-YY")}
              </p>
            </div>
            <div className="single-item">
              <label>TFC</label>
              <p>{infoData.TFC}</p>
            </div>
            <div className="single-item">
              <label>TFC Exp Date</label>
              <p>
                {moment(infoData.TFCExpDate).format("MM-DD-YY") ==
                "Invalid date"
                  ? ""
                  : moment(infoData.TFCExpDate).format("MM-DD-YY")}
              </p>
            </div>
            <div className="single-item">
              <label>ABIA</label>
              <p>{infoData.ABIA}</p>
            </div>
            <div className="single-item">
              <label>ABIA Exp Date</label>
              <p>
                {moment(infoData.ABIAExpDate).format("MM-DD-YY") ==
                "Invalid date"
                  ? ""
                  : moment(infoData.ABIAExpDate).format("MM-DD-YY")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeTab;
