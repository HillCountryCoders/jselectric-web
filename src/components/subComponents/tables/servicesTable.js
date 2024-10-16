import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import VehicleInfo from "../drawers/vehicleInfo";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import ServiceDrawer from "../drawers/serviceDrawer";
import ServiceInfoDrawer from "../drawers/serviceInfoModal";
import ServicePrintModal from "../modal/servicePrint";
import SignatureModal from "../modal/signature";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ServiceTable({
  allServices,
  loading,
  refreshData,
  currentUser,
  salesTaxValue,
}) {
  const [actionFlag, setActionFlag] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  const [printModal, setPrintModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [loaderOuter, setLoaderOuter] = useState(false);

  const handleActions = (id, objData) => {
    setServiceId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = () => {
    setOpenModal(!openModal);
    setActionFlag(false);
  };

  const editService = (data, id) => {
    setLoaderOuter(true);
    axios
      .patch(`${apiPath.prodPath}/api/service/${serviceId}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
        setLoaderOuter(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteService = (item, id) => {
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Services data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("attachments", item.attachments);
        const dataObj = {
          oldFiles: JSON.stringify(item.attachments),
        };
        axios
          .patch(`${apiPath.prodPath}/api/service/delete/${id}`, dataObj)
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const openPrintModal = (i) => {
    setItem(i);
    setServiceId(i.id);
    setPrintModal(!printModal);
  };
  const openSignatrueModal = (i) => {
    setItem(i);
    setServiceId(i.id);
    setSignatureModal(!signatureModal);
  };
  const openInfoDrawer = () => {
    console.log("called");
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
  const generatePdf = async (final) => {
    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=0,left=150"
    );
    mywindow.document.write(
      '<img src={"https://ibb.co/Xs0f35G"} alt="JsElectric" />'
    );
    mywindow.document.write(document.getElementById("service-pdf").innerHTML);
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
                <TableCell style={{ minWidth: 150 }}>Print</TableCell>
                <TableCell style={{ minWidth: 150 }}>Signature</TableCell>
                <TableCell style={{ minWidth: 150 }}>To</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Of Order</TableCell>
                <TableCell style={{ minWidth: 150 }}>Contact Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tel</TableCell>
                <TableCell style={{ minWidth: 150 }}>Order Taken By</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Customer Order No
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Location</TableCell>
                <TableCell style={{ minWidth: 150 }}>Invoice Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Terms</TableCell>
                {/* <TableCell style={{ minWidth: 150 }}>Labor</TableCell> */}
                <TableCell style={{ minWidth: 150 }}>Total Labor</TableCell>
                {/* <TableCell style={{ minWidth: 150 }}>Materials</TableCell> */}
                <TableCell style={{ minWidth: 150 }}>Total Material</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tax</TableCell>
                <TableCell style={{ minWidth: 150 }}>Total</TableCell>
                <TableCell style={{ minWidth: 750 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allServices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Services Data Found</p>
                </TableRow>
              ) : (
                allServices.map((i) => {
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
                        {actionFlag && i.id == serviceId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => openInfoDrawer()}
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
                              onClick={() => deleteService(i, i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        <button onClick={() => openPrintModal(i)}>Print</button>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        <button onClick={() => openSignatrueModal(i)}>
                          {i.signature == undefined
                            ? "Add"
                            : Object.keys(i.signature).length == 0
                            ? "Add"
                            : "View"}
                        </button>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.to}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.dateOfOrder}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.contactName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.tel}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.orderTakenBy}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.customerOrderNo}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.startDate}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.jobName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.jobLocation}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.invoiceDate}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.terms}</TableCell>
                      {/* <TableCell style={{ minWidth: 150 }}>
                        {i.laborArr.length ? <button>View</button> : "None"}
                        </TableCell> */}
                      <TableCell style={{ minWidth: 150 }}>
                        {i.totalLabor == null
                          ? "none"
                          : `$${numberWithCommas(i.totalLabor)}`}
                      </TableCell>
                      {/* <TableCell style={{ minWidth: 150 }}>
                        {i.materialArr.length ? <button>View</button> : "None"}
                        </TableCell> */}
                      <TableCell style={{ minWidth: 150 }}>
                        {i.totalMaterail == null
                          ? "none"
                          : `$${numberWithCommas(i.totalMaterail)}`}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.taxStatus == "Yes" ? salesTaxValue : 0}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.total == undefined
                          ? 0
                          : i.total == null
                          ? "none"
                          : `$${numberWithCommas(i.total)}`}
                      </TableCell>
                      <TableCell style={{ minWidth: 750 }}>
                        {i.description}
                      </TableCell>
                      {printModal && serviceId == i.id ? (
                        <ServicePrintModal
                          item={item}
                          handleClose={() => setPrintModal(false)}
                          open={printModal}
                          handlePDF={generatePdf}
                          salesTaxValue={salesTaxValue}
                        />
                      ) : null}
                      {signatureModal && serviceId == i.id ? (
                        <SignatureModal
                          moduleName="service"
                          item={item}
                          handleClose={() => setSignatureModal(false)}
                          open={signatureModal}
                          refreshData={refreshData}
                        />
                      ) : null}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal == true && editData !== "undefined" ? (
              <ServiceDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={serviceId}
                data={item}
                editService={editService}
                currentUser={currentUser}
                salesTaxValue={salesTaxValue}
                loaderOuter={loaderOuter}
              />
            ) : null}
            {infoModal == true && item !== "" ? (
              <ServiceInfoDrawer
                open={infoModal}
                onClose={() => openInfoDrawer()}
                id={serviceId}
                refreshData={refreshData}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
