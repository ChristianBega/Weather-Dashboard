import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./Components/dashboard.jsx";
import Navigation from "./Components/navigation";
import WeatherDisplay from "./Components/weatherDisplay";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const location = useLocation();
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <AnimatePresence>
        {/* <Router location={location} key={location.pathname}></Router> */}
        <Navigation />
        {/* <Dashboard /> */}
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/Weather-Display" element={<WeatherDisplay />}></Route>
        </Routes>
      </AnimatePresence>
    </SkeletonTheme>
  );
}

export default App;
