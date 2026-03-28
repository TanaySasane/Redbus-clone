import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../../Redux/auth/actions";
import styles from "./Admin.module.css";

const CITIES = [
  "Mumbai","Delhi","Bangalore","Chennai","Hyderabad","Pune","Kolkata",
  "Ahmedabad","Jaipur","Lucknow","Surat","Nagpur","Indore","Bhopal",
  "Agra","Varanasi","Mysore","Coimbatore","Pondicherry","Vijayawada",
];

const STATS = [
  { label: "Total Bookings", value: "12,480", icon: "🎫", color: "#d84f57" },
  { label: "Active Routes", value: "248", icon: "🗺️", color: "#1447a0" },
  { label: "Registered Users", value: "5,320", icon: "👥", color: "#38b87c" },
  { label: "Revenue (₹)", value: "₹8.4L", icon: "💰", color: "#f5a623" },
];

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAdmin = useSelector((s) => s.authReducer.isAdmin);
  const currentCustomer = useSelector((s) => s.authReducer.currentCustomer);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cities, setCities] = useState(CITIES);
  const [newCity, setNewCity] = useState("");
  const [search, setSearch] = useState("");

  if (!isAdmin) {
    return (
      <div className={styles.accessDenied}>
        <div className={styles.accessCard}>
          <div className={styles.accessIcon}>🔒</div>
          <h2>Access Denied</h2>
          <p>You need admin privileges to view this page.</p>
          <Link to="/login" className={styles.accessBtn}>Login as Admin</Link>
        </div>
      </div>
    );
  }

  const handleAddCity = () => {
    const trimmed = newCity.trim();
    if (trimmed && !cities.includes(trimmed)) {
      setCities([...cities, trimmed]);
      setNewCity("");
    }
  };

  const handleDeleteCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  const filtered = cities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <img src="/logo.png" alt="redBus" className={styles.sidebarLogo} />
          <span className={styles.sidebarTitle}>Admin Panel</span>
        </div>
        <nav className={styles.nav}>
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "cities", icon: "🏙️", label: "Manage Cities" },
            { id: "routes", icon: "🗺️", label: "Routes" },
            { id: "users", icon: "👥", label: "Users" },
            { id: "bookings", icon: "🎫", label: "Bookings" },
          ].map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.navItem} onClick={() => history.push("/")}>
            <span className={styles.navIcon}>🏠</span> Back to Site
          </button>
          <button
            className={`${styles.navItem} ${styles.logoutBtn}`}
            onClick={() => { dispatch(logout()); history.push("/"); }}
          >
            <span className={styles.navIcon}>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "cities" && "Manage Cities"}
              {activeTab === "routes" && "Routes"}
              {activeTab === "users" && "Users"}
              {activeTab === "bookings" && "Bookings"}
            </h1>
            <p className={styles.pageSubtitle}>Welcome back, {currentCustomer?.name}</p>
          </div>
          <div className={styles.adminBadge}>👑 Admin</div>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <div className={styles.statsGrid}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.statCard} style={{ borderTop: `4px solid ${s.color}` }}>
                  <div className={styles.statIcon}>{s.icon}</div>
                  <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.quickActions}>
              <h3 className={styles.sectionTitle}>Quick Actions</h3>
              <div className={styles.actionGrid}>
                {[
                  { label: "Add City", icon: "🏙️", tab: "cities" },
                  { label: "View Routes", icon: "🗺️", tab: "routes" },
                  { label: "View Users", icon: "👥", tab: "users" },
                  { label: "View Bookings", icon: "🎫", tab: "bookings" },
                ].map((a) => (
                  <button key={a.label} className={styles.actionCard} onClick={() => setActiveTab(a.tab)}>
                    <span className={styles.actionIcon}>{a.icon}</span>
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cities */}
        {activeTab === "cities" && (
          <div>
            <div className={styles.toolbar}>
              <input
                className={styles.searchInput}
                placeholder="Search cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className={styles.addRow}>
                <input
                  className={styles.searchInput}
                  placeholder="New city name..."
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCity()}
                />
                <button className={styles.addBtn} onClick={handleAddCity}>+ Add City</button>
              </div>
            </div>
            <div className={styles.cityGrid}>
              {filtered.map((city) => (
                <div key={city} className={styles.cityCard}>
                  <span className={styles.cityIcon}>🏙️</span>
                  <span className={styles.cityName}>{city}</span>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteCity(city)}>✕</button>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className={styles.empty}>No cities found.</p>
              )}
            </div>
          </div>
        )}

        {/* Routes */}
        {activeTab === "routes" && (
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>🗺️</div>
            <h3>Routes Management</h3>
            <p>Manage bus routes between cities. Connect to backend to enable full CRUD.</p>
            <Link to="/select-bus?departure=Mumbai&arrival=Pune&date=2026-04-01" className={styles.previewBtn}>
              Preview Route Search →
            </Link>
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>👥</div>
            <h3>User Management</h3>
            <p>View and manage registered users. Connect to backend to see live data.</p>
          </div>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>🎫</div>
            <h3>Bookings Management</h3>
            <p>View all bookings and their statuses. Connect to backend to see live data.</p>
            <Link to="/my-profile" className={styles.previewBtn}>
              View My Bookings →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
