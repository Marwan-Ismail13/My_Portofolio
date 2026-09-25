import { createClient } from '@supabase/supabase-js';

export type TrafficDay = {
  date: string;
  visits: number;
};

export type TrafficAnalytics = {
  days: TrafficDay[];
};

const STORAGE_KEY = 'marwan-portfolio-traffic-v1';
const SESSION_KEY = 'marwan-portfolio-visit-recorded';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseClientKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseClientKey ? createClient(supabaseUrl, supabaseClientKey) : null;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readAnalytics(): TrafficAnalytics {
  if (typeof window === 'undefined') return { days: [] };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) as TrafficAnalytics : { days: [] };
    return { days: Array.isArray(parsed.days) ? parsed.days : [] };
  } catch {
    return { days: [] };
  }
}

function writeAnalytics(analytics: TrafficAnalytics) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
}

export async function recordPortfolioVisit() {
  if (typeof window === 'undefined' || window.sessionStorage.getItem(SESSION_KEY)) return;
  const analytics = readAnalytics();
  const date = todayKey();
  const existingDay = analytics.days.find((day) => day.date === date);
  if (existingDay) existingDay.visits += 1;
  else analytics.days.push({ date, visits: 1 });
  writeAnalytics(analytics);
  window.sessionStorage.setItem(SESSION_KEY, 'true');
  if (supabase) {
    await supabase.from('portfolio_visits').insert({ visited_on: date });
  }
}

export function getTrafficAnalytics(): TrafficAnalytics {
  return readAnalytics();
}

export async function getTrafficAnalyticsOnline(): Promise<TrafficAnalytics> {
  if (!supabase) return readAnalytics();
  const { data, error } = await supabase.rpc('get_portfolio_traffic');
  if (error || !Array.isArray(data)) return readAnalytics();
  return { days: data.map((day: { date: string; visits: number }) => ({ date: day.date, visits: Number(day.visits) })) };
}

export function resetTrafficAnalytics() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY);
}

export function getRecentTraffic(analytics: TrafficAnalytics, numberOfDays = 7) {
  const dates = Array.from({ length: numberOfDays }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (numberOfDays - index - 1));
    return date.toISOString().slice(0, 10);
  });
  return dates.map((date) => analytics.days.find((day) => day.date === date) ?? { date, visits: 0 });
}
