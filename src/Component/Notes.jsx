import { useState } from "react";
import {
  Atom,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  BookOpen,
  Brain,
  Download,
  FileText,
  Globe2,
  Landmark,
  Percent,
  Plus,
  Search,
  Upload,
} from "lucide-react";

import featuredNotesImg from "../assets/notes.png";

const SUBJECTS = [
  { id: "all", label: "All Notes", Icon: FileText },
  { id: "general-studies", label: "General Studies", Icon: BookOpen },
  { id: "aptitude", label: "Aptitude", Icon: Percent },
  { id: "reasoning", label: "Reasoning", Icon: Brain },
  { id: "history", label: "History", Icon: Landmark },
  { id: "geography", label: "Geography", Icon: Globe2 },
  { id: "general-science", label: "General Sciences", Icon: Atom },
];

const NOTES = [
  {
    id: "constitution-preamble",
    subjectId: "general-studies",
    badge: "GENERAL STUDIES",
    title: "Indian Constitution: Preamble & Basic Structure",
    description:
      "A comprehensive analysis of the evolution of the basic structure doctrine through landmark Supreme Court cases.",
    author: { name: "Dr. Deepa Sharma", role: "Constitutional Law Expert" },
    size: "3.5 MB",
  },
  {
    id: "aptitude-shortcuts",
    subjectId: "aptitude",
    badge: "APTITUDE",
    title: "Quantitative Aptitude: Shortcut Tricks & Percentages",
    description:
      "Master speed calculations and percentage shortcuts with 75+ solved examples and practice sets.",
    author: { name: "Amit Kumar", role: "Maths Mentor" },
    size: "2.8 MB",
  },
  {
    id: "reasoning-syllogism",
    subjectId: "reasoning",
    badge: "REASONING",
    title: "Logical Reasoning: Syllogism Concepts & Practice",
    description:
      'The simplest method to solve even the most complex "only a few" syllogism cases in under 30 seconds.',
    author: { name: "Rahul Verma", role: "Exam Strategy Researcher" },
    size: "1.5 MB",
  },
  {
    id: "environment-ecology",
    subjectId: "general-science",
    badge: "GENERAL SCIENCE",
    title: "Environment & Ecology: Key Biodiversity Hotspots",
    description:
      "Detailed notes on India's biodiversity hotspots, conservation efforts, and recent climate change protocols.",
    author: { name: "Pooja Mishra" },
    size: "3.1 MB",
  },
];

const FEATURED = {
  subjectId: "history",
  badge: "FEATURED COLLECTION",
  title: "Modern Indian History: The Freedom Struggle (1857-1947)",
  description:
    "The definitive visual timeline and summary of the Indian independence movement, including key leaders and major acts. Perfect for quick revision before exams.",
};

