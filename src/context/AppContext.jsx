import { createContext, useContext, useEffect, useState } from "react";
import { Info, ShieldCheck } from "lucide-react";

// ── Initial Data ────────────────────────────────────────────────

const initialUser = {
  name: "Aryan Sharma",
  education: "Master's in Computer Application",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6xF72LSS714ihYtTOD3xjbXJAbhb5pUQDg&s",
  eligibleCount: 24,
  savedCount: 12,
};

const initialJobs = [
  {
    id: 1,
    title: "Assistant Section Officer",
    org: "Staff Selection Commission (SSC)",
    date: "Oct 24, 2023",
    age: "18 - 30 Years",
    location: "New Delhi, India",
    pay: "Level 7",
    status: "Eligible",
    border: "border-l-4 border-blue-700",
    saved: false,
  },
  {
    id: 2,
    title: "Intelligence Officer",
    org: "Intelligence Bureau (IB)",
    date: "Nov 15, 2023",
    age: "Upto 27 Years",
    status: "Eligible",
    note: "Requires specialized verification",
    border: "border-l-4 border-blue-700",
    saved: false,
  },
  {
    id: 3,
    title: "Section Engineer",
    org: "Indian Railways (RRB)",
    date: "Dec 05, 2023",
    age: "18 - 33 Years",
    status: "Checking Eligibility",
    statusStyle: "bg-gray-200 text-gray-600",
    note: "Updated 2 hours ago",
    border: "border-l-4 border-blue-700",
    saved: false,
  },
  
  {
    id: 4,
    title: "Section Engineer",
    org: "Indian Railways (RRB)",
    date: "Dec 05, 2023",
    age: "18 - 33 Years",
    status: "Checking Eligibility",
    statusStyle: "bg-gray-200 text-gray-600",
    note: "Updated 2 hours ago",
    border: "border-l-4 border-blue-700",
    saved: false,
  },
  
  {
    id: 5,
    title: "Section Engineer",
    org: "Indian Railways (RRB)",
    date: "Dec 05, 2023",
    age: "18 - 33 Years",
    status: "Checking Eligibility",
    statusStyle: "bg-gray-200 text-gray-600",
    note: "Updated 2 hours ago",
    border: "border-l-4 border-blue-700",
    saved: false,
  },
];

const initialNotifications = [
  { id: 1, color: "bg-blue-600",  title: "New job alerts",       desc: "UPSC Civil Services 2024 notification is now out.", read: false },
  { id: 2, color: "bg-red-500",   title: "Last date reminders",  desc: "SSC CGL application ends in 48 hours.",            read: false },
  { id: 3, color: "bg-gray-400",  title: "Recent activity",      desc: "Your mock test result is available.",              read: true  },
];

const initialTypingStats = {
  bestWpm: 0,
  bestAccuracy: 0,
  lastWpm: 0,
};

// Progressive lessons: home row -> top row -> bottom row -> full sentences
const initialLessons = [
  {
    id: 1,
    title: "Home Row Basics",
    focus: "asdf jkl;",
    text: "asdf jkl asdf jkl asdf jkl asdf jkl asdf jkl asdf jkl jkl jkl jkl jkl jkl jklkjkl jklj kkk lll asdf jkl; jkl; kl; jkl;",
  },
  {
    id: 2,
    title: "Home Row Words",
    focus: "asdf jkl",
    text: "dad sad lad ask had jak fall  hafjhfsgffur hdagguaid gusdi fasdif ufhsido fhsudf hsdufhsdgyf fusdafguiasd fhfusdfh dufhsojifs dfsdhfushf ffhgsduifoh f uidhkjnfa sd  iodfj asf dufh au fauhfa jffhasfu oaf sahfsofj sfsdufh feffyiu fisdhfudf  flask salad jall salsa",
  },
  {
    id: 3,
    title: "Top Row Intro",
    focus: "qwerty uiop",
    text: "the quick wit type writer power query route pretty",
  },
  {
    id: 4,
    title: "Bottom Row",
    focus: "zxcv bnm",
    text: "zoom move bank vibe combo number maximize zebra calm",
  },
  {
    id: 5,
    title: "Full Keyboard Mix",
    focus: "All letters",
    text: "the quick brown fox jumps over the lazy dog every day",
  },
  {
    id: 6,
    title: "Punctuation & Caps",
    focus: ". , ;",
    text: "Hello, world. Practice makes perfect; keep going daily.",
  },
  {
    id: 7,
    title: "Sentences",
    focus: "Full sentences",
    text: "Typing fast is a useful skill that improves with steady practice.",
  },
  {
    id: 8,
    title: "Paragraph Practice",
    focus: "Endurance",
    text: "Consistent practice each day will help you build muscle memory and accuracy over time.",
  },
];

