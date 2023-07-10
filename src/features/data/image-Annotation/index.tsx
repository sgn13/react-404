import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import Annotation from "react-image-annotation";
import { RectangleSelector } from "react-image-annotation/lib/selectors";

import { Button } from "@mui/material";
import AddModal from "src/components/AddModal/AddModal";
import MultiUploader from "src/components/MultiFileUploader/index";
import { createAnnotationImage, fetchAnnotationImages } from "src/store/annotationImage/actions";
import AnnotationForm from "./Form";

function AnnotationImage({
  // placements,
  createAnnotationImage,
  createAnnotationData,
}: any) {
  const [showModal, setShowModal] = useState(undefined);

  const [selected, setSelected] = useState<any>(undefined);

  const handleModalShow = (mode: any) => setShowModal(mode);
  const handleModalClose = () => setShowModal(undefined);

  useEffect(() => {
    fetchAnnotationImages({});
  }, []);

  const [openMultiImage, setOpenMultiImage] = useState(false);

  const [type, setType] = useState(RectangleSelector);
  const [annotations, setAnnotations] = useState<any>({
    image_0: [],
    image_1: [],
    image_2: [],
    image_3: [],
    image_4: [
      {
        geometry: {
          type: "RECTANGLE",
          x: 27.806640625,
          y: 36.86950404502286,
          width: 21,
          height: 25.87980875705111,
        },
        data: {
          text: "vehicle",
          id: 0.8510663203818911,
        },
      },
      {
        geometry: {
          type: "RECTANGLE",
          x: 76.106640625,
          y: 41.271739555242895,
          width: 15.300000000000011,
          height: 12.006096846054632,
        },
        data: {
          text: "car",
          id: 0.9939864680312052,
        },
      },
      {
        geometry: {
          type: "RECTANGLE",
          x: 82.806640625,
          y: 3.0523312619689684,
          width: 5.900000000000006,
          height: 39.08651528771121,
        },
        data: {
          text: "light",
          id: 0.21840561193655428,
        },
      },
      {
        geometry: {
          type: "RECTANGLE",
          x: 54.74414062500001,
          y: 41.07163794114199,
          width: 3.099999999999987,
          height: 9.738278552910977,
        },
        data: {
          text: "traffic sign",
          id: 0.34236271596815326,
        },
      },
      {
        geometry: {
          type: "RECTANGLE",
          x: 21.844140625,
          y: 40.404632560805624,
          width: 3.599999999999998,
          height: 3.0682247495472907,
        },
        data: {
          text: "car",
          id: 0.9686886778648613,
        },
      },
      {
        geometry: {
          type: "RECTANGLE",
          x: 31.344140625,
          y: 6.987663005953544,
          width: 10.199999999999996,
          height: 30.682247495472964,
        },
        data: {
          text: "building",
          id: 0.10990211203936062,
        },
      },
    ],
  });
  const [annotation, setAnnotation] = useState<any>("");
  const [activeImage, setActiveImage] = useState("image_0");

  const [imageSizes, setImageSizes] = useState({});

  const onSubmit = (e: any) => {
    const { geometry, data }: any = annotation[`${activeImage}`];

    setAnnotation({ ...annotation, [`${activeImage}`]: {} });
    setAnnotations({
      ...annotations,
      [`${activeImage}`]: [
        ...annotations[`${activeImage}`],
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

  const [allImages, setAllImages] = useState<any>("");

  const arr: any = Object.entries(annotations).map((annotate: any) => {
    return {
      image_url: allImages[`${annotate[0]}`],
      data:
        (annotate?.[1]?.length &&
          annotate?.[1]?.map((ann: any) => {
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
    };
  });

  const annotatedImages = arr.filter((item: any) => item.data.length);

  const images = localStorage.getItem("images")?.split(",");

  useEffect(() => {
    let obj = {};
    let objImg = {};
    let objAnnotations = {};
    images?.map((image: any, index: any) => {
      obj = { ...obj, [`image_${index}`]: {} };
      objImg = { ...objImg, [`image_${index}`]: image };
      objAnnotations = { ...objAnnotations, [`image_${index}`]: [] };
    });
    setAllImages(objImg);
    setAnnotation(obj);
    // setAnnotations(objAnnotations);
  }, []);

  console.log({});
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
                console.log("img error");
                console.error(err);
                reject(err);
              };
            });
          }),
        );
      }

      setImageSizes(imageIndividualSizes);
    };

    loadImages();
  }, []);

  const activeAnnotationComparator = (a: any, b: any) => {
    console.log(a, "");
    return a.data.id === b;
  };

  const deleteObject = (imageKey: any, id: number) => {
    setAnnotations((prevState: any) => {
      const updatedImages = { ...prevState };
      updatedImages[imageKey] = updatedImages[imageKey].filter((obj: any) => obj.data.id !== id);
      return updatedImages;
    });
  };

  console.log({ allImages, imageSizes, annotatedImages, annotations, annotation });

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
          onAdd={async (values: any) => {
            const trainRatio = 100 / values.train;
            const trainNumber = annotatedImages.length / trainRatio;
            console.log(trainNumber, "r");
            console.log(annotatedImages, "array");

            console.log(
              annotatedImages.slice(0, Math.trunc(trainNumber)),
              "goes to train model=====",
            );

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
                  // setImg(`${image}`);
                  setActiveImage(`image_${index}`);
                }}
              >
                <img src={`${process.env.APP_HOST}/${image}`} width="80" />
                {/* <img src={`${image}`} width="80" /> */}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "3", background: "#555" }}>
          <div style={{ background: "black", color: "white" }}>Toolbar</div>
          <div style={{ width: "800px", margin: "0 auto", display: "grid" }}>
            {
              <Annotation
                activeAnnotationComparator={activeAnnotationComparator}
                src={`${process.env.APP_HOST}/${allImages[`${activeImage}`]}`}
                // src={`${allImages[`${activeImage}`]}`}
                alt="Image"
                annotations={annotations[`${activeImage}`] || []}
                type={type?.type}
                value={annotation?.[`${activeImage}`]}
                onChange={(value: any) => {
                  setAnnotation({ ...annotation, [`${activeImage}`]: value });
                }}
                onSubmit={(e: any) => onSubmit(e)}
                allowTouch
              />
            }
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
        onClick={
          () => handleModalShow("publish")
          // createAnnotationData({ values: { annotate: arr } })
        }
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
  // createAnnotationData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnnotationImage);
