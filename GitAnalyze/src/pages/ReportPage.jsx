import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Terminal, Copy, 
  RefreshCw, Loader2, AlertCircle, 
  ClipboardCheck, Share2, ShieldCheck,
  Zap, Trophy, GitBranch, Star, BarChart3,
  Wrench, Rocket, Target, Briefcase, 
  TrendingUp, FileText, Award, AlertTriangle
} from 'lucide-react';
import './ReportPage.css';

export default function ReportPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const sectionConfig = {
    'SCORE': { icon: <Star size={18} />, color: '#4f46e5' },
    'BREAKDOWN': { icon: <BarChart3 size={18} />, color: '#4f46e5' },
    'SKILLS': { icon: <Wrench size={18} />, color: '#4f46e5' },
    'STANDS OUT': { icon: <Rocket size={18} />, color: '#4f46e5' },
    'PROJECTS': { icon: <Trophy size={18} />, color: '#4f46e5' },
    'IMPROVE': { icon: <AlertTriangle size={18} />, color: '#4f46e5' },
    'ROLES': { icon: <Briefcase size={18} />, color: '#4f46e5' },
    'RECOMMENDATION': { icon: <Target size={18} />, color: '#4f46e5' },
    'VERDICT': { icon: <Award size={18} />, color: '#4f46e5' },
    'RANK 1': { icon: <Trophy size={18} />, color: '#4f46e5' },
    'RANK 2': { icon: <Award size={18} />, color: '#4f46e5' },
    'RANK 3': { icon: <FileText size={18} />, color: '#4f46e5' },
    'COMPARISON': { icon: <FileText size={18} />, color: '#4f46e5' },
    'REPORT': { icon: <ShieldCheck size={18} />, color: '#4f46e5' },
  };

  // Convert markdown **bold** to <strong> and strip stray asterisks
  const renderFormattedText = (text) => {
    if (!text) return text;
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      // Strip any remaining stray single asterisks used as bullets
      return part.replace(/\*/g, '');
    });
  };

  const parseReportSections = (text) => {
    if (!text) return [];
    
    const markerDefinitions = [
      { marker: 'METRIC-BY-METRIC BREAKDOWN', key: 'BREAKDOWN', title: 'METRIC BREAKDOWN' },
      { marker: 'SCORE BREAKDOWN', key: 'BREAKDOWN', title: 'SCORE BREAKDOWN' },
      { marker: 'OVERALL SCORE', key: 'SCORE', title: 'OVERALL SCORE' },
      { marker: 'ROLE-BASED RECOMMENDATION', key: 'RECOMMENDATION', title: 'ROLE RECOMMENDATION' },
      { marker: 'HIRING RECOMMENDATION', key: 'RECOMMENDATION', title: 'HIRING RECOMMENDATION' },
      { marker: 'RECOMMENDATION', key: 'RECOMMENDATION', title: 'RECOMMENDATION' },
      { marker: 'FINAL HIRING VERDICT', key: 'VERDICT', title: 'HIRING VERDICT' },
      { marker: 'VERDICT', key: 'VERDICT', title: 'VERDICT' },
      { marker: 'GITHUB CANDIDATE COMPARISON REPORT', key: 'COMPARISON', title: 'COMPARISON REPORT' },
      { marker: 'GITSCAN PRO REPORT', key: 'REPORT', title: 'PRO REPORT' },
      { marker: 'STRONGEST PROJECTS', key: 'PROJECTS', title: 'STRONGEST PROJECTS' },
      { marker: 'AREAS TO IMPROVE', key: 'IMPROVE', title: 'AREAS TO IMPROVE' },
      { marker: 'WHAT STANDS OUT', key: 'STANDS OUT', title: 'WHAT STANDS OUT' },
      { marker: 'BEST FIT ROLES', key: 'ROLES', title: 'BEST FIT ROLES' },
      { marker: 'TOP SKILLS', key: 'SKILLS', title: 'TOP SKILLS' },
      { marker: 'RANK 1', key: 'RANK 1', title: 'RANK 1' },
      { marker: 'RANK 2', key: 'RANK 2', title: 'RANK 2' },
      { marker: 'RANK 3', key: 'RANK 3', title: 'RANK 3' },
    ];

    const sections = [];
    let currentSection = null;
    const lines = text.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const matchDef = markerDefinitions.find(def => {
        const regex = new RegExp(`^[^a-zA-Z]*${def.marker}`, 'i');
        return regex.test(trimmed);
      });

      if (matchDef) {
        if (currentSection) sections.push(currentSection);
        
        const colonIndex = trimmed.indexOf(':');
        let initialContent = '';
        if (colonIndex !== -1) {
          initialContent = trimmed.substring(colonIndex + 1).trim();
        } else {
          const regex = new RegExp(`^[^a-zA-Z]*${matchDef.marker}`, 'i');
          initialContent = trimmed.replace(regex, '').trim();
          initialContent = initialContent.replace(/^[:-]\s*/, '');
        }

        currentSection = {
          title: matchDef.title,
          key: matchDef.key,
          lines: initialContent ? [initialContent] : []
        };
      } else if (currentSection) {
        currentSection.lines.push(trimmed);
      } else {
        currentSection = {
          title: 'SUMMARY',
          key: 'REPORT',
          lines: [trimmed]
        };
      }
    }

    if (currentSection) sections.push(currentSection);
    return sections;
  };

  const renderCircularScore = (scoreStr) => {
    if (!scoreStr) return <div className="rp-empty-state">Not available</div>;
    const match = scoreStr.match(/(\d+(\.\d+)?)\/(\d+)/);
    if (!match) return <span className="score-val">{scoreStr}</span>;
    
    const score = parseFloat(match[1]);
    const max = parseFloat(match[3]);
    const percentage = max > 0 ? (score / max) * 100 : 0;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="rp-circular-score">
        <svg>
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#4f46e5"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="rp-circular-score-text">
          <span className="score-val">{score}</span>
          <span className="score-label">out of {max}</span>
        </div>
      </div>
    );
  };

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Initializing Audit Engine...');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef(null);

  const sections = useMemo(() => {
    const rawSections = parseReportSections(analysisResult);
    return rawSections.filter(section => {
      const content = section.lines.join(' ').toLowerCase();
      if (content.includes('none - only two candidates')) return false;
      if (content === 'none' || content === 'none.') return false;
      return true;
    });
  }, [analysisResult]);

  const [activeStep, setActiveStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  const loadingSteps = useMemo(() => [
    "Initializing GitAnalyze intelligence engine...",
    `Connecting to GitHub profile: @${username}`,
    "Scanning repositories and commit history...",
    "Evaluating code quality and tech stack...",
    "Measuring activity patterns and consistency...",
    "Assessing project depth and real-world impact...",
    "Cross-referencing against industry benchmarks...",
    "✓ Compiling final intelligence report..."
  ], [username]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isAnalyzing) return;
    
    const currentFullText = loadingSteps[activeStep];
    if (!currentFullText) return;

    if (typedText.length < currentFullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentFullText.slice(0, typedText.length + 1));
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      // Step complete
      const timeout = setTimeout(() => {
        setVisibleSteps(prev => [...prev, currentFullText]);
        if (activeStep < loadingSteps.length - 1) {
          setActiveStep(prev => prev + 1);
          setTypedText('');
        }
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isAnalyzing, activeStep, typedText, loadingSteps]);

  useEffect(() => {
    if (!username) {
      setError('No candidate username provided.');
      setIsAnalyzing(false);
      return;
    }

    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      setError('');
      try {
        const isComparison = username.includes(',');
        
        const response = await fetch('https://nettable-pretimely-lorette.ngrok-free.dev/webhook/gitanalyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: username.trim(),
            users: isComparison ? username.split(',').map(u => u.trim()) : [username.trim()],
            mode: isComparison ? 'compare' : 'analyze',
            source: 'webhook'
          })
        });

        if (!response.ok) throw new Error('Backend connection failed');

        const rawText = await response.text();
        
        let report = '';
        let data = null;
        
        // Attempt JSON parse
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          // Not JSON — treat entire response as plain string (Shape 1)
          data = null;
        }

        console.log("FULL API RESPONSE", data ?? rawText);

        // Extract avatar URL if available
        if (data) {
          let avatar = null;
          if (Array.isArray(data) && data[0]) {
            avatar = data[0].avatar_url || data[0].body?.avatar_url || data[0].data?.avatar_url;
          } else if (typeof data === 'object') {
            avatar = data.avatar_url || data.body?.avatar_url || data.data?.avatar_url;
          }
          if (avatar) setAvatarUrl(avatar);
        }

        if (data === null) {
          // Shape 1: plain string response
          report = rawText;
        } else if (typeof data === 'string') {
          // Shape 1 (alt): JSON-encoded string e.g. "\"report text\""
          report = data;
        } else if (Array.isArray(data)) {
          // Shape 6: [ { report: "..." } ] or [ { text: "..." } ] etc.
          const first = data[0];
          if (first && typeof first === 'object') {
            report = first.report || first.text || first.output || '';
            // Nested body inside array element
            if (!report && first.body) {
              report = typeof first.body === 'string' ? first.body : first.body.report || first.body.text || first.body.output || '';
            }
          } else if (first && typeof first === 'string') {
            report = first;
          }
        } else if (typeof data === 'object') {
          // Shape 5: { body: { report: "..." } }
          if (data.body && typeof data.body === 'object') {
            report = data.body.report || data.body.text || data.body.output || '';
          }
          // Shape 2/3/4: { report: "..." }, { text: "..." }, { output: "..." }
          if (!report) {
            report = data.report || data.text || data.output || '';
          }
          // Additional nested paths from n8n
          if (!report) {
            report = data.data?.report || data.data?.text || data.data?.output || '';
          }
          // Last resort: stringify the object so user sees something
          if (!report) {
            report = JSON.stringify(data, null, 2);
          }
        }

        const finalReport = typeof report === 'string' ? report.trim() : '';
        console.log("Final Parsed Report", finalReport);

        if (finalReport.toLowerCase().includes('not found')) {
          setError('❌ Candidate profile not found. Please verify the GitHub username.');
        } else if (finalReport.length === 0) {
          throw new Error('Intelligence engine returned an empty report.');
        } else {
          setAnalysisResult(finalReport);
        }
      } catch (err) {
        console.error('Audit error:', err);
        setError('⚠️ Network error. The intelligence engine is currently unreachable.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchAnalysis();
  }, [username]);

  const handleCopy = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleExport = () => {
    if (!analysisResult) return;
    const element = document.createElement("a");
    const file = new Blob([analysisResult], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `GitAnalyze_Audit_${username}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isAnalyzing) {
    return (
      <div className="report-page flex items-center justify-center" style={{ minHeight: '85vh' }}>
        <div className="terminal-loading-box">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="terminal-title">gitanalyze --intelligence-engine</span>
          </div>
          <div className="terminal-body font-mono">
            {visibleSteps.map((step, i) => (
              <div key={i} className="terminal-line dim">
                <span className="prompt">{'>'}</span> {step}
              </div>
            ))}
            {activeStep < loadingSteps.length && (
              <div className="terminal-line active">
                <span className="prompt">{'>'}</span> {typedText}
                {cursorVisible && <span className="terminal-cursor">█</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-page flex items-center justify-center" style={{ minHeight: '80vh' }}>
        <div className="rp-section-card-v4 text-center max-w-md">
          <AlertCircle size={48} className="text-[#dc2626] mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Audit Interrupted</h2>
          <p className="rp-paragraph-text mb-8">{error}</p>
          <button className="btn btn-primary w-full justify-center" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-actions flex justify-between items-center">
        <button className="btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> New Search
        </button>
        <div className="flex gap-4">
          <button className="btn" onClick={handleExport}>
            <Download size={16} /> Export TXT
          </button>
          <button className="btn btn-primary" onClick={handleCopy}>
            {copySuccess ? <ClipboardCheck size={16} /> : <Share2 size={16} />}
            {copySuccess ? 'Copied' : 'Share Audit'}
          </button>
        </div>
      </div>

      <div className="report-header-v4">
        {username?.includes(',') ? (
          <div className="flex justify-center -space-x-4 mb-4">
            {username.split(',').map(u => u.trim()).filter(Boolean).map((u, i) => (
              <img 
                key={i}
                src={`https://github.com/${u}.png`} 
                alt={u}
                className="rp-avatar-v4 !m-0 border-2"
                style={{ zIndex: 10 - i }}
              />
            ))}
          </div>
        ) : (
          <img 
            src={avatarUrl || `https://github.com/${username || 'github'}.png`} 
            alt={username}
            className="rp-avatar-v4"
          />
        )}
        <h1>@{username}</h1>
        <div className="verified-badge mb-4">
          <ShieldCheck size={14} /> Verified Technical Analysis
        </div>
        <p className="max-w-2xl mx-auto text-[14px] text-[#6b7280] leading-relaxed">
          The GitAnalyze Intelligence Engine has completed a comprehensive audit of this candidate's open-source footprint. This report synthesizes repository quality, technical depth, and architectural complexity into a verified enterprise-grade evaluation.
        </p>
      </div>

      <div className="report-workbench-v4">
        <div className="rp-sections-grid-v4" ref={resultRef}>
          {sections.filter(s => {
            const content = s.lines.join(' ').trim();
            if (!content || content === `@${username}.` || content === username) return false;
            // Filter out sections that only contain punctuation (like '.')
            if (content.length <= 2 && /^[.\-_:\s]+$/.test(content)) return false;
            return true;
          }).map((section, idx) => {
            const config = section.key ? sectionConfig[section.key] : null;
            const icon = config?.icon || <FileText size={18} />;
            const isWideCard = 
              section.key === 'PROJECTS' || 
              section.key === 'RECOMMENDATION' || 
              section.key === 'VERDICT' || 
              section.key === 'COMPARISON' ||
              section.key === 'REPORT' ||
              section.title.includes('SUMMARY');

            if (section.key === 'VERDICT') {
              return (
                <div key={idx} className="rp-verdict-card-v4">
                  {section.lines.length ? renderFormattedText(section.lines.join(' ')) : "No verdict available."}
                </div>
              );
            }

            return (
              <div 
                key={idx} 
                className={`rp-section-card-v4 ${isWideCard ? 'rp-section-highlight-v4' : ''}`}
              >
                <div className="rp-section-card-header-v4">
                  <div style={{ color: '#6b7280' }}>{icon}</div>
                  <h3 className="rp-section-card-title-v4">{section.title}</h3>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {section.key === 'SKILLS' ? (
                    <div className="rp-tags-grid-v4">
                      {section.lines.length > 0 ? section.lines.flatMap(l => l.split(/[,;|]/)).map((item, i) => {
                        const cleanItem = item.replace(/^\d+\.\s*/, '').replace(/^[•*-]\s*/, '').replace(/\.$/, '').trim();
                        if (!cleanItem) return null;
                        return (
                          <span key={i} className="rp-pill-badge-v4">{cleanItem}</span>
                        );
                      }) : <div className="rp-empty-state">Not available</div>}
                    </div>
                  ) : section.key === 'ROLES' ? (
                    <div className="flex flex-col gap-3">
                      {section.lines.length > 0 ? section.lines.map((line, i) => {
                        const cleanLine = line.replace(/^[•*-]\s*/, '').trim();
                        if (!cleanLine) return null;
                        
                        const dashIndex = cleanLine.indexOf('-');
                        if (dashIndex !== -1) {
                          const role = cleanLine.substring(0, dashIndex).trim();
                          const desc = cleanLine.substring(dashIndex + 1).trim();
                          return (
                            <div key={i} className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-lg">
                              <div className="text-[13px] font-bold text-[#4f46e5] mb-1">{role}</div>
                              <div className="text-[13px] text-[#475569] leading-relaxed">{desc}</div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={i} className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-lg text-[13px] text-[#475569]">
                              {cleanLine}
                            </div>
                          );
                        }
                      }) : <div className="rp-empty-state">Not available</div>}
                    </div>
                  ) : section.key === 'SCORE' ? (
                    <div className="flex items-center justify-center">
                      {renderCircularScore(section.lines.join(' '))}
                    </div>
                  ) : section.key === 'BREAKDOWN' ? (
                    <div className="flex flex-col gap-3">
                      {section.lines.length > 0 ? (() => {
                        // First, try to parse each line individually (handles multi-candidate ranking format)
                        const allParts = [];
                        for (const line of section.lines) {
                          let cleaned = line.replace(/\*\*/g, '').trim();
                          if (!cleaned) continue;
                          
                          // Check if this line contains a score format like "12/20"
                          const scoreMatch = cleaned.match(/(.*?)(?:[:\s-]*)\s+(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
                          if (scoreMatch) {
                            // Might have multiple metrics in one line separated by periods
                            const subParts = cleaned.split(/[.!?]/).filter(Boolean);
                            for (const sub of subParts) {
                              const subTrimmed = sub.trim();
                              if (subTrimmed) allParts.push({ type: 'raw', text: subTrimmed });
                            }
                          } else {
                            // No score format — this is a comparison-style line (e.g., "Profile Strength: user1, user2")
                            allParts.push({ type: 'raw', text: cleaned });
                          }
                        }
                        
                        return allParts.map((item, i) => {
                          const cleanPart = item.text.replace(/^[•*-]\s*/, '').trim();
                          if (!cleanPart) return null;
                          
                          // Try score/max format
                          const match = cleanPart.match(/(.*?)(?:[:\s-]*)\s+(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
                          if (match) {
                            let [, label, score, max] = match;
                            label = label.replace(/^[•*-]\s*/, '').trim();
                            if (!label) label = "Metric";
                            const pct = parseFloat(max) > 0 ? (parseFloat(score) / parseFloat(max)) * 100 : 0;
                            return (
                              <div key={i} className="rp-mini-bar-row-v4" style={{ marginBottom: '12px' }}>
                                <div className="rp-mini-bar-header">
                                  <span className="rp-mini-bar-label" style={{ fontWeight: 500 }}>{label}</span>
                                  <span className="rp-mini-bar-value">{score}/{max}</span>
                                </div>
                                <div className="rp-thin-track-v4">
                                  <div className="rp-thin-fill-v4" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            );
                          }
                          
                          // Fallback: render as formatted text row (comparison ranking format)
                          const colonIdx = cleanPart.indexOf(':');
                          if (colonIdx !== -1) {
                            const metricName = cleanPart.substring(0, colonIdx).trim();
                            const metricValue = cleanPart.substring(colonIdx + 1).trim();
                            return (
                              <div key={i} className="rp-mini-bar-row-v4" style={{ marginBottom: '12px' }}>
                                <div className="rp-mini-bar-header">
                                  <span className="rp-mini-bar-label" style={{ fontWeight: 500 }}>{metricName}</span>
                                  <span className="rp-mini-bar-value" style={{ fontWeight: 400, fontSize: '12px', color: '#6b7280' }}>{metricValue}</span>
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <p key={i} className="rp-paragraph-text">{renderFormattedText(cleanPart)}</p>
                          );
                        });
                      })() : <div className="rp-empty-state">Not available</div>}
                    </div>
                  ) : section.key === 'PROJECTS' ? (
                    <div className="rp-projects-grid-v4">
                      {section.lines.length > 0 ? section.lines.join(' \n ').split(/(?:\n|^)\s*\d+\./).filter(Boolean).map((proj, i) => {
                        const cleanProj = proj.trim();
                        if (!cleanProj) return null;
                        
                        // Safely extract title and description by matching only the FIRST colon or hyphen
                        const titleMatch = cleanProj.match(/^([^:：-]+)(?:[:：-]\s*)([\s\S]*)$/);
                        const title = titleMatch ? titleMatch[1].trim() : cleanProj.split('\n')[0].trim();
                        const desc = titleMatch ? titleMatch[2].trim() : cleanProj.substring(title.length).trim();
                        
                        const techStack = cleanProj.match(/(JavaScript|TypeScript|Python|Rust|Go|Java|C\+\+|Swift|Kotlin|React|Vue|Next\.js|Node\.js|FastAPI|TensorFlow|PyTorch|Firebase|Tailwind|HTML|CSS)/gi);
                        const uniqueTech = [...new Set(techStack || [])].slice(0, 3);
                        
                        return (
                          <div key={i} className="rp-project-row-v4">
                            <div className="rp-project-number">{i + 1}</div>
                            <div className="rp-project-content">
                              <div className="rp-project-header">
                                <div className="rp-project-title" title={title}>{renderFormattedText(title)}</div>
                                {uniqueTech.length > 0 && (
                                  <div className="flex gap-1">
                                    {uniqueTech.map((tech, idx) => (
                                      <span key={idx} className="rp-project-lang">{tech}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="rp-project-desc">{renderFormattedText(desc)}</div>
                            </div>
                          </div>
                        );
                      }) : <div className="rp-empty-state">Not available</div>}
                    </div>
                  ) : section.key === 'RECOMMENDATION' ? (
                    <div className="rp-recommendation-v4">
                      {section.lines.length > 0 ? (() => {
                        let level = '';
                        let decisionRaw = '';
                        let reasonLines = [];
                        let hasExplicitFormat = false;

                        for (const line of section.lines) {
                          const upperLine = line.toUpperCase().trim();
                          if (upperLine.startsWith('LEVEL:')) { level = line.replace(/^LEVEL:\s*/i, '').trim(); hasExplicitFormat = true; }
                          else if (upperLine.startsWith('DECISION:')) { decisionRaw = line.replace(/^DECISION:\s*/i, '').trim(); hasExplicitFormat = true; }
                          else if (upperLine.startsWith('REASON:')) { reasonLines.push(line.replace(/^REASON:\s*/i, '').trim()); hasExplicitFormat = true; }
                          else if (upperLine) reasonLines.push(line.trim());
                        }

                        // Fallback for multi-candidate or unstructured recommendation
                        if (!hasExplicitFormat) {
                          return (
                            <div className="flex flex-col gap-2">
                              {section.lines.map((line, i) => (
                                <p key={i} className="rp-paragraph-text">{line}</p>
                              ))}
                            </div>
                          );
                        }

                        let decisionClass = 'rp-rec-value';
                        if (decisionRaw.toLowerCase().includes('hire')) decisionClass += ' success';
                        else if (decisionRaw.toLowerCase().includes('hold')) decisionClass += ' warning';
                        else if (decisionRaw.toLowerCase().includes('pass')) decisionClass += ' danger';
                        
                        return (
                          <>
                            <div className="rp-rec-row">
                              <div className="rp-rec-label">LEVEL</div>
                              <div className="rp-rec-value">{level || 'N/A'}</div>
                            </div>
                            <div className="rp-rec-row">
                              <div className="rp-rec-label">DECISION</div>
                              <div className={decisionClass}>{decisionRaw || 'N/A'}</div>
                            </div>
                            <div className="rp-rec-row">
                              <div className="rp-rec-label">REASON</div>
                              <div className="rp-rec-reason">{renderFormattedText(reasonLines.join(' ') || 'Matches requirements.')}</div>
                            </div>
                          </>
                        );
                      })() : <div className="rp-empty-state">Not available</div>}
                    </div>
                  ) : section.key === 'IMPROVE' ? (
                     <div className="flex flex-col gap-2">
                       {section.lines.length > 0 ? section.lines.map((line, i) => {
                         const cleanLine = line.replace(/^[•*-]\s*/, '').trim();
                         if (!cleanLine) return null;
                         return (
                           <div key={i} className="rp-bullet-item">
                             <span className="rp-bullet-dot">•</span>
                             <span>{renderFormattedText(cleanLine)}</span>
                           </div>
                         );
                       }) : <div className="rp-empty-state">Not available</div>}
                     </div>
                  ) : (
                    <div>
                      {section.lines.length > 0 ? section.lines.map((line, i) => (
                        <p key={i} className="rp-paragraph-text mb-2 last:mb-0">{renderFormattedText(line)}</p>
                      )) : <div className="rp-empty-state">Not available</div>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
