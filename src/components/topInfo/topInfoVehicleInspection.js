import moment from "moment";

function TopInfoVehicleInspection({ item }) {
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Date</label>
        <p>{moment(item.date).format("MM/DD/YYYY")}</p>
      </div>
      <div className="singleInfo">
        <label>Employee</label>
        <p>{item.employee}</p>
      </div>
      <div className="singleInfo">
        <label>Vehicle</label>
        <p>{item.vehicle}</p>
      </div>
      <div className="singleInfo">
        <label>Mileage</label>
        <p>{item.mileage}</p>
      </div>
      <div className="singleInfo">
        <label>HeadLights</label>
        <p>{item.headLights ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Tail Lights</label>
        <p>{item.tailLights ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Turn Signals</label>
        <p>{item.turnSignals ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Brake Lights</label>
        <p>{item.brakeLights ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Reflectors</label>
        <p>{item.reflectors ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Tires Rims</label>
        <p>{item.tiresRims ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Battery</label>
        <p>{item.battery ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Radiator</label>
        <p>{item.radiator ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Exhaust System</label>
        <p>{item.exhaustSystem ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Suspension</label>
        <p>{item.suspension ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Fuel System</label>
        <p>{item.fuelSystem ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Leaks</label>
        <p>{item.leaks ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Water Level</label>
        <p>{item.waterLevel ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Tranmission</label>
        <p>{item.tranmission ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Gauges</label>
        <p>{item.gauges ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Horn</label>
        <p>{item.horn ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Windshield</label>
        <p>{item.windShield ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Windshield Wipers</label>
        <p>{item.windshieldWipers ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Speedometer</label>
        <p>{item.speedometer ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Steering</label>
        <p>{item.steering ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Brake System</label>
        <p>{item.brakeSystem ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Seat Belts</label>
        <p>{item.seatBelts ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Seats</label>
        <p>{item.seats ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Heater</label>
        <p>{item.heater ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Mirrors</label>
        <p>{item.mirrors ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Safety Equipment</label>
        <p>{item.safetyEquipment ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Accident Kit</label>
        <p>{item.accidentKit ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Other</label>
        <p>{item.other ? "true" : "false"}</p>
      </div>
      <div className="singleInfo">
        <label>Damage</label>
        <p>{item.damage}</p>
      </div>
      <div className="singleInfo">
        <label>Remarks</label>
        <p>{item.remarks}</p>
      </div>
      <div className="singleInfo">
        <label>Signed By</label>
        <p>{item.signedBy}</p>
      </div>
    </div>
  );
}

export default TopInfoVehicleInspection;
