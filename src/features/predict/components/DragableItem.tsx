import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import dragIcon from "src/assets/icons/dots.svg";

function DraggableItem({ id, item, disabled, onCheckboxChange, onView, onUpdate }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 5,
    border: "0.5px solid #cccccca5",
    borderRadius: "2px",
  };

  return (
    <div ref={disabled ? null : setNodeRef} style={style} {...attributes}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <div style={{ cursor: "pointer" }}>
          <img height={"14px"} src={dragIcon} alt="" {...(disabled ? {} : { ...listeners })} />
        </div>
        <div>
          <Checkbox
            id="is_base_template"
            name="is_base_template"
            inputProps={{ "aria-label": "Checkbox demo" }}
            classes={{ root: "custom-checkbox-root" }}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 24 },
              padding: 0,
              marginLeft: "-3px",
              backgroundColor: "#f6f9fba2",
              // color: pink[800],
              // "&.Mui-checked": {
              //   color: pink[600],
              // },
            }}
            checked={item?.selected}
            onChange={() => onCheckboxChange(item)}
          />
        </div>
        <div>
          <Typography variant="subtitle2" style={{ padding: 0 }}>
            {item.feature_name}
          </Typography>
        </div>
        <Stack direction={"row"} gap={2} style={{ marginLeft: "auto" }}>
          <Button
            disableElevation
            size="small"
            variant="outlined"
            onClick={() => {}}
            style={{ padding: 0 }}
          >
            View
          </Button>

          <Button disableElevation size="small" variant="outlined" onClick={() => {}}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default DraggableItem;
