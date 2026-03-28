import React, { useState } from "react";
import styles from "./StaticPage.module.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ background:"linear-gradient(135deg,#38b87c,#2a9060)" }}>
        <h1>Contact Us</h1>
        <p>We're here to help 24/7</p>
      </div>
      <div className={styles.container}>
        <div className={styles.contactLayout}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <p>Have a question or need help? Reach out to us through any of the channels below.</p>
            {[
              { icon:"📞", title:"Phone Support", val:"1800-102-8747 (Toll Free)", sub:"Available 24/7" },
              { icon:"📧", title:"Email Support", val:"support@redbus.in", sub:"Response within 2 hours" },
              { icon:"💬", title:"Live Chat", val:"Chat with us on the app", sub:"Instant response" },
              { icon:"🏢", title:"Head Office", val:"Bangalore, Karnataka, India", sub:"Mon-Fri, 9AM-6PM" },
            ].map(c=>(
              <div key={c.title} className={styles.contactCard}>
                <div className={styles.contactIcon}>{c.icon}</div>
                <div><div className={styles.contactTitle}>{c.title}</div><div className={styles.contactVal}>{c.val}</div><div className={styles.contactSub}>{c.sub}</div></div>
              </div>
            ))}
          </div>

          <div className={styles.contactForm}>
            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 2 hours.</p>
                <button className={styles.applyBtn} onClick={()=>{ setSubmitted(false); setForm({name:"",email:"",phone:"",subject:"",message:""}); }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>Send a Message</h2>
                {[
                  { name:"name", label:"Full Name", type:"text", placeholder:"Your full name" },
                  { name:"email", label:"Email Address", type:"email", placeholder:"you@example.com" },
                  { name:"phone", label:"Phone (optional)", type:"tel", placeholder:"10-digit number" },
                  { name:"subject", label:"Subject", type:"text", placeholder:"How can we help?" },
                ].map(f=>(
                  <div key={f.name} className={styles.formField}>
                    <label className={styles.formLabel}>{f.label}</label>
                    <input className={`${styles.formInput} ${errors[f.name]?styles.inputError:""}`} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={e=>{ setForm({...form,[f.name]:e.target.value}); setErrors({...errors,[f.name]:""}); }} />
                    {errors[f.name] && <span className={styles.fieldError}>{errors[f.name]}</span>}
                  </div>
                ))}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea className={`${styles.formTextarea} ${errors.message?styles.inputError:""}`} rows={5} placeholder="Describe your issue or question..." value={form.message} onChange={e=>{ setForm({...form,message:e.target.value}); setErrors({...errors,message:""}); }} />
                  {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                </div>
                <button type="submit" className={styles.submitBtn}>Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
