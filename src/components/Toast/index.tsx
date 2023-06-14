import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

type ToastType = {
  item: any;
  resetNotification: (arg?: any) => void;
};

const Toast = ({ item, resetNotification }: ToastType) => {
  let timeout;
  console.log('MA call vaye');
  useEffect(() => {
    timeout = setTimeout(resetNotification, 2000);
  }, []);
  enqueueSnackbar(item?.message || '', { variant: item?.variant || 'default' });

  return <></>;
};

export default Toast;
