import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function FeaturePy2() {
  return <div>FeaturePy2 Page</div>;
}

FeaturePy2.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default FeaturePy2;
