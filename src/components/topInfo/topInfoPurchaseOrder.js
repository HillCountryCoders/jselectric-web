import moment from "moment";

function TopInfoPurchaseOrder({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>PO</label>
        <p>{item.PO}</p>
      </div>
      <div className="singleInfo">
        <label>Purchase Type</label>
        <p>{item.purchaseType}</p>
      </div>
      <div className="singleInfo">
        <label>Vendor</label>
        <p>{item.vendor}</p>
      </div>
      <div className="singleInfo">
        <label>Vendor Sales</label>
        <p>{item.vendorSales}</p>
      </div>

      <div className="singleInfo">
        <label>Purchase Status</label>
        <p>{item.purchaseStatus}</p>
      </div>
      <div className="singleInfo">
        <label>Notes</label>
        <p>{item.notes}</p>
      </div>
    </div>
  );
}

export default TopInfoPurchaseOrder;
