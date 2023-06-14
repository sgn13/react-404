import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";
import DataLoader from "src/components/DataLoader";
import {
  createController,
  deleteController,
  fetchControllers,
  updateController,
} from "src/store/configuration/controller/actions";
import { AppState } from "src/store/reducer";
import ControllerForm from "./Form";

function Controller({
  fetchControllers,
  controllers,
  deleteController,
  createController,
  updateController,
  isLoading,
  isSubmitting,
  metadata,
}: PropsFromRedux) {
  useEffect(() => {
    fetchControllers({});
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
        confirmationHeading={`Controller`}
      >
        <ControllerForm
          isSubmitting={isSubmitting}
          onClose={() => handleModalClose()}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any) => {
            if (await createController({ values })) {
              handleModalClose();
            }
          }}
          onEdit={async (values: any) => {
            if (
              await updateController({
                controllerId: selected?.id,
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
              await deleteController({
                controllerId: [selected?.id],
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
        name="Controller"
        expandableRow={false}
        data={controllers}
        fetchData={fetchControllers}
        metadata={metadata}
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
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  controllerState: { isSubmitting, isLoading, controllers, metadata },
}: AppState) => ({
  isLoading,
  controllers,
  isSubmitting,
  metadata,
});

const mapDispatchToProps = {
  fetchControllers,
  deleteController,
  createController,
  updateController,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Controller);
