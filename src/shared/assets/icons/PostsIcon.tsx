import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const PostsIcon = ({size = 200, color = 'currentColor', strokeWidth = 1.5}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G fill="none" stroke={color} strokeWidth={strokeWidth}>
        <Path d="M5 11.5c0-1.886 0-2.828.586-3.414C6.172 7.5 7.114 7.5 9 7.5h6c1.886 0 2.828 0 3.414.586C19 8.672 19 9.614 19 11.5v1c0 1.886 0 2.828-.586 3.414c-.586.586-1.528.586-3.414.586H9c-1.886 0-2.828 0-3.414-.586C5 15.328 5 14.386 5 12.5v-1Z" />
        <Path
          strokeLinecap="round"
          d="M19 2v.5A2.5 2.5 0 0 1 16.5 5h-9A2.5 2.5 0 0 1 5 2.5V2m14 20v-.5a2.5 2.5 0 0 0-2.5-2.5h-9A2.5 2.5 0 0 0 5 21.5v.5"
        />
      </G>
    </Svg>
  );
};

export default PostsIcon;
