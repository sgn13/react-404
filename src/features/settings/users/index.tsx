import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function Users() {
  return <div>Users Page</div>;
}

Users.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Users;
