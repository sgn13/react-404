import { RefObject, useEffect, useRef, useState } from "react";

import Dropzone from "src/hooks/useDropzone/Dropzone";
import useDropzone from "src/hooks/useDropzone/useDropzone";
import {
  InputComponentProps,
  InputContainer,
  InputContainerProps,
} from "../Input_old/Input";

type ImageInputComponentProps = InputComponentProps & {
  accept?: string;
  multiple?: boolean;
  onChange?: (filelist) => void;
  onRemove?: (filename) => void;
  onClear?: () => void;
  value?: string | string[];
};

const ImageInput = (props: ImageInputComponentProps) => {
  const dropzoneRef = useRef<RefObject<HTMLDivElement>>();

  const {
    multiple = false,
    accept = "image/*",
    value = [],
    onChange = () => {},
    onClear = () => {},
    onRemove = () => {},
  } = props;

  const [httpUrls, setHttpUrls] = useState(value || []);

  // for server image url
  useEffect(() => {
    setHttpUrls(value);
  }, [value]);

  const { filelist, dataUrls, removeFile, removeAllFiles, isDragged, isDropped } = useDropzone({
    dropzoneRef,
    multiple: multiple,
    accept: accept,
    onChange,
    onRemove,
    onClear,
  });

  const {
    label,
    name = "",
    errors = {},
    touched = {},
    helpText,
    children,
    color = "#3c3a3a",
    required,
    icon,
    textSize,

    labelAndInputWrapperStyle,
    errorStyle,
    ...rest
  } = props;

  const inputContainerProps: InputContainerProps = {
    label,
    name,
    errors,
    children,
    helpText,
    color,
    required,
    icon,
    textSize,
    touched,
    labelAndInputWrapperStyle,
    errorStyle,
  };

  // handle profile picture update case, ie. image url is received from the server
  return (
    <InputContainer {...inputContainerProps}>
      <Dropzone
        ref={dropzoneRef}
        isDragged={isDragged}
        isDropped={isDropped}
        removeAllFiles={removeAllFiles}
        multiple={multiple}
        {...rest}
      >
        <imgPreview
          dataUrls={dataUrls}
          httpUrls={httpUrls}
          setHttpUrls={setHttpUrls}
          removeFile={removeFile}
        />
      </Dropzone>
    </InputContainer>
  );
};

export default ImageInput;
