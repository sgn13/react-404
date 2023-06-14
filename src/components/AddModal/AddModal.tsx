import { Divider, Stack, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import CrossIcon from "../../assets/icons/times_icon.svg";

export const style = {
  position: "absolute" as const,
  borderRadius: "14px",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  zIndex: 999999,
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

function AddModal({
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
}: ModalProps) {
  return (
    <Modal
      sx={{ border: "none", borderRadius: "8px" }}
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
      <>
        <Fade in={openModal}>
          <Box sx={style}>
            <div className="assign__modal-body">
              {/* <Stack direction="column"> */}
              <Stack
                direction="row"
                //     alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction={"column"} gap={2} sx={{ width: "100%" }}>
                  <Typography
                    // mt={3}
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#384874",
                    }}
                  >
                    {`Add ${confirmationHeading} `}
                  </Typography>
                  <Divider style={{ width: "100%" }} />
                </Stack>
                {!isSuccess && (
                  <div className="deactivate_modal_close" onClick={() => setOpenModal(false)}>
                    <img src={CrossIcon} alt="cross" width={24} height={24} />
                  </div>
                )}
              </Stack>
              <Typography
                sx={{
                  color: "#475467",
                }}
                variant="body2"
                component="p"
                //     mt={1}
              >
                {confirmationDesc}
              </Typography>

              {children}
              {/* </Stack> */}
            </div>
          </Box>
        </Fade>
      </>
    </Modal>
  );
}

export default AddModal;
