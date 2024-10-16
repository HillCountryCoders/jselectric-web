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
function OverstockDrawer({
  open,
  onClose,
  addOverstock,
  edit,
  editData,
  id,
  refreshData,
}) {
  const [overstockCategory, setOverstockCategory] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);
  const [itemDesc, setItemDesc] = useState("");
  const [estAvail, setEstAvail] = useState(0);

  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/overstockCategories`).then((res) => {
      const data = res.data.overstockCats.map((i) => {
        return { label: i.name, value: i.name };
      });
      setCategoryOpt(data);
    });
    if (edit) {
      setOverstockCategory({
        label: editData.overstockCategory,
        value: editData.overstockCategory,
      });
      setItemDesc(editData.itemDesc);
      setEstAvail(editData.estAvail);
    }
  }, [open]);
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      overstockCategory: overstockCategory.value,
      estAvail,
      itemDesc,
    };
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/overstock/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addOverstock(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setOverstockCategory("");
    setItemDesc("");
    setEstAvail(0);
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
            <label>Overstock Category</label>
            <Select
              options={categoryOpt}
              onChange={(v) => setOverstockCategory(v)}
              value={overstockCategory}
            />
          </div>
          <div className="input-wrap">
            <label>Item Description</label>
            <input
              type="text"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>EST Avail</label>
            <input
              type="number"
              value={estAvail}
              onChange={(e) => setEstAvail(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Overstock" : "Add Overstock"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default OverstockDrawer;
