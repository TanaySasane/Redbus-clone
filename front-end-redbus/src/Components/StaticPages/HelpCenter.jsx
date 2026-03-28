import React, { useState } from "react";
import styles from "./StaticPage.module.css";
import { useHistory } from "react-router-dom";

const TOPICS = [
  { icon:"🎫", title:"Booking & Tickets", items:["How to book a bus ticket","How to download my ticket","How to reschedule my ticket","How to cancel my booking"] },
  { icon:"💳", title:"Payments & Refunds", items:["Payment methods accepted","When will I get my refund","How to apply offer code","GST invoice for bookings"] },
  { icon:"🚌", title:"Bus Hire", items:["How to hire a bus","What vehicles are available","How is pricing calculated","Cancellation policy for bus hire"] },
  { icon:"👤", title:"Account & Profile", items:["How to create an account","How to update profile","How to view my trips","How to change password"] },
  { icon:"📍", title:"Tracking & Safety", items:["How to track my bus","What is Safety+ program","How to share live location","Emergency contact during trip"] },
  { icon:"🌍", title:"International Travel", items:["Booking in Singapore","Booking in Malaysia","Booking in Indonesia","International payment methods"] },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openTopic, setOpenTopic] = useState(null);
  const history = useHistory();

  const allItems = TOPICS.flatMap(t => t.items.map(i => ({ topic: t.title, item: i })));
  const searchResults = search.trim() ? allItems.filter(a => a.item.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#f5a623,#e8920a)" }}>
        <h1>Help Center</h1>
        <p>Find answers to your questions</p>
        <input className={styles.heroSearch} placeholder="Search for help..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className={styles.container}>
        {search.trim() ? (
          <div className={styles.section}>
            <h2>Search Results for "{search}"</h2>
            {searchResults.length === 0 ? (
              <p className={styles.noResults}>No results found. <button className={styles.linkBtn} onClick={()=>history.push("/contact")}>Contact Support →</button></p>
            ) : (
              <div className={styles.searchResults}>
                {searchResults.map((r,i)=>(
                  <div key={i} className={styles.searchResultItem}>
                    <span className={styles.resultTopic}>{r.topic}</span>
                    <span className={styles.resultItem}>{r.item}</span>
                    <span className={styles.resultArrow}>→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.section}>
              <h2>Browse by Topic</h2>
              <div className={styles.helpGrid}>
                {TOPICS.map((t,i)=>(
                  <div key={t.title} className={`${styles.helpCard} ${openTopic===i?styles.helpCardOpen:""}`}>
                    <div className={styles.helpCardHeader} onClick={()=>setOpenTopic(openTopic===i?null:i)}>
                      <span className={styles.helpIcon}>{t.icon}</span>
                      <span className={styles.helpTitle}>{t.title}</span>
                      <span className={styles.helpArrow}>{openTopic===i?"▲":"▼"}</span>
                    </div>
                    {openTopic===i && (
                      <ul className={styles.helpItems}>
                        {t.items.map(item=>(
                          <li key={item} className={styles.helpItem}>{item} <span className={styles.helpItemArrow}>→</span></li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.contactBanner}>
              <div className={styles.contactBannerText}>
                <h3>Still need help?</h3>
                <p>Our support team is available 24/7</p>
              </div>
              <button className={styles.applyBtn} onClick={()=>history.push("/contact")}>Contact Support →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HelpCenter;
