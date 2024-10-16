import { Poppins } from "next/font/google";
import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import OverstockDrawer from "../subComponents/drawers/overstockDrawer";
import OverstockTable from "../subComponents/tables/overstockTable";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function Overstock() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overstocks, setOverstocks] = useState([]);
  const [overstockCategory, setOverstockCategory] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);
  const [itemDesc, setItemDesc] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/overstock/`)
      .then((res) => {
        console.log("####", res.data.overstocks);
        setOverstocks(res.data.overstocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios.get(`${apiPath.prodPath}/api/overstockCategories`).then((res) => {
      const data = res.data.overstockCats.map((i) => {
        return { label: i.name, value: i.name };
      });
      setCategoryOpt(data);
    });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addOverstock = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/overstock/addOverstock`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/overstock/`)
      .then((res) => {
        setOverstocks(res.data.overstocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const clearFilter = () => {
    setOverstockCategory("");
    setItemDesc("");
    setSearchFlag(false);
    refreshData();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFlag(true);
    setLoading(true);
    axios
      .get(
        `${apiPath.prodPath}/api/overstock/?overstockCategory=${
          overstockCategory !== "" ? overstockCategory.value : ""
        }&&itemDesc=${itemDesc}`
      )
      .then((res) => {
        setOverstocks(res.data.overstocks);
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
        <h2 className={poppins.className}>Overstock</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Overstock
        </button>
      </div>
      <div>
        <form className="search-form" onSubmit={handleSearch}>
          <div className={`${poppins.className} input-wrap`}>
            <Select
              options={categoryOpt}
              onChange={(v) => setOverstockCategory(v)}
              value={overstockCategory}
            />
          </div>
          <div className="input-wrap">
            <input
              className={poppins.className}
              type="text"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={"Search"}
            />
          </div>
          {searchFlag ? (
            <div className="sub-btn-wrap">
              <p
                onClick={clearFilter}
                className={`${poppins.className} clear-filter`}
              >
                Clear
              </p>
            </div>
          ) : null}
        </form>
      </div>
      <div className="table-wrap">
        {loading == true ? (
          <p>Loading....</p>
        ) : overstocks.length ? (
          <OverstockTable
            loading={loading}
            overstock={overstocks}
            refreshData={refreshData}
          />
        ) : (
          <p>No Overstock Data Found</p>
        )}
      </div>
      <OverstockDrawer
        addOverstock={addOverstock}
        open={drawer}
        onClose={handleCloseDrawer}
        edit={false}
      />
    </section>
  );
}

export default Overstock;
