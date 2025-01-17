"use client";

import * as React from "react";
import { Panel, useReactFlow, PanelProps, useStore } from "@xyflow/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ZoomSelect = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className, ...props }, ref) => {
  const { zoomTo, fitView } = useReactFlow();

  const handleZoomChange = React.useCallback(
    (value: string) => {
      if (value === "best-fit") {
        fitView();
      } else {
        const zoomValue = parseFloat(value);
        if (!isNaN(zoomValue)) {
          zoomTo(zoomValue);
        }
      }
    },
    [fitView, zoomTo],
  );

  const zoomLevels = useStore((state) => {
    const { minZoom, maxZoom } = state;
    const levels = [];
    const zoomIncrement = 50;

    for (
      let i = Math.ceil(minZoom * 100);
      i <= Math.floor(maxZoom * 100);
      i += zoomIncrement
    ) {
      levels.push((i / 100).toString());
    }

    return levels;
  });

  return (
    <Panel
      ref={ref}
      className={cn("flex bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50", className)}
      {...props}
    >
      <Select onValueChange={handleZoomChange}>
        <SelectTrigger className="w-[140px] bg-neutral-50 dark:bg-neutral-900">
          <SelectValue placeholder="Zoom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="best-fit">Best Fit</SelectItem>
          <div className="mx-2 my-1 border-t" />
          {zoomLevels.map((level) => (
            <SelectItem key={level} value={level}>
              {`${(parseFloat(level) * 100).toFixed(0)}%`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Panel>
  );
});

ZoomSelect.displayName = "ZoomSelect";

export { ZoomSelect };
