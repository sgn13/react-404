import React from "react";
import CreateUpdateRole, { Values } from "./CreateUpdateRole";
import { storiesOf } from "@storybook/react";
import data from "./data";
import { FormikHelpers } from "formik";

const handleSubmit = (
  values: Values,
  { setSubmitting }: FormikHelpers<Values>
) => {
  console.log("submitting", values);
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 400);
};

storiesOf("Components/CreateUpdateRole", module).add("Demo", () => (
  <CreateUpdateRole
    roleName=""
    data={data}
    isLoading={false}
    isSubmitting={false}
    onSubmit={handleSubmit}
    onCancel={() => console.log("cancelled")}
  />
));
