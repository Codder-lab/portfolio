import React, { useState, useEffect } from "react";
import { TitleBar } from "./components/TitleBar";
import { ActivityBar } from "./components/ActivityBar";
import { Sidebar } from "./components/Sidebar";
import { TabBar } from "./components/TabBar";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { StatusBar } from "./components/StatusBar";
import { CommandPalette } from "./components/CommandPalette";
import { SettingsModal } from "./components/SettingsModal";
import { TerminalPanel } from "./components/TerminalPanel";
import { CustomCursor } from "./components/CustomCursor";
import { downloadResume } from "./utils/downloadResume";

// Views
import { HomeView } from "./components/views/HomeView";
import { AboutView } from "./components/views/AboutView";
import { ProjectsView } from "./components/views/ProjectsView";
import { SkillsView } from "./components/views/SkillsView";
import { ExperienceView } from "./components/views/ExperienceView";
import { ContactView } from "./components/views/ContactView";
import { ReadmeView } from "./components/views/ReadmeView";

export function App() {
  // Tabs setup matches the screenshot tabs: home.tsx, skills.json, experience.ts, projects.js, about.html, README.md, contact.css
  const [openTabs, setOpenTabs] = useState<string[]>([
    "home.tsx",
    "skills.json",
    "experience.ts",
    "projects.js",
    "about.html",
    "README.md",
    "contact.css",
  ]);
  const [activeFileId, setActiveFileId] = useState<string>("home.tsx");

  // Activity & Sidebar state
  const [activeView, setActiveView] = useState<"explorer" | "search" | "git">(
    "explorer",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Theme state persisted in localStorage
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem("portfolio_theme") || "tokyo-night";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("portfolio_theme", currentTheme);
  }, [currentTheme]);

  // Global keyboard shortcuts (Cmd+P / Ctrl+P for Command Palette, Ctrl+` for Terminal, Ctrl+B for Sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "`" || e.code === "Backquote")
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle opening or switching to a file
  const handleSelectFile = (fileId: string) => {
    if (fileId === "Resume.pdf") {
      downloadResume();
      return;
    }

    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
    setActiveFileId(fileId);
  };

  // Handle closing a tab
  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((id) => id !== fileId);
    setOpenTabs(newTabs);

    if (activeFileId === fileId) {
      if (newTabs.length > 0) {
        setActiveFileId(newTabs[newTabs.length - 1]);
      } else {
        // Fallback default
        setOpenTabs(["home.tsx"]);
        setActiveFileId("home.tsx");
      }
    }
  };

  // Render content according to active file
  const renderActiveView = () => {
    switch (activeFileId) {
      case "home.tsx":
        return <HomeView onNavigateFile={handleSelectFile} />;
      case "about.html":
        return <AboutView />;
      case "projects.js":
        return <ProjectsView />;
      case "skills.json":
        return <SkillsView />;
      case "experience.ts":
        return <ExperienceView />;
      case "contact.css":
        return <ContactView />;
      case "README.md":
        return <ReadmeView />;
      default:
        return <HomeView onNavigateFile={handleSelectFile} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1e1e1e] text-[#cccccc] overflow-hidden select-none font-sans">
      <TitleBar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateFile={handleSelectFile}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        <ActivityBar
          activeView={activeView}
          setActiveView={setActiveView}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onOpenSettings={() => setIsSettingsOpen((prev) => !prev)}
          onDownloadResume={downloadResume}
        />

        {isSidebarOpen && (
          <Sidebar
            activeFileId={activeFileId}
            onSelectFile={handleSelectFile}
            activeView={activeView}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#1e1e1e] overflow-hidden">
          <TabBar
            openTabs={openTabs}
            activeFileId={activeFileId}
            onSelectTab={(id) => setActiveFileId(id)}
            onCloseTab={handleCloseTab}
          />

          <Breadcrumbs activeFileId={activeFileId} />

          <div
            key={activeFileId}
            className="flex-1 min-h-0 overflow-y-auto relative select-text"
          >
            {renderActiveView()}
          </div>

          <TerminalPanel
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onNavigateFile={handleSelectFile}
            onOpenResume={downloadResume}
            onSelectTheme={(id) => setCurrentTheme(id)}
            currentTheme={currentTheme}
          />
        </div>
      </div>

      <StatusBar
        activeFileId={activeFileId}
        onToggleTheme={() => setIsSettingsOpen((prev) => !prev)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        currentTheme={currentTheme}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(id) => setCurrentTheme(id)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        onDownloadResume={downloadResume}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectFile={handleSelectFile}
        onSelectTheme={(id) => setCurrentTheme(id)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      <CustomCursor />
    </div>
  );
}

export default App;
