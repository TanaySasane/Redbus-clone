import React from 'react';
import Styles from './busHireFooter.module.css';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

const bookLinks = [
  { label: 'Bus Tickets', to: '/' },
  { label: 'Bus Hire', to: '/bus-hire' },
  { label: 'Cities', to: '/cities' },
  { label: 'Tempo Travellers', to: '/tempo-travellers' },
  { label: 'rPool', to: '/' },
];
const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Admin Panel', to: '/admin' },
];
const supportLinks = [
  { label: 'Help Center', to: '/help' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' },
  { label: 'FAQ', to: '/faq' },
];
const globalLinks = [
  { label: 'India', to: '/cities' },
  { label: 'Singapore', to: '/' },
  { label: 'Malaysia', to: '/' },
  { label: 'Indonesia', to: '/' },
  { label: 'Peru', to: '/' },
  { label: 'Colombia', to: '/' },
];

const BusHireFooter = () => {
  const history = useHistory();
  return (
    <footer className={Styles.footer}>
      <div className={Styles.inner}>
        <div className={Styles.brandCol}>
          <div className={Styles.logo} onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="redBus" className={Styles.logoImg} />
            <span className={Styles.logoText}>redBus</span>
          </div>
          <p className={Styles.tagline}>
            India largest online bus ticketing platform trusted by over 25 million happy customers.
          </p>
          <div className={Styles.socialRow}>
            <a href="https://github.com/nitansh11/redbus" target="_blank" rel="noreferrer" className={Styles.socialIcon}><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={Styles.socialIcon}><FaLinkedin /></a>
            <a href="mailto:info@redbus.in" className={Styles.socialIcon}><MdEmail /></a>
          </div>
        </div>
        <div className={Styles.col}>
          <h4 className={Styles.colHeading}>Book</h4>
          {bookLinks.map(({ label, to }) => (
            <Link key={label} to={to} className={Styles.colLink}>{label}</Link>
          ))}
        </div>
        <div className={Styles.col}>
          <h4 className={Styles.colHeading}>Company</h4>
          {companyLinks.map(({ label, to }) => (
            <Link key={label} to={to} className={Styles.colLink}>{label}</Link>
          ))}
        </div>
        <div className={Styles.col}>
          <h4 className={Styles.colHeading}>Support</h4>
          {supportLinks.map(({ label, to }) => (
            <Link key={label} to={to} className={Styles.colLink}>{label}</Link>
          ))}
        </div>
        <div className={Styles.col}>
          <h4 className={Styles.colHeading}>Global Sites</h4>
          {globalLinks.map(({ label, to }) => (
            <Link key={label} to={to} className={Styles.colLink}>{label}</Link>
          ))}
        </div>
      </div>
      <div className={Styles.bottomBar}>
        <div className={Styles.bottomInner}>
          <p className={Styles.copyright}>2026 Tanay Sasane. All rights reserved.</p>
          <p className={Styles.devCredit}>
            Designed and Developed with <FaHeart className={Styles.heart} /> by <span className={Styles.devName}>Tanay Sasane</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BusHireFooter;
