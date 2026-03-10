"use client";

import { sounds } from "@/lib/sounds";
import Image from "next/image";
import { toast } from "sonner";

interface WakaTimeStatCardProps {
  label: string;
  value: string;
  bgColor?: string;
  subtitle?: string;
}

function formatValue(value: string) {
  const parts = value.split(' ');
  
  return (
    <span className="inline-flex items-baseline gap-1 flex-wrap">
      {parts.map((part, index) => {
        const match = part.match(/^(\d+)([a-z]+)$/i);
        
        if (match) {
          const [, number, unit] = match;
          return (
            <span key={index} className="inline-flex items-baseline">
              <span className="text-2xl font-bold">{number}</span>
              <span className="text-xs font-medium ml-0.5">{unit}</span>
            </span>
          );
        }
        
        if (/^[a-z]+$/i.test(part)) {
          return (
            <span key={index} className="text-xs font-medium">
              {part}
            </span>
          );
        }
        
        return (
          <span key={index} className="text-2xl font-bold">
            {part}
          </span>
        );
      })}
    </span>
  );
}

export function WakaTimeStatCard({
  label,
  value,
  bgColor = "#fafafa",
  subtitle,
}: WakaTimeStatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px] group-hover:top-[-35px] z-0 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100">
        <Image
          src="/images/frog.png"
          alt=""
          width={70}
          height={70}
          className="object-contain"
        />
      </div>
      
      <article 
        className="rounded-lg cursor-pointer border-0 p-5 transition-all duration-300 hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgba(0,0,0,0.15)] relative z-10"
        style={{ backgroundColor: bgColor }}
        onMouseEnter={() => sounds.whoosh()}
        onClick={() => {
          sounds.pop();
          toast.success("🎉 Easter egg unlocked!", {
            description: "You found the hidden WakaTime card secret!",
          });
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-100 font-mono">
          {label}
        </p>
        <div className={`font-jetbrains-mono tracking-tight text-white ${subtitle ? "mt-2" : "mt-3"}`}>
          {formatValue(value)}
        </div>
        {subtitle && (
          <p className="mt-1 text-[10px] text-white">
            {subtitle}
          </p>
        )}
      </article>
    </div>
  );
}
