import React from "react";
import styles from "./StaticPage.module.css";

const AboutUs = () => (
  <div className={styles.page}>
    <div className={styles.hero} style={{ background: "linear-gradient(135deg,#d84f57,#c0393f)" }}>
      <h1>About redBus</h1>
      <p>India's largest online bus ticketing platform</p>
    </div>
    <div className={styles.container}>
      <div className={styles.statsRow}>
        {[["25M+","Happy Customers"],["2600+","Bus Operators"],["180M+","Tickets Booked"],["10+","Years of Trust"]].map(([v,l])=>(
          <div key={l} className={styles.statBox}><div className={styles.statVal}>{v}</div><div className={styles.statLbl}>{l}</div></div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Our Story</h2>
        <p>redBus was founded in 2006 with a simple mission — make bus travel easy, affordable, and accessible for everyone. What started as a small startup in Bangalore has grown into India's largest online bus ticketing platform, operating across India, Singapore, Malaysia, Indonesia, Peru, and Colombia.</p>
        <p>We connect millions of travellers with thousands of bus operators every day, offering a seamless booking experience through our website and mobile app.</p>
      </div>

      <div className={styles.section}>
        <h2>Our Mission</h2>
        <p>To make bus travel the most preferred mode of transportation by providing a safe, reliable, and affordable booking experience for every traveller.</p>
      </div>

      <div className={styles.cardGrid}>
        {[
          { icon:"🚌", title:"Largest Network", desc:"Over 2,600 bus operators and 60,000+ routes across India and Southeast Asia." },
          { icon:"🔒", title:"Safe & Secure", desc:"Safety+ certified buses with sanitized vehicles, verified drivers, and live tracking." },
          { icon:"💰", title:"Best Prices", desc:"Guaranteed lowest prices with exclusive deals and partner offers." },
          { icon:"📱", title:"Easy Booking", desc:"Book in under 2 minutes on web or mobile. Instant confirmation and e-tickets." },
          { icon:"🌍", title:"Global Presence", desc:"Operating in 6 countries with millions of happy customers worldwide." },
          { icon:"🎧", title:"24/7 Support", desc:"Round-the-clock customer support to help you at every step of your journey." },
        ].map(c=>(
          <div key={c.title} className={styles.card}>
            <div className={styles.cardIcon}>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Leadership Team</h2>
        <div className={styles.teamGrid}>
          {[
            { name:"Prakash Sangam", role:"CEO & Co-Founder", img:"https://img.icons8.com/color/96/user-male-circle.png" },
            { name:"Charan Padmaraju", role:"CTO & Co-Founder", img:"https://img.icons8.com/color/96/user-male-circle.png" },
            { name:"Sudhakar Pasupunuri", role:"COO & Co-Founder", img:"https://img.icons8.com/color/96/user-male-circle.png" },
          ].map(m=>(
            <div key={m.name} className={styles.teamCard}>
              <img src={m.img} alt={m.name} className={styles.teamImg} />
              <div className={styles.teamName}>{m.name}</div>
              <div className={styles.teamRole}>{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default AboutUs;
