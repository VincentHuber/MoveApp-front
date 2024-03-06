import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Position() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      fill="none"
      viewBox="0 0 29 28"
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M14.5 12.629v8.71"
      ></Path>
      <Circle
        cx="14.5"
        cy="6.532"
        r="5.732"
        stroke="#000"
        strokeWidth="1.6"
      ></Circle>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M7.532 16.548C5.5 16.984 1 18.552 1 21.338 1 24.824 8.403 27 14.5 27S28 24.823 28 21.339c0-2.787-4.645-4.355-6.968-4.79"
      ></Path>
    </Svg>
  );
}

export default Position;
