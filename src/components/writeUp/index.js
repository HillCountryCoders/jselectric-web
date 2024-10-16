"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import WriteUpDrawer from "../subComponents/drawers/writeUpDrawer";
import WriteUpTable from "../subComponents/tables/writeUpTable";
import "./style.scss";
import axios from "axios";
import Select from "react-select";

import { apiPath } from "@/utils/routes";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function WriteUpComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [writeUps, setwriteUps] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/writeUp/`)
      .then((res) => {
        setwriteUps(res.data.writeUp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/writeUp/`)
      .then((res) => {
        setwriteUps(res.data.writeUp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("yeah data", writeUps);
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Write Up</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Write Up
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <WriteUpTable
          loading={loading}
          refreshData={refreshData}
          data={writeUps}
        />
      )}
      <WriteUpDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default WriteUpComp;
