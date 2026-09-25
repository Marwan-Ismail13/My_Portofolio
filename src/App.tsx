import { useEffect } from 'react';
import { PortfolioProvider } from './data/PortfolioProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminApp, { adminPath } from './components/AdminApp';
import { recordPortfolioVisit } from './data/trafficAnalytics';

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const fallbackPath = window.sessionStorage.getItem('github-pages-route');
  if (fallbackPath) window.sessionStorage.removeItem('github-pages-route');
  const queryRoute = new URLSearchParams(window.location.search).get('route');
  const routePath = queryRoute || fallbackPath || window.location.pathname;
  const currentPath = routePath.startsWith(basePath)
    ? routePath.slice(basePath.length) || '/'
    : routePath;
  const isAdminRoute = currentPath === adminPath || currentPath.startsWith(`${adminPath}/`);

  useEffect(() => {
    if (queryRoute || fallbackPath) window.history.replaceState({}, '', `${basePath}${currentPath === '/' ? '/' : currentPath}`);
    if (!isAdminRoute) recordPortfolioVisit();
  }, [basePath, currentPath, fallbackPath, isAdminRoute, queryRoute]);

  if (isAdminRoute) {
    return (
      <PortfolioProvider>
        <AdminApp />
      </PortfolioProvider>
    );
  }

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-brand-black text-brand-text">
        <Navbar />
        <main className="portfolio-main mx-auto w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
