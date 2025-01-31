import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
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
    { className, labelClassName, handleClassName, type, title, position, id, ...props },
    ref
  ) => {
    const [label, setLabel] = useState(title);
    const countervalue = useContext(counter)
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const row_id = event.target.parentElement.parentElement.parentElement.id
      const tableid = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
      const newValue = event.target.value;
      setLabel(newValue)
      
      countervalue.setNodes(prevNodes =>
        prevNodes.map(node => {
          if (node.id !== tableid) return node;

          let schemaChanged = false;
          const newSchema = node.data.schema.map(field => {
            if (field.id === row_id) {
              if (field.title === newValue) return field;
              schemaChanged = true;
              return { ...field, title: newValue };

            }
            return field;
          });

          if (!schemaChanged) return node;

          return {
            ...node,
            data: {
              ...node.data,
              schema: newSchema,
            },
          };
        })
      );
      sessionStorage.setItem('rowid', row_id);
    };
    useEffect(() => {
      let a = sessionStorage.getItem('rowid');
      if (a) {
        const inputElement = document.querySelector(`input[data-idname="${a}"]`) as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }
    
    }, []);


    return (
      <div
        ref=  {ref}
        title={label}
        style={{ boxShadow: "inset 1px 1px 6px 0px #7a7a7a" }}
        className={cn(
          "relative flex items-center  flex-row-reverse mx-2 py-1 px-2 my-1 rounded-lg",
          flexDirections[position],
          className
        )}
      >
        <BaseHandle id={`source-${id}`}  position={position} className={handleClassName} {...props} />
        <BaseHandle  id={`target-${id}`}  position="left" type="target" className={handleClassName} {...props} />
        <input
          style={{ background: "none" }}
          type="text"
          onChange={handleChange}
          data-idname={id}
          className={cn(
            "bg-transparent border-none outline-none w-4/5",
            labelClassName
          )} value={label} />
      </div>
    ); 
  }
);

LabeledHandle.displayName = "LabeledHandle";

export { LabeledHandle };