import { Box, Button, FormGroup, Grid } from "@mui/material";
import { Formik, FormikProps } from "formik";

import { connect } from "react-redux";
import Input from "src/components/Input";
import Label from "src/components/Label";
import IOSSwitch from "src/components/switch";
import { deleteExclusion, fetchExclusions } from "src/store/configuration/exclusion/actions";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  ip_address: Yup.string()
    .required()
    .label("IP Address")
    .test("ip_address", "IP Address is not valid", (value) => {
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value,
      );
    }),
  effective_from: Yup.string().required().label("Effective From"),
  effective_to: Yup.string().required().label("Effective To"),
  reason: Yup.string().optional().label("Reason"),
  status: Yup.boolean().optional().label("Status"),
  deleted: Yup.boolean().optional().label("Deleted"),
});

function ExclusionForm({ onEdit, onAdd, editData, onClose }: any) {
  return (
    <Formik
      initialValues={
        editData
          ? {
              ip_address: editData.ip_address,
              effective_from: editData.effective_from,
              effective_to: editData.effective_to,
              reason: editData.reason,
              status: editData.status,
              deleted: editData.deleted,
            }
          : {
              ip_address: "",
              effective_from: "",
              effective_to: "",
              reason: "",
              status: true,
              deleted: false,
            }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        editData ? onEdit(values) : onAdd(values);
        formikHelpers.resetForm();
      }}
    >
      {(props: FormikProps<any>) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          dirty,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        } = props;
        return (
          <form
            className="assign-activity-form"
            onSubmit={handleSubmit}
            style={{ margin: ".8rem 0" }}
          >
            <Box padding={"0 15px"}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Label htmlFor="ip_address" required>
                    IP Address
                  </Label>
                  <FormGroup className="input-holder">
                    <Input
                      id="ip_address"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="ip_address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ip_address}
                      error={Boolean(touched.ip_address && errors.ip_address)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="effective_from" required>
                    Effective From
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="effective_from"
                      type="datetime-local"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="effective_from"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.effective_from}
                      error={Boolean(touched.effective_from && errors.effective_from)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="effective_to" required>
                    Effective To
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="effective_to"
                      type="datetime-local"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="effective_to"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.effective_to}
                      error={Boolean(touched.effective_to && errors.effective_to)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="reason">Reason</Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="reason"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="reason"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                      error={Boolean(touched.reason && errors.reason)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="status">Status</Label>

                  <FormGroup className="input-holder">
                    <IOSSwitch
                      checked={values.status}
                      onChange={(e) => setFieldValue("status", !values.status)}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>

            <div className="">
              <Grid container spacing={2} justifyContent="flex-end" padding={"10px 20px"}>
                <Grid item>
                  <Button variant="outlined" onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : editData ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = ({ appState: { isLoading }, exclusionState: { exclusions } }: any) => ({
  isLoading,
  exclusions,
});

const mapDispatchToProps = { fetchExclusions, deleteExclusion };

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ExclusionForm);
