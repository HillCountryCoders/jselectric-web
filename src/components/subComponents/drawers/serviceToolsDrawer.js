import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

function ServiceToolsDrawer({
  open,
  onClose,
  addTool,
  editTool,
  id,
  edit,
  data,
}) {
  const currentUser = useSelector((state) => state.user.user);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techAssigned, setTechAssigned] = useState("");
  const [location, setLocation] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  // const [allSubCatOpt, setAllSubCatOpt] = useState("");
  const [techAssignOpt, setTechAssignOpt] = useState("");
  const [subCatOpt, setSubCatOpt] = useState("");
  const [filteredCatOpt, setFilteredCatOpt] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const [lastPurchasePrice, setLastPurchasePrice] = useState("");
  const [pictureUpload, setPictureUpload] = useState("");
  const [toolNumber, setToolNumber] = useState("");
  const [serial, setSerial] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [oldFile, setOldFile] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyExpDate, setWarrantyExpDate] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/toolCategory/`)
      .then((res) => {
        console.log(res);
        const mapped = res.data.toolCategory.map((i) => ({
          label: i.name,
          value: i.name,
        }));
        const filteredMap = mapped.filter((i) => i.label !== "");
        setCategoryOpt(
          filteredMap.sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/subtoolCategory/`)
      .then((res) => {
        if (edit) {
          const dataObj =
            res.data &&
            res.data.subtoolCategorys &&
            res.data.subtoolCategorys
              .map((i) => ({
                label: i.name,
                value: i.name,
                parentCategory: i.parentCategory,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
              .filter((i) => i.parentCategory == data.category);
          setFilteredCatOpt(dataObj);
        } else {
          const data =
            res.data &&
            res.data.subtoolCategorys &&
            res.data.subtoolCategorys
              .map((i) => ({
                label: i.name,
                value: i.name,
                parentCategory: i.parentCategory,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
          setSubCatOpt(data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setTechAssignOpt(
          res.data.allUsers
            .map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
          // .filter((i) => i.userType == "foreman")
        );
      })
      .catch((err) => console.log(err));
    setEmployee({
      label:
        currentUser && currentUser.userInfo && currentUser.userInfo.fullname,
      value:
        currentUser && currentUser.userInfo && currentUser.userInfo.fullname,
    });
    if (edit) {
      setCategory({ label: data.category, value: data.category });
      setDescription(data.description);
      setStatus({ label: data.status, value: data.status });
      setTechAssigned({ label: data.techAssigned, value: data.techAssigned });
      setLocation(data.location);
      setSubCategory({ label: data.subCategory, value: data.subCategory });
      setEmployee({ label: data.employee, value: data.employee });
      setProject(data.project);
      setPictureUpload(data.picture !== undefined ? data.picture : undefined);
      setOldFile(data.picture !== undefined ? data.picture : undefined);
      setToolNumber(data.toolNumber);
      setPurchaseDate(
        data.purchaseDate == undefined || data.purchaseDate == "undefined"
          ? ""
          : data.purchaseDate
      );
      setWarrantyExpDate(
        data.warrantyExpDate == undefined || data.warrantyExpDate == "undefined"
          ? ""
          : data.warrantyExpDate
      );
      setSerial(data.serial);
      setLastPurchasePrice(data.lastPurchasePrice);
    }
  }, [open]);

  const handleAddTool = (e) => {
    e.preventDefault();
    if (pictureUpload == "" || pictureUpload == undefined) {
      Swal.fire({
        icon: "warning",
        text: "Are you sure you want to save without a picture?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (edit) {
            const formData = new FormData();
            formData.append("toolNumber", toolNumber);
            formData.append("category", category.value);
            formData.append("description", description);
            formData.append("techAssigned", techAssigned.value);
            formData.append("location", location);
            formData.append("subCategory", subCategory.value);
            formData.append("employee", employee.value);
            formData.append("project", project);
            formData.append("lastPurchasePrice", lastPurchasePrice);
            formData.append("purchaseDate", purchaseDate);
            formData.append("warrantyExpDate", warrantyExpDate);
            formData.append("status", status.value);
            formData.append("editFlag", "true");
            if (newFileFlag) {
              formData.append("files", pictureUpload);
              formData.append(
                "oldFiles",
                oldFile == undefined ? undefined : JSON.stringify(oldFile)
              );
            } else {
              formData.append(
                "pictureObj",
                pictureUpload == undefined
                  ? undefined
                  : JSON.stringify(pictureUpload)
              );
            }
            formData.append("serial", serial);
            formData.append("newFileFlag", newFileFlag);
            editTool(formData, id);
          } else {
            const formData = new FormData();
            formData.append("toolNumber", toolNumber);
            formData.append("category", category.value);
            formData.append("description", description);
            formData.append("status", status.value);
            formData.append("techAssigned", techAssigned.value);
            formData.append("location", location);
            formData.append("subCategory", subCategory.value);
            formData.append("employee", employee.value);
            formData.append("project", project);
            formData.append("lastPurchasePrice", lastPurchasePrice);
            formData.append("purchaseDate", purchaseDate);
            formData.append("warrantyExpDate", warrantyExpDate);
            formData.append("files", pictureUpload);
            formData.append("serial", serial);
            formData.append("newFileFlag", newFileFlag);
            addTool(formData, dataEntryRefresh);
          }
        }
      });
    } else {
      if (edit) {
        const formData = new FormData();
        formData.append("toolNumber", toolNumber);
        formData.append("category", category.value);
        formData.append("description", description);
        formData.append("techAssigned", techAssigned.value);
        formData.append("status", status.value);
        formData.append("location", location);
        formData.append("subCategory", subCategory.value);
        formData.append("employee", employee.value);
        formData.append("project", project);
        formData.append("lastPurchasePrice", lastPurchasePrice);
        formData.append("warrantyExpDate", warrantyExpDate);
        formData.append("purchaseDate", purchaseDate);
        formData.append("editFlag", "true");
        if (newFileFlag) {
          formData.append("files", pictureUpload);
          formData.append(
            "oldFiles",
            oldFile == undefined ? undefined : JSON.stringify(oldFile)
          );
        } else {
          formData.append(
            "pictureObj",
            pictureUpload == undefined
              ? undefined
              : JSON.stringify(pictureUpload)
          );
        }
        formData.append("serial", serial);
        formData.append("newFileFlag", newFileFlag);
        editTool(formData, id);
      } else {
        const formData = new FormData();
        formData.append("toolNumber", toolNumber);
        formData.append("category", category.value);
        formData.append("description", description);
        formData.append("techAssigned", techAssigned.value);
        formData.append("location", location);
        formData.append("subCategory", subCategory.value);
        formData.append("employee", employee.value);
        formData.append("project", project);
        formData.append("lastPurchasePrice", lastPurchasePrice);
        formData.append("purchaseDate", purchaseDate);
        formData.append("warrantyExpDate", warrantyExpDate);
        formData.append("files", pictureUpload);
        formData.append("serial", serial);
        formData.append("status", status.value);
        formData.append("newFileFlag", newFileFlag);
        addTool(formData, dataEntryRefresh);
      }
    }
  };
  const dataEntryRefresh = () => {
    setCategory("");
    setDescription("");
    setTechAssigned("");
    setLocation("");
    setEmployee("");
    setLastPurchasePrice("");
    setSubCategory("");
    setPictureUpload("");
    setToolNumber("");
    setProject("");
    setSerial("");
    setPurchaseDate("");
    setWarrantyExpDate("");
    setStatus("");
  };
  const categoryHandler = (e) => {
    setSubCategory("");
    setCategory(e);

    let filteredSubOpt;

    filteredSubOpt = subCatOpt.filter((i) => i.parentCategory == e.value);

    setFilteredCatOpt(filteredSubOpt);
  };
  const techAssignedHandler = (e) => {
    setTechAssigned(e);
  };
  const handleUpload = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setPictureUpload(e.target.files[0]);
    } else {
      setPictureUpload(e.target.files[0]);
    }
  };
  const handleDigitCheck = (e) => {
    if (e.target.value.length <= 6) {
      setToolNumber(e.target.value);
    }
  };
  console.log("####", categoryOpt);
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
        <form onSubmit={handleAddTool}>
          <div className="input-wrap">
            <label>Tool #</label>
            <input
              value={toolNumber}
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={handleDigitCheck}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="tool-select-1"
              value={category}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Tools</label>
            <Select
              id="tool-select-2"
              options={filteredCatOpt}
              onChange={(e) => setSubCategory(e)}
              value={subCategory}
              required={true}
              isDisabled={category.value == undefined ? true : false}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <input
              value={description}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Tech Assigned</label>
            <Select
              options={techAssignOpt}
              onChange={techAssignedHandler}
              id="tool-select-3"
              value={techAssigned}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Location</label>
            <input
              value={location}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Employee</label>
            <Select
              options={techAssignOpt}
              onChange={(e) => setEmployee(e)}
              value={employee}
              isDisabled={true}
              id="tool-select-4"
            />
          </div>
          <div className="input-wrap">
            <label>Status</label>
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive-Broken", value: "Inactive-Broken" },
              ]}
              onChange={(e) => setStatus(e)}
              value={status}
              id="tool-select-5"
            />
          </div>
          <div className="input-wrap">
            <label>Projects</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setProject(e.target.value)}
              value={project}
            />
          </div>
          <div className="input-wrap">
            <label>Serial #</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setSerial(e.target.value)}
              value={serial}
            />
          </div>
          <div className="input-wrap">
            <label>Purchase Date</label>
            {/* <DatePicker
              id="datePicker-1"
              value={purchaseDate}
              onChange={(value) => setPurchaseDate(value)}
              locale={"en-US"}
            /> */}
            <DatePicker
              selected={purchaseDate}
              onChange={(value) => setPurchaseDate(value)}
            />
            {purchaseDate !== "" ? (
              <p onClick={() => setPurchaseDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Last Purchase Price</label>
            <input
              className={`${poppins.className} input-cus`}
              type="number"
              onChange={(e) => setLastPurchasePrice(e.target.value)}
              value={lastPurchasePrice}
            />
          </div>
          <div className="input-wrap">
            <label>Warranty Exp Date</label>
            {/* <DatePicker
              id="datePicker-1"
              value={warrantyExpDate}
              onChange={(value) => setWarrantyExpDate(value)}
              locale={"en-US"}
            /> */}
            <DatePicker
              selected={warrantyExpDate}
              onChange={(value) => setWarrantyExpDate(value)}
            />
            {warrantyExpDate !== "" ? (
              <p onClick={() => setWarrantyExpDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Picture</label>
            <input
              name="files"
              className={`${poppins.className} input-cus`}
              type="file"
              onChange={handleUpload}
              accept="image/png,image/jpeg"
            />
            {edit && pictureUpload !== undefined ? (
              <img src={pictureUpload.fileUrl} style={{ width: "30%" }} />
            ) : null}
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Tools" : "Add Tools"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ServiceToolsDrawer;
