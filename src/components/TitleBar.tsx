import React from "react";
import { Search, PanelLeft, Terminal } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface TitleBarProps {
  onOpenCommandPalette: () => void;
  onNavigateFile: (fileId: string) => void;
  onToggleTerminal?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

interface MenuItemAction {
  label: string;
  shortcut?: string;
  action: () => void;
}

interface MenuGroup {
  label: string;
  items: MenuItemAction[];
}

export const TitleBar: React.FC<TitleBarProps> = ({
  onOpenCommandPalette,
  onNavigateFile,
  onToggleTerminal,
  onToggleSidebar,
}) => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const menuItems: MenuGroup[] = [
    {
      label: "File",
      items: [
        {
          label: "New File",
          shortcut: "⌘ N",
          action: () => onNavigateFile("home.tsx"),
        },
        {
          label: "Open home.tsx",
          shortcut: "1",
          action: () => onNavigateFile("home.tsx"),
        },
        {
          label: "Open projects.js",
          shortcut: "2",
          action: () => onNavigateFile("projects.js"),
        },
        {
          label: "Open experience.ts",
          shortcut: "3",
          action: () => onNavigateFile("experience.ts"),
        },
        {
          label: "Open skills.json",
          shortcut: "4",
          action: () => onNavigateFile("skills.json"),
        },
        {
          label: "Open contact.css",
          shortcut: "5",
          action: () => onNavigateFile("contact.css"),
        },
        {
          label: "Download Resume",
          shortcut: "⌘ D",
          action: () => onNavigateFile("Resume.pdf"),
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Quick Search",
          shortcut: "⌘ F",
          action: onOpenCommandPalette,
        },
        {
          label: "Command Palette",
          shortcut: "⌘ P",
          action: onOpenCommandPalette,
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Explorer",
          shortcut: "⇧ ⌘ E",
          action: () => onNavigateFile("_home.tsx"),
        },
        {
          label: "Toggle Terminal",
          shortcut: " ⌃ `",
          action: () => onToggleTerminal?.(),
        },
      ],
    },
    {
      label: "Go",
      items: [
        {
          label: "Go to File...",
          shortcut: "⌘ P",
          action: onOpenCommandPalette,
        },
      ],
    },
    {
      label: "Run",
      items: [
        {
          label: "Start Debugging",
          shortcut: "F5",
          action: () =>
            alert(
              "Debugger: Running Suyash Potdar Portfolio v2.0 in production mode!",
            ),
        },
      ],
    },
    {
      label: "Terminal",
      items: [
        {
          label: "New Terminal",
          shortcut: "⌃ ⇧ `",
          action: () => onToggleTerminal?.(),
        },
        {
          label: "Toggle Terminal",
          shortcut: "⌃ ` ",
          action: () => onToggleTerminal?.(),
        },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Documentation", action: () => onNavigateFile("README.md") },
      ],
    },
  ];

  return (
    <div
      className="h-9 bg-[#1f1f24] text-[#cccccc] border-b border-[#2b2b30] flex items-center justify-between px-2.5 sm:px-3 text-xs select-none relative z-50 shrink-0"
      onClick={() => setActiveMenu(null)}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2 mr-1">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80" />
        </div>

        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-1 text-[#999999] hover:text-white hover:bg-[#333338] rounded cursor-pointer transition-colors"
            title="Toggle Explorer"
          >
            <PanelLeft className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="hidden md:flex items-center space-x-1 text-[#b5b5b5]">
          {menuItems.map((menu) => (
            <div key={menu.label} className="relative">
              <button
                type="button"
                className={`px-2 py-0.5 rounded hover:bg-[#333338] transition-colors cursor-pointer ${
                  activeMenu === menu.label ? "bg-[#333338] text-white" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === menu.label ? null : menu.label);
                }}
              >
                {menu.label}
              </button>

              {activeMenu === menu.label && (
                <div
                  className="absolute left-0 top-full mt-1 bg-[#252526] border border-[#454545] rounded shadow-2xl py-1 min-w-50 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {menu.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full text-left px-3 py-1.5 hover:bg-[#094771] hover:text-white flex items-center justify-between text-xs text-[#cccccc] cursor-pointer"
                      onClick={() => {
                        item.action();
                        setActiveMenu(null);
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] text-[#858585] ml-4 font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 min-w-0">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full h-6 bg-[#2b2b32] hover:bg-[#32323a] border border-[#3c3c44] rounded px-2 sm:px-3 flex items-center justify-between text-[#999999] hover:text-white transition-all text-xs cursor-pointer shadow-sm group"
        >
          <div className="flex items-center space-x-1.5 sm:space-x-2 truncate">
            <Search className="w-3 h-3 text-[#797985] group-hover:text-[#38bdf8] transition-colors shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">
              {portfolioData.personal.username} :{" "}
              {portfolioData.personal.repoName}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 bg-[#1e1e24] px-1.5 py-0.5 rounded border border-[#3a3a44] text-[10px] text-[#8e8ea0] font-mono shrink-0">
            <span>Ctrl</span>
            <span>P</span>
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 text-[#999999] shrink-0">
        {onToggleTerminal && (
          <button
            type="button"
            onClick={onToggleTerminal}
            className="md:hidden p-1 text-[#999999] hover:text-white hover:bg-[#333338] rounded cursor-pointer transition-colors"
            title="Toggle Integrated Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
