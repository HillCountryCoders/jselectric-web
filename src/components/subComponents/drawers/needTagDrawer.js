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
function NeedTagDrawer({ refreshData, open, user, onClose, edit, editData }) {
  const [formData, setFormData] = useState({
    user: user == null ? "" : user.fullname,
    currentDate: moment(new Date()).format("MM/DD/YYYY"),
    category: "",
    subCategory: "",
    description: "",
    location: "",
    serial: "",
  });
  const [fileUpload, setFileUpload] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [oldFile, setOldFile] = useState("");
  useEffect(() => {
    if (edit) {
      setFormData({
        user: user == null ? "" : user.fullname,
        currentDate: moment(new Date()).format("MM/DD/YYYY"),
        category: editData.category,
        subCategory: editData.subCategory,
        description: editData.description,
        location: editData.location,
        serial: editData.serial,
      });
      setFileUpload(
        editData.picture !== undefined ? editData.picture : undefined
      );
      setOldFile(editData.picture !== undefined ? editData.picture : undefined);
    }
  }, [open]);
  const handleAddTagout = (e) => {
    e.preventDefault();
    if (edit) {
      const formDataObj = new FormData();
      formDataObj.append("user", formData.user);
      formDataObj.append("currentDate", formData.currentDate);
      formDataObj.append("category", formData.category);
      formDataObj.append("subCategory", formData.subCategory);
      formDataObj.append("description", formData.description);
      formDataObj.append("location", formData.location);
      formDataObj.append("serial", formData.serial);
      formDataObj.append("files", fileUpload);
      formDataObj.append("editFlag", "true");
      if (newFileFlag) {
        formDataObj.append("files", fileUpload);
        formDataObj.append(
          "oldFiles",
          oldFile == undefined ? undefined : JSON.stringify(oldFile)
        );
      } else {
        formDataObj.append(
          "pictureObj",
          fileUpload == undefined ? undefined : JSON.stringify(fileUpload)
        );
      }
      formDataObj.append("newFileFlag", newFileFlag);
      axios
        .patch(`${apiPath.prodPath}/api/needTag/${editData._id}`, formDataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Uneable to edit data",
            });
          }
          if (res.data.error == false) {
            Swal.fire({
              icon: "success",
              text: "Editted Successfully",
            });
            refreshData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      const formDataObj = new FormData();
      formDataObj.append("user", formData.user);
      formDataObj.append("currentDate", formData.currentDate);
      formDataObj.append("category", formData.category);
      formDataObj.append("subCategory", formData.subCategory);
      formDataObj.append("description", formData.description);
      formDataObj.append("location", formData.location);
      formDataObj.append("serial", formData.serial);
      formDataObj.append("files", fileUpload);
      axios
        .post(`${apiPath.prodPath}/api/needTag/addNeedTag`, formDataObj)
        .then((res) => {
          if (res.data.error == false) {
            Swal.fire({ icon: "success", text: "Added Successfully" });
          } else if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              text: "Unanble to add Need Track data",
            });
          }
          if (res.data.error == false) {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        });
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      user: "",
      currentDate: "",
      category: "",
      subCategory: "",
      description: "",
      location: "",
      serial: "",
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
  const handleFile = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setFileUpload(e.target.files[0]);
    } else {
      setFileUpload(e.target.files[0]);
    }
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
            <input
              name="currentDate"
              type="text"
              onChange={handleTextData}
              disabled={true}
              value={formData.currentDate}
            />
          </div>
          <div className="input-wrap">
            <label>User</label>
            <input
              name="user"
              type="text"
              onChange={handleTextData}
              disabled={true}
              value={formData.user}
            />
          </div>
          <div className="input-wrap">
            <label>Category</label>
            <input
              name="category"
              type="text"
              onChange={handleTextData}
              value={formData.category}
            />
          </div>
          <div className="input-wrap">
            <label>Sub Category</label>
            <input
              name="subCategory"
              type="text"
              onChange={handleTextData}
              value={formData.subCategory}
            />
          </div>
          <div className="input-wrap">
            <label>Location</label>
            <input
              name="location"
              type="text"
              onChange={handleTextData}
              value={formData.location}
            />
          </div>
          <div className="input-wrap">
            <label>Serial</label>
            <input
              name="serial"
              type="text"
              onChange={handleTextData}
              value={formData.serial}
            />
          </div>
          <div className="input-wrap">
            <label>Picture</label>
            <input
              accept="image/png,image/jpeg"
              name="files"
              type="file"
              onChange={handleFile}
            />
            {edit && fileUpload !== undefined ? (
              <img src={fileUpload.fileUrl} style={{ width: "30%" }} />
            ) : null}
          </div>
          <div className="input-wrap" style={{ width: "100%" }}>
            <label>Description</label>
            <textarea
              className={`${poppins.className}`}
              name="description"
              rows={4}
              cols={4}
              value={formData.description}
              onChange={handleTextData}
            ></textarea>
          </div>
          <div className="sub-btn-wrap">
            <input type="submit" value={edit ? "Edit" : "Add"} />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default NeedTagDrawer;
