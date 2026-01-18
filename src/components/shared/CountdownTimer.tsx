"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endDate: Date;
  onComplete?: () => void;
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    value: "text-lg sm:text-xl",
    label: "text-xs",
    container: "px-2 py-1 min-w-[40px]",
  },
  md: {
    value: "text-2xl sm:text-3xl",
    label: "text-xs",
    container: "px-3 py-2 min-w-[60px]",
  },
  lg: {
    value: "text-3xl sm:text-4xl",
    label: "text-sm",
    container: "px-4 py-3 min-w-[80px]",
  },
};

function calculateTimeLeft(endDate: Date): TimeLeft {
  const difference = endDate.getTime() - Date.now();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function CountdownTimer({
  endDate,
  onComplete,
  className = "",
  showLabels = true,
  size = "md",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(endDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(newTimeLeft);

      // Check if countdown is complete
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  const sizeStyles = sizes[size];

  const timeUnits = [
    { value: timeLeft.days, label: "วัน" },
    { value: timeLeft.hours, label: "ชม." },
    { value: timeLeft.minutes, label: "นาที" },
    { value: timeLeft.seconds, label: "วิ" },
  ];

  return (
    <div className={`flex justify-center gap-2 sm:gap-3 ${className}`}>
      {timeUnits.map((unit, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center bg-white/20 rounded-xl ${sizeStyles.container}`}
        >
          <span className={`font-bold ${sizeStyles.value}`}>
            {String(unit.value).padStart(2, "0")}
          </span>
          {showLabels && (
            <span className={`text-white/80 ${sizeStyles.label}`}>
              {unit.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
