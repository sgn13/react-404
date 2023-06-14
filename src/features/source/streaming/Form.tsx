import { Box, Button, FormGroup, Grid } from '@mui/material';
import { Formik, FormikProps } from 'formik';

import Input from 'src/components/Input';
import Label from 'src/components/Label';
import IOSSwitch from 'src/components/switch';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  url: Yup.string().required().label('URL'),
  api_id: Yup.string().required().label('API Id'),
  field: Yup.string().required().label('Field'),
  effective_from: Yup.string().required().label('Effective From'),
  effective_to: Yup.string().required().label('Effective To'),
  status: Yup.boolean().required().label('Status'),
  deleted: Yup.boolean().required().label('Deleted'),
});

const StreamingForm = ({ onEdit, onAdd, editData, onClose }: any) => {
  return (
    <>
      <Formik
        initialValues={
          editData
            ? {
                name: editData.name,
                url: editData.url,
                api_id: editData.api_id,
                field: editData.field,
                effective_from: editData.effective_from,
                effective_to: editData.effective_to,
                status: editData.status,
                deleted: editData.deleted,
              }
            : {
                name: '',
                url: '',
                api_id: '',
                field: '',
                effective_from: '',
                effective_to: '',
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
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          } = props;

          console.log({ errors, isValid, dirty });
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
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={Boolean(touched.name && errors.name)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="url">URL</Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="url"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.url}
                        error={Boolean(touched.url && errors.url)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="api_id">API Id</Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="api_id"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="api_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.api_id}
                        error={Boolean(touched.api_id && errors.api_id)}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Label htmlFor="field" required>
                      Field
                    </Label>

                    <FormGroup className="input-holder">
                      <Input
                        id="field"
                        type="text"
                        placeholder=""
                        size="small"
                        fullWidth
                        name="field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.field}
                        error={Boolean(touched.field && errors.field)}
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
                        onBlur={handleBlur}
                        value={values.effective_from}
                        error={Boolean(
                          touched.effective_from && errors.effective_from
                        )}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <Label htmlFor="effective_to" required>
                      Effective Too
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
                        error={Boolean(
                          touched.effective_to && errors.effective_to
                        )}
                        errors={errors}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="status">Status</Label>
                    <FormGroup className="input-holder">
                      <IOSSwitch
                        checked={values.status}
                        onChange={(e) =>
                          setFieldValue('status', !values.status)
                        }
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
                      disabled={!isValid || !dirty || isSubmitting}
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

export default StreamingForm;
