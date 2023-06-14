import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import styled from 'src/lib/mui/styled';

const TextArea = styled(TextField)`
  background-color: #f6f9fba4;
`;

function Textarea({ id, errors, ...props }: any) {
  return (
    <>
      <TextArea {...props} />
      {errors
        ? Object.keys(errors)?.length
          ? Object.entries(errors).map(([key, value]) =>
              key === id ? (
                <FormHelperText error key={id} id={id}>
                  {value}
                </FormHelperText>
              ) : null
            )
          : null
        : null}
    </>
  );
}
export default Textarea;
