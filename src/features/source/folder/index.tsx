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
import FolderStyles from "./Folder.styled";

function Folder({ fetchFolders, folders, deleteFolder, createFolder, updateFolder }: any) {
  useEffect(() => {
    fetchFolders({ query: { url: "/" } });
  }, []);

  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  // function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image: any) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
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
      console.log(nextImage, "NEXT IMAGE");
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
      <div id="folder">
        <div className="header">
          <div className="home" onClick={() => fetchFolders({ query: { url: "/" } })}>
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
          <div className="back" onClick={() => fetchFolders({ query: { url: folders.previous } })}>
            <ArrowBackIcon /> Back{" "}
          </div>
        )}

        <div style={{ margin: "2rem 0" }}>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {folders?.directory?.map((dir: any) => (
              <Fragment key={dir?.name}>
                {dir.is_folder ? (
                  <div className="folder">
                    <div onDoubleClick={() => fetchFolders({ query: { url: dir.next } })}>
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
                          showImage(dir.url);
                        }}
                      >
                        <TextSnippetIcon style={{ fontSize: "3rem", color: "#154794" }} />
                      </div>
                    ) : (
                      <div
                        onDoubleClick={() => {
                          showImage(dir.url);
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
            <img id="lightbox-img" src={`http://${imageToShow}`} />
            <div />

            {/* <button onClick={showNext}>⭢</button> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </FolderStyles>
  );
}

const mapStateToProps = ({ appState: { isLoading }, folderState: { folders } }: any) => ({
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
