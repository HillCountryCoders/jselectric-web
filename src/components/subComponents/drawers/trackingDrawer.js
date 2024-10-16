import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TrackingDrawer({
  open,
  onClose,
  addTracking,
  editTracking,
  id,
  edit,
  data,
}) {
  const [jobNumber, setJobNumber] = useState("");
  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [dateOrdered, setDateOrdered] = useState("");
  const [supplierOpt, setSupplierOpt] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [rep, setRep] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qtyOrdered, setQtyOrdered] = useState("");
  const [qtyReceived, setQtyReceived] = useState("");
  const [estShippedDate, setEstShippedDate] = useState("");
  const [shippedDate, setShippedDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [receiverOpt, setReceiverOpt] = useState("");
  const [receiver, setReceiver] = useState("");
  const [locationStorageIdOpt, setLocationStorageIdOpt] = useState("");
  const [locationBuildingOpt, setLocationBuildingOpt] = useState("");
  const [currentLocationStorageId, setCurrentLocationStorageId] = useState("");
  const [currentLocationBuilding, setCurrentLocationBuilding] = useState("");
  const [dateSentToJobSite, setDateSentToJobSite] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [backOrderShipping, setBackOrderShipping] = useState(0);
  const [backOrderShippingQty, setBackOrderShippingQty] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [preTaxMaterialCost, setPreTaxMaterialCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/vendor/`).then((res) => {
      const optArr = res.data.vendors.map((i) => {
        return { label: i.name, value: i.name };
      });
      setSupplierOpt(optArr);
    });
    axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      const optArr = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setReceiverOpt(optArr);
    });
    axios.get(`${apiPath.prodPath}/api/storageLocation/`).then((res) => {
      const optArr = res.data.storageLocations.map((i) => {
        return { label: i.storageId, value: i.storageId };
      });
      setLocationStorageIdOpt(optArr);
    });
    axios.get(`${apiPath.prodPath}/api/storageLocation/`).then((res) => {
      const optArr = res.data.storageLocations.map((i) => {
        return { label: i.building, value: i.building };
      });
      setLocationBuildingOpt(optArr);
    });
    if (edit) {
      setJobNumber(data.jobNumber);
      setJobName(data.jobName);
      setLocation(data.location);
      setDateOrdered(
        data.dateOrdered == undefined || data.dateOrdered == ""
          ? ""
          : data.dateOrdered
      );
      setSupplier({ label: data.supplier, value: data.supplier });
      setRep(data.rep);
      setContact(data.contact);
      setEmail(data.email);
      setItemDescription(data.itemDescription);
      setPrice(data.price);
      setQtyOrdered(data.qtyOrdered);
      setQtyReceived(data.qtyReceived);
      setEstShippedDate(
        data.estShippedDate == undefined || data.estShippedDate == ""
          ? ""
          : data.estShippedDate
      );
      setShippedDate(
        data.shippedDate == undefined || data.shippedDate == ""
          ? ""
          : data.shippedDate
      );
      setReceivedDate(
        data.receivedDate == undefined || data.receivedDate == ""
          ? ""
          : data.receivedDate
      );
      setReceiver({ label: data.receiver, value: data.receiver });
      setCurrentLocationBuilding({
        label: data.currentLocationBuilding,
        value: data.currentLocationBuilding,
      });
      setCurrentLocationStorageId({
        label: data.currentLocationStorageId,
        value: data.currentLocationStorageId,
      });
      setDateSentToJobSite(
        data.dateSentToJobSite == undefined || data.dateSentToJobSite == ""
          ? ""
          : data.dateSentToJobSite
      );
      setShippingCost(data.shippingCost);
      setBackOrderShippingQty(data.backOrderShippingQty);
      setBackOrderShipping(data.backOrderShipping);
      setTotalShipping(data.totalShipping);
      setPreTaxMaterialCost(data.preTaxMaterialCost);
      setTotalCost(data.totalCost);
    }
  }, []);

  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      jobNumber,
      jobName,
      location,
      supplier: supplier.value,
      rep,
      dateOrdered,
      contact,
      email,
      itemDescription,
      price,
      qtyOrdered,
      qtyReceived,
      estShippedDate,
      shippedDate,
      receivedDate,
      receiver: receiver.value,
      currentLocationStorageId: currentLocationStorageId.value,
      currentLocationBuilding: currentLocationBuilding.value,
      dateSentToJobSite,
      shippingCost,
      backOrderShippingQty,
      backOrderShipping,
      totalShipping,
      preTaxMaterialCost,
      totalCost,
    };
    if (edit) {
      editTracking(dataObj, id);
    } else {
      addTracking(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setJobNumber("");
    setJobName("");
    setLocation("");
    setSupplier("");
    setRep("");
    setContact("");
    setEmail("");
    setItemDescription("");
    setPrice("");
    setQtyOrdered("");
    setQtyReceived("");
    setEstShippedDate("");
    setShippedDate("");
    setReceivedDate("");
    setReceiver("");
    setCurrentLocationBuilding("");
    setCurrentLocationStorageId("");
    setDateSentToJobSite("");
    setShippingCost("");
    setBackOrderShippingQty("");
    setBackOrderShipping("");
    setTotalShipping("");
    setPreTaxMaterialCost("");
    setTotalCost("");
  };
  const handleShippingCost = (e) => {
    const sum = Number(e.target.value) + Number(backOrderShipping);
    const totalCostSum = sum + Number(preTaxMaterialCost);
    setShippingCost(e.target.value);
    setTotalShipping(sum);
    setTotalCost(totalCostSum);
  };
  const handleBackOrderShipping = (e) => {
    const sum = Number(e.target.value) + Number(shippingCost);
    const totalCostSum = sum + Number(preTaxMaterialCost);
    setBackOrderShipping(e.target.value);
    setTotalShipping(sum);
    setTotalCost(totalCostSum);
  };
  const handlePreTax = (e) => {
    const sum = Number(e.target.value) + Number(totalShipping);
    setPreTaxMaterialCost(e.target.value);
    setTotalCost(sum);
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
        <form onSubmit={handleaddJob}>
          <div className="input-wrap">
            <label>Job Number</label>
            <input
              type="text"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Address/Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Date Ordered</label>
            <DatePicker
              selected={dateOrdered}
              onChange={(date) => setDateOrdered(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Supplier</label>
            <Select
              options={supplierOpt}
              value={supplier}
              onChange={(v) => setSupplier(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Rep</label>
            <input
              type="text"
              value={rep}
              onChange={(e) => setRep(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Item Description</label>
            <input
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Price($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Quantity Ordered</label>
            <input
              type="number"
              value={qtyOrdered}
              onChange={(e) => setQtyOrdered(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Quantity Received</label>
            <input
              type="number"
              value={qtyReceived}
              onChange={(e) => setQtyReceived(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Estimated Shipped Date</label>
            <DatePicker
              selected={estShippedDate}
              onChange={(date) => setEstShippedDate(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Shipped Date</label>
            <DatePicker
              selected={shippedDate}
              onChange={(date) => setShippedDate(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Received Date</label>
            <DatePicker
              selected={receivedDate}
              onChange={(date) => setReceivedDate(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Receiver</label>
            <Select
              options={receiverOpt}
              value={receiver}
              onChange={(v) => setReceiver(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Current Location Storage Id</label>
            <Select
              options={locationStorageIdOpt}
              value={currentLocationStorageId}
              onChange={(v) => setCurrentLocationStorageId(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Current Location Building</label>
            <Select
              options={locationBuildingOpt}
              value={currentLocationBuilding}
              onChange={(v) => setCurrentLocationBuilding(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Date Sent To Job Site</label>
            <DatePicker
              selected={dateSentToJobSite}
              onChange={(date) => setDateSentToJobSite(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Shipping Cost($)</label>
            <input
              type="number"
              value={shippingCost}
              onChange={handleShippingCost}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Back Order Shipping Qty</label>
            <input
              type="number"
              value={backOrderShippingQty}
              onChange={(e) => setBackOrderShippingQty(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Back Order Shipping($)</label>
            <input
              type="number"
              value={backOrderShipping}
              onChange={handleBackOrderShipping}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Total Shipping($)</label>
            <input
              type="number"
              value={totalShipping}
              // onChange={(e) => setTotalShipping(e.target.value)}
              disabled={true}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Pre Tax Material Cost($)</label>
            <input
              type="number"
              value={preTaxMaterialCost}
              onChange={handlePreTax}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Total Cost($)</label>
            <input
              type="number"
              value={totalCost}
              disabled={true}
              className={poppins.className}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Tracking" : "Add Tracking"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TrackingDrawer;
