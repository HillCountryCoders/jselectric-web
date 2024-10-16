import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import VendorDrawer from "../drawers/vendorDrawer";
import VendorInfo from "../drawers/vendorInfo";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function JobNumberTable({ allVendors, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setVendorId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setActionFlag(false);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editVendor = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/vendor/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteVendor = (id) => {
    setActionFlag(!actionFlag);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Vendor data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/vendor/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Company Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Address</TableCell>
                <TableCell style={{ minWidth: 150 }}>City</TableCell>
                <TableCell style={{ minWidth: 150 }}>State</TableCell>
                <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
                <TableCell style={{ minWidth: 150 }}>Primary Contact</TableCell>
                <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVendors.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Jobs Data Found</p>
                </TableRow>
              ) : (
                allVendors.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                          alt="Menu"
                        />
                        {actionFlag && i.id == vendorId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={openInfoDrawer}
                              className={poppins.className}
                            >
                              Open
                            </p>
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteVendor(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.name}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.companyName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.address}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.city}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.state}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.zipCode}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.primaryContact}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.phone}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.email}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.website}
                      </TableCell>
                      {infoModal && i.id == vendorId ? (
                        <VendorInfo
                          open={infoModal}
                          onClose={openInfoDrawer}
                          item={item}
                          refreshData={refreshData}
                        />
                      ) : null}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <VendorDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={vendorId}
                data={editData}
                editVendor={editVendor}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
