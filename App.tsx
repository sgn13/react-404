import { Loader } from "components/Spinner/Spinner";
import Layout from "containers/Layout";
import React, { Suspense, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { authRoutes, messageRoutes } from "./routes";

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
    return undefined;
  }, []);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <AuthContents />
        <MessageContents />
        <Layout />
      </Suspense>
    </div>
  );
}

export default AppRouter;
