import React, { useState } from "react";
import styles from "./StaticPage.module.css";

const CATEGORIES = {
  "Booking": [
    { q:"How do I book a bus ticket?", a:"Enter your source, destination, and travel date on the home page. Browse available buses, select your preferred one, choose seats, fill passenger details, and complete payment." },
    { q:"Can I book tickets for someone else?", a:"Yes, you can book tickets for others. Enter their details in the passenger information section during booking." },
    { q:"How far in advance can I book?", a:"You can book up to 3 months in advance. We recommend booking early for popular routes and holiday seasons." },
    { q:"Is there a booking fee?", a:"redBus charges a small convenience fee per ticket which is displayed before payment. There are no hidden charges." },
  ],
  "Cancellation": [
    { q:"How do I cancel my ticket?", a:"Go to My Profile → My Trips, select the booking you want to cancel, and click Cancel. Refund will be processed as per the operator's cancellation policy." },
    { q:"When will I get my refund?", a:"Refunds are processed within 5-7 business days to your original payment method. UPI refunds are typically faster (1-2 days)." },
    { q:"What is the cancellation charge?", a:"Cancellation charges vary by operator and how far in advance you cancel. The charges are displayed at the time of booking." },
  ],
  "Payment": [
    { q:"What payment methods are accepted?", a:"We accept credit cards, debit cards, net banking, UPI (GPay, PhonePe, Paytm), and digital wallets." },
    { q:"Is my payment information secure?", a:"Yes, all payments are processed through secure, PCI-DSS compliant payment gateways with SSL encryption." },
    { q:"Can I pay in installments?", a:"Currently, we do not offer installment payment options. Full payment is required at the time of booking." },
  ],
  "Bus Hire": [
    { q:"How do I hire a bus?", a:"Go to Bus Hire, select your journey type (Outstation/Local/Airport), fill in your travel details, and browse available vehicles with quotes." },
    { q:"What vehicles are available for hire?", a:"We offer Volvo AC Sleepers, AC Seaters, Tempo Travellers (12-seater), Mini Buses (20-seater), and Luxury Coaches (49-seater)." },
    { q:"How is bus hire pricing calculated?", a:"Pricing is based on vehicle type, distance, number of passengers, and duration. A detailed fare breakup is shown before booking." },
  ],
  "Account": [
    { q:"How do I create an account?", a:"Click Register on the top right, enter your name, email, and password. You can also sign in with Google for quick access." },
    { q:"I forgot my password. What do I do?", a:"Click 'Forgot Password' on the login page and enter your registered email. You'll receive a reset link within a few minutes." },
    { q:"How do I view my booking history?", a:"Log in and go to My Profile → My Trips to see all your past and upcoming bookings." },
  ],
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("Booking");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const allFaqs = Object.entries(CATEGORIES).flatMap(([cat, faqs]) => faqs.map(f => ({ ...f, cat })));
  const searchResults = search.trim() ? allFaqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#d84f57,#c0393f)" }}>
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers to common questions</p>
        <input className={styles.heroSearch} placeholder="Search FAQs..." value={search} onChange={e=>{ setSearch(e.target.value); setOpenIndex(null); }} />
      </div>
      <div className={styles.container}>
        {search.trim() ? (
          <div className={styles.section}>
            <h2>{searchResults.length} result{searchResults.length!==1?"s":""} for "{search}"</h2>
            {searchResults.length===0 ? <p className={styles.noResults}>No FAQs found. Try different keywords.</p> : (
              searchResults.map((f,i)=>(
                <div key={i} className={`${styles.faqItem} ${openIndex===i?styles.faqItemOpen:""}`}>
                  <button className={styles.faqQ} onClick={()=>setOpenIndex(openIndex===i?null:i)}>
                    <span>{f.q}</span><span className={`${styles.faqArrow} ${openIndex===i?styles.faqArrowUp:""}`}>›</span>
                  </button>
                  {openIndex===i && <div className={styles.faqA}>{f.a}</div>}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={styles.faqLayout}>
            <div className={styles.faqSidebar}>
              {Object.keys(CATEGORIES).map(cat=>(
                <button key={cat} className={`${styles.faqCatBtn} ${activeCategory===cat?styles.faqCatBtnActive:""}`} onClick={()=>{ setActiveCategory(cat); setOpenIndex(null); }}>{cat}</button>
              ))}
            </div>
            <div className={styles.faqContent}>
              <h2>{activeCategory}</h2>
              {CATEGORIES[activeCategory].map((f,i)=>(
                <div key={i} className={`${styles.faqItem} ${openIndex===i?styles.faqItemOpen:""}`}>
                  <button className={styles.faqQ} onClick={()=>setOpenIndex(openIndex===i?null:i)}>
                    <span>{f.q}</span><span className={`${styles.faqArrow} ${openIndex===i?styles.faqArrowUp:""}`}>›</span>
                  </button>
                  {openIndex===i && <div className={styles.faqA}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FAQPage;
