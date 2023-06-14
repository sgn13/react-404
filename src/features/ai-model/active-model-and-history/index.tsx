import { ReactElement } from 'react';
import FullLayout from 'src/layouts/full/FullLayout';

function ActiveModel() {
  return <div>Active Model and History Page</div>;
}

ActiveModel.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default ActiveModel;
