"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TagoutTable from "../subComponents/tables/tagoutTable";
import TagoutDrawer from "../subComponents/drawers/tagoutDrawer.js";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Tagout({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTagouts, setAllTagouts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tagout/`)
      .then((res) => {
        setAllTagouts(res.data.tagouts);
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
  const addTagout = (data, cb = null) => {
    axios
      .post(`${apiPath.prodPath}/api/tagout/addTagout`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          handleCloseDrawer();
          refreshData();
          cb();
        }
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tagout/`)
      .then((res) => {
        setAllTagouts(res.data.tagouts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Tagouts</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Tagouts
        </button>
      </div>
      <div className="table-wrap">
        <TagoutTable
          loading={loading}
          allTagouts={allTagouts}
          refreshData={refreshData}
          user={user}
        />
      </div>
      <TagoutDrawer
        addTagout={addTagout}
        open={drawer}
        onClose={handleCloseDrawer}
        loggedInUser={user}
      />
    </section>
  );
}

export default Tagout;
