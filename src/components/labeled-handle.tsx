import React, { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";
import { BaseHandle } from "@/components/base-handle";
import { counter } from "../../context/context"
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
    const [label, setLabel] = useState(title);
    const countervalue = useContext(counter)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let parent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.value;
      console.log(event.target.parentElement, event.target.parentElement.getAttribute("title"));
      const newValue = event.target.value;
      setLabel(newValue); // Update the label (input field's state)
  
      // Find the title of the parent node to update schema
      countervalue.setNodes(prevNodes =>
        prevNodes.map(node => {
          if (node.data.label === parent) {
            // Find the index of the schema field to update
            const index = node.data.schema.findIndex(field => field.title === event.target.parentElement.getAttribute("title"));
  
            if (index !== -1) {
              return {
                ...node,
                data: {
                  ...node.data,
                  schema: [
                    ...node.data.schema.slice(0, index),
                    { ...node.data.schema[index], title: newValue }, // Update the schema at the found index
                    ...node.data.schema.slice(index + 1)
                  ]
                }
              };
            }
          }
          return node; 
        })
      );
      console.log(countervalue.nodes);
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
        <input style={{ background: "none" }}
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
