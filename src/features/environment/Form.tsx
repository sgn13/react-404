import { ExpandMore } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Collapse,
  FormGroup,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";
import { Multiselect } from "src/components/Multselect_old/Multiselect";
import IOSSwitch from "src/components/switch";
import defaultFont from "src/constants/css/font";
// import { lato } from 'src/fonts';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useNavigate } from "react-router-dom";
import styled from "src/lib/mui/styled";
import light from "src/theme/data/light";
import { readFileContent } from "src/utils/file";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name_or_tag: Yup.string().required().label("Name"),
  parameters: Yup.mixed().test(
    "Parameters File is required Field",
    (value) => typeof value === "object",
  ),
  source: Yup.mixed().test("Source File is required Field", (value) => typeof value === "object"),
  placement_name: Yup.string().required().label("Placement Name"),
  effective_from: Yup.string().required().label("Effective From"),
  effective_to: Yup.string().required().label("Effective To"),
  status: Yup.boolean().required().label("Status"),
  deleted: Yup.boolean().required().label("Deleted"),
});

const FormStyles = styled("div")``;

export const StyledMultiSelect = styled("div")`
  .chip {
    font-family: ${defaultFont};
  }
  .icon_down_dir {
    width: 30px;
    display: flex;
    align-items: center;
  }
  .option {
    font-family: ${defaultFont};
  }
  .singleChip {
    font-size: 1rem;
    line-height: 20px;
    padding-left: 8px;
    background-color: #f6f9fba2;
  }
  .singleSelect {
    height: 42px;
    display: flex;
    align-items: center;
    background-color: #f6f9fba2;
  }

  .highlightOption {
    background: ${light.palette.primary.main};
    color: #ffffff;
  }
  .multiSelectContainer li:hover {
    background-color: ${light.palette.primary.light};
    color: white;
    cursor: pointer;
  }

  .notFound {
    font-family: ${defaultFont};
  }
`;

