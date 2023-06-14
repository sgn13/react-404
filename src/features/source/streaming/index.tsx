import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";
import DataLoader from "src/components/DataLoader";
import { AppState } from "src/store/reducer";
import {
  createStreaming,
  deleteStreaming,
  fetchStreamings,
  updateStreaming,
} from "src/store/source/streaming/actions";
import StreamingForm from "./Form";

function Streaming({
  fetchStreamings,
  streamings,
  deleteStreaming,
  createStreaming,
  updateStreaming,
  isLoading,
  isSubmitting,
}: PropsFromRedux) {
  useEffect(() => {
    fetchStreamings({});
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
        confirmationHeading={`Streaming`}
      >
        <StreamingForm
          isSubmitting={isSubmitting}
          onClose={() => handleModalClose()}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any) => {
            if (await createStreaming({ values })) {
              handleModalClose();
            }
          }}
          onEdit={async (values: any) => {
            if (
              await updateStreaming({
                streamingId: selected?.id,
                values,
              })
            ) {
              handleModalClose();
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
              await deleteStreaming({
                streamingId: [selected?.id],
              })
            ) {
              handleModalClose();
            }
          }}
          confirmationHeading={`Do you want to delete`}
          status="warning"
          confirmationIcon="/assets/icons/icon-feature.svg"
        />
      )}

      <DataContainer
        name="Streaming"
        data={streamings}
        fetchData={fetchStreamings}
        defaultDisable={["status", "deleted"]}
        onDelete={({ item }: any) => {
          setSelected(item);
          handleModalShow("delete");
        }}
        onAdd={() => handleModalShow("create")}
        onUpdate={({ item }: any) => {
          setSelected(item);
          handleModalShow("update");
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  streamingState: { isSubmitting, isLoading, streamings },
}: AppState) => ({
  isLoading,
  streamings,
  isSubmitting,
});

const mapDispatchToProps = {
  fetchStreamings,
  deleteStreaming,
  createStreaming,
  updateStreaming,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Streaming);
