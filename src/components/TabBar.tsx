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
    <div className="h-9 bg-[#252526] flex items-center border-b border-[#1e1e1e] overflow-x-auto scrollbar-none select-none text-xs shrink-0">
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
            className={`h-full flex items-center px-3.5 space-x-2 border-r border-[#1e1e1e] cursor-pointer group transition-colors ${
              isActive
                ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc] font-medium"
                : "bg-[#2d2d2d] text-[#969696] hover:bg-[#282828] hover:text-[#cccccc]"
            }`}
          >
            <span className="shrink-0">{file.icon}</span>
            <span className="truncate max-w-30 text-xs">{file.name}</span>

            <button
              type="button"
              onClick={(e) => onCloseTab(fileId, e)}
              className={`p-0.5 rounded-sm hover:bg-[#4d4d4d] hover:text-white cursor-pointer transition-opacity ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              title="Close Tab"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
