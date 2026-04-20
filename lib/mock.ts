export type Subject =
  | "Math"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "English"
  | "History"
  | "Programming"
  | "Economics";

export const SUBJECTS: Subject[] = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Programming",
  "Economics",
];

export type Teacher = {
  id: string;
  name: string;
  avatar: string;
  subjects: Subject[];
  rating: number;
  reviews: number;
  pricePerMin: number;
  bio: string;
  country: string;
  online: boolean;
  badges: string[];
};

export const TEACHERS: Teacher[] = [
  {
    id: "t-ana",
    name: "Ana Martins",
    avatar: "https://i.pravatar.cc/200?img=47",
    subjects: ["Math", "Physics"],
    rating: 4.9,
    reviews: 312,
    pricePerMin: 0.35,
    bio: "PhD in Applied Math. 6 years teaching high-school and first-year university students.",
    country: "Portugal",
    online: true,
    badges: ["Top Rated", "Fast Match"],
  },
  {
    id: "t-diego",
    name: "Diego Silva",
    avatar: "https://i.pravatar.cc/200?img=12",
    subjects: ["Programming", "Math"],
    rating: 4.8,
    reviews: 178,
    pricePerMin: 0.3,
    bio: "Senior software engineer. I love making algorithms click.",
    country: "Brazil",
    online: true,
    badges: ["Exam Prep"],
  },
  {
    id: "t-layla",
    name: "Layla Haddad",
    avatar: "https://i.pravatar.cc/200?img=32",
    subjects: ["Chemistry", "Biology"],
    rating: 4.95,
    reviews: 521,
    pricePerMin: 0.4,
    bio: "Medical student helping with organic chem and cell bio.",
    country: "Lebanon",
    online: true,
    badges: ["Top Rated"],
  },
  {
    id: "t-james",
    name: "James O'Connor",
    avatar: "https://i.pravatar.cc/200?img=15",
    subjects: ["English", "History"],
    rating: 4.7,
    reviews: 96,
    pricePerMin: 0.25,
    bio: "Writer and former teacher. Essays, grammar, and analysis.",
    country: "Ireland",
    online: false,
    badges: [],
  },
  {
    id: "t-priya",
    name: "Priya Narayanan",
    avatar: "https://i.pravatar.cc/200?img=49",
    subjects: ["Physics", "Math"],
    rating: 4.85,
    reviews: 244,
    pricePerMin: 0.33,
    bio: "Engineer turned tutor. I break problems into small steps.",
    country: "India",
    online: true,
    badges: ["Fast Match"],
  },
  {
    id: "t-marco",
    name: "Marco Rossi",
    avatar: "https://i.pravatar.cc/200?img=8",
    subjects: ["Economics", "History"],
    rating: 4.6,
    reviews: 58,
    pricePerMin: 0.22,
    bio: "Econ grad. Markets, micro, macro, and essay structure.",
    country: "Italy",
    online: true,
    badges: [],
  },
];

