import React from 'react';
import Styles from './Subfooter.module.css';
import { useHistory } from 'react-router-dom';

const cities = ['Ahmedabad','Mumbai','Bangalore','Chennai','Pune','Hyderabad','Delhi','Kolkata'];
const tempos = ['Bangalore','Ahmedabad','Coimbatore','Vadodara','Kolkata','Delhi','Pune','Mumbai'];
const routes = [
  { from: 'Mumbai', to: 'Pune' },
  { from: 'Delhi', to: 'Agra' },
  { from: 'Bangalore', to: 'Mysore' },
  { from: 'Chennai', to: 'Pondicherry' },
  { from: 'Hyderabad', to: 'Vijayawada' },
  { from: 'Ahmedabad', to: 'Surat' },
];
const operators = ['APSRTC','KSRTC','MSRTC','TSRTC','VRL Travels','Orange Travels','SRS Travels'];

const SubFooter = () => {
  const history = useHistory();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={Styles.subFootercontainer}>
      <div className={Styles.inner}>
        <div className={Styles.column}>
          <h4 className={Styles.colHeading}>Bus Hire Cities</h4>
          {cities.map(c => (
            <p key={c} className={Styles.link}
              onClick={() => history.push('/bus-hire')}>
              Bus Hire in {c}
            </p>
          ))}
        </div>
        <div className={Styles.column}>
          <h4 className={Styles.colHeading}>Tempo Travellers</h4>
          {tempos.map(c => (
            <p key={c} className={Styles.link}
              onClick={() => history.push('/bus-hire-card')}>
              Tempo Travellers in {c}
            </p>
          ))}
        </div>
        <div className={Styles.column}>
          <h4 className={Styles.colHeading}>Popular Routes</h4>
          {routes.map(r => (
            <p key={r.from + r.to} className={Styles.link}
              onClick={() => history.push(`/select-bus?departure=${r.from}&arrival=${r.to}&date=${today}`)}>
              {r.from} to {r.to}
            </p>
          ))}
        </div>
        <div className={Styles.column}>
          <h4 className={Styles.colHeading}>Top Bus Operators</h4>
          {operators.map(o => (
            <p key={o} className={Styles.link}
              onClick={() => history.push('/')}>
              {o}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
