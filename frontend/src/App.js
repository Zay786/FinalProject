import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quotation from "./pages/Quotation";
import Login from "./pages/Login";
import PowerBIDashboard from "./pages/PowerBIDashboard";
import Service from "./pages/Service";

function App() {
  const [user, setUser] = useState(null); // logged-in user state

  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/quotation" element={<Quotation />} />

        {/* Login page */}
        <Route
          path="/login"
          element={user ? <Navigate to="/PowerBIDashboard" replace /> : <Login onLogin={setUser} />}
        />

        {/* Protected dashboard */}
        <Route
          path="/PowerBIDashboard"
          element={user ? <PowerBIDashboard user={user} /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
