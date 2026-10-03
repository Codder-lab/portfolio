import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Search as SearchIcon,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  ReactIcon,
  HtmlIcon,
  JsIcon,
  TsIcon,
  JsonIcon,
  CssIcon,
  MarkdownIcon,
  PdfIcon,
} from "./Icons";
import { portfolioData } from "../data/portfolioData";

export interface FileItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  isDownload?: boolean;
}

interface SidebarProps {
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  activeView: "explorer" | "search" | "git";
  onSearchQuery?: (q: string) => void;
  onClose?: () => void;
}

export const fileList: FileItem[] = [
  { id: "home.tsx", name: "home.tsx", icon: <ReactIcon /> },
  { id: "about.html", name: "about.html", icon: <HtmlIcon /> },
  { id: "projects.js", name: "projects.js", icon: <JsIcon /> },
  { id: "skills.json", name: "skills.json", icon: <JsonIcon /> },
  { id: "experience.ts", name: "experience.ts", icon: <TsIcon /> },
  { id: "contact.css", name: "contact.css", icon: <CssIcon /> },
  { id: "README.md", name: "README.md", icon: <MarkdownIcon /> },
  {
    id: "Resume.pdf",
    name: `${portfolioData.personal.firstName}_${portfolioData.personal.lastName}_Resume...`,
    icon: <PdfIcon />,
    isDownload: true,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeFileId,
  onSelectFile,
  activeView,
  onClose,
}) => {
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredFiles = fileList.filter((f) =>
    f.name.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const getViewTitle = () => {
    switch (activeView) {
      case "explorer":
        return "Explorer";
      case "search":
        return "Search";
      case "git":
        return "Source Control: Git";
      default:
        return "Explorer";
    }
  };

  return (
    <div className="fixed md:relative top-9 md:top-auto bottom-6 md:bottom-auto left-11 sm:left-12 md:left-auto z-40 md:z-auto w-64 md:w-60 max-w-[calc(100vw-48px)] bg-[#252526] text-[#cccccc] flex flex-col justify-between border-r border-[#1e1e1e] select-none text-xs shrink-0 font-sans shadow-2xl md:shadow-none">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="px-4 py-2.5 flex items-center justify-between text-[11px] font-bold tracking-wider text-[#969696] uppercase border-b border-[#2d2d30] shrink-0">
          <span className="truncate">{getViewTitle()}</span>
          <div className="flex items-center space-x-1.5 text-[#858585]">
            <button
              type="button"
              className="hover:text-white cursor-pointer transition-colors p-0.5 rounded"
              title="Refresh view"
              onClick={() => setSearchFilter("")}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            {onClose && (
              <button
                type="button"
                className="md:hidden hover:text-white cursor-pointer transition-colors p-0.5 rounded"
                title="Close sidebar"
                onClick={onClose}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {activeView === "explorer" && (
          <div className="py-1">
            <button
              type="button"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
              className="w-full flex items-center justify-between px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer font-bold text-[11px] tracking-wide"
            >
              <div className="flex items-center space-x-1">
                {isFolderOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-[#999999]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
                )}
                <span>PORTFOLIO</span>
              </div>
            </button>

            {isFolderOpen && (
              <div className="mt-0.5 space-y-0.5">
                {filteredFiles.map((file) => {
                  const isActive = activeFileId === file.id;

                  return (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => onSelectFile(file.id)}
                      className={`w-full flex items-center px-6 py-1 space-x-2 text-left transition-colors cursor-pointer group ${
                        isActive
                          ? "bg-[#37373d] text-white font-medium border-l-2 border-[#007acc]"
                          : "hover:bg-[#2a2d2e] text-[#cccccc]"
                      }`}
                    >
                      <span className="shrink-0">{file.icon}</span>
                      <span className="truncate text-xs group-hover:text-white">
                        {file.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeView === "search" && (
          <div className="p-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files & sections..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-2.5 py-1 text-xs text-white placeholder:text-[#858585] focus:outline-none focus:border-[#007acc]"
              />
              <SearchIcon className="w-3.5 h-3.5 text-[#777777] absolute right-2.5 top-2" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#888888] uppercase tracking-wider font-semibold">
                Matched Files
              </span>
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => onSelectFile(file.id)}
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-[#2a2d2e] rounded text-left text-xs cursor-pointer"
                >
                  {file.icon}
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeView === "git" && (
          <div className="p-3 text-xs space-y-3">
            <div className="bg-[#1e1e1e] p-2.5 rounded border border-[#333338] space-y-1.5 text-[#aaaaaa]">
              <div className="text-[11px] flex justify-between text-emerald-400 font-mono font-medium">
                <span>Branch: main</span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Clean</span>
                </span>
              </div>
              <p className="text-[10px] text-[#888888]">
                Working tree clean. All changes committed to production.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
