"use client";

import { useState, useEffect, useCallback } from "react";

const PROMO_STORAGE_KEY = "promo_70_seen";
const PROMO_END_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UsePromotionReturn {
  isOpen: boolean;
  timeLeft: TimeLeft;
  closePromo: () => void;
}

function calculateTimeLeft(): TimeLeft {
  const difference = PROMO_END_DATE.getTime() - Date.now();

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

export function usePromotion(): UsePromotionReturn {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize with calculated value to avoid setState in effect
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    // Check if user has already seen the promo
    const hasSeen = localStorage.getItem(PROMO_STORAGE_KEY);
    if (!hasSeen) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Only use setInterval for updates, initial state already set
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const closePromo = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(PROMO_STORAGE_KEY, "true");
  }, []);

  return { isOpen, timeLeft, closePromo };
}
