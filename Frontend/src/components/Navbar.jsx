import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl tracking-tight text-white">
          NoteHive
        </Link>
        <div className="space-x-4 text-sm">
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-300">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
