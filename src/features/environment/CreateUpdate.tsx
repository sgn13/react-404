import React, { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "src/store/reducer";
import {
  createEnvironment,
  fetchEnvironment,
  fetchEnvironments,
  updateEnvironment,
} from "src/store/environment/actions";
import EnvironmentForm from "./Form";

import { fetchModels } from "src/store/model/actions";
import { fetchTemplates } from "src/store/template/actions";

const dummyPagedata = {
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
};

const CreateUpdateEnvironment: React.FC<PropsFromRedux> = ({
  fetchEnvironments,
  isSubmitting,
  isLoading,
  environments,
  environment,
  fetchEnvironment,
  createEnvironment,
  updateEnvironment,
  setActive,
  models,
  templates,
  fetchTemplates,
  fetchModels,
}) => {
  const { id } = useParams();
  const pageId = id;
  const navigate = useNavigate();

  const [pageData, setPageData] = useState(dummyPagedata);

  //   useEffect(() => {
  //     setActive("Environment Management");
  //   }, []);

  // reset environment when component unmounts

  useEffect(() => {
    if (pageId) {
      fetchEnvironment({ environmentId: pageId });
    }
    fetchModels({});
    fetchEnvironments({});
  }, [pageId]);

  useEffect(() => {
    setPageData(environment);
  }, [environment, pageId]);

  console.log("pagedata", pageData);

  return (
    <EnvironmentForm
      pageName="Environment"
      formData={pageData}
      models={models?.items}
      templates={environments?.items}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      onAdd={async (values, { resetForm }) => {
        if (await createEnvironment({ values })) {
          resetForm();
          navigate(-1);
          // window.location.href = app.desk.environment.root(); // this will disturb notification system due to whole app reload
        }
      }}
      onEdit={async (values, { resetForm }) => {
        if (
          await updateEnvironment({
            environmentId: pageData.id,
            values,
          })
        ) {
          resetForm();
          navigate(-1);
        }
      }}
    />
  );
};

const mapStateToProps = ({
  environmentState: { environments, environment, isLoading, isSubmitting },
  modelState: { models },
  templateState: { templates },
}: AppState) => ({
  environments,
  environment,
  isSubmitting,
  isLoading,
  models,
  templates,
});

const mapDispatchToProps = {
  createEnvironment,
  updateEnvironment,
  fetchEnvironment,
  fetchEnvironments,
  fetchTemplates,
  fetchModels,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateUpdateEnvironment);
