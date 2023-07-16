import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "@mui/styles/styled";
import Annotation from "react-image-annotation";
import { RectangleSelector } from "react-image-annotation/lib/selectors";
import AddModal from "src/components/AddModal/AddModal";
import { createAnnotation } from "src/store/annotation/actions";
import { createAnnotationImage, fetchAnnotationImages } from "src/store/annotationImage/actions";
import AnnotationForm from "./Form";

const Item = styled("div")(({ theme }) => ({}));

const AnnotationImg = styled("div")(({ theme, image, activeImage }) => ({
  width: "100px",
  boxSizing: "border-box",
  height: "100px",
  transform: image === activeImage ? "translateY(-5px)" : "none",
  transition: "0.4s transform",
  cursor: "pointer",
  borderRadius: "2px",
}));

const AnnotationBoxes = styled("div")(({ theme }) => ({
  background: "#052A63",
  flex: "1",
  padding: "1rem",
  borderRadius: "0.25rem",
  marginLeft: "4px",
}));

const AnnotationBox = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "left",
  borderBottom: "0.5px solid #cccccc86",
  padding: "4px",
  lineHeight: 2,
  "&:hover": {
    background: "#d6ca2142",
    borderRadius: "2px",
  },
}));

function AnnotationImage({
  fetchAnnotationImages,
  createAnnotationImage,
  createAnnotation,
  annotationImages,
  setFieldValue,
  name,
  next,
  values,
  nextStep,
}: PropsFromRedux) {
  const [showModal, setShowModal] = useState(undefined);

  const [selected, setSelected] = useState<any>(undefined);

  const handleModalShow = (mode: any) => setShowModal(mode);
  const handleModalClose = () => setShowModal(undefined);

  const [type, setType] = useState(RectangleSelector.TYPE);
  const [annotations, setAnnotations] = useState<any>({});
  const [allImages, setAllImages] = useState<any>("");
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [annotation, setAnnotation] = useState<any>({});
  const [activeImage, setActiveImage] = useState("");
  const [activeAnnotations, setActiveAnnotations] = useState([]);

  const [imageSizes, setImageSizes] = useState({});

  useEffect(() => {
    setActiveAnnotations(annotations[activeImage]);
  }, [activeImage, annotations]);

  useEffect(() => {
    if (nextStep?.name === "Annotate" && values?.projectName) {
      fetchAnnotationImages({ query: { project_name: values.projectName, perPage: 99 } });
    }
  }, [values.projectName, nextStep?.name]);

  useEffect(() => {
    if (!annotationImages && !annotationImages?.length) return;
    setActiveImage(annotationImages[0]);
    let obj = {};
    let objImg = {};
    annotationImages?.forEach((image: any, index: any) => {
      obj = { ...obj, image: {} };
      objImg = { ...objImg, [image]: image };
    });
    // assigning names to   annotationimages url
    setAllImages(objImg);
    // creating map data structure to store corresponding annotation data
    setAnnotation(obj);

    const initialAnnotations = annotationImages.reduce((acc, item, index) => {
      acc[item] = [];
      return acc;
    }, {});

    setAnnotations(initialAnnotations);
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

  // useEffect(() => {
  //   const loadImages = async () => {
  //     const imagesURLs = Object.entries(allImages).map((image: any) => {
  //       return `${process.env.API_HOST}/${image[1]}`;
  //     });
  //     let imageIndividualSizes = {};

  //     if (imagesURLs.length) {
  //       await Promise.all<void>(
  //         imagesURLs.map((imageUrl: any, index: number) => {
  //           return new Promise<void>((resolve, reject) => {
  //             const img = new Image();
  //             img.src = imageUrl;

  //             img.onload = () => {
  //               imageIndividualSizes = {
  //                 ...imageIndividualSizes,
  //                 [imageUrl]: {
  //                   width: img.width,
  //                   height: img.height,
  //                 },
  //               };
  //               resolve();
  //             };

  //             img.onerror = (err) => {
  //               reject(err);
  //             };
  //           });
  //         }),
  //       );
  //     }

  //     setImageSizes(imageIndividualSizes);
  //   };

  //   loadImages();
  // }, [allImages]);

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

  const handleMouseOver = (id: any) => (e: any) => {
    setActiveAnnotations((prev: any) => [...prev, id]);
  };

  const handleMouseOut = (id: any) => (e: any) => {
    const index = activeAnnotations.indexOf(id);
    setActiveAnnotations((prev: any) => [prev.slice[(0, index)], prev.slice[index + 1]]);
  };

  const activeAnnotationComparator = (a: any, b: any) => a.data.id === b;

  const deleteObject = (imageKey: any, id: number) => {
    setAnnotations((prevState: any) => {
      const updatedImages = { ...prevState };
      updatedImages[imageKey] = updatedImages[imageKey].filter((obj: any) => obj.data.id !== id);
      return updatedImages;
    });
  };

  console.log(annotations?.[`${activeImage}`]);

  // console.log({ allImages, annotatedImages, annotations, activeImage, imageSizes, annotation });
  // console.log({
  //   annotationImages,
  //   allImages,
  //   activeImage,
  //   src: `${process.env.API_HOST}/${allImages[`${activeImage}`]}`,
  //   annotations: annotations?.[`${activeImage}`],
  //   value: annotation?.[`${activeImage}`],
  //   type,
  //   activeAnnotation: annotations?.[`${activeImage}`],
  // });

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
        <Paper elevation={0} sx={{ display: "flex", gap: "5px" }}>
          {annotationImages?.map((image: any, index: number) => (
            <AnnotationImg
              onClick={() => {
                setActiveImage(image);
              }}
              image={image}
              activeImage={activeImage}
            >
              <img
                src={`${process.env.API_HOST}/${image}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </AnnotationImg>
          ))}
        </Paper>
        <Paper elevation={0} sx={{ mt: "5px" }}>
          <Grid container>
            <Grid xs={9}>
              <Item>
                {activeImage && type && annotations?.[`${activeImage}`] ? (
                  <Annotation
                    activeAnnotationComparator={activeAnnotationComparator}
                    activeAnnotations={activeAnnotations || []}
                    src={`${process.env.API_HOST}/${allImages[`${activeImage}`]}`}
                    alt="Image"
                    annotations={annotations?.[`${activeImage}`] || []}
                    type={type}
                    value={annotation?.[`${activeImage}`] || {}}
                    onChange={(value: any) => {
                      setAnnotation({ ...annotation, [`${activeImage}`]: value });
                    }}
                    onSubmit={(e: any) => onSubmit(e)}
                    allowTouch
                  />
                ) : null}
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item>
                <AnnotationBoxes>
                  <h5 style={{ color: "white", fontSize: "1.1em", fontWeight: 500 }}>BOXES</h5>

                  {!!annotations[`${activeImage}`] &&
                    !!annotations[`${activeImage}`].length &&
                    annotations[`${activeImage}`].map((annotate: any) => (
                      <AnnotationBox
                        onMouseOver={handleMouseOver(annotate?.data?.id)}
                        onMouseOut={handleMouseOut(annotate?.data?.id)}
                        key={annotate[activeImage]}
                      >
                        <li
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "white",
                          }}
                        >
                          <div style={{ color: "inherit" }}>{annotate.data.text}</div>
                          <Button
                            style={{ color: "inherit" }}
                            onClick={() => deleteObject(activeImage, annotate?.data?.id)}
                            startIcon={<DeleteOutlineIcon size={20} />}
                          />
                        </li>
                      </AnnotationBox>
                    ))}
                </AnnotationBoxes>
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