function EnvironmentForm({ onEdit, onAdd, formData, onClose, templates = [], models = [] }: any) {
  const navigate = useNavigate();
  return (
    <Stack style={{}}>
      <Stack direction={"row"} gap={2} justifyContent={"space-between"} sx={{ marginBottom: 2 }}>
        <Typography
          // mt={3}
          variant="h6"
          component="h6"
          sx={{
            fontWeight: "600",
            fontSize: "16px",
            color: "#384874",
          }}
        >
          {`${formData ? "Update the Environment" : "Create An Environment"}`}
        </Typography>
        <Button
          variant="outlined"
          size="sm"
          sx={{ "& .MuiButton-startIcon": { marginRight: "0px" } }}
          startIcon={<ChevronLeftIcon style={{ marginRight: 0 }} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        {/* <Divider style={{ width: "100%" }} /> */}
      </Stack>
      <FormikBase
        initialValues={
          formData
            ? {
                name_or_tag: formData.name_or_tag,
                use_base_template: formData.use_base_template,
                is_base_template: formData?.is_base_template,
                base_template: formData.base_template,
                model: models?.find((item: any) => item.id === formData?.model) || "",
                requirements: formData.requirements,
                requirementsFile: formData?.requirementsFile,
                status: formData.status,
                deleted: formData.deleted,
                debug: formData?.debug,
                override: formData?.override,
              }
            : {
                name_or_tag: "",
                use_base_template: false,
                is_base_template: false,
                base_template: "",
                model: "",
                requirements: "",
                requirementsFile: "",
                status: true,
                deleted: false,
                debug: false,
                override: false,
              }
        }
        // validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          const {
            name_or_tag,
            use_base_template,
            is_base_template,
            base_template,
            model,
            requirements,
            deleted,
            status,
            debug,
            override,
          } = values;

          const formValues = {
            name_or_tag,
            base_template_id: base_template?.id || 0,
            use_base_template,
            is_base_template,
            model: model?.[0]?.id,
            requirements,
            status,
            deleted,
            debug,
            override,
            organization: 0,
          };
          if (!use_base_template) delete formValues.base_template;
          // never send path field
          // delete values.parametersFileNamePath;
          // delete values.sourceFileNamePath;
          formData ? onEdit(formValues, formikHelpers) : onAdd(formValues, formikHelpers);
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
          console.log("values", values);
          return (
            <FormStyles>
              <form onSubmit={handleSubmit} style={{ margin: ".8rem 0" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                      <Checkbox
                        id="is_base_template"
                        name="is_base_template"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        classes={{ root: "custom-checkbox-root" }}
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 24 },
                          padding: 0,
                          marginLeft: "-3px",
                          backgroundColor: "#f6f9fba2",
                          // color: pink[800],
                          // "&.Mui-checked": {
                          //   color: pink[600],
                          // },
                        }}
                        checked={values.is_base_template}
                        onChange={() => setFieldValue("is_base_template", !values.is_base_template)}
                      />
                      <Label style={{ marginBottom: 0, marginLeft: 8 }} htmlFor="reason">
                        Make it Base Template
                      </Label>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Label htmlFor="name_or_tag" required>
                      Name or Tag
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="name_or_tag"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="name_or_tag"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name_or_tag}
                        error={Boolean(errors.name_or_tag)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <Label htmlFor="model" required>
                      Model
                    </Label>
                    <FormGroup className="input-holder">
                      <StyledMultiSelect>
                        <Multiselect
                          id="model"
                          name="model"
                          singleSelect
                          options={models || []}
                          displayValue="name"
                          selectedValues={values?.model || []}
                          customArrow={<ExpandMore />}
                          onSelect={(arr) => {
                            setFieldValue("model", arr);
                          }}
                          avoidHighlightFirstOption
                        />
                      </StyledMultiSelect>
                      {errors?.model ? (
                        <FormHelperText error id={"model"}>
                          {errors?.model}
                        </FormHelperText>
                      ) : null}
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <Label htmlFor="reason">Status</Label>
                    <FormGroup className="input-holder">
                      <IOSSwitch
                        checked={values.status}
                        onChange={(e) => setFieldValue("status", !values.status)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <Label htmlFor="reason">Override</Label>
                    <FormGroup className="input-holder">
                      <IOSSwitch
                        checked={values.override}
                        onChange={(e) => setFieldValue("override", !values.override)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <Label htmlFor="reason">Debug</Label>
                    <FormGroup className="input-holder">
                      <IOSSwitch
                        checked={values.debug}
                        onChange={(e) => setFieldValue("debug", !values.debug)}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={1}
                      style={{ marginBottom: 5 }}
                    >
                      <Checkbox
                        id="use_base_template"
                        name="use_base_template"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        classes={{ root: "custom-checkbox-root" }}
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 24 },
                          padding: 0,
                          marginLeft: "-3px",
                          backgroundColor: "#f6f9fba2",
                          // color: pink[800],
                          // "&.Mui-checked": {
                          //   color: pink[600],
                          // },
                        }}
                        checked={values.use_base_template}
                        onChange={() =>
                          setFieldValue("use_base_template", !values.use_base_template)
                        }
                      />
                      <Label style={{ marginBottom: 0 }}>Use Base Template</Label>
                    </Stack>
                    <Collapse in={values.use_base_template}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {templates && templates?.length ? (
                          templates.map((item) => (
                            <Grid item xs={4}>
                              <Paper
                                variant="outlined"
                                onClick={() => setFieldValue("base_template", item)}
                              >
                                <Button
                                  component="li"
                                  type="button"
                                  sx={(theme) => ({
                                    width: "100%",
                                    height: 100,
                                    backgroundColor:
                                      values?.base_template?.id === item?.id
                                        ? theme.palette.primary.dark
                                        : "auto",
                                    color:
                                      values?.base_template?.id === item?.id
                                        ? theme.palette.common.white
                                        : "auto",
                                    ":hover": {
                                      backgroundColor: theme.palette.primary.light,
                                      color: theme.palette.common.white,
                                    },
                                  })}
                                >
                                  {item?.name_or_tag}
                                </Button>
                              </Paper>
                            </Grid>
                          ))
                        ) : (
                          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                            <Label>No Base Templates found !</Label>
                          </div>
                        )}
                      </Grid>
                    </Collapse>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: 6 }}>
                    <FormGroup className="input-holder">
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Label style={{ marginBottom: 10 }}>
                          Enter{" "}
                          <span style={{ fontStyle: "italic", backgroundColor: "#f5f5f5" }}>
                            requirement.txt
                          </span>{" "}
                          <Typography variant="caption1">content. (Type/Paste/Browse)</Typography>
                        </Label>
                        <FileInput
                          id="requirements"
                          name="requirements"
                          formData={formData}
                          showOnlyBrowseButton
                          buttonName="Import From File"
                          buttonStyle={{
                            backgroundColor: "#f6f9fba2",
                            border: "1px dashed #4c4d4e9a",
                            borderBottomColor: "#f6f9fba2",
                          }}
                          accept="application/txt,.txt"
                          onChange={async (event) => {
                            const { files } = event.target;
                            const file = files[0];
                            setFieldValue("requirementsFile", file);
                            const code: string = await readFileContent(file);
                            setFieldValue("requirements", code);
                          }}
                          placeholder="Choose file"
                          size="small"
                          disabled
                          fullWidth
                          values={values}
                          value={values?.requirementsFile?.name}
                          error={Boolean(errors.requirements)}
                          errors={errors}
                        />
                      </Stack>
                      <CodeEditor
                        value={values.requirements}
                        disabled={false}
                        language="jsx"
                        placeholder="requirements.txt content goes here (remove comments if any)"
                        onChange={(evn) => setFieldValue("requirements", evn.target.value)}
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
                </Grid>

                <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: 20 }}>
                  <Grid item>
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : formData ? "Update" : "Create"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormStyles>
          );
        }}
      </FormikBase>
    </Stack>
  );
}

export default EnvironmentForm;
