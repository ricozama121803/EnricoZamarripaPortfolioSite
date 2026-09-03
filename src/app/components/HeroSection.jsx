"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="lg:py-16" id="home">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-5xl md:text-6xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-denim-600 to-indigo-400">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Enrico",
                1000,
                "Software Developer",
                1000,
                "Mechanical Engineering Student",
                1000,
                "Full-Stack Engineer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          🚀 CSUF Sophomore studying Mechanical Engineering, and a Software Developer focused on building intuitive, impactful web applications. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices. Currently building at AUTODCP, and always excited to keep learning and shipping.
          </p>
          <div>
            <a
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-indigo-800 via-denim-600 to-indigo-400 hover:bg-slate-200 text-white"
            >
              Contact Me
            </a>
            <a
  href="/enricoResumeDownload.pdf"  // Corrected path to the PDF file
  download  // This attribute prompts the file to be downloaded when clicked
  className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-indigo-800 via-denim-600 to-indigo-400 hover:bg-slate-800 text-white mt-3"
>
  <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
    Download Resume
  </span>
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
