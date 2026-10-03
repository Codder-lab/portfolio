import React from "react";
import { portfolioData } from "../../data/portfolioData";

export const ReadmeView: React.FC = () => {
  const { personal, skills } = portfolioData;

  const topBadges = [
    { label: "React JS & React Native", dotColor: "#61dafb", borderColor: "#61dafb44" },
    { label: "TypeScript", dotColor: "#3178c6", borderColor: "#3178c644" },
    { label: "Node.js", dotColor: "#4ec9b0", borderColor: "#4ec9b044" },
    { label: "AI / LLMs", dotColor: "#c586c0", borderColor: "#c586c044" },
    { label: "MongoDB", dotColor: "#10b981", borderColor: "#10b98144" },
  ];

  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-6 sm:px-12 py-10 max-w-4xl font-mono text-xs sm:text-sm">
      <div className="text-xs sm:text-[13px] text-[#9d9da5] mb-3 opacity-0 animate-su-1">
        Software Developer {personal.companyBadge} · {personal.location}
      </div>

      <div className="flex flex-wrap gap-2 mb-8 opacity-0 animate-su-2">
        {topBadges.map((badge, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs border rounded-sm bg-white/3 font-mono"
            style={{ borderColor: badge.borderColor }}
          >
            <span
              className="w-1.75 h-1.75 rounded-full shrink-0"
              style={{ backgroundColor: badge.dotColor }}
            />
            <span className="text-[#dddddd]">{badge.label}</span>
          </span>
        ))}
      </div>

      <div className="space-y-4 mb-8 opacity-0 animate-su-3">
        <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white tracking-tight flex items-center gap-2">
          <span>About Me</span>
        </h2>

        <p className="text-xs sm:text-[13px] text-[#9d9da5] leading-relaxed max-w-2xl">
          Hi, {personal.firstName} on this side! I am a Software Developer focused on building modern, scalable and user-centric software products. My experience spans mobile development with React Native, backend engineering with Node.js and Express, database architecture, and building intelligent AI agents and RAG pipelines.
        </p>

        <div className="space-y-2 pt-1 text-xs text-[#bbbbbb] max-w-2xl">
          {personal.currentFocus?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="text-sm shrink-0">{item.icon}</span>
              <span className="leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-10 opacity-0 animate-su-4">
        <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white tracking-tight">
          Stack
        </h2>

        <div className="space-y-3 max-w-3xl">
          {skills.map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs"
            >
              <span className="text-[#888888] font-bold w-44 shrink-0">
                {categoryGroup.category}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categoryGroup.items.map((item) => (
                  <span
                    key={item.name}
                    className="px-2.5 py-0.5 rounded text-[11px] bg-white/4 border border-white/8 text-[#cccccc] font-mono"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-10 opacity-0 animate-su-5">
        <h2 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white tracking-tight">
          Connect
        </h2>

        <div className="space-y-1.5 text-xs text-[#9d9da5] max-w-xl">
          <div>
            <span className="text-[#888888]">Email: </span>
            <a
              href={`mailto:${personal.email}`}
              className="text-[#4fc1ff] hover:underline"
            >
              {personal.email}
            </a>
          </div>
          <div>
            <span className="text-[#888888]">GitHub: </span>
            <a
              href="https://github.com/Codder-lab"
              target="_blank"
              rel="noreferrer"
              className="text-[#4fc1ff] hover:underline"
            >
              Codder-lab
            </a>
          </div>
          <div>
            <span className="text-[#888888]">LinkedIn: </span>
            <a
              href="https://www.linkedin.com/in/suyash-potdar-030b86281/"
              target="_blank"
              rel="noreferrer"
              className="text-[#4fc1ff] hover:underline"
            >
              suyash-potdar-030b86281
            </a>
          </div>
        </div>
      </div>

      <div className="border border-[#333338] bg-white/2 rounded-lg p-5 sm:p-6 text-xs text-[#888888] leading-relaxed max-w-2xl opacity-0 animate-su-6">
        <div className="font-bold text-white mb-2 flex items-center gap-1.5">
          <span>©</span>
          <span>Copyright & Usage</span>
        </div>

        <p className="mb-3">
          This portfolio, including its design, layout, VS Code theme, AI chatbot, and all visual elements was designed and built from scratch by {personal.firstName} {personal.lastName}. All rights reserved.
        </p>

        <p className="mb-3">
          You are <strong className="text-[#f44747] font-semibold">not permitted</strong> to copy, clone or replicate this portfolio in whole or in part, without explicit written permission. This includes the design system, component structure, animations and overall aesthetic.
        </p>

        <p>
          If this portfolio inspired you, please build something <strong className="text-white">original</strong> that reflects your own identity.
        </p>
      </div>
    </div>
  );
};
