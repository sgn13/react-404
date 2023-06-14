import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LogoIcon from "src/assets/logo.png";
import Button from "src/components/Button/Button";
import Input from "src/components/Input_old/Input";
import { Buffering, ProgressLoader } from "src/components/Spinner/Spinner";
import shadows from "src/constants/css/shadows";
import { Col, Flexbox, Row } from "src/containers/Grid/Grid";
import { Page } from "src/containers/Layout_old";
import { downloadFile, resetUploadState, uploadFile } from "src/store/app/actions";
import { AppState } from "src/store/reducer";
import { fetchUser, setUser, updateUser } from "src/store/user/actions";
import styled from "src/theme_old/styled";

const BrandLogo = styled.figure<{ width?: string }>`
  max-width: ${({ width }) => width ?? "12rem"};
  width: 100%;
`;

const VideoPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VideoContainerWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1080px;
  padding: 16px;
  border-radius: 4px;

  @media screen and (max-width: 480px) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  border: 3px solid;
  border-bottom: 30px solid;
  border-top: 20px solid;
  border-radius: 30px;
  border-color: #0f0000;
  width: 100%;

  box-sizing: border-box;
  box-shadow: ${shadows[5]};
`;

const Video = styled.video<{ isRemoteStream }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${({ isRemoteStream = false }) =>
    isRemoteStream
      ? null
      : `transform: rotateY(180deg);`}// not mirroring because we need to capture text documents
  /* transform: rotateY(180deg); */
  /* transform: rotateX(180deg); */
  /* transform: scaleX(-1); */
  /* transform: scaleY(-1); */
  /* filter: FlipH; */
`;

const Player = styled(Video)``;

function ViewInPage({
  fetchUser,
  setUser,
  user,
  isLoading,
  isSubmitting,
  upload,
  download,
  uploadFile,
  downloadFile,
  resetUploadState,
}: PropsFromRedux) {
  const { id } = useParams();
  const [filelist, setFilelist] = useState([]);

  const navigate = useNavigate();

  const handleVideoUpload = async (video: File) => {
    if (!video || !id) return;
    const formData = new FormData();
    formData.append("profileVideo", video);
    await uploadFile({ id, formData });
  };

  const handleFileChoosen = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesUploaded = [...e.target.files];
      if (filesUploaded.length) {
        setFilelist(filesUploaded);
      }
    }
  };

  //   useEffect(() => {
  //     setActive("User Management");
  //   }, []);

  useEffect(() => {
    fetchUser({ userId: id });
  }, [id]);

  // reset user when component unmounts
  useEffect(() => {
    return () => {
      setUser(null);
      resetUploadState();
    };
  }, []);

  if (isLoading)
    return (
      <Buffering color="red">
        {new Array(12).fill(0).map((item, index) => (
          <div key={index} />
        ))}
      </Buffering>
    );

  return (
    <Page>
      <Row>
        <Col>
          <Flexbox column>
            {user?.profilePic ? (
              <img width={200} height={200} src={user?.profilePic} alt="Profile Picture" />
            ) : null}
            {user?.profileVideo ? (
              <VideoPage style={{ width: "50vw" }}>
                <VideoContainerWrapper>
                  <VideoContainer>
                    {/* in order to play in safari browser, the video server must support range request */}
                    <Player controls playsInline isRemoteStream preload="auto" width="100%">
                      <source src={`${user?.profileVideo}#t=0.1`} type="video/webm" />
                      <source src={`${user?.profileVideo}#t=0.1`} type="video/mp4" />
                      <source src={`${user?.profileVideo}#t=0.1`} type="video/mkv" />
                    </Player>

                    <figure
                      style={{
                        zIndex: 100,
                        position: "absolute",
                        top: 10,
                        left: 10,
                      }}
                    >
                      <BrandLogo>
                        <img src={LogoIcon} alt="Logo" width={"100%"} />
                      </BrandLogo>
                    </figure>
                  </VideoContainer>
                </VideoContainerWrapper>
              </VideoPage>
            ) : (
              <Flexbox
                center
                style={{
                  textAlign: "center",
                  flex: 1,
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <h1>Upload Profile Video</h1>

                {upload?.progress > 0 ? (
                  <>
                    <ProgressLoader progress={upload?.progress || 0} />
                    {!isSubmitting && upload.progress === 100 && (
                      <div style={{ color: "green" }}>Video Saved Successfully</div>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                      type="file"
                      accept="video/*"
                      style={{ height: "auto" }}
                      onChange={handleFileChoosen}
                    />
                    <Button
                      onClick={() => handleVideoUpload(filelist[0])}
                      style={{ width: "fit-content" }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Upload Video
                    </Button>
                  </>
                )}
              </Flexbox>
            )}
            {download.progress > 0 ? <ProgressLoader progress={download?.progress || 0} /> : null}
            {download?.remainingTime === undefined ? null : (
              <div>{download.remainingTime.toFixed(0)} sec</div>
            )}

            {!isSubmitting && download.progress === 100 && (
              <div style={{ color: "green" }}>Video Downloaded Successfully</div>
            )}
            {user?.profileVideo && download.progress > 0 ? null : (
              <Button
                onClick={() => downloadFile(user?.profileVideo)}
                style={{ width: "fit-content" }}
                type="submit"
                disabled={isSubmitting}
              >
                Download Video
              </Button>
            )}
          </Flexbox>
        </Col>
      </Row>
      <Row>
        <Col>
          <Flexbox column rowGap="10px">
            <div>Name: {user?.fullName}</div>
            <div>Designation: {user?.functionalTitle}</div>
            <div>Email: {user?.email}</div>
            <div>Branch: {user?.BranchName}</div>
            <div>Branch Name: {user?.BranchCode}</div>
            <div>Department: {user?.department}</div>
            <div>SuperUser: {user?.isSuperuser ? "Yes" : "No"}</div>
            <div>Admin: {user?.isAdmin ? "Yes" : "No"}</div>
          </Flexbox>
        </Col>
      </Row>
    </Page>
  );
}

const mapStateToProps = ({
  userState: { users, user, isLoading, isSubmitting },
  appState: { upload, download },
}: AppState) => ({
  users,
  user,
  isSubmitting,
  isLoading,
  upload,
  download,
});

const mapDispatchToProps = {
  updateUser,
  fetchUser,
  setUser,
  uploadFile,
  downloadFile,
  resetUploadState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ViewInPage);
