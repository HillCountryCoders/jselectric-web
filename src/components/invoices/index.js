import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InvoicesTableModal from "../subComponents/modal/invoicesTableModal";
import { Select } from "react-select";
import { Poppins } from "next/font/google";
import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function InvoiceComp({ allClients }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    setFilteredData(allClients);
  }, []);
  const handleClose = () => {
    setOpen(!open);
  };
  const handleData = (dataArr, id) => {
    setData(dataArr);
    setClientId(id);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (clientName == "") {
      return false;
    } else {
      axios
        .get(`${apiPath.prodPath}/api/clients/${clientName}`)
        .then((res) => {
          setFilteredData(res.data.clients);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleClear = () => {
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setFilteredData(res.data.clients);
        setClientName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="main-table-wrap">
      <div className="heading-wrap">
        <h2 className={poppins.className}>Invoices</h2>
      </div>
      <div className="search-form-wrap">
        <form style={{ marginBottom: "10px" }} onSubmit={handleSearch}>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Customer Name"
            className={`${poppins.className} search-invoice`}
          />
          <input
            className={`${poppins.className} search-invoice`}
            type="submit"
            value={"Search"}
          />
          {clientName == "" ? null : (
            <p
              className={`${poppins.className}`}
              style={{ color: "red", marginTop: "10px" }}
              onClick={handleClear}
            >
              Clear
            </p>
          )}
        </form>
      </div>
      <Paper
        className={poppins.className}
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Customer Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Invoices</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Data Found</p>
                </TableRow>
              ) : (
                filteredData.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.customerName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.invoices.length ? (
                          <button
                            className={`${poppins.className} view-invoice-btn`}
                            onClick={() => {
                              handleData(i.invoices, i.id);
                              handleClose();
                            }}
                          >
                            View
                          </button>
                        ) : (
                          "none"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          <InvoicesTableModal
            handleClose={handleClose}
            openFlag={open}
            clientId={clientId}
          />
        </TableContainer>
      </Paper>
    </section>
  );
}

export default InvoiceComp;
