import "./style.scss";
import PartsItemsForm from "./partForm";
import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function PartsItems({ data, toolId }) {
  const [editFlag, setEditFlag] = useState(false);
  const [allParts, setAllParts] = useState("");
  const [part, setPart] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [actionFlag, setActionFlag] = useState(false);
  const [partId, setPartId] = useState("");
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        if (res.data.allTools.length) {
          const filteredParts = res.data.allTools.find((i) => i.id == toolId);
          setAllParts(filteredParts.parts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addParts = (dataObj) => {
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/tools/editPartsItems/${toolId}&&${partId}`;
    } else {
      url = `${apiPath.prodPath}/api/tools/addPartsItems/${toolId}`;
    }
    if (editFlag) {
      axios
        .patch(url, dataObj)
        .then((res) => {
          loadUser();
          setEditFlag(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(url, dataObj)
        .then((res) => {
          loadUser();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleActions = (id, objData) => {
    setPartId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const editData = (obj) => {
    setPart(obj);
    setEditFlag(true);
    setActionFlag(false);
  };
  const deletePart = (id) => {
    Swal.fire({
      icon: "success",
      title: "Delete",
      text: "Do you really want to delete Part/Items",
      confirmButtonText: "Delete",
      showConfirmButton: true,
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${apiPath.prodPath}/api/tools/deletePartsItems/${toolId}&&${id}`
          )
          .then((res) => {
            loadUser();
            setActionFlag(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <section className="parts-wrap">
      <PartsItemsForm part={part} addParts={addParts} editFlag={editFlag} />
      {allParts.length == 0 ? (
        <p>No Parts/Items found</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Parts No</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>Loading....</TableCell>
              </TableRow>
            ) : (
              allParts.length &&
              allParts.map((i) => {
                return (
                  <TableRow key={i.id}>
                    <TableCell style={{ position: "relative" }}>
                      <Image
                        onClick={() => handleActions(i.id, i)}
                        src="/dots.png"
                        width={32}
                        height={32}
                      />
                      {actionFlag && i.id == partId ? (
                        <div className="dropdown-div">
                          <p
                            onClick={() => editData(i)}
                            className={poppins.className}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => deletePart(i.id)}
                            className={poppins.className}
                          >
                            Delete
                          </p>
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>{i.partNo}</TableCell>
                    <TableCell>{i.description}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      )}
    </section>
  );
}

export default PartsItems;
