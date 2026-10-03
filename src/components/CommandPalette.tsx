import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, X, Palette, Terminal } from "lucide-react";
import { fileList } from "./Sidebar";
import { getThemes } from "../data/themes";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileId: string) => void;
  onSelectTheme?: (themeId: string) => void;
  onToggleTerminal?: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  type: "file" | "theme" | "action";
  icon: React.ReactNode;
  category: string;
  themeId?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectFile,
  onSelectTheme,
  onToggleTerminal,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const themes = getThemes();

  const allItems: PaletteItem[] = [
    ...fileList.map((f) => ({
      id: f.id,
      title: f.name,
      type: "file" as const,
      icon: f.icon,
      category: "Files",
    })),
    {
      id: "view-toggle-terminal",
      title: "View: Toggle Integrated Terminal",
      type: "action" as const,
      icon: <Terminal className="w-3.5 h-3.5 text-[#4ec9b0]" />,
      category: "Commands",
    },
    ...themes.map((t) => ({
      id: `theme-${t.id}`,
      title: `Preferences: Color Theme (${t.name})`,
      type: "theme" as const,
      icon: <Palette className="w-3.5 h-3.5 text-[#38bdf8]" />,
      category: "Themes",
      themeId: t.id,
    })),
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  const filtered = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filtered.length) % (filtered.length || 1),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[selectedIndex];
      if (item) {
        if (item.type === "file") {
          onSelectFile(item.id);
        } else if (item.type === "theme" && item.themeId && onSelectTheme) {
          onSelectTheme(item.themeId);
        } else if (item.type === "action" && item.id === "view-toggle-terminal") {
          onToggleTerminal?.();
        }
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-8 sm:pt-20 z-50 px-3 sm:px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#252526] border border-[#454545] rounded-lg shadow-2xl overflow-hidden font-sans text-xs text-[#cccccc]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="p-2.5 sm:p-3 border-b border-[#333333] flex items-center space-x-2 bg-[#1f1f24]">
          <Search className="w-4 h-4 text-[#858585] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a file name to open..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-white placeholder-[#858585] focus:outline-none text-xs sm:text-sm"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[#858585] hover:text-white cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-60 sm:max-h-72 overflow-y-auto p-1.5 space-y-0.5">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[#858585]">
              No matching files or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "file") {
                    onSelectFile(item.id);
                  } else if (item.type === "theme" && item.themeId && onSelectTheme) {
                    onSelectTheme(item.themeId);
                  } else if (item.type === "action" && item.id === "view-toggle-terminal") {
                    onToggleTerminal?.();
                  }
                  onClose();
                }}
                className={`flex items-center justify-between px-2.5 sm:px-3 py-2 rounded cursor-pointer transition-colors ${
                  idx === selectedIndex
                    ? "bg-[#094771] text-white font-medium"
                    : "hover:bg-[#2a2d2e] text-[#cccccc]"
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-2.5 truncate">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="text-xs truncate">{item.title}</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 ml-2">
                  <span className="text-[9px] sm:text-[10px] text-[#858585] uppercase tracking-wider font-mono">
                    {item.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-3 py-1.5 bg-[#1e1e1e] border-t border-[#333333] flex items-center justify-between text-[10px] sm:text-[11px] text-[#858585] font-mono">
          <span className="hidden sm:inline">Navigate with ↑ ↓ • Select with Enter</span>
          <span className="sm:hidden">Tap to select</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
