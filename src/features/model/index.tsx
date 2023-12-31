import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";

import iconFeature from "src/assets/icons/icon-feature.svg";
import DataLoader from "src/components/DataLoader";
import { createModel, deleteModel, fetchModels, updateModel } from "src/store/model/actions";
import { AppState } from "src/store/reducer";
import ModelForm from "./Form";

const pagename = "AI Model";

function Libraries({
  fetchModels,
  createModel,
  deleteModel,
  updateModel,
  models,
  isLoading,
  isSubmitting,
  metadata,
}: PropsFromRedux) {
  useEffect(() => {
    fetchModels({});
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
        <ModelForm
          onClose={() => handleModalClose()}
          isSubmitting={isSubmitting}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createModel({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updateModel({
                modelId: selected?.id,
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
              await deleteModel({
                modelId: [selected?.id],
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
        data={models}
        metadata={metadata}
        fetchData={fetchModels}
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
            modelId: row?.id,
            values: {
              ...newRow,
              status: !newRow?.status,
            },
          };

          await updateModel(request);
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  modelState: { isSubmitting, isLoading, models, metadata },
}: AppState) => ({
  isLoading,
  models,
  isSubmitting,
  metadata,
});

const mapDispatchToProps = {
  fetchModels,
  createModel,
  deleteModel,
  updateModel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Libraries);
