import React from "react";
import styles from "./StaticPage.module.css";

const sections = [
  { title:"Information We Collect", content:"We collect information you provide directly (name, email, phone, payment details), information from your use of our services (search history, bookings, device info), and information from third parties (Google login, payment processors)." },
  { title:"How We Use Your Information", content:"We use your information to process bookings, send booking confirmations and updates, provide customer support, improve our services, send promotional offers (with your consent), and comply with legal obligations." },
  { title:"Information Sharing", content:"We share your information with bus operators to fulfill your booking, payment processors to process payments, and service providers who assist our operations. We do not sell your personal information to third parties." },
  { title:"Data Security", content:"We implement industry-standard security measures including SSL encryption, secure data storage, and regular security audits to protect your personal information from unauthorized access." },
  { title:"Cookies", content:"We use cookies to enhance your experience, remember your preferences, and analyze usage patterns. You can control cookie settings through your browser. See our Cookie Policy for details." },
  { title:"Your Rights", content:"You have the right to access, correct, or delete your personal data. You can opt out of marketing communications at any time. To exercise these rights, contact us at privacy@redbus.in." },
  { title:"Data Retention", content:"We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Booking data is retained for 7 years for tax and legal purposes." },
  { title:"Contact Us", content:"For privacy-related queries, contact our Data Protection Officer at privacy@redbus.in or write to us at redBus, Bangalore, Karnataka, India." },
];

const PrivacyPolicy = () => (
  <div className={styles.page}>
    <div className={styles.hero} style={{ background:"linear-gradient(135deg,#1447a0,#0d3580)" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: March 29, 2026</p>
    </div>
    <div className={styles.container}>
      <div className={styles.legalIntro}>At redBus, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.</div>
      {sections.map(s=>(
        <div key={s.title} className={styles.legalSection}>
          <h3 className={styles.legalTitle}>{s.title}</h3>
          <p className={styles.legalText}>{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);
export default PrivacyPolicy;
