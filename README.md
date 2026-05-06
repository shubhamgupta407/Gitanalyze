<div align="center">



# GitAnalyze

**GitHub Candidate Intelligence Engine**

*Most recruiters judge GitHub profiles by star counts and repo names.*
*GitAnalyze goes deeper.*

[![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square&labelColor=0a0a0f&color=6366f1)](https://gitanalyze.dev)
[![Version](https://img.shields.io/badge/version-2.0-blue?style=flat-square&labelColor=0a0a0f&color=6366f1)](https://github.com/shubhamgupta407/gitanalyze)
[![Engine](https://img.shields.io/badge/scoring-5--dimension-purple?style=flat-square&labelColor=0a0a0f&color=6366f1)](https://github.com/shubhamgupta407/gitanalyze)
[![Bot](https://img.shields.io/badge/telegram-live%20bot-blue?style=flat-square&labelColor=0a0a0f&color=6366f1)](https://t.me/gitanalyzebot)

<br />

```
> gitanalyze shubhamgupta407

  Fetching profile data...............  [OK]
  Scanning repositories................  [OK]
  Evaluating project signals...........  [OK]
  Computing dimension scores...........  [OK]
  Running intelligence pipeline........  [OK]

  OVERALL SCORE   →   7.8 / 10   →   STRONG HIRE
  Scan complete in 9.4s.
```

</div>

---

## The Problem With How Recruiters Evaluate GitHub

A typical recruiter opens a candidate's GitHub. Clicks through 8 repos. Tries to understand the stack. Checks the last commit date. Reads a README or two. Makes a gut call. Closes the tab. Repeats this 10 times per hiring cycle.

**That process takes 40 minutes per batch and produces subjective, inconsistent results.**

No standardized scoring. No cross-candidate comparison. No signal on what actually matters — project quality, contribution momentum, real-world impact. Just vibes and star counts.

GitAnalyze replaces that entire workflow with a structured intelligence pipeline that delivers a recruiter-ready technical report on any GitHub profile in under 10 seconds.

---

## What The Engine Does

```
INPUT          →    GitHub username
PIPELINE       →    Live data fetch → Signal extraction → Dimension scoring
                    → Intelligence analysis → Report generation
OUTPUT         →    Structured recruiter report · 10.0 point score · Role recommendation
DELIVERY       →    Telegram bot · Web dashboard · Auto-logged to recruiter sheet
TIME           →    Under 10 seconds. Every time.
```

**Full capability set:**

```
  ✦  5-dimension profile scoring          out of 10.0 — no black box
  ✦  Pinned repo intelligence             detects what the dev chose to showcase
  ✦  Full tech stack mapping              languages, frameworks, ecosystems
  ✦  Project signal analysis              quality over quantity — impact-first
  ✦  Improvement area detection           honest gaps flagged for every profile
  ✦  Multi-candidate comparison           up to 3 profiles — ranked output
  ✦  Role-based recommendation           Startup · Corporate · AI/ML · Frontend · Internship
  ✦  Auto recruiter logging              every analysis timestamped and stored
  ✦  Dual access                         Telegram bot + Web dashboard
```

---

## The Scoring Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GITANALYZE SCORING ENGINE v2.0                   │
│                                                                     │
│   Final Score = f(Presence, Project Signal, Technical Breadth,      │
│                   Momentum, Community)                              │
│                                                                     │
│   Output Range: 0.0 → 10.0                                         │
│   Data Source:  Live GitHub data — computed in real time            │
│   Method:       Programmatic — not estimated, not cached            │
└─────────────────────────────────────────────────────────────────────┘

DIMENSION 1 — PRESENCE
▓▓░░░░░░░░  Evaluates how professionally a developer presents
            themselves on the platform. Signals include profile
            completeness, long-term consistency, and public
            credibility indicators.
            Tags: [ Profile Signals ] [ Consistency ] [ Credibility ]

DIMENSION 2 — PROJECT SIGNAL                        ★ CORE DIMENSION
▓▓▓░░░░░░░  The highest-weighted dimension in the engine. Measures
            the real-world impact and quality of a developer's body
            of work — not volume. One high-signal project outweighs
            ten low-effort repositories.
            Tags: [ Work Quality ] [ Real-world Impact ] [ Showcase Strength ]

DIMENSION 3 — TECHNICAL BREADTH
▓▓░░░░░░░░  Assesses range and depth of technical exposure. Goes
            beyond language count — evaluates domain diversity and
            the complexity of ecosystems a developer has worked
            across.
            Tags: [ Stack Diversity ] [ Domain Range ] [ Complexity Signals ]

DIMENSION 4 — MOMENTUM
▓▓░░░░░░░░  Measures how actively and consistently a developer is
            building. Differentiates sustained contributors from
            developers who were active once and have since gone dark.
            Tags: [ Contribution Patterns ] [ Recency ] [ Consistency ]

DIMENSION 5 — COMMUNITY
▓░░░░░░░░░  Captures a developer's footprint beyond their own
            repositories. Reflects recognition, open source
            participation, and visibility in the broader ecosystem.
            Tags: [ Recognition ] [ Open Source ] [ Ecosystem Presence ]
```

---

## Score Interpretation

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│  1.0 – 4.0   │  4.1 – 6.0   │  6.1 – 7.5   │  7.6 – 8.9   │  9.0 – 10.0  │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│  Weak Signal │  Developing  │    Solid     │    Strong    │   Critical   │
│              │              │  Candidate   │     Hire     │   Talent     │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│  Insufficient│  Early stage │  Worth a     │  Clear       │  Exceptional │
│  evidence    │  potential   │  deeper look │  signal      │  Move fast   │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## Full Report Output

```
══════════════════════════════════════════════════════════
  GITANALYZE PROFILE REPORT
  @shubhamgupta407  ·  Generated: 28 Apr 2026  ·  v2.0
══════════════════════════════════════════════════════════

  OVERALL SCORE        7.8 / 10
  VERDICT              STRONG HIRE
  ──────────────────────────────────────────────────────

  DIMENSION SCORES
  ─────────────────────────────────────────
  Presence             ████████░░   Strong
  Project Signal       ██████████   Exceptional
  Technical Breadth    ████░░░░░░   Moderate
  Momentum             ████████░░   Active
  Community            ███░░░░░░░   Growing
  ─────────────────────────────────────────

  DETECTED STACK
  HTML · JavaScript · React · Python · Flask · Firebase · Gemini API

  STRONGEST PROJECTS
  1. American-Sign-Language-Detector
     CNN-based real-time hand sign classification.
     Demonstrates applied ML and computer vision capability.

  2. Cardiovascular-Risk-Intelligence
     Explainable AI system for heart disease risk assessment.
     Highlights healthtech domain depth.

  3. Disease-Outbreak-Prediction
     Integrates climate and demographic data for predictive analytics.
     Strong evidence of real-world problem-solving.

  ROLE RECOMMENDATION
  ✓  Best for Startup       Strong AI/ML + full-stack combination
  ✓  Best for AI/ML Teams   Multiple ML projects with real datasets
  ✓  Best for Internship    Portfolio ready, open to growth
  —  Best for Corporate     Needs more large-scale indicators

  AREAS TO IMPROVE
  —  Tech depth could expand beyond current primary stack
  —  Social proof signals are in early stage
  —  Explore more open source contributions

  FINAL VERDICT
  Recommended for technical interview. Demonstrates strong
  passion for AI and full-stack development with a portfolio
  of real-world projects that go beyond tutorial-level work.

══════════════════════════════════════════════════════════
```

---

## Multi-Candidate Comparison

```
  GITANALYZE COMPARISON REPORT
  Candidates: shubhamgupta407 · Akshat-cyber-cloud · dev-user3
  ──────────────────────────────────────────────────────────────

  RANKING
  #1  shubhamgupta407      7.8/10   ← RECOMMENDED
  #2  Akshat-cyber-cloud   7.6/10
  #3  dev-user3            6.2/10

  METRIC BREAKDOWN
  ──────────────────────────────────────────────────────────────
                        shubham    akshat    dev-user3
  Presence              ████████   ███████   █████░░░
  Project Signal        ██████████ ████████  ██████░░
  Technical Breadth     ████░░░░░░ ████████  ███░░░░░
  Momentum              ████████░░ ████████  █████░░░
  Community             ███░░░░░░░ █░░░░░░░  ██░░░░░░
  ──────────────────────────────────────────────────────────────

  ROLE-BASED RECOMMENDATION
  Startup        →  shubhamgupta407   (AI/ML + practical projects)
  Corporate      →  Akshat-cyber-cloud (broad stack, large repo count)
  AI/ML Teams    →  shubhamgupta407   (demonstrated ML capability)
  Frontend Role  →  Akshat-cyber-cloud (frontend ecosystem experience)
  Internship     →  shubhamgupta407   (portfolio ready, growth mindset)
```

---

## Access Modes

```
┌─────────────────────────────────────────────────────────┐
│  MODE 1 — TELEGRAM BOT                                  │
│  Instant analysis from any device. No dashboard needed. │
│                                                         │
│  /analyze username        Full profile report           │
│  /compare u1 u2 u3        Multi-candidate comparison    │
│                                                         │
│  Response time: < 10 seconds                            │
│  Available: 24/7                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MODE 2 — WEB DASHBOARD                                 │
│  Full visual report interface                           │
│                                                         │
│  →  Score ring with dimension breakdown bars            │
│  →  Tech stack detection with language signals          │
│  →  Repository table with quality indicators            │
│  →  Strongest projects with technical analysis          │
│  →  Role-based recommendation panel                     │
│  →  Improvement areas with honest assessment            │
│  →  Export-ready recruiter report                       │
└─────────────────────────────────────────────────────────┘
```

---

## Auto Recruiter Logging

```
Every analysis is automatically logged — zero manual effort.

┌────────────────────┬──────────┬──────────────────────┬───────┬──────────────┐
│ Timestamp          │ Command  │ Input                │ Score │ Verdict      │
├────────────────────┼──────────┼──────────────────────┼───────┼──────────────┤
│ 28/04/26 17:02:12  │ /compare │ shubham, akshat      │ 7.8   │ Recommended  │
│ 28/04/26 04:07:33  │ /analyze │ satyam-tomar         │ 10.0  │ Critical     │
│ 27/04/26 21:14:09  │ /analyze │ torvalds             │ 9.8   │ Critical     │
└────────────────────┴──────────┴──────────────────────┴───────┴──────────────┘

Full recruiter history · Timestamped · Always available · Zero manual effort
```

---

## System Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   TELEGRAM  │     │  WEB UI      │     │                 │
│   BOT INPUT │────▶│  /report     │────▶│  WEBHOOK        │
│  /analyze   │     │  ?user=xyz   │     │  TRIGGER        │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                                          ┌────────▼────────┐
                                          │  SOURCE DETECT  │
                                          │  + USERNAME     │
                                          │  EXTRACTION     │
                                          └────────┬────────┘
                                                   │
                                          ┌────────▼────────┐
                                          │  GITHUB DATA    │
                                          │  LIVE FETCH     │
                                          │  Repos/Profile  │
                                          └────────┬────────┘
                                                   │
                                          ┌────────▼────────┐
                                          │  SCORING ENGINE │
                                          │  5 Dimensions   │
                                          │  → Final Score  │
                                          └────────┬────────┘
                                                   │
                                          ┌────────▼────────┐
                                          │  INTELLIGENCE   │
                                          │  PIPELINE       │
                                          │  → Report Build │
                                          └────────┬────────┘
                                                   │
                              ┌────────────────────┴────────────────────┐
                              │                                         │
                     ┌────────▼────────┐                     ┌─────────▼───────┐
                     │  TELEGRAM       │                     │  WEB DASHBOARD  │
                     │  RESPONSE       │                     │  VISUAL REPORT  │
                     └─────────────────┘                     └─────────────────┘
                              │                                         │
                     ┌────────▼─────────────────────────────────────────▼───────┐
                     │                   GOOGLE SHEETS                          │
                     │          Auto-log · Timestamp · Score · Output           │
                     └────────────────────────────────────────────────────────┘
```

---

## Tech Stack

```
┌─────────────────────────┬──────────────────────────────────────┐
│  Layer                  │  Technology                          │
├─────────────────────────┼──────────────────────────────────────┤
│  Workflow Automation    │  n8n                                 │
│  Data Source            │  GitHub Data (Live, Real-time)       │
│  Intelligence Layer     │  AI Agent Pipeline                   │
│  Bot Interface          │  Telegram Bot API                    │
│  Recruiter Logging      │  Google Sheets (Auto-append)         │
│  Web Frontend           │  Web Dashboard (Visual Reports)      │
└─────────────────────────┴──────────────────────────────────────┘
```

---

## Project Structure

```
gitanalyze/
│
├── workflow/
│   └── gitanalyze.json          # n8n workflow export — import directly
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index            # Landing page
│   │   │   └── report           # Dynamic report page (/report?user=)
│   │   └── components/          # UI components
│   └── .env.example             # Environment config template
│
├── docs/
│   ├── telegram-demo.png        # Telegram bot output screenshot
│   ├── web-dashboard.png        # Web UI screenshot
│   └── comparison-report.png   # Multi-candidate comparison screenshot
│
└── README.md
```

---

## Setup & Deployment

```bash
# ── STEP 1: Clone ──────────────────────────────────────────────
git clone https://github.com/shubhamgupta407/gitanalyze
cd gitanalyze

# ── STEP 2: Import n8n Workflow ────────────────────────────────
# Open n8n → Workflows → Import from file
# Select: workflow/gitanalyze.json

# ── STEP 3: Configure n8n Credentials ─────────────────────────
# Add the following in n8n credentials panel:
#   - Telegram Bot Token      (from @BotFather)
#   - GitHub Personal Access Token
#   - Google Sheets OAuth2

# ── STEP 4: Set Webhook URL ────────────────────────────────────
# Copy your n8n webhook URL after activating the workflow
# Format: https://your-n8n-instance/webhook/gitanalyze

# ── STEP 5: Frontend Setup ─────────────────────────────────────
cd frontend
cp .env.example .env
# Add your webhook URL to .env:
# VITE_N8N_WEBHOOK_URL=https://your-n8n-url/webhook/gitanalyze

npm install
npm run dev

# ── STEP 6: Activate ───────────────────────────────────────────
# Toggle workflow to Active in n8n
# Start your Telegram bot
# Open web dashboard — enter any GitHub username — run analysis
```

---

## Roadmap

```
  ✅  v1.0   Telegram bot — /analyze command
  ✅  v1.5   Google Sheets auto-logging
  ✅  v2.0   Multi-candidate comparison — /compare command
  ✅  v2.0   Web dashboard — visual report interface
  ✅  v2.0   5-dimension scoring engine

  ⬜  v2.1   PDF export from web dashboard
  ⬜  v2.2   Bulk analysis mode — 10+ candidates per batch
  ⬜  v2.3   Historical candidate tracking and re-evaluation
  ⬜  v2.5   Slack bot integration
  ⬜  v3.0   Custom scoring weight configuration per team
  ⬜  v3.0   ATS integration — push reports directly to hiring tools
```

---

## Demo

```
Telegram Bot    →   docs/telegram-demo.png
Web Dashboard   →   docs/web-dashboard.png
Comparison      →   docs/comparison-report.png
```

---

<div align="center">

**Built by Shubham Gupta**

[GitHub](https://github.com/shubhamgupta407) · [LinkedIn](https://linkedin.com/in/shubhamgupta)

<br />

*Live GitHub data · 5-dimension scoring engine · Intelligent agent pipeline*

*© 2026 GitAnalyze. Built to make technical hiring smarter.*

</div>
