import Modal from "@mui/material/Modal";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function ReimbursalModal({ openFlag, handleClose, data }) {
  return (
    <Modal
      open={openFlag}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="toolModal"
    >
      <div className="modal-tool-wrap">
        <p className="close" onClick={handleClose}>
          &#10005;
        </p>
        <h1 className={`${poppins.className} modal-heading`}>
          Reimbursal Data
        </h1>
        {data.map((i) => (
          <div key={i._id} className={`${poppins.className} row`}>
            <div className="single-item">
              <label>Reimbursal Type</label>
              <p>{i.reimbursalType}</p>
            </div>
            <div className="single-item">
              <label>Amount</label>
              <p>{i.amount}</p>
            </div>
            <div className="single-item">
              <label>Note</label>
              <p>{i.note}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ReimbursalModal;
