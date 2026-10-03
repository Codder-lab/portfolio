import React from "react";
import { portfolioData, type Experience } from "../../data/portfolioData";

export const ExperienceView: React.FC = () => {
  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-4 sm:px-8 md:px-12 py-6 sm:py-10 max-w-4xl">
      <div className="space-y-10 sm:space-y-12">
        {portfolioData.experience.map((exp: Experience, idx: number) => {
          const isCurrent = exp.period.toLowerCase().includes("present");

          return (
            <div
              key={idx}
              className="relative pl-5 sm:pl-7 border-l border-[#333338] opacity-0"
              style={{
                animation: `slideUp 0.5s ease ${0.1 + idx * 0.12}s forwards`,
              }}
            >
              <div className="absolute -left-2 top-0.5">
                {isCurrent ? (
                  <span className="w-4 h-4 rounded-full border-2 border-[#007acc] bg-[#1e1e1e] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-[#555555] bg-[#1e1e1e] block shrink-0" />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3 mb-3">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
                    />
                  ) : null}

                  <div>
                    <div className="text-xs font-mono text-[#888888] mb-0.5">
                      {exp.period}
                    </div>

                    <h2 className="font-display font-extrabold text-[18px] sm:text-[24px] text-white tracking-[-0.5px] mb-0.5 leading-tight">
                      {exp.role}
                    </h2>

                    <div className="text-sm font-mono text-[#4fc1ff] font-medium">
                      @{exp.company}
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/40 bg-emerald-950/30 px-2 py-0.5 rounded self-start shrink-0">
                    Current
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-[#9d9da5] leading-relaxed mb-4 font-mono max-w-2xl">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1.5 mb-5 font-mono text-xs text-[#bbbbbb] list-disc list-inside max-w-2xl">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="leading-relaxed">
                      <span className="text-[#cccccc]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] rounded bg-[#007acc]/10 border border-[#007acc]/30 text-[#4fc1ff] font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
