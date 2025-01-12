import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

interface SelectRangedProps {
  value: string;
  onChange: (value: string, startDate?: Date, endDate?: Date) => void;
  options: Option[];
  className?: string;
}

const SelectRanged: React.FC<SelectRangedProps> = ({
  value,
  onChange,
  options,
  className,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleCustomRange = () => {
    if (startDate && endDate) {
      onChange("custom", startDate, endDate);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={value} onValueChange={(newValue) => onChange(newValue)}>
        <SelectTrigger className={`w-[180px] ${className}`}>
          <SelectValue placeholder="Select a range" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex items-center space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="End Date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
            </div>
            <Button
              onClick={handleCustomRange}
              disabled={!startDate || !endDate}
            >
              Apply Custom Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectRanged;
