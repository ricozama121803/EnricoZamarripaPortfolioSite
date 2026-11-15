"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IconMail } from "@tabler/icons-react";
import SevenSegment from "./SevenSegment";

function useClock() {
  const [now, setNow] = useState(null); // null until mounted, so server and client markup match
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const pad = (n) => String(n).padStart(2, "0");

// big round button sitting in the bar's raised corners
function RoundButton({ label, onClick, children }) {
  return (
    <button
      type="button" onClick={onClick} aria-label={label} title={label}
      className="group grid h-16 w-16 place-items-center rounded-full border-[3px] border-[#c9ced4] bg-[radial-gradient(circle_at_50%_30%,#ffffff,#eceef1)] shadow-[0_4px_10px_rgba(0,0,0,0.12),inset_0_-3px_6px_rgba(0,0,0,0.05)] transition hover:border-[#36b8f5] hover:shadow-[0_0_0_4px_rgba(54,184,245,0.25),0_6px_16px_rgba(54,184,245,0.35)] focus:outline-none focus-visible:border-[#36b8f5] focus-visible:shadow-[0_0_0_4px_rgba(54,184,245,0.35)] md:h-24 md:w-24"
    >
      <span className="grid h-[78%] w-[78%] place-items-center rounded-full border-2 border-[#36b8f5]/70 transition group-hover:border-[#36b8f5]">
        {children}
      </span>
    </button>
  );
}

export default function BottomBar({ onAbout, onContact }) {
  const now = useClock();
  const h12 = now ? now.getHours() % 12 || 12 : null;
  const time = now ? `${pad(h12)}:${pad(now.getMinutes())}` : "--:--";
  const ampm = now ? (now.getHours() < 12 ? "AM" : "PM") : "";
  const date = now ? now.toLocaleDateString(undefined, { weekday: "short", month: "numeric", day: "numeric" }).replace(",", "") : "";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-[118px] md:h-[184px]">
      {/* the bar itself: raised at both ends where the round buttons sit, dipping in the middle */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 184" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="barFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f6f7f8" />
            <stop offset="1" stopColor="#dcdfe3" />
          </linearGradient>
        </defs>
        <path d="M0,14 L95,14 C150,14 160,52 215,52 L785,52 C840,52 850,14 905,14 L1000,14 L1000,184 L0,184 Z" fill="url(#barFill)" />
        <path d="M0,14 L95,14 C150,14 160,52 215,52 L785,52 C840,52 850,14 905,14 L1000,14" fill="none" stroke="#36b8f5" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <path d="M0,8 L95,8 C150,8 160,46 215,46 L785,46 C840,46 850,8 905,8 L1000,8" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="pointer-events-auto absolute left-3 top-[26px] md:left-[3.5vw] md:top-[38px]">
        <RoundButton label="About me" onClick={onAbout}>
          <Image src="/images/ez-logo.png" alt="" width={56} height={56} className="h-9 w-9 rounded-full md:h-14 md:w-14" />
        </RoundButton>
      </div>
      <div className="pointer-events-auto absolute right-3 top-[26px] md:right-[3.5vw] md:top-[38px]">
        <RoundButton label="Copy my email address" onClick={onContact}>
          <IconMail className="h-8 w-8 text-[#8e949b] transition group-hover:text-[#36b8f5] md:h-11 md:w-11" stroke={1.7} />
        </RoundButton>
      </div>

      <div className="absolute inset-x-0 top-[34px] flex flex-col items-center md:top-[66px]">
        <div className="flex items-start gap-1.5">
          <span className="block h-9 md:h-14" role="timer" aria-label={now ? `${time} ${ampm}` : "clock"}>
            <SevenSegment text={time} blink={now ? now.getSeconds() % 2 === 1 : false} />
          </span>
          <span className="mt-0.5 text-[10px] font-extrabold text-[#9aa0a6] md:text-sm">{ampm}</span>
        </div>
        <p className="mt-1 text-lg font-bold text-[#7b8188] md:mt-2 md:text-3xl" suppressHydrationWarning>{date}</p>
      </div>
    </div>
  );
}
