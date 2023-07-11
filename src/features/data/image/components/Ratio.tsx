import { Box, FormGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ConnectedProps, connect } from "react-redux";
import Input from "src/components/Input";
import Label from "src/components/Label";
import { fetchEnvironments } from "src/store/environment/actions";
import { AppState } from "src/store/reducer";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

function Ratio({
  environments,
  isLoading,
  fetchEnvironments,
  setFieldValue,
  values,
  errors,
  onAdd,
}: PropsFromRedux & { setFieldValue?: any; values?: any; errors?: any; onAdd?: any }) {
  return (
    <Grid item>
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
                onChange={(e: any) => setFieldValue("train", e.target.value)}
                value={values.train}
                error={Boolean(errors.train)}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                errors={errors}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Label htmlFor="valid" required>
              Valid/Test (B)
            </Label>

            <FormGroup className="input-holder">
              <Input
                id="valid"
                type="number"
                placeholder=""
                size="small"
                fullWidth
                name="valid"
                // onChange={(e: any) => setFieldValue("valid", e.targe.value)}
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
    </Grid>
  );
}

const mapStateToProps = ({ environmentState: { environments, isLoading } }: AppState) => ({
  environments,
  isLoading,
});

const mapDispatchToProps = { fetchEnvironments };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Ratio);
