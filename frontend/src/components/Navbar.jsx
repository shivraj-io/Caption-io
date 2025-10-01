// OLD CODE (commented out for reference):
// import { Link } from "react-router-dom";
// export default function Navbar({ isLoggedIn, setIsLoggedIn }) { ... }

// NEW CODE (production-level):
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate("/login"); // ✅ Redirect to login after logout
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          AI Caption Generator
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}