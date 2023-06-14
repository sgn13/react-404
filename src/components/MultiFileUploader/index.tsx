import { Grid, IconButton, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UploadImage from 'src/assets/icons/Icon.svg';
import FileDataModal from 'src/components/FileDataModal';
import MultiUpload, { RenderArea } from './PopupMultiFileUploader';

type file = {
  documents: any[];
  title: string;
  id?: number;
};

type IndexProps = {
  setOpenMultiImage: React.Dispatch<React.SetStateAction<boolean>>;
  openMultiImage: boolean;
  // it must be a callback function that gets the file data for you
  getFileData?: any;
  clearData: boolean;
  setClearData: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: any;
  accept?: any;
  maxFileSize: number;
  icon?: any;
  requireDescription?: boolean;
  For?: string;
  defaultViewer?: boolean;
  multiple?: boolean;
};

// individual file
export const IndividualFile = ({
  isDesignOne,
  file,
  onDelete,
  openInNewWindow,
}: any) => {
  const fileOpen = file?.preview
    ? file?.preview
    : `${process.env.REACT_APP_HOST_URL}/${file}`;
  let newFileName = '';
  let fileSize = '';
  if (!file?.preview) {
    const fileFullName = file?.toString().split('/')?.reverse()[0];
    newFileName = fileFullName?.toString().split('--')?.reverse()[0] || '';
    fileSize = fileFullName?.toString().split('--')[0] || '';
  } else {
    newFileName = file?.name;
    fileSize = file?.formattedSize;
  }
  return (
    <FileDataModal data={fileOpen} openInNewWindow={openInNewWindow}>
      <div className="upload upload__box">
        <Grid container spacing={0} className="upload__box-wrapper">
          {/* <div className="image__container">
            <img
              src={fileOpen ? fileOpen : uploadIcon}
              width={40}
              height={40}
              alt="upload here"
              className="img-upload-icon"
            />
          </div> */}
          <Grid item className="progress-holder">
            {!!onDelete && (
              <div className="pull-right">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  size="small"
                >
                  {/* <DeleteOutlinedIcon /> */}
                  <img src={UploadImage} alt="" />
                </IconButton>
              </div>
            )}
            <span className="file-name-details">{newFileName}</span>
            <span className="size">{fileSize}</span>
            {file?.progress ? (
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={11}>
                  <LinearProgress
                    variant="determinate"
                    value={file?.progress || 0}
                    color={'primary'}
                    className="progress"
                  />
                </Grid>
                <Grid item xs={1}>
                  {/* {progress.toFixed(0)}% */}
                  {file?.progress || ''}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        {isDesignOne && <>Design One</>}
      </div>
    </FileDataModal>
  );
};

const Index = ({
  setOpenMultiImage,
  openMultiImage,
  getFileData,
  clearData,
  setClearData,
  initialData,
  accept,
  maxFileSize,
  icon = null,
  defaultViewer = true,
  requireDescription = true,
  For = 'normal',
  multiple,
}: IndexProps) => {
  // handling outer file upload
  const [files, setFiles] = useState<file>({ documents: [], title: '' });
  const [showFileData, setShowFileData] = useState('');

  const handleRemoveFile = (index: number) => {
    const updatedFiles = { ...files };
    // currently there is only one element created
    updatedFiles?.documents?.splice(index, 1);
    getFileData(updatedFiles);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    if (clearData) {
      setFiles({ documents: [], title: '' });
      setClearData(false);
    }
  }, [clearData]);

  useEffect(() => {
    if (initialData?.length) {
      setFiles({
        documents: initialData[0]?.documents,
        title: initialData[0]?.title,
        id: initialData[0]?.id,
      });
    }
  }, [initialData]);

  return (
    <>
      <div className="file__uploader-container">
        <Grid>
          {icon !== null && (
            <div
              onClick={() => {
                setOpenMultiImage(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              {icon ? (
                icon
              ) : (
                <RenderArea
                  accept={accept}
                  maxFileSize={maxFileSize}
                ></RenderArea>
              )}
            </div>
          )}
        </Grid>

        <MultiUpload
          open={openMultiImage}
          onClose={({ reset, closePopup }: any) => {
            if (reset === true) {
              setFiles({ documents: [], title: '' });
              getFileData({ documents: [], title: '' });
            }
            closePopup && setOpenMultiImage(false);
          }}
          onUpload={(files) => {
            setOpenMultiImage(false);
            setFiles((prev) => ({
              ...prev,
              documents: [...(files[0]?.documents || [])],
              title: files[0]?.title,
            }));
            getFileData(files);
          }}
          currentFiles={files}
          accept={accept}
          maxFileSize={maxFileSize}
          requireDescription={requireDescription}
          multiple={multiple}
        />
      </div>
      {!!defaultViewer &&
        files?.documents?.map((doc, index) => (
          <Grid
            item
            xs={12}
            md={12}
            key={index}
            className="individual__file-container-box"
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IndividualFile
                file={doc}
                openInNewWindow={!openMultiImage}
                onDelete={() => {
                  handleRemoveFile(index);
                }}
              ></IndividualFile>
            </div>
          </Grid>
        ))}
    </>
  );
};

export default Index;
