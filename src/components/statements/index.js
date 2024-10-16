import { Poppins } from "next/font/google";
import "./style.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import FinalStatment from "./finalStatement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

function StatementComp({ allClients }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientOpt, setClientOpt] = useState([]);
  const [paymentOption, setPaymentOption] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [finalData, setFinalData] = useState([]);
  const reportTemp = useRef(null);
  useEffect(() => {
    setClientOpt(
      allClients.map((i) => {
        return { label: i.customerName, value: i.customerName };
      })
    );
  }, []);
  const generatePdf = async (final) => {
    const doc = new jsPDF();
    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=100,left=150"
    );

    mywindow.document.write(`<html><head><title>Statement</title>`);
    mywindow.document.write("</head><body >");
    mywindow.document.write(document.getElementById("statements").innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
    // const input = reportTemp.current;
    // try {
    //   const canvas = await html2canvas(input);
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF({
    //     orientation: "landscape",
    //     unit: "in",
    //     format: "a3",
    //   });
    //   const width = pdf.internal.pageSize.getWidth();
    //   const height = (canvas.height * width) / canvas.width;
    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("statment.pdf");
    // } catch (error) {
    //   console.log("error", error);
    // }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (clientName == "" && paymentOption == "") {
      Swal.fire({
        icon: "warning",
        text: "Please select Customer Name and Paid Status",
      });
    } else {
      if (clientName.value == "All") {
        if (paymentOption.value == "Yes" && startDate == "" && endDate == "") {
          console.log("### here in all payment yes");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                if (inner.paid == paymentOption.value) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "Yes" && startDate !== "" && endDate == "") {
          console.log("### here in all payment yes startDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "Yes" && startDate == "" && endDate !== "") {
          console.log("### here in all payment yes endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (
          paymentOption.value == "Yes" &&
          startDate !== "" &&
          endDate !== ""
        ) {
          console.log("### here in all payment yes startDate endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate == "" && endDate == "") {
          console.log("### here in all payment No");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                allInvoices = [inner, ...allInvoices];
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });
          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate !== "" && endDate == "") {
          console.log("### here in all payment No startDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (invoiceDateSec >= startDateSec) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate == "" && endDate !== "") {
          console.log("### here in all payment No endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (invoiceDateSec <= endDateSec) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (
          paymentOption.value == "All" &&
          startDate !== "" &&
          endDate !== ""
        ) {
          console.log("### here in all payment No startDate and endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate == "" && endDate == "") {
          console.log("### here in all payment No");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                if (inner.paid == paymentOption.value) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });
          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate !== "" && endDate == "") {
          console.log("### here in all payment No startDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate == "" && endDate !== "") {
          console.log("### here in all payment No endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate !== "" && endDate !== "") {
          console.log("### here in all payment No startDate and endDate");
          var filtered = [];
          var allInvoices = [];
          allClients.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                ...filtered,
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
      } else {
        var filteredClient = allClients.filter(
          (i) => i.customerName == clientName.value
        );
        console.log("### here in selected Client");
        if (paymentOption.value == "Yes" && startDate == "" && endDate == "") {
          console.log("### here in client payment yes");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                if (inner.paid == paymentOption.value) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "Yes" && startDate !== "" && endDate == "") {
          console.log("### here in client payment yes startDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "Yes" && startDate == "" && endDate !== "") {
          console.log("### here in client payment yes endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (
          paymentOption.value == "Yes" &&
          startDate !== "" &&
          endDate !== ""
        ) {
          console.log("### here in client payment yes startDate endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate == "" && endDate == "") {
          console.log("### here in client payment No");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                if (inner.paid == paymentOption.value) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate !== "" && endDate == "") {
          console.log("### here in client payment No startDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate == "" && endDate !== "") {
          console.log("### here in client payment No endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "No" && startDate !== "" && endDate !== "") {
          console.log("### here in client payment No startDate and endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  inner.paid == paymentOption.value &&
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });
          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate == "" && endDate == "") {
          console.log("### here in all payment of one client");
          var filtered = [];
          var allInvoices = [];
          filtered = filteredClient.map((i) => {
            return { customerName: i.customerName, invoices: i.invoices };
          });
          // filteredClient.forEach((element) => {
          //   if (element.invoices.length > 0) {
          //     element.invoices.forEach((inner) => {
          //       allInvoices = [inner, ...allInvoices];
          //       filtered = [
          //         ...filtered,
          //         {
          //           customerName: element.customerName,
          //           invoices: allInvoices,
          //         },
          //       ];
          //     });
          //   }
          // });
          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate !== "" && endDate == "") {
          console.log("### here in all payment No startDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (invoiceDateSec >= startDateSec) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (paymentOption.value == "All" && startDate == "" && endDate !== "") {
          console.log("### here in all payment No endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                if (invoiceDateSec <= endDateSec) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
        if (
          paymentOption.value == "All" &&
          startDate !== "" &&
          endDate !== ""
        ) {
          console.log("### here in all payment No startDate and endDate");
          var filtered = [];
          var allInvoices = [];
          filteredClient.forEach((element) => {
            if (element.invoices.length > 0) {
              element.invoices.forEach((inner) => {
                const invoiceDateSec = new Date(inner.invoiceDate).getTime();
                const endDateSec = new Date(endDate).getTime();
                const startDateSec = new Date(startDate).getTime();
                if (
                  invoiceDateSec >= startDateSec &&
                  invoiceDateSec <= endDateSec
                ) {
                  allInvoices = [inner, ...allInvoices];
                }
              });
              filtered = [
                {
                  customerName: element.customerName,
                  invoices: allInvoices,
                },
              ];
            }
          });

          setFinalData(filtered);
        }
      }
    }
  };
  return (
    <section className="main-table-wrap">
      <div className="heading-wrap">
        <h2 className={poppins.className}>Statements</h2>
      </div>
      <div className="statement-form">
        <form style={{ marginBottom: "10px" }} onSubmit={handleSearch}>
          <div className="filter-inp-wrap">
            <label className={poppins.className}>Client Name</label>
            <Select
              options={clientOpt}
              value={clientName}
              onChange={(e) => setClientName(e)}
            />
          </div>
          <div className="filter-inp-wrap">
            <label className={poppins.className}>Payment Status</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "All", value: "All" },
              ]}
              value={paymentOption}
              onChange={(e) => setPaymentOption(e)}
            />
          </div>
          <div className="filter-inp-wrap">
            <label className={poppins.className}>Start Date</label>
            <DatePicker
              className={`${poppins.className} startDate-filter`}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="filter-inp-wrap">
            <label className={poppins.className}>End Date</label>
            <DatePicker
              className={`${poppins.className} startDate-filter`}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <input
            className={`${poppins.className} search-invoice`}
            type="submit"
            value={"Filter"}
          />
        </form>
      </div>
      {finalData.length > 0 ? (
        <div>
          <button onClick={() => generatePdf(finalData)}>Generate</button>
          <div ref={reportTemp}>
            <FinalStatment data={finalData} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default StatementComp;
