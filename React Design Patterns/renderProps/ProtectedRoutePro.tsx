import { PropsWithChildren } from "react";

// renderProp pattern: A truely resuable react design pattern.
// It is best suited for Cross component prop sharing .
// It can connect two inpendent and stateful components via props.
// prop Provider Component will have no idea whom it is providing its prop.
// prop Consumer Component will have no ideo whom it is receiving its prop from.
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
