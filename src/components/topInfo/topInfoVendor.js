import moment from "moment";

function TopInfoVehicle({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Name</label>
        <p>{item.name}</p>
      </div>
      <div className="singleInfo">
        <label>Company Name</label>
        <p>{item.companyName}</p>
      </div>
      <div className="singleInfo">
        <label>Address</label>
        <p>{item.address}</p>
      </div>
      <div className="singleInfo">
        <label>City</label>
        <p>{item.city}</p>
      </div>
      <div className="singleInfo">
        <label>State</label>
        <p>{item.state}</p>
      </div>
      <div className="singleInfo">
        <label>Zipcode</label>
        <p>{item.zipCode}</p>
      </div>
      <div className="singleInfo">
        <label>Primary Contact</label>
        <p>{item.zipCode}</p>
      </div>
      <div className="singleInfo">
        <label>Phone</label>
        <p>{item.phone}</p>
      </div>
      <div className="singleInfo">
        <label>Email</label>
        <p>{item.email}</p>
      </div>
      <div className="singleInfo">
        <label>Website</label>
        <p>{item.website}</p>
      </div>
    </div>
  );
}

export default TopInfoVehicle;
