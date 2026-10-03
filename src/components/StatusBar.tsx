import React from "react";
import {
  GitBranch,
  RefreshCw,
  AlertCircle,
  Check,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

import { getThemes } from "../data/themes";

interface StatusBarProps {
  activeFileId: string;
  onToggleTheme?: () => void;
  onToggleTerminal?: () => void;
  currentTheme?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeFileId,
  onToggleTheme,
  onToggleTerminal,
  currentTheme = "tokyo-night",
}) => {
  const [time, setTime] = React.useState<string>("");
  const themes = getThemes();
  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine language mode based on file extension
  const getLanguageMode = (fileId: string) => {
    if (fileId.endsWith(".tsx")) return "TypeScript React";
    if (fileId.endsWith(".ts")) return "TypeScript";
    if (fileId.endsWith(".js")) return "JavaScript";
    if (fileId.endsWith(".json")) return "JSON";
    if (fileId.endsWith(".html")) return "HTML";
    if (fileId.endsWith(".css")) return "CSS";
    if (fileId.endsWith(".md")) return "Markdown";
    return "Plain Text";
  };

  return (
    <div
      className="h-6 flex items-center justify-between px-3 text-[11px] select-none shrink-0 font-mono z-40 transition-colors duration-200"
      style={{
        backgroundColor: "var(--statusbar)",
        color: "var(--statusbar-text)",
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <GitBranch className="w-3 h-3" />
          <span className="font-semibold">main</span>
        </div>

        <div className="hidden sm:flex items-center space-x-1 hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer text-[10px] transition-colors">
          <RefreshCw className="w-2.5 h-2.5" />
          <span>↑1 +3</span>
        </div>

        <button
          type="button"
          onClick={onToggleTerminal}
          title="Toggle Terminal Panel"
          className="flex items-center space-x-1.5 hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-0.5">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-0.5 opacity-90">
            <span>⚠</span>
            <span>0</span>
          </div>
        </button>

        <div className="hidden md:flex items-center space-x-1 font-medium hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <span className="text-[10px]">⚡</span>
          <span>{portfolioData.personal.firstName}'s Portfolio</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden sm:block hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          {getLanguageMode(activeFileId)}
        </div>

        <div className="hidden md:block hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          UTF-8
        </div>

        <div className="hidden lg:flex items-center space-x-1 hover:bg-black/15 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <Check className="w-2.5 h-2.5" />
          <span>Prettier</span>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          title="Change theme"
          className="flex items-center space-x-1.5 hover:bg-black/20 px-2 py-0.5 rounded cursor-pointer transition-colors"
        >
          <span className="text-xs">{activeTheme.icon}</span>
          <span className="font-semibold">{activeTheme.name}</span>
          <span className="text-[9px] opacity-80">$</span>
        </button>

        <div className="font-semibold px-1 opacity-90">{time || "11:58"}</div>
      </div>
    </div>
  );
};
