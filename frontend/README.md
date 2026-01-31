# TrustGraph 🔒

**The Professional Network Where Trust is Verified**

TrustGraph is a revolutionary professional networking platform that replaces self-reported credentials with cryptographically verified proof of work. Built for the HelloCV Hackathon 2026, it demonstrates how decentralized identity (.cv domains) can create a more trustworthy professional ecosystem.

![TrustGraph Hero](./client/public/images/hero-bg.png)

## 🎯 The Problem

Traditional professional networks like LinkedIn suffer from:
- **Unverified claims**: Anyone can claim any skill or experience
- **Resume fraud**: 85% of recruiters have caught lies on resumes
- **Weak endorsements**: Endorsements are often reciprocal favors, not real validations
- **No proof of work**: No way to verify actual contributions to projects

## 💡 Our Solution

TrustGraph creates a **trust graph** where:
1. **Identity is anchored** to .cv domains (powered by **Ola.cv**)
2. **Skills are verified** through code analysis, work history, and peer validation (powered by **AI/ML API**)
3. **Connections are weighted** by verified collaborations and endorsements
4. **Everything runs securely** in isolated sandboxes (powered by **Daytona**)

## 🏗️ Architecture

```
┌─────────────────┐
│   .cv Domain    │ ← Identity Layer (Ola.cv)
└────────┬────────┘
         │
┌────────▼────────┐
│  TrustGraph UI  │ ← Frontend (React + React Flow)
└────────┬────────┘
         │
┌────────▼────────┐
│  Backend API    │ ← Verification Engine (FastAPI)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│ AI/ML│  │Daytona│ ← Verification Services
└──────┘  └──────┘
```

## ✨ Features

### 🌐 Interactive Trust Graph
- Real-time visualization of professional connections
- Color-coded verification status (green = verified, gray = pending)
- Animated edges showing relationship strength
- Click any node to see detailed verification history

### 🔐 Verified Identity
- Each profile is anchored to a .cv domain
- DNS-based proof of ownership
- Cannot be faked or duplicated

### 🤖 AI-Powered Skill Verification
- Analyzes GitHub repositories for actual code contributions
- Validates work history through cross-references
- Detects skill endorsements from verified connections

### 🏆 Trust Score
- Algorithmic reputation based on:
  - Number of verified connections
  - Quality of code contributions
  - Endorsements from high-trust profiles
  - Work history consistency

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Flow** for graph visualization
- **Framer Motion** for animations
- **Tailwind CSS 4** with custom "Cyber Trust" theme
- **shadcn/ui** components

### Backend (from existing repo)
- **FastAPI** (Python)
- **LangChain** for AI orchestration
- **PostgreSQL** for data persistence

### Integrations
- **Ola.cv** - Decentralized identity via .cv domains
- **AI/ML API** - Skill extraction and verification
- **Daytona** - Secure code execution sandboxes

## 🎨 Design Philosophy

**"Cyber Trust"** - A dark, futuristic aesthetic that communicates security and technology:

- **Colors**:
  - Background: Deep space black (`oklch(0.08 0.02 260)`)
  - Verified: Emerald green (`oklch(0.7 0.2 160)`)
  - Connections: Electric blue (`oklch(0.6 0.2 250)`)
  - Accent: Cyan glow (`oklch(0.75 0.15 195)`)

- **Typography**:
  - Display: Space Grotesk (bold, geometric)
  - Body: Inter (clean, readable)

- **Effects**:
  - Glassmorphism cards with backdrop blur
  - Glow effects on verified elements
  - Smooth animations and transitions
  - Pulse animations for trust indicators

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/lenaschwantes/trustgraph.git
cd trustgraph

# Install frontend dependencies
cd trustgraph-frontend
pnpm install

# Start development server
pnpm dev
```

## 🎮 Usage

1. **Explore the Graph**: Navigate the interactive network visualization
2. **Click a Profile**: View detailed verification history and trust score
3. **Check Connections**: See verified work relationships and endorsements
4. **Verify Your Own**: Connect your .cv domain to join the network

## 🏆 Hackathon Submission

**Built for**: HelloCV Hackathon 2026  
**Category**: Professional Identity & Trust  
**Sponsors Used**:
- ✅ Ola.cv (Identity layer)
- ✅ AI/ML API (Skill verification)
- ✅ Daytona (Secure execution)

**Open Source**: Yes (MIT License)

## 🎬 Demo Video

[Watch the 3-minute demo](https://youtu.be/your-video-here) ← *Coming soon*

## 👥 Team

- **Lena Garcia** - Full Stack Development & AI Integration
- Built with ❤️ in 48 hours

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- **Ola.cv** for pioneering decentralized professional identity
- **AI/ML API** for powerful skill analysis capabilities
- **Daytona** for secure code execution infrastructure
- The HelloCV Hackathon organizers and judges

---

**TrustGraph** - *Stop trusting resumes. Start trusting proof.* 🔒✨
