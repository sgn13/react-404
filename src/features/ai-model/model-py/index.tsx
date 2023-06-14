import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function ModelPy() {
  return <div>ModelPy Page</div>;
}

ModelPy.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default ModelPy;
