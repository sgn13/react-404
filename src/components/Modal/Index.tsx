import Button from "src/components/Button/Button";
import Dialog from "src/components/Dialog/Dialog";
import { Buffering } from "src/components/Spinner/Spinner";

export default function Modal({
  name,
  show,
  onClose,
  onClick,
  buttonName = "button Name",
  isSubmitting = false,
  body,
  children,
  minHeight = "auto",
  showDialogButton = true,
}) {
  return (
    <Dialog
      title={`${name}`}
      open={show}
      onClose={onClose}
      minHeight={minHeight}
      actions={
        showDialogButton && (
          <div style={{ width: "100%" }}>
            <Button
              style={{ marginLeft: "auto", textShadow: "none", borderRadius: "2em" }}
              size="sm"
              onClick={onClick}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularLoader color={"white"} size={"1.5rem"} /> : buttonName}
            </Button>
          </div>
        )
      }
    >
      {body}
      {children}
    </Dialog>
  );
}

export const DeleteModal = ({ name, show, onClose, onClick, isSubmitting = false }) => {
  return (
    <Dialog
      title={`Delete ${name}`}
      open={show}
      onClose={onClose}
      actions={
        <div style={{ width: "100%" }}>
          <Button
            style={{ marginLeft: "auto", textShadow: "none", borderRadius: "2em" }}
            text="Submit"
            size="sm"
            elevation={0}
            color="white"
            onClick={onClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Buffering color="red">
                {new Array(12).fill(0).map((item) => (
                  <div />
                ))}
              </Buffering>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      }
    >
      Are you sure you want to delete this {name} ?
    </Dialog>
  );
};

export const ViewModal = ({ name, body, show, onClose, minHeight, disableCloseButton = false }) => {
  return (
    <Dialog
      title={`${name}`}
      open={show}
      onClose={onClose}
      minHeight={minHeight}
      actions={
        disableCloseButton ? null : (
          <div style={{ width: "100%" }}>
            <Button size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )
      }
    >
      {body}
    </Dialog>
  );
};
