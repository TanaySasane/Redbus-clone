import React from "react";
import styles from "./StaticPage.module.css";
import { useHistory } from "react-router-dom";

const VEHICLES = [
  { name:"9-Seater Tempo", capacity:9, img:"https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80", price:"₹2,500/day", features:["AC","Music System","Charging Point"] },
  { name:"12-Seater Tempo", capacity:12, img:"https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&q=80", price:"₹3,200/day", features:["AC","Music System","Charging Point","GPS"] },
  { name:"16-Seater Minivan", capacity:16, img:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80", price:"₹4,500/day", features:["AC","Music System","Charging Point","GPS","WiFi"] },
  { name:"20-Seater Mini Bus", capacity:20, img:"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&q=80", price:"₹6,000/day", features:["AC","Music System","Charging Point","GPS","WiFi","TV"] },
];

const TempoTravellers = () => {
  const history = useHistory();
  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#1447a0,#0d3580)" }}>
        <h1>Tempo Travellers</h1>
        <p>Perfect for groups of 9-20 people — comfortable, affordable, and reliable</p>
      </div>
      <div className={styles.container}>
        <div className={styles.statsRow}>
          {[["500+","Verified Vehicles"],["20+","Cities"],["4.5★","Avg Rating"],["24/7","Support"]].map(([v,l])=>(
            <div key={l} className={styles.statBox}><div className={styles.statVal}>{v}</div><div className={styles.statLbl}>{l}</div></div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Available Vehicles</h2>
          <div className={styles.cardGrid}>
            {VEHICLES.map(v=>(
              <div key={v.name} className={styles.card}>
                <img src={v.img} alt={v.name} style={{ width:"100%", height:"160px", objectFit:"cover", borderRadius:"8px", marginBottom:"12px" }} />
                <h3>{v.name}</h3>
                <p>👥 Up to {v.capacity} passengers</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", margin:"8px 0" }}>
                  {v.features.map(f=><span key={f} style={{ background:"#f0f0f0", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:600 }}>{f}</span>)}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"12px" }}>
                  <span style={{ fontSize:"16px", fontWeight:800, color:"#d84f57" }}>{v.price}</span>
                  <button className={styles.applyBtn} onClick={()=>history.push("/bus-hire")}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Why Choose Tempo Travellers?</h2>
          <div className={styles.cardGrid}>
            {[
              { icon:"💰", title:"Cost Effective", desc:"Split the cost among your group for a budget-friendly trip compared to multiple cabs." },
              { icon:"🛋️", title:"Comfortable", desc:"Spacious seating with AC, music, and charging points for a relaxed journey." },
              { icon:"🗺️", title:"Flexible Routes", desc:"Travel on your own schedule with door-to-door pickup and drop service." },
              { icon:"👨‍✈️", title:"Professional Drivers", desc:"All drivers are verified, licensed, and experienced with local routes." },
              { icon:"📍", title:"Live Tracking", desc:"Track your vehicle in real-time and share location with family." },
              { icon:"🔒", title:"Safe & Insured", desc:"All vehicles are insured and undergo regular safety inspections." },
            ].map(c=>(
              <div key={c.title} className={styles.card}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contactBanner}>
          <div className={styles.contactBannerText}>
            <h3>Ready to book a Tempo Traveller?</h3>
            <p>Get instant quotes from verified operators</p>
          </div>
          <button className={styles.applyBtn} onClick={()=>history.push("/bus-hire")}>Book Now →</button>
        </div>
      </div>
    </div>
  );
};
export default TempoTravellers;
