import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import E404 from "pages/errors/E404";
import Index from "./pages/index";

function Users() {
  return (
    <div>
      <div>All Users</div>
      <Outlet />
    </div>
  );
}

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>User is {id}</div>
      <button
        type="button"
        onClick={() =>
          navigate("/support/chat", {
            replace: false,
            state: {
              name: "firoj",
              userId: id,
            },
          })
        }
      >
        Go to Chat
      </button>
    </>
  );
}

function OwnUserProfile() {
  return <div>My Profile</div>;
}

function Chat() {
  const { pathname, state } = useLocation();

  return (
    <div>
      <h6>Chat Page</h6>
      <div>
        Name is {state?.name} userId is {state?.userId}
      </div>
    </div>
  );
}

function AllRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Index /> },
    {
      path: "users",
      element: <Users />,
      children: [
        { path: ":id", element: <UserProfile /> },
        { path: "me", element: <OwnUserProfile /> },
      ],
    },
    { path: "/support/chat", element: <Chat /> },
    { path: "*", element: <E404 /> },
  ]);
  return routes;
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
