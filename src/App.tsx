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

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const currentPath = window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length) || '/'
    : window.location.pathname;
  const isAdminRoute = currentPath === adminPath || currentPath.startsWith(`${adminPath}/`);

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
