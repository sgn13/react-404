/* eslint-disable @typescript-eslint/no-var-requires */

function Message({ mode = "react-error", message = "" }) {
  const method = {
    "400": {
      image: require("assets/message/400.gif").default,
      message: "Bad Request",
    },
    "401": {
      image: require("assets/message/401.gif").default,
      message: "Unauthorized",
    },
    "403": {
      image: require("assets/message/403.gif").default,
      message: "Forbidden",
    },
    "404": {
      image: require("assets/message/404.gif").default,
      message: "Page Not Found",
    },
    "500": {
      image: require("assets/message/500.gif").default,
      message: "Internal Server Error.",
    },
    "503": {
      image: require("assets/message/503.gif").default,
      message: "Service Unavailable",
    },
    "504": {
      image: require("assets/message/504.gif").default,
      message: "Gateway Timeout",
    },
    "under-construction": {
      image: require("assets/message/under-construction.gif").default,
      message: "Something went wrong.",
    },
    "react-error": {
      image: require("assets/message/react-error.gif").default,
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

export default Message;
