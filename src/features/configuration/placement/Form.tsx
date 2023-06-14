import { Box, Button, FormGroup, Grid } from '@mui/material';
import { FormikProps } from 'formik';
import FormikBase from 'src/components/FormikBase/FormikBase';
import Input from 'src/components/Input';
import Label from 'src/components/Label';
import * as Yup from 'yup';

// contact: Yup.string()
//   .required()
//   .matches(/^[0-9]+$/, 'Must be only digits')
//   .max(10, 'Max 10 digits')
//   .label('Contact Number'),

// .when('threshold', ([threshold], schema) => {
//   // console.log('threshold', threshold);
//   // if (threshold)
//   return schema.required('Accepeted Threshold must be less than 5');
//   // return schema;
// }),

const validationSchema = Yup.object().shape({
  status: Yup.bool().optional().label('Status'),
  name: Yup.string().required().label('Name'),
  threshold: Yup.number().min(0).required().label('Threshold'),
  accepted_threshold: Yup.number().when('threshold', ([threshold], schema) => {
    return schema.test({
      message: (value: any) => {
        return `Accepted Threshold (${value.originalValue}) must be less than threshold (${threshold})`;
      },
      test: (accepted_threshold: any) => {
        if (accepted_threshold > threshold) {
          return false;
        }
        return true;
      },
    });
  }),
  deleted: Yup.boolean().optional().label('Deleted'),
});

const PlacementForm = ({
  onEdit,
  onAdd,
  editData,
  onClose,
  isSubmitting,
}: any) => {
  return (
    <>
      <FormikBase
        initialValues={
          editData
            ? {
                name: editData.name,
                threshold: editData.threshold,
                accepted_threshold: editData.accepted_threshold,
                status: editData.status,
                deleted: editData.deleted,
              }
            : {
                name: '',
                threshold: undefined,
                accepted_threshold: undefined,
                status: true,
                deleted: false,
              }
        }
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          editData
            ? onEdit(values, formikHelpers)
            : onAdd(values, formikHelpers);
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
              style={{ margin: '.8rem 0' }}
            >
              <Box padding={'0 15px'}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Label htmlFor="name" required>
                      Name
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={Boolean(errors.name)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="threshold" required>
                      Threshold
                    </Label>
                    <FormGroup className="input-holder">
                      <Input
                        id="threshold"
                        type="number"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="threshold"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.threshold}
                        error={Boolean(errors.threshold)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="accepted_threshold" required>
                      Accepted Threshold
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="accepted_threshold"
                        type="number"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="accepted_threshold"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.accepted_threshold}
                        error={Boolean(errors.accepted_threshold)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>

              <div className="">
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  padding={'10px 20px'}
                >
                  <Grid item>
                    <Button variant="outlined" onClick={onClose}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Submittting...'
                        : editData
                        ? 'Update'
                        : 'Add'}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          );
        }}
      </FormikBase>
    </>
  );
};

export default PlacementForm;
