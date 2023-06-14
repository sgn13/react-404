import { ExpandMore } from "@mui/icons-material";
import { Box, Button, FormGroup, FormHelperText, Grid } from "@mui/material";
import { FormikProps } from "formik";

import FileInput from "src/components/FileInput";
import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";
import { Multiselect } from "src/components/Multselect_old/Multiselect";
import IOSSwitch from "src/components/switch";
import defaultFont from "src/constants/css/font";
// import { lato } from 'src/fonts';
import styled from "src/lib/mui/styled";
import light from "src/theme/data/light";
import toBase64 from "src/utils/toBase64";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
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

const StyledMultiSelect = styled("div")`
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

function FileUploadForm({ onEdit, onAdd, editData, onClose, placements }: any) {
  return (
    <FormikBase
      initialValues={
        editData
          ? {
              name: editData.name,
              source: editData.source,
              parameters: editData.parameters,
              placement_name: editData.placement_name,
              effective_from: editData.effective_from,
              effective_to: editData.effective_to,
              status: editData.status,
              deleted: editData.deleted,
            }
          : {
              name: "",
              source: "",
              parameters: "",
              placement_name: "",
              effective_from: "",
              effective_to: "",
              status: true,
              deleted: false,
            }
      }
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        const isFileEdited = editData && values.source;
        const isNewForm = !editData;
        if (isFileEdited) {
          const sourceBase64File = await toBase64(values.source);
          const parametersBase64File = await toBase64(values.parameters);

          values = {
            ...values,
            source: sourceBase64File,
            sourceFileName: values?.source?.name,
            parameters: parametersBase64File,
            parametersFileName: values?.parameters?.name,
          };
        }

        if (isNewForm) {
          const sourceBase64File = await toBase64(values.source);
          const parametersBase64File = await toBase64(values.parameters);
          values = {
            ...values,
            source: sourceBase64File,
            sourceFileName: values?.source?.name,
            parameters: parametersBase64File,
            parametersFileName: values?.parameters?.name,
          };
        }
        // never send path field
        // delete values.parametersFileNamePath;
        // delete values.sourceFileNamePath;
        editData ? onEdit(values, formikHelpers) : onAdd(values, formikHelpers);
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
                  <Label htmlFor="source" required>
                    Source
                  </Label>

                  <FormGroup className="input-holder">
                    <FileInput
                      id="source"
                      name="source"
                      editData={editData}
                      onChange={(event) => {
                        const { files } = event.target;
                        const file = files[0];
                        setFieldValue("source", file);
                      }}
                      placeholder="Choose file"
                      size="small"
                      disabled
                      fullWidth
                      values={values}
                      value={values.source?.name}
                      error={Boolean(errors.source)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Label htmlFor="parameters" required>
                    Parameters
                  </Label>

                  <FormGroup className="input-holder">
                    <FileInput
                      id="parameters"
                      name="parameters"
                      editData={editData}
                      onChange={(event) => {
                        const { files } = event.target;
                        const file = files[0];
                        setFieldValue("parameters", file);
                      }}
                      placeholder="Choose file"
                      size="small"
                      disabled
                      fullWidth
                      values={values}
                      value={values.parameters?.name}
                      error={Boolean(errors.parametersFileName)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Label htmlFor="placement_name" required>
                    Placement
                  </Label>
                  <FormGroup className="input-holder">
                    <StyledMultiSelect>
                      <Multiselect
                        id="placement_name"
                        name="placement_name"
                        singleSelect
                        options={placements || []}
                        displayValue="name"
                        selectedValues={values.placement_name?.length ? [placements || []] : null}
                        customArrow={<ExpandMore />}
                        onSelect={(arr) => {
                          setFieldValue("placement_name", arr[0]);
                        }}
                      />
                    </StyledMultiSelect>
                    {errors?.placement_name ? (
                      <FormHelperText error id={"placement_name"}>
                        {errors?.placement_name}
                      </FormHelperText>
                    ) : null}
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
                      onBlur={handleBlur}
                      value={values.effective_from}
                      error={Boolean(errors.effective_from)}
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
                      error={Boolean(errors.effective_to)}
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
                  <Button variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : editData ? "Update" : "Add"}
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

export default FileUploadForm;