export type Plan = {
  id: "free" | "plus" | "pro";
  name: string;
  priceMonthly: number;
  freeMinutesPerDay: number;
  perks: string[];
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    freeMinutesPerDay: 15,
    perks: [
      "15 free minutes every day",
      "Access to notes & past exams",
      "Community chats",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    priceMonthly: 9.9,
    freeMinutesPerDay: 60,
    highlight: true,
    perks: [
      "60 free minutes every day",
      "Priority matching (<30s)",
      "Double rewards points",
      "All Free perks",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 19.9,
    freeMinutesPerDay: 180,
    perks: [
      "3 hours of free classes every day",
      "Instant match with top-rated tutors",
      "Exam-week unlimited sessions",
      "1:1 mentor weekly check-in",
    ],
  },
];

export type LibraryItem = {
  id: string;
  kind: "exercise" | "notes" | "exam";
  title: string;
  subject: Subject;
  level: "Middle" | "High" | "University";
  minutes: number;
  difficulty: 1 | 2 | 3;
  author: string;
  preview: string;
};

export const LIBRARY: LibraryItem[] = [
  { id: "l1", kind: "exercise", title: "50 derivatives to warm up", subject: "Math", level: "High", minutes: 25, difficulty: 2, author: "Ana Martins", preview: "Polynomial, product and chain rule practice with answer keys." },
  { id: "l2", kind: "exam", title: "National Math exam 2024", subject: "Math", level: "High", minutes: 120, difficulty: 3, author: "Ministry of Ed.", preview: "Full past exam with fully worked solutions." },
  { id: "l3", kind: "notes", title: "Kinematics cheat sheet", subject: "Physics", level: "High", minutes: 10, difficulty: 1, author: "Priya Narayanan", preview: "All formulas, sign conventions, and common traps on one page." },
  { id: "l4", kind: "exercise", title: "Stoichiometry drill", subject: "Chemistry", level: "High", minutes: 30, difficulty: 2, author: "Layla Haddad", preview: "Mole ratios, limiting reagent, and yield problems." },
  { id: "l5", kind: "notes", title: "Cell respiration — visual guide", subject: "Biology", level: "High", minutes: 15, difficulty: 2, author: "Layla Haddad", preview: "Glycolysis → Krebs → electron transport with diagrams." },
  { id: "l6", kind: "exam", title: "University intro Programming — finals", subject: "Programming", level: "University", minutes: 90, difficulty: 3, author: "Diego Silva", preview: "Data structures, recursion and complexity questions." },
  { id: "l7", kind: "exercise", title: "Essay structure builder", subject: "English", level: "High", minutes: 20, difficulty: 1, author: "James O'Connor", preview: "Thesis → topic sentences → evidence, with 3 full examples." },
  { id: "l8", kind: "notes", title: "Cold War, in 12 bullets", subject: "History", level: "High", minutes: 8, difficulty: 1, author: "Marco Rossi", preview: "Timeline, key players, and common exam angles." },
  { id: "l9", kind: "exam", title: "Micro-econ midterm bank", subject: "Economics", level: "University", minutes: 60, difficulty: 2, author: "Marco Rossi", preview: "Elasticity, consumer theory, production and cost." },
  { id: "l10", kind: "exercise", title: "Python: 20 recursion puzzles", subject: "Programming", level: "High", minutes: 45, difficulty: 3, author: "Diego Silva", preview: "From warmups to tricky backtracking." },
];

export type Community = {
  id: string;
  name: string;
  subject: Subject;
  members: number;
  lastMessage: { who: string; text: string; minutesAgo: number };
};

export const COMMUNITIES: Community[] = [
  { id: "c-math-hs", name: "Math — High School", subject: "Math", members: 2140, lastMessage: { who: "Sofia", text: "Can someone explain implicit differentiation?", minutesAgo: 2 } },
  { id: "c-phys-hs", name: "Physics — High School", subject: "Physics", members: 1583, lastMessage: { who: "Tomás", text: "Stuck on a projectile problem, anyone?", minutesAgo: 6 } },
  { id: "c-prog", name: "Programming club", subject: "Programming", members: 3021, lastMessage: { who: "Diego (tutor)", text: "Tonight's challenge: sliding window. Post your solutions.", minutesAgo: 18 } },
  { id: "c-chem", name: "Chem — Exam prep", subject: "Chemistry", members: 902, lastMessage: { who: "Layla (tutor)", text: "I'll host a live Q&A at 8pm. Bring your questions!", minutesAgo: 34 } },
  { id: "c-eng", name: "English literature", subject: "English", members: 641, lastMessage: { who: "James (tutor)", text: "Quick tip: topic sentences earn half your grade.", minutesAgo: 52 } },
  { id: "c-history", name: "History corner", subject: "History", members: 412, lastMessage: { who: "Marco (tutor)", text: "Cold War timeline posted — highly recommended.", minutesAgo: 120 } },
];

export type ChatMessage = {
  id: string;
  who: string;
  role: "student" | "tutor";
  text: string;
  minutesAgo: number;
};

export const COMMUNITY_FEED: Record<string, ChatMessage[]> = {
  "c-math-hs": [
    { id: "m1", who: "Ana (tutor)", role: "tutor", text: "Welcome everyone! Drop your hardest question of the week here 👇", minutesAgo: 180 },
    { id: "m2", who: "Sofia", role: "student", text: "How do I know when to use u-substitution vs. integration by parts?", minutesAgo: 95 },
    { id: "m3", who: "Priya (tutor)", role: "tutor", text: "Rule of thumb: if you see a product of two unrelated functions, try by parts.", minutesAgo: 80 },
    { id: "m4", who: "Miguel", role: "student", text: "Can someone explain implicit differentiation? I'm blanking.", minutesAgo: 10 },
    { id: "m5", who: "Sofia", role: "student", text: "Same here, test on Friday 😅", minutesAgo: 2 },
  ],
  "c-prog": [
    { id: "p1", who: "Diego (tutor)", role: "tutor", text: "Tonight's challenge: sliding window. Post your solutions here!", minutesAgo: 18 },
    { id: "p2", who: "Rita", role: "student", text: "Is O(n) enough or do they expect O(log n)?", minutesAgo: 12 },
    { id: "p3", who: "Diego (tutor)", role: "tutor", text: "O(n) is the target. Focus on the two-pointer shape.", minutesAgo: 10 },
  ],
};

export type IncomingRequest = {
  id: string;
  studentName: string;
  studentAvatar: string;
  subject: Subject;
  topic: string;
  waitingSec: number;
  budgetPerMin: number;
};

export const INCOMING_REQUESTS: IncomingRequest[] = [
  { id: "r1", studentName: "Sofia L.", studentAvatar: "https://i.pravatar.cc/100?img=24", subject: "Math", topic: "Implicit differentiation", waitingSec: 12, budgetPerMin: 0.35 },
  { id: "r2", studentName: "Miguel F.", studentAvatar: "https://i.pravatar.cc/100?img=33", subject: "Math", topic: "Word problem — optimization", waitingSec: 34, budgetPerMin: 0.4 },
  { id: "r3", studentName: "Rita P.", studentAvatar: "https://i.pravatar.cc/100?img=45", subject: "Programming", topic: "Sliding window puzzle", waitingSec: 52, budgetPerMin: 0.3 },
];

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "First class", description: "Finish your first session", icon: "🎓", earned: true },
  { id: "a2", title: "7-day streak", description: "Study 7 days in a row", icon: "🔥", earned: true },
  { id: "a3", title: "30-day streak", description: "Study 30 days in a row", icon: "🏆", earned: false },
  { id: "a4", title: "Bookworm", description: "Read 10 notes in the library", icon: "📚", earned: true },
  { id: "a5", title: "Night owl", description: "Take a class after 10pm", icon: "🌙", earned: false },
  { id: "a6", title: "Helper", description: "Answer 5 questions in community", icon: "🤝", earned: false },
];

