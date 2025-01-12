import React from 'react';
import Svg, {Path} from 'react-native-svg';

const FollowersIcon = ({size = 200, color = 'currentColor'}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 2048 2048"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M1397 1550q-21-114-78-210t-141-166t-189-110t-221-40q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-119t-17-129q0-106 40-199t109-163T568 40T768 0q106 0 199 40t163 109t110 163t40 200q0 66-16 129t-48 119t-75 103t-101 83q99 38 183 100t147 143t105 177t54 202l-57 58l-75-76zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149zm1645 941l-557 558l-269-270l90-90l179 178l467-466l90 90z"
        fill={color}
      />
    </Svg>
  );
};

export default FollowersIcon;
