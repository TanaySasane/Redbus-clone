import React from "react";
import BusHireFooter from "./Components/Bus hire Main Page/Bus Hire Footer Section/BusHireFooter";
import SubFooter from "./Components/Bus hire Main Page/Sub Footer Section/SubFooter";
import Navbar from "./Components/Navbar/Navbar";
import Routes from "./Routes/Routes";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <ScrollToTop />
      <Navbar />
      <Routes />
      <SubFooter />
      <BusHireFooter />
    </div>
  );
};

export default App;
