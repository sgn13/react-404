import React, { Suspense } from "react";
import { Link, useRoutes } from "react-router-dom";
import routes from "./routes";

function AllRoutes() {
  const allRoutes = useRoutes(routes);
  return allRoutes;
}

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to="/">Home</Link>
      <Link to="users">Users</Link>
      <Link to="users/userId">User Profile</Link>
      <Link to="users/me">My Profile</Link>
      <Link to="support/chat">Chat</Link>
    </nav>
  );
}

function AppRouter() {
  return (
    <div>
      <Suspense fallback={<>loading</>}>
        <Navbar />
        <AllRoutes />
      </Suspense>
    </div>
  );
}

export default AppRouter;
