import React from 'react';
import Svg, {Defs, Image, Pattern, Rect, Use} from 'react-native-svg';
import {IIconProps} from '../../../@types';

const AnswerIcon = ({size = 24}: IIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <Pattern
          id="pattern0_378_333"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use xlinkHref="#image0_378_333" transform="scale(0.0111111)" />
        </Pattern>
        <Image
          id="image0_378_333"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlUlEQVR4nO3cz00CURRGcVZobEErsCixANE2XFiBUcvxz0pNbMGlCwP7YyZhIWZAhMf3GOf8GuBy8nJJWNzBQJIkSZIkSZK0KmAfuACegCn9MwUegXNgbysvBzgCXmt/0x3y0jTZxks2cnvsci97ti7UblwydLOT1e6hZOjJgg8RTEqG1hKGDjF0iKFDDB1i6BBDhxg6xNAhhg4xdIihQwwdYugQQ4cYOsTQIYYOMXSIoUMMHWLoEEOHGDrE0CGGDjF0iKFDDB1i6BBDhxg6xNAhhg4xdIihQwwdYugQQ4cYOsTQIYYOMXSIoUMM3cHQXjdY7LNkaO91hO51NMea1O6sZOi92f0gzXsGhsVCf7sSZuz5yIdFI/942eNmL/X0B3IC3DfrovhLLonNnNaevzNY313t2TuF9bwBB7Vn7xTWuwV6XHvuPoQe1Z65k/ib29rzdharcy8HQk/dy5kXPdr0c3qP3930PlIJLOdeLgX3cgbwvqD1SWiEfgAuWyJf157r3wGGs9jNy/4Arnb670ZJGlT1BS6cHFRMwgpGAAAAAElFTkSuQmCC"
        />
      </Defs>
      <Rect width="24" height="24" fill="url(#pattern0_378_333)" />
    </Svg>
  );
};

export default AnswerIcon;
