import { Box, Button, FormGroup, Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";

import CodeEditor from "@uiw/react-textarea-code-editor";
import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Label from "src/components/Label";
import { readFileContent } from "src/utils/file";

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

const pythonCode = "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n";
const fromSever = "import pandas as pd\\nimport numpy as np\\nimport matplotlib.pyplot as plt\\n";

function FeatureForm({
  onEdit,
  onAdd,
  showModal,
  selected,
  onClose,
  isSubmitting,
  handleSourceCodeSourceCode,
}: any) {
  return (
    <FormikBase
      initialValues={{
        code_file: "",
        code_source: `${selected?.source}`,
        // code_source: pythonCode,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      //       validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        try {
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
                <Grid item xs={12} style={{ paddingTop: 6 }}>
                  <FormGroup className="input-holder">
                    {showModal === "view" ? null : (
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Label style={{ marginBottom: 10 }}>
                          <Typography variant="caption1">
                            Code Editor (type/paste/browse)
                          </Typography>
                        </Label>

                        <FileInput
                          id="code_file"
                          name="code_file"
                          formData={selected}
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
                    )}
                    <CodeEditor
                      value={values.code_source}
                      disabled={showModal === "view"}
                      language="python"
                      onChange={(evn) => setFieldValue("code_source", evn.target.value)}
                      padding={15}
                      style={{
                        marginTop: 2,
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

            {showModal === "view" ? null : (
              <div className="">
                <Grid container spacing={2} justifyContent="flex-end" padding={"10px 20px"}>
                  <Grid item>
                    <Button onClick={onClose} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => handleSourceCodeSourceCode(values.code_source)}
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submittting..." : "Update"}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </form>
        );
      }}
    </FormikBase>
  );
}

export default FeatureForm;
