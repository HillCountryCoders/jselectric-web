import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function PartsItemsForm({ addParts, editFlag, part }) {
  const [partNo, setPartNo] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (editFlag) {
      setPartNo(part.partNo);
      setDescription(part.description);
    }
  }, [editFlag]);
  const handleParts = (e) => {
    e.preventDefault();
    const dataObj = {
      partNo,
      description,
    };
    addParts(dataObj);
    clearValues();
  };
  const clearValues = () => {
    setPartNo("");
    setDescription("");
  };
  return (
    <section>
      <form className="parts-form" onSubmit={handleParts}>
        <div className="input-wrap">
          <label>Part No</label>
          <input
            className={`${poppins.className} input`}
            onChange={(e) => setPartNo(e.target.value)}
            value={partNo}
          />
        </div>
        <div className="input-wrap">
          <label>Description</label>
          <input
            className={`${poppins.className} input`}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="input-wrap">
          <input
            className={`${poppins.className} sub-Btn`}
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
    </section>
  );
}

export default PartsItemsForm;
