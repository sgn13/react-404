import { Box, Button, FormGroup, Grid } from "@mui/material";
import { FormikProps } from "formik";

import FormikBase from "src/components/FormikBase/FormikBase";
import Input from "src/components/Input";
import Label from "src/components/Label";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

// const StyledMultiSelect = styled('div')`
//   .chip {
//     font-family: ${lato.style.fontFamily};
//   }
//   .icon_down_dir {
//     width: 30px;
//     display: flex;
//     align-items: center;
//   }
//   .option {
//     font-family: ${lato.style.fontFamily};
//   }
//   .singleChip {
//     font-size: 1rem;
//     line-height: 20px;
//     padding-left: 8px;
//     background-color: #f6f9fba2;
//   }
//   .singleSelect {
//     height: 42px;
//     display: flex;
//     align-items: center;
//     background-color: #f6f9fba2;
//   }

//   .highlightOption {
//     background: ${light.palette.primary.main};
//     color: #ffffff;
//   }
//   .multiSelectContainer li:hover {
//     background-color: ${light.palette.primary.light};
//     color: white;
//     cursor: pointer;
//   }

//   .notFound {
//     font-family: ${lato.style.fontFamily};
//   }
// `;

function AnnotationForm({ onEdit, onAdd, editData, onClose, placements }: any) {
  console.log("annotation form");
  return (
    <FormikBase
      initialValues={
        editData
          ? {
              train: editData.train,
              valid: editData.valid,
            }
          : {
              train: 100,
              valid: "",
            }
      }
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
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

        console.log({ values });
        return (
          <form
            className="assign-activity-form"
            onSubmit={handleSubmit}
            style={{ margin: ".8rem 0" }}
          >
            <Box padding={"0 15px"}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Label htmlFor="train" required>
                    Train (A)
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="train"
                      type="number"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="train"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.train}
                      error={Boolean(errors.train)}
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Label htmlFor="valid" required>
                    Valid (B)
                  </Label>

                  <FormGroup className="input-holder">
                    <Input
                      id="valid"
                      type="number"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="valid"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={100 - values.train}
                      disabled
                      error={Boolean(errors.valid)}
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <div style={{ margin: ".8rem 0" }}>
                {values.train} <b>:</b> {100 - values.train}
              </div>
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

// AnnotationForm.getLayout = function getLayout(page: ReactElement) {
//   return <FullLayout>{page}</FullLayout>;
// };

export default AnnotationForm;
