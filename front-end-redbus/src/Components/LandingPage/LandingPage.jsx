import React from "react";
import Services from "./Benefits/Services";
import BusTracker from "./BusTracker/BusTracker";
import Coupon from "./CouponSection/Coupon";
import Safety from "./SafetySection/Safety";
import styles from "./LandingPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../Redux/routes/action";
import Awards from "./Awards and Recognition/Awards";
import GlobalPresence from "./Global Presence/GlobalPresence";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import RoutesModal from "./RoutesModal";

// Full city list — always available even if backend is down
const ALL_CITIES = [
  "Agra","Ahmedabad","Allahabad","Amritsar","Aurangabad","Bangalore",
  "Bhopal","Bhubaneswar","Chandigarh","Chennai","Coimbatore","Delhi",
  "Faizabad","Goa","Guwahati","Gwalior","Hyderabad","Indore","Jaipur",
  "Jodhpur","Kanpur","Kochi","Kolkata","Lucknow","Ludhiana","Madurai",
  "Mangalore","Mumbai","Mysore","Nagpur","Nashik","Patna","Pondicherry",
  "Pune","Raipur","Rajkot","Ranchi","Surat","Thiruvananthapuram",
  "Udaipur","Vadodara","Varanasi","Vijayawada","Visakhapatnam",
];

