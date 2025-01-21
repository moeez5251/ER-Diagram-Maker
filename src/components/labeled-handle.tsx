import React, { useContext, useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { HandleProps } from "@xyflow/react";
import { BaseHandle } from "@/components/base-handle";
import { counter } from "../../context/context"
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
    const [ind, setind] = useState(false)
    const countervalue = useContext(counter)
    const countervalue1 = useContext(inputscounter)

    useMemo(() => {
      setind(!ind);
      console.log("changed");
    }
      , [countervalue1.index])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const parentelement = event.target.parentElement.parentElement.parentElement;
      const name = parentelement.firstElementChild.firstElementChild.getAttribute("title");
      const type = parentelement.lastElementChild.firstElementChild.getAttribute("title");
      countervalue1.setinp({
        inputname: name,
        inputtype: type
      })

      let parent = event.target.parentElement.parentElement.parentNode.parentNode.parentElement.parentElement.parentNode.firstElementChild.firstElementChild.value
      const targetnode = event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.lastElementChild.innerHTML
      const newField = { title: "no-name", type: "text" };
      let index;
      countervalue.nodes.map(node => {
        if (node.data.label === parent) {
          index = node.data.schema.findIndex(field => field.title === targetnode);
        }
        return null;
      });
      console.log(parent, targetnode, index, countervalue.nodes);
      console.log(ind);
      // countervalue.setNodes(prevNodes =>
      //   prevNodes.map(node =>
      //     node.data.label === parent
      //       ? {
      //         ...node,
      //         data: {
      //           ...node.data,
      //           schema: [
      //             ...node.data.schema.slice(0, index),
      //             newField,
      //             ...node.data.schema.slice(index)
      //           ]
      //         }
      //       }
      //       : node
      //   )
      // );
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
