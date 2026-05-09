import { useState, useEffect } from 'react';
import { Terminal, Loader2, CheckCircle2 } from 'lucide-react';
import './AnalysisLoader.css';

const STEPS = [
  "Connecting to GitHub API...",
  "Scanning repositories...",
  "Checking commit consistency...",
  "Detecting tech stack...",
  "Running AI recruiter analysis...",
  "Preparing final report..."
];

export default function AnalysisLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="analysis-loader-overlay">
      <div className="loader-content glass-card">
        <div className="loader-header flex items-center gap-3 mb-6">
          <div className="pulse-dot"></div>
          <span className="mono text-xs uppercase tracking-widest text-primary">System Intelligence Active</span>
        </div>
        
        <div className="terminal-window">
          <div className="terminal-header flex gap-1.5 mb-4">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          
          <div className="terminal-body mono">
            {STEPS.map((step, index) => (
              <div key={index} className={`terminal-line flex items-center gap-3 ${index > currentStep ? 'pending' : ''} ${index === currentStep ? 'active' : ''} ${completedSteps.includes(index) ? 'completed' : ''}`}>
                <span className="line-status">
                  {completedSteps.includes(index) ? (
                    <CheckCircle2 size={14} className="text-success" />
                  ) : index === currentStep ? (
                    <Loader2 size={14} className="animate-spin text-primary" />
                  ) : (
                    <div className="status-dot"></div>
                  )}
                </span>
                <span className="line-text">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="loader-footer mt-8">
          <div className="neon-progress-bar">
            <div 
              className="neon-progress-fill" 
              style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-4 mono text-xs text-tertiary">
            DO NOT CLOSE THE BROWSER
          </p>
        </div>
      </div>
    </div>
  );
}
