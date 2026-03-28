import React from "react";
import Styles from "./TripTypeContainer.module.css";
import { useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";

const journeyTypes = [
  {
    id: "outstation",
    label: "Outstation",
    desc: "Travel outside your city",
    icon: "https://img.icons8.com/color/96/000000/bus2.png",
    available: true,
  },
  {
    id: "local",
    label: "Local",
    desc: "Travel within your city",
    icon: "https://img.icons8.com/color/96/000000/city.png",
    available: false,
  },
  {
    id: "airport",
    label: "Airport",
    desc: "Pickup & drop to airport",
    icon: "https://img.icons8.com/color/96/000000/airport.png",
    available: false,
  },
];

const TripTypeContainer = ({ handleClick }) => {
  const [selected, setSelected] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const customer = useSelector((state) => state.authReducer.currentCustomer);

  const handleSelect = (type) => {
    setSelected(type.id);
    if (!type.available) return;
    if (!customer) {
      alert("Please login to book a vehicle.");
      return;
    }
    setTimeout(() => handleClick(), 300);
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.card}>
        <div className={Styles.header}>
          <span className={Styles.headerIcon}>🚌</span>
          <div>
            <div className={Styles.headerTitle}>Hire a Vehicle</div>
            <div className={Styles.headerSub}>Select your journey type to get started</div>
          </div>
        </div>

        <div className={Styles.typeGrid}>
          {journeyTypes.map((type) => (
            <div
              key={type.id}
              className={[
                Styles.typeCard,
                selected === type.id ? Styles.typeCardSelected : "",
                hovered === type.id ? Styles.typeCardHovered : "",
                !type.available ? Styles.typeCardDisabled : "",
              ].join(" ")}
              onClick={() => handleSelect(type)}
              onMouseEnter={() => setHovered(type.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={type.icon} alt={type.label} className={Styles.typeIcon} />
              <div className={Styles.typeInfo}>
                <div className={Styles.typeLabel}>{type.label}</div>
                <div className={Styles.typeDesc}>{type.desc}</div>
                {!type.available && (
                  <span className={Styles.comingSoon}>Coming Soon</span>
                )}
              </div>
              {type.available && (
                <FaLongArrowAltRight className={Styles.arrow} />
              )}
              {selected === type.id && type.available && (
                <div className={Styles.selectedDot} />
              )}
            </div>
          ))}
        </div>

        <div className={Styles.footer}>
          <span className={Styles.footerNote}>
            ✅ Verified operators &nbsp;|&nbsp; 🔒 Secure booking &nbsp;|&nbsp; 📍 Live tracking
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripTypeContainer;
