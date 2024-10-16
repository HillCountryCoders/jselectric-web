import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "./style.scss";
function TagoutDrawer({
  open,
  onClose,
  addTagout,
  editTagout,
  id,
  edit,
  editData,
  loggedInUser,
}) {
  const [formData, setFormData] = useState({
    currentDate: new Date(),
    user: loggedInUser.fullname,
    tagNumber: "",
    equipmentName: "",
    equipmentLocation: "",
    name: "",
    phone: "",
    dateApplied: "",
    releasedDate: "",
    releasedInitials: "",
  });
  useEffect(() => {
    if (edit) {
      setFormData({
        currentDate: editData.currentDate,
        user: editData.user,
        tagNumber: editData.tagNumber,
        equipmentName: editData.equipmentName,
        equipmentLocation: editData.equipmentLocation,
        name: editData.name,
        phone: editData.phone,
        dateApplied: editData.dateApplied,
        releasedDate: editData.releasedDate,
        releasedInitials: editData.releasedInitials,
      });
    }
  }, []);
  const handleAddTagout = (e) => {
    e.preventDefault();

    if (edit) {
      editTagout(formData, id);
    } else {
      addTagout(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      currentDate: new Date(),
      user: loggedInUser.fullname,
      tagNumber: "",
      equipmentName: "",
      equipmentLocation: "",
      name: "",
      phone: "",
      dateApplied: "",
      releasedDate: "",
      releasedInitials: "",
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
        <form onSubmit={handleAddTagout}>
          <div className="input-wrap">
            <label>Current Date</label>
            <DatePicker
              name="currentDate"
              value={formData.currentDate}
              disabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>User</label>
            <input name="user" value={formData.user} disabled={true} />
          </div>
          <div className="input-wrap">
            <label>Tag Number</label>
            <input
              name="tagNumber"
              value={formData.tagNumber}
              onChange={handleTextData}
            />
          </div>
          <div className="input-wrap">
            <label>Equipment Name</label>
            <input
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleTextData}
            />
          </div>
          <div className="input-wrap">
            <label>Equipment Location</label>
            <input
              name="equipmentLocation"
              value={formData.equipmentLocation}
              onChange={handleTextData}
            />
          </div>
          <div className="input-wrap">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleTextData}
            />
          </div>
          <div className="input-wrap">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleTextData}
            />
          </div>
          <div className="input-wrap">
            <label>Date Applied</label>
            <DatePicker
              name="dateApplied"
              value={formData.dateApplied}
              onChange={(date) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    dateApplied: date,
                  };
                })
              }
            />
          </div>
          <div className="input-wrap">
            <label>Date Released</label>
            <DatePicker
              name="releasedDate"
              value={formData.releasedDate}
              onChange={(date) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    releasedDate: date,
                  };
                })
              }
            />
          </div>
          <div className="input-wrap">
            <label>Released Initials</label>
            <input
              name="releasedInitials"
              value={formData.releasedInitials}
              onChange={handleTextData}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Tagout" : "Add Tagout"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TagoutDrawer;
