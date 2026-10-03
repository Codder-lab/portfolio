import React from "react";
import { X } from "lucide-react";
import { fileList } from "./Sidebar";

interface TabBarProps {
  openTabs: string[];
  activeFileId: string;
  onSelectTab: (fileId: string) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  openTabs,
  activeFileId,
  onSelectTab,
  onCloseTab,
}) => {
  return (
    <div className="h-8 sm:h-9 bg-[#252526] flex items-center border-b border-[#1e1e1e] overflow-x-auto scrollbar-none select-none text-xs shrink-0 [webkit-overflow-scrolling:touch]">
      {openTabs.map((fileId) => {
        const file = fileList.find((f) => f.id === fileId) || {
          id: fileId,
          name: fileId,
          icon: null,
        };
        const isActive = activeFileId === fileId;

        return (
          <div
            key={fileId}
            onClick={() => onSelectTab(fileId)}
            className={`h-full flex items-center px-2.5 sm:px-3.5 space-x-1.5 sm:space-x-2 border-r border-[#1e1e1e] cursor-pointer group transition-colors shrink-0 ${
              isActive
                ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc] font-medium"
                : "bg-[#2d2d2d] text-[#969696] hover:bg-[#282828] hover:text-[#cccccc]"
            }`}
          >
            <span className="shrink-0 scale-90 sm:scale-100">{file.icon}</span>
            <span className="truncate max-w-24 sm:max-w-32 text-[11px] sm:text-xs">
              {file.name}
            </span>

            <button
              type="button"
              onClick={(e) => onCloseTab(fileId, e)}
              className={`p-1 sm:p-0.5 rounded-sm hover:bg-[#4d4d4d] hover:text-white cursor-pointer transition-opacity ml-1 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              title="Close Tab"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
