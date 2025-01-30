import React from 'react';
import { useConnection } from '@xyflow/react';

export default ({ fromX = 0, fromY = 0, toX = 0, toY = 0 }) => {
  const { fromHandle } = useConnection();

  const validFromX = !isNaN(fromX) ? fromX : 0;
  const validFromY = !isNaN(fromY) ? fromY : 0;
  const validToX = !isNaN(toX) ? toX : 0;
  const validToY = !isNaN(toY) ? toY : 0;

  const strokeColor = fromHandle?.id || '#000';
  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        className="animated"
        d={`M ${validFromX},${validFromY} C ${validFromX} ${validToY} ${validFromX} ${validToY} ${validToX},${validToY}`}
      />
      <circle
        cx={validToX}
        cy={validToY}
        fill="#fff"
        r={3}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    </g>
  );
};
