import React from 'react';
import Styles from './FAQ.module.css';

const FAQS = [
  {
    q: "What is redBus Hire?",
    a: "redBus Hire helps you rent a vehicle with a driver from the best operators in your city. Choose from buses, tempo travellers, and SUVs for outstation, local, or airport trips."
  },
  {
    q: "How does it work?",
    a: "We ask a few simple questions about your trip — pickup city, destination, dates, and passengers. We then show you detailed quotations from verified operators so you get the best deal."
  },
  {
    q: "Which cities are you operational in?",
    a: "We are currently operational in Bangalore, Mumbai, Pune, Chennai, Hyderabad, Delhi, Ahmedabad, Madurai, Mysore, Visakhapatnam, Surat, Vadodara, Vijayawada, Coimbatore, Goa, Pondicherry, Jaipur, Guwahati, Kolkata and more."
  },
  {
    q: "What happens if the vehicle breaks down?",
    a: "Since we work with the best operators, vehicles are usually reliable. In case of a breakdown, it is the operator's responsibility to replace the vehicle during the journey at no extra cost to you."
  },
  {
    q: "How are kilometers calculated?",
    a: "Kilometers are calculated based on the return trip distance between the boarding point and destination. Any additional distance covered within the city between the garage and pickup point is also included."
  },
  {
    q: "What are the payment terms?",
    a: "You can confirm your reservation by paying 25% of the base fare as advance. The balance can be paid online up to 2 days before the journey or in cash to the operator at the time of boarding."
  },
  {
    q: "What if I need to cancel my trip?",
    a: "Free cancellation is available up to 48 hours before the pickup time. Cancellation policy is specific to each operator and is listed on the quotations page."
  },
  {
    q: "How are toll & taxes calculated?",
    a: "Tolls and interstate taxes are best estimates. If included in the fare, you'll be charged or reimbursed for any difference between actuals and estimates at the end of the trip."
  },
  {
    q: "Is live tracking available?",
    a: "Yes! Many of our vehicles come with live GPS tracking. You can share your live location with family and friends throughout the journey for added safety."
  },
  {
    q: "How long is customer care available?",
    a: "redBus customer care is available 24/7. Our friendly staff can assist with any bus hire queries, booking changes, or emergency support during your trip."
  },
  {
    q: "Are blankets and linens provided?",
    a: "Blanket availability depends on the vehicle type and operator. AC Sleeper buses typically include blankets. Please check the amenities listed on the vehicle card before booking."
  },
  {
    q: "What safety measures are in place?",
    a: "Under our Safety+ program: all vehicles are sanitized before and after every trip, drivers undergo temperature checks, masks are mandatory for all staff, and hand sanitizers are provided at boarding."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={Styles.container}>
      <div className={Styles.heading}>Frequently Asked Questions</div>
      <div className={Styles.subHeading}>Everything you need to know about Bus Hire</div>

      <div className={Styles.faqList}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`${Styles.faqItem} ${openIndex === i ? Styles.faqItemOpen : ""}`}
          >
            <button className={Styles.faqQuestion} onClick={() => toggle(i)}>
              <span className={Styles.qText}>{faq.q}</span>
              <span className={`${Styles.arrow} ${openIndex === i ? Styles.arrowUp : ""}`}>
                ›
              </span>
            </button>
            {openIndex === i && (
              <div className={Styles.faqAnswer}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
