import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import Annotation from "react-image-annotation";
import { RectangleSelector } from "react-image-annotation/lib/selectors";

import { Button } from "@mui/material";
import AddModal from "src/components/AddModal/AddModal";
import MultiUploader from "src/components/MultiFileUploader/index";
import { createAnnotation } from "src/store/annotation/actions";
import { createAnnotationImage, fetchAnnotationImages } from "src/store/annotationImage/actions";
import AnnotationForm from "./Form";

function AnnotationImage({ createAnnotationImage, createAnnotation }: PropsFromRedux) {
  const [showModal, setShowModal] = useState(undefined);

  const [selected, setSelected] = useState<any>(undefined);

  const handleModalShow = (mode: any) => setShowModal(mode);
  const handleModalClose = () => setShowModal(undefined);

  const images = localStorage.getItem("images")?.split(",");

  const [openMultiImage, setOpenMultiImage] = useState(false);

  const [type, setType] = useState(RectangleSelector);
  const [annotations, setAnnotations] = useState<any>({
    image_0: [],
    image_1: [],
    image_2: [],
    image_3: [],
  });
  const [allImages, setAllImages] = useState<any>("");
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [annotation, setAnnotation] = useState<any>("");
  const [activeImage, setActiveImage] = useState("image_0");

  const [imageSizes, setImageSizes] = useState({});

  useEffect(() => {
    fetchAnnotationImages({});
  }, []);

  useEffect(() => {
    const transformedAnnations: any = Object.entries(annotations || []).map(
      ([imageName, imageAnnotations]: any) => ({
        image_url: allImages[`${imageName}`],
        data:
          (imageAnnotations?.length &&
            imageAnnotations?.map((ann: any) => {
              const width = ann.geometry.width / 100;
              const height = ann.geometry.height / 100;
              return {
                x: ann.geometry.x / 100 + width / 2,
                y: ann.geometry.y / 100 + height / 2,
                w: width,
                h: height,
                ...ann.data,
              };
            })) ||
          [],
      }),
    );

    const annotatedItems = transformedAnnations.filter((item: any) => item.data.length);
    setAnnotatedImages(annotatedItems);
  }, [allImages, annotations]);

  useEffect(() => {
    let obj = {};
    let objImg = {};
    images?.forEach((image: any, index: any) => {
      obj = { ...obj, [`image_${index}`]: {} };
      objImg = { ...objImg, [`image_${index}`]: image };
    });
    // assigning names to images url
    setAllImages(objImg);
    // creating map data structure to store corresponding annotation data
    setAnnotation(obj);
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const imagesURLs = Object.entries(allImages).map((image: any) => {
        return `${process.env.APP_HOST}/${image[1]}`;
      });
      let imageIndividualSizes = {};

      if (imagesURLs.length) {
        await Promise.all<void>(
          imagesURLs.map((imageUrl: any, index: number) => {
            return new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.src = imageUrl;

              img.onload = () => {
                imageIndividualSizes = {
                  ...imageIndividualSizes,
                  [`image_${index}`]: {
                    width: img.width,
                    height: img.height,
                  },
                };
                resolve();
              };

              img.onerror = (err) => {
                reject(err);
              };
            });
          }),
        );
      }

      setImageSizes(imageIndividualSizes);
    };

    loadImages();
  }, [allImages]);

  const onSubmit = (e: any) => {
    const { geometry, data }: any = annotation[`${activeImage}`];
    setAnnotation({ ...annotation, [`${activeImage}`]: {} });
    setAnnotations({
      ...annotations,
      [`${activeImage}`]: [
        ...annotations?.[`${activeImage}`],
        {
          geometry,
          data: {
            ...data,
            id: Math.random(),
          },
        },
      ],
    });
  };

  const activeAnnotationComparator = (a: any, b: any) => {
    return a.data.id === b;
  };

  const deleteObject = (imageKey: any, id: number) => {
    setAnnotations((prevState: any) => {
      const updatedImages = { ...prevState };
      updatedImages[imageKey] = updatedImages[imageKey].filter((obj: any) => obj.data.id !== id);
      return updatedImages;
    });
  };

  console.log({ allImages, annotatedImages, annotations, imageSizes, annotation });

  return (
    <>
      <AddModal
        openModal={showModal === "publish"}
        setOpenModal={() => handleModalClose()}
        confirmationHeading={`Define Ratio`}
      >
        <AnnotationForm
          // isSubmitting={isSubmitting}
          // // placements={placements}
          onClose={() => handleModalClose()}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, resetForm: any) => {
            const trainNumber = (values.train / 100) * annotatedImages.length;
            const trainWithoutDecimal = Math.trunc(trainNumber);
            const trainDatasetImages: any = annotatedImages.slice(0, trainWithoutDecimal);
            const validDatasetImages = annotatedImages.slice(trainWithoutDecimal); // from trainDatasetImages to end of the array.
            const payload = {
              train: trainDatasetImages,
              valid: validDatasetImages,
            };
            if (await createAnnotation({ values: payload })) {
              handleModalClose();
              resetForm();
            }
            // console.log(values,"values")
            // if (await createFileUpload({ values })) {
            //   handleModalClose();
            //   resetForm();
            // }
          }}
          // onEdit={async (values: any, { resetForm }) => {
          //   if (
          //     await updateFileUpload({
          //       fileUploadId: selected?.id,
          //       values,
          //     })
          //   ) {
          //     handleModalClose();
          //     resetForm();
          //   }
          // }}
        />
      </AddModal>
      <div style={{ display: "flex", border: "1px solid silver" }}>
        <div
          style={{ flexBasis: "15%", padding: "1rem", background: "#f1f1f1", marginRight: "1rem" }}
        >
          <MultiUploader
            setOpenMultiImage={setOpenMultiImage}
            openMultiImage={openMultiImage}
            initialData={
              // handleFormikFields?.values?.[`${item?.component}__${item.id}`]
              //   ?.media || []
              []
            }
            // For={'Objects'}
            // clearData={clearData}
            // setClearData={setClearData}
            maxFileSize={10}
            requireDescription={false}
            accept={{
              "image/jpeg": [".jpeg", ".jpg"],
              "image/png": [".png"],
              "application/pdf": [".pdf"],
            }}
            icon={
              <div className="attach__files-icon">
                {/* <AttachFileIcon></AttachFileIcon> */}
                <Button variant="contained">+</Button>
              </div>
            }
            defaultViewer={false}
            getFileData={async (files: any = []) => {
              const formData = new FormData();
              const linkFiles: any = [];
              const Files = files[0]?.documents?.map((doc: any, index: number) => {
                if (doc.file) {
                  formData.append(`files`, doc?.file);
                } else {
                  linkFiles.push(doc);
                }
              });

              const response = await createAnnotationImage({ values: formData });
              if (response) console.log(response, "eresponse");
            }}
          />

          <div
            style={{
              margin: "1rem 0",
            }}
          >
            {images?.map((image: any, index: number) => (
              <div
                onClick={() => {
                  setActiveImage(`image_${index}`);
                }}
              >
                <img src={`${process.env.APP_HOST}/${image}`} width="80" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "3", background: "#555" }}>
          <div style={{ background: "black", color: "white" }}>Toolbar</div>
          <div style={{ width: "750px", margin: "0 auto", display: "grid" }}>
            <Annotation
              activeAnnotationComparator={activeAnnotationComparator}
              src={`${process.env.APP_HOST}/${allImages[`${activeImage}`]}`}
              alt="Image"
              annotations={annotations?.[`${activeImage}`] || []}
              type={type?.type}
              value={annotation?.[`${activeImage}`]}
              onChange={(value: any) => {
                setAnnotation({ ...annotation, [`${activeImage}`]: value });
              }}
              onSubmit={(e: any) => onSubmit(e)}
              allowTouch
            />
          </div>
        </div>

        <div
          style={{
            background: "#f1f1f1",
            flex: "1",
            padding: "1rem",
            borderRadius: "0.25rem",
            marginLeft: "1rem",
          }}
        >
          <h5>Label</h5>
          <br />
          <div style={{ width: "100%", textAlign: "left" }}>
            {!!annotations[`${activeImage}`] &&
              !!annotations[`${activeImage}`].length &&
              annotations[`${activeImage}`].map((annotate: any) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>{annotate.data.text}</div>
                  <div onClick={() => deleteObject(activeImage, annotate?.data?.id)}>Delete</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Button
        style={{ float: "right" }}
        variant="contained"
        onClick={() => handleModalShow("publish")}
      >
        Publish
      </Button>
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  annotationImageState: { isSubmitting, isLoading, annotationImages },
}: // // placementState: { placements },
any) => ({
  isLoading,
  annotationImages,
  isSubmitting,
  // placements,
});

const mapDispatchToProps = {
  createAnnotationImage,
  createAnnotation,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnnotationImage);
