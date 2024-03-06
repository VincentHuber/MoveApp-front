import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Upload() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <Circle
        cx="27.918"
        cy="27.918"
        r="19.741"
        fill="#4A46FF"
        transform="rotate(-45 27.918 27.918)"
      ></Circle>
      <Path
        stroke="#fff"
        strokeWidth="3.209"
        d="M28.342 19.254v17.328M37.327 27.918h-17.97"
      ></Path>
    </Svg>
  );
}

export default Upload;
