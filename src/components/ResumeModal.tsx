import React from "react";
import { X, Download, Printer, FileText } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-text"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#1e1e1e] border border-[#3e3e44] rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-xs font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 bg-[#252526] border-b border-[#333333] flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="font-bold text-sm">
              {portfolioData.personal.firstName}_
              {portfolioData.personal.lastName}_Resume.pdf
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-2.5 py-1 rounded bg-[#2e2e34] hover:bg-[#383840] text-[#cccccc] hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={() =>
                alert(
                  `Downloading ${portfolioData.personal.firstName}_${portfolioData.personal.lastName}_Resume.pdf`,
                )
              }
              className="px-2.5 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] text-white flex items-center space-x-1 cursor-pointer transition-colors font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#858585] hover:text-white cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#18181a] space-y-6 text-[#cccccc]">
          <div className="border-b border-[#333338] pb-4">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              {portfolioData.personal.firstName}{" "}
              {portfolioData.personal.lastName}
            </h1>
            <div className="text-sm font-semibold text-[#38bdf8] mt-0.5">
              Backend Systems & AI/ML Engineer
            </div>
            <div className="text-xs text-[#8e8e93] mt-1.5 flex flex-wrap gap-x-4">
              <span>{portfolioData.personal.location}</span>
              <span>{portfolioData.personal.email}</span>
              <span>github.com</span>
              <span>linkedin.com</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#2d2d34] pb-1">
              Work Experience
            </h2>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white text-xs">
                    {exp.role} — {exp.company}
                  </span>
                  <span className="text-[11px] text-[#858585] font-mono">
                    {exp.period}
                  </span>
                </div>
                <p className="text-[11px] text-[#9999a0]">{exp.description}</p>
                <div className="space-y-1 pt-1">
                  {exp.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start space-x-1.5 text-[11px] text-[#bbbbbb]"
                    >
                      <span className="text-[#38bdf8]">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#2d2d34] pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {portfolioData.skills.map((group) => (
                <div key={group.category} className="flex">
                  <span className="font-semibold text-white w-32 shrink-0">
                    {group.category}:
                  </span>
                  <span className="text-[#a0a0ab]">
                    {group.items.map((i) => i.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
