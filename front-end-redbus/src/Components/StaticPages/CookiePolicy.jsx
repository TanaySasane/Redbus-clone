import React from "react";
import styles from "./StaticPage.module.css";

const CookiePolicy = () => (
  <div className={styles.page}>
    <div className={styles.hero} style={{ background:"linear-gradient(135deg,#38b87c,#2a9060)" }}>
      <h1>Cookie Policy</h1>
      <p>Last updated: March 29, 2026</p>
    </div>
    <div className={styles.container}>
      <div className={styles.legalIntro}>This Cookie Policy explains how redBus uses cookies and similar tracking technologies on our website and mobile applications.</div>
      {[
        { title:"What Are Cookies?", content:"Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience." },
        { title:"Types of Cookies We Use", content:"Essential Cookies: Required for the website to function (login sessions, shopping cart). Performance Cookies: Help us understand how visitors use our site. Functional Cookies: Remember your preferences like language and location. Marketing Cookies: Used to show relevant advertisements." },
        { title:"Essential Cookies", content:"These cookies are necessary for the website to function and cannot be switched off. They include session cookies for login, security tokens, and load balancing cookies." },
        { title:"Analytics Cookies", content:"We use Google Analytics and similar tools to understand how users interact with our platform. This helps us improve our services. Data collected is anonymized." },
        { title:"Marketing Cookies", content:"We use these cookies to show you relevant ads on other websites. You can opt out of personalized advertising through your browser settings or our cookie preferences." },
        { title:"Managing Cookies", content:"You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website. Most browsers allow you to block or delete cookies." },
        { title:"Third-Party Cookies", content:"Some cookies are placed by third-party services (Google, Facebook, payment processors). These are governed by the respective third parties' privacy policies." },
        { title:"Updates to This Policy", content:"We may update this Cookie Policy from time to time. We will notify you of significant changes by posting a notice on our website." },
      ].map(s=>(
        <div key={s.title} className={styles.legalSection}>
          <h3 className={styles.legalTitle}>{s.title}</h3>
          <p className={styles.legalText}>{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);
export default CookiePolicy;
