import { Poppins } from "next/font/google";
import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import StorageLocationDrawer from "../subComponents/drawers/storageLocationDrawer";
import StorageLocationTable from "../subComponents/tables/storageLocationTable";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function StorageLocationComp() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allStorageLocations, setAllStorageLocations] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/storageLocation/`)
      .then((res) => {
        console.log("####", res.data.storageLocations);
        setAllStorageLocations(res.data.storageLocations);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addStorageLocations = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/storageLocation/addStorageLocation`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/storageLocation/`)
      .then((res) => {
        setAllStorageLocations(res.data.storageLocations);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className="main-table-wrap">
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Storage Location</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Storage Location
        </button>
      </div>
      <div className="table-wrap">
        {loading == true ? (
          <p>Loading....</p>
        ) : (
          <StorageLocationTable
            loading={loading}
            allStorageLocation={allStorageLocations}
            refreshData={refreshData}
          />
        )}
      </div>
      <StorageLocationDrawer
        addStorageLocation={addStorageLocations}
        open={drawer}
        onClose={handleCloseDrawer}
        edit={false}
      />
    </section>
  );
}

export default StorageLocationComp;
