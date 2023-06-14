import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
// import { lato } from 'src/fonts';
import styled from "src/lib/mui/styled";

const FormInput = styled(OutlinedInput)`
  background-color: #f6f9fba2;
  font-family: "Lato";
`;

function Input({ id, errors, ...props }: any) {
  return (
    <>
      <FormInput {...props} />
      {errors
        ? Object.keys(errors)?.length
          ? Object.entries(errors).map(([key, value]) =>
              key === id ? (
                <FormHelperText error key={id} id={id}>
                  {value}
                </FormHelperText>
              ) : null,
            )
          : null
        : null}
    </>
  );
}
export default Input;
