"use client";
import { Poppins } from "next/font/google";
import ToolDamagedDrawer from "../subComponents/drawers/toolDamagedDrawer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import "./style.scss";
import ToolDamagedTable from "../subComponents/tables/toolDamagedTable";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function ToolDamagedComp({ userInfo }) {
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [allToolDamaged, setAllToolDamaged] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllToolDamaged();
  }, []);
  const getAllToolDamaged = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/toolDamage/`)
      .then((res) => {
        setAllToolDamaged(res.data.alltoolDamages);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addToolDamaged = (data) => {
    console.log(data);
  };
  return (
    <section className="employee-wrap">
      <div className="add-btn-wrap">
        <h2 className={`${poppins.className}`}>Tool Damaged</h2>
        <button
          className={`${poppins.className} add-btn`}
          onClick={handleCloseDrawer}
        >
          Add Tool Damaged
        </button>
      </div>
      {/* <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <input
            className={`${poppins.className}`}
            type="text"
            required={true}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className={`${poppins.className}`}
            type="submit"
            value={"Search"}
          />
        </form>
      </div> */}
      {loader ? (
        <p className={poppins.className}>Loading...</p>
      ) : allToolDamaged.length > 0 ? (
        <ToolDamagedTable
          userInfo={userInfo}
          allToolDamaged={allToolDamaged}
          refreshData={getAllToolDamaged}
        />
      ) : (
        <p className={poppins.className}>No Tool Damaged data found</p>
      )}
      <ToolDamagedDrawer
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getAllToolDamaged}
        edit={false}
      />
    </section>
  );
}

export default ToolDamagedComp;
