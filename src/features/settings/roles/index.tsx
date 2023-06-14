import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function Roles() {
  return <div>Roles Page</div>;
}

Roles.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Roles;
