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
function VendorDrawer({
  open,
  onClose,
  addVendor,
  editVendor,
  id,
  edit,
  data,
}) {
  useEffect(() => {
    if (edit) {
      setName(data.name);
      setCompanyName(data.companyName);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setZipCode(data.zipCode);
      setPrimaryContact(data.primaryContact);
      setPhone(data.phone);
      setEmail(data.email);
      setWebsite(data.website);
    }
  }, []);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      name,
      companyName,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
      primaryContact,
      website,
    };
    if (edit) {
      editVendor(dataObj, id);
    } else {
      addVendor(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setName("");
    setCompanyName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setPrimaryContact("");
    setPhone("");
    setEmail("");
    setWebsite("");
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
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Zipcode</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Primary Contact</label>
            <input
              type="text"
              value={primaryContact}
              onChange={(e) => setPrimaryContact(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <label>website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Vendor" : "Add Vendor"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default VendorDrawer;
