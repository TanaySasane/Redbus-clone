import React from "react";
import styles from "./BusServiceDetailsPage.module.css";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusOnIdThunk } from "../../../Redux/busService/action";
import { calculatePrice } from "../../../data/mockBusService";

const BusServiceDetailsPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const q = new URLSearchParams(search);
  const pickUp = q.get("pickUp") || "";
  const drop = q.get("drop") || "";
  const pickUpDate = q.get("pickUpDate") || "";
  const dropDate = q.get("dropDate") || "";
  const totalPassengers = q.get("totalPassengers") || "1";

  const bus = useSelector((s) => s.busServiceReducer.currentBus);
  const isLoading = useSelector((s) => s.busServiceReducer.isLoading);
  const currentCustomer = useSelector((s) => s.authReducer.currentCustomer);

  const [activeTab, setActiveTab] = React.useState("overview");

  React.useEffect(() => { dispatch(getBusOnIdThunk(id)); }, [id, dispatch]);

  if (isLoading) return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner} />
      <p>Loading vehicle details...</p>
    </div>
  );

  if (!bus || !bus._id) return (
    <div className={styles.loadingPage}><p>Vehicle not found.</p></div>
  );

  const { total, distance, pricePerKm } = calculatePrice(bus, totalPassengers, pickUp, drop);
  const days = pickUpDate && dropDate
    ? Math.max(1, Math.ceil((new Date(dropDate) - new Date(pickUpDate)) / 86400000))
    : 1;
  const perPax = Math.round(total / Math.max(1, parseInt(totalPassengers)));
  const gst = Math.round(total * 0.05);
  const driverAllowance = days * 300;
  const baseFare = total - gst - driverAllowance;

  const payUrl = `/payments-hire?pickUp=${pickUp}&drop=${drop}&pickUpDate=${pickUpDate}&dropDate=${dropDate}&totalPassengers=${totalPassengers}&price=${total}&email=${currentCustomer?.email || ""}`;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/bus-hire" className={styles.breadLink}>Bus Hire</Link>
        <span> › </span>
        <Link to={`/bus-hire-card?pickUp=${pickUp}&drop=${drop}&pickUpDate=${pickUpDate}&dropDate=${dropDate}&totalPassengers=${totalPassengers}`} className={styles.breadLink}>
          {pickUp} → {drop}
        </Link>
        <span> › </span>
        <span>{bus.vehicle}</span>
      </div>

      <div className={styles.layout}>
        {/* Left */}
        <div className={styles.left}>
          {/* Hero image */}
          <div className={styles.imgWrap}>
            <img src={bus.img} alt={bus.vehicle} className={styles.heroImg} />
            {bus.liveTracking && <span className={styles.liveTag}>📍 Live Tracking Available</span>}
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {["overview", "amenities", "policies", "reviews"].map(t => (
              <button
                key={t}
                className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className={styles.tabContent}>
              <h3 className={styles.sectionHead}>Vehicle Overview</h3>
              <div className={styles.overviewGrid}>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Vehicle</span><span className={styles.overValue}>{bus.vehicle}</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Operator</span><span className={styles.overValue}>{bus.operator}</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Type</span><span className={styles.overValue}>{bus.type}</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Capacity</span><span className={styles.overValue}>{bus.capacity} seats</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Rating</span><span className={styles.overValue}>⭐ {bus.rating} ({bus.reviews} reviews)</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Distance</span><span className={styles.overValue}>~{distance} km</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Rate</span><span className={styles.overValue}>₹{pricePerKm}/km</span></div>
                <div className={styles.overviewItem}><span className={styles.overLabel}>Live Tracking</span><span className={styles.overValue}>{bus.liveTracking ? "✅ Yes" : "❌ No"}</span></div>
              </div>

              <h3 className={styles.sectionHead}>Trip Summary</h3>
              <div className={styles.tripSummary}>
                <div className={styles.tripPoint}>
                  <div className={styles.tripDot} style={{ background: "#d84f57" }} />
                  <div><div className={styles.tripCity}>{pickUp}</div><div className={styles.tripDate}>{pickUpDate}</div></div>
                </div>
                <div className={styles.tripLine} />
                <div className={styles.tripPoint}>
                  <div className={styles.tripDot} style={{ background: "#38b87c" }} />
                  <div><div className={styles.tripCity}>{drop}</div><div className={styles.tripDate}>{dropDate}</div></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "amenities" && (
            <div className={styles.tabContent}>
              <h3 className={styles.sectionHead}>Amenities</h3>
              <div className={styles.amenityGrid}>
                {bus.amenities?.map(a => (
                  <div key={a} className={styles.amenityCard}>
                    <span className={styles.amenityEmoji}>
                      {a === "AC" ? "❄️" : a === "WiFi" ? "📶" : a === "Charging Point" ? "🔌" : a === "Music System" ? "🎵" : a === "TV" ? "📺" : a === "Blanket" ? "🛏️" : "✅"}
                    </span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div className={styles.tabContent}>
              <h3 className={styles.sectionHead}>Important Policies</h3>
              <ul className={styles.policyList}>
                <li>Trip cost is calculated on a minimum distance of {distance} km. Extra usage billed at ₹{pricePerKm}/km.</li>
                <li>Any km usage above billed distance must be paid to the operator at trip end.</li>
                <li>No refunds if vehicle is used for less than the booked distance.</li>
                <li>Night charges of ₹300/night apply for driving between 22:30 and 04:30.</li>
                <li>Smoking and alcohol consumption strictly prohibited.</li>
                <li>AC may be switched off in hilly areas.</li>
                <li>Free cancellation up to 48 hours before pickup.</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.tabContent}>
              <h3 className={styles.sectionHead}>Customer Reviews</h3>
              <div className={styles.ratingBig}>
                <span className={styles.ratingNum}>{bus.rating}</span>
                <div>
                  <div className={styles.stars}>{"⭐".repeat(Math.round(bus.rating))}</div>
                  <div className={styles.reviewCount}>{bus.reviews} reviews</div>
                </div>
              </div>
              {[
                { name: "Rahul S.", rating: 5, text: "Excellent service! Driver was punctual and vehicle was very clean.", date: "Mar 2026" },
                { name: "Priya M.", rating: 4, text: "Good experience overall. AC was working perfectly throughout the trip.", date: "Feb 2026" },
                { name: "Amit K.", rating: 5, text: "Best bus hire service. Will definitely book again for our next trip.", date: "Jan 2026" },
              ].map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>{r.name[0]}</div>
                    <div><div className={styles.reviewName}>{r.name}</div><div className={styles.reviewDate}>{r.date}</div></div>
                    <div className={styles.reviewRating}>{"⭐".repeat(r.rating)}</div>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — booking panel */}
        <div className={styles.right}>
          <div className={styles.bookingCard}>
            <div className={styles.bookingHeader}>Book This Vehicle</div>

            <div className={styles.fareBreakup}>
              <div className={styles.fareTitle}>Fare Breakup</div>
              <div className={styles.fareRow}><span>Base Fare ({distance} km × ₹{pricePerKm})</span><span>₹{baseFare.toLocaleString()}</span></div>
              <div className={styles.fareRow}><span>Driver Allowance ({days}d)</span><span>₹{driverAllowance}</span></div>
              <div className={styles.fareRow}><span>GST @ 5%</span><span>₹{gst}</span></div>
              <div className={styles.fareDivider} />
              <div className={`${styles.fareRow} ${styles.fareTotal}`}>
                <span>Total ({totalPassengers} pax)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className={styles.perPaxNote}>₹{perPax} per person</div>
            </div>

            <div className={styles.tripInfo}>
              <div className={styles.tripInfoRow}><span>📍 Pickup</span><strong>{pickUp}</strong></div>
              <div className={styles.tripInfoRow}><span>🎯 Drop</span><strong>{drop}</strong></div>
              <div className={styles.tripInfoRow}><span>📅 Date</span><strong>{pickUpDate}</strong></div>
              <div className={styles.tripInfoRow}><span>👥 Passengers</span><strong>{totalPassengers}</strong></div>
            </div>

            {currentCustomer ? (
              <Link to={payUrl} className={styles.bookBtn}>
                Book for ₹{total.toLocaleString()} →
              </Link>
            ) : (
              <button className={styles.bookBtn} onClick={() => history.push("/login")}>
                Login to Book →
              </button>
            )}

            <div className={styles.trustRow}>
              <span>🔒 Secure</span>
              <span>✅ Verified</span>
              <span>📞 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusServiceDetailsPage;
