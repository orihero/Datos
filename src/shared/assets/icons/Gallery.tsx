import React from 'react';
import Svg, {G, Polyline, Rect, Circle} from 'react-native-svg';
import {COLORS} from '../../constants/colors'; // Agar ranglarni constants fayldan olish kerak bo'lsa

const GalleryIcon = ({
  size = 24,
  color = COLORS.lightGray,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G>
        <Polyline
          points="22.41 19.41 17 14 14.5 16.5"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <Polyline
          points="18 20 9.5 11.5 1.59 19.41"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <Rect
          x={1}
          y={4}
          width={22}
          height={16}
          rx={2}
          ry={2}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <Circle
          cx={17}
          cy={9}
          r={1}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <Rect width={24} height={24} fill="none" />
      </G>
    </Svg>
  );
};

export default GalleryIcon;
