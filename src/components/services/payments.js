import React, { useState, useEffect } from "react";
import "./style.scss";
import DatePicker from "react-datepicker";
import { Poppins } from "next/font/google";
import PaymentsTable from "../../components/subComponents/tables/paymentsTable";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function Payments({ remaining, total, serviceId, refreshData, allPayments }) {
  const [date, setDate] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remainingCus, setRemainingCus] = useState(
    (Math.round(remaining * 100) / 100).toFixed(2)
  );
  const [editFlag, setEditFlag] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [prevPayment, setPrevPayment] = useState("");
  const [prevRemainingAmount, setPrevRemainingAmount] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    console.log("this is all payments", allPayments);
  }, [allPayments]);
  const addPayment = (e) => {
    e.preventDefault();
    if (editFlag) {
      var remainingEdit = remaining + prevPayment;
      remainingEdit = remainingEdit - payment;
      console.log("here is remaining edit", remainingEdit);
      if (remainingEdit < 0) {
        Swal.fire({
          icon: "error",
          text: "Payment amount is more than the remaining amount. Please add the correct payment",
        });
      } else {
        const rem = { remaining: remainingEdit };
        axios
          .patch(
            `${apiPath.prodPath}/api/service/setRemaining/${serviceId}`,
            rem
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        const dataObj = {
          date,
          payment,
          paymentType: paymentType.value,
          remainingAmount: remainingEdit,
          note,
          checkNo,
          amount: total,
        };
        axios
          .patch(
            `${apiPath.prodPath}/api/service/editPayments/${serviceId}&&${paymentId}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occured while adding payments",
              });
            } else {
              console.log("here after edit");
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
      if (remainingCus < 0) {
        Swal.fire({
          icon: "error",
          text: "Remaining payment is less than 0",
        });
      } else {
        const rem = { remaining: remainingCus };
        axios
          .patch(
            `${apiPath.prodPath}/api/service/setRemaining/${serviceId}`,
            rem
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        const dataObj = {
          date,
          payment,
          paymentType: paymentType.value,
          remainingAmount: remainingCus,
          note,
          checkNo,
          amount: total,
        };
        axios
          .post(
            `${apiPath.prodPath}/api/service/addPayments/${serviceId}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Something went wrong while adding payments",
              });
            } else {
              Swal.fire({
                icon: "success",
                text: "Payment added Successfully",
                showConfirmButton: true,
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  refreshData();
                  clearValues();
                }
              });
            }
          });
      }
    }
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
    var cal = remaining - e.target.value;
    var formatedCal = (Math.round(cal * 100) / 100).toFixed(2);
    setRemainingCus(formatedCal);
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
    setPayment(payment.payment);
    setPrevPayment(payment.payment);
    setCheckNo(payment.checkNo);
    setDate(
      payment.date == "" ? "" : moment(payment.date).format("MM/DD/YYYY")
    );
    setPaymentType({ label: payment.paymentType, value: payment.paymentType });
    setNote(payment.note);
  };
  const handleDelete = (payment) => {
    var afterDelete = remaining + payment.payment;
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
            `${apiPath.prodPath}/api/service/deletePayments/${serviceId}&&${payment._id}`,
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
    <div className="payments-wrap">
      <div className="add-payment-form">
        {remaining == 0 ? (
          <p>Remaining Balance is $0. Cannot add further payments</p>
        ) : (
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
            {/* <div className="input-wrap">
              <label>Remaining</label>
              <input
                type="number"
                className={poppins.className}
                value={remainingCus}
                disabled={true}
              />
            </div> */}
            <div className="btn-wrap-payment">
              <input
                type="submit"
                value={editFlag ? "Edit" : "Add"}
                className={`${poppins.className} add-btn`}
              />
            </div>
          </form>
        )}
      </div>
      {allPayments.length ? (
        <PaymentsTable
          payments={allPayments}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <p>No data added yet.</p>
      )}
    </div>
  );
}

export default Payments;
