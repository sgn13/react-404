import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import DataContainer from "src/components/DataContainerBeta";
import DataLoader from "src/components/DataLoader";
import { fetchPlacements } from "src/store/configuration/placement/actions";
import {
  createEnvironment,
  deleteEnvironment,
  fetchEnvironments,
  updateEnvironment,
} from "src/store/environment/actions";
import { AppState } from "src/store/reducer";

import { useNavigate } from "react-router-dom";
import app from "src/constants/app";

const res = {
  items: [
    {
      id: 1,
      name_or_tag: "string",
      base_template: null,
      organization: null,
      model: null,
      requirements: null,
      status: true,
      deleted: false,
      debug: false,
      override: false,
    },
    {
      id: 2,
      name_or_tag: "Hello world",
      base_template: null,
      organization: null,
      model: null,
      requirements: null,
      status: true,
      deleted: false,
      debug: false,
      override: false,
    },
    {
      id: 3,
      name_or_tag: "Hello world",
      base_template: null,
      organization: null,
      model: null,
      requirements: null,
      status: true,
      deleted: false,
      debug: false,
      override: false,
    },
  ],
  total: 3,
  page: 1,
  size: 50,
  pages: 1,
  headers: {
    name_or_tag: "Venv Name or Tag",
    base_template: "Base Template",
    model: "Model",
    organization: "Organization",
    status: "Status",
    deleted: "Deleted",
  },
  info: {},
};

function Environment({
  fetchEnvironments,
  fileuploads,
  deleteEnvironment,
  createEnvironment,
  updateEnvironment,
  isLoading,
  isSubmitting,
  environments = { items: [], headers: {} },
}: PropsFromRedux) {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("environmet effect");
    fetchEnvironments({});
  }, []);

  const [showModal, setShowModal] = useState(undefined);

  const [selected, setSelected] = useState<any>(undefined);

  const handleModalShow = (mode: any) => setShowModal(mode);
  const handleModalClose = () => setShowModal(undefined);

  if (isLoading) return <DataLoader />;

  return (
    <>
      {selected && (
        <ConfirmationModal
          openModal={showModal === "delete"}
          setOpenModal={() => handleModalClose()}
          handelConfirmation={async () => {
            if (
              await deleteEnvironment({
                environmentId: [selected?.id],
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
        name="Model Environments"
        data={environments}
        fetchData={fetchEnvironments}
        defaultDisable={["deleted"]}
        onDelete={({ item }: any) => {
          setSelected(item);
          handleModalShow("delete");
        }}
        onAdd={() => {
          navigate(app.environment.create);
          // handleModalShow("create");
        }}
        onUpdate={({ item }: any) => {
          navigate(app.environment.update(item.id));
        }}
        onStatusToggle={async (row) => {
          await updateEnvironment({
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
  environmentState: { environments },
}: AppState) => ({
  isLoading,
  fileuploads,
  isSubmitting,
  environments,
});

const mapDispatchToProps = {
  fetchEnvironments,
  deleteEnvironment,
  createEnvironment,
  updateEnvironment,
  fetchPlacements,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Environment);
