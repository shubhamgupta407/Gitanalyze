import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Crown, Star, ShieldCheck, 
  Zap, Rocket, Building2, BrainCircuit, Layout, 
  Database, CheckCircle2, Loader2, Search,
  ArrowRight, Terminal, Copy, RefreshCw,
  AlertCircle, ClipboardCheck, Users
} from 'lucide-react';
import './ComparisonPage.css';

export default function ComparisonPage() {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState(['', '', '']);
  const [isComparing, setIsComparing] = useState(false);
  const [compareResult, setCompareResult] = useState(null);
  const [compareError, setCompareError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Fetching profile data...');
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef(null);

  const loadingSteps = [
    "Fetching profiles...",
    "Comparing repositories...",
    "Evaluating tech stacks...",
    "Running AI matchup...",
    "Building final report..."
  ];

  useEffect(() => {
    let interval;
    if (isComparing) {
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % loadingSteps.length;
        setLoadingMessage(loadingSteps[step]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isComparing]);

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
  }, [compareResult]);

  useEffect(() => {
    if (compareResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [compareResult]);

  const handleCompareSubmit = async (e) => {
    e.preventDefault();
    // Clean, unique, non-empty users
    const activeUsers = [...new Set(userInputs.map(u => u.trim()).filter(Boolean))];
    
    if (activeUsers.length < 2) {
      setCompareError('⚠️ Enter at least 2 unique candidate usernames to compare.');
      return;
    }

    if (activeUsers.length > 3) {
      setCompareError('⚠️ Maximum 3 candidates supported for side-by-side matchups.');
      return;
    }
    
    setIsComparing(true);
    setCompareResult(null);
    setCompareError('');
    setLoadingMessage(loadingSteps[0]);
    
    try {
      const response = await fetch('https://nettable-pretimely-lorette.ngrok-free.dev/webhook/gitanalyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          message: {
            text: `/compare ${activeUsers.join(', ')}`,
            chat: { id: 'web-user' }
          }
        })
      });
      
      if (!response.ok) throw new Error('Network error');
      
      const responseText = await response.text();
      let reportText = '';
      
      try {
        const data = JSON.parse(responseText);
        console.log("Webhook Raw Response:", data);
        
        reportText = data.report || 
                     data.text || 
                     data.output || 
                     data.body?.report || 
                     data.body?.text || 
                     (typeof data === 'string' ? data : '');

        if (!reportText && typeof data === 'object') {
          reportText = JSON.stringify(data);
        }
      } catch (e) {
        console.log("Webhook Raw Response (Plain Text):", responseText);
        reportText = responseText;
      }
      
      const finalReport = reportText?.trim();
      console.log("Final Parsed Report:", finalReport);

      if (finalReport?.toLowerCase().includes('not found')) {
        setCompareError('❌ One or more profiles not found. Check the usernames.');
      } else if (!finalReport) {
        throw new Error('Empty response');
      } else {
        setCompareResult(finalReport);
      }
    } catch (err) {
      console.error('Comparison error:', err);
      setCompareError('⚠️ Connection error. Make sure the backend is running.');
    } finally {
      setIsComparing(false);
    }
  };

  const handleCopy = () => {
    if (!compareResult) return;
    navigator.clipboard.writeText(compareResult);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleReset = () => {
    setCompareResult(null);
    setUserInputs(['', '', '']);
    setCompareError('');
  };

  const updateUserInput = (index, val) => {
    const newInputs = [...userInputs];
    newInputs[index] = val.replace(/\s/g, '');
    setUserInputs(newInputs);
    if (compareError) setCompareError('');
  };

  return (
    <div className="comparison-page container relative z-10">
      <div className="bg-orbs fixed inset-0">
        <div className="orb orb-1 opacity-20"></div>
        <div className="orb orb-2 opacity-20"></div>
      </div>

      <div className="report-actions flex justify-between items-center mb-10 relative z-10">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="comparison-header text-center mb-12 relative z-10">
        <h1 className="text-4xl mb-4 font-black">Multi-Candidate <span className="text-gradient">Matchup</span></h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Enter up to 3 GitHub usernames to run a side-by-side technical evaluation and AI ranking.
        </p>
      </div>

      <div className="compare-workbench max-w-4xl mx-auto mb-16 relative z-10">
        <form className="compare-form" onSubmit={handleCompareSubmit}>
          <div className="compare-inputs-grid">
            {userInputs.map((user, idx) => (
              <div key={idx} className="compare-input-wrapper glass-card">
                <div className="input-header">
                  <Users size={14} />
                  <span>Candidate #{idx + 1}</span>
                </div>
                <input
                  type="text"
                  placeholder="GitHub Username"
                  value={user}
                  onChange={(e) => updateUserInput(idx, e.target.value)}
                  disabled={isComparing || compareResult}
                  className="compare-field"
                />
              </div>
            ))}
          </div>

          {!compareResult && (
            <div className="compare-actions mt-8 text-center">
              <button type="submit" className="btn btn-primary compare-btn" disabled={isComparing}>
                {isComparing ? 'Running Matchup...' : 'Run Side-by-Side Analysis'}
                {!isComparing && <ArrowRight size={18} />}
              </button>
              
              {isComparing && (
                <div className="analyze-loading-container mx-auto">
                  <div className="terminal-loading-bar">
                    <div className="loading-fill"></div>
                  </div>
                  <p className="loading-status-text">
                    <Loader2 className="animate-spin" size={14} /> {loadingMessage}
                  </p>
                </div>
              )}

              {compareError && (
                <div className="analyze-error-box mx-auto mt-6">
                  <AlertCircle size={16} />
                  <span>{compareError}</span>
                </div>
              )}
            </div>
          )}
        </form>

        {compareResult && (
          <div className="analysis-result-card reveal active mt-12" ref={resultRef}>
            <div className="result-header">
              <div className="header-left">
                <Trophy size={18} />
                <span className="header-title">Comparison Audit: {userInputs.filter(Boolean).join(' vs ')}</span>
              </div>
              <div className="header-actions">
                <button className="action-btn" onClick={handleCopy}>
                  {copySuccess ? <ClipboardCheck size={16} className="text-success" /> : <Copy size={16} />}
                  {copySuccess ? 'Copied' : 'Copy Report'}
                </button>
                <button className="action-btn btn-new" onClick={handleReset}>
                  <RefreshCw size={16} /> New Matchup
                </button>
              </div>
            </div>
            <div className="result-body">
              <div className="terminal-line-numbers">
                {compareResult.split('\n').map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className="result-text-pre">
                {compareResult}
              </pre>
            </div>
            <div className="result-footer">
              <span className="footer-status">MATCHUP COMPLETED</span>
              <span className="footer-meta">GitAnalyze Comparison Engine v2.0</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
