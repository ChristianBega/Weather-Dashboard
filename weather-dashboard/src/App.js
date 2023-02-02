import "./App.css";
import Dashboard from "./Components/dashboard.jsx";
import Navigation from "./Components/navigation";

function App() {
  return (
    <>
      <Navigation />
      <h1>Hello World</h1>
      <Dashboard />
      <Navigation />
    </>
  );
}

export default App;
