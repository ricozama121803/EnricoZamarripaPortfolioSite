"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { IconMail, IconArrowRight } from "@tabler/icons-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const STATS = [
  { label: "Major", value: "Electrical Eng." },
  { label: "School", value: "CSUF" },
  { label: "Building @", value: "AUTODCP" },
];

const HeroSection = () => {
  const rowRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const text = textRef.current;
    if (!row || !text) return;

    let frame;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rowWidth = row.clientWidth;
        const textWidth = text.scrollWidth;
        if (!rowWidth || !textWidth) return;
        // set directly instead of via state so typing doesn't re-render the hero
        text.style.transform = `scale(${Math.min(1, rowWidth / textWidth)})`;
      });
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(row);

    const mutationObserver = new MutationObserver(fit);
    mutationObserver.observe(text, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <section className="pb-16 pt-10 lg:pb-24 lg:pt-16" id="home">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-8 min-w-0 w-full text-center sm:text-left"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-300 shadow-[0_0_8px_rgba(84,202,235,0.8)]" />
            Open to new opportunities
          </p>
          <h1 className="mb-6">
            <span className="block bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Enrico Zamarripa
            </span>
            <span ref={rowRef} className="mt-3 block w-full overflow-hidden text-xl font-medium sm:text-3xl lg:text-4xl">
              <span ref={textRef} className="inline-block whitespace-nowrap origin-left text-neutral-400">
                <TypeAnimation
                  sequence={["Software Developer", 1400, "Electrical Engineering Student", 1400]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="type-target"
                />
              </span>
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-400 sm:mx-0 mx-auto sm:text-lg">
            CSUF Sophomore studying Electrical Engineering, and a Software Developer focused on building intuitive software. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices. Currently building at AUTODCP, and always excited to keep learning and shipping.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <HoverBorderGradient
              as="a" href="/#contact" containerClassName="rounded-full mx-auto sm:mx-0"
              className="flex items-center gap-2 bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white"
            >
              <IconMail size={18} /> Contact me
            </HoverBorderGradient>
            <a
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-800 px-6 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-900 hover:text-white mx-auto sm:mx-0"
            >
              View projects <IconArrowRight size={16} />
            </a>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-left sm:mx-0 mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-3 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{stat.label}</dt>
                <dd className="mt-1 text-xs font-medium text-neutral-200 sm:text-sm">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="col-span-4 place-self-center"
        >
          <div className="relative h-[240px] w-[240px] lg:h-[360px] lg:w-[360px]">
            {/* one faint arc of current drifting round the photo: the only nod to the old lightning theme */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full animate-spin-slower will-change-transform"
              style={{
                background: "conic-gradient(from 0deg, transparent 0 70%, rgba(27,154,243,0.55) 86%, rgba(214,243,255,0.8) 90%, transparent 92%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
              }}
            />
            <div className="absolute inset-0 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 shadow-[0_0_80px_-30px_rgba(27,154,243,0.6)]">
              <Image
                src="/images/1702068264616.jpeg"
                alt="Photo of Enrico Zamarripa"
                fill
                sizes="(min-width: 1024px) 360px, 240px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
