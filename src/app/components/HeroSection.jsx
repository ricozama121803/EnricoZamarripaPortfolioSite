"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const rowRef = useRef(null);
  const textRef = useRef(null);
  const [scale, setScale] = useState(1);

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
        setScale(Math.min(1, rowWidth / textWidth));
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
    <section className="lg:py-16" id="home">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 min-w-0 w-full place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 font-extrabold">
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-denim-600 to-indigo-400">
              Hello, I&apos;m
            </span>
            <span
              ref={rowRef}
              className="block w-full overflow-hidden text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight"
            >
              <span
                ref={textRef}
                className="inline-block whitespace-nowrap origin-left"
                style={{ transform: `scale(${scale})` }}
              >
                <TypeAnimation
                  sequence={[
                    "Enrico",
                    1000,
                    "a Software Developer",
                    1000,
                    "a Mechanical Engineering Student",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </span>
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          🚀 CSUF Sophomore studying Mechanical Engineering, and a Software Developer focused on building intuitive, impactful web applications. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices. Currently building at AUTODCP, and always excited to keep learning and shipping.
          </p>
          <div>
            <a
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-indigo-800 via-denim-600 to-indigo-400 hover:bg-slate-200 text-white"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/enricoAvatar2.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
