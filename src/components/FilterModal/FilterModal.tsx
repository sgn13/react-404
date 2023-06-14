import {
  Button,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';

export const style = {
  position: 'absolute' as const,
  borderRadius: '14px',
  top: '50%',
  right: '30%',
  transform: 'translate(30%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1.3,
  zIndex: 99999999,
};

interface ModalProps {
  children?: React.ReactNode;
  openModal?: any;
  setOpenModal?: any;
  confirmationIcon?: any;
  confirmationHeading?: string;
  confirmationDesc?: string;
  handelConfirmation?: any;
  loader?: boolean;
  IsSingleBtn?: boolean;
  btnText?: string;
  isSuccess?: boolean;
  size?: string;
}

const FilterModal = ({
  children,
  openModal,
  setOpenModal,
  confirmationIcon,
  confirmationHeading,
  confirmationDesc,
  handelConfirmation,
  IsSingleBtn,

  loader,
  btnText,
  isSuccess,
  size,
}: ModalProps) => {
  return (
    <>
      <Modal
        sx={{ border: 'none', borderRadius: '8px' }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div className="">
              <Stack direction="column" gap={'20px'}>
                <DialogTitle padding={'5px 0px !important'}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={'15px'}>
                      <Button
                        variant="outlined"
                        startIcon={
                          <img src="/assets/icons/filter.svg" alt="edit" />
                        }
                      />
                      <Stack>
                        <Typography
                          sx={{
                            color: '#475467',
                          }}
                          variant="body2"
                          component="p"
                          fontWeight={600}

                          //     mt={1}
                        >
                          Apply Filters
                        </Typography>
                        <Typography
                          sx={{
                            color: '#475467',
                          }}
                          variant="body2"
                          component="p"
                          //     mt={1}
                        >
                          Please select your preferred filters.
                        </Typography>
                      </Stack>
                    </Stack>
                    <IconButton component="label">
                      <img src="/assets/icons/cancel_icon.svg" alt="cancel" />
                    </IconButton>
                  </Stack>
                </DialogTitle>
                <Divider color="#E5E5E5" />
                {children}
              </Stack>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default FilterModal;
