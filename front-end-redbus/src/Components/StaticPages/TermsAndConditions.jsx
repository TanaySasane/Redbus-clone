import React from "react";
import styles from "./StaticPage.module.css";

const sections = [
  { title:"1. Acceptance of Terms", content:"By accessing or using the redBus platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services." },
  { title:"2. Use of Services", content:"redBus provides an online platform for booking bus tickets and hiring vehicles. You agree to use our services only for lawful purposes and in accordance with these terms. You must be at least 18 years old to make a booking." },
  { title:"3. Booking & Payment", content:"All bookings are subject to availability. Payment must be made in full at the time of booking unless otherwise specified. We accept credit cards, debit cards, net banking, UPI, and wallets. All prices are inclusive of applicable taxes." },
  { title:"4. Cancellation & Refunds", content:"Cancellation policies vary by operator and are displayed at the time of booking. Refunds for eligible cancellations will be processed within 5-7 business days to the original payment method. Service charges may be non-refundable." },
  { title:"5. User Responsibilities", content:"You are responsible for providing accurate information during booking. You must carry a valid ID proof during travel. redBus is not responsible for delays, cancellations, or changes made by bus operators." },
  { title:"6. Intellectual Property", content:"All content on the redBus platform, including logos, text, images, and software, is the property of redBus and is protected by applicable intellectual property laws." },
  { title:"7. Privacy", content:"Your use of our services is also governed by our Privacy Policy. We collect and process personal data as described in our Privacy Policy to provide and improve our services." },
  { title:"8. Limitation of Liability", content:"redBus shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid for the specific booking in question." },
  { title:"9. Changes to Terms", content:"We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the new terms." },
  { title:"10. Governing Law", content:"These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India." },
];

const TermsAndConditions = () => (
  <div className={styles.page}>
    <div className={styles.hero} style={{ background:"linear-gradient(135deg,#333,#555)" }}>
      <h1>Terms & Conditions</h1>
      <p>Last updated: March 29, 2026</p>
    </div>
    <div className={styles.container}>
      <div className={styles.legalIntro}>Please read these Terms and Conditions carefully before using the redBus platform. These terms constitute a legally binding agreement between you and redBus.</div>
      {sections.map(s=>(
        <div key={s.title} className={styles.legalSection}>
          <h3 className={styles.legalTitle}>{s.title}</h3>
          <p className={styles.legalText}>{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);
export default TermsAndConditions;
