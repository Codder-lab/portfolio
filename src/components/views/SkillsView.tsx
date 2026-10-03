import React, { useState } from "react";
import { portfolioData, type SkillCategory } from "../../data/portfolioData";
import { ChevronDown, ChevronRight } from "lucide-react";

export const SkillsView: React.FC = () => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="w-full bg-[#1e1e1e] text-[#d4d4d4] px-6 sm:px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-4 pb-12 font-mono text-xs sm:text-sm">
        <div className="text-[#6a9955] text-xs opacity-0 animate-su-1">
          // skills.json - Interactive technical capabilities and toolchains
        </div>

        <div className="bg-[#252526]/40 p-4 sm:p-6 rounded-lg border border-[#333338] space-y-2 select-text opacity-0 animate-su-2">
          <div className="text-yellow-400 font-bold">&#123;</div>
          <div className="pl-4 sm:pl-6 space-y-4">
            <div className="text-xs text-[#858585] opacity-0 animate-su-3">
              <span className="text-[#9cdcfe]">"profile"</span>:{" "}
              <span className="text-[#ce9178]">
                "{portfolioData.personal.firstName}{" "}
                {portfolioData.personal.lastName}"
              </span>
              ,
            </div>

            <div className="space-y-3 opacity-0 animate-su-4">
              <span className="text-[#9cdcfe]">"technical_stack"</span>: &#91;
              <div className="pl-4 sm:pl-6 space-y-4 mt-2">
                {portfolioData.skills.map((group: SkillCategory, idx) => {
                  const isClosed = !!collapsed[group.category];

                  return (
                    <div
                      key={group.category}
                      className="bg-[#1e1e24] p-3 rounded border border-[#2f2f35] opacity-0"
                      style={{
                        animation: `slideUp 0.5s ease ${0.35 + idx * 0.08}s forwards`,
                      }}
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => toggleCategory(group.category)}
                      >
                        <div className="flex items-center space-x-1.5">
                          {isClosed ? (
                            <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                          )}
                          <span className="text-[#4ec9b0] font-bold">
                            "{group.category}"
                          </span>
                          : &#91;
                        </div>
                        <span className="text-[10px] text-[#858585]">
                          {group.items.length} items
                        </span>
                      </div>

                      {!isClosed && (
                        <div className="pl-6 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {group.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between bg-[#25252a] px-3 py-1.5 rounded border border-[#383842] text-xs hover:border-[#38bdf8]/40 transition-colors"
                            >
                              <span className="text-[#ce9178]">
                                "{item.name}"
                              </span>
                              {item.level && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#007acc]/20 text-[#7dd3fc] font-sans">
                                  {item.level}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 text-white font-bold">
                        &#93;{idx < portfolioData.skills.length - 1 ? "," : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-white font-bold">&#93;</div>
            </div>
          </div>
          <div className="text-yellow-400 font-bold">&#125;</div>
        </div>
      </div>
    </div>
  );
};
