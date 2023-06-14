import { useRef } from "react";
import useEventListener from "src/hooks/useEventListener/useEventListener";

function ClickOutside({ children, open, onClickOutside, closeOnOutsideClick }) {
  const containerRef = useRef();

  const handleOutsideClick = (event) => {
    if (open && containerRef.current && !containerRef.current.contains(event.target)) {
      onClickOutside();
    }
  };

  if (closeOnOutsideClick) useEventListener("click", handleOutsideClick);

  return children({ containerRef });
}

export default ClickOutside;
