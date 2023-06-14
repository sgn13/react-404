import { Button, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import ButtonLoaderSpinner from '../../ButtonLoaderSpinner/ButtonLoaderSpinner';
import CrossIcon from '../../assets/icons/times_icon.svg';

export const style = {
  position: 'absolute' as const,
  borderRadius: '14px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  zIndex: 999999999,
};

interface ModalProps {
  children?: React.ReactNode;
  openModal?: any;
  setOpenModal?: any;
  confirmationIcon?: any;
  confirmationHeading?: string;
  confirmationDesc?: string;
  handelConfirmation?: any;
  status: string;
  loader?: boolean;
  IsSingleBtn?: boolean;
  btnText?: string;
  isSuccess?: boolean;
}

const ConfirmationModal = ({
  children,
  openModal,
  setOpenModal,
  confirmationIcon,
  confirmationHeading,
  confirmationDesc,
  handelConfirmation,
  IsSingleBtn,
  status,
  loader,
  btnText,
  isSuccess,
}: ModalProps) => {
  return (
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
          <Stack direction="column">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {confirmationIcon && <img src={confirmationIcon} alt="check" />}
              {!isSuccess && (
                <div
                  className="deactivate_modal_close"
                  onClick={() => setOpenModal(false)}
                >
                  <img src={CrossIcon} alt="cross" />
                </div>
              )}
            </Stack>
            <Typography
              mt={3}
              variant="h6"
              component="h6"
              sx={{ fontWeight: '600', color: '#384874' }}
            >
              {confirmationHeading}
            </Typography>
            <Typography
              sx={{
                color: '#475467',
              }}
              variant="body2"
              component="p"
              mt={1}
            >
              {confirmationDesc}
            </Typography>
            <Stack
              mt={4}
              spacing={2}
              direction="row"
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              {IsSingleBtn ? (
                <Button
                  variant={isSuccess ? 'outlined' : 'contained'}
                  className="containedButton"
                  onClick={handelConfirmation}
                >
                  {btnText ? (
                    <span
                      style={{
                        color: '#344054',
                        fontSize: 16,
                        lineHeight: '24px',
                        fontWeight: 600,
                      }}
                    >
                      {btnText}
                    </span>
                  ) : (
                    'Go Back to Dashboard'
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    className="buttonContainer outlinedButton"
                    onClick={() => setOpenModal(false)}
                  >
                    No
                  </Button>
                  <Button
                    sx={{ height: '40px', width: '40px' }}
                    disabled={loader ? true : false}
                    variant="contained"
                    className={`buttonContainer ${
                      status === 'warning' ? 'errorButton' : 'containedButton'
                    }`}
                    onClick={handelConfirmation}
                  >
                    {loader ? <ButtonLoaderSpinner /> : 'Yes'}
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
