import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createFolder,
  deleteFolder,
  fetchFolders,
  updateFolder,
} from "src/store/source/folder/actions";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AddModal from "src/components/AddModal/AddModal";
import env from "src/constants/env";
import FolderStyles from "./Folder.styled";
import Form from "./Form";

function Folder({
  fetchFolders,
  isLoading,
  folders,
  deleteFolder,
  createFolder,
  updateFolder,
}: any) {
  const [imageToShow, setImageToShow] = useState("");
  const [showModal, setShowModal] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);
  const [textToShow, setTextToShow] = useState("");

  useEffect(() => {
    fetchFolders({ query: { url: "/", perPage: 99 } });
  }, []);
  // function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image: any) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  const showText = (url: any) => {
    setShowModal("text");
    setTextToShow(url);
  };

  // hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  // show next image in lightbox
  const showNext = (e: any) => {
    e.stopPropagation();
    const currentIndex = folders?.directory.indexOf(imageToShow);
    if (currentIndex >= folders?.directory.length - 1) {
      setLightBoxDisplay(false);
    } else {
      const nextImage = folders?.directory[currentIndex + 1];
      setImageToShow(nextImage?.url);
    }
  };

  // show previous image in lightbox
  const showPrev = (e: any) => {
    e.stopPropagation();
    const currentIndex = folders?.directory.indexOf(imageToShow);
    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      const nextImage = folders?.directory[currentIndex - 1];
      setImageToShow(nextImage?.url);
    }
  };

  return (
    <FolderStyles>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div id="folder">
          <div className="header">
            <div
              className="home"
              onClick={() => fetchFolders({ query: { url: "/", perPage: 99 } })}
            >
              <HomeIcon />
            </div>
            <div className="placeholder">
              {folders?.current
                ?.split("/")
                ?.slice(1)
                ?.map((name: any) => (
                  <div
                    key={name}
                    className="placeholder_item"
                    onClick={() => {
                      fetchFolders({ query: { url: `/${name}` } });
                    }}
                  >{`> ${name}`}</div>
                ))}
            </div>
          </div>
          <br />

          {folders?.previous && (
            <div
              className="back"
              onClick={() => fetchFolders({ query: { url: folders.previous, perPage: 99 } })}
            >
              <ArrowBackIcon /> Back{" "}
            </div>
          )}

          <div style={{ margin: "2rem 0" }}>
            <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {folders?.directory?.map((dir: any) => (
                <Fragment key={dir?.name}>
                  {dir.is_folder ? (
                    <div className="folder">
                      <div
                        onDoubleClick={() =>
                          fetchFolders({ query: { url: dir.next, perPage: 99 } })
                        }
                      >
                        <FolderIcon style={{ fontSize: "3rem", color: "#154794" }} />
                      </div>
                      {dir.name}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {["jpg", "jpeg", "png"].includes(dir.name.split(".").pop()) ? (
                        <div
                          onDoubleClick={() => {
                            showImage(dir.url);
                          }}
                        >
                          <ImageIcon style={{ fontSize: "3rem", color: "#154794" }} />
                        </div>
                      ) : ["txt"].includes(dir.name.split(".").pop()) ? (
                        <div
                          onDoubleClick={() => {
                            showText(dir.url);
                          }}
                        >
                          <TextSnippetIcon style={{ fontSize: "3rem", color: "#154794" }} />
                        </div>
                      ) : (
                        <div
                          onDoubleClick={() => {
                            showText(dir.url);
                          }}
                        >
                          <TextSnippetIcon style={{ fontSize: "3rem", color: "#154794" }} />
                        </div>
                      )}

                      {dir.name}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          {lightboxDisplay ? (
            <div id="lightbox" onClick={hideLightBox}>
              {/* <button onClick={showPrev}>⭠</button> */}
              <div />
              <img id="lightbox-img" src={`${env.api.host}${imageToShow}`} />
              <div />
              {/* <button onClick={showNext}>⭢</button> */}
            </div>
          ) : (
            ""
          )}

          <AddModal
            openModal={showModal === "text"}
            setOpenModal={() => setShowModal("")}
            confirmationHeading={"View"}
          >
            <Form
              onClose={() => setShowModal("")}
              // isSubmitting={isSubmitting}
              // editData={showModal === "text" ? selected : null}
              // onAdd={async (values: any, { resetForm }) => {
              //   if (await createFeature({ values })) {
              //     handleModalClose();
              //     resetForm();
              //   }
              // }}
              // onEdit={async (values: any, { resetForm }) => {
              //   if (
              //     await updateFeature({
              //       featureId: selected?.id,
              //       values,
              //     })
              //   ) {
              //     handleModalClose();
              //     resetForm();
              //   }
              // }}
            />
          </AddModal>
        </div>
      )}
    </FolderStyles>
  );
}

const mapStateToProps = ({ appState: { me }, folderState: { folders, isLoading } }: any) => ({
  isLoading,
  folders,
});

const mapDispatchToProps = {
  fetchFolders,
  deleteFolder,
  createFolder,
  updateFolder,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Folder);
