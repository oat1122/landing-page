"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className = "",
  titleClassName = "",
  contentClassName = "",
}: AccordionItemProps) {
  return (
    <div
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-indigo-200 bg-white shadow-lg shadow-indigo-500/10"
          : "border-gray-200 bg-white hover:border-indigo-100"
      } ${className}`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 text-left focus:outline-none ${titleClassName}`}
      >
        <span
          className={`text-lg font-semibold transition-colors ${
            isOpen ? "text-indigo-600" : "text-gray-900"
          }`}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-indigo-600" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`p-5 pt-0 text-gray-600 leading-relaxed ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    id: string | number;
    title: ReactNode;
    content: ReactNode;
  }>;
  allowMultiple?: boolean;
  defaultOpenIndex?: number | null;
  className?: string;
  itemClassName?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndex = null,
  className = "",
  itemClassName = "",
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<string | number>>(
    defaultOpenIndex !== null
      ? new Set([items[defaultOpenIndex]?.id])
      : new Set(),
  );

  const toggleItem = (id: string | number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndices.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          className={itemClassName}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
