import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import MultiUploader from "src/components/MultiFileUploader/index";
import { createAnnotationImage } from "src/store/annotationImage/actions";
import { fetchFeatures } from "src/store/feature/actions";
import { AppState } from "src/store/reducer";

function UploadImages({
  isLoading,
  values,
  createAnnotationImage,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any }) {
  const [openMultiImage, setOpenMultiImage] = useState(false);

  return (
    <Grid item>
      <MultiUploader
        setOpenMultiImage={setOpenMultiImage}
        openMultiImage={openMultiImage}
        initialData={[]}
        maxFileSize={10}
        multiple={false}
        requireDescription={false}
        accept={{
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
          "application/pdf": [".pdf"],
        }}
        icon={
          <div className="attach__files-icon">
            <Button sx={{ textTransform: "none" }} variant="contained">
              Upload image to be predicted
            </Button>
          </div>
        }
        defaultViewer={false}
        getFileData={async (files: any = []) => {
          console.log("file submitted");
          const formData = new FormData();
          const linkFiles: any = [];
          const Files = files[0]?.documents?.map((doc: any, index: number) => {
            if (doc.file) {
              formData.append(`files`, doc?.file);
            } else {
              linkFiles.push(doc);
            }
          });

          console.log("files", Files);

          // await createAnnotationImage({ values: formData });
        }}
      />
    </Grid>
  );
}

const mapStateToProps = ({ featureState: { features, isLoading } }: AppState) => ({
  features,
  isLoading,
});

const mapDispatchToProps = { fetchFeatures, createAnnotationImage };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UploadImages);
