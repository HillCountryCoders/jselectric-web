import moment from "moment";

function TopWriteUpInfo({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Date Added</label>
        <p>{item.dateAdded}</p>
      </div>
      <div className="singleInfo">
        <label>User</label>
        <p>{item.user}</p>
      </div>
      <div className="singleInfo">
        <label>Status</label>
        <p>{item.status}</p>
      </div>
      <div className="singleInfo">
        <label>Start Date</label>
        <p>{item.startDate}</p>
      </div>
      <div className="singleInfo">
        <label>End Date</label>
        <p>{item.endDate}</p>
      </div>
      <div className="singleInfo">
        <label>Reason</label>
        <p>{item.reason}</p>
      </div>
      <div className="singleInfo">
        <label>Submitted To Jamie</label>
        <p>{item.jamieFlag ? "Yes" : "No"}</p>
      </div>
      <div className="singleInfo">
        <label>Submitted To Management</label>
        <p>{item.managementFlag ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default TopWriteUpInfo;
