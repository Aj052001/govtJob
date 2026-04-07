import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">GovCareer</Link>
        </div>
   
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/rank" className="hover:text-blue-600">Rank</Link>
          <Link to="/books" className="hover:text-blue-600">Books</Link>
          <Link to="/notes" className="hover:text-blue-600">Notes</Link>
          <Link to="/typing" className="hover:text-blue-600">Typing</Link>
          <Link to="/mock-test" className="hover:text-blue-600">Mock Test</Link>
        </nav>
  
        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center border rounded-full px-3 py-1 bg-gray-100">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs, exams..."
              className="bg-transparent outline-none px-2 text-sm"
            />
          </div>

          <Bell className="cursor-pointer text-gray-600 hover:text-blue-600" />
          <Settings className="cursor-pointer text-gray-600 hover:text-blue-600" />

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt267oYPmFjTNZ3JPdb6Hb-cFTSevAkPY_zw&s"
            alt="profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  ) 
} 

export default Header;