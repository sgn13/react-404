import { PropsWithChildren } from "react";

// renderProp pattern
function ProtectedRoutePro({ children }: PropsWithChildren<any>) {
  const isLoggedIn = sessionStorage.getItem("accessToken");
  return children({ isLoggedIn });
}

export default ProtectedRoutePro;

// usage
{
  /* <ProtectedRoutePro>
  {({ isLoggedIn }: { isLoggedIn: boolean }) =>
    isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
  }
</ProtectedRoutePro>; */
}
