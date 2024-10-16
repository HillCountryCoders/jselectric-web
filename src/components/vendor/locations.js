import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiPath } from "../../utils/routes";
import LocationForm from "./location-form";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function Locations({ vendorId }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [data, setData] = useState([]);
  const [actionFlag, setActionFlag] = useState(false);
  const [vendorLocationId, setVendorLocationId] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        console.log(res.data.vendors);
        const filteredVendor = res.data.vendors.find((i) => i.id == vendorId);
        setLocations(filteredVendor.locations);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleActions = (id, objData) => {
    setVendorLocationId(id);
    setData(objData);
    setActionFlag(!actionFlag);
  };
  const handleAdd = (dataObj) => {
    axios
      .put(
        `${apiPath.prodPath}/api/vendor/addVendorLocation/${vendorId}`,
        dataObj
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Error Adding Location" });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          refreshData();
        }
      });
  };
  const handleEdit = (dataObj) => {
    axios
      .patch(
        `${apiPath.prodPath}/api/vendor/editVendorLocation/${vendorId}&&${vendorLocationId}`,
        dataObj
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Enable to edit location" });
        } else {
          refreshData();
        }
      });
  };
  const openEdit = (data) => {
    setEditFlag(true);
    setActionFlag(false);
    setLocationName(data.locationName);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setZipCode(data.zipCode);
    setPrimaryContact(data.primaryContact);
    setPhone(data.phone);
    setEmail(data.email);
  };
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the location",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${apiPath.prodPath}/api/vendor/deleteVendorLocation/${vendorId}&&${id}`
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                title: "Error Occured while deleting location",
              });
            } else {
              refreshData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const resetValues = () => {
    setLocationName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setPrimaryContact("");
    setPhone("");
    setEmail("");
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        const filteredVendor = res.data.vendors.find((i) => i.id == vendorId);
        setLocations(filteredVendor.locations);
        setLoading(false);
        setEditFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const handleForm = (e) => {
    e.preventDefault();
    const dataObj = {
      locationName,
      address,
      city,
      state,
      zipCode,
      primaryContact,
      phone,
      email,
    };
    if (editFlag) {
      handleEdit(dataObj);
      resetValues();
    } else {
      handleAdd(dataObj);
      resetValues();
    }
  };
  return loading ? (
    <p>Loading....</p>
  ) : (
    <div className="ven-locations-wrap">
      <form className="form-location-wrap" onSubmit={handleForm}>
        <div className="input-wrap">
          <label>Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Zipcode</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Primary Contact</label>
          <input
            type="text"
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="sub-btn-wrap">
          <input
            type="submit"
            value={editFlag ? "Edit" : "Add"}
            className={`${poppins.className} addEmp`}
          />
        </div>
      </form>
      {locations && locations.length ? (
        <Paper
          className={poppins.className}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <TableContainer sx={{ height: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Location Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Address</TableCell>
                  <TableCell style={{ minWidth: 150 }}>City</TableCell>
                  <TableCell style={{ minWidth: 150 }}>State</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    Primary Contact
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                          alt="Menu"
                        />
                        {actionFlag && i.id == vendorLocationId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => openEdit(i)}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => handleDelete(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.locationName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.address}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.city}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.state}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.zipCode}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.primaryContact}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.phone}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.email}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <p>No Locations data found</p>
      )}
    </div>
  );
}

export default Locations;
