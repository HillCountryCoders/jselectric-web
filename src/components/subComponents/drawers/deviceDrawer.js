import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function DeviceDrawer({
  open,
  onClose,
  addDevice,
  editDevice,
  id,
  edit,
  data,
}) {
  const [category, setCategory] = useState("");
  const [billingAccount, setBillingAccount] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [username, setUsername] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  const [make, setMake] = useState("");
  const [upgradeDate, setUpgradeDate] = useState("");
  const [usageLastMonth, setUsageLastMonth] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/deviceCategory`)
      .then((res) => {
        setCategoryOpt(
          res.data.deviceCategory.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    // axios
    //   .get(`${apiPath.prodPath}/api/users/`)
    //   .then((res) => {
    //     setTechAssignOpt(
    //       res.data.allUsers
    //         .filter((i) => i.userType == "foreman")
    //         .map((i) => ({
    //           label: i.fullname,
    //           value: i.fullname,
    //         }))
    //     );
    //   })
    //   .catch((err) => console.log(err));
    if (edit) {
      setCategory({ label: data.category, value: data.category });
      setBillingAccount(data.billingAccount);
      setPhoneNo(data.phoneNo);
      setUsername(data.username);
      setMake(data.make);
      setUpgradeDate(data.upgradeDate);
      setUsageLastMonth(data.usageLastMonth);
    }
  }, []);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }
  const validatePhone = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setPhoneNo(phone);
    }
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      category: category.value,
      billingAccount,
      phoneNo,
      username,
      make,
      upgradeDate: upgradeDate == undefined ? "" : upgradeDate,
      usageLastMonth,
    };
    if (edit) {
      editDevice(dataObj, id);
    } else {
      addDevice(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setCategory("");
    setBillingAccount("");
    setPhoneNo("");
    setUsername("");
    setMake("");
    setUpgradeDate("");
    setUsageLastMonth("");
  };
  const categoryHandler = (e) => {
    setCategory(e);
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
        <form onSubmit={handleAddDevice}>
          <div className="input-wrap">
            <label>Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="example-select-1"
              value={category}
            />
          </div>
          <div className="input-wrap">
            <label>Billing Account</label>
            <input
              value={billingAccount}
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setBillingAccount(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Phone No</label>
            <input
              type="text"
              value={phoneNo}
              className={`${poppins.className} input-cus`}
              onChange={(e) => validatePhone(e.target.value)}
            />
          </div>
          {/* <div className="input-wrap">
            <label>Employee</label>
            <Select
              options={techAssignOpt}
              onChange={(e) => setEmployee(e)}
              value={employee}
            />
          </div> */}
          <div className="input-wrap">
            <label>Username</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input-wrap">
            <label>Make/Model</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setMake(e.target.value)}
              value={make}
            />
          </div>
          <div className="input-wrap">
            <label>Upgrade Date</label>
            <DatePicker
              id="datePicker-1"
              value={upgradeDate}
              onChange={(value) => setUpgradeDate(value)}
              locale={"en-US"}
            />
            {upgradeDate !== "" ? (
              <p onClick={() => setUpgradeDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Usage Last Month</label>
            <input
              className={`${poppins.className} input-cus`}
              type="text"
              onChange={(e) => setUsageLastMonth(e.target.value)}
              value={usageLastMonth}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Device" : "Add Device"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default DeviceDrawer;
