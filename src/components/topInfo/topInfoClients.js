function TopInfoClients({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Customer Code</label>
        <p>{item.customerCode}</p>
      </div>
      <div className="singleInfo">
        <label>Customer Name</label>
        <p>{item.customerName}</p>
      </div>
      <div className="singleInfo">
        <label>Alpha Code</label>
        <p>{item.alphaCode}</p>
      </div>
      <div className="singleInfo">
        <label>Phone</label>
        <p>{item.phone}</p>
      </div>
      <div className="singleInfo">
        <label>Primary Contact</label>
        <p>{item.primaryContact}</p>
      </div>
      <div className="singleInfo">
        <label>Primary Email</label>
        <p>{item.primaryEmail}</p>
      </div>
      <div className="singleInfo">
        <label>Secondary Email</label>
        <p>{item.secondaryEmail}</p>
      </div>
      <div className="singleInfo">
        <label>Fax</label>
        <p>{item.fax}</p>
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
        <label>Balance</label>
        <p>{item.balance}</p>
      </div>
      <div className="singleInfo">
        <label>Credit Limit</label>
        <p>{item.creditLimit}</p>
      </div>
      <div className="singleInfo">
        <label>Finance Charge</label>
        <p>{item.financeCharge}</p>
      </div>
      <div className="singleInfo">
        <label>Receive Statments</label>
        <p>{item.receiveStatements}</p>
      </div>
      <div className="singleInfo">
        <label>Retention</label>
        <p>{item.retention}</p>
      </div>
      <div className="singleInfo">
        <label>Resale Exp Date</label>
        <p>{item.resaleExpDate}</p>
      </div>
      <div className="singleInfo">
        <label>Last Date Billed</label>
        <p>{item.lastDateBilled}</p>
      </div>
      <div className="singleInfo">
        <label>Last Date Paid</label>
        <p>{item.lastDatePaid}</p>
      </div>
      <div className="singleInfo">
        <label>Retail Certificate</label>
        <p>{item.retailCertificate}</p>
      </div>
    </div>
  );
}

export default TopInfoClients;
