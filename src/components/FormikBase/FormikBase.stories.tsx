import { storiesOf } from '@storybook/react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import FormikBase from './FormikBase';

const initialValues = {
  email: '',
  password: '',
};

export type Values = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
});

const handleSubmitCallback = (
  values: Values,
  { setSubmitting }: FormikHelpers<Values>
) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}: FormikProps<Values>) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="email" id="email-label">
        Email:
      </label>
      <br />
      <input
        id="email"
        type="email"
        name="email"
        onChange={(event) => {
          setFieldValue('email', event.target.value);
        }}
        value={values.email}
      />
      <br />
      {(values.email || (errors.email && touched.email)) && errors.email}
    </div>
    <div>
      <label htmlFor="password" id="password-label">
        Password:
      </label>
      <br />
      <input
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
      />
      <br />
      {(values.password || (errors.password && touched.password)) &&
        errors.password}
    </div>
    <input type="submit" disabled={isSubmitting} />
  </form>
);

storiesOf('Containers/FormikBase', module).add('Demo', () => (
  <FormikBase
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmitCallback}
    validateOnMount={false}
    validateOnBlur
    validateOnChange
    enableReinitialize={false}
    renderForm={form}
  />
));
