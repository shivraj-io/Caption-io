import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-blue-600">CaptionApp</Link>

        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
              <Link to="/register" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
