export type ContribLevel = 0 | 1 | 2 | 3 | 4;

export type ActivityDay = {
  date: string;
  count: number;
  level: ContribLevel;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shiftIso(iso: string, days: number) {
  const ms = Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000;
  return new Date(ms).toISOString().slice(0, 10);
}

function countFor(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  const dow = date.getUTCDay();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const rand = mulberry32(hash(`pinak-${iso}`))();
  const weekend = dow === 0 || dow === 6;
  const quiet = month === 5 && day >= 8 && day <= 18;

  if (quiet && rand < 0.85) return 0;
  if (rand < (weekend ? 0.62 : 0.14)) return 0;

  const max = weekend ? 6 : 16;
  return 1 + Math.floor(rand ** 0.7 * max);
}

function levelFromCount(count: number): ContribLevel {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
}

export function formatActivityDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function formatActivityTip(day: ActivityDay) {
  const on = formatActivityDate(day.date);
  if (day.count === 0) return `No contributions on ${on}`;
  if (day.count === 1) return `1 contribution on ${on}`;
  return `${day.count} contributions on ${on}`;
}

export function getActivityDays(endIso?: string): ActivityDay[] {
  const end = endIso ?? new Date().toISOString().slice(0, 10);
  let start = shiftIso(end, -90);
  start = shiftIso(start, -new Date(`${start}T00:00:00Z`).getUTCDay());

  const days: ActivityDay[] = [];
  for (let iso = start; iso <= end; iso = shiftIso(iso, 1)) {
    const count = countFor(iso);
    days.push({ date: iso, count, level: levelFromCount(count) });
  }
  return days;
}

export function groupActivityWeeks(days: ActivityDay[]) {
  const weeks: (ActivityDay | null)[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    const week: (ActivityDay | null)[] = days.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

export function totalContributions(days: ActivityDay[]) {
  return days.reduce((sum, day) => sum + day.count, 0);
}
