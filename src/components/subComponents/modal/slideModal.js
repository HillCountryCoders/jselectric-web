import Modal from "@mui/material/Modal";
import "./style.scss";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  style: ["normal"],
});
function SlideModal({ open, onClose, modalData }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="slide-modal-inner-wrap">
        <p className={`${poppins.className} close`} onClick={onClose}>
          X
        </p>
        <Carousel useKeyboardArrows={true}>
          {modalData.attachments && modalData.attachments.length ? (
            modalData.attachments.map((inner, ind) => {
              return (
                <div key={ind} className="parent-cus-slide">
                  <img src={`${inner.fileUrl}`} className="carousel-img" />
                </div>
              );
            })
          ) : (
            <p>No Slides found</p>
          )}
        </Carousel>
      </div>
    </Modal>
  );
}

export default SlideModal;
