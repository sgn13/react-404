import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function Secure() {
  return <div>Secure Page</div>;
}

Secure.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Secure;
