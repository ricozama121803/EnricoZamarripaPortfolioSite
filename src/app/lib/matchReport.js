// Builds the one-page "skills match" PDF a recruiter can download and forward.
// Loaded on demand from JobMatch so jsPDF isn't in the main bundle.
import { jsPDF } from "jspdf";

const CONTACT = [
  ["Email", "ricozama121803@gmail.com"],
  ["GitHub", "github.com/ricozama121803"],
  ["GitLab", "gitlab.com/ricozama121803"],
  ["LinkedIn", "linkedin.com/in/enrico-zamarripa-3ba2882a3"],
];

const BLUE = [18, 105, 216];
const INK = [20, 22, 26];
const GREY = [110, 116, 125];

export async function buildMatchReport(result, { projectsUsing, source }) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 54;
  const width = pageW - margin * 2;
  let y = margin;

  const ensureRoom = (needed) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const text = (str, { size = 11, color = INK, style = "normal", gap = 4, indent = 0 } = {}) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(str, width - indent);
    const lineH = size * 1.3;
    lines.forEach((line) => {
      ensureRoom(lineH);
      doc.text(line, margin + indent, y + size);
      y += lineH;
    });
    y += gap;
  };

  const heading = (str) => {
    y += 10;
    ensureRoom(40);
    text(str.toUpperCase(), { size: 9, color: BLUE, style: "bold", gap: 6 });
  };

  // header band
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, pageW, 6, "F");
  text("Enrico Zamarripa", { size: 22, style: "bold", gap: 0 });
  text("Electrical Engineering student (CSUF) and Software Developer (AUTODCP)", { size: 11, color: GREY, gap: 2 });
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  text(`Skills match report  -  ${today}${source ? `  -  ${source}` : ""}`, { size: 9, color: GREY, gap: 14 });

  // summary
  const percent = result.total ? Math.round((result.matchedCount / result.total) * 100) : 0;
  text(`Enrico uses ${result.matchedCount} of the ${result.total} technologies found in this job description (${percent}%).`, {
    size: 13,
    style: "bold",
    gap: 6,
  });
  doc.setFillColor(228, 232, 238);
  doc.roundedRect(margin, y, width, 6, 3, 3, "F");
  if (percent > 0) {
    doc.setFillColor(...BLUE);
    doc.roundedRect(margin, y, Math.max(6, (width * percent) / 100), 6, 3, 3, "F");
  }
  y += 18;

  heading("Matching skills");
  if (!result.matched.length) text("None of Enrico's listed skills came up in this posting.", { color: GREY });
  result.matched.forEach((group) => {
    ensureRoom(30);
    text(group.category, { size: 11, style: "bold", gap: 2 });
    group.skills.forEach((skill) => {
      const used = projectsUsing(skill).map((p) => p.title);
      text(`+  ${skill}${used.length ? `   (used in ${used.join(", ")})` : ""}`, { size: 10, indent: 10, gap: 1 });
    });
    y += 6;
  });

  if (result.missing.length) {
    heading("Not on his list yet");
    text(result.missing.join(", "), { size: 10, color: GREY });
  }

  heading("About this report");
  text(
    "Generated automatically on Enrico's portfolio site by matching the job description against his listed skills. " +
      "It compares tools and technologies only and does not judge years of experience, seniority, or soft skills.",
    { size: 9, color: GREY }
  );

  heading("Contact");
  CONTACT.forEach(([label, value]) => text(`${label}:  ${value}`, { size: 10, gap: 1 }));
  if (typeof window !== "undefined") text(`Portfolio:  ${window.location.host}`, { size: 10, gap: 1 });

  doc.save("Enrico-Zamarripa-skills-match.pdf");
}