export type Session = {
  id: string;
  teacherId: string;
  subject: Subject;
  topic: string;
  minutes: number;
  dateLabel: string;
  rating?: number;
  costCents: number;
};

export const RECENT_SESSIONS: Session[] = [
  { id: "s1", teacherId: "t-ana", subject: "Math", topic: "Derivatives warm-up", minutes: 18, dateLabel: "Today", rating: 5, costCents: 0 },
  { id: "s2", teacherId: "t-diego", subject: "Programming", topic: "Recursion walkthrough", minutes: 42, dateLabel: "Yesterday", rating: 5, costCents: 1260 },
  { id: "s3", teacherId: "t-priya", subject: "Physics", topic: "Projectile motion", minutes: 22, dateLabel: "2 days ago", rating: 4, costCents: 726 },
];

export const STUDENT = {
  name: "Alex",
  avatar: "https://i.pravatar.cc/200?img=5",
  level: 7,
  xp: 1420,
  xpToNextLevel: 2000,
  points: 1285,
  streakDays: 12,
  plan: "plus" as const,
  freeMinutesLeftToday: 42,
};

export const TEACHER_ME = {
  name: "Ana Martins",
  avatar: "https://i.pravatar.cc/200?img=47",
  rating: 4.9,
  reviews: 312,
  minutesThisWeek: 640,
  earningsThisWeekCents: 22400,
  earningsThisMonthCents: 84300,
  subjects: ["Math", "Physics"] as Subject[],
  pricePerMin: 0.35,
  online: true,
};

export function getTeacherById(id: string): Teacher | undefined {
  return TEACHERS.find((t) => t.id === id);
}

export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatMinutes(m: number): string {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h}h ${rest}m` : `${h}h`;
}
