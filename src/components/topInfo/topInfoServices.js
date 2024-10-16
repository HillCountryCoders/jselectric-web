import moment from "moment";

function TopInfoService({ item }) {
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>To</label>
        <p>{item.to}</p>
      </div>
      <div className="singleInfo">
        <label>Date Of Order</label>
        <p>{item.dateOfOrder}</p>
      </div>
      <div className="singleInfo">
        <label>Contact Name</label>
        <p>{item.contactName}</p>
      </div>
      <div className="singleInfo">
        <label>Tel#</label>
        <p>{item.tel}</p>
      </div>
      <div className="singleInfo">
        <label>Order Taken By</label>
        <p>{item.orderTakenBy}</p>
      </div>
      <div className="singleInfo">
        <label>Customer Order No</label>
        <p>{item.customerOrderNo}</p>
      </div>
      <div className="singleInfo">
        <label>Start Date</label>
        <p>{item.startDate}</p>
      </div>
      <div className="singleInfo">
        <label>Job Name</label>
        <p>{item.jobName}</p>
      </div>
      <div className="singleInfo">
        <label>Job Location</label>
        <p>{item.jobLocation}</p>
      </div>
      <div className="singleInfo">
        <label>Invoice Date</label>
        <p>{item.invoiceDate}</p>
      </div>
      <div className="singleInfo">
        <label>Terms</label>
        <p>{item.terms}</p>
      </div>
      <div className="singleInfo">
        <label>Total Labor</label>
        <p>
          $
          {item.totalLabor == null ? "none" : numberWithCommas(item.totalLabor)}
        </p>
      </div>
      <div className="singleInfo">
        <label>Total Material</label>
        <p>
          $
          {item.totalMaterail == null
            ? "none"
            : numberWithCommas(item.totalMaterail)}
        </p>
      </div>
      <div className="singleInfo">
        <label>Total</label>
        <p>${item.total == null ? "none" : numberWithCommas(item.total)}</p>
      </div>
      <div className="singleInfo">
        <label>Remaining</label>
        <p>
          ${item.remaining == null ? "none" : numberWithCommas(item.remaining)}
        </p>
      </div>
    </div>
  );
}

export default TopInfoService;
