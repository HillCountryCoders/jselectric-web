import { Modal } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SalesTaxModal({ open, onClose }) {
  const [taxValue, setTaxValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setLoader(true);
    axios.get(`${apiPath.prodPath}/api/globalTax`).then((res) => {
      setTaxValue(res.data.globalTaxs);
      setNumber(res.data.globalTaxs[0].taxValue);
      setLoader(false);
    });
  }, [open]);

  const handleTaxForm = (e) => {
    e.preventDefault();
    const dataObj = {
      taxValue: number,
    };
    axios
      .patch(`${apiPath.prodPath}/api/globalTax/${taxValue[0].id}`, dataObj)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Unable to add the Sales Text" });
        } else {
          axios.get(`${apiPath.prodPath}/api/globalTax`).then((res) => {
            setTaxValue(res.data.globalTaxs);
            setNumber(res.data.globalTaxs[0].taxValue);
            onClose();
          });
        }
      });
  };
  return (
    <Modal id="modal-create-chat" isOpen={open} onRequestClose={onClose}>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className="modal-heading">Set Sales Tax</h3>
          <p className="modal-para">
            Current Sales Tax is {taxValue.length ? taxValue[0].taxValue : 0}%
          </p>
          <form onSubmit={handleTaxForm}>
            <div className="input-wrap">
              <label>Set Sales Tax</label>
              <input
                step="any"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="add-btn-wrap">
              <input type="submit" value="Set Tax" />
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}

export default SalesTaxModal;
