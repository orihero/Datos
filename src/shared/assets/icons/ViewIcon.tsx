import React from 'react';
import Svg, {Defs, Image, Pattern, Rect, Use} from 'react-native-svg';
import {IIconProps} from '../../../@types';

const ViewIcon = ({size = 24}: IIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <Pattern
          id="pattern0_378_378"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use xlinkHref="#image0_378_378" transform="scale(0.0111111)" />
        </Pattern>
        <Image
          id="image0_378_378"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFgUlEQVR4nO2cW4iVVRSA91hNZZmXGfVFCiuL0cysBIWMclQkJmx6KCLqTZMC0Qq6zmS95IMEPvhQQTd6qCCwhySKxsZLZDhqITMh3R4KK50yx2YUyy9WranjlDPn3//a599nzv7gwOFc/nXh//dea+21t3OJRCKRSCQSiUQikUgkEolEIpGICeB8YB6wAtgEfADsB34CjvAvR/Sz/fqbTfqf64HzirYjOoAxwAJgPfA5cJL8yDU+A54F5osMV6sANwIvAj8QnoPAC8ANrhYAzgXuBfZRHHuBlcBYN9oAxgHrgMPEg+jyFHChq3aAc/TuOUi8HAIekafNVSPAbcDXVA9fAre6agGYCrxG9fIWMMXFDHAP0Ev1cxi428WGTCjA68bGHgc6gDYdhpqAiTru1+v7mfpdO7BV/2PJq8AFLgaAq4EeQ+N2a4Y33kOXCTr5dhnq0w3MCuO98g27C+g3MqgLWGqo2zKNmS34DbjDSrcsRtQBTwKnDIzoB1YDZwXQ82xgDTBgoKfY+ri1jsMpL+PjK9jwBTC7AjrPAQ4Y6fyy+KASKfRmI4U/BSYHVfh03ScBO4103yJVxpBptMzsFnxSROqr0dEuIxs+NLcBuEidYzVcNJgqmM2WRsNhRJ6QcVaKjQU+MlJsALjGRLF8Ns02jJZ25I61dUx+HztWu0gA1hra9Z53UUpDOMtsrytECOeL6GIYZwtvis98FJH6sSVLXWQAtxjb2OaT8VkkI4PszumQJbrsJRPpMX316PLU4hzXlad2j6Gd4rM7yxW+wCiTKmWFpyOuADrLuL5M1jM8ZdxnbKtMsvNHEjotwGLpcc8CkSze/pxBjvx2oYccqQKeMLZZfDhtuLrANuzp8LyTszh5EKmFX+4hzyp8LaXzfyd/4BnC0OZheDnDxZnYGsHEP8jTQwXdDPwRSNhyj4kvL80ZZbYSht+Bm0prGN8SjqaMRkt0kZfnM8qcRTi++StNBzYQloaMRksIl5cej/pHSDY4bRQMSX1Go/sMZPZ5lBpC8qOrQPdQfUajjxrIPBqZow+JkI2jcOjojmzo2ChCpgC/BhTSVOOT4S//rCQBDwQUtDyj0YsNZC6KJLwT7h/aDG61njaU9ixGG2RqHRElLNv/0wQPXBmgmORr+HTt8qxUCh6i9CA1nplnEvhwIIETPIxfmLGPr9ezqDQpQFFJeHCk+uw7AYSuzOoA1WdGmSvvHT53sspYFcDezSOutmjZUNJGS7p8nFCiU7NEEtoH16evbv1sUY7r1hkvZwlflf0E6/Yz687MZS4ygBZjG8Vn12VVwjrk2ys1bxcJWn+X7XaFD5EhssY1LhICTPzP5VFG4uu3DZUZAOaaesy/p9uqgWZwO8YYiy3DVj13aDtWo5nXstszWTcGYdiDZ7MlWlqejIP6XQU2OUoXqxWd5lsvdCVmp7GzG02VHPlOtnTyjmA3i97Z7xoPI3OCKHu63nONh4stwZ9IDYuk691yglwbIvRTXR8yruG8VLEwVTOqdcZtY/u0F67OSL8W4zj5lO4dz62fj0Etno0uw7FH27QmehaIVgVIq8XGljBeLN+4SwMYhlbUOvUuatVVkAbdrFSv768Cbtena1ugKpy0G093MSBxpJ4gY3F6TCycVJviOzZIt5lZ7lotChnb57mY0b3ajwVe8A2FHIj1qNjgqgWdmNYHWh6z5oTWtqe6agW4RFsILIs4VvTrroGL3WgBGK8nD8g5dUVzQI/3KWy/Y3D4O5lYonfS9xV07nc6PDQXknRE4PRr9WCTj3UTkBXHtPDzhNY6asu5ZSw0XKYJSrvu3duu/Xi92l5VGiH06nfymzf0tJpWvUbtnt6YSCQSiUQikUgkEolEIpFIJBIuOv4EzrVQSV0PL9oAAAAASUVORK5CYII="
        />
      </Defs>
      <Rect width="25" height="25" fill="url(#pattern0_378_378)" />
    </Svg>
  );
};

export default ViewIcon;
