import InputLabel from "@mui/material/InputLabel";
import defaultFont from "src/constants/css/font";
// import { lato } from 'src/fonts';
import styled from "src/lib/mui/styled";

const FormLabel = styled(InputLabel)(({ theme }) => ({
  color: "gray",
  fontFamily: defaultFont,
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
      <div className="label-heading">
        {children} <sup>*</sup>
      </div>
    </FormLabel>
  ) : (
    <FormLabel {...rest}>{children}</FormLabel>
  );
}

export default Label;
