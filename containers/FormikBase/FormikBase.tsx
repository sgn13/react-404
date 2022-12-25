import React, { ReactNode } from "react";
import { Formik, FormikConfig } from "formik";

type CustomProps = {
  renderForm?: (props: any) => ReactNode;
};

function FormikBase({
  validateOnMount = false,
  validateOnBlur = false,
  validateOnChange = false,
  enableReinitialize = false, // false is formik default
  renderForm,
  ...rest
}: FormikConfig<any> & CustomProps) {
  return (
    <Formik
      validateOnMount={validateOnMount}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      enableReinitialize={enableReinitialize}
      children={renderForm} // renderForm callback gets FormikProps as first arg
      {...rest}
    />

    // // Another Alternative:
    // <Formik
    //   validateOnMount={validateOnMount}
    //   validateOnBlur={validateOnBlur}
    //   validateOnChange={validateOnChange}
    //   enableReinitialize={enableReinitialize}
    //   {...rest}
    // >
    //   {(propsFromFormik: FormikProps<any>) => renderForm(propsFromFormik)}
    // </Formik>
  );
}

export default FormikBase;
