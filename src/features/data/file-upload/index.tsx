import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import iconFeature from "src/assets/icons/icon-feature.svg";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";
import DataLoader from "src/components/DataLoader";
import { fetchPlacements } from "src/store/configuration/placement/actions";
import { AppState } from "src/store/reducer";
import {
  createFileUpload,
  deleteFileUpload,
  fetchFileUploads,
  updateFileUpload,
} from "src/store/source/fileUpload/actions";
import FileUploadForm from "./Form";

function FileUpload({
  fetchFileUploads,
  fileuploads,
  deleteFileUpload,
  createFileUpload,
  updateFileUpload,
  isLoading,
  isSubmitting,
  fetchPlacements,
  placements,
}: PropsFromRedux) {
  useEffect(() => {
    fetchPlacements({});
    fetchFileUploads({});
  }, []);

  const [showModal, setShowModal] = useState(undefined);

  const [selected, setSelected] = useState<any>(undefined);

  const handleModalShow = (mode: any) => setShowModal(mode);
  const handleModalClose = () => setShowModal(undefined);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <AddModal
        openModal={showModal === "create" || showModal === "update"}
        setOpenModal={() => handleModalClose()}
        confirmationHeading={`FileUpload`}
      >
        <FileUploadForm
          isSubmitting={isSubmitting}
          placements={placements?.items || []}
          onClose={() => handleModalClose()}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createFileUpload({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updateFileUpload({
                fileUploadId: selected?.id,
                values,
              })
            ) {
              handleModalClose();
              resetForm();
            }
          }}
        />
      </AddModal>

      {selected && (
        <ConfirmationModal
          openModal={showModal === "delete"}
          setOpenModal={() => handleModalClose()}
          handelConfirmation={async () => {
            if (
              await deleteFileUpload({
                fileUploadId: [selected?.id],
              })
            ) {
              handleModalClose();
            }
          }}
          confirmationHeading={`Do you want to delete`}
          status="warning"
          confirmationIcon={iconFeature}
        />
      )}

      <DataContainer
        name="File Upload"
        data={fileuploads}
        fetchData={fetchFileUploads}
        defaultDisable={["deleted"]}
        onDelete={({ item }: any) => {
          setSelected(item);
          handleModalShow("delete");
        }}
        onAdd={() => handleModalShow("create")}
        onUpdate={({ item }: any) => {
          setSelected(item);
          handleModalShow("update");
        }}
        onStatusToggle={async (row) => {
          await updateFileUpload({
            fileUploadId: row?.id,
            values: { status: !row.status },
          });
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  fileUploadState: { isSubmitting, isLoading, fileuploads },
  placementState: { placements },
}: AppState) => ({
  isLoading,
  fileuploads,
  isSubmitting,
  placements,
});

const mapDispatchToProps = {
  fetchFileUploads,
  deleteFileUpload,
  createFileUpload,
  updateFileUpload,
  fetchPlacements,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FileUpload);
