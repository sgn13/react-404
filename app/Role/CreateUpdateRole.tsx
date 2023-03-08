import React from "react";
import CreateUpdateRole, { Values } from "components/CreateUpdateRole/CreateUpdateRole";
import data from "components/CreateUpdateRole/data";
import { FormikHelpers } from "formik";

const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
  console.log("submitting", values);
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 400);
};

function CreateUpdate() {
  return (
    <div>
      <CreateUpdateRole
        roleName=""
        data={data}
        isLoading={false}
        isSubmitting={false}
        onSubmit={handleSubmit}
        onCancel={() => console.log("cancelled")}
      />
    </div>
  );
}

export default CreateUpdate;
