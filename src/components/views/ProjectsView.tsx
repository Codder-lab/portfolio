import React from "react";
import { portfolioData, type Project } from "../../data/portfolioData";

export const ProjectsView: React.FC = () => {
  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-4 sm:px-8 md:px-12 py-6 sm:py-10 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.projects.map((project: Project, idx: number) => {
          return (
            <div
              key={project.id}
              className="border border-[#333338] hover:border-[#007acc]/60 rounded-lg p-4 sm:p-6 bg-white/2 flex flex-col justify-between group transition-all duration-200 opacity-0"
              style={{
                animation: `slideUp 0.5s ease ${0.1 + Math.min(idx, 8) * 0.08}s forwards`,
              }}
            >
              <div>
                {/* Top header row: Category & Links */}
                <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-1.5 truncate min-w-0">
                    {project.emoji && (
                      <span className="text-sm shrink-0">{project.emoji}</span>
                    )}
                    <span
                      className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase truncate"
                      style={{ color: project.categoryColor || "#4fc1ff" }}
                    >
                      {project.category || "FULL STACK · APPLICATION"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-white/14 rounded text-[#cccccc] hover:text-white hover:border-white/35 transition-colors font-mono cursor-pointer no-underline"
                      >
                        <span>GitHub</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-[#007acc]/40 rounded text-[#38bdf8] bg-[#007acc]/10 hover:bg-[#007acc]/20 transition-colors font-mono cursor-pointer no-underline"
                      >
                        <span>Live</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-display font-extrabold text-[18px] sm:text-[22px] text-white tracking-[-0.5px] mb-2 sm:mb-2.5 group-hover:text-[#4fc1ff] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#9d9da5] leading-relaxed mb-4 sm:mb-5 font-mono">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] bg-white/4 border border-white/8 text-[#888888] font-mono hover:text-[#cccccc] transition-colors"
                  >
                    {tag}
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
