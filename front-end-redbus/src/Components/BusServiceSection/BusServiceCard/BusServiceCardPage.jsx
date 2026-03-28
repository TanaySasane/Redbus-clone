import React from "react";
import styles from "./BusServiceCard.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusData2 } from "../../../Redux/busService/action";
import { calculatePrice } from "../../../data/mockBusService";

const BusServiceCardPage = () => {
  const dispatch = useDispatch();
  const busList = useSelector((s) => s.busServiceReducer.busList);
  const isLoading = useSelector((s) => s.busServiceReducer.isLoading);

  const { search } = useLocation();
  const q = new URLSearchParams(search);
  const pickUp = q.get("pickUp") || "";
  const drop = q.get("drop") || "";
  const pickUpDate = q.get("pickUpDate") || "";
  const dropDate = q.get("dropDate") || "";
  const totalPassengers = q.get("totalPassengers") || "1";

  const [filter, setFilter] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("price");

  React.useEffect(() => {
    dispatch(getBusData2(pickUp, drop, totalPassengers));
  }, [dispatch, pickUp, drop, totalPassengers]);

  const types = ["All", "AC Sleeper", "AC Seater", "Non-AC Seater", "Non-AC Sleeper"];

  let filtered = busList.filter(b => filter === "All" || b.type === filter);
  filtered = [...filtered].sort((a, b) => {
    const pa = calculatePrice(a, totalPassengers, pickUp, drop).total;
    const pb = calculatePrice(b, totalPassengers, pickUp, drop).total;
    if (sortBy === "price") return pa - pb;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "capacity") return b.capacity - a.capacity;
    return 0;
  });

  const days = pickUpDate && dropDate
    ? Math.max(1, Math.ceil((new Date(dropDate) - new Date(pickUpDate)) / 86400000))
    : 1;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.routeTitle}>
            {pickUp || "—"} <span className={styles.arrow}>→</span> {drop || "—"}
          </h2>
          <div className={styles.routeMeta}>
            {pickUpDate && <span>📅 {pickUpDate}</span>}
            {dropDate && <span> → {dropDate}</span>}
            {totalPassengers && <span> · 👥 {totalPassengers} passengers</span>}
            {days > 1 && <span> · {days} days</span>}
          </div>
        </div>
        <div className={styles.headerRight}>
          {isLoading ? (
            <span className={styles.loadingBadge}>Loading...</span>
          ) : (
            <span className={styles.countBadge}>{filtered.length} vehicles found</span>
          )}
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Sidebar filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterCard}>
            <div className={styles.filterTitle}>🔍 Filter by Type</div>
            {types.map(t => (
              <button
                key={t}
                className={`${styles.filterBtn} ${filter === t ? styles.filterBtnActive : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterTitle}>↕ Sort by</div>
            {[
              { val: "price", label: "Price: Low to High" },
              { val: "rating", label: "Rating: High to Low" },
              { val: "capacity", label: "Capacity: High to Low" },
            ].map(s => (
              <button
                key={s.val}
                className={`${styles.filterBtn} ${sortBy === s.val ? styles.filterBtnActive : ""}`}
                onClick={() => setSortBy(s.val)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className={styles.safetyCard}>
            <img src="https://s3.rdbuz.com/Images/webplatform/measures/safetyplus.svg" alt="safety" className={styles.safetyIcon} />
            <div className={styles.safetyTitle}>Safety+</div>
            <ul className={styles.safetyList}>
              <li>✅ Sanitized vehicles</li>
              <li>✅ Verified drivers</li>
              <li>✅ Masks mandatory</li>
              <li>✅ Temperature checks</li>
              <li>✅ Deep cleaning</li>
            </ul>
          </div>
        </aside>

        {/* Cards */}
        <div className={styles.cardsArea}>
          {isLoading && (
            <div className={styles.loadingState}>
              {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🚌</div>
              <h3>No vehicles found</h3>
              <p>Try changing the filter or passenger count.</p>
            </div>
          )}

          {!isLoading && filtered.map(bus => {
            const { total, distance } = calculatePrice(bus, totalPassengers, pickUp, drop);
            const perPax = Math.round(total / Math.max(1, parseInt(totalPassengers)));
            return (
              <div key={bus._id} className={styles.card}>
                <div className={styles.cardImg}>
                  <img src={bus.img} alt={bus.vehicle} />
                  {bus.liveTracking && <span className={styles.liveTag}>📍 Live Tracking</span>}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.vehicleName}>{bus.vehicle}</h3>
                      <div className={styles.operatorName}>by {bus.operator}</div>
                      <div className={styles.typeBadge}>{bus.type}</div>
                    </div>
                    <div className={styles.priceBox}>
                      <div className={styles.totalPrice}>₹{total.toLocaleString()}</div>
                      <div className={styles.perPax}>₹{perPax}/person</div>
                      <div className={styles.distanceNote}>{distance} km · {days} day{days > 1 ? "s" : ""}</div>
                    </div>
                  </div>

                  <div className={styles.cardMeta}>
                    <span className={styles.ratingBadge}>⭐ {bus.rating}</span>
                    <span className={styles.reviewCount}>({bus.reviews} reviews)</span>
                    <span className={styles.capacity}>👥 {bus.capacity} seats</span>
                  </div>

                  <div className={styles.amenities}>
                    {bus.amenities.map(a => (
                      <span key={a} className={styles.amenityTag}>{a}</span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.highlights}>
                      {bus.liveTracking && <span>📍 Live Track</span>}
                      <span>🔒 Secure Booking</span>
                      <span>✅ Verified</span>
                    </div>
                    <Link
                      to={`/bus-hire-details/${bus._id}?pickUp=${pickUp}&drop=${drop}&pickUpDate=${pickUpDate}&dropDate=${dropDate}&totalPassengers=${totalPassengers}&price=${total}`}
                      className={styles.viewBtn}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusServiceCardPage;
