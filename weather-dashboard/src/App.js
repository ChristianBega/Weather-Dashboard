import "./App.css";
import Dashboard from "./Components/dashboard.jsx";
import Navigation from "./Components/navigation";

function App() {
  return (
    <>
      <Navigation />
      <Dashboard />
      <Navigation />
    </>
  );
}

export default App;
