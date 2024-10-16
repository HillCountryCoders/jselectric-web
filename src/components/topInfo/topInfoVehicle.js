import moment from "moment";

function TopInfoVehicle({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Vehicle #</label>
        <p>{item.vehicleNo}</p>
      </div>
      <div className="singleInfo">
        <label>Driver/Wex Pin</label>
        <p>{item.driverWEXPin}</p>
      </div>
      <div className="singleInfo">
        <label>Inspection ID</label>
        <p>{item.inspectionId}</p>
      </div>
      <div className="singleInfo">
        <label>Vin#</label>
        <p>{item.vinNo}</p>
      </div>
      <div className="singleInfo">
        <label>Status</label>
        <p>{item.status}</p>
      </div>
      <div className="singleInfo">
        <label>Tag Experation</label>
        <p>{item.tagExperation}</p>
      </div>
      <div className="singleInfo">
        <label>License Plate</label>
        <p>{item.licensePlate}</p>
      </div>
      <div className="singleInfo">
        <label>Make/Model</label>
        <p>{item.makeModel}</p>
      </div>
      <div className="singleInfo">
        <label>Color</label>
        <p>{item.color}</p>
      </div>
      <div className="singleInfo">
        <label>Year</label>
        <p>{item.year}</p>
      </div>
      <div className="singleInfo">
        <label>TX Tag</label>
        <p>{item.txTag}</p>
      </div>
      <div className="singleInfo">
        <label>Gas Card</label>
        <p>{item.gasCard}</p>
      </div>
      <div className="singleInfo">
        <label>Gas Card Last</label>
        <p>{item.gasCardLast}</p>
      </div>
      <div className="singleInfo">
        <label>Card #</label>
        <p>{item.cardNo}</p>
      </div>
      <div className="singleInfo">
        <label>Tracking Installed</label>
        <p>{item.trackingInstalled}</p>
      </div>
      <div className="singleInfo">
        <label>Geo Tab</label>
        <p>{item.geoTab}</p>
      </div>
    </div>
  );
}

export default TopInfoVehicle;
