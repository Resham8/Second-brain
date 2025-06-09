import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl flex items-center justify-center shadow-sm">
            <img 
              src="/second-brain-2.png" 
              alt="Brainly" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Brainly</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/signin" 
            className="px-5 py-2.5 text-gray-600 font-medium hover:text-purple-600 transition-colors duration-200 rounded-lg hover:bg-gray-50 no-underline"
          >
            Sign In
          </Link>
          <Link 
            to="/signup"
            className="px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 no-underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}