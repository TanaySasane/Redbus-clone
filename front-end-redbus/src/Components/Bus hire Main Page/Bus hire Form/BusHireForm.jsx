import React from "react";
import Styles from "./BusHireForm.module.css";
import { FaRegDotCircle, FaLongArrowAltLeft, FaUsers, FaEnvelope, FaPhone } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { ALL_CITIES } from "../../data/cityList";

const today = new Date().toISOString().split("T")[0];

const BusHireForm = ({ handleClick, tripType = "Outstation" }) => {
  const history = useHistory();
  const [form, setForm] = React.useState({
    pickUp: "", drop: "", pickUpDate: "", dropDate: "",
    totalPassengers: "", email: "", phone: "", specialReq: "",
  });
  const [errors, setErrors] = React.useState({});
  const [pickUpSuggestions, setPickUpSuggestions] = React.useState([]);
  const [dropSuggestions, setDropSuggestions] = React.useState([]);
  const [showPickUp, setShowPickUp] = React.useState(false);
  const [showDrop, setShowDrop] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!form.pickUp.trim()) e.pickUp = "Pickup location required";
    if (!form.drop.trim()) e.drop = "Destination required";
    if (form.pickUp.trim().toLowerCase() === form.drop.trim().toLowerCase()) e.drop = "Pickup and destination cannot be same";
    if (!form.pickUpDate) e.pickUpDate = "Pickup date required";
    if (form.pickUpDate && form.pickUpDate < today) e.pickUpDate = "Date cannot be in the past";
    if (!form.dropDate) e.dropDate = "Return date required";
    if (form.dropDate && form.pickUpDate && form.dropDate < form.pickUpDate) e.dropDate = "Return date must be after pickup date";
    if (!form.totalPassengers || form.totalPassengers < 1) e.totalPassengers = "Enter number of passengers";
    if (form.totalPassengers > 50) e.totalPassengers = "Max 50 passengers";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });

    if (name === "pickUp") {
      const filtered = ALL_CITIES.filter(c => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);
      setPickUpSuggestions(filtered);
      setShowPickUp(value.length > 0);
    }
    if (name === "drop") {
      const filtered = ALL_CITIES.filter(c => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);
      setDropSuggestions(filtered);
      setShowDrop(value.length > 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    history.push(`/bus-hire-card?pickUp=${form.pickUp}&drop=${form.drop}&pickUpDate=${form.pickUpDate}&dropDate=${form.dropDate}&totalPassengers=${form.totalPassengers}&email=${form.email}&phone=${form.phone}`);
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <button className={Styles.backBtn} onClick={handleClick}>
            <FaLongArrowAltLeft /> Back
          </button>
          <div>
            <div className={Styles.headerTitle}>{tripType} Trip</div>
            <div className={Styles.headerSub}>Fill in your travel details to get quotes</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={Styles.form}>
          {/* Route */}
          <div className={Styles.section}>
            <div className={Styles.sectionTitle}>📍 Route Details</div>
            <div className={Styles.row}>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Pickup City</label>
                <div className={Styles.inputWrap}>
                  <FaRegDotCircle className={Styles.inputIcon} style={{ color: "#d84f57" }} />
                  <input
                    className={`${Styles.input} ${errors.pickUp ? Styles.inputError : ""}`}
                    type="text" name="pickUp" placeholder="e.g. Mumbai"
                    value={form.pickUp} onChange={handleChange}
                    onBlur={() => setTimeout(() => setShowPickUp(false), 150)}
                    autoComplete="off"
                  />
                  {showPickUp && pickUpSuggestions.length > 0 && (
                    <ul className={Styles.suggestions}>
                      {pickUpSuggestions.map(c => (
                        <li key={c} onMouseDown={() => { setForm({ ...form, pickUp: c }); setShowPickUp(false); }}>
                          🏙️ {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.pickUp && <span className={Styles.error}>{errors.pickUp}</span>}
              </div>

              <div className={Styles.swapIcon}>⇄</div>

              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Destination City</label>
                <div className={Styles.inputWrap}>
                  <HiLocationMarker className={Styles.inputIcon} style={{ color: "#38b87c" }} />
                  <input
                    className={`${Styles.input} ${errors.drop ? Styles.inputError : ""}`}
                    type="text" name="drop" placeholder="e.g. Pune"
                    value={form.drop} onChange={handleChange}
                    onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                    autoComplete="off"
                  />
                  {showDrop && dropSuggestions.length > 0 && (
                    <ul className={Styles.suggestions}>
                      {dropSuggestions.map(c => (
                        <li key={c} onMouseDown={() => { setForm({ ...form, drop: c }); setShowDrop(false); }}>
                          🏙️ {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.drop && <span className={Styles.error}>{errors.drop}</span>}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className={Styles.section}>
            <div className={Styles.sectionTitle}>📅 Travel Dates</div>
            <div className={Styles.row}>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Pickup Date</label>
                <input
                  className={`${Styles.input} ${errors.pickUpDate ? Styles.inputError : ""}`}
                  type="date" name="pickUpDate" min={today}
                  value={form.pickUpDate} onChange={handleChange}
                />
                {errors.pickUpDate && <span className={Styles.error}>{errors.pickUpDate}</span>}
              </div>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Return Date</label>
                <input
                  className={`${Styles.input} ${errors.dropDate ? Styles.inputError : ""}`}
                  type="date" name="dropDate" min={form.pickUpDate || today}
                  value={form.dropDate} onChange={handleChange}
                />
                {errors.dropDate && <span className={Styles.error}>{errors.dropDate}</span>}
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className={Styles.section}>
            <div className={Styles.sectionTitle}>👥 Passengers & Contact</div>
            <div className={Styles.row}>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Number of Passengers</label>
                <div className={Styles.inputWrap}>
                  <FaUsers className={Styles.inputIcon} style={{ color: "#1447a0" }} />
                  <input
                    className={`${Styles.input} ${errors.totalPassengers ? Styles.inputError : ""}`}
                    type="number" name="totalPassengers" placeholder="e.g. 20" min="1" max="50"
                    value={form.totalPassengers} onChange={handleChange}
                  />
                </div>
                {errors.totalPassengers && <span className={Styles.error}>{errors.totalPassengers}</span>}
              </div>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Email (optional)</label>
                <div className={Styles.inputWrap}>
                  <FaEnvelope className={Styles.inputIcon} style={{ color: "#888" }} />
                  <input
                    className={`${Styles.input} ${errors.email ? Styles.inputError : ""}`}
                    type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
                {errors.email && <span className={Styles.error}>{errors.email}</span>}
              </div>
              <div className={Styles.fieldWrap}>
                <label className={Styles.label}>Phone (optional)</label>
                <div className={Styles.inputWrap}>
                  <FaPhone className={Styles.inputIcon} style={{ color: "#888" }} />
                  <input
                    className={`${Styles.input} ${errors.phone ? Styles.inputError : ""}`}
                    type="tel" name="phone" placeholder="10-digit number"
                    value={form.phone} onChange={handleChange}
                  />
                </div>
                {errors.phone && <span className={Styles.error}>{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Special requirements */}
          <div className={Styles.section}>
            <div className={Styles.sectionTitle}>📝 Special Requirements (optional)</div>
            <textarea
              className={Styles.textarea}
              name="specialReq" rows={3}
              placeholder="e.g. Need AC bus, wheelchair accessible, specific pickup time..."
              value={form.specialReq} onChange={handleChange}
            />
          </div>

          {/* Price estimate */}
          {form.totalPassengers > 0 && (
            <div className={Styles.priceEstimate}>
              <span>💡 Estimated price range:</span>
              <strong> ₹{Math.round(form.totalPassengers * 300)} – ₹{Math.round(form.totalPassengers * 600)}</strong>
              <span className={Styles.priceNote}> (final price after vehicle selection)</span>
            </div>
          )}

          <button type="submit" className={Styles.submitBtn}>
            🔍 Find Available Vehicles
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusHireForm;
