import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../Components/LandingPage/LandingPage";
import SelectBus from "../Components/SelectBus/SelectBus";
import Profile from "../Components/Profile Page/Profile";
import Payment from "../Components/Payment Page/Payment";
import BusBookingForm from "../Components/Bus Booking Form/BusBookingForm";
import BusHire from "../Components/Bus hire Main Page/BusHire";
import BusServiceCardPage from "../Components/BusServiceSection/BusServiceCard/BusServiceCardPage";
import BusServiceDetailsPage from "../Components/BusServiceSection/BusServiceDetails/BusServiceDetailsPage";
import BusServicePaymentPage from "../Components/BusServiceSection/BusServicePayment/BusServivePaymentPage";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Admin from "../Components/Admin/Admin";
import Cities from "../Components/Cities/Cities";
import AboutUs from "../Components/StaticPages/AboutUs";
import Careers from "../Components/StaticPages/Careers";
import Blog from "../Components/StaticPages/Blog";
import ContactUs from "../Components/StaticPages/ContactUs";
import HelpCenter from "../Components/StaticPages/HelpCenter";
import TermsAndConditions from "../Components/StaticPages/TermsAndConditions";
import PrivacyPolicy from "../Components/StaticPages/PrivacyPolicy";
import CookiePolicy from "../Components/StaticPages/CookiePolicy";
import FAQPage from "../Components/StaticPages/FAQPage";
import TempoTravellers from "../Components/StaticPages/TempoTravellers";
import Error from "../Components/Error/Error";

const Routes = () => (
  <Switch>
    <Route path="/" exact><LandingPage /></Route>
    <Route path="/bus-tickets" exact><LandingPage /></Route>
    <Route path="/cities" exact><Cities /></Route>
    <Route path="/select-bus" exact><SelectBus /></Route>
    <Route path="/my-profile" exact><Profile /></Route>
    <Route path="/payment-page" exact><Payment /></Route>
    <Route path="/booking-form" exact><BusBookingForm /></Route>
    <Route path="/bus-hire" exact><BusHire /></Route>
    <Route path="/bus-hire-card" exact><BusServiceCardPage /></Route>
    <Route path="/bus-hire-details/:id" exact><BusServiceDetailsPage /></Route>
    <Route path="/payments-hire" exact><BusServicePaymentPage /></Route>
    <Route path="/tempo-travellers" exact><TempoTravellers /></Route>
    <Route path="/login" exact><Login /></Route>
    <Route path="/register" exact><Register /></Route>
    <Route path="/admin" exact><Admin /></Route>
    <Route path="/about" exact><AboutUs /></Route>
    <Route path="/careers" exact><Careers /></Route>
    <Route path="/blog" exact><Blog /></Route>
    <Route path="/contact" exact><ContactUs /></Route>
    <Route path="/help" exact><HelpCenter /></Route>
    <Route path="/terms" exact><TermsAndConditions /></Route>
    <Route path="/privacy" exact><PrivacyPolicy /></Route>
    <Route path="/cookies" exact><CookiePolicy /></Route>
    <Route path="/faq" exact><FAQPage /></Route>
    <Route><Error /></Route>
  </Switch>
);

export default Routes;
