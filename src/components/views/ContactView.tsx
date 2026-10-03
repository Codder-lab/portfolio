import React, { useState } from "react";
import { portfolioData } from "../../data/portfolioData";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../Icons";

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const renderChannelIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "email":
      case "mail":
        return (
          <svg
            className="w-4 h-4 text-[#4ec9b0]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      case "linkedin":
        return <LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />;
      case "github":
        return <GithubIcon className="w-4 h-4 text-white" />;
      case "medium":
        return <span className="font-serif font-black text-sm text-white">M</span>;
      case "tableau":
        return <span className="font-bold text-xs text-[#e97627]">#</span>;
      case "leetcode":
        return <span className="font-mono font-bold text-xs text-[#ffa116]">&lt;/&gt;</span>;
      case "youtube":
        return <YoutubeIcon className="w-4 h-4 text-[#ff0000]" />;
      case "instagram":
        return <InstagramIcon className="w-4 h-4 text-[#e1306c]" />;
      default:
        return <span className="text-xs">↗</span>;
    }
  };

  const getCleanUrlDisplay = (url: string, name: string) => {
    if (name.toLowerCase() === "email") {
      return portfolioData.personal.email;
    }
    return url.replace(/^https?:\/\/(www\.)?/, "");
  };

  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] px-6 sm:px-12 py-10 max-w-5xl">
      <p className="text-xs sm:text-[13px] text-[#777777] font-mono mb-8 opacity-0 animate-su-1">
        // open to work, collabs & good conversations
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3 opacity-0 animate-su-2">
          <h2 className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-[#4ec9b0] mb-4 uppercase">
            FIND ME ON
          </h2>

          <div className="space-y-2.5">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="border border-[#333338] hover:border-[#4ec9b0]/50 rounded-lg p-3 bg-white/2 flex items-center justify-between group transition-all no-underline"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-md bg-[#252526] border border-[#3c3c3c] flex items-center justify-center shrink-0">
                  {renderChannelIcon("email")}
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4ec9b0]">
                    EMAIL
                  </div>
                  <div className="text-xs font-mono text-[#bbbbbb] group-hover:text-white transition-colors truncate">
                    {portfolioData.personal.email}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#777777] group-hover:text-white transition-colors shrink-0 ml-2">
                ↗
              </span>
            </a>

            {portfolioData.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="border border-[#333338] hover:border-[#4ec9b0]/50 rounded-lg p-3 bg-white/2 flex items-center justify-between group transition-all no-underline"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-md bg-[#252526] border border-[#3c3c3c] flex items-center justify-center shrink-0">
                    {renderChannelIcon(social.name)}
                  </div>
                  <div className="truncate">
                    <div
                      className="text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ color: social.color || "#4fc1ff" }}
                    >
                      {social.name.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono text-[#bbbbbb] group-hover:text-white transition-colors truncate">
                      {getCleanUrlDisplay(social.url, social.name)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#777777] group-hover:text-white transition-colors shrink-0 ml-2">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="opacity-0 animate-su-3">
          <h2 className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-[#4ec9b0] mb-4 uppercase">
            SEND A MESSAGE
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-[#888888] block">
                // YOUR_NAME <span className="text-[#f44747]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="string"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#18181a] border border-[#333338] rounded px-3 py-2.5 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#007acc] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] block">
                // YOUR_EMAIL <span className="text-[#f44747]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="string"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#18181a] border border-[#333338] rounded px-3 py-2.5 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#007acc] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] block">// SUBJECT</label>
              <input
                type="text"
                placeholder="string"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-[#18181a] border border-[#333338] rounded px-3 py-2.5 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#007acc] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] block">
                // MESSAGE <span className="text-[#f44747]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="'''your message'''"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#18181a] border border-[#333338] rounded px-3 py-2.5 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#007acc] resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#007acc] hover:bg-[#0062a3] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md mt-2"
            >
              {sent ? "✓ message_sent_successfully()" : "→ send_message()"}
            </button>

            <p className="text-[11px] text-[#777777] font-mono mt-2">
              // Powered by Formspree (lands directly in my inbox) :p
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
