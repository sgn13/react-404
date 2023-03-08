import _ from "lodash";

import { Form } from "formik";
import * as Yup from "yup";

import Button from "components/Button/Button";

import FormikBase from "containers/FormikBase/FormikBase";
import styled from "theme/styled";
import { Col, Row } from "containers/Grid/Grid";

const roleName = "Role";

const Roles = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`;

const Permissions = styled.div`
  display: flex;
  gap: 1.1em;
  flex-wrap: wrap;
`;

const StyledTitle = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const StyledSubTitle = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const StyledItem = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const StyledHR = styled.hr`
  margin: 1rem auto;
`;

const StyledCheckbox = styled.input`
  margin-right: 0.6rem;
  accent-color: #cd171f;
  width: 1.3em;
  height: 1.3em;
`;

const RoleForm = ({ isSubmitting, onEdit, onBack, formData = {} }) => {
  let initialValues = {};

  const validationSchema = Yup.object().shape({});

  if (formData && Object.entries(formData).length) {
    if (formData.roles) {
      let roles = {};
      roles = {
        // isAdmin: true,
      };

      Object.values(formData.roles).map((entry) => {
        roles[`${entry.name}`] = entry.status;
      });

      initialValues = { ...initialValues, roles };
    }

    if (formData.permissions) {
      let permissions = {
        // title1: {
        //   1: true,
        //   2: false,
        // },
        // title2: {
        //   33: false,
        //   24: true,
        // },
      };
      Object.entries(formData.permissions).map((entry) => {
        const title = entry[0];

        let perms = {
          // id: has_permission,
          // 1: true,
          // 2: false,
        };

        entry[1].map((permission) => {
          perms = { ...perms, [`${permission.id}`]: permission.has_permission };
        });

        permissions = { ...permissions, [`${title}`]: perms };
      });

      initialValues = { ...initialValues, permissions };
    }
  }

  // const initialValuesMock = {
  //   roles: {
  //     "kyc.admin": true,
  //     "kyc.supervisor": false,
  //   },
  //   permissions: {
  //     title1: {
  //       1: true,
  //       2: false,
  //     },
  //     title2: {
  //       33: false,
  //       24: true,
  //     },
  //   },
  // };

  return (
    <FormikBase
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(props, otherProps) => {
        let values = {};
        let user_permissions = [];

        if (props.roles) {
          values = { ...values, ...props.roles };
        }

        if (props.permissions) {
          Object.values(props.permissions).map((pos) => {
            Object.entries(pos).map((entry) => {
              if (entry[1]) {
                user_permissions = [...user_permissions, Number(entry[0])];
              }
            });
          });

          values = { ...values, user_permissions };
        }

        onEdit(values, otherProps);
      }}
      renderForm={({ values, errors, handleChange, resetForm, setFieldValue }) => {
        return (
          <Form>
            <Row style={{ width: "inherit" }}>
              <Col lg={12} column>
                <StyledTitle style={{ textAlign: "left" }}>Role</StyledTitle>
                <Roles>
                  {formData.roles &&
                    Object.entries(formData.roles).map((entry, i) => {
                      const isChecked = values.roles[entry[1].name];

                      return (
                        <div key={i}>
                          <StyledItem
                            onClick={() => {
                              setFieldValue("roles", {
                                ...values.roles,
                                [`${[entry[1].name]}`]: !isChecked,
                              });
                            }}
                          >
                            <StyledCheckbox readOnly type="checkbox" checked={isChecked} />
                            {entry[1].display_name}
                          </StyledItem>
                        </div>
                      );
                    })}
                </Roles>
                <StyledHR />

                <StyledTitle style={{ textAlign: "left" }}>Permissions</StyledTitle>

                {formData.permissions &&
                  Object.entries(formData.permissions).map((permissionGroup, i) => {
                    return (
                      <div key={i}>
                        <StyledSubTitle style={{ display: "block", textAlign: "left" }}>
                          {permissionGroup[0]}
                        </StyledSubTitle>
                        <Permissions>
                          {permissionGroup[1].map((entry, i) => {
                            const isChecked = values.permissions[permissionGroup[0]][entry["id"]];
                            return (
                              <StyledItem
                                key={i}
                                onClick={() => {
                                  setFieldValue("permissions", {
                                    ...values.permissions,
                                    [`${permissionGroup[0]}`]: {
                                      ...values.permissions[permissionGroup[0]],
                                      [`${entry["id"]}`]: !isChecked,
                                    },
                                  });
                                }}
                              >
                                <StyledCheckbox readOnly type="checkbox" checked={isChecked} />
                                {entry.display_name}
                              </StyledItem>
                            );
                          })}
                        </Permissions>
                      </div>
                    );
                  })}
              </Col>

              <Col lg={1}>
                <div className="clear mt-3 " style={{ display: "flex", gap: 10 }}>
                  {!isSubmitting && (
                    <Button
                      type="button"
                      className="btn btn-primary float-right ml-2 "
                      size="sm"
                      onClick={() => {
                        onBack();
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    className="btn btn-primary float-right"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting"
                    ) : (
                      <>
                        {formData ? "Save" : "Add"} {roleName}
                      </>
                    )}
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

export default RoleForm;
