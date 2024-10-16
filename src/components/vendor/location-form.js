import { useState } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function LocationForm({ edit, data, handleAdd, handleEdit }) {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useState(() => {
    console.log("this is called");
    if (edit) {
      setLocationName(data.locationName);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setZipCode(data.zipCode);
      setPrimaryContact(data.primaryContact);
      setPhone(data.phone);
      setEmail(data.email);
    }
  }, [edit]);
  const handleForm = (e) => {
    e.preventDefault();
    const dataObj = {
      locationName,
      address,
      city,
      state,
      zipCode,
      primaryContact,
      phone,
      email,
    };
    handleAdd(dataObj);
  };
  return (
    <div className={`${poppins.className}`}>
      <form className="form-location-wrap" onSubmit={handleForm}>
        <div className="input-wrap">
          <label>Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Zipcode</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Primary Contact</label>
          <input
            type="text"
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="input-wrap">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={poppins.className}
          />
        </div>
        <div className="sub-btn-wrap">
          <input
            type="submit"
            value={edit ? "Edit" : "Add"}
            className={`${poppins.className} addEmp`}
          />
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
