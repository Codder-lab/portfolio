import React, { useState, useRef, useEffect } from "react";
import { X, Trash2, ChevronDown, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { getThemes } from "../data/themes";

interface TerminalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateFile: (fileId: string) => void;
  onOpenResume: () => void;
  onSelectTheme: (themeId: string) => void;
  currentTheme: string;
}

interface OutputEntry {
  type: "command" | "output" | "error" | "info" | "banner";
  content: string | React.ReactNode;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  isOpen,
  onClose,
  onNavigateFile,
  onOpenResume,
  onSelectTheme,
  currentTheme,
}) => {
  const [activeTab, setActiveTab] = useState<"TERMINAL" | "PROBLEMS" | "OUTPUT">("TERMINAL");
  const [panelHeight, setPanelHeight] = useState(220);
  const [isDragging, setIsDragging] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [terminalOutputs, setTerminalOutputs] = useState<OutputEntry[]>([
    {
      type: "banner",
      content: "Welcome! Type 'help' to see available commands.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal output
  useEffect(() => {
    if (activeTab === "TERMINAL") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalOutputs, activeTab]);

  // Focus input when terminal opens or tab switches
  useEffect(() => {
    if (isOpen && activeTab === "TERMINAL") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, activeTab]);

  // Resizing mouse drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newHeight = window.innerHeight - e.clientY - 24; // 24px statusbar offset
      if (newHeight >= 100 && newHeight <= window.innerHeight - 150) {
        setPanelHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    setInputVal("");
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Echo command
    const promptEntry: OutputEntry = {
      type: "command",
      content: cmd,
    };

    const args = cmd.split(" ").filter(Boolean);
    const mainCmd = args[0].toLowerCase();
    const arg1 = args[1]?.toLowerCase();

    let resultEntries: OutputEntry[] = [];

    switch (mainCmd) {
      case "help":
        resultEntries = [
          {
            type: "info",
            content: (
              <div className="space-y-1 text-xs">
                <p className="text-[#4ec9b0] font-semibold mb-1">Available commands:</p>
                <div className="grid grid-cols-[130px_1fr] gap-x-2 gap-y-1 font-mono text-[11px] leading-relaxed">
                  <span className="text-[#9cdcfe]">about</span>
                  <span className="text-[#858585]">Navigate to about.html</span>
                  <span className="text-[#9cdcfe]">projects</span>
                  <span className="text-[#858585]">Navigate to projects.js</span>
                  <span className="text-[#9cdcfe]">skills</span>
                  <span className="text-[#858585]">Navigate to skills.json</span>
                  <span className="text-[#9cdcfe]">experience</span>
                  <span className="text-[#858585]">Navigate to experience.ts</span>
                  <span className="text-[#9cdcfe]">contact</span>
                  <span className="text-[#858585]">Navigate to contact.css</span>
                  <span className="text-[#9cdcfe]">readme</span>
                  <span className="text-[#858585]">Navigate to README.md</span>
                  <span className="text-[#9cdcfe]">resume</span>
                  <span className="text-[#858585]">Open / download resume PDF</span>
                  <span className="text-[#9cdcfe]">theme [name]</span>
                  <span className="text-[#858585]">View or change theme (e.g. theme tokyo-night)</span>
                  <span className="text-[#9cdcfe]">whoami</span>
                  <span className="text-[#858585]">Display profile details</span>
                  <span className="text-[#9cdcfe]">social</span>
                  <span className="text-[#858585]">Show links to GitHub, LinkedIn, Email</span>
                  <span className="text-[#9cdcfe]">ls</span>
                  <span className="text-[#858585]">List workspace files</span>
                  <span className="text-[#9cdcfe]">cat &lt;file&gt;</span>
                  <span className="text-[#858585]">Preview file contents</span>
                  <span className="text-[#9cdcfe]">clear</span>
                  <span className="text-[#858585]">Clear terminal display</span>
                  <span className="text-[#9cdcfe]">date</span>
                  <span className="text-[#858585]">Show current timestamp</span>
                  <span className="text-[#9cdcfe]">echo &lt;text&gt;</span>
                  <span className="text-[#858585]">Print text back to console</span>
                  <span className="text-[#9cdcfe]">exit</span>
                  <span className="text-[#858585]">Close the terminal panel</span>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "about":
        onNavigateFile("about.html");
        resultEntries = [
          { type: "output", content: "Opening about.html..." },
        ];
        break;

      case "projects":
        onNavigateFile("projects.js");
        resultEntries = [
          { type: "output", content: "Opening projects.js..." },
        ];
        break;

      case "skills":
        onNavigateFile("skills.json");
        resultEntries = [
          { type: "output", content: "Opening skills.json..." },
        ];
        break;

      case "experience":
        onNavigateFile("experience.ts");
        resultEntries = [
          { type: "output", content: "Opening experience.ts..." },
        ];
        break;

      case "contact":
        onNavigateFile("contact.css");
        resultEntries = [
          { type: "output", content: "Opening contact.css..." },
        ];
        break;

      case "readme":
        onNavigateFile("README.md");
        resultEntries = [
          { type: "output", content: "Opening README.md..." },
        ];
        break;

      case "resume":
        onOpenResume();
        resultEntries = [
          { type: "output", content: "Downloading Resume..." },
        ];
        break;

      case "whoami":
        resultEntries = [
          {
            type: "output",
            content: `${portfolioData.personal.firstName} ${portfolioData.personal.lastName} | ${portfolioData.personal.roleBadges.map((r) => r.label).join(" · ")} | ${portfolioData.personal.location}`,
          },
        ];
        break;

      case "social":
        resultEntries = [
          {
            type: "info",
            content: (
              <div className="space-y-0.5 text-xs font-mono">
                {portfolioData.socials.map((s, idx) => (
                  <p key={idx}>
                    <span className="text-[#9cdcfe]">{s.name}</span>:{" "}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4ec9b0] underline"
                    >
                      {s.url}
                    </a>
                  </p>
                ))}
              </div>
            ),
          },
        ];
        break;

      case "ls":
        resultEntries = [
          {
            type: "output",
            content: (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono">
                <span className="text-[#00d8ff]">home.tsx</span>
                <span className="text-[#e44f26]">about.html</span>
                <span className="text-[#f7df1e]">projects.js</span>
                <span className="text-[#dcdcaa]">skills.json</span>
                <span className="text-[#007acc]">experience.ts</span>
                <span className="text-[#4fc1ff]">contact.css</span>
                <span className="text-[#42a5f5]">README.md</span>
                <span className="text-[#f44747]">Resume.pdf</span>
              </div>
            ),
          },
        ];
        break;

      case "cat":
        if (!arg1) {
          resultEntries = [
            { type: "error", content: "usage: cat <filename> (e.g., cat about.html, cat skills.json)" },
          ];
        } else {
          switch (arg1) {
            case "about.html":
              resultEntries = [
                {
                  type: "output",
                  content: `${portfolioData.personal.longBio[0]}\n\nCurrent focus: ${portfolioData.personal.currentFocus.map((f) => f.text).join(" | ")}`,
                },
              ];
              break;
            case "readme.md":
            case "readme":
              resultEntries = [
                {
                  type: "output",
                  content: `${portfolioData.personal.firstName} ${portfolioData.personal.lastName} - ${portfolioData.personal.roleBadges.map((r) => r.label).join(" / ")}\nTop stack: React Native, TypeScript, Node.js, AI/LLMs.`,
                },
              ];
              break;
            case "skills.json":
              resultEntries = [
                {
                  type: "output",
                  content: JSON.stringify(
                    portfolioData.skills.reduce((acc, cat) => ({ ...acc, [cat.category]: cat.items.map((i) => i.name) }), {}),
                    null,
                    2
                  ),
                },
              ];
              break;
            case "projects.js":
              resultEntries = [
                {
                  type: "output",
                  content: portfolioData.projects
                    .map((p) => `• ${p.title} (${p.category}): ${p.description}`)
                    .join("\n"),
                },
              ];
              break;
            case "experience.ts":
              resultEntries = [
                {
                  type: "output",
                  content: portfolioData.experience
                    .map((e) => `• ${e.role} @ ${e.company} (${e.period})`)
                    .join("\n"),
                },
              ];
              break;
            default:
              resultEntries = [
                { type: "error", content: `cat: ${arg1}: No such file or directory` },
              ];
          }
        }
        break;

      case "open":
        if (arg1) {
          onNavigateFile(arg1);
          resultEntries = [{ type: "output", content: `Opened ${arg1}` }];
        } else {
          resultEntries = [{ type: "error", content: "usage: open <filename>" }];
        }
        break;

      case "theme": {
        const themes = getThemes();
        if (!arg1) {
          resultEntries = [
            {
              type: "info",
              content: (
                <div className="text-xs font-mono space-y-1">
                  <p>Current theme: <span className="text-[#4ec9b0] font-bold">{currentTheme}</span></p>
                  <p className="text-[#858585]">Available themes: {themes.map((t) => t.id).join(", ")}</p>
                  <p className="text-[#858585]">Run: <span className="text-[#9cdcfe]">theme &lt;theme-name&gt;</span> to apply.</p>
                </div>
              ),
            },
          ];
        } else {
          const matched = themes.find(
            (t) => t.id === arg1 || t.name.toLowerCase().includes(arg1)
          );
          if (matched) {
            onSelectTheme(matched.id);
            resultEntries = [
              {
                type: "output",
                content: `Theme switched to: ${matched.name} (${matched.id})`,
              },
            ];
          } else {
            resultEntries = [
              {
                type: "error",
                content: `Unknown theme '${arg1}'. Options: ${themes.map((t) => t.id).join(", ")}`,
              },
            ];
          }
        }
        break;
      }

      case "clear":
        setTerminalOutputs([]);
        return;

      case "date":
        resultEntries = [
          { type: "output", content: new Date().toString() },
        ];
        break;

      case "echo":
        resultEntries = [
          { type: "output", content: args.slice(1).join(" ") },
        ];
        break;

      case "sudo":
        resultEntries = [
          {
            type: "error",
            content: `Permission denied: ${portfolioData.personal.firstName} is the only root administrator.`,
          },
        ];
        break;

      case "history":
        resultEntries = [
          {
            type: "output",
            content: history.map((h, i) => `${i + 1}  ${h}`).join("\n"),
          },
        ];
        break;

      case "exit":
        onClose();
        return;

      default:
        resultEntries = [
          {
            type: "error",
            content: `command not found: ${cmd}. Type 'help' for available commands.`,
          },
        ];
        break;
    }

    setTerminalOutputs((prev) => [...prev, promptEntry, ...resultEntries]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = [
        "help",
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
        "readme",
        "resume",
        "theme",
        "whoami",
        "social",
        "ls",
        "cat",
        "clear",
        "date",
        "echo",
        "exit",
      ];
      const match = available.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const userPrompt = portfolioData.personal.firstName.toLowerCase();

  return (
    <div
      style={{ height: `${panelHeight}px` }}
      className="w-full bg-[#1e1e1e] border-t border-[#333338] flex flex-col shrink-0 relative select-text z-30 transition-all font-mono"
    >
      {/* Resizable Top Edge Handle */}
      <div
        onMouseDown={() => setIsDragging(true)}
        className="absolute -top-1 left-0 right-0 h-2 cursor-row-resize hover:bg-[#007acc]/40 transition-colors z-40"
        title="Drag to resize terminal panel"
      />

      {/* Header Bar */}
      <div className="h-8 bg-[#252526] border-b border-[#333338] flex items-center justify-between px-3 select-none text-[11px] font-sans">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab("TERMINAL")}
            className={`cursor-pointer transition-colors uppercase tracking-wider font-semibold py-1 border-b-2 ${
              activeTab === "TERMINAL"
                ? "text-white border-[#007acc]"
                : "text-[#969696] hover:text-[#cccccc] border-transparent"
            }`}
          >
            Terminal
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("PROBLEMS")}
            className={`cursor-pointer transition-colors uppercase tracking-wider font-semibold py-1 border-b-2 flex items-center space-x-1.5 ${
              activeTab === "PROBLEMS"
                ? "text-white border-[#007acc]"
                : "text-[#969696] hover:text-[#cccccc] border-transparent"
            }`}
          >
            <span>Problems</span>
            <span className="bg-[#333338] text-[10px] text-[#cccccc] px-1 rounded-full">
              0
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("OUTPUT")}
            className={`cursor-pointer transition-colors uppercase tracking-wider font-semibold py-1 border-b-2 ${
              activeTab === "OUTPUT"
                ? "text-white border-[#007acc]"
                : "text-[#969696] hover:text-[#cccccc] border-transparent"
            }`}
          >
            Output
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[#969696]">
          {activeTab === "TERMINAL" && (
            <button
              type="button"
              onClick={() => {
                setTerminalOutputs([]);
                setInputVal("");
              }}
              className="p-1 hover:text-white hover:bg-[#333338] rounded cursor-pointer transition-colors"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:text-white hover:bg-[#333338] rounded cursor-pointer transition-colors"
            title="Close Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Panel Content Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-2.5 text-xs font-mono leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {activeTab === "TERMINAL" && (
          <div className="space-y-1.5">
            {terminalOutputs.map((item, idx) => {
              if (item.type === "banner") {
                return (
                  <p key={idx} className="text-[#4ec9b0] mb-2 font-medium">
                    {item.content}
                  </p>
                );
              }
              if (item.type === "command") {
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-[#4ec9b0] font-semibold">{userPrompt}</span>
                    <span className="text-[#cccccc]">@portfolio:~$</span>
                    <span className="text-white font-medium">{item.content}</span>
                  </div>
                );
              }
              if (item.type === "error") {
                return (
                  <div key={idx} className="text-[#f44747] whitespace-pre-wrap pl-2">
                    {item.content}
                  </div>
                );
              }
              if (item.type === "info") {
                return (
                  <div key={idx} className="pl-2">
                    {item.content}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-[#cccccc] whitespace-pre-wrap pl-2">
                  {item.content}
                </div>
              );
            })}

            {/* Active Command Input Line */}
            <div className="flex items-center space-x-2 pt-0.5">
              <span className="text-[#4ec9b0] font-semibold">{userPrompt}</span>
              <span className="text-[#cccccc]">@portfolio:~$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white outline-none border-none p-0 font-mono text-xs focus:ring-0"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>

            <div ref={terminalEndRef} />
          </div>
        )}

        {activeTab === "PROBLEMS" && (
          <div className="h-full flex flex-col items-center justify-center text-[#858585] space-y-2 py-8">
            <CheckCircle2 className="w-8 h-8 text-[#4ec9b0]/80" />
            <p className="text-xs">No problems have been detected in the workspace.</p>
            <p className="text-[11px] text-[#666666]">0 Errors, 0 Warnings</p>
          </div>
        )}

        {activeTab === "OUTPUT" && (
          <div className="space-y-1 text-[#858585] font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#cccccc] pb-1 border-b border-[#2b2b30] mb-2">
              <span className="text-[11px] font-semibold">Channel:</span>
              <span className="bg-[#2d2d32] px-2 py-0.5 rounded text-[11px] text-[#4ec9b0] flex items-center space-x-1">
                <span>Vite v8.3.2</span>
                <ChevronDown className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[#4ec9b0]">[vite] Dev server ready at http://localhost:5173/</p>
            <p className="text-[#858585]">[vite] 1916 modules transformed.</p>
            <p className="text-[#858585]">[vite] Production bundle built in 113ms.</p>
            <p className="text-[#89d185]">✓ Clean build, zero TypeScript errors detected.</p>
          </div>
        )}
      </div>
    </div>
  );
};
