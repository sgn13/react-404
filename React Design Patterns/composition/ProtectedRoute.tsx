import { Navigate, useLocation } from "react-router-dom";

// composition
// usage:
//   <ProtectedRoute redirectTo="/login">
//     <Outlet />
//   </ProtectedRoute>
// ),

// Even this composition pattern

{
  /* <Layout navbar={<div>navbar</div>} sidebar={<div>sidebar</div>} content={<div>navbar</div>}/> */
}
function ProtectedRoute({
  children,
  redirectTo = "/login",
}: {
  children: any;
  redirectTo: string;
}) {
  let location = useLocation();

  if (!sessionStorage.getItem("accessToken")) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
