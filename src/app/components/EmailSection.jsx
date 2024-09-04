"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const EmailSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ricozama121803@gmail.com"); // Replace with your email address
    setCopied(true);

    // Reset the copied state after a few seconds
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-1 my-12 md:my-12 py-32 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800 to-transparent rounded-full h-96 w-96 z-0 blur-lg absolute top-1/2 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      
      <div className="z-10 text-center">
        {/* Increased text size */}
        <h5 className="text-4xl font-bold text-white my-4">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-6 max-w-3xl mx-auto text-xl">
          I&apos;m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best 
          to get back to you!
        </p>
        <div className="socials flex justify-center gap-12 mt-8">
          <Link href="https://github.com/ricozama121803">
            {/* Increased icon size */}
            <Image src={GithubIcon} alt="Github Icon" className="h-16 w-16 hover:scale-110 transition-transform" />
          </Link>
          <Link href="https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/">
            <Image src={LinkedinIcon} alt="Linkedin Icon" className="h-16 w-16 hover:scale-110 transition-transform" />
          </Link>
          {/* Gmail Icon for Copying Email */}
          <div className="cursor-pointer relative">
            <EnvelopeIcon
              className="h-16 w-16 hover:scale-110 transition-transform text-[#ADB7BE]" // Increased icon size
              onClick={handleCopyEmail}
            />
            {copied && (
              <span className="absolute text-md text-indigo-400 mt-2 left-1/2 transform -translate-x-1/2">
                Email copied!
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
