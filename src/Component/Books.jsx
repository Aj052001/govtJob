import { useState, useEffect } from "react";
import { Plus, Search, BookOpen, MapPin, Phone, Image as ImageIcon, X, BookMarked } from "lucide-react";

const CONDITIONS = ["Like New", "Very Good", "Good", "Fair"];
const EMPTY_FORM = { title: "", author: "", price: "", category: "", condition: "Like New", contact: "", location: "", description: "", image: "" };
const INITIAL_BOOKS = [
  { id: 1, title: "Indian Constitution Guide", author: "Raj Kumar", price: 250, category: "General Studies", condition: "Like New", contact: "9876543210", location: "Delhi", description: "Complete guide for Constitution", image: "https://images.unsplash.com/photo-150784272343-583f20270319?w=400&h=500&fit=crop" },
  { id: 2, title: "Quantitative Aptitude", author: "Priya Singh", price: 300, category: "Aptitude", condition: "Very Good", contact: "8765432109", location: "Mumbai", description: "All problems solved", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop" },
  { id: 3, title: "English Grammar Mastery", author: "John Smith", price: 200, category: "English", condition: "Like New", contact: "9123456789", location: "Bangalore", description: "Complete English grammar guide", image: "https://images.unsplash.com/photo-1543002588-d83cea6bfbad?w=400&h=500&fit=crop" },
  { id: 4, title: "General Science Basics", author: "Dr. Sharma", price: 280, category: "General Science", condition: "Good", contact: "9876543211", location: "Pune", description: "Science fundamentals explained", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop" },
];

export default function Books() {
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem("bookMarketplace") || JSON.stringify(INITIAL_BOOKS)));
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    localStorage.setItem("bookMarketplace", JSON.stringify(books));
  }, [books]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price || !form.contact || !form.location || !form.category) {
      alert("Fill all required fields");
      return;
    }
    setBooks([{ id: Date.now(), ...form, price: parseFloat(form.price), image: form.image || "https://via.placeholder.com/400x500?text=No+Image" }, ...books]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const uniqueCategories = [...new Set(books.map(b => b.category))].sort();
  const filtered = books.filter((b) => (b.title.toLowerCase() + b.author.toLowerCase()).includes(search.toLowerCase()) && (category === "All" || b.category === category));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background Decorations */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-200 rounded-full -mr-48 -mt-48 opacity-20 blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full -ml-48 -mb-48 opacity-20 blur-3xl"></div>

      <div className="relative p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-7xl">
          {/* HEADER */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl">
                <BookOpen size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Buy & Sell Books</h1>
            </div>
            <p className="text-gray-600 ml-14">Discover quality books from fellow students • Share your knowledge</p>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm shadow-sm hover:shadow-md transition"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <option value="All">📚 All Categories</option>
              {uniqueCategories.map((c) => <option key={c} value={c}>📖 {c}</option>)}
            </select>
          </div>

          {/* BOOKS GRID */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              {filtered.map((book) => (
                <div key={book.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-blue-100 hover:border-blue-300 flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-56 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden flex items-center justify-center">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="text-center text-gray-400">
                        <BookOpen size={48} />
                        <p className="text-sm mt-2">No Image</p>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">₹ {book.price}</div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{book.author}</p>

                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen size={14} className="text-blue-500" />
                        <span>{book.category}</span>
                      </div>
                      <div className="inline-block px-2.5 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">{book.condition}</div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{book.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} className="text-blue-500" />
                        <span className="font-mono text-xs">{book.contact}</span>
                      </div>
                    </div>

                    {book.description && <p className="text-xs text-gray-400 mb-4 line-clamp-2">{book.description}</p>}

                    <button className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg">
                      Contact Seller
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-blue-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search or add a new book!</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD BOOK MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-8 rounded-t-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full -mr-20 -mt-20 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full -ml-16 -mb-16 opacity-20"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                    <BookMarked size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Sell Your Book</h2>
                    <p className="text-blue-100 text-sm mt-1">Share your knowledge with students</p>
                  </div>
                </div>
                <button onClick={() => setShowForm(false)} className="text-white hover:bg-blue-800 p-2 rounded-lg transition">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Section 1 */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Book Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Book Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition" required />
                  <input type="text" placeholder="Author *" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition" required />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                    <input type="number" placeholder="Enter price *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition" required />
                  </div>
                  <input type="text" placeholder="Category *" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition" required />
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Condition & Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition">
                    <option value="">Select Condition *</option>
                    {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" placeholder="Contact (Phone/Email) *" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition" required />
                  <input type="text" placeholder="Location *" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition md:col-span-2" required />
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Description
                </h3>
                <textarea placeholder="Tell buyers about the book condition, highlights, and why they should buy it..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition resize-none" />
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                  Book Image
                </h3>
                {form.image ? (
                  <div className="relative inline-block group">
                    <img src={form.image} alt="preview" className="w-40 h-56 object-cover rounded-2xl border-3 border-blue-600 shadow-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-2xl transition flex items-center justify-center">
                      <button type="button" onClick={() => setForm({ ...form, image: "" })} className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition opacity-0 group-hover:opacity-100">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="block border-3 border-dashed border-blue-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition bg-blue-50">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 p-4 rounded-full mb-3">
                        <ImageIcon size={32} className="text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">Upload Book Image</p>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB • High quality images get more buyers</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="flex-1 bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition text-sm shadow-lg hover:shadow-xl">
                  ✨ Publish Book
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING ADD BUTTON */}
      <button onClick={() => setShowForm(!showForm)} className="fixed bottom-6 right-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-4 rounded-full font-semibold hover:from-blue-800 hover:to-blue-700 shadow-xl hover:shadow-2xl z-40 transition text-sm">
        <Plus size={20} />
        <span className="hidden sm:inline">Add Book</span>
      </button>
    </div>
  );
}
