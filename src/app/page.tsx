'use client';

import './globals.css';
import { useEffect } from 'react';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';

const projects = [
  {
    title: 'Personal Statement Builder',
    description: 'Create outstanding personal statements with step-by-step guidance.',
    url: 'https://sqwy-reviews.vercel.app/',
  },
  {
    title: 'University Admissions Consultation Portal',
    description: 'Strategic insights and tools to aid your university admissions',
    url: 'https://your-brand-consulting.com',
  },
  {
    title: 'Research',
    description: 'Coming Soon',
    url: 'https://your-mentorship-portal.com',
  },
  {
    title: 'Project X',
    description: 'Wait and See',
    url: 'https://your-mentorship-portal.com',
  },
];

// Reusable AdSense component
function AdUnit({ slot }: { slot: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', margin: '2rem 0' }}
      data-ad-client="ca-pub-8176331384379089"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

export default function HomePage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ Load AdSense script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8176331384379089';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Cursor tracking
    const handleMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);

    // Fade-in observer
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-gray-100 px-4">
      {/* Hero Section */}
      <section className="section fade-in">
        {/* SQWY title */}
        <h1
          className="
            text-[8rem] md:text-[10rem]
            font-extrabold
            tracking-tight
            relative
            drop-shadow-[0_0_20px_rgba(255,255,200,0.8)]
          "
          style={{
            background: 'linear-gradient(90deg, #FFD700, #FFFFFF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SQWY
          {/* Optional glint overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-white/0 animate-[shineMove_10s_linear_infinite] pointer-events-none"></span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-2xl md:text-4xl font-serif italic max-w-2xl mx-auto mb-12 relative drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, #C0C0C0, #E0E0E0, #FFFFFF, #E0E0E0, #C0C0C0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'silverShift 6s ease-in-out infinite alternate',
          }}
        >
          A comprehensive collection of ongoing projects
          <span className="absolute top-0 left-0 w-1/3 h-full bg-white/25 rotate-12 -translate-x-full animate-[glintSilver_2s_linear_infinite] pointer-events-none"></span>
          <span className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-[sparkleSilver1_3s_linear_infinite] pointer-events-none"></span>
          <span className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-60 animate-[sparkleSilver2_4s_linear_infinite] pointer-events-none"></span>
        </p>
      </section>

      {/* AdSense Hero Banner */}
      <AdUnit slot="1234567890" />

      {/* Projects Section */}
      <section className="section grid grid-cols-1 md:grid-cols-3 gap-12 fade-in w-full max-w-6xl px-6 md:px-0">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            description={project.description}
            url={project.url}
          />
        ))}
      </section>

      {/* AdSense Mid-Page Banner */}
      <AdUnit slot="1234567891" />

      {/* Contact Section */}
      <section
        id="contact"
        className="section flex flex-col items-center fade-in mt-24 w-full px-6 md:px-0 relative"
      >
        {/* Floating shimmer particles behind form */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-40 bg-gradient-to-r from-yellow-400 to-yellow-200 animate-floating-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Luxurious Contact Header */}
        <div className="relative z-20 inline-block px-4 py-2 bg-black/30 rounded">
          <h2
            className="text-6xl md:text-7xl font-playfair tracking-[0.25em] text-center"
            style={{
              background:
                'linear-gradient(120deg, #bfbfbf, #ffffff 20%, #e6e6e6 40%, #a0a0a0 60%, #d9d9d9 80%, #f2f2f2)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation:
                'shineMove 10s ease-in-out infinite, shimmerPulse 4s ease-in-out infinite',
            }}
          >
            Get in Touch
          </h2>
        </div>

        {/* Floating Organic Glass Form */}
        <form
          action="mailto:sqwyofficial@gmail.com"
          method="post"
          className="relative flex flex-col items-center gap-6 w-[22rem] md:w-[26rem] mx-auto
                     p-6 rounded-[2.5rem] backdrop-blur-2xl transition-all duration-700 ease-out"
        >
          <div className="absolute top-[3.2rem] left-1/2 -translate-x-1/2 w-[95%] h-[4.5rem]
                          bg-gradient-to-br from-yellow-400/40 via-yellow-300/25 to-yellow-200/20
                          rounded-[2.5rem] blur-3xl opacity-70 animate-pulse-slow -z-10"></div>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-6 py-4 rounded-[2rem]
                       bg-gradient-to-br from-gray-950/70 via-gray-900/60 to-gray-950/70
                       border border-yellow-400/30 text-yellow-100 placeholder-yellow-200/70
                       focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:ring-offset-2
                       shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]
                       transition-all duration-500 hover:scale-[1.02]"
          />

          <button
            type="submit"
            className="w-[60%] py-3 mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
                       text-black font-bold rounded-[2rem]
                       shadow-[0_5px_25px_rgba(212,175,55,0.4)]
                       hover:shadow-[0_10px_45px_rgba(212,175,55,0.7)]
                       hover:scale-[1.05] transition-all duration-500"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
