import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "@mui/styles/styled";
import Annotation from "react-image-annotation";
import { RectangleSelector } from "react-image-annotation/lib/selectors";
import AddModal from "src/components/AddModal/AddModal";
import { createAnnotation } from "src/store/annotation/actions";
import { createAnnotationImage, fetchAnnotationImages } from "src/store/annotationImage/actions";
import AnnotationForm from "./Form";

const Item = styled("div")(({ theme }) => ({}));

function AnnotationImage({
  fetchAnnotationImages,
  createAnnotationImage,
  createAnnotation,
  annotationImages,
  setFieldValue,
  name,
  values,
}: PropsFromRedux) {
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
    let obj = {};
    let objImg = {};
    annotationImages?.forEach((image: any, index: any) => {
      obj = { ...obj, [`image_${index}`]: {} };
      objImg = { ...objImg, [`image_${index}`]: image };
    });
    // assigning names to   annotationimages url
    setAllImages(objImg);
    // creating map data structure to store corresponding annotation data
    setAnnotation(obj);
  }, [annotationImages]);

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
    setFieldValue(name, annotatedItems);
  }, [allImages, annotations, name]);

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
    <div>
      <AddModal
        openModal={showModal === "publish"}
        setOpenModal={() => handleModalClose()}
        confirmationHeading={`Define Ratio`}
      >
        <AnnotationForm
          // isSubmitting={isSubmitting}
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
          }}
        />
      </AddModal>
      <Paper elevation={1} sx={{ padding: "8px" }}>
        <Paper elevation={0} sx={{ display: "flex", gap: "2px" }}>
          {annotationImages?.map((image: any, index: number) => (
            <div
              onClick={() => {
                setActiveImage(`image_${index}`);
              }}
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src={`${process.env.APP_HOST}/${image}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Paper>
        <Paper elevation={0} sx={{ mt: "2px" }}>
          <Grid container>
            <Grid xs={9}>
              <Item>
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
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item>
                <div
                  style={{
                    background: "#f1f1f1",
                    flex: "1",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    marginLeft: "4px",
                  }}
                >
                  <h5>Labels</h5>
                  <ol style={{ width: "100%", textAlign: "left" }}>
                    {!!annotations[`${activeImage}`] &&
                      !!annotations[`${activeImage}`].length &&
                      annotations[`${activeImage}`].map((annotate: any) => (
                        <li
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>{annotate.data.text}</div>
                          <div onClick={() => deleteObject(activeImage, annotate?.data?.id)}>
                            Delete
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </div>
  );
}

const mapStateToProps = ({
  appState: { me },
  annotationImageState: { isSubmitting, isLoading, annotationImages },
}: any) => ({
  isLoading,
  annotationImages,
  isSubmitting,
});

const mapDispatchToProps = {
  createAnnotationImage,
  createAnnotation,
  fetchAnnotationImages,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnnotationImage);
