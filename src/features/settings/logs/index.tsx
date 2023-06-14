import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function Logs() {
  return <div>Logs Page</div>;
}

Logs.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default Logs;
