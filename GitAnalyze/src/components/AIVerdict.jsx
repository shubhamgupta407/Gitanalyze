import { Bot } from 'lucide-react';
import './AIVerdict.css';

export default function AIVerdict({ text }) {
  return (
    <div className="ai-verdict">
      <div className="ai-verdict-header flex items-center">
        <Bot size={18} className="ai-icon" />
        <span className="ai-label">Claude AI Verdict</span>
      </div>
      <div className="ai-verdict-body">
        <p className="ai-text">"{text}"</p>
      </div>
    </div>
  );
}
