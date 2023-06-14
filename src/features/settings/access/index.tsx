import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function Access() {
  return <div>Access Page</div>;
}

Access.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Access;
