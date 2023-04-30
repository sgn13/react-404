import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShowWithAnimation from "containers/ShowWithAnimation/index";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbArrowNarrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RightArrow = styled(TbArrowNarrowRight)<{ iconOnlyMode?: boolean }>`
  transition: 0.3s transform ease-out;
  ${({ iconOnlyMode }) => (iconOnlyMode ? null : `transform: rotate(180deg);`)}
`;

const ArrowIcon = styled(MdOutlineKeyboardArrowRight)<{ isCollapsed?: any }>`
  transition: 0.2s transform ease-out;
  ${({ isCollapsed }) => (isCollapsed ? null : `transform: rotate(90deg);`)}
`;

const SidebarContainer = styled.span`
  text-align: left;
`;

const List = styled.ul`
  list-style: none;
  margin: 0px;
  margin-left: 16px;
  padding: 0px;
`;

const ListItem = styled.li<{ isSelected?: boolean }>`
  list-style: none;
  transition: 0.25s background-color ease-out;
  background-color: ${({ isSelected }) => (isSelected ? "#efc35c2a" : "auto")};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc63;
  padding: 0.5em;
  color: black;

  & > figure {
    margin: 0px;
    padding-left: 1ch;
    padding-right: 1ch;
  }

  white-space: nowrap;
`;

const IconAndNode = styled.div`
  width: 30ch;
  text-overflow: ellipsis;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
`;

const SidebarItem = ({
  data = {},
  nodeKey,
  level = 1,
  collapsedIds,
  handleClick,
  selectedItem,
  iconOnlyMode,
}) => {
  const dataHasChildren = data?.children && data?.children.length;
  return (
    <>
      <ListItem
        data-item-id={`${data?.id}`}
        onClick={() => handleClick(data)}
        isSelected={selectedItem?.label === data?.label}
      >
        <StyledLink style={{ pointerEvents: dataHasChildren ? "none" : "auto" }} to={data.path}>
          <IconAndNode>
            <span
              id="my-tooltip"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={iconOnlyMode ? data[nodeKey] : null}
            >
              {data?.icon}
            </span>
            <span>{data[nodeKey]}</span>
          </IconAndNode>
          {iconOnlyMode ? null : (
            <figure style={{ width: "min-content" }}>
              {dataHasChildren ? (
                <ArrowIcon isCollapsed={new Set(collapsedIds).has(data.id)} />
              ) : null}
            </figure>
          )}
        </StyledLink>
      </ListItem>

      {new Set(collapsedIds).has(data.id) ? null : (
        <ShowWithAnimation isMounted={!new Set(collapsedIds).has(data.id)}>
          <List>
            {dataHasChildren
              ? data.children.map((item) => (
                  <SidebarItem
                    key={item.id}
                    data-item-id={`${data?.id}`}
                    data={item}
                    nodeKey={nodeKey}
                    level={level + 1}
                    collapsedIds={collapsedIds}
                    handleClick={handleClick}
                    selectedItem={selectedItem}
                    iconOnlyMode={iconOnlyMode}
                  />
                ))
              : null}
          </List>
        </ShowWithAnimation>
      )}
    </>
  );
};

function DropdownSidebar({ width, iconSize = 40, setWidth, data, nodeKey, setSidebarWidth }) {
  const isArray = Array.isArray(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [collapsedIds, setCollapsedIds] = useState(new Set([]));
  const [previousWidth, setPreviousWidth] = useState(width);

  // const handleClickDelegation = (e) => {
  //   let itemId = e.target.getAttribute("data-item-id");
  //   if (itemId) {
  //     const selected = data.findNode((item) => String(item?.id) === String(itemId));
  //     setSelectedItem(selected);
  //     handleClick(selected);
  //   }
  // };

  const handleClick = (item) => {
    setSelectedItem(item);
    const isNode = item?.children && item.children.length;
    if (isNode) {
      handleCollpaseChange(item.id);
      // console.log("node is clicked", item);
    }
    const isLeaf = !isNode;
    // or
    // const isLeaf = !item?.children || !item.children.length;
    if (isLeaf) {
      // console.log("leaf is clicked", item);
    }
    // history.push(item.path);
  };

  const handleCollpaseChange = (id: any) => {
    const newSet = new Set(collapsedIds);
    // toggling sidebar items
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCollapsedIds(newSet);
  };

  // traverse tree data and find Node where collapsed is true then set the collapsedIds.
  useEffect(() => {
    if (!data) return;
    const result = data.filterNode((item) => item?.collasped);
    const resultIds = result.map((item) => item.id);
    const ids = new Set([...collapsedIds, ...resultIds]);
    setCollapsedIds(ids);
  }, []);

  // setting first item as selected Item
  useEffect(() => {
    if (data && data[0]) setSelectedItem(data[0]);
  }, []);

  if (!nodeKey) return <div>Please Provide Node Key Name</div>;

  const toggleSidebar = () => {
    if (width === iconSize) {
      setWidth(previousWidth);
      setSidebarWidth(previousWidth);
      return;
    } else {
      setPreviousWidth(width);
      setWidth(iconSize);
      setSidebarWidth(iconSize);
    }
  };

  return (
    <SidebarContainer
    // onClick={handleClickDelegation}
    >
      {isArray ? (
        data.map((item) => (
          <SidebarItem
            key={`$${item.label}-${item.path}`}
            data={item}
            data-item={JSON.stringify(data)}
            nodeKey={nodeKey}
            collapsedIds={collapsedIds}
            handleClick={handleClick}
            selectedItem={selectedItem}
            iconOnlyMode={width === iconSize}
          />
        ))
      ) : (
        <SidebarItem
          data={data}
          data-item={JSON.stringify(data)}
          nodeKey={nodeKey}
          collapsedIds={collapsedIds}
          handleClick={handleClick}
          selectedItem={selectedItem}
          iconOnlyMode={width === iconSize}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "0.5em",
          marginRight: "0.5em",
        }}
      >
        <RightArrow size={24} iconOnlyMode={width === iconSize} onClick={toggleSidebar} />
      </div>
    </SidebarContainer>
  );
}

export default DropdownSidebar;
