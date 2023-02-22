import React from "react";
import styled from "styled-components";
import { RxCrossCircled } from "react-icons/rx";

import Button, { ButtonComponentProps } from "../Button/Button";
import shadows from "../../constants/css/shadows";
import ReactIcon from "components/ReactIcon/ReactIcon";

type ChipProps = ButtonComponentProps & {
  label: string;
  icon?: string;
  size?: string;
  variant?: string;
  iconWrapperStyle?: any;
  iconSize?: number;
  onClick?: Function;
  onDelete?: Function;
};

const ChipContainer = styled(Button)`
  border: 1px solid red;
  border-radius: 3em;
  display: flex;
  gap: 3px;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;
  font-family: "Poppins";
  padding: 0px 0.6rem;
  height: 32px;
  font-weight: 300;
  box-shadow: ${shadows[1]};
  :hover {
    box-shadow: ${shadows[2]};
  }
`;

function Chip({
  label,
  size,
  variant = "outlined",
  textStyle,
  iconWrapperStyle = {},
  iconSize = 20,
  onDelete = () => {},
  ...rest
}: ChipProps) {
  return (
    <div style={{ display: label ? "block" : "none" }}>
      <ChipContainer
        backgroundColor="transparent"
        noTextShadow
        color="black"
        textStyle={textStyle}
        show={label}
        icon={
          <ReactIcon
            onClick={onDelete}
            color="white"
            hoverColor="white"
            style={{ marginLeft: 5, ...iconWrapperStyle }}
          >
            <RxCrossCircled size={iconSize} />
          </ReactIcon>
        }
        iconRight
        {...rest}
      >
        {label}
      </ChipContainer>
    </div>
  );
}

export default Chip;
