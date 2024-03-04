import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Tennis() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <Path
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2.05"
        d="M42.215 34.7c7.079-6.932 8.111-17.356 2.307-23.282-5.805-5.927-16.248-5.11-23.326 1.822-7.078 6.932-8.11 17.356-2.306 23.282 5.804 5.927 16.247 5.11 23.325-1.822z"
      ></Path>
      <Path
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2.05"
        d="M15.148 26.42c-.69 4.999-1.285 10.752-4.703 14.17C7.027 44.008 2.93 48.16 2.93 48.16s-3.036 2.049-.998 4.097c2.038 2.049 2.569 3.036 5.318.287 2.75-2.75 5.913-5.68 7.367-7.133 3.503-3.503 7.611-3.854 14.426-4.926M11.167 40.325l4.119 4.225"
      ></Path>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2.05"
        d="M20.254 31.239l18.502-18.545M24.479 35.464L42.97 16.909M30.105 12.694L42.97 25.485M21.644 21.154L34.51 33.945M24.479 15.465L40.04 30.91"
      ></Path>
    </Svg>
  );
}

export default Tennis;