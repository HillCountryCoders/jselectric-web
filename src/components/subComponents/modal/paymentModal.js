import Modal from "@mui/material/Modal";
import "./style.scss";
import { Poppins } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import PaymentsTable from "../tables/paymentsTable";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function PaymentModal({
  open,
  onClose,
  payments,
  totalAmount,
  remainingAmountValue,
  clientId,
  invoiceId,
  innerLoading,
  refreshData,
  paid,
}) {
  const [date, setDate] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [note, setNote] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [prevPayment, setPrevPayment] = useState("");
  const [prevRemainingAmount, setPrevRemainingAmount] = useState("");
  console.log(invoiceId);
  useEffect(() => {
    console.log("first modal", payments, remainingAmountValue);
    if (remainingAmountValue == null) {
      setRemainingAmount(totalAmount);
    } else {
      setRemainingAmount(remainingAmountValue);
    }
  }, [open, payments]);
  const addPayment = (e) => {
    e.preventDefault();
    if (editFlag) {
      var remainingEdit = remainingAmountValue + prevPayment;
      remainingEdit = remainingEdit - payment;
      console.log("here is remaining edit", remainingEdit);
      if (remainingEdit < 0) {
        Swal.fire({
          icon: "error",
          text: "Payment amount is more than the remaining amount. Please add the correct payment",
        });
      } else {
        if (remainingEdit == 0) {
          console.log("here in zero");
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
              { paid: "Yes" }
            )
            .then((res) => {
              setEditFlag(false);
              console.log(res);
            })
            .catch((err) => console.log(err));
        }
        const dataObj = {
          date: moment(date).format("MM/DD/YYYY"),
          checkNo,
          payment,
          remainingAmount:
            Math.round((remainingEdit + Number.EPSILON) * 100) / 100,
          amount: totalAmount,
          paymentType: paymentType.value,
          note,
        };
        axios
          .patch(
            `${apiPath.prodPath}/api/clients/editPayments/${clientId}&&${invoiceId}&&${paymentId}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occured while adding payments",
              });
            } else {
              setEditFlag(false);
              refreshData();
              clearValues();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      var remaining;
      if (payments.length) {
        remaining = remainingAmount - payment;
        if (remaining < 0) {
          Swal.fire({
            icon: "error",
            text: "Payment amount is more than the remaining amount. Please add the correct payment",
          });
        } else {
          if (remaining == 0) {
            console.log("here in zero");
            axios
              .patch(
                `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
                { paid: "Yes" }
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          const dataObj = {
            date: moment(date).format("MM/DD/YYYY"),
            checkNo,
            payment,
            remainingAmount:
              Math.round((remaining + Number.EPSILON) * 100) / 100,
            amount: totalAmount,
            paymentType: paymentType.value,
            note,
          };
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/addPayments/${clientId}&&${invoiceId}`,
              dataObj
            )
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occured while adding payments",
                });
              } else {
                refreshData();
                clearValues();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        remaining = totalAmount - payment;
        if (remaining < 0) {
          Swal.fire({
            icon: "error",
            text: "Payment amount is more than the remaining amount. Please add the correct payment",
          });
        } else {
          if (remaining == 0) {
            axios
              .patch(
                `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
                { paid: "Yes" }
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          const dataObj = {
            date: moment(date).format("MM/DD/YYYY"),
            checkNo,
            payment,
            remainingAmount:
              Math.round((remaining + Number.EPSILON) * 100) / 100,
            amount: totalAmount,
            paymentType: paymentType.value,
            note,
          };
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/addPayments/${clientId}&&${invoiceId}`,
              dataObj
            )
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occured while adding payments",
                });
              } else {
                refreshData();
                clearValues();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const clearValues = () => {
    setPayment("");
    setCheckNo("");
    setDate("");
    setPaymentType("");
    setNote("");
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleEdit = (payment) => {
    setEditFlag(true);
    setPaymentId(payment._id);
    setAmount(totalAmount);
    setPayment(payment.payment);
    setPrevPayment(payment.payment);
    setCheckNo(payment.checkNo);
    setDate(
      payment.date == "" ? "" : moment(payment.date).format("MM/DD/YYYY")
    );
    setPaymentType({ label: payment.paymentType, value: payment.paymentType });
    setNote(payment.note);
    setRemainingAmount(payment.remainingAmount);
  };
  const handleDelete = (payment) => {
    var afterDelete = remainingAmountValue + payment.payment;
    const dataObj = {
      remainingAmount: afterDelete,
    };
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the payment?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        axios
          .patch(
            `${apiPath.prodPath}/api/clients/deletePayments/${clientId}&&${invoiceId}&&${payment._id}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occured while adding payments",
              });
            } else {
              refreshData();
              clearValues();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title-inner"
      aria-describedby="modal-modal-description-inner"
      className="paymentModal"
    >
      <div className="modal-tool-wrap">
        <p className="close" onClick={onClose}>
          &#10005;
        </p>
        <h1 className={`${poppins.className} modal-heading`}>Payments</h1>
        <div className="upper-top-info">
          <div className="item-1">
            <h2>Total Amount</h2>
            <p>
              {totalAmount == null
                ? "none"
                : `$${numberWithCommas(totalAmount)}`}
            </p>
          </div>
          <div className="item-2">
            <h2>Remaining Amount</h2>
            <p>
              {remainingAmount == null
                ? "none"
                : `$${numberWithCommas(remainingAmountValue)}`}
            </p>
          </div>
        </div>
        {paid == "Yes" ? null : (
          <div className="add-payment-form">
            <form className="payment-form" onSubmit={addPayment}>
              <div className="input-wrap">
                <label>Date</label>
                <DatePicker
                  className={poppins.className}
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
              <div className="input-wrap">
                <label>Payment Type</label>
                <Select
                  options={[
                    { label: "Cash", value: "Cash" },
                    { label: "Card", value: "Card" },
                    { label: "Check", value: "Check" },
                    { label: "EFT", value: "EFT" },
                  ]}
                  className={poppins.className}
                  value={paymentType}
                  onChange={(v) => setPaymentType(v)}
                />
              </div>
              {paymentType.value == "Check" ? (
                <div className="input-wrap">
                  <label>Check #</label>
                  <input
                    type="text"
                    className={poppins.className}
                    value={checkNo}
                    onChange={(e) => setCheckNo(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="input-wrap">
                <label>Payment</label>
                <input
                  type="number"
                  className={poppins.className}
                  value={payment}
                  onChange={handlePayment}
                />
              </div>
              <div className="input-wrap">
                <label>Note</label>
                <textarea
                  rows={3}
                  cols={6}
                  className={poppins.className}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="btn-wrap-payment">
                <input
                  type="submit"
                  value={editFlag ? "Edit" : "Add"}
                  className={`${poppins.className} add-btn`}
                />
              </div>
            </form>
          </div>
        )}
        {innerLoading ? (
          <p className={poppins.className}>Loading...</p>
        ) : payments.length ? (
          <PaymentsTable
            payments={payments}
            handleEdit={(item) => handleEdit(item)}
            handleDelete={(item) => handleDelete(item)}
          />
        ) : (
          <p style={{ marginTop: "10px" }}>No Payments Found</p>
        )}
      </div>
    </Modal>
  );
}

export default PaymentModal;
