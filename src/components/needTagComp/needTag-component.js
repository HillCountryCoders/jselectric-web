"use client";
import { Poppins } from "next/font/google";
import NeedTagDrawer from "../subComponents/drawers/needTagDrawer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import NeedTagTable from "../subComponents/tables/needTagTable";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function NeedTagComp({ userInfo }) {
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [allNeedTag, setAllNeedTag] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllNeedTag();
  }, []);
  const getAllNeedTag = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/needTag/`)
      .then((res) => {
        setAllNeedTag(res.data.allNeedTags);
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

  return (
    <section className="employee-wrap">
      <div className="add-btn-wrap">
        <h2 className={`${poppins.className}`}>Need Tag</h2>
        <button
          className={`${poppins.className} add-btn`}
          onClick={handleCloseDrawer}
        >
          Add Need Tag
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
      ) : allNeedTag.length > 0 ? (
        <NeedTagTable
          userInfo={userInfo}
          allNeedTag={allNeedTag}
          refreshData={getAllNeedTag}
        />
      ) : (
        <p className={poppins.className}>No Need Tag data found</p>
      )}
      <NeedTagDrawer
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getAllNeedTag}
        edit={false}
      />
    </section>
  );
}

export default NeedTagComp;
