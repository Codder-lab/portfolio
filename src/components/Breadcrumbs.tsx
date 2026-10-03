import React from "react";
import { ChevronRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { fileList } from "./Sidebar";

interface BreadcrumbsProps {
  activeFileId: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeFileId }) => {
  const currentFile = fileList.find((f) => f.id === activeFileId);

  return (
    <div className="h-6 bg-[#1e1e1e] border-b border-[#252528] px-3 sm:px-4 flex items-center text-[10px] sm:text-[11px] text-[#8e8e93] select-none shrink-0 font-mono overflow-x-auto scrollbar-none whitespace-nowrap">
      <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors truncate">
        {portfolioData.personal.username}
      </span>
      <ChevronRight className="hidden sm:inline w-3 h-3 mx-1 sm:mx-1.5 text-[#555555] shrink-0" />
      <span className="hover:text-white cursor-pointer transition-colors">
        src
      </span>
      <ChevronRight className="w-3 h-3 mx-1 sm:mx-1.5 text-[#555555] shrink-0" />
      <div className="flex items-center space-x-1.5 text-[#cccccc] truncate">
        <span className="shrink-0 scale-90 sm:scale-100">{currentFile?.icon}</span>
        <span className="font-semibold text-white truncate">{activeFileId}</span>
      </div>
    </div>
  );
};
