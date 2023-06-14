import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";

import iconFeature from "src/assets/icons/icon-feature.svg";
import DataLoader from "src/components/DataLoader";
import {
  createLibrary,
  deleteLibrary,
  fetchLibrarys,
  updateLibrary,
} from "src/store/configuration/library/actions";
import { AppState } from "src/store/reducer";
import LibraryForm from "./Form";

const pagename = "Library";

function Libraries({
  fetchLibrarys,
  createLibrary,
  deleteLibrary,
  updateLibrary,
  librarys,
  isLoading,
  isSubmitting,
  metadata,
}: PropsFromRedux) {
  useEffect(() => {
    fetchLibrarys({});
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
        <LibraryForm
          onClose={() => handleModalClose()}
          isSubmitting={isSubmitting}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createLibrary({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updateLibrary({
                libraryId: selected?.id,
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
              await deleteLibrary({
                libraryId: [selected?.id],
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
        data={librarys}
        metadata={metadata}
        fetchData={fetchLibrarys}
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
            libraryId: row?.id,
            values: {
              ...newRow,
              status: !newRow?.status,
            },
          };

          await updateLibrary(request);
        }}
      />
    </>
  );
}

const mapStateToProps = ({
  appState: { me },
  libraryState: { isSubmitting, isLoading, librarys, metadata },
}: AppState) => ({
  isLoading,
  librarys,
  isSubmitting,
  metadata,
});

const mapDispatchToProps = {
  fetchLibrarys,
  createLibrary,
  deleteLibrary,
  updateLibrary,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Libraries);
