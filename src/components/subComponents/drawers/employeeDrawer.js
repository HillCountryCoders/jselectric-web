import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function EmployeeDrawer({ open, onClose, addEmp, editEmp, id, edit, data }) {
  const [userType, setUserType] = useState("");
  const [position, setPosition] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [tablet, setTablet] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userTypeOpt, setUserTypeOpt] = useState("");
  const [positionOpt, setPositionOpt] = useState("");
  const [userStatus, setUserStatus] = useState({
    label: "Active",
    value: "Active",
  });
  const dropdown = [
    { label: "", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/userType/`)
      .then((res) => {
        setUserTypeOpt(
          res.data.userTypes.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/position/`)
      .then((res) => {
        setPositionOpt(
          res.data.positions.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setUserType({ label: data.userType, value: data.userType });
      setPosition({ label: data.position, value: data.position });
      setVehicle({ label: data.vehicle, value: data.vehicle });
      setTablet({ label: data.tablet, value: data.tablet });
      setUserStatus({ label: data.userStatus, value: data.userStatus });
      setCity(data.city);
      setFullname(data.fullname);
      setEmail(data.email);
      setPersonalPhone(data.personalPhone);
      setCompanyPhone(data.companyPhone);
      setUsername(data.username);
      setPassword(data.password);
      setPrimaryAddress(
        data.primaryAddress && data.primaryAddress !== undefined
          ? data.primaryAddress
          : ""
      );
      setSecondaryAddress(
        data.secondaryAddress && data.secondaryAddress !== undefined
          ? data.secondaryAddress
          : ""
      );
      setStateValue(data.state && data.state !== undefined ? data.state : "");
      setZipcode(
        data.zipcode && data.zipcode !== undefined ? data.zipcode : ""
      );
      setCreditCard(data.creditCard);
    }
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const dataObj = {
      userType: userType.value,
      position: position.value,
      vehicle: vehicle.value,
      tablet: tablet.value,
      city,
      fullname,
      creditCard,
      email,
      personalPhone,
      companyPhone,
      username,
      password,
      primaryAddress,
      secondaryAddress,
      state: stateValue,
      zipcode,
      userStatus: userStatus.value,
    };
    if (edit) {
      editEmp(dataObj, id);
    } else {
      addEmp(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setUserType("");
    setPosition("");
    setVehicle("");
    setTablet("");
    setCity("");
    setFullname("");
    setEmail("");
    setPersonalPhone("");
    setCompanyPhone("");
    setUsername("");
    setCreditCard("");
    setPassword("");
    setPrimaryAddress("");
    setSecondaryAddress("");
    setStateValue("");
    setZipcode("");
    setUserStatus("");
  };
  const statusOpt = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const userTypeHandler = (e) => {
    setUserType(e);
  };
  const positionHandler = (e) => {
    setPosition(e);
  };
  const vehicleHandler = (e) => {
    setVehicle(e);
  };
  const tabletHandler = (e) => {
    setTablet(e);
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
        <form onSubmit={handleAddEmployee}>
          <div className="input-wrap">
            <label>User Type</label>
            <Select
              options={userTypeOpt}
              onChange={userTypeHandler}
              id="example-select-1"
              value={userType}
            />
          </div>
          <div className="input-wrap">
            <label>User Status</label>
            <Select
              options={statusOpt}
              onChange={(v) => setUserStatus(v)}
              id="example-select-2"
              value={userStatus}
            />
          </div>
          <div className="input-wrap">
            <label>Position</label>
            <Select
              options={positionOpt}
              onChange={positionHandler}
              id="example-select-3"
              value={position}
            />
          </div>
          <div className="input-wrap">
            <label>Vehicle</label>
            <Select
              options={dropdown}
              onChange={vehicleHandler}
              id="example-select-4"
              value={vehicle}
            />
          </div>
          <div className="input-wrap">
            <label>Tablet</label>
            <Select
              options={dropdown}
              onChange={tabletHandler}
              id="example-select-5"
              value={tablet}
            />
          </div>
          <div className="input-wrap">
            <label>Primary Address</label>
            <input
              value={primaryAddress}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPrimaryAddress(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Secondary Address</label>
            <input
              value={secondaryAddress}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setSecondaryAddress(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>City</label>
            <input
              value={city}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>State</label>
            <input
              value={stateValue}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setStateValue(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Zipcode</label>
            <input
              value={zipcode}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Name</label>
            <input
              value={fullname}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setFullname(e.target.value)}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input
              value={email}
              type="email"
              className={`${poppins.className} input-cus`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Personal Phone</label>
            <input
              value={personalPhone}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPersonalPhone(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Company Phone</label>
            <input
              value={companyPhone}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Credit Card</label>
            <input
              value={creditCard}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setCreditCard(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Username</label>
            <input
              value={username}
              required={true}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Password</label>
            <input
              value={password}
              className={`${poppins.className} input-cus`}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>

          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Employee" : "Add Employee"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default EmployeeDrawer;
