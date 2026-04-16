import React, { useState } from "react";
import { Link } from "react-router-dom" 
import { Search, Bell, Settings, Menu, X } from "lucide-react" 

const Header = () => {
  const [open, setOpen] = useState(false) 

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="text-xl font-bold text-blue-600">
          <Link to="/">GovCareer</Link>
        </div>
 
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium ">
          <Link to="/">Home</Link>
          <Link to="/rank">Rank</Link>
          <Link to="/books">Books</Link>   
          <Link to="/notes">Notes</Link>
          <Link to="/typing">Typing</Link>  
          <Link to="/mock-test">Mock Test</Link>
        </nav>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center border rounded-full px-3 py-1 bg-gray-100">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm"
            />
          </div>

  
 <div className="flex gap-4 pt-2">
            <Bell />
            <Settings />
          </div> 
           <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6xF72LSS714ihYtTOD3xjbXJAbhb5pUQDg&s"
                alt="profile"
                className="w-10 h-10 rounded-full border-4 border-white  object-cover shadow-md"
              />     
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">

          <div className="flex items-center border rounded-full px-3 py-2 bg-gray-100">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm w-full"
            />
          </div>

          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/rank" onClick={() => setOpen(false)}>Rank</Link>
            <Link to="/books" onClick={() => setOpen(false)}>Books</Link>
            <Link to="/notes" onClick={() => setOpen(false)}>Notes</Link>
            <Link to="/typing" onClick={() => setOpen(false)}>Typing</Link>
            <Link to="/mock-test" onClick={() => setOpen(false)}>Mock Test</Link>
          </nav> 
         
        </div>
      )}
    </header>
  ) 
} 

export default Header 