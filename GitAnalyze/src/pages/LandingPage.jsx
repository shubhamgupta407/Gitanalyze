import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ArrowRight, Zap, Shield, 
  Code, Users, Star, GitBranch, 
  Scale, ShieldCheck, BarChart3, Pin,
  Layers, Flag, Target, Database,
  Send, Layout, Activity, ClipboardCheck,
  ZapOff, Terminal, Copy, RefreshCw,
  Loader2, AlertCircle
} from 'lucide-react';
import TerminalDemo from '../components/TerminalDemo';
import BorderGlow from '../components/BorderGlow';
import './LandingPage.css';

const suggestedUsers = ['torvalds', 'gaearon', 'sindresorhus'];

const featureTabs = [
  { id: 'audit', label: 'Technical Audit' },
  { id: 'evaluate', label: 'Decision Logic' },
  { id: 'operate', label: 'Recruiter Tools' }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);
  const [heroUser, setHeroUser] = useState('');
  const [heroError, setHeroError] = useState('');
  const [analyzeUser, setAnalyzeUser] = useState('');
  const [analyzeError, setAnalyzeError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Fetching profile data...');
  const [activeTab, setActiveTab] = useState('audit');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef(null);

  const loadingSteps = [
    "Fetching profile data...",
    "Analyzing repositories...",
    "Running AI evaluation...",
    "Building report..."
  ];

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % loadingSteps.length;
        setLoadingMessage(loadingSteps[step]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [analysisResult]);

  useEffect(() => {
    if (analysisResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysisResult]);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!heroUser.trim()) { setHeroError('Please enter a username'); return; }
    navigate(`/report/${heroUser.trim()}`);
  };

  const handleAnalyzeSubmit = async (e) => {
    e.preventDefault();
    if (!analyzeUser.trim()) { setAnalyzeError('Please enter a username'); return; }
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalyzeError('');
    setLoadingMessage(loadingSteps[0]);
    
    try {
      const isComparison = analyzeUser.includes(',');
      
      const response = await fetch('https://nettable-pretimely-lorette.ngrok-free.dev/webhook/gitanalyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          username: analyzeUser.trim(),
          users: isComparison ? analyzeUser.split(',').map(u => u.trim()) : [analyzeUser.trim()],
          mode: isComparison ? 'compare' : 'analyze',
          source: 'webhook'
        })
      });
      
      if (!response.ok) throw new Error('Network error');
      
      const responseText = await response.text();
      let reportText = '';
      try {
        const data = JSON.parse(responseText);
        reportText = data.text || data.output || data.report || 
                     data.message || data.content || 
                     (typeof data === 'string' ? data : JSON.stringify(data));
      } catch (e) {
        reportText = responseText;
      }
      
      if (reportText?.toLowerCase().includes('not found')) {
        setAnalyzeError('❌ Profile not found. Check the username and try again.');
      } else if (!reportText || reportText.trim() === '') {
        throw new Error('Empty response');
      } else {
        setAnalysisResult(reportText);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setAnalyzeError('⚠️ Connection error. Make sure the backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setAnalyzeUser('');
    setAnalyzeError('');
  };

  return (
    <div className="landing-page">
      {/* Background Animated Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1 animate-float"></div>
        <div className="orb orb-2 animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="orb orb-3 animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid-overlay"></div>
        <div className="container grid hero-grid relative z-10" style={{ alignItems: 'center' }}>
          <div className="hero-content reveal">
            <div className="hero-badge-clean">
              <span className="badge-dot-pulsing"></span>
              v2.0 NOW LIVE • AI COMPARISON ENGINE
            </div>

            <h1 className="hero-title">
              GitHub Candidate <br />
              <span className="text-gradient">Intelligence</span> for <br />
              Modern Teams
            </h1>

            <p className="hero-subtitle">
              The industry-standard platform for deep technical analysis. 
              Uncover engineering talent through <span className="highlight-text">deep technical analysis</span> and matchup intelligence.
            </p>

            <form className="hero-input-group-clean" onSubmit={handleHeroSubmit}>
              <div className="hero-input-wrapper-clean">
                <Search size={18} className="hero-input-icon-clean" />
                <input
                  id="hero-username-input"
                  type="text"
                  className={`hero-input-minimal${heroError ? ' hero-input--error' : ''}`}
                  placeholder="Enter username(s), e.g. torvalds, gaearon"
                  value={heroUser}
                  onChange={(e) => {
                    setHeroUser(e.target.value);
                    if (heroError) setHeroError('');
                  }}
                  autoComplete="off"
                  name="github-username-query"
                  spellCheck="false"
                />
              </div>
              <button type="submit" className="btn-primary-clean">
                RUN ANALYSIS <ArrowRight size={18} />
              </button>
            </form>

            <div className="hero-pro-tip-clean">
              <ShieldCheck size={14} className="text-accent" />
              <span>Pro Tip: Compare up to 3 candidates by separating with commas</span>
            </div>

            <div className="hero-stats-clean">
              <div className="stat-pill-minimal"><Zap size={14} /> 10s Deep Scans</div>
              <div className="stat-pill-minimal"><Scale size={14} /> Matchup Engine</div>
              <div className="stat-pill-minimal"><Users size={14} /> Built for Scale</div>
            </div>
          </div>
          <div className="hero-demo animate-float reveal" style={{ animationDuration: '8s' }}>
            <BorderGlow
              borderRadius={20}
              backgroundColor="#0a0e1a"
              colors={['#6366f1', '#818cf8', '#38bdf8']}
            >
              <TerminalDemo />
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-content">
            <div className="trust-header text-center">
              <div className="trust-label">WHY TEAMS USE GITANALYZE</div>
              <p className="trust-subtitle">
                Used by technical recruiters to cut hiring review time from 40 minutes to 10 seconds
              </p>
            </div>
            <div className="trust-metrics flex items-center justify-around">
              <div className="trust-metric text-center">
                <span className="metric-val">10s</span>
                <span className="metric-label">Avg Report Time</span>
              </div>
              <div className="trust-metric text-center">
                <span className="metric-val">98%</span>
                <span className="metric-label">Recruiter Match</span>
              </div>
              <div className="trust-metric text-center">
                <span className="metric-val">50k+</span>
                <span className="metric-label">Profiles Analyzed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Scoring Engine ── */}
      <section className="scoring-engine-section section reveal">
        <div className="se-glow-bg"></div>
        <div className="container relative z-10">
          {/* Header */}
          <div className="se-header text-center reveal">
            <div className="se-label">HOW IT WORKS</div>
            <h2 className="se-title">The Scoring Engine</h2>
            <p className="se-subtitle">
              Five independent evaluation dimensions. Computed from live GitHub data.<br />
              Every point earned — not estimated.
            </p>
          </div>

          {/* Equation */}
          <div className="se-equation reveal" style={{ transitionDelay: '80ms' }}>
            {['Presence', 'Project Signal', 'Technical Breadth', 'Momentum', 'Community'].map((dim, i) => (
              <span key={dim} className="se-eq-group">
                {i > 0 && <span className="se-eq-plus">+</span>}
                <span className="se-eq-pill">{dim}</span>
              </span>
            ))}
            <span className="se-eq-plus">=</span>
            <span className="se-eq-pill se-eq-total">10.0</span>
          </div>

          {/* ── Unified Dimension Panel ── */}
          <div className="se-panel reveal" style={{ transitionDelay: '120ms' }}>
            {[
              { num: '01', name: 'Presence', weight: 2, desc: 'Profile completeness, long-term consistency, and public credibility signals.', tags: ['Profile Signals', 'Consistency', 'Credibility'] },
              { num: '02', name: 'Project Signal', weight: 3, desc: 'Real-world impact and quality of work — a single great project outweighs ten weak ones.', tags: ['Work Quality', 'Impact', 'Showcase'], badge: 'CORE' },
              { num: '03', name: 'Technical Breadth', weight: 2, desc: 'Domain diversity and complexity of tools and ecosystems worked across.', tags: ['Stack Diversity', 'Domain Range', 'Complexity'] },
              { num: '04', name: 'Momentum', weight: 2, desc: 'Activity consistency — differentiates sustained builders from one-time contributors.', tags: ['Contribution Patterns', 'Recency', 'Consistency'] },
              { num: '05', name: 'Community', weight: 1, desc: 'Recognition, open source participation, and ecosystem visibility beyond own repos.', tags: ['Recognition', 'Open Source', 'Ecosystem'] },
            ].map((dim, idx) => (
              <div key={idx} className={`se-row ${idx === 0 ? 'se-row-first' : ''} ${idx === 4 ? 'se-row-last' : ''}`}>
                {/* Step number */}
                <div className="se-step">
                  <div className="se-step-num">{dim.num}</div>
                  {idx < 4 && <div className="se-step-line"></div>}
                </div>

                {/* Content */}
                <div className="se-row-body">
                  <div className="se-row-header">
                    <div className="se-row-title-group">
                      <span className="se-row-name">{dim.name}</span>
                      {dim.badge && <span className="se-core-badge">{dim.badge}</span>}
                    </div>
                    <div className="se-weight-bar">
                      <div className="se-weight-track">
                        <div className="se-weight-fill" style={{ width: `${dim.weight * 10}%` }}></div>
                      </div>
                      <span className="se-weight-value">{dim.weight}.0<span className="se-weight-max"> / 10</span></span>
                    </div>
                  </div>
                  <p className="se-row-desc">{dim.desc}</p>
                  <div className="se-tag-row">
                    {dim.tags.map((tag, ti) => (
                      <span key={ti} className="se-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Score Interpretation — Dark Panel ── */}
          <div className="se-interpret-panel reveal" style={{ transitionDelay: '180ms' }}>
            <div className="se-interpret-header">
              <div className="se-interpret-badge">SCORE INTERPRETATION</div>
              <p className="se-interpret-desc">How we translate raw metrics into actionable hiring signals</p>
            </div>
            
            {/* Visual gradient bar */}
            <div className="se-gradient-bar">
              <div className="se-gradient-fill"></div>
              <div className="se-gradient-markers">
                <span style={{ left: '0%' }}>1.0</span>
                <span style={{ left: '33%' }}>4.0</span>
                <span style={{ left: '50%' }}>6.0</span>
                <span style={{ left: '65%' }}>7.5</span>
                <span style={{ left: '80%' }}>8.9</span>
                <span style={{ left: '100%' }}>10.0</span>
              </div>
            </div>
            
            {/* Verdict tiers */}
            <div className="se-tiers">
              {[
                { range: '1.0 – 4.0', label: 'Weak Signal', desc: 'Minimal public activity. Insufficient data for evaluation.', color: '#ef4444', glow: 'rgba(239,68,68,0.15)' },
                { range: '4.1 – 6.0', label: 'Developing', desc: 'Growing presence. Shows potential but lacks depth.', color: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
                { range: '6.1 – 7.5', label: 'Solid Candidate', desc: 'Consistent contributor. Clear technical competence.', color: '#eab308', glow: 'rgba(234,179,8,0.15)' },
                { range: '7.6 – 8.9', label: 'Strong Hire', desc: 'High-impact engineer. Production-grade portfolio.', color: '#22c55e', glow: 'rgba(34,197,94,0.15)' },
                { range: '9.0 – 10.0', label: 'Critical Talent', desc: 'Elite profile. Top-tier across all dimensions.', color: '#818cf8', glow: 'rgba(129,140,248,0.2)' },
              ].map((tier, i) => (
                <div key={i} className="se-tier" style={{ '--tier-color': tier.color, '--tier-glow': tier.glow }}>
                  <div className="se-tier-indicator">
                    <div className="se-tier-dot"></div>
                  </div>
                  <div className="se-tier-content">
                    <div className="se-tier-top">
                      <span className="se-tier-range">{tier.range}</span>
                      <span className="se-tier-label">{tier.label}</span>
                    </div>
                    <p className="se-tier-desc">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="se-interpret-footer">
              <span className="se-note-dot"></span>
              Scores are computed in real time from live GitHub data — not cached, not estimated, not manually assigned.
            </div>
          </div>
        </div>
      </section>


      {/* Features — Interactive Tabbed Bento Grid */}
      <section className="features section reveal" id="features">
        <div className="container relative z-10">
          <div className="section-header text-center">
            <h2 className="section-title-dark">Enterprise Grade Features</h2>
            <p className="section-desc-dark">Powerful tools designed to simplify complex technical hiring decisions.</p>
          </div>

          {/* Tab Switcher */}
          <div className="features-tabs">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Bento Grid Groups */}
          <div className="features-content-area">
            {activeTab === 'audit' && (
              <div className="features-grid bento-audit reveal active">
                <div className="feature-card spotlight-8">
                  <ShieldCheck className="feature-icon" />
                  <h3 className="feature-title-mono">Recruiter-Ready Profile Reports</h3>
                  <p>Any GitHub profile is instantly evaluated and returned as a structured professional report — overall score, full breakdown, and a final hiring verdict. Ready to act on immediately.</p>
                </div>
                <div className="feature-card spotlight-4">
                  <BarChart3 className="feature-icon" />
                  <h3 className="feature-title-mono">5-Point Transparent Scoring</h3>
                  <p>Profiles are scored across 5 independent metrics — Profile Strength, Repo Quality, Tech Depth, Activity, and Social Proof. No black box.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Pin className="feature-icon" />
                  <h3 className="feature-title-mono">Pinned Repo Intelligence</h3>
                  <p>Automatically detects and prioritizes a developer's pinned repositories — for the most accurate signal of their real technical capabilities.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Layers className="feature-icon" />
                  <h3 className="feature-title-mono">Tech Stack Detection</h3>
                  <p>Scans contribution history to map out a candidate's ecosystem — including JavaScript, React, Python, Flask, Firebase, and more.</p>
                </div>
              </div>
            )}

            {activeTab === 'evaluate' && (
              <div className="features-grid bento-evaluate reveal active">
                <div className="feature-card spotlight-12">
                  <Scale className="feature-icon" />
                  <h3 className="feature-title-mono">Multi-Candidate Comparison</h3>
                  <p>Run a side-by-side technical evaluation of up to 3 candidates simultaneously. Ranked by score with a metric-by-metric breakdown and a final hiring recommendation per role type.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Flag className="feature-icon" />
                  <h3 className="feature-title-mono">Improvement Signal Detection</h3>
                  <p>Beyond strengths — the system identifies gaps in every profile. Low tech depth, weak social proof, inactive repos — flagged clearly.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Target className="feature-icon" />
                  <h3 className="feature-title-mono">Role-Based Recommendations</h3>
                  <p>Identify which role fits best — Startup, Corporate, AI/ML Team, Frontend, or Internship. Matched to your actual hiring context.</p>
                </div>
              </div>
            )}

            {activeTab === 'operate' && (
              <div className="features-grid bento-operate reveal active">
                <div className="feature-card spotlight-12">
                  <Layout className="feature-icon" />
                  <h3 className="feature-title-mono">Visual Web Dashboard</h3>
                  <p>A dedicated web interface for detailed visual report viewing — score rings, repo tables, skill breakdowns, and exportable recruiter reports all in one place.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Database className="feature-icon" />
                  <h3 className="feature-title-mono">Automatic Recruiter Logs</h3>
                  <p>Every analysis is automatically logged with timestamp, candidate input, score, and comparison winner. Your entire hiring history, always available.</p>
                </div>
                <div className="feature-card spotlight-6">
                  <Send className="feature-icon" />
                  <h3 className="feature-title-mono">Telegram Bot Access</h3>
                  <p>Full analysis power available instantly via Telegram. Run profile scans and get complete reports on any device without opening a dashboard.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── What's Coming Next — Roadmap Teaser ── */}
      <section className="roadmap-section section reveal" id="roadmap">
        <div className="roadmap-container relative z-10">
          <div className="roadmap-header text-center reveal">
            <div className="roadmap-label-pill">
              <span className="pill-dot"></span>
              INTELLIGENCE ROADMAP
            </div>
            <h2 className="roadmap-title">
              Beyond the Repository
            </h2>
            <p className="roadmap-subtitle">
              GitHub proves a candidate can build and ship, but true engineering excellence is multi-dimensional. <br/>
              We're expanding the engine to decode algorithmic depth via <strong className="text-white">LeetCode</strong> and industry credibility via <strong className="text-white">LinkedIn</strong>, delivering the ultimate 360° candidate profile.
            </p>
          </div>

          <div className="command-menu-wrapper reveal" style={{ transitionDelay: '100ms' }}>
            <div className="command-menu-header">
              <div className="cmd-mac-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="cmd-title">Platform Integrations</div>
              <div style={{ width: 42 }}></div> {/* Spacer to keep title centered */}
            </div>

            <div className="command-menu-list">
              {/* Row 1 */}
              <div className="cmd-row hover-github">
                <div className="cmd-icon"><Code size={20} /></div>
                <div className="cmd-content">
                  <div className="cmd-main">
                    <h3 className="cmd-name">GitHub Audit</h3>
                    <span className="cmd-badge live">LIVE NOW</span>
                  </div>
                  <p className="cmd-desc">Verifies real-world execution and shipping capability.</p>
                </div>
                <div className="cmd-tags">
                  <span>Code Quality</span>
                  <span>Impact</span>
                </div>
                <div className="cmd-arrow">&rarr;</div>
              </div>

              {/* Row 2 */}
              <div className="cmd-row hover-leetcode">
                <div className="cmd-icon"><Target size={20} /></div>
                <div className="cmd-content">
                  <div className="cmd-main">
                    <h3 className="cmd-name">LeetCode Intel</h3>
                    <span className="cmd-badge soon">COMING SOON</span>
                  </div>
                  <p className="cmd-desc">Decode algorithmic depth, contest ratings, and problem-solving consistency.</p>
                </div>
                <div className="cmd-tags">
                  <span>Contest Rating</span>
                  <span>Percentile</span>
                </div>
                <div className="cmd-arrow">&rarr;</div>
              </div>

              {/* Row 3 */}
              <div className="cmd-row hover-linkedin">
                <div className="cmd-icon"><Users size={20} /></div>
                <div className="cmd-content">
                  <div className="cmd-main">
                    <h3 className="cmd-name">LinkedIn Intel</h3>
                    <span className="cmd-badge soon">COMING SOON</span>
                  </div>
                  <p className="cmd-desc">Evaluate professional presence, career trajectory, and industry credibility.</p>
                </div>
                <div className="cmd-tags">
                  <span>Trajectory</span>
                  <span>Endorsements</span>
                </div>
                <div className="cmd-arrow">&rarr;</div>
              </div>
            </div>
            
            <div className="command-menu-footer">
              <span>Press <kbd>⌘</kbd> <kbd>K</kbd> to search candidates</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
