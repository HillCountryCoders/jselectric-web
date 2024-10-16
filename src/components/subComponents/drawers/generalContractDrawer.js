import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import "./style.scss";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function GeneralContractDrawer({
  refreshData,
  open,
  addGeneralContract,
  onClose,
  edit,
  editData,
  id,
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
  });
  useEffect(() => {
    if (edit) {
      setFormData({
        companyName: editData.companyName,
        contact: editData.contact,
        address: editData.address,
        city: editData.city,
        state: editData.state,
        zipCode: editData.zipCode,
        phone: editData.phone,
        email: editData.email,
        website: editData.website,
      });
    }
  }, [open]);
  const handleAdd = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/generalContract/${id}`, formData)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Unable to edit data",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `${apiPath.prodPath}/api/generalContract/addGeneralContract`,
          formData
        )
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Unable to add data",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      companyName: "",
      contact: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      website: "",
    });
  };
  const handleTextData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
            <label>Company Name</label>
            <input
              name="companyName"
              type="text"
              onChange={handleTextData}
              value={formData.companyName}
            />
          </div>
          <div className="input-wrap">
            <label>Contact</label>
            <input
              name="contact"
              type="text"
              onChange={handleTextData}
              value={formData.contact}
            />
          </div>
          <div className="input-wrap">
            <label>Address</label>
            <input
              name="address"
              type="text"
              onChange={handleTextData}
              value={formData.address}
            />
          </div>
          <div className="input-wrap">
            <label>City</label>
            <input
              name="city"
              type="text"
              onChange={handleTextData}
              value={formData.city}
            />
          </div>
          <div className="input-wrap">
            <label>State</label>
            <input
              name="state"
              type="text"
              onChange={handleTextData}
              value={formData.state}
            />
          </div>
          <div className="input-wrap">
            <label>ZipCode</label>
            <input
              name="zipCode"
              type="text"
              onChange={handleTextData}
              value={formData.zipCode}
            />
          </div>
          <div className="input-wrap">
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              onChange={handleTextData}
              value={formData.phone}
            />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input
              name="email"
              type="email"
              onChange={handleTextData}
              value={formData.email}
            />
          </div>
          <div className="input-wrap">
            <label>Website</label>
            <input
              name="website"
              type="text"
              onChange={handleTextData}
              value={formData.website}
            />
          </div>
          <div className="sub-btn-wrap">
            <input type="submit" value={edit ? "Edit" : "Add"} />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default GeneralContractDrawer;
