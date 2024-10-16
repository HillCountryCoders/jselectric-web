import moment from "moment";

function TopWriteUpInfo({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Date Created</label>
        <p>{item.dateCreated}</p>
      </div>
      <div className="singleInfo">
        <label>Created By</label>
        <p>{item.createdBy}</p>
      </div>
      <div className="singleInfo">
        <label>Employee Name</label>
        <p>{item.employeeName}</p>
      </div>
      <div className="singleInfo">
        <label>Date Added</label>
        <p>{item.dateAdded}</p>
      </div>
      <div className="singleInfo">
        <label>Warning</label>
        <p>{item.typeOfWarning}</p>
      </div>
      <div className="singleInfo">
        <label>Offences</label>
        <p>
          {item.typeOfOffences.length
            ? item.typeOfOffences.map((inner, ind) => {
                if (ind == item.typeOfOffences.length - 1) {
                  return `${inner}`;
                } else {
                  return `${inner}, `;
                }
              })
            : "N/A"}
        </p>
      </div>
      <div className="singleInfo">
        <label>Other Offence</label>
        <p>{item.otherOffence}</p>
      </div>
      <div className="singleInfo">
        <label>Description</label>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default TopWriteUpInfo;
