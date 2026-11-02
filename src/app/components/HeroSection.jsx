"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { BoltIcon } from "@heroicons/react/24/solid";

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
    <section className="py-8 lg:py-16" id="home">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-8 min-w-0 w-full place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-6 font-display font-bold uppercase">
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-wide text-electric-300 text-glow animate-flicker">
              Hello, I&apos;m
            </span>
            <span
              ref={rowRef}
              className="block w-full overflow-hidden text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight"
            >
              <span
                ref={textRef}
                className="inline-block whitespace-nowrap origin-left text-glow-soft"
              >
                <TypeAnimation
                  sequence={[
                    "Enrico",
                    1000,
                    "a Software Developer",
                    1000,
                    "a Electrical Engineering Student",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="type-target"
                />
              </span>
            </span>
          </h1>
          <p className="text-slate-300/90 text-base sm:text-lg mb-8 lg:text-xl max-w-2xl sm:mx-0 mx-auto leading-relaxed">
            CSUF Sophomore studying Electrical Engineering, and a Software Developer focused on building intuitive software. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices. Currently building at AUTODCP, and always excited to keep learning and shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 w-full sm:w-fit rounded-md bg-gradient-to-br from-electric-700 via-electric-500 to-electric-300 font-display font-semibold uppercase tracking-widest text-white glow transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              <BoltIcon className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
              Contact Me
            </a>
            <a
              href="/#projects"
              className="inline-flex items-center justify-center px-7 py-3 w-full sm:w-fit rounded-md border border-electric-700/70 font-display font-semibold uppercase tracking-widest text-electric-100 hover:border-electric-300 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(27,154,243,0.8)] transition-[color,border-color,box-shadow] duration-200 ease-out"
            >
              View Projects
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3 max-w-xl sm:mx-0 mx-auto font-mono text-left">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-electric-500/70 pl-3">
                <dt className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</dt>
                <dd className="text-xs sm:text-sm text-electric-100 mt-1">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="col-span-4 place-self-center"
        >
          <div className="relative w-[250px] h-[250px] lg:w-[400px] lg:h-[400px]">
            {/* spinning arcs */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full animate-spin-slow will-change-transform"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0 62%, rgba(27,154,243,0.9) 80%, #D6F3FF 86%, transparent 88%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                filter: "drop-shadow(0 0 6px #1B9AF3)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -inset-7 rounded-full border border-dashed border-electric-700/50 animate-spin-slower will-change-transform"
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,_#16181B,_#000000_70%)] border border-electric-700/60 shadow-[0_0_60px_-10px_rgba(27,154,243,0.7),inset_0_0_40px_rgba(27,154,243,0.25)] overflow-hidden">
              <Image
                src="/images/1702068264616.jpeg"
                alt="Photo of Enrico Zamarripa"
                fill
                sizes="(min-width: 1024px) 400px, 250px"
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
