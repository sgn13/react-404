import React from "react";

function useProtectedRoute() {
  const isLoggedIn = sessionStorage.getItem("accessToken");
  return { isLoggedIn };
}

export default useProtectedRoute;

// usage/consumption:
// const {isLoggedIn} = useProtectedRoute();
// return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
