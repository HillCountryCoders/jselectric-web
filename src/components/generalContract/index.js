"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import GeneralContractTable from "../subComponents/tables/generalContractTable.js";
import GeneralContractDrawer from "../subComponents/drawers/generalContractDrawer.js";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function GeneralContract({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allGeneralContracts, setAllGeneralContracts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/generalContract/`)
      .then((res) => {
        const sortedGenCon = res.data.generalContracts.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        );
        setAllGeneralContracts(sortedGenCon);
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
      .get(`${apiPath.prodPath}/api/generalContract/`)
      .then((res) => {
        const sortedGenCon = res.data.generalContracts.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        );
        setAllGeneralContracts(sortedGenCon);
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
        <h2 className={poppins.className}>General Contractors</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add General Contractors
        </button>
      </div>
      <div className="table-wrap">
        <GeneralContractTable
          loading={loading}
          allGeneralContracts={allGeneralContracts}
          refreshData={refreshData}
        />
      </div>
      <GeneralContractDrawer
        open={drawer}
        onClose={handleCloseDrawer}
        loggedInUser={user}
        refreshData={refreshData}
      />
    </section>
  );
}

export default GeneralContract;
