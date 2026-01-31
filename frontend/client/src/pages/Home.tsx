/*
 * DESIGN: "Cyber Trust" - Main Landing Page
 * 
 * Layout: Hero Section + Interactive Graph + Side Panel
 * Colors: Dark background, green verified, blue connections
 * Typography: Space Grotesk (headings) + Inter (body)
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Network, 
  CheckCircle2, 
  Github, 
  ExternalLink,
  X,
  Sparkles,
  Users,
  BadgeCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrustGraph from '@/components/TrustGraph';

// Profile data for the detail panel
const profilesData: Record<string, {
  name: string;
  role: string;
  domain: string;
  skills: string[];
  verified: boolean;
  connections: number;
  trustScore: number;
  verifications: { type: string; source: string; date: string }[];
}> = {
  lena: {
    name: "Lena Garcia",
    role: "Data Engineer",
    domain: "lena.cv",
    skills: ["Python", "FastAPI", "LangChain", "SQL", "AWS"],
    verified: true,
    connections: 12,
    trustScore: 94,
    verifications: [
      { type: "GitHub", source: "EchoDocs repo", date: "2025-12" },
      { type: "Work", source: "EY Consulting", date: "2024-08" },
    ]
  },
  john: {
    name: "John Smith",
    role: "Senior ML Engineer",
    domain: "john.cv",
    skills: ["Python", "PyTorch", "LangChain", "FastAPI"],
    verified: true,
    connections: 8,
    trustScore: 89,
    verifications: [
      { type: "GitHub", source: "AI Platform", date: "2025-11" },
      { type: "Endorsement", source: "Lena Garcia", date: "2025-10" },
    ]
  },
  maria: {
    name: "Maria Santos",
    role: "Data Architect",
    domain: "maria.cv",
    skills: ["SQL", "Python", "Snowflake", "AWS"],
    verified: true,
    connections: 15,
    trustScore: 97,
    verifications: [
      { type: "Work", source: "EY Consulting", date: "2024-06" },
      { type: "Certification", source: "AWS Solutions Architect", date: "2024-03" },
    ]
  },
  alex: {
    name: "Alex Chen",
    role: "Full Stack Developer",
    domain: "alex.cv",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    verified: true,
    connections: 6,
    trustScore: 82,
    verifications: [
      { type: "GitHub", source: "Cloud Migration", date: "2025-09" },
    ]
  },
  sarah: {
    name: "Sarah Johnson",
    role: "DevOps Engineer",
    domain: "sarah.cv",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
    verified: false,
    connections: 3,
    trustScore: 45,
    verifications: []
  }
};

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedProfile(nodeId);
    setShowPanel(true);
  }, []);

  const closePanel = useCallback(() => {
    setShowPanel(false);
    setTimeout(() => setSelectedProfile(null), 300);
  }, []);

  const profile = selectedProfile ? profilesData[selectedProfile] : null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with hero image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Header */}
      <header className="relative z-20 border-b border-border/50 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-green">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
              Trust<span className="text-primary">Graph</span>
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="glow-green">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Your .cv
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
                <BadgeCheck className="w-4 h-4" />
                Powered by .cv domains
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              The Professional Network
              <br />
              <span className="text-primary text-glow-green">Where Trust is Verified</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Stop trusting resumes. Start trusting proof. TrustGraph verifies professional skills 
              through code contributions, work history, and peer endorsements—all anchored to 
              your <span className="text-secondary">.cv domain</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button size="lg" className="glow-green">
                <Network className="w-5 h-5 mr-2" />
                Explore the Graph
              </Button>
              <Button size="lg" variant="outline" className="border-secondary/50 hover:bg-secondary/10">
                <ExternalLink className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12"
          >
            {[
              { icon: Users, value: "2,847", label: "Verified Profiles" },
              { icon: CheckCircle2, value: "12,493", label: "Verified Connections" },
              { icon: Zap, value: "94%", label: "Trust Accuracy" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Graph Section */}
        <section className="flex-1 relative min-h-[700px]">
          <div className="container h-full pb-8" style={{ height: '700px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-full rounded-2xl overflow-hidden glass-card border border-border/50"
            >
              <TrustGraph onNodeClick={handleNodeClick} />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Profile Detail Panel */}
      <AnimatePresence>
        {showPanel && profile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass-card border-l border-border/50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <button
                  onClick={closePanel}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center
                    ${profile.verified ? 'bg-primary/20 glow-green' : 'bg-muted'}
                  `}>
                    <span className="text-2xl font-bold text-primary">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                        {profile.name}
                      </h2>
                      {profile.verified && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{profile.role}</p>
                    <a href={`https://${profile.domain}`} className="text-sm text-secondary hover:underline">
                      {profile.domain}
                    </a>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="mb-6 p-4 rounded-xl bg-card/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Trust Score</span>
                    <span className={`text-2xl font-bold ${profile.trustScore >= 80 ? 'text-primary' : profile.trustScore >= 50 ? 'text-yellow-500' : 'text-destructive'}`}>
                      {profile.trustScore}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${profile.trustScore}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className={`h-full rounded-full ${profile.trustScore >= 80 ? 'bg-primary' : profile.trustScore >= 50 ? 'bg-yellow-500' : 'bg-destructive'}`}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50 text-center">
                    <div className="text-2xl font-bold text-foreground">{profile.connections}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50 text-center">
                    <div className="text-2xl font-bold text-foreground">{profile.verifications.length}</div>
                    <div className="text-sm text-muted-foreground">Verifications</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">VERIFIED SKILLS</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`
                          px-3 py-1.5 text-sm font-medium rounded-lg
                          ${profile.verified 
                            ? 'bg-primary/20 text-primary border border-primary/30' 
                            : 'bg-muted text-muted-foreground border border-muted'
                          }
                        `}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verifications */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">VERIFICATION HISTORY</h3>
                  {profile.verifications.length > 0 ? (
                    <div className="space-y-3">
                      {profile.verifications.map((v, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{v.type}</div>
                            <div className="text-xs text-muted-foreground">{v.source}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{v.date}</div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No verifications yet</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 glow-green">
                    <Network className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Built for HelloCV Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Powered by Ola.cv + AI/ML API + Daytona
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
