import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";
import {
  createExclusion,
  deleteExclusion,
  fetchExclusions,
  updateExclusion,
} from "src/store/configuration/exclusion/actions";

import DataLoader from "src/components/DataLoader";
import { AppState } from "src/store/reducer";
import ExclusionForm from "./Form";

function Exclusions({
  fetchExclusions,
  exclusions,
  deleteExclusion,
  createExclusion,
  updateExclusion,
  isLoading,
  metadata,
}: PropsFromRedux) {
  useEffect(() => {
    fetchExclusions({});
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
        confirmationHeading={`Exclusion`}
      >
        <ExclusionForm
          onClose={() => handleModalClose()}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any) => {
            if (await createExclusion({ values })) {
              handleModalClose();
            }
          }}
          onEdit={async (values: any) => {
            if (
              await updateExclusion({
                exclusionId: selected?.id,
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
              await deleteExclusion({
                exclusionId: [selected?.id],
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
        name="Exclusion"
        data={exclusions}
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
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  exclusionState: { isLoading, exclusions, metadata },
}: AppState) => ({
  isLoading,
  exclusions,
  metadata,
});

const mapDispatchToProps = {
  fetchExclusions,
  deleteExclusion,
  createExclusion,
  updateExclusion,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Exclusions);
