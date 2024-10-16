import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ServiceDrawer({
  open,
  onClose,
  addServices,
  editService,
  id,
  edit,
  data,
  allServices,
  currentUser,
  salesTaxValue,
  loaderOuter,
}) {
  const [to, setTo] = useState("");
  const [toOpt, setToOpt] = useState([]);
  const [dateOfOrder, setDateOfOrder] = useState(new Date());
  const [contactName, setContactName] = useState("");
  const [tel, setTel] = useState("");
  const [orderTakenBy, setOrderTakenBy] = useState(
    currentUser !== null || currentUser !== undefined
      ? currentUser.userInfo.fullname
      : ""
  );
  const [customerOrderNo, setCustomerOrderNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [terms, setTerms] = useState("");
  const [termsOpt, setTermsOpt] = useState("");
  const [description, setDescription] = useState("");
  const [laborArr, setLaborArr] = useState([]);
  const [materialArr, setMaterialArr] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [manualId, setManualId] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  // const [taxStatus, setTaxStatus] = useState("");
  // const [newFileFlag, setNewFileFlag] = useState(false);
  // const [oldFiles, setOldFiles] = useState("");
  // const [fileUpload, setFileUpload] = useState("");

  useEffect(() => {
    console.log("edit flag", edit);
    setClients();
    setTermsOptArr();
    if (edit == false) {
      axios.get(`${apiPath.prodPath}/api/service/`).then((res) => {
        if (res.data.services.length == 0) {
          setTicketId(`${moment(new Date()).format("YYYY")}-1`);
        } else {
          const lastData = res.data.services[res.data.services.length - 1];
          const lastDataTicketID = lastData.ticketId;
          const modifiedTicketId = lastDataTicketID.replace(
            `${moment(new Date()).format("YYYY")}-`,
            ""
          );
          const modifiedCount = Number(modifiedTicketId) + 1;
          setTicketId(`${moment(new Date()).format("YYYY")}-${modifiedCount}`);
        }
      });
    }
    if (edit) {
      console.log("####", data);
      // setFileUpload(
      //   data.attachments !== undefined ? data.attachments : undefined
      // );
      // setOldFiles(
      //   data.attachments !== undefined ? data.attachments : undefined
      // );
      setTicketId(data.ticketId);
      setTicketStatus(
        data.ticketStatus == undefined
          ? ""
          : { label: data.ticketStatus, value: data.ticketStatus }
      );
      // setTaxStatus(
      //   data.taxStatus == undefined
      //     ? ""
      //     : { label: data.taxStatus, value: data.taxStatus }
      // );
      setManualId(data.manualId == undefined ? "" : data.manualId);
      setTo(data.to == undefined ? "" : { label: data.to, value: data.to });
      setDateOfOrder(
        data.dateOfOrder == "" ||
          data.dateOfOrder == "Invalid date" ||
          data.dateOfOrder == undefined
          ? ""
          : new Date(data.dateOfOrder)
      );
      setContactName(data.contactName);
      setTel(data.tel);
      setOrderTakenBy(data.orderTakenBy);
      setCustomerOrderNo(data.customerOrderNo);
      setStartDate(
        data.startDate == "" ||
          data.startDate == "Invalid date" ||
          data.startDate == undefined
          ? ""
          : new Date(data.startDate)
      );
      setJobName(data.jobName);
      setJobLocation(data.jobLocation);
      setInvoiceDate(
        data.invoiceDate == "" ||
          data.invoiceDate == "Invalid date" ||
          data.invoiceDate == undefined
          ? ""
          : new Date(data.invoiceDate)
      );
      setTerms({ label: data.terms, value: data.terms });
      setDescription(data.description);
      setLaborArr(
        data.laborArr == undefined
          ? []
          : data.laborArr.map((i) => {
              i.id = i._id;
              return i;
            })
      );
      setMaterialArr(
        data.materialArr == undefined
          ? []
          : data.materialArr.map((i) => {
              i.id = i._id;
              return i;
            })
      );
    }
  }, [open]);
  const setClients = async () => {
    await axios.get(`${apiPath.prodPath}/api/clients/`).then((res) => {
      const sorted = res.data.clients
        .sort((a, b) => a.customerName.localeCompare(b.customerName))
        .map((i) => {
          return { label: i.customerName, value: i.customerName };
        });
      setToOpt(sorted);
    });
  };
  const setTermsOptArr = async () => {
    await axios.get(`${apiPath.prodPath}/api/term/`).then((res) => {
      const sorted = res.data.terms
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((i) => {
          return { label: i.name, value: i.name };
        });
      setTermsOpt(sorted);
    });
  };
  const handleadd = (e) => {
    e.preventDefault();
    // var subTotal=0;
    var taxCal;
    var subTotalWithTax;
    var subTotalWithTaxL = 0;
    var subTotalWithTaxM = 0;
    // subTotal =
    //   (laborArr.length ? laborArr.reduce((a, s) => a + s.amount, 0) : 0) +
    //   (materialArr.length ? materialArr.reduce((a, s) => a + s.amount, 0) : 0);
    if (laborArr.length) {
      laborArr.forEach((el) => {
        if (el.taxStatus == "Yes") {
          const taxC = (el.amount * salesTaxValue) / 100;
          subTotalWithTaxL = el.amount + taxC + subTotalWithTaxL;
        } else {
          subTotalWithTaxL = subTotalWithTaxL + el.amount;
        }
      });
    }
    if (materialArr.length) {
      materialArr.forEach((el) => {
        if (el.taxStatus == "Yes") {
          const taxC = (el.amount * salesTaxValue) / 100;
          subTotalWithTaxM = el.amount + taxC + subTotalWithTaxM;
        } else {
          subTotalWithTaxM = subTotalWithTaxM + el.amount;
        }
      });
    }
    subTotalWithTax = subTotalWithTaxL + subTotalWithTaxM;
    console.log("subTotal with individual tax", subTotalWithTax);

    if (edit) {
      const formData = new FormData();
      formData.append("ticketId", ticketId);
      formData.append("manualId", manualId);
      formData.append("ticketStatus", ticketStatus.value);
      formData.append("to", to.value);
      formData.append(
        "dateOfOrder",
        dateOfOrder == "" ? "" : moment(dateOfOrder).format("MM/DD/YYYY")
      );
      formData.append("contactName", contactName);
      formData.append("tel", tel);
      formData.append("orderTakenBy", orderTakenBy);
      formData.append("customerOrderNo", customerOrderNo);
      formData.append(
        "startDate",
        startDate == "" ? "" : moment(startDate).format("MM/DD/YYYY")
      );
      formData.append("jobName", jobName);
      formData.append("jobLocation", jobLocation);
      formData.append(
        "invoiceDate",
        invoiceDate == "" ? "" : moment(invoiceDate).format("MM/DD/YYYY")
      );
      formData.append("terms", terms.value);
      formData.append("description", description);
      formData.append("laborArr", JSON.stringify(laborArr));
      formData.append("totalLabor", laborArr.length ? subTotalWithTaxL : 0);
      formData.append("materialArr", JSON.stringify(materialArr));
      formData.append(
        "totalMaterail",
        materialArr.length ? subTotalWithTaxM : 0
      );
      formData.append("total", subTotalWithTax);
      editService(formData);
    } else {
      const formData = new FormData();
      formData.append("ticketId", ticketId);
      formData.append("manualId", manualId);
      formData.append("ticketStatus", ticketStatus.value);
      formData.append("to", to.value);
      formData.append(
        "dateOfOrder",
        dateOfOrder == "" ? "" : moment(dateOfOrder).format("MM/DD/YYYY")
      );
      formData.append("contactName", contactName);
      formData.append("tel", tel);
      formData.append("orderTakenBy", orderTakenBy);
      formData.append("customerOrderNo", customerOrderNo);
      formData.append(
        "startDate",
        startDate == "" ? "" : moment(startDate).format("MM/DD/YYYY")
      );
      formData.append("jobName", jobName);
      formData.append("jobLocation", jobLocation);
      formData.append(
        "invoiceDate",
        invoiceDate == "" ? "" : moment(invoiceDate).format("MM/DD/YYYY")
      );
      formData.append("terms", terms.value);
      formData.append("description", description);
      formData.append("laborArr", JSON.stringify(laborArr));
      formData.append("totalLabor", laborArr.length ? subTotalWithTaxL : 0);
      formData.append("materialArr", JSON.stringify(materialArr));
      formData.append(
        "totalMaterail",
        materialArr.length ? subTotalWithTaxM : 0
      );
      formData.append("total", subTotalWithTax);
      addServices(formData);
    }
  };
  const handleLaborInp = (e, id) => {
    const result = laborArr.map((el) => {
      if (el.id == id) {
        if (el.rate !== "") {
          el.laborHours = e.target.value;
          el.amount = el.laborHours * el.rate;
        } else {
          el.laborHours = e.target.value;
        }
      }
      if (edit) {
        el.amount = el.laborHours * el.rate;
      }
      return el;
    });
    setLaborArr(result);
  };
  const handleUpload = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setFileUpload(e.target.files);
    } else {
      setFileUpload(e.target.files);
    }
  };
  const handleLaborDescInp = (e, id) => {
    console.log("id", id);
    console.log("el", e);
    const result = laborArr.map((el) => {
      if (el.id == id) {
        el.description = e.target.value;
      }
      return el;
    });
    setLaborArr(result);
  };
  const handleTaxLaborStatus = (e, id) => {
    console.log("id", id);
    console.log("el", e);
    const result = laborArr.map((el) => {
      if (el.id == id) {
        el.taxStatus = e.value;
      }
      return el;
    });
    setLaborArr(result);
  };
  const handleMaterialDescInp = (e, id) => {
    console.log("id", id);
    console.log("el", e);
    const result = materialArr.map((el) => {
      if (el.id == id) {
        el.description = e.target.value;
      }
      return el;
    });
    setMaterialArr(result);
  };
  const handleTaxMaterialStatus = (e, id) => {
    console.log("id", id);
    console.log("el", e);
    const result = materialArr.map((el) => {
      if (el.id == id) {
        el.taxStatus = e.value;
      }
      return el;
    });
    setMaterialArr(result);
  };
  const handleHourInp = (e, id) => {
    const result = laborArr.map((el) => {
      if (el.id == id) {
        el.rate = e.target.value;
        el.amount = el.laborHours * el.rate;
      }
      return el;
    });
    setLaborArr(result);
  };
  const handleLaborArr = () => {
    const obj = {
      id: uuidv4(),
      laborHours: "",
      rate: 0,
      amount: 0,
      description: "",
      taxStatus: "",
    };
    setLaborArr((prev) => {
      return [obj, ...prev];
    });
  };
  const handleMaterialInp = (e, id) => {
    const result = materialArr.map((el) => {
      if (el.id == id) {
        if (el.rate !== "") {
          el.materialQuantity = e.target.value;
          el.amount = el.materialQuantity * el.rate;
        } else {
          el.materialQuantity = e.target.value;
        }
      }
      if (edit) {
        el.amount = el.materialQuantity * el.rate;
      }
      return el;
    });
    setMaterialArr(result);
  };
  const handleMaterialHourInp = (e, id) => {
    const result = materialArr.map((el) => {
      if (el.id == id) {
        el.rate = e.target.value;
        el.amount = el.materialQuantity * el.rate;
      }
      return el;
    });
    setMaterialArr(result);
  };
  const handleTicketId = (e) => {
    setTicketId(e.target.value);
  };
  const handleMaterialArr = () => {
    const obj = {
      id: uuidv4(),
      materialQuantity: "",
      rate: 0,
      amount: 0,
      description: "",
      taxStatus: "",
    };
    setMaterialArr((prev) => {
      return [obj, ...prev];
    });
  };
  const handleRemoveEl = (i) => {
    const filteredArr = laborArr.filter((el) => el.id !== i.id);
    setLaborArr(filteredArr);
  };
  const handleMaterialRemoveEl = (i) => {
    const filteredArr = materialArr.filter((el) => el.id !== i.id);
    setMaterialArr(filteredArr);
  };
  const ticketStatusOpt = [
    { label: "Open Ticket", value: "Open Ticket" },
    { label: "Unbilled", value: "Unbilled" },
    { label: "Billed", value: "Billed" },
  ];
  return (
    <Drawer
      anchor={"right"}
      open={open}
      //   onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p
          className="close-modal"
          onClick={() => {
            console.log("clicked in drawer");
            onClose();
          }}
        >
          &#10005;
        </p>
        <form onSubmit={handleadd}>
          <div className="input-wrap">
            <label>Ticket ID</label>
            <input type="text" value={ticketId} onChange={handleTicketId} />
          </div>
          <div className="input-wrap">
            <label>Manual ID</label>
            <input
              type="text"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Ticket Status</label>
            <Select
              id="ser-ticket-1"
              options={ticketStatusOpt}
              onChange={(v) => setTicketStatus(v)}
              value={ticketStatus}
            />
          </div>
          <div className="input-wrap">
            <label>To</label>
            <Select
              id="ser-ticket-2"
              options={toOpt}
              onChange={(v) => setTo(v)}
              value={to}
            />
          </div>
          <div className="input-wrap">
            <label>Date Of Order</label>
            <DatePicker
              id="ser-ticket-3"
              selected={dateOfOrder}
              onChange={(date) => setDateOfOrder(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Contact Name</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Tel#</label>
            <input
              type="text"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Order Taken By</label>
            <input
              type="text"
              value={orderTakenBy}
              disabled={true}
              //   onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Customer Order No</label>
            <input
              type="text"
              value={customerOrderNo}
              onChange={(e) => setCustomerOrderNo(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Start Date</label>
            <DatePicker
              id="ser-ticket-4"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Job Location</label>
            <input
              type="text"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Invoice Date</label>
            <DatePicker
              id="ser-ticket-5"
              selected={invoiceDate}
              onChange={(date) => setInvoiceDate(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Terms</label>
            <Select
              id="ser-ticket-6"
              options={termsOpt}
              onChange={(v) => setTerms(v)}
              value={terms}
            />
          </div>
          <div className="input-wrap">
            <label>Description Of Work</label>
            <textarea
              rows={7}
              cols={5}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="input-wrap">
            <label>Tax Status</label>
            <Select
              id="ser-ticket-7"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(v) => setTaxStatus(v)}
              value={taxStatus}
            />
          </div> */}
          <div className="input-wrap" style={{ width: "100%" }}>
            <p className="cus-labor-btn" onClick={() => handleLaborArr()}>
              &#10011; Labors
            </p>
            <p style={{ marginTop: "10px", fontWeight: "600" }}>
              total labor :${" "}
              {laborArr.length == 0
                ? "0"
                : laborArr.length == 1
                ? laborArr.map((i) => i.amount)
                : laborArr.reduce((a, s) => Number(a) + Number(s.amount), 0)}
            </p>
          </div>
          {laborArr.length
            ? laborArr.map((i) => {
                return (
                  <div key={i.id} className="labor-arr-wrap">
                    <div className="input-wrap">
                      <label>Labors Hours</label>
                      <input
                        type="text"
                        value={i.laborHours}
                        onChange={(e) =>
                          handleLaborInp(e, i.id == undefined ? i._id : i.id)
                        }
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Rate</label>
                      <input
                        type="text"
                        value={i.rate}
                        onChange={(e) =>
                          handleHourInp(e, i.id == undefined ? i._id : i.id)
                        }
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Amount($)</label>
                      <input
                        type="text"
                        value={i.amount}
                        disabled={true}
                        onChange={(e) =>
                          handleAmountInp(e, i.id == undefined ? i._id : i.id)
                        }
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Description</label>
                      <input
                        type="text"
                        value={i.description}
                        onChange={(e) =>
                          handleLaborDescInp(
                            e,
                            i.id == undefined ? i._id : i.id
                          )
                        }
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Tax Status</label>
                      <Select
                        id="ser-ticket-7"
                        options={[
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ]}
                        onChange={(v) =>
                          handleTaxLaborStatus(
                            v,
                            i.id == undefined ? i._id : i.id
                          )
                        }
                        value={{ label: i.taxStatus, value: i.taxStatus }}
                      />
                    </div>
                    {laborArr.length > 0 ? (
                      <span
                        className="minus"
                        style={{ fontSize: "22px" }}
                        onClick={() => handleRemoveEl(i)}
                      >
                        &#9866;
                      </span>
                    ) : null}
                  </div>
                );
              })
            : null}

          <div className="input-wrap" style={{ width: "100%" }}>
            <p className="cus-labor-btn" onClick={() => handleMaterialArr()}>
              &#10011; Materials
            </p>
            <p style={{ marginTop: "10px", fontWeight: "600" }}>
              total Materials :${" "}
              {materialArr.length == 0
                ? "0"
                : materialArr.length == 1
                ? materialArr.map((i) => i.amount)
                : materialArr.reduce((a, s) => Number(a) + Number(s.amount), 0)}
            </p>
          </div>
          {materialArr.length
            ? materialArr.map((i) => {
                return (
                  <div key={i.id} className="labor-arr-wrap">
                    <div className="input-wrap">
                      <label>Materials Quantity</label>
                      <input
                        type="text"
                        value={i.materialQuantity}
                        onChange={(e) => handleMaterialInp(e, i.id)}
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Rate</label>
                      <input
                        type="text"
                        value={i.rate}
                        onChange={(e) => handleMaterialHourInp(e, i.id)}
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Amount($)</label>
                      <input
                        type="text"
                        value={i.amount}
                        disabled={true}
                        onChange={(e) => handleMaterialAmountInp(e, i.id)}
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Description</label>
                      <input
                        type="text"
                        value={i.description}
                        onChange={(e) =>
                          handleMaterialDescInp(
                            e,
                            i.id == undefined ? i._id : i.id
                          )
                        }
                      />
                    </div>
                    <div className="input-wrap">
                      <label>Tax Status</label>
                      <Select
                        id="ser-ticket-7"
                        options={[
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ]}
                        onChange={(v) =>
                          handleTaxMaterialStatus(
                            v,
                            i.id == undefined ? i._id : i.id
                          )
                        }
                        value={{ label: i.taxStatus, value: i.taxStatus }}
                      />
                    </div>

                    {materialArr.length > 0 ? (
                      <span
                        className="minus"
                        style={{ fontSize: "22px" }}
                        onClick={() => handleMaterialRemoveEl(i)}
                      >
                        &#9866;
                      </span>
                    ) : null}
                  </div>
                );
              })
            : null}
          {/* <div className="input-wrap">
            <label>Attachments</label>
            <input
              name="files"
              className={`${poppins.className} input-cus`}
              type="file"
              multiple={true}
              onChange={handleUpload}
              accept="image/png,image/jpeg"
            />
            {edit &&
            fileUpload &&
            fileUpload !== undefined &&
            newFileFlag == false
              ? fileUpload.map((i, ind) => {
                  return <p key={`${i.filename} ${ind}`}>{i.filename}</p>;
                })
              : null}
          </div> */}
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={
                loaderOuter ? "Saving..." : edit ? "Edit Ticket" : "Add Ticket"
              }
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ServiceDrawer;
