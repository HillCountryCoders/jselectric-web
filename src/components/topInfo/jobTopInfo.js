import moment from "moment";

function TopInfo({ item }) {
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Job Tag</label>
        <p>{item.jobTag}</p>
      </div>
      <div className="singleInfo">
        <label>Number</label>
        <p>{item.number}</p>
      </div>
      <div className="singleInfo">
        <label>Job PM</label>
        <p>{item.jobPM}</p>
      </div>
      <div className="singleInfo">
        <label>Job Name</label>
        <p>{item.jobName}</p>
      </div>
      <div className="singleInfo">
        <label>Client</label>
        <p>{item.client}</p>
      </div>
      <div className="singleInfo">
        <label>Date Created</label>
        <p>
          {item.dateCreated == ""
            ? "none"
            : moment(item.dateCreated).format("MM/DD/YYYY")}
        </p>
      </div>
      <div className="singleInfo">
        <label>dateBilled</label>
        <p>
          {item.dateBilled == ""
            ? "none"
            : moment(item.dateBilled).format("MM/DD/YYYY")}
        </p>
      </div>
      <div className="singleInfo">
        <label>Job CTM</label>
        <p>{item.jobCTM}</p>
      </div>
      <div className="singleInfo">
        <label>Amount</label>
        <p>${numberWithCommas(item.amount)}</p>
      </div>
      <div className="singleInfo">
        <label>PO Contract</label>
        <p>{item.POContract}</p>
      </div>
      <div className="singleInfo">
        <label>Change Order</label>
        <p>{item.changeOrder}</p>
      </div>
      <div className="singleInfo">
        <label>Percentage Billed</label>
        <p>{item.percentageBilled}</p>
      </div>
      <div className="singleInfo">
        <label>Notes</label>
        <p>{item.notes}</p>
      </div>
      <div className="singleInfo">
        <label>General Contractor</label>
        <p>{item.generalContractor}</p>
      </div>
    </div>
  );
}

export default TopInfo;
