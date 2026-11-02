"use client";
import React, { useRef, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  DocumentArrowUpIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import { analyzeJobText } from "../data/skills";
import { projectsData } from "../data/projects";

const EMAIL = "ricozama121803@gmail.com";
const MAX_FILE_MB = 15;
const MAX_PAGES = 40;

// pdf.js lives in /public/pdfjs and is only fetched when someone drops a PDF
async function readPdfText(file) {
  const pdfjs = await import(/* webpackIgnore: true */ "/pdfjs/pdf.min.js");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let n = 1; n <= Math.min(pdf.numPages, MAX_PAGES); n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str + (item.hasEOL ? "\n" : " ")).join(""));
  }
  return pages.join("\n");
}

// which projects use a given skill
const projectsUsing = (skill) => projectsData.filter((p) => p.tech?.includes(skill));

const JobMatch = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | reading | done
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const fileInput = useRef(null);
  const panelRef = useRef(null);

  const analyze = (source) => {
    const report = analyzeJobText(source);
    setResult(report);
    setStatus("done");
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`That file is over ${MAX_FILE_MB} MB. Try pasting the text instead.`);
      return;
    }
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isText = file.type.startsWith("text/") || /\.(txt|md)$/i.test(file.name);
    if (!isPdf && !isText) {
      setError("That file type isn't supported. Use a PDF or .txt, or paste the text.");
      return;
    }
    setStatus("reading");
    setFileName(file.name);
    try {
      const content = isPdf ? await readPdfText(file) : await file.text();
      if (content.replace(/\s/g, "").length < 20) {
        setStatus("idle");
        setError("Couldn't find any text in that file (it may be a scanned image). Try pasting the text instead.");
        return;
      }
      setText(content);
      analyze(content);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      setError("Couldn't read that file. Try pasting the text instead.");
    }
  };

  const reset = () => {
    setText("");
    setFileName("");
    setResult(null);
    setError("");
    setStatus("idle");
  };

  const downloadReport = async () => {
    setDownloading(true);
    try {
      const { buildMatchReport } = await import("../lib/matchReport");
      await buildMatchReport(result, { projectsUsing, source: fileName });
    } finally {
      setDownloading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const percent = result?.total ? Math.round((result.matchedCount / result.total) * 100) : 0;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Role that matches your skills")}&body=${encodeURIComponent(
    `Hi Enrico,\n\nI ran our job description through the match tool on your site. ${
      result ? `It found ${result.matchedCount} of your skills in it` : ""
    }. I'd like to talk about the role.\n\n`
  )}`;

  return (
    <div
      ref={panelRef}
      className="mt-16 hud-frame rounded-lg border border-ink-600 bg-ink-800/85 p-5 sm:p-8 scroll-mt-28"
      onDragOver={(e) => {
        e.preventDefault();
        if (status !== "done") setDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
      }}
      onDrop={status === "done" ? undefined : onDrop}
    >
      <div className="flex items-start gap-3">
        <SparklesIcon className="h-6 w-6 shrink-0 text-electric-300 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold uppercase tracking-wide text-white">
            Hiring? See how I match your role
          </h3>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Paste a job description or drop in a PDF to see which of the tools and technologies it
            mentions I already use. Your document stays in your browser; nothing is uploaded.
          </p>
        </div>
      </div>

      {status !== "done" ? (
        <div className="mt-6">
          <label htmlFor="job-text" className="sr-only">
            Job description
          </label>
          <div className="relative">
            <textarea
              id="job-text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setFileName("");
              }}
              rows={7}
              placeholder="Paste the job description here…"
              disabled={status === "reading"}
              className="w-full resize-y rounded-md border border-ink-600 bg-ink-900/80 p-4 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none transition focus:border-electric-300 focus:shadow-[0_0_20px_-4px_rgba(27,154,243,0.9)] disabled:opacity-50"
            />
            {dragging && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md border-2 border-dashed border-electric-300 bg-ink-950/90 font-mono text-sm uppercase tracking-widest text-electric-300">
                Drop the PDF to scan it
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              type="button"
              onClick={() => analyze(text)}
              disabled={text.trim().length < 20 || status === "reading"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-electric-700 via-electric-500 to-electric-300 px-6 py-3 font-display font-semibold uppercase tracking-widest text-white glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0"
            >
              <BoltIcon className="h-5 w-5" aria-hidden="true" />
              Check match
            </button>
            <span className="text-center font-mono text-xs uppercase tracking-widest text-slate-500">or</span>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={status === "reading"}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-electric-700/70 px-6 py-3 font-display font-semibold uppercase tracking-widest text-electric-100 transition hover:border-electric-300 hover:text-white disabled:opacity-40"
            >
              <DocumentArrowUpIcon className="h-5 w-5" aria-hidden="true" />
              {status === "reading" ? "Reading PDF…" : "Upload PDF"}
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="application/pdf,.pdf,text/plain,.txt,.md"
              className="hidden"
              onChange={(e) => {
                handleFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
          <p role="alert" className="mt-3 min-h-[1.25rem] text-sm text-amber-300">
            {error}
          </p>
        </div>
      ) : (
        <div className="mt-6" aria-live="polite">
          {result.total === 0 ? (
            <p className="text-slate-300">
              I didn&apos;t recognize any specific tools or technologies in that text. It may focus on
              responsibilities rather than a tech stack.{" "}
              <a href={mailto} className="text-electric-300 underline underline-offset-4 hover:text-white">
                Email me
              </a>{" "}
              and I&apos;m happy to talk through it.
            </p>
          ) : (
            <>
              {/* summary + meter */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <p className="text-lg sm:text-xl text-white">
                  I use{" "}
                  <span className="font-display text-3xl sm:text-4xl font-bold text-electric-300 text-glow-soft">
                    {result.matchedCount}
                  </span>{" "}
                  of the {result.total} technologies found in {fileName ? <span className="text-slate-300">{fileName}</span> : "this posting"}.
                </p>
                <span className="font-mono text-sm text-slate-400">{percent}% coverage</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric-700 via-electric-500 to-electric-300 shadow-[0_0_12px_rgba(27,154,243,0.9)] transition-[width] duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-electric-300 mb-4">
                    What I bring
                  </h4>
                  {result.matched.length === 0 ? (
                    <p className="text-slate-400">None of my listed skills came up in this posting.</p>
                  ) : (
                    <ul className="space-y-5">
                      {result.matched.map((group) => (
                        <li key={group.category}>
                          <p className="text-sm font-semibold text-white mb-2">{group.category}</p>
                          <ul className="space-y-1.5">
                            {group.skills.map((skill) => {
                              const used = projectsUsing(skill);
                              return (
                                <li key={skill} className="flex flex-wrap items-baseline gap-x-2 text-sm sm:text-base">
                                  <CheckCircleIcon className="h-4 w-4 shrink-0 self-center text-electric-300" aria-hidden="true" />
                                  <span className="text-white">{skill}</span>
                                  {used.length > 0 && (
                                    <span className="text-slate-500 text-sm">
                                      used in{" "}
                                      {used.map((p, i) => (
                                        <React.Fragment key={p.id}>
                                          <a
                                            href={p.gitUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-300 hover:text-electric-300 underline decoration-ink-600 underline-offset-2"
                                          >
                                            {p.title}
                                          </a>
                                          {i < used.length - 1 ? ", " : ""}
                                        </React.Fragment>
                                      ))}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">
                    Not on my list yet
                  </h4>
                  {result.missing.length === 0 ? (
                    <p className="text-sm text-slate-400">Nothing. Every technology I recognized is covered.</p>
                  ) : (
                    <>
                      <ul className="space-y-1.5 text-sm sm:text-base text-slate-400">
                        {result.missing.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm text-slate-500">I pick up new tools quickly and I&apos;m glad to talk about any of these.</p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          <p className="mt-8 border-t border-ink-700 pt-4 text-xs sm:text-sm text-slate-500">
            This compares tools and technologies only. It doesn&apos;t judge years of experience, seniority, or
            soft skills, and it can miss things a person would catch.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            {result.total > 0 && (
              <button
                type="button"
                onClick={downloadReport}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-electric-700 via-electric-500 to-electric-300 px-5 py-2.5 font-display font-semibold uppercase tracking-widest text-sm text-white glow transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                {downloading ? "Preparing…" : "Download report"}
              </button>
            )}
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-electric-700/70 px-5 py-2.5 font-display font-semibold uppercase tracking-widest text-sm text-electric-100 transition hover:border-electric-300 hover:text-white"
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              Email me about this role
            </a>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-slate-400 transition hover:text-white"
            >
              <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
              Check another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatch;
