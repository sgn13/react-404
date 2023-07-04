import { Box, Button, FormGroup, FormHelperText, Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";

import CodeEditor from "@uiw/react-textarea-code-editor";
import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";
import IOSSwitch from "src/components/switch";
import { readFileContent } from "src/utils/file";
import toBase64 from "src/utils/toBase64";

import ReactSelect from "src/components/ReactSelect/ReactSelect";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Model Name"),
  code_source: Yup.string().required().label("Code Source"),
  code_file: Yup.mixed().test(
    "Code File is required Field",
    (value: any) => !!(typeof value === "object" || !value),
  ),
  // effective_from: Yup.string().required().label("Effective From"),
  // effective_to: Yup.string().required().label("Effective To"),
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
              code_file: editData?.code_file,
              code_source: editData?.code_source,
              code_type: editData?.code_type,
              output_variable: editData?.output_variable,
              class_name: editData?.class_name,
              module_name: editData?.module_name,
              effective_from: editData.effective_from,
              effective_to: editData.effective_to,
              status: editData.status,
              deleted: editData.deleted,
            }
          : {
              name: "",
              code_file: "",
              code_source: "",
              code_type: "",
              output_variable: "",
              class_name: "",
              module_name: "",
              effective_from: "",
              effective_to: "",
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
          // converting variable content into file
          const newFile = new File([values.code_source], `${values.name}.py`, {
            type: "text/plain",
          });
          const base64OnNewFile = await toBase64(newFile);
          values = {
            ...values,
            // overwriting the file with base64string
            code_file: base64OnNewFile,
            source_type: "python file",
            source: values.code_source,
            code_type: values?.code_type?.name,
          };

          // never send path field
          // delete values.code_file;
          // delete values.code_source;
          console.log("submitting 2", values);
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

                <Grid item xs={12} style={{ paddingTop: 6 }}>
                  <FormGroup className="input-holder">
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                      <Label style={{ marginBottom: 10 }}>
                        <Typography variant="caption1">Code Editor. (type/paste/browse)</Typography>
                      </Label>
                      <FileInput
                        id="code_file"
                        name="code_file"
                        formData={editData}
                        showOnlyBrowseButton
                        buttonName="Import code file"
                        buttonStyle={{
                          backgroundColor: "#f6f9fba2",
                          border: "1px dashed #4c4d4e9a",
                          borderBottomColor: "#f6f9fba2",
                        }}
                        accept="application/txt,.py"
                        onChange={async (event) => {
                          const { files } = event.target;
                          const file = files[0];
                          setFieldValue("code_file", file);
                          const codeSource: unknown = await readFileContent(file);
                          setFieldValue("code_source", codeSource);
                        }}
                        placeholder="Choose file"
                        size="small"
                        disabled
                        fullWidth
                        values={values}
                        value={values?.code_file?.name}
                        error={Boolean(errors.code_source)}
                        errors={errors}
                      />
                    </Stack>
                    <CodeEditor
                      value={values.code_source}
                      language="python"
                      onChange={(evn) => setFieldValue("code_source", evn.target.value)}
                      padding={15}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#f6f9fba2",
                        border: "1px dashed #4c4d4e9a",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                    />
                    {errors?.code_source ? (
                      <FormHelperText error id={"code_source"}>
                        {errors?.code_source}
                      </FormHelperText>
                    ) : null}
                  </FormGroup>
                </Grid>

                <Grid
                  item
                  xs={!values?.code_type || values?.code_type?.name === "functionless" ? 6 : 4}
                >
                  <Label htmlFor="output_variable" required>
                    Output Variable Name
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="output_variable"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="output_variable"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.output_variable}
                      error={Boolean(errors.output_variable)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>

                <Grid
                  item
                  xs={!values?.code_type || values?.code_type?.name === "functionless" ? 6 : 4}
                >
                  <Label htmlFor="code_type" required>
                    Code Type
                  </Label>
                  <FormGroup className="input-holder">
                    <ReactSelect
                      onChange={(selected) => {
                        setFieldValue("code_type", selected);
                      }}
                      selectedValue={undefined}
                      keyname="name"
                      options={[{ name: "class" }, { name: "function" }, { name: "functionless" }]}
                    />

                    {errors?.code_type ? (
                      <FormHelperText error id={"code_type"}>
                        {errors?.code_type}
                      </FormHelperText>
                    ) : null}
                  </FormGroup>
                </Grid>

                {values?.code_type?.name === "class" ? (
                  <Grid
                    item
                    xs={!values?.code_type || values?.code_type?.name === "functionless" ? 6 : 4}
                  >
                    <Label htmlFor="class_name" required>
                      Class Name
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="class_name"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="class_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.class_name}
                        error={Boolean(errors.class_name)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                ) : null}
                {values?.code_type?.name === "function" ? (
                  <Grid
                    item
                    xs={!values?.code_type || values?.code_type?.name === "functionless" ? 6 : 4}
                  >
                    <Label htmlFor="module_name" required>
                      Function Name
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="module_name"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="module_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.module_name}
                        error={Boolean(errors.module_name)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                ) : null}

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
                      onBlur={handleBlur}
                      value={values.effective_from}
                      error={Boolean(touched.effective_from && errors.effective_from)}
                      errors={errors}
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
                      onBlur={handleBlur}
                      value={values.effective_to}
                      error={Boolean(touched.effective_to && errors.effective_to)}
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
