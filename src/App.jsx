import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Home from "./Component/Home";
import Rank from "./Component/Rank";
import Books from "./Component/Books";
import Notes from "./Component/Notes";
import Typing from "./Component/Typing";
import MockTest from "./Component/MockTest";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/books" element={<Books />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/mock-test" element={<MockTest />} />
      </Routes>
    </>
  );
}
 
export default App