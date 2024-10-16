import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "./style.scss";
import Select from "react-select";
import moment from "moment";
function PurchaseOrdersDrawer({
  allPurchasing,
  open,
  onClose,
  addPurchaseOrders,
  edit,
  editData,
  id,
  refreshData,
}) {
  const [vendor, setVendor] = useState("");
  const [vendorOpt, setVendorOpt] = useState([]);
  const [purchaseType, setPurchaseType] = useState("");
  const [vendorSales, setVendorSales] = useState("");
  const [PO, setPO] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [POStatusOpt, setPOStatusOpt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (allPurchasing && allPurchasing.length > 0) {
      const lastPurchasePO = allPurchasing[allPurchasing.length - 1].PO;
      const numberSectionOfPO = lastPurchasePO.substring(
        lastPurchasePO.indexOf("-") + 1
      );
      const newNo = Number(numberSectionOfPO) + 1;
      const newPOValue = `PO${moment().format("YYYY")}-${newNo}`;
      setPO(newPOValue);
    } else {
      const newPOValue = `PO${moment().format("YYYY")}-1`;
      setPO(newPOValue);
    }
    axios.get(`${apiPath.prodPath}/api/vendor`).then((res) => {
      const data = res.data.vendors.map((i) => {
        return { label: i.companyName, value: i.companyName };
      });
      setVendorOpt(data);
    });
    axios.get(`${apiPath.prodPath}/api/POStatus`).then((res) => {
      const data = res.data.POStatus.map((i) => {
        return { label: i.name, value: i.name };
      });
      setPOStatusOpt(data);
    });
    if (edit) {
      setVendor(
        editData.vendor == "" || editData.vendor == undefined
          ? ""
          : { label: editData.vendor, value: editData.vendor }
      );
      setPurchaseType(editData.purchaseType);
      setVendorSales(editData.vendorSales);
      setPO(editData.PO);
      setPurchaseStatus({
        label: editData.purchaseStatus,
        value: editData.purchaseStatus,
      });
      setNotes(editData.notes);
    }
  }, [open]);
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      purchaseType,
      vendor: vendor.value,
      vendorSales,
      PO,
      purchaseStatus: purchaseStatus.value,
      notes,
    };
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/purchaseOrder/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addPurchaseOrders(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setVendor("");
    setVendorSales("");
    setPurchaseType("");
    setPO("");
    setPurchaseStatus("");
    setNotes("");
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleAdd}>
          <div className="input-wrap">
            <label>JS PO</label>
            <input
              type="text"
              value={PO}
              onChange={(e) => setPO(e.target.value)}
              disabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>Vendor</label>
            <Select
              options={vendorOpt}
              onChange={(v) => setVendor(v)}
              value={vendor}
            />
          </div>
          <div className="input-wrap">
            <label>Vendor Sales</label>
            <input
              type="text"
              value={vendorSales}
              onChange={(e) => setVendorSales(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Purchase Type</label>
            <input
              type="text"
              value={purchaseType}
              onChange={(e) => setPurchaseType(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>PO Status</label>
            <Select
              options={POStatusOpt}
              onChange={(v) => setPurchaseStatus(v)}
              value={purchaseStatus}
            />
          </div>
          <div className="input-wrap">
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Purchasing Order" : "Add Purchasing Order"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default PurchaseOrdersDrawer;
