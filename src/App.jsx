import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Home from "./Component/Home";
import Rank from "./Component/Rank";
import Books from "./Component/Books";
import Notes from "./Component/Notes";
import Typing from "./Component/Typing";
import MockTest from "./Component/MockTest";
import Login from "./Component/auth/Login";
import Register from "./Component/auth/Register";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (

    <>
    
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/books" element={<Books />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/typing" element={<Typing />} />
            <Route path="/mock-test" element={<MockTest />} />
          </Routes>
        </>
      } />
    </Routes>
    </>
  );
}

export default App