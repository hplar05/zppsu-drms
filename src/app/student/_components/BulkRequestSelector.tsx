import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BulkRequestSelectorProps {
  documentTypes: string[];
  selectedRequests: string[];
  onChange: (selected: string[]) => void;
}

export function BulkRequestSelector({
  documentTypes,
  selectedRequests,
  onChange,
}: BulkRequestSelectorProps) {
  const handleCheckboxChange = (type: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([...selectedRequests, type]);
    } else {
      onChange(selectedRequests.filter((item) => item !== type));
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Select documents for bulk request:</h4>
      <div className="grid grid-cols-2 gap-4">
        {documentTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`bulk-${type}`}
              checked={selectedRequests.includes(type)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(type, checked as boolean)
              }
            />
            <Label htmlFor={`bulk-${type}`}>{type}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
