import { useEffect, useRef } from "react";

// for custom element, pass elementRef.current as element
export default function useEventListener(
  eventType: string,
  callback: Function,
  element?: any,
  capture?: boolean,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null || undefined) return;
    if (!element) element = window;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler, capture);

    return () => element.removeEventListener(eventType, handler, capture);
  }, [eventType, element]);
}
