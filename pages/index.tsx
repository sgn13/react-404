import ReactDOM from "react-dom";
import webpackLogo from "assets/images/webpack-logo.png";
import React, { useState, useEffect } from "react";
import "theme/index.scss";
import Button from "components/Button";

const x = 5;
const name = "firoj";

function Welcome() {
  const [a, setA] = useState();

  // useEffect(() => {
  //   console.log("a is ", a);
  // }, []);

  // console.log("PORT", process.env.PORT);
  return (
    <div>
      <Button>I am a button</Button>
      <h1 className="color-red">Welcome Webpack Development Server.</h1>
      <img src={webpackLogo} alt="webpack-logo" style={{ width: 300, height: "auto" }} />
      <img
        src="/images/typescript-logo.png"
        alt="webpack-logo"
        style={{ width: 300, height: "auto" }}
      />
    </div>
  );
}

export default Welcome;
