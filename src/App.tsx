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
  const isAdminRoute = window.location.pathname === adminPath || window.location.pathname.startsWith(`${adminPath}/`);

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
        <main className="mx-auto w-full">
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
