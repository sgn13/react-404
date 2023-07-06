import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import DialogContent from "@mui/material/DialogContent";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import AddModal from "src/components/AddModal/AddModal";
import Label from "src/components/Label";
import api from "src/constants/api";
import { fetchFeatures } from "src/store/feature/actions";
import { AppState } from "src/store/reducer";
import network from "src/utils/network";
import DraggableItem from "./DragableItem";

function Feature({
  features,
  featureList,
  isLoading,
  fetchFeatures,
  setFieldValue,
  value,
  name,
  pipelineId,
}: PropsFromRedux & { setFieldValue?: any; value?: any; name?: any; pipelineId?: any }) {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const [items, setItems] = useState<any[]>(featureList);
  const [showModal, setShowModal] = useState(null);
  const handleModalClose = () => setShowModal(null);

  const fetchFeatureFiles = async () => {
    try {
      const { data, status } = await network({}).get(`${api.featureFiles}?tunnel_id=${pipelineId}`);
      console.log({ data, status });
      if (status === 200 || (status > 200 && status < 300)) {
        // console.log("res data", data);
        // setFieldValue(name, data);
        const transformedData = data.map((item) => ({
          ...item,
          selected: false,
          id: item?.feature_model_id,
        }));
        setItems(transformedData);
      }
    } catch (err) {
      console.log("error fetching feature files", err);
    }
  };

  useEffect(() => {
    if (!pipelineId) return;
    fetchFeatureFiles();
    // fetchFeatures({});
  }, [pipelineId]);

  useEffect(() => {
    setFieldValue(name, items);
  }, [items]);

  const handleDragStart = (props: any) => {};
  const handleDragEnd = ({ active, over }: any) => {
    if (active?.id && over?.id && active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((it) => it.id === active.id);
        const newIndex = items.findIndex((it) => it.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {};

  const handleCheckboxChange = (clickedItem) => {
    // toggle checkbox
    const newItems = items.map((item) => ({
      ...item,
      selected: item.id === clickedItem.id ? !clickedItem?.selected : item.selected,
    }));
    setItems(newItems);
  };

  const handleCodeChange = (clickedItem) => {};
  const handleView = () => {};
  const handleUpdate = () => {};

  return (
    <Grid item>
      <AddModal
        openModal={showModal === "view"}
        setOpenModal={() => handleModalClose()}
        confirmationHeading={"View Code"}
      >
        Modal content
        {/* <ModelForm
          onClose={() => handleModalClose()}
          isSubmitting={isSubmitting}
          editData={showModal === "update" ? selected : null}
          onAdd={async (values: any, { resetForm }) => {
            if (await createModel({ values })) {
              handleModalClose();
              resetForm();
            }
          }}
          onEdit={async (values: any, { resetForm }) => {
            if (
              await updateModel({
                modelId: selected?.id,
                values,
              })
            ) {
              handleModalClose();
              resetForm();
            }
          }}
        /> */}
      </AddModal>

      <Label htmlFor="code_type">Select Features of the dataset</Label>
      <FormGroup className="input-holder">
        <DialogContent>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
          >
            <SortableContext items={items}>
              {items.map((x) => (
                <DraggableItem
                  key={x.id}
                  id={x.id}
                  item={x}
                  disabled={!!x.action}
                  onCheckboxChange={handleCheckboxChange}
                  onView={handleView}
                  onUpdate={handleUpdate}
                />
              ))}
            </SortableContext>
          </DndContext>
        </DialogContent>
      </FormGroup>
    </Grid>
  );
}

const mapStateToProps = ({ featureState: { features, isLoading } }: AppState) => ({
  features,
  isLoading,
});

const mapDispatchToProps = { fetchFeatures };
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Feature);
