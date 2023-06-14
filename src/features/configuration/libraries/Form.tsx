import { Box, Button, FormGroup, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";

import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";
import Textarea from "src/components/Textarea";
import IOSSwitch from "src/components/switch";
import toBase64 from "src/utils/toBase64";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Library Name"),
  pythonFile: Yup.mixed().test(
    "Python File is required Field",
    (value) => typeof value === "object",
  ),
  path: Yup.string().optional().label("Path"),
  parameters: Yup.string().required().label("Parameter"),
  notes: Yup.string().optional().label("Notes"),
  status: Yup.boolean().optional().label("Status"),
  deleted: Yup.boolean().optional().label("Deleted"),
});

function LibraryForm({ onEdit, onAdd, editData, onClose, isSubmitting }: any) {
  return (
    <FormikBase
      initialValues={
        editData
          ? {
              name: editData.name,
              pythonFile: editData.pythonFile,
              path: editData.path,
              parameters: editData.parameters,
              notes: editData.notes,
              status: editData.status,
              deleted: editData.deleted,
            }
          : {
              name: "",
              pythonFile: "",
              parameters: "",
              notes: "",
              status: true,
              deleted: false,
            }
      }
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        try {
          const isFileEdited = editData && Boolean(values.pythonFile);
          const isNewForm = !editData;
          if (isFileEdited) {
            const base64File = await toBase64(values.pythonFile);
            values = {
              ...values,
              pythonFile: base64File,
              pythonFileName: values?.pythonFile?.name,
            };
          }

          if (isNewForm) {
            const base64File = await toBase64(values.pythonFile);
            values = {
              ...values,
              pythonFile: base64File,
              pythonFileName: values?.pythonFile?.name,
            };
          }
          // never send path field
          delete values.path;
          editData ? onEdit(values, formikHelpers) : onAdd(values, formikHelpers);
        } catch (err) {
          console.error("formik submit error", err);
        }
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
                  <Typography variant="h6">Upload Python File</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    The file code will be executed at server.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="name" required>
                    Name
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="name"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={Boolean(errors.name)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="pythonFile2" required>
                    Upload File
                  </Label>

                  <FormGroup className="input-holder">
                    <FileInput
                      id="pythonFile"
                      name="pythonFile"
                      editData={editData}
                      onChange={(event) => {
                        const { files } = event.target;
                        const file = files[0];
                        setFieldValue("pythonFile", file);
                      }}
                      placeholder="Choose file"
                      size="small"
                      disabled
                      fullWidth
                      values={values}
                      value={values?.pythonFile?.name}
                      error={Boolean(errors.pythonFile)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="parameter" required>
                    Parameter
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="parameters"
                      type="text"
                      placeholder="Full command to execute the file"
                      size="small"
                      fullWidth
                      name="parameters"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.parameters}
                      error={Boolean(errors.parameters)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="notes">
                    <div className="label-heading">Notes</div>
                  </Label>

                  <FormGroup className="input-holder">
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Enter notes"
                      multiline
                      rows={3}
                      // maxRows={4}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.notes}
                      error={Boolean(errors.notes)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Label htmlFor="reason">Status</Label>
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
                  <Button onClick={onClose} variant="outlined">
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submittting..." : editData ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        );
      }}
    </FormikBase>
  );
}

export default LibraryForm;
