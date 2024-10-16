function TopInfo({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Unit Type</label>
        <p>{item.userType}</p>
      </div>
      <div className="singleInfo">
        <label>Fullname</label>
        <p>{item.fullname}</p>
      </div>
      <div className="singleInfo">
        <label>Email</label>
        <p>{item.email}</p>
      </div>
      <div className="singleInfo">
        <label>Personal Phone</label>
        <p>{item.personalPhone}</p>
      </div>
      <div className="singleInfo">
        <label>Company Phone</label>
        <p>{item.companyPhone}</p>
      </div>
      <div className="singleInfo">
        <label>City</label>
        <p>{item.city}</p>
      </div>
      <div className="singleInfo">
        <label>Vehicle</label>
        <p>{item.vehicle}</p>
      </div>
      <div className="singleInfo">
        <label>Tablet</label>
        <p>{item.tablet}</p>
      </div>
      <div className="singleInfo">
        <label>Username</label>
        <p>{item.username}</p>
      </div>
      <div className="singleInfo">
        <label>Position</label>
        <p>{item.position}</p>
      </div>
      <div className="singleInfo">
        <label>Credit Card</label>
        <p>{item.creditCard}</p>
      </div>
    </div>
  );
}

export default TopInfo;
