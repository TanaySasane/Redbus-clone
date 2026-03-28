import React, { useState } from "react";
import styles from "./StaticPage.module.css";

const JOBS = [
  { title:"Senior Frontend Engineer", dept:"Engineering", loc:"Bangalore", type:"Full-time", exp:"3-5 years" },
  { title:"Backend Engineer (Node.js)", dept:"Engineering", loc:"Bangalore / Remote", type:"Full-time", exp:"2-4 years" },
  { title:"Product Manager", dept:"Product", loc:"Bangalore", type:"Full-time", exp:"4-6 years" },
  { title:"UI/UX Designer", dept:"Design", loc:"Bangalore", type:"Full-time", exp:"2-4 years" },
  { title:"Data Analyst", dept:"Analytics", loc:"Hyderabad", type:"Full-time", exp:"1-3 years" },
  { title:"Customer Support Executive", dept:"Operations", loc:"Pune", type:"Full-time", exp:"0-2 years" },
  { title:"Marketing Manager", dept:"Marketing", loc:"Mumbai", type:"Full-time", exp:"3-5 years" },
  { title:"DevOps Engineer", dept:"Engineering", loc:"Bangalore / Remote", type:"Full-time", exp:"2-4 years" },
];

const Careers = () => {
  const [filter, setFilter] = useState("All");
  const depts = ["All", ...Array.from(new Set(JOBS.map(j=>j.dept)))];
  const filtered = filter === "All" ? JOBS : JOBS.filter(j=>j.dept===filter);

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e)" }}>
        <h1>Careers at redBus</h1>
        <p>Join us in transforming how India travels</p>
      </div>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2>Why Work With Us?</h2>
          <div className={styles.cardGrid}>
            {[
              { icon:"🚀", title:"High Impact", desc:"Your work directly impacts millions of travellers every day." },
              { icon:"🧠", title:"Learn & Grow", desc:"Continuous learning programs, mentorship, and career development." },
              { icon:"🌍", title:"Global Exposure", desc:"Work on products used across 6 countries." },
              { icon:"💼", title:"Great Benefits", desc:"Competitive salary, health insurance, flexible work, and more." },
            ].map(c=>(
              <div key={c.title} className={styles.card}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Open Positions</h2>
          <div className={styles.filterRow}>
            {depts.map(d=>(
              <button key={d} className={`${styles.filterBtn} ${filter===d?styles.filterBtnActive:""}`} onClick={()=>setFilter(d)}>{d}</button>
            ))}
          </div>
          <div className={styles.jobList}>
            {filtered.map(j=>(
              <div key={j.title} className={styles.jobCard}>
                <div className={styles.jobLeft}>
                  <div className={styles.jobTitle}>{j.title}</div>
                  <div className={styles.jobMeta}>
                    <span>🏢 {j.dept}</span>
                    <span>📍 {j.loc}</span>
                    <span>⏱ {j.type}</span>
                    <span>💼 {j.exp}</span>
                  </div>
                </div>
                <button className={styles.applyBtn}>Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Careers;
