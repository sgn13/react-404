import { Outlet } from "react-router-dom";

function Users() {
  return (
    <div>
      <div>All Users</div>
      <Outlet />
    </div>
  );
}

export default Users;
