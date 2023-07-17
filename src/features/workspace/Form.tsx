import { Box, Button, FormGroup, FormHelperText, Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";

import CodeEditor from "@uiw/react-textarea-code-editor";
import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Label from "src/components/Label";
import { readFileContent } from "src/utils/file";
import toBase64 from "src/utils/toBase64";

import { useState } from "react";
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

function FileViewerForm({ onEdit, onAdd, formData, onClose, isSubmitting }: any) {
  const [text, setText] = useState("");
  return (
    <FormikBase
      initialValues={
        formData
          ? {
              name: formData.name,
              code_file: formData?.code_file,
              code_source: formData?.code_source,
              code_type: formData?.code_type,
              output_variable: formData?.output_variable,
              class_name: formData?.class_name,
              module_name: formData?.module_name,
              effective_from: formData.effective_from,
              effective_to: formData.effective_to,
              status: formData.status,
              deleted: formData.deleted,
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
            source_type: `python file`,
            source: values.code_source,
            code_type: values?.code_type?.name,
          };

          // never send path field
          delete values.code_file;
          delete values.code_source;
          console.log("submitting", values);
          formData ? onEdit(values, formikHelpers) : onAdd(values, formikHelpers);
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

        console.log({ text, code: values?.code_source });
        return (
          <form
            className="assign-activity-form"
            onSubmit={handleSubmit}
            style={{ margin: ".8rem 0" }}
          >
            <Box padding={"0 15px"}>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ paddingTop: 6 }}>
                  <FormGroup className="input-holder">
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                      <Label style={{ marginBottom: 10 }}>
                        <Typography variant="caption1">Code Editor. (type/paste/browse)</Typography>
                      </Label>
                      <FileInput
                        id="code_file"
                        name="code_file"
                        formData={formData}
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
                          const codeSource: string = await readFileContent(file);
                          console.log("codeSource", codeSource);
                          // const withoutEscChar = codeSource.replace(/\r/g, "");
                          // console.log("without-slash:", withoutEscChar);
                          const result =
                            "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt";

                          console.log({ codeSource, result, isSame: codeSource === result });
                          setText(codeSource);
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
                      // value={
                      //   "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt"
                      // }
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
                    {isSubmitting ? "Submittting..." : formData ? "Update" : "Add"}
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

export default FileViewerForm;
