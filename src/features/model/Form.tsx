import { Box, Button, FormGroup, Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";

import CodeEditor from "@uiw/react-textarea-code-editor";
import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";
import IOSSwitch from "src/components/switch";
import { readFileContent } from "src/utils/file";
import toBase64 from "src/utils/toBase64";

import { convertToDateTimeLocalString } from "src/utils/date";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Model Name"),
  effective_from: Yup.string().required().label("Effective From"),
  effective_to: Yup.string().required().label("Effective To"),
  pythonFile: Yup.mixed().test(
    "Python File is required Field",
    (value) => typeof value === "object",
  ),
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
              model_instance: editData?.model_instance,
              effective_from: editData.effective_from
                ? convertToDateTimeLocalString(new Date(editData.effective_from))
                : "",
              effective_to: editData.effective_to
                ? convertToDateTimeLocalString(new Date(editData.effective_to))
                : "",
              pythonFile: editData.pythonFile,
              pythonFileContent: editData?.pythonFileContent,
              status: editData.status,
              deleted: editData.deleted,
            }
          : {
              name: "",
              model_instance: "",
              effective_from: "",
              effective_to: "",
              pythonFile: "",
              pythonFileContent: "",
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
          // if (isFileEdited) {
          //   const base64File = await toBase64(values.pythonFile);
          //   values = {
          //     ...values,
          //     pythonFile: base64File,
          //   };
          // }

          if (isNewForm) {
            // converting variable content into file
            const newFile = new File([values.pythonFileContent], "python-file.py", {
              type: "text/plain",
            });
            const base64OnNewFile = await toBase64(newFile);
            values = {
              ...values,
              source: base64OnNewFile,
              file_name: values?.pythonFile?.name,
            };
          }
          // never send path field
          delete values.pythonFile;
          delete values.pythonFileContent;
          console.log("submitting", values);
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
                <Grid item xs={6}>
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

                <Grid item xs={6}>
                  <Label htmlFor="model_instance" required>
                    Model Instance
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="model_instance"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="model_instance"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.model_instance}
                      error={Boolean(errors.model_instance)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
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
                      value={values.effective_from}
                      error={errors.effective_from}
                      errors={errors}
                      // min={new Date()
                      //   .toISOString()
                      //   .slice(0, new Date().toISOString().lastIndexOf(":"))}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
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
                      value={values.effective_to}
                      error={errors.effective_to}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 6 }}>
                  <FormGroup className="input-holder">
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                      <Label style={{ marginBottom: 10 }}>
                        Enter{" "}
                        <span style={{ fontStyle: "italic", backgroundColor: "#f5f5f5" }}>
                          python
                        </span>{" "}
                        <Typography variant="caption1">code. (Type/Paste/Browse)</Typography>
                      </Label>
                      <FileInput
                        id="requirements"
                        name="requirements"
                        formData={editData}
                        showOnlyBrowseButton
                        buttonName="Import From File"
                        buttonStyle={{
                          backgroundColor: "#f6f9fba2",
                          border: "1px dashed #4c4d4e9a",
                          borderBottomColor: "#f6f9fba2",
                        }}
                        accept="application/txt,.py"
                        onChange={async (event) => {
                          const { files } = event.target;
                          const file = files[0];
                          setFieldValue("pythonFile", file);
                          const code: string = await readFileContent(file);
                          setFieldValue("pythonFileContent", code);
                        }}
                        placeholder="Choose file"
                        size="small"
                        disabled
                        fullWidth
                        values={values}
                        value={values?.pythonFile?.name}
                        error={Boolean(errors.pythonFileContent)}
                        errors={errors}
                      />
                    </Stack>
                    <CodeEditor
                      value={values.pythonFileContent}
                      disabled={!values.pythonFile}
                      language="python"
                      onChange={(evn) => setFieldValue("pythonFileContent", evn.target.value)}
                      padding={15}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#f6f9fba2",
                        border: "1px dashed #4c4d4e9a",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
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
