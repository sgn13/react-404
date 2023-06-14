import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";

import DataLoader from "src/components/DataLoader";
import {
  createPlacement,
  deletePlacement,
  fetchPlacements,
  updatePlacement,
} from "src/store/configuration/placement/actions";
import { AppState } from "src/store/reducer";
import PlacementForm from "./Form";

function Placement({
  fetchPlacements,
  placements,
  deletePlacement,
  createPlacement,
  updatePlacement,
  isLoading,
  metadata,
  isSubmitting,
}: PropsFromRedux) {
  useEffect(() => {
    fetchPlacements({});
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
        confirmationHeading={`Placement`}
      >
        <PlacementForm
          onClose={handleModalClose}
          isSubmitting={isSubmitting}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createPlacement({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updatePlacement({
                placementId: selected?.id,
                values,
              })
            ) {
              resetForm();
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
              await deletePlacement({
                placementId: [selected?.id],
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
        name="Placement"
        data={placements}
        metadata={metadata}
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
        onStatusToggle={(row) => {
          console.log(row);
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  placementState: { metadata, isLoading, isSubmitting, placements },
}: AppState) => ({
  isLoading,
  placements,
  metadata,
  isSubmitting,
});

const mapDispatchToProps = {
  fetchPlacements,
  deletePlacement,
  createPlacement,
  updatePlacement,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Placement);