const initial_test_text = {
  beginner: [
    "The sun rises in the east and sets in the west every day. Birds sing in the morning and children play in the park after school. A good habit is to read books daily and drink plenty of water to stay healthy and fit.",
    "We go to the market to buy fruits and vegetables every week. Fresh food keeps us strong and active. It is important to eat on time and sleep early at night so that we can wake up fresh in the morning.",
  ],
  medium: [
    "Reading books every day improves vocabulary and helps build a stronger understanding of language and ideas across many subjects. Students who read regularly tend to perform better in examinations and develop critical thinking skills that help them throughout their lives.",
    "Technology continues to change the way people work, communicate, and learn, making everyday tasks faster and far more efficient than before. With the rise of smartphones and the internet, access to information has become easier for people living in both urban and rural areas.",
  ],
  advanced: [
    "The Staff Selection Commission conducts the Combined Graduate Level Examination every year to recruit candidates for various Group B and Group C posts in different Ministries and Departments of the Government of India. Candidates appearing for the typing test must achieve a minimum speed of thirty five words per minute in English on a computer. Accuracy and speed both are evaluated during the test and it is therefore important that candidates practice regularly to improve their typing speed and reduce errors.",
    "The Government of India has launched several flagship programmes aimed at improving the quality of life of citizens across the country. The Digital India initiative seeks to transform the country into a digitally empowered society by ensuring that government services are made available to citizens electronically. The Pradhan Mantri Jan Dhan Yojana has been instrumental in bringing millions of unbanked citizens into the formal financial system by providing them with zero balance bank accounts and access to insurance and pension schemes.",
    "Public administration in India is governed by a well established set of rules and procedures that ensure transparency and efficiency in the delivery of government services. The civil services of India are divided into All India Services, Central Services, and State Services, each with its own recruitment process. Officers recruited through the Union Public Service Commission are posted to various departments and are responsible for implementing government policies at the ground level and addressing public grievances in a timely manner.",
  ],
};

// ── Context ─────────────────────────────────────────────────────

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser]                   = useState([]);
  const [jobs, setJobs]                   = useState(initialJobs);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [typingStats, setTypingStats]     = useState(initialTypingStats);
  const [activeNav, setActiveNav]         = useState("Dashboard");
  const [lessons, setLessons]             = useState(initialLessons);
  const [testTexts, setTestTexts]         = useState(initial_test_text);

  // ── Job helpers ──────────────────────────────────────────────
  const toggleSaveJob = (id) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j;
        const saved = !j.saved;
        setUser((u) => ({ ...u, savedCount: u.savedCount + (saved ? 1 : -1) }));
        return { ...j, saved };
      })
    );
  };
  useEffect(() => {
  setUser(initialUser);
  },[])

  // ── Notification helpers ─────────────────────────────────────
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const unreadCount = notifications.filter((n) => !n.read).length;

  

  return (
    <AppContext.Provider value={{
      user, setUser,
      jobs, toggleSaveJob,
      notifications, markAllRead, unreadCount,
     lessons, setLessons,
      testTexts, setTestTexts,
      activeNav, setActiveNav,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ── Custom hook ──────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};


