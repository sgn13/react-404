import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function FeaturePy1() {
  return <div>FeaturePy1 Page</div>;
}

FeaturePy1.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default FeaturePy1;
