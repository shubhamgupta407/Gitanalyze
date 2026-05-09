import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container w-full flex items-center justify-between">
        <Link to="/" className="nav-logo flex items-center">
          <GithubIcon size={24} className="logo-icon" />
          <span className="brand-name">Git<span className="text-gradient">Analyze</span></span>
        </Link>
        <div className="nav-links flex items-center">
          <Link to="/#features" className="nav-link">Features</Link>
          <a href="/#roadmap" className="nav-link flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
            Integrations
          </a>
          <Link to="/sample?user=torvalds" className="btn btn-primary nav-cta">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
