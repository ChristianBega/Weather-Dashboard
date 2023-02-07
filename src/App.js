import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard.jsx";
import Navigation from "./Components/navigation";
import WeatherDisplay from "./Components/weatherDisplay";

function App() {
  return (
    <Router>
      <Navigation />
      {/* <Dashboard /> */}
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/Weather-Display" element={<WeatherDisplay />}></Route>
      </Routes>
      <Navigation />
    </Router>
  );
}

export default App;
