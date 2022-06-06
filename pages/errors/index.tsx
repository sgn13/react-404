import Image400 from "assets/images/error/400.gif";
import Image401 from "assets/images/error/401.gif";
import Image403 from "assets/images/error/403.gif";
import Image404 from "assets/images/error/404.gif";
import Image500 from "assets/images/error/500.gif";
import Image503 from "assets/images/error/503.gif";
import Image504 from "assets/images/error/504.gif";
import ImageUnderConstruction from "assets/images/error/under-construction.gif";
import ReactErrorImage from "assets/images/error/react-error.gif";

function Error({ mode = "react-error", message = "" }) {
  const method = {
    "400": {
      image: Image400,
      message: "Bad Request",
    },
    "401": {
      image: Image401,
      message: "Unauthorized",
    },
    "403": {
      image: Image403,
      message: "Forbidden",
    },
    "404": {
      image: Image404,
      message: "Page Not Found",
    },
    "500": {
      image: Image500,
      message: "Internal Server Error.",
    },
    "503": {
      image: Image503,
      message: "Service Unavailable",
    },
    "504": {
      image: Image504,
      message: "Gateway Timeout",
    },
    "under-construction": {
      image: ImageUnderConstruction,
      message: "Something went wrong.",
    },
    "react-error": {
      image: ReactErrorImage,
      message: "Something went wrong.",
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={method[mode].image} alt="error" />
      <label>{message || method[mode].message}</label>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Error;
