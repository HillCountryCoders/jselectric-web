import moment from "moment";

function TopInfoTools({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Tool #</label>
        <p>{item.toolNumber}</p>
      </div>
      <div className="singleInfo">
        <label>Category</label>
        <p>{item.category}</p>
      </div>
      <div className="singleInfo">
        <label>Sub-Category</label>
        <p>{item.subCategory}</p>
      </div>
      <div className="singleInfo">
        <label>Tech Assigned To</label>
        <p>{item.techAssigned}</p>
      </div>
      <div className="singleInfo">
        <label>Location</label>
        <p>{item.location}</p>
      </div>
      <div className="singleInfo">
        <label>Description</label>
        <p>{item.description}</p>
      </div>
      <div className="singleInfo">
        <label>Project</label>
        <p>{item.project}</p>
      </div>
      <div className="singleInfo">
        <label>Employee</label>
        <p>{item.employee}</p>
      </div>
      <div className="singleInfo">
        <label>Purchase Date</label>
        <p>{moment(item.purchaseDate).format("MM/DD/YYYY")}</p>
      </div>
      <div className="singleInfo">
        <label>Last Purchase Price</label>
        <p>{item.lastPurchasePrice}</p>
      </div>
      <div className="singleInfo">
        <label>Warranty Exp Date</label>
        <p>{moment(item.warrantyExpDate).format("MM/DD/YYYY")}</p>
      </div>
      <div className="singleInfo">
        <label>Serial #</label>
        <p>{item.serial}</p>
      </div>
      <div className="singleInfo">
        <label>Picture</label>
        <img
          src={item.picture && item.picture.fileUrl}
          className="tool-picture"
        />
      </div>
    </div>
  );
}

export default TopInfoTools;
