import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Star() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      fill="none"
      viewBox="0 0 14 13"
    >
      <Path
        fill="#fff"
        d="M6.393 1.23c.176-.545.947-.545 1.124 0l1.03 3.17a.59.59 0 00.562.408h3.333c.572 0 .81.733.347 1.069l-2.697 1.96a.591.591 0 00-.214.66l1.03 3.17c.177.544-.446.997-.91.66l-2.696-1.959a.59.59 0 00-.695 0l-2.696 1.96c-.464.336-1.087-.117-.91-.661l1.03-3.17a.59.59 0 00-.214-.66L1.12 5.876c-.463-.336-.225-1.069.347-1.069h3.334a.59.59 0 00.562-.408l1.03-3.17z"
      ></Path>
    </Svg>
  );
}

export default Star;