function NoteCard({ note }) {
  const avatarLetter = note.author?.name?.trim()?.[0]?.toUpperCase() ?? "N";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
      <div className="flex gap-2 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f3f5f7] text-[#65758b] uppercase tracking-wide">
          {note.badge}
        </span>
      </div>

      <h3 className="text-base font-semibold text-[#1d212b] mb-2 leading-snug">
        {note.title}
      </h3>

      <p className="text-sm text-[#65758b] mb-4 leading-relaxed flex-1">
        {note.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-[#f3f5f7] flex items-center justify-center text-xs font-medium text-[#1d212b]">
          {avatarLetter}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#1d212b] truncate">
            {note.author?.name ?? "Unknown"}
          </p>
          {note.author?.role && (
            <p className="text-xs text-[#65758b] truncate">{note.author.role}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        className="w-full py-2.5 px-4 bg-[#076fed]/10 text-[#076fed] text-sm font-medium rounded-lg hover:bg-[#076fed]/20 transition-colors flex items-center justify-center gap-2"
      >
        <Download size={16} />
        Download PDF ({note.size})
      </button>
    </div>
  );
}

export default function Notes() {
  const [activeSubjectId, setActiveSubjectId] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filteredNotes = NOTES.filter((note) => {
    const subjectOk = activeSubjectId === "all" || note.subjectId === activeSubjectId;
    if (!subjectOk) return false;
    if (!q) return true;
    const text = [note.badge, note.title, note.description, note.author?.name ?? "", note.author?.role ?? ""].join(" ");
    return text.toLowerCase().includes(q);
  });

  const showFeatured =
    (activeSubjectId === "all" || FEATURED.subjectId === activeSubjectId) &&
    (!q || [FEATURED.badge, FEATURED.title, FEATURED.description].join(" ").toLowerCase().includes(q));

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-[240px] min-h-screen border-r border-slate-200 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-[#1d212b]">Subject Filters</h3>
          <p className="text-xs text-[#65758b]">Browse by category</p>
        </div>

        <nav className="flex-1 p-2">
          {SUBJECTS.map(({ id, label ,Icon  }) => {
            const isActive = id === activeSubjectId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSubjectId(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  isActive ? "bg-[#076fed] text-white font-medium" : "text-[#1d212b] hover:bg-[#f3f5f7]"
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? "text-white" : "text-[#65758b]"}`} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#f3f5f7] flex items-center justify-center text-sm">
              <Upload size={16} className="text-[#65758b]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1d212b]">Contribute to Library</h4>
              <p className="text-xs text-[#65758b]">Share your study notes with fellow learners</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-[#076fed] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Upload My Notes
          </button>
        </div>
      </aside>

      <main className="flex-1 px-5 sm:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1d212b] mb-1">Current Study Notes</h1>
            <p className="text-sm text-[#65758b]">
              Access professional-grade notes compiled by subject matter experts and top-rank holders
              to streamline your preparation.
            </p>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65758b]" size={18} />
            <input
              type="text"
              placeholder="Search by topic, keyword, or author..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-[#1d212b] placeholder:text-[#65758b] focus:outline-none focus:ring-2 focus:ring-[#076fed]/20 focus:border-[#076fed] transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredNotes.slice(0, 2).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>

          {showFeatured && (
            <section className="mt-6 bg-gradient-to-r from-[#076fed] to-[#2a8cff] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="relative max-w-xl">
                <span className="inline-flex text-[11px] font-semibold tracking-wide bg-white/15 text-white px-3 py-1 rounded-full mb-3">
                  {FEATURED.badge}
                </span>
                <h2 className="text-xl font-semibold text-white mb-2">{FEATURED.title}</h2>
                <p className="text-sm text-white/80 mb-5 leading-relaxed">{FEATURED.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="py-2 px-5 bg-white text-[#076fed] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Download High-Res PDF
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 border border-white/40 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Preview Online
                  </button>
                </div>
              </div>
              <div className="relative w-full md:w-auto flex justify-center md:justify-end">
                <img
                  src={featuredNotesImg}
                  alt="Featured notes"
                  width="170"
                  height="170"
                  className="hidden md:block w-[170px] h-[170px] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.18)]"
                />
              </div>
            </section>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredNotes.slice(2, 4).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8 mb-6">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-[#65758b] hover:bg-[#f3f5f7] transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            {["1", "2", "3", "4"].map((p, i) => (
              <button
                key={p}
                type="button"
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-[#076fed] text-white"
                    : "border border-slate-200 text-[#1d212b] hover:bg-[#f3f5f7]"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="w-9 h-9 flex items-center justify-center text-sm text-[#65758b]">...</span>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border border-slate-200 text-[#1d212b] hover:bg-[#f3f5f7] transition-colors"
            >
              12
            </button>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-[#65758b] hover:bg-[#f3f5f7] transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#076fed] text-white hover:opacity-90 transition-opacity"
              aria-label="Last page"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </main>

      <button
        type="button"
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#076fed] text-white shadow-lg shadow-[#076fed]/30 flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Create new note"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
