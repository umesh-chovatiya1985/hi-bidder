import React from "react";
import { ThreeCircles } from "react-loader-spinner";
/** https://mhnpd.github.io/react-loader-spinner/docs/intro */

export default function CustomLoader({ classData, bgColor }: any) {
  classData =
    classData ??
    "z-50 fixed rounded-lg grid top-0 bottom-0 left-0 right-0 text-center content-center z-[99999999]";

  bgColor = bgColor ?? "#f0f8ffcc";
  return (
    <div className={classData} style={{ backgroundColor: bgColor }}>
      <ThreeCircles
        height="100"
        width="100"
        color="var(--primary-color)"
        wrapperClass="flex-col items-center content-center"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
