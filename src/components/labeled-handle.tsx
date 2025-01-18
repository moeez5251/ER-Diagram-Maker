import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";
import { BaseHandle } from "@/components/base-handle";

const flexDirections = {
  top: "flex-col",
  right: "flex-row-reverse justify-end",
  bottom: "flex-col-reverse justify-end",
  left: "flex-row",
};

const LabeledHandle = React.forwardRef<
  HTMLDivElement,
  HandleProps &
    React.HTMLAttributes<HTMLDivElement> & {
      title: string;
      handleClassName?: string;
      labelClassName?: string;
    }
>(
  (
    { className, labelClassName, handleClassName, title, position, ...props },
    ref
  ) => {
    // State for the input value
    const [label, setLabel] = useState(title);

    // Handler for input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(event.target.value);
    };

    return (
      <div
        ref={ref}
        title={label} 
        className={cn(
          "relative flex items-center ",
          flexDirections[position],
          className
        )}
      >
        <BaseHandle position={position} className={handleClassName} {...props} />
        <input style={{background:"none"}}
          className={cn(
            "px-3 text-neutral-950  dark:text-neutral-50 w-20 overflow-x-clip border-none  outline-none",
            labelClassName
          )}
          value={label} 
          onChange={handleChange} 
          type="text"
        />
      </div>
    );
  }
);

LabeledHandle.displayName = "LabeledHandle";

export { LabeledHandle };
