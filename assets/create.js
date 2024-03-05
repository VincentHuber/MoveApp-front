import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Create() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      fill="none"
      viewBox="0 0 26 27"
    >
      <Circle
        cx="10.322"
        cy="6.536"
        r="5.629"
        stroke="#fff"
        strokeWidth="1.6"
      ></Circle>
      <Path
        stroke="#fff"
        strokeWidth="1.6"
        d="M10.857 15.107c-5.03 0-9.107 3.707-9.107 8.28v1.363h18.214v-1.364c0-4.572-4.077-8.279-9.107-8.279z"
      ></Path>
      <Path fill="#4A46FF" d="M13.536 14.036H22.107V26.893H13.536z">
      </Path>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M14.607 19.929h9.643M19.428 15.107v9.643"
      ></Path>
    </Svg>
  );
}

export default Create;
