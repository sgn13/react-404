import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function FeaturePy3() {
  return <div>FeaturePy3 Page</div>;
}

FeaturePy3.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default FeaturePy3;
