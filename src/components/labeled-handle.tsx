import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";
import { BaseHandle } from "@/components/base-handle";
import { inputscounter } from "../../context/context1"

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
    const countervalue1 = useContext(inputscounter)
  
   
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const parentelement = event.target.parentElement.parentElement.parentElement;
      const name = parentelement.firstElementChild.firstElementChild.getAttribute("title");
      const type = parentelement.lastElementChild.firstElementChild.getAttribute("title");
      
      let parent = event.target.parentElement.parentElement.parentNode.parentNode.parentElement.parentElement.parentNode.firstElementChild.firstElementChild.id;
      const targetnode = event.target.parentElement.parentElement.parentElement.id;
      console.log(parent,targetnode);
      countervalue1.setinp((prev) => ({
        ...prev,
        inputname: name,
        inputtype: type,
        parent:parent,
        targetnode:targetnode
      }));

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
        <div style={{ background: "none" }}
          className={cn(
            "px-3 text-neutral-950  dark:text-neutral-50 w-20 overflow-x-clip border-none  outline-none",
            labelClassName
          )}
          onClick={handleChange}
        >
          {label}

        </div>
      </div>
    );
  }
);

LabeledHandle.displayName = "LabeledHandle";

export { LabeledHandle };
