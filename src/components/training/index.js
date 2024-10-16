"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TrainingDrawer from "../subComponents/drawers/trainingDrawer";
import TrainingTable from "../subComponents/tables/trainingTabel";
import "./style.scss";
import axios from "axios";
import Select from "react-select";

import { apiPath } from "@/utils/routes";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function TrainingComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [activeTab, setActiveTab] = useState("Slides");
  const [trainingCategoryOpt, setTrainingCategoryOpt] = useState();
  const [trainingCategory, setTrainingCategory] = useState();
  const [searchData, setSearchData] = useState();
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/trainingCategory/`)
      .then((res) => {
        const optionArr = res.data.trainingCategorys.map((i) => {
          return { label: i.name, value: i.name };
        });
        setTrainingCategoryOpt(optionArr);
      })
      .catch((error) => console.log(error));
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        const filteredTraining = res.data.trainings.filter(
          (i) => i.trainingType == "Picture"
        );
        console.log(filteredTraining);
        setTrainings(filteredTraining);
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
  const getFilteredData = (category) => {
    if (searchFlag) {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/training/`)
        .then((res) => {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == category
          );

          const filteredBySearch = filteredTraining.filter(
            (i) => i.trainingCategory === trainingCategory.value
          );

          setTrainings(filteredBySearch);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/training/`)
        .then((res) => {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == category
          );
          setTrainings(filteredTraining);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleFilterTabs = (tab) => {
    if (tab == "Picture") {
      getFilteredData("Picture");
    } else {
      getFilteredData("Video");
    }
  };

  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        if (activeTab == "Slides") {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == "Picture"
          );
          setTrainings(filteredTraining);
          setLoading(false);
        } else {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == "Video"
          );
          setTrainings(filteredTraining);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = () => {
    refreshData();
    setSearchFlag(false);
    setTrainingCategory("");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        if (activeTab == "Slides") {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == "Picture"
          );
          const filteredBySearch = filteredTraining.filter(
            (inner) => inner.trainingCategory == trainingCategory.value
          );
          setTrainings(filteredBySearch);
          setLoading(false);
        } else {
          const filteredTraining = res.data.trainings.filter(
            (i) => i.trainingType == "Video"
          );
          const filteredBySearch = filteredTraining.filter(
            (inner) => inner.trainingCategory == trainingCategory.value
          );
          setTrainings(filteredBySearch);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Training</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Training
        </button>
      </div>
      <form
        onSubmit={handleSearch}
        className={`${poppins.className} filter-form`}
      >
        <Select
          options={trainingCategoryOpt}
          value={trainingCategory}
          onChange={(v) => {
            setTrainingCategory(v);
            setSearchFlag(true);
          }}
        />
        <input type="submit" value="Search" />
        {searchFlag ? (
          <p className="clear" onClick={handleClear}>
            Clear
          </p>
        ) : null}
      </form>
      <div className="tabs">
        <span
          onClick={() => {
            setActiveTab("Slides");
            handleFilterTabs("Picture");
          }}
          className={activeTab == "Slides" ? "activeTab" : "simpleTab"}
        >
          Slides
        </span>
        <span
          onClick={() => {
            setActiveTab("Videos");
            handleFilterTabs("Video");
          }}
          className={activeTab == "Videos" ? "activeTab" : "simpleTab"}
        >
          Videos
        </span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TrainingTable
          loading={loading}
          refreshData={refreshData}
          data={trainings}
        />
      )}
      <TrainingDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default TrainingComp;
