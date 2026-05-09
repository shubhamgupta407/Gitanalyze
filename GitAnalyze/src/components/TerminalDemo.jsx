import { useState, useEffect, useRef } from 'react';
import './TerminalDemo.css';

const terminalLines = [
  { text: '> gitanalyze torvalds', type: 'command' },
  { text: '> Initializing intelligence engine...', type: 'info' },
  { text: '> Scanning repositories and commit history...', type: 'info' },
  { text: '> Evaluating code quality and tech stack...', type: 'info' },
  { text: '> Assessing project depth and real-world impact...', type: 'info' },
  { text: '> ✓ Analysis complete.', type: 'success' },
  { text: '', type: 'empty' },
  { text: '[REPORT SUMMARY]', type: 'header' },
  { text: '| Overall Score: 9.4/10', type: 'result' },
  { text: '| Strongest Repos: linux, git, subsurface', type: 'result' },
  { text: '| Top Stack: C, Shell, Assembly', type: 'result' },
  { text: '| Commit Streak: 1400+ days', type: 'result' },
  { text: '| Open Source Impact: 94/100', type: 'result' },
  { text: '', type: 'empty' },
  { text: 'Verdict: Critical Talent / Level 9', type: 'highlight' },
  { text: '', type: 'empty' },
  { text: '> Scan complete in 3.2s.', type: 'final' }
];

const MAX_LINES = 9;

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    // If we've processed all lines
    if (currentLineIndex >= terminalLines.length) {
      const loopTimeout = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 2000); // Wait 2s then restart
      return () => clearTimeout(loopTimeout);
    }

    const line = terminalLines[currentLineIndex];
    
    // Handle final line pause
    if (line.type === 'final' && currentCharIndex === 0) {
      const finalDelay = setTimeout(() => {
        setCurrentCharIndex(1); // Start typing the final line after a long pause
      }, 3500);
      return () => clearTimeout(finalDelay);
    }

    // Handle empty lines instantly
    if (line.type === 'empty') {
      setVisibleLines(prev => {
        const next = [...prev, { ...line, displayed: '' }];
        return next.length > MAX_LINES ? next.slice(1) : next;
      });
      setCurrentLineIndex(prev => prev + 1);
      return;
    }

    // Standard typewriter logic
    const charDelay = line.type === 'command' || line.type === 'final' ? 50 : 20;
    const timer = setTimeout(() => {
      if (currentCharIndex < line.text.length) {
        const newText = line.text.substring(0, currentCharIndex + 1);
        setVisibleLines(prev => {
          const newLines = [...prev];
          if (currentCharIndex === 0) {
            if (newLines.length >= MAX_LINES) newLines.shift();
            newLines.push({ ...line, displayed: newText });
          } else {
            newLines[newLines.length - 1].displayed = newText;
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Move to next line
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    }, charDelay);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, terminalLines]);

  return (
    <div className="terminal-demo">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">gitanalyze — torvalds — 80x24</div>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-scroll-area">
          {visibleLines.map((line, idx) => {
            const isActive = idx === visibleLines.length - 1;
            const isCommand = line.type === 'command';
            const isFinal = line.type === 'final';
            return (
              <div key={idx} className={`terminal-line line-${line.type} ${isActive ? 'active' : ''}`}>
                {line.displayed}
                {isActive && currentLineIndex < terminalLines.length && (
                  <span className="terminal-cursor"></span>
                )}
              </div>
            );
          })}
          {currentLineIndex === terminalLines.length && <span className="terminal-cursor"></span>}
        </div>
      </div>
    </div>
  );
}
