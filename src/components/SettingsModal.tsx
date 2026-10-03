import React, { useEffect, useRef } from "react";
import { Check, Search, Terminal, Download, Maximize2, X } from "lucide-react";
import { getThemes, type Theme } from "../data/themes";
import { portfolioData } from "../data/portfolioData";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
  onDownloadResume: () => void;
  onToggleSidebar?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  onOpenCommandPalette,
  onToggleTerminal,
  onDownloadResume,
}) => {
  const themes = getThemes();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed left-12 bottom-6 w-68.75 max-h-[calc(100vh-65px)] bg-[#1e1e24] border border-[#34343d] rounded-t-lg rounded-br-lg shadow-2xl z-50 select-none font-sans text-xs flex flex-col text-[#cccccc] overflow-hidden"
      style={{
        boxShadow:
          "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.15)",
      }}
    >
      <div className="px-3.5 py-2.5 bg-[#23232b] border-b border-[#2d2d36] flex items-center justify-between shrink-0">
        <span className="text-[10.5px] font-bold tracking-widest text-[#9393a0] uppercase font-mono">
          SETTINGS
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#727280] hover:text-white transition-colors p-0.5 rounded cursor-pointer"
          title="Close Settings (Esc)"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div>
          <div className="flex items-center space-x-1.5 px-1 mb-1.5 text-[10px] font-bold text-[#888896] tracking-wider uppercase">
            <span>🎨</span>
            <span>COLOR THEME</span>
          </div>

          <div className="space-y-0.5">
            {themes.map((theme: Theme) => {
              const isSelected = currentTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSelectTheme(theme.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#094771] text-white font-medium shadow-xs"
                      : "text-[#cccccc] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                    <span className="text-xs shrink-0">{theme.icon}</span>
                    <span className="truncate text-xs">{theme.name}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#2d2d36]">
          <div className="flex items-center space-x-1.5 px-1 mb-1.5 text-[10px] font-bold text-[#888896] tracking-wider uppercase">
            <span>⚡</span>
            <span>QUICK ACTIONS</span>
          </div>

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Search className="w-3.5 h-3.5 text-[#888896]" />
                <span className="text-xs">Command Palette</span>
              </div>
              <span className="text-[10px] font-mono text-[#787886] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844]">
                Ctrl+P
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onToggleTerminal();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Terminal className="w-3.5 h-3.5 text-[#888896]" />
                <span className="text-xs">Toggle Terminal</span>
              </div>
              <span className="text-[10px] font-mono text-[#787886] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844]">
                Ctrl+`
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onDownloadResume();
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Download className="w-3.5 h-3.5 text-[#888896]" />
                <span className="text-xs">Download Resume</span>
              </div>
              <span className="text-[10px] font-mono text-[#787886] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844]">
                ⌘ D
              </span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#888896]" />
                <span className="text-xs">Toggle Fullscreen</span>
              </div>
              <span className="text-[10px] font-mono text-[#787886] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844]">
                F11
              </span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#2d2d36]">
          <div className="flex items-center space-x-1.5 px-1 mb-2 text-[10px] font-bold text-[#888896] tracking-wider uppercase">
            <span>⌨️</span>
            <span>KEYBOARD SHORTCUTS</span>
          </div>

          <div className="space-y-1.5 px-1">
            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-medium text-[#9999a8] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844] shrink-0">
                Ctrl P
              </span>
              <span className="text-[11px] text-[#8e8e9c] truncate">
                Go to file (command palette)
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-medium text-[#9999a8] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844] shrink-0">
                Ctrl `
              </span>
              <span className="text-[11px] text-[#8e8e9c] truncate">
                Toggle terminal
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-medium text-[#9999a8] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844] shrink-0">
                Ctrl B
              </span>
              <span className="text-[11px] text-[#8e8e9c] truncate">
                Toggle sidebar
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-medium text-[#9999a8] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844] shrink-0">
                Esc
              </span>
              <span className="text-[11px] text-[#8e8e9c] truncate">
                Close overlay
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-mono font-medium text-[#9999a8] bg-[#272730] px-1.5 py-0.5 rounded border border-[#383844] shrink-0">
                ↑ / ↓
              </span>
              <span className="text-[11px] text-[#8e8e9c] truncate">
                Terminal history
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#2d2d36] px-1 space-y-1">
          <div className="text-[10px] text-[#71717e]">
            Portfolio v1.0 · React + Vite + Tailwind
          </div>
          <div className="text-[10px] text-[#888898]">
            Made with <span className="text-[#c084fc]">💜</span> by{" "}
            <span className="text-[#38bdf8] font-medium">
              {portfolioData.personal.firstName}{" "}
              {portfolioData.personal.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
