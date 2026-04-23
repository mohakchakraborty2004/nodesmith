"use client"

import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  PenTool, 
  Settings2, 
  TrendingUp, 
  GitBranch, 
  Zap, 
  Shield, 
  Network, 
  Brain, 
  History,
  Terminal,
  Globe
} from 'lucide-react';

export default function NodesmithPage() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-12 py-6">
          <div className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 font-headline">
            Nodesmith
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium">
            <a className="text-zinc-900 dark:text-zinc-100 border-b border-zinc-900 dark:border-zinc-100 transition-all duration-300" href="#">Solutions</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300" href="#">Library</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300" href="#">Enterprise</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/signup">
              <button className="bg-primary text-white text-on-primary px-6 py-2.5 rounded-full font-headline text-sm font-medium active:scale-95 transition-transform">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-24 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <span className="font-handwritten text-2xl text-primary opacity-60 block animate-slide-down">The Human Algorithm</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter leading-[0.9] text-primary">
              Automate with a <br />
              <span className="font-handwritten font-normal text-6xl md:text-8xl lg:text-9xl lowercase">human touch.</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-body leading-relaxed opacity-0 animate-fade-in-delay">
            Build complex AI workflows as naturally as writing in a journal. Nodesmith bridges the gap between machine precision and human intuition.
          </p>
          <div className="pt-8">
            <Link href="/signup">
              <button className="bg-primary text-white text-on-primary px-12 py-5 rounded-full text-lg font-headline font-bold shadow-2xl shadow-black/10 active:scale-95 transition-all hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5">
                Start Building
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-24 w-full max-w-7xl px-4">
          <div className="bg-surface-container-low rounded-[2.5rem] p-4 md:p-8 overflow-hidden aspect-[16/9] relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-highest/50 to-transparent"></div>
            <img 
              className="w-full h-full object-cover rounded-[1.5rem] shadow-sm grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhZBDjrSndDazdPgKSwm3lpu9X0_b3pc1bK88yiHGBSnaEQIggfXfEX0v3LB3tOJYLcT4CJHg8EzBRMaRC6X0ZanTq-VAyTiq0dezwgfVqaHGPFsVXQhz_gB5ibGI1uJZq0BdCt4D-5NVafqVaErf1Kw94XWW1mIkSlRSgAmcTN0ru9Pk1XEIwPQv7abrfVrHSAqTsDFKxWW4q4l4KrC89K2p07YXnEPhXa-_3c31g_sLJL7RGWE3HflXPYMyLgS6iQeubhYYbnS0" 
              alt="UI Dashboard" 
            />
            <div className="absolute bottom-12 left-12 p-6 bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl border border-white/20 max-w-xs text-left">
              <Sparkles className="w-5 h-5 text-primary mb-2" />
              <p className="font-handwritten text-lg leading-snug italic text-primary">
                "It feels like the software knows exactly what I'm trying to solve before I finish the node."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Bento Layout) */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-12">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-primary uppercase">The Process</h2>
            <div className="w-24 h-1 bg-primary mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-surface-container-low rounded-[2rem] p-12 flex flex-col justify-between group overflow-hidden">
              <div className="max-w-md">
                <span className="font-label text-xs uppercase tracking-widest text-outline mb-4 block">Step 01</span>
                <h3 className="text-3xl font-headline font-bold mb-6">Capture the intent</h3>
                <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                  Describe your objective in natural language. Our semantic engine parses your goals and suggests the most efficient architectural paths.
                </p>
              </div>
              <div className="mt-12 bg-surface-container-highest h-64 rounded-xl flex items-center justify-center border-2 border-dashed border-outline-variant/30 group-hover:border-primary/40 transition-colors duration-500">
                <PenTool className="w-16 h-16 text-primary/20 group-hover:text-primary/50 transition-all duration-500 group-hover:scale-110" />
              </div>
            </div>

            <div className="md:col-span-5 bg-primary text-on-primary rounded-[2rem] p-12 flex flex-col justify-between hover:bg-zinc-900 transition-colors duration-300">
              <div className="relative z-10">
                <span className="font-label text-xs uppercase tracking-widest text-surface-variant/60 mb-4 block">Step 02</span>
                <h3 className="text-3xl font-headline font-bold mb-6">Orchestrate Nodes</h3>
                <p className="text-surface-variant/80 font-body text-lg leading-relaxed">
                  Drag and drop high-performance nodes for LLMs, data processing, and external API integrations.
                </p>
              </div>
              <div className="mt-12 space-y-4">
                <div className="h-12 bg-white/10 rounded-full flex items-center px-4 gap-3 hover:bg-white/20 transition-colors">
                  <Settings2 className="w-4 h-4" />
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-white/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="h-12 bg-white/20 rounded-full flex items-center px-4 gap-3 ml-8 hover:bg-white/30 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-surface-container-highest rounded-[2rem] p-12">
              <span className="font-label text-xs uppercase tracking-widest text-outline mb-4 block">Step 03</span>
              <h3 className="text-3xl font-headline font-bold mb-6">Continuous Refinement</h3>
              <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                AI observes your manual edits and learns your specific style, improving future suggestions automatically.
              </p>
            </div>

            <div className="md:col-span-7 bg-surface-container-low rounded-[2rem] overflow-hidden relative">
              <img 
                className="w-full h-full object-cover grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7nqV7KbffKfdj9_TsrSPiuto1450iUHKoU2QlH--Yj2nHaxtX9Oi9XDr4w-xCLxAnvm8mEKMZieYRgk8WqKQOlR9OE9lsstV_pwYgbnDvc08ZbwanAXHQ0XTCkFZmPnIwjRSy3lwN0vYI72n9MdB-PcfstFb6FD9MOTIPfWcq5UWjA4O2uYnF3zdCMoYh8dz7D1wWhfcfEVulsX1lXyjOFFGFp5UgDhliI3N2toiyvXJI-sqVOPwtxeF4eD97fIAXGA2NHYPMNgw" 
                alt="Keyboard detail" 
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-none mb-8">Architecting the future of work.</h2>
              <p className="font-handwritten text-3xl opacity-50 italic">Everything you need, nothing you don't.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
            <FeatureItem icon={<GitBranch className="w-6 h-6" />} title="Infinite Branching" description="Create non-linear logic that adapts to real-world edge cases with conditional routing." />
            <FeatureItem icon={<Zap className="w-6 h-6" />} title="Latency Optimization" description="Global edge deployment ensures your workflows trigger in milliseconds, regardless of complexity." />
            <FeatureItem icon={<Shield className="w-6 h-6" />} title="Enterprise Vault" description="SOC2 compliant secret management for all your API keys and sensitive processing data." />
            <FeatureItem icon={<Network className="w-6 h-6" />} title="Universal Connect" description="Pre-built connectors for over 500+ SaaS applications, ready for immediate deployment." />
            <FeatureItem icon={<Brain className="w-6 h-6" />} title="Self-Healing Logic" description="AI-monitored error handling that fixes broken connections without human intervention." />
            <FeatureItem icon={<History className="w-6 h-6" />} title="Time Machine" description="Replay any execution at any timestamp to debug and audit the precise logic path taken." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-8">
          <div className="font-headline text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            © 2024 Nodesmith. The Human Algorithm.
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">API Docs</FooterLink>
            <FooterLink href="#">System Status</FooterLink>
          </div>
          <div className="flex gap-4">
            <Terminal className="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer" />
            <Globe className="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="space-y-6 group">
      <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
        <span className="text-primary">{icon}</span>
      </div>
      <h4 className="text-xl font-headline font-bold">{title}</h4>
      <p className="text-on-surface-variant font-body leading-relaxed">{description}</p>
    </div>
  );
}

function FooterLink({ href, children } : { href: string, children: React.ReactNode }) {
  return (
    <a className="font-headline text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-zinc-300 transition-opacity" href={href}>
      {children}
    </a>
  );
}