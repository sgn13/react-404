import React, { useState } from "react";

import { Row, Col } from "containers/Grid/Grid";

import * as Yup from "yup";
import FormikBase from "containers/FormikBase/FormikBase";
import { Form } from "formik";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import FormGroup from "containers/FormGroup/FormGroup";

import { useNavigate } from "react-router-dom";
import { Buffering } from "components/Spinner/Spinner";
import ImageInput from "components/ImageInput/ImageInput";

// import FileContainer from "components/File/FileContainer";

import styled from "theme/styled";

const InputWrapper = styled.div`
  position: relative;
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid gray;
  border-radius: 4px;
  width: fit-content;
  overflow: hidden;

  ::after {
    content: "Upload File";
    position: absolute;
    right: 0;
    width: 7rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(72, 80, 86);
    background-color: rgb(233, 236, 239);
  }
`;

const StyledInput = styled.input`
  border: 0;
  height: inherit;
  padding: 0.7em;
  padding-right: 8rem;
  text-overflow: ellipsis;

  ::placeholder {
  }

  :focus {
    border: 0; // it is must to remove default border style on focus
  }
`;

const UserForm = ({
  onCreate,
  onEdit,
  formData,
  isSubmitting,
  isLoading,
  checklists,
  accountTypes = [],
}) => {
  const navigate = useNavigate();

  const initialValues = formData
    ? {
        profile_pic: formData ? [formData?.profilePic] : [],
        full_name: formData?.fullName,
        email: formData?.email,
        branch_name: formData?.branchName,
        branch_code: formData?.branchCode,
        department: formData?.department,
        functional_title: formData?.functionalTitle,
        password: formData?.password,
        re_password: formData?.rePassword,
      }
    : {
        profile_pic: [],
        full_name: "",
        email: "",
        branch_name: "",
        branch_code: "",
        department: "",
        functional_title: "",
        password: "",
        re_password: "",
      };

  const validationSchema = Yup.object().shape({
    profile_pic: Yup.array()
      .label("Profile_Picture")
      .test("no-empty", "You must add an image.", async function validate(item: any) {
        if (formData && typeof item[0] === "string") return true; // image during update is optional

        if (item.length === 0) return false; // return true if you want to the field optional

        const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];

        if (!supportedFormats.includes(item[0].type))
          return this.createError({ message: "Wrong image format. Upload jpeg/jgp/png" });

        if (Number(item[0].size) > 512 * 1024)
          return this.createError({
            message: "Wrong file size. Expecting maximum file size of 512 KB.",
          });

        // turning of image dimension validation
        return true;

        // const getImageWidthAndHeight = async (provideFile) => {
        //   const imgDimensions = { width: null, height: null };
        //   return new Promise((resolve) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(provideFile);
        //     reader.onload = function () {
        //       const img = new Image();
        //       if (typeof reader.result === 'string') img.src = reader.result;
        //       img.onload = function (event) {
        //         imgDimensions.width = img.width;
        //         imgDimensions.height = img.height;

        //         resolve(imgDimensions);
        //       };
        //     };
        //   });
        // };
        // const { width, height } = await getImageWidthAndHeight(item[0]);

        // if (width === 200 && height === 200) return true;
        // return this.createError({
        //   message: 'Wrong file width and height. Expecting 200 * 200 KB',
        // });
      }),

    full_name: Yup.string().required().label("Name"),
    email: Yup.string().email().required().label("Email"),
    branch_name: Yup.string().required().label("Branch Name"),
    branch_code: Yup.string().required().label("Branch Code"),
    department: Yup.string().required().label("Department"),
    functional_title: Yup.string().required().label("Functional Title"),
    password: formData
      ? Yup.string().optional().label("Password")
      : Yup.string().required().label("Password"),
    re_password: formData
      ? Yup.string().optional().label("Confirm Password")
      : Yup.string().required().label("Confirm Password"),
  });

  if (isLoading)
    return (
      <Buffering color="red">
        {new Array(12).fill(0).map((item) => (
          <div />
        ))}
      </Buffering>
    );

  return (
    <FormikBase
      initialValues={initialValues}
      onSubmit={(props, otherProps) => {
        const {
          profile_pic,
          full_name,
          email,
          branch_name,
          branch_code,
          department,
          functional_title,
          password,
          re_password,
        } = props;
        const values = new FormData();
        if (profile_pic && profile_pic?.length) {
          values.append("profile_pic", profile_pic[0]);
        }

        values.append("full_name", full_name);
        values.append("email", email);
        values.append("branch_name", branch_name);
        values.append("branch_code", branch_code);
        values.append("department", department);
        values.append("functional_title", functional_title);
        if (!formData) values.append("password", password);
        if (!formData) values.append("re_password", re_password);

        formData ? onEdit(values, otherProps) : onCreate(values, otherProps);
      }}
      validationSchema={validationSchema}
      renderForm={({ values, errors, handleChange, setFieldValue }) => {
        console.log("values", values);
        return (
          <Form style={{ boxSizing: "border-box" }}>
            <FormGroup title="Checkist Information">
              <Row style={{ marginBottom: 18, gap: 10 }}>
                <Col>
                  <ImageInput
                    label="Profile Picture"
                    name="profile_pic"
                    accept="image/*"
                    errors={errors}
                    errorStyle={{ marginTop: 0 }}
                    value={typeof values.profile_pic[0] === "string" ? values.profile_pic : []}
                    onChange={(filelist) => setFieldValue("profile_pic", filelist)}
                    onRemove={() => {
                      setFieldValue("profile_pic", []);
                    }}
                  />
                </Col>
                <Col>
                  <Input
                    name="full_name"
                    label="Name"
                    placeholder="Enter Name"
                    value={values.full_name}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <Input
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 18, gap: 10 }}>
                <Col>
                  <Input
                    name="branch_name"
                    label="Branch Name"
                    placeholder="Enter Branch"
                    value={values.branch_name}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <Input
                    name="branch_code"
                    label="Branch Code"
                    placeholder="Enter Branch Code"
                    value={values.branch_code}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <Input
                    name="department"
                    label="Department"
                    placeholder="Enter Department"
                    value={values.department}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 10, gap: 10 }}>
                <Col>
                  <Input
                    name="functional_title"
                    label="Functional Title"
                    placeholder="Enter Functional Title"
                    value={values.functional_title}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
                {!formData && (
                  <>
                    <Col>
                      <Input
                        name="password"
                        label="Password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        errors={errors}
                      />
                    </Col>
                    <Col>
                      <Input
                        name="re_password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={values.re_password}
                        onChange={handleChange}
                        errors={errors}
                      />
                    </Col>
                  </>
                )}
              </Row>
            </FormGroup>
            <Row>
              <Col lg={12}>
                <div
                  className="clear mt-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="button"
                    size="sm"
                    className="btn btn-primary float-right ml-2"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="btn btn-primary float-right"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : formData ? "Update" : "Submit"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        );
      }}
    />
  );
};

export default UserForm;
