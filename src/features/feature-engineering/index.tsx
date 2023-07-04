import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";

import iconFeature from "src/assets/icons/icon-feature.svg";
import DataLoader from "src/components/DataLoader";
import {
  createFeature,
  deleteFeature,
  fetchFeatures,
  updateFeature,
} from "src/store/feature/actions";
import { AppState } from "src/store/reducer";
import FeatureForm from "./Form";

const pagename = "Feature";

function Libraries({
  fetchFeatures,
  createFeature,
  deleteFeature,
  updateFeature,
  features,
  isLoading,
  isSubmitting,
  metadata,
}: PropsFromRedux) {
  useEffect(() => {
    fetchFeatures({});
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
        confirmationHeading={pagename}
      >
        <FeatureForm
          onClose={() => handleModalClose()}
          isSubmitting={isSubmitting}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createFeature({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updateFeature({
                featureId: selected?.id,
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
              await deleteFeature({
                featureId: [selected?.id],
              })
            ) {
              handleModalClose();
            }
          }}
          loader={isSubmitting}
          confirmationHeading={`Do you want to delete`}
          status="warning"
          confirmationIcon={iconFeature}
        />
      )}

      <DataContainer
        expandableRow
        name={pagename}
        data={features}
        metadata={metadata}
        fetchData={fetchFeatures}
        defaultDisable={["deleted", "notes"]}
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
          const newRow = { ...row };
          delete newRow.id;

          const request = {
            featureId: row?.id,
            values: {
              ...newRow,
              status: !newRow?.status,
            },
          };

          await updateFeature(request);
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  featureState: { isSubmitting, isLoading, features, metadata },
}: AppState) => ({
  isLoading,
  features,
  isSubmitting,
  metadata,
});

const mapDispatchToProps = {
  fetchFeatures,
  createFeature,
  deleteFeature,
  updateFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Libraries);
