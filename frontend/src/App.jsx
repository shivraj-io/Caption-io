// OLD CODE (commented out for reference):
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// }

// NEW CODE (production-level with proper routing):
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { authService } from "./services/auth.service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());

  // Check authentication status on mount
  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="pt-16">
        <Routes>
          {/* Protected route - Home (post section) */}
          <Route 
            path="/" 
            element={
              isLoggedIn ? (
                <Home isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Auth routes - redirect to home if already logged in */}
          <Route 
            path="/login" 
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register setIsLoggedIn={setIsLoggedIn} />
              )
            } 
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;