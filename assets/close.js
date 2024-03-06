import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Icon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <Path
        stroke="#fff"
        strokeWidth="3.576"
        d="M22.854 9.2L9.2 22.853M23.107 23.107L8.947 8.947"
      ></Path>
    </Svg>
  );
}

export default Icon;