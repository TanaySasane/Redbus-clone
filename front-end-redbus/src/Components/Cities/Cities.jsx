import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Cities.module.css";

const today = new Date().toISOString().split("T")[0];

const POPULAR_ROUTES = [
  { from: "Mumbai",    to: "Pune",        duration: "3h",  price: "₹250" },
  { from: "Delhi",     to: "Agra",        duration: "4h",  price: "₹300" },
  { from: "Bangalore", to: "Mysore",      duration: "3h",  price: "₹200" },
  { from: "Chennai",   to: "Pondicherry", duration: "3h",  price: "₹220" },
  { from: "Hyderabad", to: "Vijayawada",  duration: "5h",  price: "₹350" },
  { from: "Ahmedabad", to: "Surat",       duration: "3h",  price: "₹180" },
  { from: "Jaipur",    to: "Delhi",       duration: "5h",  price: "₹400" },
  { from: "Lucknow",   to: "Delhi",       duration: "8h",  price: "₹500" },
  { from: "Pune",      to: "Goa",         duration: "8h",  price: "₹600" },
  { from: "Mysore",    to: "Bangalore",   duration: "3h",  price: "₹200" },
  { from: "Indore",    to: "Bhopal",      duration: "3h",  price: "₹150" },
  { from: "Varanasi",  to: "Lucknow",     duration: "5h",  price: "₹280" },
];

const CITIES = [
  "Mumbai","Delhi","Bangalore","Chennai","Hyderabad","Pune","Kolkata",
  "Ahmedabad","Jaipur","Lucknow","Surat","Nagpur","Indore","Bhopal",
  "Agra","Varanasi","Mysore","Coimbatore","Pondicherry","Vijayawada",
];

const Cities = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Cities</h1>
        <p className={styles.heroSub}>Find buses between 20+ cities across India</p>
        <input
          className={styles.heroSearch}
          placeholder="Search a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Popular Routes</h2>
        <div className={styles.routeGrid}>
          {POPULAR_ROUTES.map((r) => (
            <div
              key={r.from + r.to}
              className={styles.routeCard}
              onClick={() => history.push(`/select-bus?departure=${r.from}&arrival=${r.to}&date=${today}`)}
            >
              <div className={styles.routeFrom}>{r.from}</div>
              <div className={styles.routeArrow}>→</div>
              <div className={styles.routeTo}>{r.to}</div>
              <div className={styles.routeMeta}>
                <span>⏱ {r.duration}</span>
                <span className={styles.routePrice}>{r.price}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle} style={{ marginTop: 48 }}>All Cities</h2>
        <div className={styles.cityGrid}>
          {filtered.map((city) => (
            <div
              key={city}
              className={styles.cityCard}
              onClick={() => history.push(`/select-bus?departure=${city}&arrival=&date=${today}`)}
            >
              <span className={styles.cityIcon}>🏙️</span>
              <span className={styles.cityName}>{city}</span>
              <span className={styles.cityArrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
