import React from "react";
import styled from "styled-components";
import { RxCrossCircled } from "react-icons/rx";

import Button, { ButtonComponentProps } from "../Button/Button";
import shadows from "../../constants/css/shadows";
import ReactIcon from "../ReactIcon/ReactIcon";
import { Flexbox } from "containers/Grid/Grid";

type ChipProps = ButtonComponentProps & {
  label: string;
  icon?: string;
  iconColor?: string;
  iconColorOnHover?: string;
  size?: string;
  variant?: string;
  iconWrapperStyle?: any;
  iconSize?: number;
  onClick?: Function;
  onDelete?: Function;
};

const ChipContainer = styled(Button)`
  border-radius: 3em;
  display: flex;
  gap: 3px;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;
  font-family: "Poppins";
  padding: 0px 0.4rem;
  height: 32px;
  font-weight: 300;
`;

function Chip({
  label,
  size,
  variant = "outlined",
  textStyle,
  iconWrapperStyle = {},
  iconSize = 20,
  onDelete = () => {},
  backgroundColor,
  color,
  iconColor,
  iconColorOnHover,
  iconRight,
  ...rest
}: ChipProps) {
  return (
    <div style={{ display: label ? "block" : "none" }}>
      <ChipContainer
        backgroundColor={backgroundColor}
        noTextShadow
        color={color}
        textStyle={textStyle}
        icon={
          <ReactIcon
            onClick={onDelete}
            color={iconColor ?? color}
            hoverColor={iconColorOnHover ?? color}
            style={{
              marginLeft: iconRight ? 3 : 0,
              marginRight: iconRight ? 0 : 3,
              backgroundColor: "transparent",
              ...iconWrapperStyle,
            }}
          >
            <RxCrossCircled size={iconSize} />
          </ReactIcon>
        }
        iconRight={iconRight}
        {...rest}
      >
        {label}
      </ChipContainer>
    </div>
  );
}

export default Chip;

export const ChipsDisplay = ({ chips, show }: { info: any; show: number }) => {
  console.log("chips", chips);
  if (!chips || !chips?.length) return null;
  const more = chips.length - show;

  return (
    <Flexbox gap="5px">
      {chips.slice(0, show).map((chipItem) => (
        <Button
          key={chipItem.id}
          backgroundColor="white"
          color="gray"
          style={{ border: "1px solid #cccccc77", borderRadius: "1em" }}
          textStyle={{ fontSize: "1rem" }}
          noTextShadow
          iconSize={18}
          onDelete={() => console.log("deleted")}
          elevation={0}
        >
          {chipItem?.displayName}
        </Button>
      ))}
      {more > 0 ? (
        <Button
          key={"7sfs"}
          backgroundColor="white"
          color="gray"
          style={{ border: "1px solid #cccccc77", borderRadius: "1em" }}
          textStyle={{ fontSize: "1rem" }}
          noTextShadow
          iconSize={18}
          onDelete={() => console.log("deleted")}
          elevation={0}
        >
          {`+${more} more`}
        </Button>
      ) : null}
    </Flexbox>
  );
};
