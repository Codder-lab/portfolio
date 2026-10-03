import React, { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "../Icons";
import { portfolioData } from "../../data/portfolioData";

interface HomeViewProps {
  onNavigateFile: (fileId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateFile }) => {
  const phrases = portfolioData.personal.typewriterPhrases;
  const [currentText, setCurrentText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    const speed = isDeleting ? 28 : 70;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentPhrase.slice(0, charIdx - 1));
        if (charIdx - 1 <= 0) {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
          setCharIdx(0);
          return;
        }
        setCharIdx((prev) => prev - 1);
      } else {
        setCurrentText(currentPhrase.slice(0, charIdx + 1));
        if (charIdx + 1 >= currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
        setCharIdx((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx, phrases]);

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <GithubIcon className="w-3.5 h-3.5" />;
      case "linkedin":
        return <LinkedinIcon className="w-3.5 h-3.5" />;
      case "instagram":
        return <InstagramIcon className="w-3.5 h-3.5" />;
      case "youtube":
        return <YoutubeIcon className="w-3.5 h-3.5" />;
      case "medium":
        return <span className="font-serif font-black text-xs">M</span>;
      case "tableau":
        return <span className="font-bold text-xs">#</span>;
      case "leetcode":
        return <span className="font-mono font-bold text-xs">&lt;/&gt;</span>;
      case "mail":
        return (
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-6 sm:px-12 py-10 lg:py-12 max-w-235">
      <p className="text-xs sm:text-sm text-vscode-green mb-2.5 opacity-0 animate-su-1 font-mono">
        {portfolioData.personal.welcomeComment}
      </p>

      <div className="flex items-center gap-4 mb-3.5 opacity-0 animate-su-2">
        <h1
          className="font-display font-extrabold leading-none text-vscode-bright tracking-[-2.5px]"
          style={{ fontSize: "clamp(38px, 6vw, 76px)" }}
        >
          {portfolioData.personal.firstName}
          <br />
          <em className="not-italic text-vscode-purple relative inline-block">
            {portfolioData.personal.lastName}
            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-linear-to-r from-vscode-purple to-transparent" />
          </em>
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 opacity-0 animate-su-3 font-mono">
        {portfolioData.personal.roleBadges.map((badge, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs border border-white/10 rounded-sm bg-white/3 hover:border-white/20 transition-colors"
          >
            <span
              className="w-1.75 h-1.75 rounded-full shrink-0"
              style={{ background: badge.dotColor }}
            />
            <span>{badge.label}</span>
          </div>
        ))}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs border border-vscode-purple/30 rounded-sm text-vscode-purple bg-transparent">
          <span>{portfolioData.personal.companyBadge}</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-vscode-dim mb-5 min-h-6.25 opacity-0 animate-su-3 font-mono">
        {currentText}
        <span className="text-vscode-purple animate-blink">|</span>
      </p>

      <p className="text-[13px] sm:text-[14px] text-vscode-dim leading-[1.9] max-w-135 mb-7 opacity-0 animate-su-4 font-mono select-text">
        {portfolioData.personal.bio.lead}{" "}
        <strong className="text-vscode-blue font-medium">
          {portfolioData.personal.bio.highlight1}
        </strong>
        {portfolioData.personal.bio.comma}{" "}
        <strong className="text-vscode-blue font-medium">
          {portfolioData.personal.bio.highlight2}
        </strong>
        {portfolioData.personal.bio.and}{" "}
        <strong className="text-vscode-blue font-medium">
          {portfolioData.personal.bio.highlight3}
        </strong>
        {portfolioData.personal.bio.closing}{" "}
        <strong className="text-vscode-blue font-medium">
          {portfolioData.personal.bio.highlight4}
        </strong>
        {portfolioData.personal.bio.period}
      </p>

      <div className="flex gap-2.5 flex-wrap opacity-0 animate-su-5 font-mono">
        <button
          type="button"
          onClick={() => onNavigateFile("projects.js")}
          className="inline-flex items-center gap-2 px-5 py-2 bg-vscode-blue2 text-white text-xs font-mono rounded-sm hover:opacity-85 transition-opacity cursor-pointer"
        >
          📁 Projects
        </button>

        <button
          type="button"
          onClick={() => onNavigateFile("about.html")}
          className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors cursor-pointer bg-transparent"
        >
          👤 About Me
        </button>

        <button
          type="button"
          onClick={() => onNavigateFile("contact.css")}
          className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors cursor-pointer bg-transparent"
        >
          ✉️ Contact
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-12 border border-vscode-border rounded overflow-hidden opacity-0 animate-su-6">
        {portfolioData.stats.map((stat, idx) => (
          <div
            key={idx}
            className="px-4 py-4 bg-white/2 text-center hover:bg-white/4 transition-colors"
          >
            <span className="font-display text-[22px] font-extrabold text-vscode-bright block mb-0.5">
              {stat.value}
            </span>
            <span className="text-[10px] text-vscode-dim uppercase tracking-widest font-mono">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6 flex-wrap opacity-0 animate-su-7 font-mono">
        {portfolioData.socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-vscode-border rounded-sm text-vscode-dim text-xs transition-all no-underline hover:text-white cursor-pointer"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = social.color + "66";
              e.currentTarget.style.color = "var(--bright)";
              e.currentTarget.style.background = social.color + "15";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.color = "";
              e.currentTarget.style.background = "";
            }}
          >
            <span
              style={{
                color: social.color,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {renderSocialIcon(social.iconName)}
            </span>
            <span>{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
