import './Footer.css';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top row: Brand + Socials */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <span className="footer-logo">Git<span className="text-gradient">Analyze</span></span>
            <p className="footer-tagline">Advanced technical intelligence for modern engineering teams.</p>
          </div>
          <div className="footer-socials">
            <a href="https://github.com/shubhamgupta407" target="_blank" rel="noreferrer" className="footer-social-link" title="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shubhamgupta407" target="_blank" rel="noreferrer" className="footer-social-link" title="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row: Tech stack + Copyright */}
        <div className="footer-bottom">
          <div className="tech-stack-row">
            <div className="tech-item">
              <span className="tech-dot"></span>
              Autonomous Workflows
            </div>
            <div className="tech-item">
              <span className="tech-dot"></span>
              Intelligent Evaluation
            </div>
            <div className="tech-item">
              <span className="tech-dot"></span>
              Real-time Intelligence
            </div>
          </div>
          <p className="copyright">© {new Date().getFullYear()} GitAnalyze · Built by <a href="https://www.linkedin.com/in/shubhamgupta407" target="_blank" rel="noreferrer" className="dev-name">Shubham Gupta</a></p>
        </div>
      </div>
    </footer>
  );
}
