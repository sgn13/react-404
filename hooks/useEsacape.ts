import useEventListener from "./useEventListener/useEventListener";

const ESCAPE_KEY = 27;

const useEscape = (callback, disabled = false) => {
  if (disabled) return;

  const handleEscapePress = (event) => {
    if (event.keyCode === ESCAPE_KEY) {
      callback(event);
    }
  };

  useEventListener("keydown", handleEscapePress);
};

export default useEscape;
