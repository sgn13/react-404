import ReactDOM from "react-dom";
import webpackLogo from "assets/images/webpack-logo.png";
import "theme/index.scss";

console.log("PORT", process.env.PORT);
const x: number = 5;
const Welcome = () => {
  return (
    <div>
      <h1 className="color-red">Welcome Webpack Development Server.</h1>
      <img
        src={webpackLogo}
        alt="webpack-logo"
        style={{ width: 300, height: "auto" }}
      />
      <img
        src="/images/typescript-logo.png"
        alt="webpack-logo"
        style={{ width: 300, height: "auto" }}
      />
    </div>
  );
};

const mountingNode = document.querySelector("#root");

ReactDOM.render(<Welcome />, mountingNode);
