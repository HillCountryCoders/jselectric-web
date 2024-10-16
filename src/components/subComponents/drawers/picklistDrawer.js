import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import Select from "react-select";

import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function PicklistDrawer({
  open,
  onClose,
  picklistName,
  addPicklist,
  editPicklist,
  id,
  edit,
  data,
}) {
  const [name, setName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [parentCategoryOpt, setParentCategoryOpt] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [picklistValue, setPicklistValue] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (picklistName == "Tool Sub-Category") {
      axios
        .get(`${apiPath.prodPath}/api/toolCategory`)
        .then((res) => {
          if (res.data && res.data.toolCategory)
            setParentCategoryOpt(
              res.data.toolCategory.map((i) => ({
                label: i.name,
                value: i.name,
              }))
            );
        })
        .catch((err) => console.log(err));
    }
    if (picklistName == "Storage Id") {
      axios
        .get(`${apiPath.prodPath}/api/building`)
        .then((res) => {
          if (res.data && res.data.buildings)
            setParentCategoryOpt(
              res.data.buildings.map((i) => ({
                label: i.name,
                value: i.name,
              }))
            );
        })
        .catch((err) => console.log(err));
    }
    if (edit) {
      if (
        picklistName == "Customer Type" ||
        picklistName == "Material Level" ||
        picklistName == "Labor Level" ||
        picklistName == "Salesperson Code"
      ) {
        setPicklistValue(
          picklistName == "Material Level"
            ? data.materialLevel
            : picklistName == "Customer Type"
            ? data.customerType
            : picklistName == "Labor Level"
            ? data.laborLevel
            : picklistName == "Salesperson Code"
            ? data.salesPersonCode
            : ""
        );
      }
      if (picklistName == "Customer Term") {
        setDays(data.days);
        setDescription(data.description);
      }
      if (picklistName == "Tool Sub-Category" || picklistName == "Storage Id") {
        setName(data.name);
        setParentCategory({
          label: data.parentCategory,
          value: data.parentCategory,
        });
      } else {
        setName(data.name);
        setShortCode(data.shortCode);
      }
    }
  }, []);

  const handleAddPicklist = (e) => {
    e.preventDefault();
    let dataObj;
    if (picklistName == "Customer Term") {
      dataObj = {
        days,
        description,
      };
    } else if (
      picklistName == "Tool Sub-Category" ||
      picklistName == "Storage Id"
    ) {
      dataObj = {
        name,
        parentCategory: parentCategory.value,
      };
    } else if (picklistName == "Customer Type") {
      dataObj = {
        customerType: picklistValue,
      };
    } else if (picklistName == "Material Level") {
      dataObj = {
        materialLevel: picklistValue,
      };
    } else if (picklistName == "Labor Level") {
      dataObj = {
        laborLevel: picklistValue,
      };
    } else if (picklistName == "Salesperson Code") {
      dataObj = {
        salesPersonCode: picklistValue,
      };
    } else {
      dataObj = {
        name,
        shortCode,
      };
    }
    if (edit) {
      editPicklist(dataObj, id);
    } else {
      addPicklist(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setName("");
    setShortCode("");
    setPicklistValue("");
    setDays("");
    setDescription("");
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
        {picklistName == "Customer Type" ||
        picklistName == "Material Level" ||
        picklistName == "Labor Level" ||
        picklistName == "Salesperson Code" ? (
          <form onSubmit={handleAddPicklist}>
            <div className="input-wrap">
              <label>{picklistName}</label>
              <input
                value={picklistValue}
                className={`${poppins.className} input-cus`}
                onChange={(e) => setPicklistValue(e.target.value)}
                required={true}
              />
            </div>
            <div className="sub-btn-wrap">
              <input
                className={`${poppins.className} addEmp`}
                type="submit"
                value={edit ? `Edit ${picklistName}` : `Add ${picklistName}`}
              />
            </div>
          </form>
        ) : picklistName == "Customer Term" ? (
          <form onSubmit={handleAddPicklist}>
            <div className="input-wrap">
              <label>Days</label>
              <input
                value={days}
                className={`${poppins.className} input-cus`}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            <div className="input-wrap">
              <label>Description</label>
              <input
                value={description}
                className={`${poppins.className} input-cus`}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
            </div>
            <div className="sub-btn-wrap">
              <input
                className={`${poppins.className} addEmp`}
                type="submit"
                value={edit ? `Edit ${picklistName}` : `Add ${picklistName}`}
              />
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddPicklist}>
            <div className="input-wrap">
              <label>Name</label>
              <input
                value={name}
                className={`${poppins.className} input-cus`}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {picklistName == "Tool Sub-Category" ||
            picklistName == "Storage Id" ? (
              <div className="input-wrap">
                <label>Parent Category</label>
                <Select
                  value={parentCategory}
                  className={`${poppins.className}`}
                  onChange={(e) => setParentCategory(e)}
                  required={true}
                  options={parentCategoryOpt}
                />
              </div>
            ) : (
              <div className="input-wrap">
                <label>Shortcode</label>
                <input
                  value={shortCode}
                  className={`${poppins.className} input-cus`}
                  onChange={(e) => setShortCode(e.target.value)}
                  required={true}
                />
              </div>
            )}
            <div className="sub-btn-wrap">
              <input
                className={`${poppins.className} addEmp`}
                type="submit"
                value={edit ? `Edit ${picklistName}` : `Add ${picklistName}`}
              />
            </div>
          </form>
        )}
      </div>
    </Drawer>
  );
}

export default PicklistDrawer;
