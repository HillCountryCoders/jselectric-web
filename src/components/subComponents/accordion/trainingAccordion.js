import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Swal from "sweetalert2";
import { apiPath } from "@/utils/routes";
import TrainingDrawer from "../drawers/trainingDrawer";
function TrainingAccordion({ data, refreshData }) {
  const [oldFiles, setOldFiles] = useState("");
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [trainId, setTrainId] = useState("");
  const handleEdit = (item) => {
    setItem(item);
    setTrainId(item.id);
    setDrawer(true);
  };
  const handleDelete = (data) => {
    setOldFiles(data.attachments);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Training data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataObj = {
          oldFiles: data.attachments,
        };
        axios({
          method: "put",
          url: `${apiPath.prodPath}/api/training/deleteTraining/${data.id}`,
          data: dataObj,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  console.log("#$#####", trainId);
  return (
    <div>
      {data && data.length ? (
        data.map((i) => {
          return (
            <Accordion key={i.id}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div className="top-accordion-wrap">
                  <h1>{i.trainingId}</h1>
                  <p>No of Slides {i.attachments.length}</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="acc-desc-wrap">
                  <div className="edit-del-wrap">
                    <span onClick={() => handleEdit(i)} className="edit">
                      Edit
                    </span>
                    <span onClick={() => handleDelete(i)} className="delete">
                      Delete
                    </span>
                  </div>
                  <h1>Description</h1>
                  <p>{i.description}</p>
                </div>
                <div className="slides-wrap"></div>
                <Carousel useKeyboardArrows={true}>
                  {i.attachments && i.attachments.length ? (
                    i.attachments.map((inner, ind) => {
                      return (
                        <div key={ind}>
                          <img
                            src={`${inner.fileUrl}`}
                            className="carousel-img"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p>No Slides found</p>
                  )}
                </Carousel>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <p>No Training Data Found</p>
      )}
      {drawer && trainId ? (
        <TrainingDrawer
          refreshData={refreshData}
          open={drawer}
          data={item}
          onClose={handleCloseDrawer}
          editFlag={true}
          id={item.id}
        />
      ) : null}
    </div>
  );
}

export default TrainingAccordion;
