import React from 'react';
import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react';
 
export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const defaultPath = 'M0 0L10 10'; // Fallback path for errors
  const safeValue = (value, fallback) =>
    typeof value === 'number' && !isNaN(value) ? value : fallback;

  const safeSourceX = safeValue(sourceX, 0);
  const safeSourceY = safeValue(sourceY, 0);
  const safeTargetX = safeValue(targetX, 100);
  const safeTargetY = safeValue(targetY, 100);

  const [edgePath] = getSmoothStepPath({
    sourceX: safeSourceX,
    sourceY: safeSourceY,
    sourcePosition,
    targetX: safeTargetX,
    targetY: safeTargetY,
    targetPosition,
  }) || [defaultPath];


  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <circle r="10" fill="#ff0073">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath || defaultPath} />
      </circle>
    </>
  );
}