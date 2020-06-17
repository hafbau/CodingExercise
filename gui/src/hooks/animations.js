import { useEffect, useRef } from "react";

export const useSvgPathAnimation = ({
  delay = 1000,
  dependencies = [],
  className = 'path'
} = {}) => {
  const svgPathRef = useRef(null)
  useEffect(() => {
    let timeout;
    if (svgPathRef.current) {
      svgPathRef.current.classList.remove(className)
      timeout = setTimeout(() => {
        svgPathRef.current.classList.add(className)
      }, delay)
    }
    return () => timeout && clearTimeout(timeout)
  }, dependencies)
  return svgPathRef
}