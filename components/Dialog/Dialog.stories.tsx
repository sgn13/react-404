import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "../Button22/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Dialog from "./Dialog";

storiesOf("Components/Dialog", module).add("Demo", () => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div>
      <Button noRipple onClick={() => setShowDialog(!showDialog)} text="Open dialog" />

      <Dialog
        fullscreen={false}
        showHeader={false}
        title="Default dialog"
        open={showDialog}
        onClose={() => setShowDialog(false)}
        backdropStyle={{ background: "transparent" }}
        actions={
          <>
            <Button text={"Cancel"} size="sm" onClick={() => setShowDialog(false)} />

            <Button text={"Okay"} size="sm" />
          </>
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut atque quibusdam excepturi sint
        molestiae iure quisquam at commodi officia. Quod. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Quod, illo! Distinctio, repellat ut.
      </Dialog>
    </div>
  );
});
