import { Calendar } from "lucide-react";

interface DateRangeFilterProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  labelFrom?: string;
  labelTo?: string;
  className?: string;
}

export default function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  labelFrom = "วันที่เริ่มต้น",
  labelTo = "วันที่สิ้นสุด",
  className = "",
}: DateRangeFilterProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {/* Date From */}
      <div>
        <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
          <Calendar className="w-3 h-3" /> {labelFrom}
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Date To */}
      <div>
        <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
          <Calendar className="w-3 h-3" /> {labelTo}
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
      </div>
    </div>
  );
}
