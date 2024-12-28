import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

interface SelectRangedProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

const SelectRanged: React.FC<SelectRangedProps> = ({
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
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
  );
};

export default SelectRanged;
