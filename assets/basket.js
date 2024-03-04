import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Basket() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="47"
      fill="none"
      viewBox="0 0 46 47"
    >
      <Path
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2.05"
        d="M22.79 44.994c11.924 0 21.59-9.666 21.59-21.59 0-11.925-9.666-21.592-21.59-21.592-11.925 0-21.592 9.667-21.592 21.591 0 11.925 9.667 21.591 21.591 21.591zM37.895 8.437L7.727 38.87M7.727 8.213l30.168 30.105"
      ></Path>
      <Path
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="2.05"
        d="M23.044 1.813v9.34c0 1.582-.233 5.17-3.853 8.503-3.567 3.27-6.836 3.758-8.63 3.758H1.75M44.635 23.648h-9.341c-1.582 0-5.17.233-8.503 3.853-3.27 3.567-3.757 6.836-3.757 8.63v8.81"
      ></Path>
    </Svg>
  );
}

export default Basket;