import { portfolioData } from "../data/portfolioData";

// Detect any PDF placed inside src/assets/
const assetPdfs = import.meta.glob<{ default: string }>("/src/assets/*.pdf", {
  eager: true,
});

export const downloadResume = () => {
  const fileName = `${portfolioData.personal.firstName}_${portfolioData.personal.lastName}_Resume.pdf`;

  const pdfKeys = Object.keys(assetPdfs);
  let resumeUrl = "/resume.pdf";

  if (pdfKeys.length > 0) {
    // Prefer any file with 'resume' in name, or the first PDF in src/assets
    const matchingKey =
      pdfKeys.find((k) => k.toLowerCase().includes("resume")) || pdfKeys[0];
    const assetModule = assetPdfs[matchingKey];
    resumeUrl =
      typeof assetModule === "string"
        ? assetModule
        : assetModule?.default || resumeUrl;
  }

  const link = document.createElement("a");
  link.href = resumeUrl;
  link.setAttribute("download", fileName);
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
