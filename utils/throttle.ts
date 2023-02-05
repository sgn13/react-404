export default function throttle(callback: Function, executeOnceWithin: number) {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const handleCallback = (arg: any) => {
    callback(arg);
    if (typeof timerId === "number") clearTimeout(timerId);
    timerId = undefined; // setting timerId to falsy in order to track timer that timer with this timerId is now no longer active
  };
  return (arg: any) => {
    if (timerId) return;
    timerId = setTimeout(() => handleCallback(arg), executeOnceWithin);
  };
}
