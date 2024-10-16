import "./style.scss";
import React, { useState, useEffect, use } from "react";
import { Select, DatePicker } from "react-rainbow-components";
import { Poppins } from "next/font/google";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function AddBadge({ addBadgeFunc, editFlag, dataToBeEdited }) {
  const [AISD, setAISD] = useState({ label: "", value: "" });
  const [AISDExpDate, setAISDExpDate] = useState("");
  const [COAWaterDep, setCOAWaterDep] = useState({ label: "", value: "" });
  const [COAWaterDepExpDate, setCOAWaterDepExpDate] = useState("");
  const [TFC, setTFC] = useState({ label: "", value: "" });
  const [TFCExpDate, setTFCExpDate] = useState("");
  const [ABIA, setABIA] = useState({ label: "", value: "" });
  const [ABIAExpDate, setABIAExpDate] = useState("");
  const dropdownOpt = [
    { label: "", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  useEffect(() => {
    if (editFlag) {
      setAISD(dataToBeEdited.AISD);
      setAISDExpDate(dataToBeEdited.AISDExpDate);
      setCOAWaterDep(dataToBeEdited.COAWaterDep);
      setCOAWaterDepExpDate(dataToBeEdited.COAWaterDepExpDate);
      setTFC(dataToBeEdited.TFC);
      setTFCExpDate(dataToBeEdited.TFCExpDate);
      setABIA(dataToBeEdited.ABIA);
      setABIAExpDate(dataToBeEdited.ABIAExpDate);
    }
  }, []);
  const addBadge = () => {
    const data = {
      AISD,
      AISDExpDate: AISDExpDate == undefined ? "" : AISDExpDate,
      COAWaterDep,
      COAWaterDepExpDate:
        COAWaterDepExpDate == undefined ? "" : COAWaterDepExpDate,
      TFC,
      TFCExpDate: TFCExpDate == undefined ? "" : TFCExpDate,
      ABIA,
      ABIAExpDate: ABIAExpDate == undefined ? "" : ABIAExpDate,
    };
    addBadgeFunc(data, editFlag);
  };
  return (
    <div className={`input-wraps`}>
      <div className="single-inp">
        <label>AISD</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setAISD(e.target.value)}
          id="example-select-1"
          value={AISD}
        />
      </div>
      <div className="single-inp">
        <label>AISD Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={AISDExpDate}
          onChange={(value) => setAISDExpDate(value)}
          locale={"en-US"}
        />
        {AISDExpDate !== "" ? (
          <p onClick={() => setAISDExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="single-inp">
        <label>COA Water Dept</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setCOAWaterDep(e.target.value)}
          id="example-select-2"
          value={COAWaterDep}
        />
      </div>
      <div className="single-inp">
        <label>COA Water Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={COAWaterDepExpDate}
          onChange={(value) => setCOAWaterDepExpDate(value)}
          locale={"en-US"}
        />
        {COAWaterDepExpDate !== "" ? (
          <p onClick={() => setCOAWaterDepExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="single-inp">
        <label>TFC</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setTFC(e.target.value)}
          id="example-select-3"
          value={TFC}
        />
      </div>
      <div className="single-inp">
        <label>TFC Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={TFCExpDate}
          onChange={(value) => setTFCExpDate(value)}
          locale={"en-US"}
        />
        {TFCExpDate !== "" ? (
          <p onClick={() => setTFCExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="single-inp">
        <label>ABIA</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setABIA(e.target.value)}
          id="example-select-5"
          value={ABIA}
        />
      </div>
      <div className="single-inp">
        <label>ABIA Exp Date</label>
        <DatePicker
          id="datePicker-1"
          value={ABIAExpDate}
          onChange={(value) => setABIAExpDate(value)}
          locale={"en-US"}
        />
        {ABIAExpDate !== "" ? (
          <p onClick={() => setABIAExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="single-inp">
        <button onClick={addBadge}>Save</button>
      </div>
    </div>
  );
}

export default AddBadge;
