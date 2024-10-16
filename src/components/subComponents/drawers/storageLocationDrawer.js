import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "./style.scss";
import Select from "react-select";
function StorageLocationDrawer({
  open,
  onClose,
  addStorageLocation,
  edit,
  editData,
  editStorageLocation,
  id,
  refreshData,
}) {
  const [building, setBuilding] = useState("");
  const [buildingOpt, setBuildingOpt] = useState("");
  const [storageId, setStorageId] = useState("");
  const [storageIdOpt, setStorageIdOpt] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/building`).then((res) => {
      const data = res.data.buildings.map((i) => {
        return { label: i.name, value: i.name };
      });
      setBuildingOpt(data);
    });
    if (edit) {
      console.log("##$$$", editData);
      setBuilding({ label: editData.building, value: editData.building });
      axios.get(`${apiPath.prodPath}/api/storageId`).then((res) => {
        const filteredData = res.data.storageIds.filter(
          (i) => i.parentCategory == editData.building
        );
        setStorageIdOpt(
          filteredData.length
            ? filteredData.map((i) => {
                return { label: i.name, value: i.name };
              })
            : []
        );
      });
      setStorageId({ label: editData.storageId, value: editData.storageId });
      setNotes(editData.notes);
      setDescription(editData.description);
    }
  }, [open]);
  const handleBuilding = (v) => {
    setBuilding(v);
    axios.get(`${apiPath.prodPath}/api/storageId`).then((res) => {
      const filteredData = res.data.storageIds.filter(
        (i) => i.parentCategory == v.value
      );
      setStorageIdOpt(
        filteredData.length
          ? filteredData.map((i) => {
              return { label: i.name, value: i.name };
            })
          : []
      );
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      building: building.value,
      storageId: storageId.value,
      notes,
      description,
    };
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/storageLocation/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addStorageLocation(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setBuilding("");
    setStorageId("");
    setNotes("");
    setDescription("");
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleAdd}>
          <div className="input-wrap">
            <label>Building</label>
            <Select
              options={buildingOpt}
              onChange={handleBuilding}
              value={building}
            />
          </div>
          <div className="input-wrap">
            <label>Building</label>
            <Select
              options={storageIdOpt}
              onChange={(v) => setStorageId(v)}
              value={storageId}
            />
          </div>
          <div className="input-wrap">
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <textarea
              className={poppins.className}
              cols={5}
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Storage Location" : "Add Storage Location"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default StorageLocationDrawer;
