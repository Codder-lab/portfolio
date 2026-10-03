import React from "react";
import {
  Files,
  Search,
  GitBranch,
  FileDown,
  Settings,
} from "lucide-react";

interface ActivityBarProps {
  activeView: "explorer" | "search" | "git";
  setActiveView: (view: "explorer" | "search" | "git") => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  onOpenSettings: () => void;
  onDownloadResume: () => void;
}

interface NavButton {
  id: "explorer" | "search" | "git";
  icon: React.ElementType;
  title: string;
  badge?: string;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  activeView,
  setActiveView,
  isSidebarOpen,
  setIsSidebarOpen,
  onOpenSettings,
  onDownloadResume,
}) => {
  const topButtons: NavButton[] = [
    { id: "explorer", icon: Files, title: "Explorer (Ctrl+Shift+E)" },
    { id: "search", icon: Search, title: "Search (Ctrl+Shift+F)" },
    {
      id: "git",
      icon: GitBranch,
      title: "Source Control (Ctrl+Shift+G)",
      badge: "1",
    },
  ];

  const handleClick = (id: "explorer" | "search" | "git") => {
    if (activeView === id) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveView(id);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="w-11 sm:w-12 bg-[#181818] border-r border-[#26262a] flex flex-col justify-between items-center py-2 select-none z-30 shrink-0">
      <div className="flex flex-col items-center space-y-3 w-full">
        {topButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeView === btn.id && isSidebarOpen;

          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleClick(btn.id)}
              className={`w-full h-11 relative flex items-center justify-center text-[#858585] hover:text-white transition-colors cursor-pointer group ${
                isActive ? "text-white" : ""
              }`}
              title={btn.title}
            >
              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-white rounded-r" />
              )}

              <Icon className="w-5 h-5 group-hover:scale-105 transition-transform" />

              {btn.badge && (
                <span className="absolute top-2 right-2 bg-[#007acc] text-white text-[9px] font-semibold px-1 rounded-full leading-tight">
                  {btn.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Direct Download Resume Button */}
        <button
          type="button"
          onClick={onDownloadResume}
          className="w-full h-11 relative flex items-center justify-center text-[#858585] hover:text-[#38bdf8] transition-colors cursor-pointer group"
          title="Download Resume (PDF)"
        >
          <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col items-center space-y-3 w-full">
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-full h-10 flex items-center justify-center text-[#858585] hover:text-white transition-colors cursor-pointer"
          title="Manage & Themes"
        >
          <Settings className="w-5 h-5 hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
};
