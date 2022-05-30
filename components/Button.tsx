import React from "react";

function Button({ name }: { name?: "string" }) {
  console.log(name);
  return <div>Button</div>;
}

export default Button;
