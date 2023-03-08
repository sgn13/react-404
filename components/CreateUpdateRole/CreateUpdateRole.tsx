import React, { ChangeEvent, FocusEvent, useState } from "react";
import FormikBase from "../../containers/FormikBase/FormikBase";
import { FormikHelpers, FormikProps } from "formik";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Flexbox, Row } from "../../containers/Grid/Grid";
import RoleTable from "./RoleTable";
import * as Yup from "yup";

const form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setTouched,
  isValid,
  onCancel,
  isLoading,
  isSubmitting,
}: FormikProps<Values> & {
  onCancel: Function;
  isLoading: boolean;
  isSubmitting: boolean;
}) => (
  <>
    <h2 style={{ textAlign: "center" }}>Set Role Permissions</h2>
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Role Name"
        type="text"
        name="role"
        value={values.role}
        inputSize="lg"
        onChange={handleChange}
        errors={errors}
      />
      <RoleTable
        permissionGroup={values.permissionGroup}
        onPermissionChange={(permissionGroup) => setFieldValue("permissionGroup", permissionGroup)}
      />
      <Flexbox gap="10px" justifyContent="center">
        <div>
          <Button
            type="button"
            backgroundColor="darkred"
            style={{
              margin: "10px auto",
              color: "white",
              display: "block",
            }}
            onClick={onCancel}
          >
            cancel
          </Button>
        </div>
        <div>
          <Button
            backgroundColor="black"
            type="submit"
            style={{
              margin: "10px auto",
              color: "white",
              display: "block",
            }}
          >
            Save Role
          </Button>
        </div>
      </Flexbox>
    </form>
  </>
);

const initialValues = {
  role: "",
  permissionGroup: {},
};

const validationSchema = Yup.object().shape({
  role: Yup.string().min(4).required().label("Role name"),
});

export type Values = typeof initialValues;

type PermissionItemType = {
  id: string | number;
  permission: string;
  displayName: string;
  hasPermission: boolean;
};

function CreateUpdateRole({
  data,
  isLoading,
  isSubmitting,
  onSubmit,
  onCancel,
  roleName,
}: {
  data: { [key: string]: PermissionItemType[] };
  roleName: string;
  isLoading: boolean;
  isSubmitting: boolean;
  onSubmit: Function;
  onCancel: Function;
}) {
  return (
    <FormikBase
      initialValues={
        roleName
          ? { role: roleName, permissionGroup: data }
          : { ...initialValues, permissionGroup: data }
      }
      validationSchema={validationSchema}
      onSubmit={(values: Values, props: FormikHelpers<Values>) => onSubmit(values, props)}
      validateOnBlur={true}
      renderForm={(propsFromFormik: FormikProps<any>) =>
        form({ ...propsFromFormik, isSubmitting, isLoading, onCancel })
      }
    />
  );
}

export default CreateUpdateRole;
