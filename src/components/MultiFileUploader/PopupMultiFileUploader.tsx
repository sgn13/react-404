import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// import './multiFileUploader.scss';
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import uploadIcon from "src/assets/icons/upload.svg";
import { IndividualFile } from "./index";

const useStyles = makeStyles({
  error: {
    marginBottom: 20,
  },
  close: {
    fill: "#667085",
    right: "5px",
    top: "6px",
  },
});

interface Upload {
  file: File | null;
  preview: string | null;
  name: string;
  progress?: number;
  size?: number | string;
  formatedFileSize?: string;
  base64?: any;
}

interface FileUpload {
  documents: Upload[];
  title: string;
}

interface UploadModalProps {
  open: boolean;
  onClose: ({ reset, closePopup }: any) => void;
  onUpload: (files: FileUpload[]) => void;
  currentFiles?: any;
  accept?: any;
  maxFileSize: number;
  requireDescription?: boolean;
  multiple?: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export function RenderArea({ dragText = false, accept = {}, maxFileSize }: any) {
  return (
    <div className="drag-drop">
      <div className="drop-input">
        <Box className="text-center" id="hell">
          <img id="upload_csv_icon" src={uploadIcon} width={40} height={40} alt="upload here" />
          <Typography variant="body1" component="p">
            <strong className="info-title">Click to upload </strong>{" "}
            {dragText && "or drag and drop"} <br />
            <small className="info">
              {/* {type === 'csv' ? 'CSV (max. 2 MB)' : 'SVG, PNG or JPG. (max. 400x400px)'} */}
              {Object.values(accept)
                .join("")
                .replace(",", "")
                .replace(".", "")
                .replaceAll(".", ", ")}{" "}
              (max. {maxFileSize} MB)
            </small>
          </Typography>
        </Box>
      </div>
    </div>
  );
}

const UploadModal: React.FC<UploadModalProps> = ({
  open,
  onClose,
  onUpload,
  currentFiles,
  accept,
  maxFileSize,
  requireDescription = true,
  multiple = true,
}) => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [fileError, setFileError] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (currentFiles?.documents) {
      setFiles([currentFiles]);
    }
  }, [currentFiles]);

  const handleFileDrop = (acceptedFiles: File[]) => {
    const newFiles: Upload[] = [];
    acceptedFiles.forEach((file) => {
      setFileError("");
      const reader = new FileReader();
      const MAXFILESIZE = Number(maxFileSize) * 1024 * 1024;
      if (Number(file?.size) > MAXFILESIZE) {
        setFileError(`File size must be less than ${formatFileSize(MAXFILESIZE)}`);
        return;
      }
      reader.onloadstart = () => {
        const uploadFile: Upload = {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          progress: 0,
          size: file.size,
          formatedFileSize: formatFileSize(file?.size),
        };

        newFiles.unshift(uploadFile);

        // Set progress to 0 when the reader starts reading the file
        uploadFile.progress = 0;

        // Add the new file to the state
        if (files?.length > 0) {
          const copyFile: any = [...files];
          copyFile[0].documents = [uploadFile, ...copyFile[0].documents];
          setFiles(copyFile);
        } else {
          const newFile = [{ documents: [uploadFile], title: "" }];
          setFiles(newFile);
        }
      };

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          // Update the progress of the new file being added to the state
          const percentLoaded = Math.round((event.loaded / event.total) * 100);
          newFiles[newFiles.length - 1].progress = percentLoaded;

          // Update the progress of the file in the state
          if (files?.length > 0) {
            const copyFile: any = [...files];
            const index = copyFile[0].documents.findIndex((doc: Upload) => doc.name === file.name);
            copyFile[0].documents[index].progress = percentLoaded;
            setFiles(copyFile);
          }
        }
      };

      reader.onload = () => {
        // Convert the file to base64 when the reader has finished reading it
        const base64Data = reader.result as string;
        const uploadFile = newFiles[newFiles.length - 1];
        uploadFile.base64 = base64Data;

        // Update the state with the base64 data
        if (files?.length > 0) {
          const copyFile: any = [...files];
          const index = copyFile[0].documents.findIndex((doc: Upload) => doc.name === file.name);
          copyFile[0].documents[index].base64 = base64Data;
          setFiles(copyFile);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const updatedFiles = files?.length >= 1 ? [...files] : [{ title: "", documents: [] }];

    updatedFiles.forEach((file) => {
      file.title = event.target.value;
    });
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    // currently there is only one element created
    updatedFiles[0]?.documents?.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    onUpload(files);
    setFiles([]);
  };

  const dropzoneOptions = accept
    ? { onDrop: handleFileDrop, accept, multiple }
    : { onDrop: handleFileDrop, multiple };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const handleCloseError = () => {
    setFileError("");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose({ reset: false, closePopup: true });
      }}
      sx={{ overflow: "hidden" }}
    >
      <DialogTitle>
        Upload and attach files
        <Typography variant="body1" component="p">
          Upload and attach files to this project
        </Typography>
      </DialogTitle>

      <IconButton
        className={classes?.close}
        onClick={() => {
          onClose({ reset: false, closePopup: true });
        }}
        sx={{
          position: "absolute",
          fontSize: "2rem",
        }}
      >
        <CloseIcon />
      </IconButton>

      <div style={{ padding: "0px 24px" }}>
        <Grid
          spacing={1}
          sx={{
            marginLeft: "0",
            marginRight: "0",
            paddingBottom: "10px",
            lineHeight: "4.6",
          }}
        >
          {!!requireDescription && (
            <div style={{ width: "100%" }}>
              <InputLabel htmlFor="website">
                <div className="label-heading">
                  Description <sub>*</sub>{" "}
                </div>
              </InputLabel>
              <OutlinedInput
                // label="Description"
                value={files[0]?.title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDescriptionChange(event)
                }
                placeholder="What is the description of document?"
                fullWidth
              />
            </div>
          )}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <RenderArea accept={accept} maxFileSize={maxFileSize} />
          </div>
        </Grid>
        <div className="individual__file-container">
          {files.map((file, index) =>
            file?.documents?.length >= 1 ? (
              file?.documents?.map((doc, index) => (
                <Grid item key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IndividualFile
                      key={index}
                      file={doc}
                      onDelete={() => {
                        handleRemoveFile(index);
                      }}
                    />
                  </div>
                </Grid>
              ))
            ) : (
              <></>
            ),
          )}
        </div>
      </div>
      {fileError && (
        <Alert severity="error" className={classes.error} onClose={handleCloseError}>
          {fileError}
        </Alert>
      )}
      <div className="upload__option-actions">
        <Button
          onClick={() => {
            setFiles([]);
            if (currentFiles?.documents?.length || currentFiles?.title) {
              onClose({ reset: true, closePopup: true });
            } else {
              onClose({ reset: false, closePopup: true });
            }
          }}
          variant="outlined"
          sx={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
        >
          {multiple ? "Remove All" : "Cancel"}
        </Button>
        <Button
          onClick={handleUpload}
          disabled={
            !(!requireDescription
              ? !!(files.length && files[0]?.documents?.length)
              : !!(files.length && files[0]?.title && files[0]?.documents?.length))
          }
          variant="contained"
        >
          Upload
        </Button>
      </div>
    </Dialog>
  );
};

export default UploadModal;
