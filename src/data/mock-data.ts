// ─── Mock Data ───────────────────────────────────────────
// Realistic content for Bamboo Money app shell.
// Real merchant names, plausible amounts, proper dates.

export const user = {
  name: "Jose",
  avatarInitial: "J",
  netWorth: 47230,
  netWorthChange: 340,
  netWorthTrend: [
    41200, 41800, 42100, 42400, 42300, 43000, 43500, 43200,
    44100, 44800, 45200, 45600, 46100, 46500, 46890, 47230,
  ],
};

export type Envelope = {
  id: string;
  name: string;
  icon: string;
  budgeted: number;
  spent: number;
  group: "essentials" | "lifestyle" | "growth";
  paceNote?: string;
  paidDate?: string;
};

export const envelopes: Envelope[] = [
  {
    id: "groceries",
    name: "Groceries",
    icon: "ShoppingCart",
    budgeted: 600,
    spent: 458,
    group: "essentials",
    paceNote: "$15.26/day pace",
  },
  {
    id: "rent",
    name: "Rent / Mortgage",
    icon: "Home",
    budgeted: 1800,
    spent: 1800,
    group: "essentials",
    paidDate: "Paid Mar 1",
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "Zap",
    budgeted: 250,
    spent: 187,
    group: "essentials",
    paceNote: "$6.23/day pace",
  },
  {
    id: "transportation",
    name: "Gas & Transit",
    icon: "Car",
    budgeted: 200,
    spent: 105,
    group: "essentials",
    paceNote: "$3.50/day pace",
  },
  {
    id: "dining",
    name: "Dining",
    icon: "UtensilsCrossed",
    budgeted: 300,
    spent: 232,
    group: "lifestyle",
    paceNote: "Pace: 22% ahead",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "Tv",
    budgeted: 150,
    spent: 67,
    group: "lifestyle",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    budgeted: 200,
    spent: 124,
    group: "lifestyle",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: "CreditCard",
    budgeted: 120,
    spent: 87,
    group: "lifestyle",
  },
  {
    id: "savings",
    name: "Emergency Fund",
    icon: "Shield",
    budgeted: 400,
    spent: 400,
    group: "growth",
    paidDate: "Transferred Mar 1",
  },
  {
    id: "debt",
    name: "Debt Payoff",
    icon: "TrendingDown",
    budgeted: 400,
    spent: 400,
    group: "growth",
    paceNote: "Remaining: $8,200 · Debt-free by Nov 2027",
  },
];

export type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  projectedDate: string;
  insight: string;
  type: "savings" | "debt";
  originalDebt?: number;
};

export const goals: Goal[] = [
  {
    id: "emergency",
    name: "Emergency Fund",
    target: 10000,
    current: 3400,
    monthlyContribution: 200,
    projectedDate: "January 2029",
    insight:
      "At current pace, you'll reach 3 months of expenses by August. Half a safety net is still a safety net.",
    type: "savings",
  },
  {
    id: "japan",
    name: "Japan Trip",
    target: 4000,
    current: 1800,
    monthlyContribution: 150,
    projectedDate: "October 2026",
    insight:
      "You're 45% of the way there. At this pace, you'll have enough for flights and two weeks of travel by fall.",
    type: "savings",
  },
  {
    id: "credit-card",
    name: "Credit Card Freedom",
    target: 12000,
    current: 3800,
    monthlyContribution: 400,
    projectedDate: "November 2027",
    insight:
      "You've eliminated $3,800 in debt since you started. That's $3,800 that isn't accruing interest anymore.",
    type: "debt",
    originalDebt: 12000,
  },
];

export type Transaction = {
  id: string;
  merchant: string;
  envelope: string;
  amount: number;
  date: string;
};

export const recentTransactions: Transaction[] = [
  { id: "t1", merchant: "Trader Joe's", envelope: "Groceries", amount: -34.2, date: "Mar 9" },
  { id: "t2", merchant: "Shell Gas", envelope: "Gas & Transit", amount: -48.5, date: "Mar 9" },
  { id: "t3", merchant: "Amazon", envelope: "Shopping", amount: -23.99, date: "Mar 8" },
  { id: "t4", merchant: "Venmo from Lisa", envelope: "", amount: 45.0, date: "Mar 8" },
  { id: "t5", merchant: "Chipotle", envelope: "Dining", amount: -12.85, date: "Mar 7" },
];

export type Bill = {
  id: string;
  name: string;
  date: string;
  amount: number;
};

export const upcomingBills: Bill[] = [
  { id: "b1", name: "Netflix", date: "Mar 12", amount: 17.99 },
  { id: "b2", name: "Car Insurance", date: "Mar 15", amount: 89.0 },
  { id: "b3", name: "Spotify", date: "Mar 18", amount: 9.99 },
];

export type Insight = {
  id: string;
  date: string;
  content: string;
  followUp?: string;
  data?: { label: string; value: string }[];
};

export const bambooInsight: Insight = {
  id: "today-insight",
  date: "Today",
  content:
    "Day 9 of March. Four of six envelopes are on pace. Dining is running 20% ahead of last month — worth watching.",
};

export const askBambooInsights: Insight[] = [
  {
    id: "ask-1",
    date: "Today",
    content:
      "Your grocery spending averaged $187/week this month — $22 above your envelope target. The increase is concentrated on weekends.",
    followUp: "How can I reduce weekend grocery spending?",
  },
  {
    id: "ask-2",
    date: "Yesterday",
    content:
      "Three recurring charges haven't been used in 60+ days:",
    data: [
      { label: "Hulu", value: "$17.99/mo" },
      { label: "Headspace", value: "$12.99/mo" },
      { label: "Planet Fitness", value: "$45.00/mo" },
    ],
    followUp: "Review subscriptions",
  },
];

export const askBambooSuggestions = [
  "How did we do this month?",
  "Am I on track for my goals?",
  "Where can I cut spending?",
  "Compare this month to last",
];

export const monthlySummary = {
  totalSpent: 2140,
  totalBudget: 4800,
  remaining: 2660,
  dailyPace: 237,
  budgetPace: 238,
  envelopesOnPace: 4,
  envelopesTotal: 6,
  netWorthChange: 340,
};
