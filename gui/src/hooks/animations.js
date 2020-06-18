import { useEffect, useMemo, useRef } from "react";

const ARBITRARILY_LARGE_NUMBER = 30000;

export const useSvgPathAnimation = ({
  delay = 0,
  dependencies = [],
  className = 'path'
} = {}) => {
  const svgPathRef = useRef(null);
  // const pathLength = useMemo(() => {
  //   let len = svgPathRef.current && svgPathRef.current.getTotalLength();
  //   len = len || ARBITRARILY_LARGE_NUMBER;

  //   return len; // arbitrary large number for stroke-dasharray animation
  // }, [svgPathRef.current, ...dependencies]);
  useEffect(() => {
    let timeout;
    if (svgPathRef.current) {
      svgPathRef.current.classList.remove(className)
      timeout = setTimeout(() => {
        svgPathRef.current.classList.add(className)
      }, delay)
    }
    return () => timeout && clearTimeout(timeout)
  }, dependencies);

  return [svgPathRef]
  // return [svgPathRef, pathLength]
}