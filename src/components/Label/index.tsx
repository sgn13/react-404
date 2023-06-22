import InputLabel from "@mui/material/InputLabel";
import defaultFont from "src/constants/css/font";
// import { lato } from 'src/fonts';
import styled from "src/lib/mui/styled";

const FormLabel = styled(InputLabel)(({ theme }) => ({
  color: "gray",
  fontFamily: defaultFont,
  textAlign: "left",
  marginBottom: 5,
}));

function Label({
  children,
  required,
  ...rest
}: {
  children: any;
  required?: boolean;
  htmlFor?: string;
  rest?: any;
}) {
  return required ? (
    <FormLabel {...rest}>
      {children} <sup>*</sup>
    </FormLabel>
  ) : (
    <FormLabel {...rest}>{children}</FormLabel>
  );
}

export default Label;
