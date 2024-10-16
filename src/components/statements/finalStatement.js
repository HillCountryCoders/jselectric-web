import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment/moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function FinalStatment({ data }) {
  console.log("@@##@@!!!", data);
  return (
    <div className="final-statement" id="statements">
      {data &&
        data.map((i, ind) => {
          return (
            <div className="customer-details" key={`${i.customerName}${ind}`}>
              <div className="top-bar">
                <h3>Customer Name:</h3>
                <p>{i.customerName}</p>
              </div>
              <div>
                <h3
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Invoices Details
                </h3>
                <Paper
                  className={poppins.className}
                  sx={{ width: "100%", overflow: "hidden" }}
                >
                  <TableContainer sx={{ height: "auto" }}>
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      id="statement-report"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Invoice Date
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Job Id
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Invoice#
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Original Amount
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Retention Amount
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Remaining Amount
                          </TableCell>
                          <TableCell
                            style={{
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                            }}
                          >
                            Payment Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ background: "#fff" }}>
                        {i.invoices &&
                          i.invoices.map((inner) => {
                            return (
                              <TableRow key={inner.id}>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {moment(inner.invoiceDate).format(
                                    "MM/DD/YYYY"
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.jobId}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.invoice}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.originalAmount}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.retentionAmount}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.remainingAmount}
                                </TableCell>
                                <TableCell
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {inner.paid}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {i.invoices &&
                    i.invoices.map((i) => {
                      return (
                        <div key={i.id} className="payment-detaisl">
                          <h3
                            style={{
                              marginTop: "20px",
                              paddingTop: "10px",
                              padding: "10px",
                              fontWeight: "bold",
                              borderTop: "1px solid #000",
                            }}
                          >
                            Payments Details for Invoice # {i.invoice}
                          </h3>
                          {i.payments.length > 0 ? (
                            <TableContainer sx={{ height: "auto" }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      style={{
                                        borderRight: "1px solid #000",
                                        borderBottom: "1px solid #000",
                                      }}
                                    >
                                      Date
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        borderRight: "1px solid #000",
                                        borderBottom: "1px solid #000",
                                      }}
                                    >
                                      Cheque No
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        borderRight: "1px solid #000",
                                        borderBottom: "1px solid #000",
                                      }}
                                    >
                                      Original Amount
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        borderRight: "1px solid #000",
                                        borderBottom: "1px solid #000",
                                      }}
                                    >
                                      Payment
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        borderRight: "1px solid #000",
                                        borderBottom: "1px solid #000",
                                      }}
                                    >
                                      Remaining Amount
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody style={{ background: "#fff" }}>
                                  {i.payments &&
                                    i.payments
                                      .sort((a, b) =>
                                        a.date.localeCompare(b.date)
                                      )
                                      .map((inner) => {
                                        return (
                                          <TableRow key={inner.id}>
                                            <TableCell
                                              style={{
                                                borderRight: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {moment(inner.date).format(
                                                "MM/DD/YYYY"
                                              )}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                borderRight: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {inner.checkNo}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                borderRight: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {inner.amount}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                borderRight: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {inner.payment}
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                borderRight: "1px solid #000",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {inner.remainingAmount}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <p style={{ padding: "10px" }}>
                              No Paymenst added for Invoice# {i.invoice}
                            </p>
                          )}
                        </div>
                      );
                    })}
                </Paper>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FinalStatment;
