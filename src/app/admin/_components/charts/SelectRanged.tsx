import React from "react";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

const SelectRanged: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border rounded px-2 py-1 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectRanged;
