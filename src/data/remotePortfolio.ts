import type { PortfolioContent } from './portfolioStore';
import { supabase } from './supabaseClient';

const RECORD_ID = 'default';

export async function getRemotePortfolio(): Promise<PortfolioContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('content')
    .eq('id', RECORD_ID)
    .maybeSingle();
  if (error || !data?.content) return null;
  return data.content as PortfolioContent;
}

export async function saveRemotePortfolio(content: PortfolioContent): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('portfolio_content').upsert({
    id: RECORD_ID,
    content,
    updated_at: new Date().toISOString()
  });
  return !error;
}
