import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Message() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="37"
      fill="none"
      viewBox="0 0 36 37"
    >
      <Path
        stroke="#000"
        strokeWidth="1.6"
        d="M1 18.5c0 9.389 7.611 17 17 17 2.99 0 5.801-.772 8.242-2.128 1.32-.733 6.55 2.606 7.625 1.561 1.048-1.02-2.052-6.415-1.293-7.675A16.921 16.921 0 0035 18.5c0-9.389-7.611-17-17-17S1 9.111 1 18.5z"
      ></Path>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M10.067 15.1H21.4M10.067 21.9h15.866"
      ></Path>
    </Svg>
  );
}

export default Message;