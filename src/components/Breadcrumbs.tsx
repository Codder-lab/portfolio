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
    <div className="h-6 bg-[#1e1e1e] border-b border-[#252528] px-4 flex items-center text-[11px] text-[#8e8e93] select-none shrink-0 font-mono">
      <span className="hover:text-white cursor-pointer transition-colors">
        {portfolioData.personal.username}
      </span>
      <ChevronRight className="w-3 h-3 mx-1.5 text-[#555555]" />
      <span className="hover:text-white cursor-pointer transition-colors">
        src
      </span>
      <ChevronRight className="w-3 h-3 mx-1.5 text-[#555555]" />
      <div className="flex items-center space-x-1.5 text-[#cccccc]">
        {currentFile?.icon}
        <span className="font-semibold text-white">{activeFileId}</span>
      </div>
    </div>
  );
};