const useStyles = makeStyles((theme) => ({
  modal: { display: "flex", alignItems: "center", justifyContent: "center" },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Highlight matching part of city name
const HighlightMatch = ({ text, query }) => {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong style={{ color: "#d84f57" }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </span>
  );
};

const LandingPage = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [departure, setDeparture] = React.useState("");
  const [arrival, setArrival] = React.useState("");
  const [date, setDate] = React.useState("");
  const [dateDisplay, setDateDisplay] = React.useState("");
  const [filteredSources, setFilteredSources] = React.useState([]);
  const [filteredDestinations, setFilteredDestinations] = React.useState([]);
  const [showDep, setShowDep] = React.useState(false);
  const [showArr, setShowArr] = React.useState(false);
  const [hoveredDep, setHoveredDep] = React.useState(-1);
  const [hoveredArr, setHoveredArr] = React.useState(-1);

  const history = useHistory();
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routesReducer.routes);

  React.useEffect(() => { dispatch(getRoutes()); }, [dispatch]);

  // Build city list from backend routes + static list
  const getCities = (type) => {
    let cities = [...ALL_CITIES];
    if (routes && routes.length > 0) {
      routes.forEach((route) => {
        const loc = type === "departure" ? route.departureLocation : route.arrivalLocation;
        if (loc) {
          cities.push(loc.name);
          if (loc.subLocations) cities.push(...loc.subLocations);
        }
      });
    }
    return Array.from(new Set(cities)).sort();
  };

  const onDepartureChange = (e) => {
    const value = e.target.value;
    setDeparture(value);
    setHoveredDep(-1);
    if (value.trim()) {
      const filtered = getCities("departure").filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      // Also include cities that contain the value (starts-with first)
      const contains = getCities("departure").filter(
        (c) => !c.toLowerCase().startsWith(value.toLowerCase()) &&
               c.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSources([...filtered, ...contains].slice(0, 8));
      setShowDep(true);
    } else {
      setShowDep(false);
    }
  };

  const onArrivalChange = (e) => {
    const value = e.target.value;
    setArrival(value);
    setHoveredArr(-1);
    if (value.trim()) {
      const filtered = getCities("arrival").filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      const contains = getCities("arrival").filter(
        (c) => !c.toLowerCase().startsWith(value.toLowerCase()) &&
               c.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations([...filtered, ...contains].slice(0, 8));
      setShowArr(true);
    } else {
      setShowArr(false);
    }
  };

  const onDateChange = (e) => {
    let raw = e.target.value.replace(/\D/g, ""); // digits only
    let formatted = "";
    if (raw.length >= 1) formatted = raw.substring(0, 2);
    if (raw.length >= 3) formatted += " / " + raw.substring(2, 4);
    if (raw.length >= 5) formatted += " / " + raw.substring(4, 8);
    setDateDisplay(formatted);

    // Convert to yyyy-mm-dd for internal use when fully entered
    if (raw.length === 8) {
      const dd = raw.substring(0, 2);
      const mm = raw.substring(2, 4);
      const yyyy = raw.substring(4, 8);
      setDate(`${yyyy}-${mm}-${dd}`);
    } else {
      setDate("");
    }
  };

  const handleSearch = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!departure.trim()) {
      alert("Please enter a departure city.");
      return;
    }
    if (!arrival.trim()) {
      alert("Please enter a destination city.");
      return;
    }
    if (departure.trim().toLowerCase() === arrival.trim().toLowerCase()) {
      alert("Departure and destination cannot be the same city.");
      return;
    }
    if (!date) {
      alert("Please select a travel date.");
      return;
    }
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Travel date cannot be in the past. Please select today or a future date.");
      return;
    }
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (selectedDate > maxDate) {
      alert("You can only book up to 3 months in advance.");
      return;
    }
    history.push(`/select-bus?departure=${departure.trim()}&arrival=${arrival.trim()}&date=${date}`);
  };

  return (
    <div>
      <div className={styles.LandingPage__mainBanner}>
        <div className={styles.LandingPage__form}>

          {/* Departure */}
          <div className={styles.LandingPage__form__departure}>
            <div className={styles.LandingPage__form__departure__input}>
              <span className={styles.inputIcon}>📍</span>
              <input
                type="text"
                placeholder="From (e.g. Mumbai)"
                value={departure}
                onChange={onDepartureChange}
                onFocus={() => departure && setShowDep(true)}
                onBlur={() => setTimeout(() => setShowDep(false), 150)}
                autoComplete="off"
              />
            </div>
            {showDep && filteredSources.length > 0 && (
              <div className={styles.LandingPage__form__departure__dropdown}>
                <ul>
                  {filteredSources.map((source, i) => (
                    <li
                      key={source}
                      className={hoveredDep === i ? styles.dropdownItemHovered : styles.dropdownItem}
                      onMouseEnter={() => setHoveredDep(i)}
                      onMouseLeave={() => setHoveredDep(-1)}
                      onMouseDown={() => {
                        setDeparture(source);
                        setShowDep(false);
                      }}
                    >
                      <span className={styles.dropIcon}>🏙️</span>
                      <HighlightMatch text={source} query={departure} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Arrival */}
          <div className={styles.LandingPage__form__arrival}>
            <div className={styles.LandingPage__form__arrival__input}>
              <span className={styles.inputIcon}>🎯</span>
              <input
                type="text"
                placeholder="To (e.g. Pune)"
                value={arrival}
                onChange={onArrivalChange}
                onFocus={() => arrival && setShowArr(true)}
                onBlur={() => setTimeout(() => setShowArr(false), 150)}
                autoComplete="off"
              />
            </div>
            {showArr && filteredDestinations.length > 0 && (
              <div className={styles.LandingPage__form__arrival__dropdown}>
                <ul>
                  {filteredDestinations.map((dest, i) => (
                    <li
                      key={dest}
                      className={hoveredArr === i ? styles.dropdownItemHovered : styles.dropdownItem}
                      onMouseEnter={() => setHoveredArr(i)}
                      onMouseLeave={() => setHoveredArr(-1)}
                      onMouseDown={() => {
                        setArrival(dest);
                        setShowArr(false);
                      }}
                    >
                      <span className={styles.dropIcon}>🏙️</span>
                      <HighlightMatch text={dest} query={arrival} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Date */}
          <div className={styles.LandingPage__form__date}>
            <span className={styles.inputIcon}>📅</span>
            <input
              type="text"
              placeholder="DD / MM / YYYY"
              value={dateDisplay}
              maxLength={10}
              onChange={onDateChange}
              autoComplete="off"
              className={styles.dateInput}
            />
          </div>

          {/* Button */}
          <div className={styles.LandingPage__form__button}>
            <button onClick={handleSearch}>Search Bus</button>
          </div>

        </div>
      </div>

      <Modal
        className={classes.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <RoutesModal />
          </div>
        </Fade>
      </Modal>

      <Coupon />
      <Safety />
      <BusTracker />
      <Services />
      <Awards />
      <GlobalPresence />
    </div>
  );
};

export default LandingPage;
