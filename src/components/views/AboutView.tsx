import React from "react";
import { portfolioData } from "../../data/portfolioData";

export const AboutView: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-6 sm:px-12 py-10 max-w-4xl">
      <p className="text-xs sm:text-sm text-[#6a9955] font-mono opacity-0 animate-su-1 mb-2">
        &lt;!-- about.html - {personal.firstName} {personal.lastName} --&gt;
      </p>

      <h1 className="font-display font-extrabold text-[38px] sm:text-[50px] leading-tight text-white tracking-[-1.5px] opacity-0 animate-su-2">
        About Me
      </h1>

      <p className="text-xs sm:text-[13px] text-[#777777] font-mono mb-7 opacity-0 animate-su-2">
        // who I am · what I do · where I build
      </p>

      <div className="border border-[#333338] bg-white/2 rounded-lg p-5 sm:p-7 space-y-4 mb-7 opacity-0 animate-su-3 font-mono text-xs sm:text-sm leading-relaxed text-[#bbbbbb]">
        <p>
          Hi! I'm{" "}
          <strong className="text-[#4fc1ff] font-semibold">
            {personal.firstName} {personal.lastName}
          </strong>
          , a Software Developer focused on building modern, scalable and user-centric software products.
        </p>

        <p>
          My experience spans{" "}
          <strong className="text-[#4fc1ff] font-medium">mobile application development</strong>,{" "}
          <strong className="text-[#4fc1ff] font-medium">backend engineering</strong>, API integration, database management and{" "}
          <strong className="text-[#4fc1ff] font-medium">AI-powered applications</strong>.
        </p>

        <p>
          Currently a{" "}
          <strong className="text-[#4fc1ff] font-medium">
            Software Developer at {personal.companyBadge.replace("@ ", "")}
          </strong>
          , building production mobile apps, backend microservices, and intelligent AI features that power real-world products.
        </p>

        <p className="text-[#999999]">
          I also have a background in Business Analysis, which helps me understand product requirements, business workflows and translate real-world problems into practical technical solutions.
        </p>
      </div>

      <div className="mb-8 opacity-0 animate-su-4">
        <h2 className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-[#4ec9b0] mb-3 uppercase">
          CURRENT FOCUS
        </h2>

        <div className="border border-[#333338] bg-white/2 rounded-lg p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-[#bbbbbb]">
            {personal.currentFocus?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="shrink-0 text-sm">{item.icon}</span>
                <span className="leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="opacity-0 animate-su-5">
        <h2 className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-[#4ec9b0] mb-3 uppercase">
          EDUCATION
        </h2>

        <div className="space-y-3">
          {personal.education?.map((edu, idx) => (
            <div
              key={idx}
              className="border border-[#333338] bg-white/2 rounded-lg p-4 sm:p-5 flex flex-col justify-between hover:border-[#333338]/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-2">
                <div className="flex items-start sm:items-center gap-3.5">
                  {edu.logo ? (
                    <div
                      className={`w-11 h-11 rounded-lg border border-white/10 p-1 flex items-center justify-center shrink-0 shadow-sm ${
                        edu.logoBg || "bg-white/5"
                      }`}
                    >
                      <img
                        src={edu.logo}
                        alt={edu.school}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xl shrink-0">{edu.icon || "🎓"}</span>
                  )}

                  <div>
                    <h3 className="font-mono font-bold text-white text-sm sm:text-base leading-snug">
                      {edu.school}
                    </h3>
                    {edu.university && (
                      <div className="text-xs font-mono text-[#888888] mt-0.5">
                        {edu.university}
                      </div>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs text-[#888888] shrink-0 sm:ml-4 sm:self-start bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  {edu.period}
                </span>
              </div>

              <div className="text-xs font-mono text-[#4fc1ff] font-medium pl-0 sm:pl-14.5 mb-1 mt-1">
                {edu.degree}
              </div>

              {edu.minors && (
                <div className="text-xs font-mono text-[#888888] pl-0 sm:pl-14.5 mb-1">
                  {edu.minors}
                </div>
              )}

              {edu.grade && (
                <div className="text-xs font-mono text-[#4ec9b0] font-semibold pl-0 sm:pl-14.5 mt-1">
                  {edu.grade}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
