import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  defaultPortfolio,
  getPortfolio,
  savePortfolio,
  type PortfolioContent
} from './portfolioStore';
import { getRemotePortfolio, saveRemotePortfolio } from './remotePortfolio';

type PortfolioContextValue = {
  content: PortfolioContent;
  updateContent: (next: PortfolioContent) => void;
  saveChanges: () => void;
  resetChanges: () => void;
  dirty: boolean;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(() => getPortfolio());
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(content));

  useEffect(() => {
    let active = true;
    getRemotePortfolio().then((remoteContent) => {
      if (!active || !remoteContent) return;
      setContent(remoteContent);
      setSavedSnapshot(JSON.stringify(remoteContent));
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-gold', content.appearance.primaryGold);
    document.documentElement.style.setProperty('--brand-warm', content.appearance.warmBrown);
    document.documentElement.style.setProperty('--brand-blue', content.appearance.electricBlue);
    document.documentElement.style.setProperty('--brand-background', content.appearance.background);
    document.documentElement.style.setProperty('--brand-text', content.appearance.text);
  }, [content.appearance]);

  const saveChanges = () => {
    const saved = savePortfolio(content);
    setContent(saved);
    setSavedSnapshot(JSON.stringify(saved));
    void saveRemotePortfolio(saved);
  };

  const resetChanges = () => {
    const reset = getPortfolio();
    setContent(reset);
  };

  return (
    <PortfolioContext.Provider
      value={{
        content,
        updateContent: setContent,
        saveChanges,
        resetChanges: () => setContent(defaultPortfolio),
        dirty: JSON.stringify(content) !== savedSnapshot
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}
