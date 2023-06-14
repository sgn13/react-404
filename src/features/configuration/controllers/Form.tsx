import { Box, Button, FormGroup, Grid } from '@mui/material';
import { Formik, FormikProps } from 'formik';
import Input from 'src/components/Input';
import Label from 'src/components/Label';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  ip_address: Yup.string()
    .required()
    .label('IP')
    .test('ip_address', 'IP Address is not valid', (value) => {
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      );
    }),
  device: Yup.string().optional().label('Device'),
  controlling_unit: Yup.string().optional().label('Controlling Unit'),
  location: Yup.string().optional().label('Location'),
  function: Yup.string().optional().label('Function'),
  status: Yup.boolean().optional().label('Status'),
  deleted: Yup.boolean().optional().label('Deleted'),
});

const ControllerForm = ({
  onEdit,
  onAdd,
  editData,
  onClose,
  isSubmitting,
}: any) => {
  return (
    <>
      <Formik
        initialValues={
          editData
            ? {
                ip_address: editData.ip_address,
                device: editData.device,
                controlling_unit: editData.controlling_unit,
                location: editData.location,
                function: editData.function,
                status: editData.status,
                deleted: editData.deleted,
              }
            : {
                ip_address: '',
                device: '',
                controlling_unit: '',
                location: '',
                function: '',
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
                    <Label htmlFor="device">Device</Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="device"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="device"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.device}
                        error={Boolean(touched.device && errors.device)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="controlling_unit">Controlling Unit</Label>
                    <FormGroup className="input-holder">
                      <Input
                        id="controlling_unit"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="controlling_unit"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.controlling_unit}
                        error={Boolean(
                          touched.controlling_unit && errors.controlling_unit
                        )}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="location">
                      <div className="label-heading">Location</div>
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="location"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="location"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                        error={Boolean(touched.location && errors.location)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="function">
                      <div className="label-heading">Function</div>
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="function"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="function"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.function}
                        error={Boolean(touched.function && errors.function)}
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
                    <Button onClick={onClose} variant="outlined">
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
                        ? 'Submitting...'
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
      </Formik>
    </>
  );
};

export default ControllerForm;
