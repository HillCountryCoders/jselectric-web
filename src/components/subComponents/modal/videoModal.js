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
  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }
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
          {modalData.videos && modalData.videos.length ? (
            modalData.videos.map((inner) => {
              return (
                <div className="parent-cus-slide" key={inner.id}>
                  <iframe
                    height={500}
                    className="video"
                    title="Youtube player"
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${YouTubeGetID(
                      inner.url
                    )}?autoplay=0`}
                  ></iframe>
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
