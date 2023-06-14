import { useState } from "react";

// import CloseIcon from '@mui/icons/Close';
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import FullPageLoader from "src/components/FullPageLoader";
// import './popupList.scss';
import { useRouter } from "next/router";
import { Link } from "react-router-dom";
import { IndividualFile } from "src/components/MultiFileUploader/index";
import { tableIndicatorProps } from ".";

interface CustomPopUpProps extends ButtonProps {
  // Define any additional props for your component here
  data?: any[];
  title?: string;
  domain?: string;
  showNumber?: number;
  ID?: number | undefined;
  row?: any;
  setTableConfig?: (arg?: any) => void;
  tableIndicator?: tableIndicatorProps;
  openInNewWindow?: boolean;
}
// domain to identify to which i should forward to
// for findings and recommendations title is enough

interface IndividualListProps {
  id?: number;
  domain?: string;
  router?: any;
  children?: any;
  handleClose?: any;
  individualData?: any;
}

export function IndividualListDisplay({
  id,
  domain,
  router,
  children,
  handleClose,
  individualData,
}: IndividualListProps) {
  const nestedDomain = domain?.toString().toLowerCase();
  return (
    <li
      className={`${
        nestedDomain?.toLowerCase() === "findings" ? "hover__effect-underline " : ""
      }description__tab `}
      onClick={(e) => {
        e.stopPropagation();
        if (domain?.toString().toLowerCase() === "findings") {
          handleClose?.();
          router?.push(`/config/findings-recommendations?findings=${id}`);
        }
      }}
    >
      {children !== undefined ? children : ""}
    </li>
  );
}

function CustomPopUp(props: CustomPopUpProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function getRedirectionLink() {
    const link = props?.ID
      ? props?.title?.split(" ").reverse()[0]?.toString()?.toLowerCase() !== "attachments"
        ? props?.tableIndicator?.subSectionUrl && props?.tableIndicator?.subSectionUrl(props?.ID)
        : props?.tableIndicator?.editFrontEndUrlGetter?.(props?.ID)
      : router?.pathname;

    return link;
  }

  // getRedirectionLink();

  return (
    <>
      {open && <FullPageLoader />}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props?.data?.length ? (
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "small", cursor: "pointer" }}
            component="div"
            onClick={handleOpen}
            //   sx={{ display: 'none' }}
            //   ref={ref}
          >
            {props?.title?.toString()?.toLowerCase().includes("attachments") ? (
              <Button variant="outlined">View Attachments</Button>
            ) : (
              "View More"
            )}
          </Typography>
        ) : (
          <Link to={getRedirectionLink()} style={{ textDecoration: "none" }}>
            <Button variant="outlined">
              Add{" "}
              {props?.title
                ? props?.title?.split(" ").reverse()[0]?.toString()
                : "Findings & Recommendations"}
            </Button>
          </Link>
        )}
        <Dialog open={open} onClose={handleClose} fullWidth className="popup__list-styling">
          <DialogTitle className="popup__heading">
            {props?.title || ""} here.
            <span>View all {props?.title?.split(" ").reverse()[0]}</span>
            <IconButton onClick={handleClose} className="close__icon">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="popup__content">
            <ol
              className={`${
                props?.title?.toString()?.toLowerCase().includes("attachments")
                  ? "remove__list-count"
                  : ""
              }`}
            >
              {props?.data?.length &&
                props?.data?.map((item: any) => {
                  if (item instanceof Object) {
                    return (
                      <IndividualListDisplay
                        key={item?.id}
                        handleClose={handleClose}
                        id={item?.id}
                        router={router}
                        individualData={item}
                        domain={props?.title?.split(" ").reverse()[0]}
                      >
                        <p>{item?.description}</p>
                      </IndividualListDisplay>
                    );
                  }
                  if (props?.title?.toLowerCase()?.includes("attachment")) {
                    return (
                      <IndividualListDisplay
                        key={item}
                        handleClose={handleClose}
                        id={item}
                        router={router}
                        individualData={item}
                        domain={props?.title?.split(" ").reverse()[0]}
                      >
                        <IndividualFile file={item} openInNewWindow={props?.openInNewWindow} />
                      </IndividualListDisplay>
                    );
                  }
                })}
            </ol>
          </DialogContent>
          <DialogActions className="actions__container">
            <Button onClick={handleClose} variant="outlined" className="close__button">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default CustomPopUp;
