import { Loader } from "components/Spinner/Spinner";
import Layout from "containers/Layout";
import React, { Suspense, useEffect } from "react";
import { Link, useNavigate, useRoutes, useLocation } from "react-router-dom";
import routes, { authRoutes, messageRoutes } from "./routes";

const AuthContents = () => useRoutes(authRoutes);
const MessageContents = () => useRoutes(messageRoutes);

// All those routes which does not shared the layout, are rendered here.
// Remaining routes will be rendered inside the Layout Component because they all will be sharing the same layout.
function AppRouter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) return navigate("/login");
    if (pathname === "/login") return navigate("/");
  }, []);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <AuthContents />
        <MessageContents />
        {sessionStorage.getItem("accessToken") && <Layout />}
      </Suspense>
    </div>
  );
}

export default AppRouter;
