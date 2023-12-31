import { Col, Flexbox, Row } from "src/containers/Grid/Grid";

import { Form } from "formik";
import FormikBase from "src/containers/FormikBase/FormikBase";
import * as Yup from "yup";

import Button from "src/components/Button/Button";
import Input from "src/components/Input_old/Input";
import FormGroup from "src/containers/FormGroup/FormGroup";

import { useNavigate } from "react-router-dom";
import { Buffering } from "src/components/Spinner/Spinner";

// import FileContainer from "src/components/File/FileContainer";

import { Multiselect } from "src/components/Multselect_old/Multiselect";
import { Label } from "src/components/Text/Text";
import { defaultRoles } from "src/features/Role/Index";
import styled from "src/theme_old/styled";

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

function UserForm({
  onCreate,
  onEdit,
  formData,
  isSubmitting,
  isLoading,
  checklists,
  accountTypes = [],
}) {
  const navigate = useNavigate();

  const initialValues = formData
    ? {
        profilePic: formData ? [formData?.profilePic] : [],
        fullName: formData?.fullName,
        email: formData?.email,
        branchName: formData?.branchName,
        branchCode: formData?.branchCode,
        department: formData?.department,
        functionalTitle: formData?.functionalTitle,
        password: formData?.password,
        rePassword: formData?.rePassword,
        roles: formData?.roles,
      }
    : {
        profilePic: [],
        fullName: "",
        email: "",
        branchName: "",
        branchCode: "",
        department: "",
        functionalTitle: "",
        password: "",
        rePassword: "",
        roles: [],
      };

  const validationSchema = Yup.object().shape({
    profilePic: Yup.array()
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

    fullName: Yup.string().required().label("Name"),
    email: Yup.string().email().required().label("Email"),
    branchName: Yup.string().required().label("Branch Name"),
    branchCode: Yup.string().required().label("Branch Code"),
    department: Yup.string().required().label("Department"),
    functionalTitle: Yup.string().required().label("Functional Title"),
    password: formData
      ? Yup.string().optional().label("Password")
      : Yup.string().required().label("Password"),
    rePassword: formData
      ? Yup.string().optional().label("Confirm Password")
      : Yup.string().required().label("Confirm Password"),
    // roles: Yup.array().min(1).required().label("Role"),
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
      onSubmit={(values, otherProps) => {
        // const modifiedValues = getModifiedValues(values, initialValues);

        const {
          profilePic,
          fullName,
          email,
          branchName,
          branchCode,
          department,
          functionalTitle,
          password,
          rePassword,
        } = values;

        const formdata = new FormData();
        if (profilePic && profilePic?.length) {
          formdata.append("profilePic", profilePic[0]);
        }

        formdata.append("fullName", fullName);
        formdata.append("email", email);
        formdata.append("branchName", branchName);
        formdata.append("branchCode", branchCode);
        formdata.append("department", department);
        formdata.append("functionalTitle", functionalTitle);

        if (!formData) formdata.append("password", password);
        if (!formData) formdata.append("rePassword", rePassword);

        formData ? onEdit(formdata, otherProps) : onCreate(formdata, otherProps);
      }}
      validationSchema={validationSchema}
      renderForm={({ values, errors, handleChange, setFieldValue }) => {
        return (
          <Form style={{ boxSizing: "border-box" }}>
            <FormGroup title="Checkist Information">
              <Row gap="10px" style={{ marginBottom: 18 }}>
                <Col>
                  <imgInput
                    label="Profile Picture"
                    name="profilePic"
                    accept="image/*"
                    errors={errors}
                    errorStyle={{ marginTop: 0 }}
                    value={typeof values.profilePic[0] === "string" ? values.profilePic : []}
                    onChange={(filelist) => setFieldValue("profilePic", filelist)}
                    onRemove={() => {
                      setFieldValue("profilePic", []);
                    }}
                  />
                </Col>
                <Col>
                  <Input
                    name="fullName"
                    label="Name"
                    placeholder="Enter Name"
                    value={values.fullName}
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
                    name="branchName"
                    label="Branch Name"
                    placeholder="Enter Branch"
                    value={values.branchName}
                    onChange={handleChange}
                    errors={errors}
                  />
                </Col>
                <Col>
                  <Input
                    name="branchCode"
                    label="Branch Code"
                    placeholder="Enter Branch Code"
                    value={values.branchCode}
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
                    name="functionalTitle"
                    label="Functional Title"
                    placeholder="Enter Functional Title"
                    value={values.functionalTitle}
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
                        name="rePassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={values.rePassword}
                        onChange={handleChange}
                        errors={errors}
                      />
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col>
                  <Flexbox column>
                    <Label style={{ marginBottom: 5 }}>Role</Label>
                    <Multiselect
                      avoidHighlightFirstOption
                      options={defaultRoles}
                      displayValue="role"
                      placeholder="Select Role"
                      selectedValues={values.roles}
                      onSelect={(selectedList) => setFieldValue("roles", selectedList)}
                      onRemove={(selectedList) => setFieldValue("roles", selectedList)}
                    />
                  </Flexbox>
                </Col>
              </Row>
            </FormGroup>
            <Row>
              <Col lg={12} justifyContent="space-between">
                <Button type="button" size="sm" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : formData ? "Update" : "Submit"}
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    />
  );
}

export default UserForm;
