import React, { useState } from "react";

function Toggleable({ children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = (bool) =>
    setOpen((prev) => (typeof bool === "boolean" ? bool : !prev));

  return children({ open, toggle });
}

export default Toggleable;
