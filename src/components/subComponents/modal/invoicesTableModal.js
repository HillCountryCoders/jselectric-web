import Modal from "@mui/material/Modal";
import "./style.scss";
import { Poppins } from "next/font/google";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Select from "react-select";
import PaymentModal from "../modal/paymentModal.js";
import AttachmentModal from "../../picFile/attachmentsModal";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
function InvoicesTableModal({
  openFlag,
  handleClose,
  clientId,
  componentName,
}) {
  const [filteredData, setFilteredData] = useState();
  const [filter, setFilter] = useState([]);
  const [jobId, setJobId] = useState("");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentFlag, setPaymentFlag] = useState(false);
  const [itemObj, setItemObj] = useState("");
  const [innerLoading, setInnerLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [modalFlag, setModalFlag] = useState(false);
  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/clients/`).then((res) => {
      const filteredClient = res.data.clients.find((i) => i.id == clientId);
      const filteredClientInvoices =
        filteredClient == undefined ? [] : filteredClient.invoices;
      setFilteredData(filteredClientInvoices);
    });
  }, [openFlag, innerLoading]);
  const filterOpt = [
    { label: "job id", value: "job id" },
    { label: "invoice", value: "invoice" },
    { label: "amount", value: "amount" },
  ];
  const handlePaymentModal = (item) => {
    setPaymentFlag(!paymentFlag);
    setItemObj(item);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (filter.value == "job id") {
      console.log("####", jobId);
      const filterArr = data.filter((i) => i.jobId == `${jobId}`);
      console.log("here", filterArr);
      setFilteredData(filterArr);
    }
    if (filter.value == "invoice") {
      const filterArr = data.filter((i) => i.invoice == `${invoice}`);
      console.log("here invoice", filterArr);
      setFilteredData(filterArr);
    }
    if (filter.value == "amount") {
      const filterArr = data.filter((i) => i.totalAmount == `${amount}`);
      console.log("here amount", filterArr);
      setFilteredData(filterArr);
    }
  };
  const clearHandler = () => {
    axios.get(`${apiPath.prodPath}/api/clients/`).then((res) => {
      const filteredClient = res.data.clients.find((i) => i.id == clientId);
      const filteredClientInvoices =
        filteredClient == undefined ? [] : filteredClient.invoices;
      setFilteredData(filteredClientInvoices);
    });
    setJobId("");
    setInvoice("");
    setAmount("");
  };
  const refreshData = () => {
    setInnerLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const filteredClient = res.data.clients.find((i) => i.id == clientId);
        const filteredClientInvoices =
          filteredClient.invoices == undefined ? [] : filteredClient.invoices;
        console.log(
          "these are the invoice in parent module",
          filteredClientInvoices
        );
        setFilteredData(filteredClientInvoices);
        setInnerLoading(false);
        // setPaymentFlag(false);
      })
      .catch((err) => {
        console.log(err);
        setInnerLoading(false);
      });
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleViewModal = (id) => {
    setInvoiceId(id);
    setModalFlag(!modalFlag);
  };
  return (
    <Modal
      open={openFlag}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="toolModal"
    >
      <div className="modal-tool-wrap">
        <p className="close" onClick={handleClose}>
          &#10005;
        </p>
        <h1 className={`${poppins.className} modal-heading`}>All Invoices</h1>
        <div style={{ width: "250px" }}>
          <Select
            options={filterOpt}
            value={filter}
            onChange={(value) => {
              setFilter(value);
              setJobId("");
              setInvoice("");
              setAmount("");
            }}
          />
        </div>
        <form onSubmit={handleSearch} className="invoice-inner-form">
          {filter.value == "job id" ? (
            <input
              className={poppins.className}
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              placeholder="Job ID"
            />
          ) : filter.value == "invoice" ? (
            <input
              className={poppins.className}
              type="text"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              placeholder="Invoice"
            />
          ) : filter.value == "amount" ? (
            <input
              type="number"
              className={poppins.className}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          ) : null}
          {jobId == "" && invoice == "" && amount == "" ? null : (
            <input
              type="submit"
              className={poppins.className}
              value={"Search"}
            />
          )}
          {jobId == "" && invoice == "" && amount == "" ? null : (
            <p
              onClick={clearHandler}
              style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
            >
              Clear
            </p>
          )}
        </form>
        <Paper
          className={poppins.className}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <TableContainer sx={{ height: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: "100px" }}>Payments</TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    Attachments
                  </TableCell>
                  <TableCell style={{ minWidth: "130px" }}>
                    Invoice Date
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Job Id</TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Invoice</TableCell>
                  <TableCell style={{ minWidth: "130px" }}>
                    Original Amount
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    Total Amount
                  </TableCell>
                  <TableCell style={{ minWidth: "130px" }}>
                    Retention Amount
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    Retention Start Date
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    Non Retention Amount
                  </TableCell>

                  <TableCell style={{ minWidth: "80px" }}>0+</TableCell>
                  <TableCell style={{ minWidth: "80px" }}>30+</TableCell>
                  <TableCell style={{ minWidth: "80px" }}>60+</TableCell>
                  <TableCell style={{ minWidth: "80px" }}>90+</TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    Audit Date
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    Last Statement Date
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Notes</TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Paid</TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    Remaining Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData &&
                  filteredData.length &&
                  filteredData.map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell>
                          <button
                            className={`${poppins.className} view-invoice-btn`}
                            onClick={() => {
                              setInvoiceId(i.id);
                              handlePaymentModal(i);
                            }}
                          >
                            View
                          </button>
                        </TableCell>
                        <TableCell>
                          {i.attachments &&
                          i.attachments.files &&
                          i.attachments.files.length ? (
                            <button
                              className={`${poppins.className} view-invoice-btn`}
                              onClick={() => handleViewModal(i.id)}
                            >
                              View
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          {i.invoiceDate == "" || i.invoiceDate == undefined
                            ? "none"
                            : i.invoiceDate}
                        </TableCell>
                        <TableCell>{i.jobId}</TableCell>
                        <TableCell>{i.invoice}</TableCell>
                        <TableCell>
                          {i.originalAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.originalAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.totalAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.totalAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.retentionAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.retentionAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.retentionStartDate == "" ||
                          i.retentionStartDate == undefined
                            ? "none"
                            : i.retentionStartDate}
                        </TableCell>
                        <TableCell>
                          {i.nonRetentionAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.nonRetentionAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.zeroDaysAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.zeroDaysAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.thirtyDaysAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.thirtyDaysAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.sixtyDaysAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.sixtyDaysAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.ninetyDaysAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.ninetyDaysAmount)}`}
                        </TableCell>
                        <TableCell>
                          {i.auditDate == "" || i.auditDate == undefined
                            ? "none"
                            : i.auditDate}
                        </TableCell>
                        <TableCell>
                          {i.lastStatementDate == "" ||
                          i.lastStatementDate == undefined
                            ? "none"
                            : i.lastStatementDate}
                        </TableCell>
                        <TableCell>{i.notes}</TableCell>
                        <TableCell>{i.paid}</TableCell>
                        <TableCell style={{ minWidth: "150px" }}>
                          {i.remainingAmount == null
                            ? "none"
                            : `$${numberWithCommas(i.remainingAmount)}`}
                        </TableCell>
                        {paymentFlag && i.id == invoiceId ? (
                          <PaymentModal
                            open={paymentFlag}
                            onClose={() => setPaymentFlag(false)}
                            payments={
                              i.payments == undefined || i.payments.length == 0
                                ? []
                                : i.payments
                            }
                            totalAmount={i.totalAmount}
                            remainingAmountValue={
                              i.remainingAmount == undefined
                                ? null
                                : i.remainingAmount
                            }
                            clientId={clientId}
                            invoiceId={i.id}
                            refreshData={refreshData}
                            innerLoading={innerLoading}
                            paid={i.paid}
                          />
                        ) : null}
                        {modalFlag && invoiceId == i.id ? (
                          <AttachmentModal
                            files={i.attachments.files}
                            openFlag={modalFlag}
                            closeModal={handleViewModal}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Modal>
  );
}

export default InvoicesTableModal;
