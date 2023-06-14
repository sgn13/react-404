import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import styled from "src/theme_old/styled";

type DropzoneProps = ComponentPropsWithRef<"div"> & {
  isDragged: boolean;
  isDropped: boolean;
  removeAllFiles: Function;
  children?: any;
  multiple?: boolean;
};

const AreaAndPreviewContainer = styled.div`
  position: relative;
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  width: fit-content;
  border-radius: 4px;
`;

const DropArea = styled.div<{ isDragged; isDropped }>`
  min-height: 120px;
  min-width: 120px;
  text-align: center;
  font-size: 24px;
  padding: 16px;
  border-radius: 4px;
  border: 3px dashed #fff8f8;
  background-color: #ccccccdd;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  ${({ isDragged, isDropped }) => {
    if (isDragged) return "border: 3px dashed #1e90ff;";
    if (isDropped) return "border: 3px dashed #32cd32;";
  }}

  div:first-child > p:first-of-type {
    margin: 0px;
    margin-bottom: 3px;
    font-weight: bold;
  }
  div:first-child > p:nth-last-of-type(1) {
    margin: 0px;
    margin-bottom: 5px;
    font-size: 0.85em;
  }

  div:nth-child(2) > p:first-of-type {
    margin: 0px;
    padding: 8px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #f0f0f0;
    font-size: 0.9em;
    width: 10ch;
    transition: background-color 0.2s, color 0.2s;

    :hover {
      background-color: black;
      color: white;
    }
  }

  div:nth-child(2) > p:nth-last-of-type(1) {
    margin: 0px;
    font-size: 0.7em;
    color: #434242;
  }
`;

function Dropzone(
  { children, removeAllFiles, multiple = false, ...rest }: DropzoneProps,
  ref: ForwardedRef<any>,
) {
  const fileChoosen = children.props?.dataUrls?.length;
  const imageUrlProvided = children.props?.httpUrls?.length;

  return (
    <AreaAndPreviewContainer>
      <div ref={ref}>
        {multiple || !fileChoosen ? (
          imageUrlProvided && !multiple ? null : (
            <DropArea {...rest}>
              <div>
                <p>Drap & Drop files here</p>
                <p>or</p>
              </div>
              <div>
                <p>Browse</p>
                <p>to upload</p>
              </div>
            </DropArea>
          )
        ) : null}
      </div>

      {!multiple && children.props?.dataUrls?.length === 1 ? (
        <DropArea {...rest}>{children}</DropArea>
      ) : null}

      {!multiple && children.props?.httpUrls?.length === 1 ? (
        <DropArea {...rest}>{children}</DropArea>
      ) : null}

      {multiple ? children : null}
    </AreaAndPreviewContainer>
  );
}

export default forwardRef(Dropzone);
