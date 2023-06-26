import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbArrowNarrowRight } from "react-icons/tb";
import { Link } from "react-router-dom";

import ShowWithAnimation from "src/containers/ShowWithAnimation/index";
import styled from "styled-components";

const textColor = "#a9b9d0";
const selectedTextColor = "#ECF0F6";
const childrenBackgroundColor = "#08367B";
const selectedSidebarBackgroundColor = "#052A63";

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
// background: linear-gradient(45deg, #101828 0%, #164996 100%);

const List = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  background-color: transparent;
  background: none;

  & > li {
    background-color: ${childrenBackgroundColor};
  }
`;

const ListItem = styled.li<{ isSelected?: boolean; level?: number }>`
  list-style: none;
  transition: 0.25s background-color ease-out;
  background-color: transparent;
  background: none;
  background-color: ${({ isSelected }) => (isSelected ? selectedSidebarBackgroundColor : "auto")};
  padding-left: ${({ level }) => (level > 1 ? 16 : 0)}px;

  &:hover {
    background-color: ${selectedSidebarBackgroundColor};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  color: black;
  background-color: transparent;
  background: none;

  & > figure {
    margin: 0px;
    padding-left: 1ch;
    padding-right: 1ch;
  }

  white-space: nowrap;
`;

const IconAndNode = styled.div<{ isSelected?: boolean }>`
  width: 30ch;
  text-overflow: ellipsis;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
  background-color: transparent;
  background: none;
  color: ${({ isSelected }) => (isSelected ? selectedTextColor : textColor)};
  font-size: 1em;
  font-family: Poppins;
  font-weight: 500;
  padding-top: 4px;
  padding-bottom: 4px;
`;

function SidebarItem({
  data = {},
  nodeKey,
  level = 1,
  collapsedIds,
  handleClick,
  selectedItem,
  iconOnlyMode,
}) {
  const dataHasChildren = data?.children && data?.children.length;
  return (
    <>
      <ListItem
        data-item-id={`${data?.id}`}
        onClick={(e) => handleClick(e, data)}
        isSelected={selectedItem?.label === data?.label}
        level={level}
      >
        <StyledLink style={{ pointerEvents: dataHasChildren ? "none" : "auto" }} to={data.path}>
          <IconAndNode isSelected={selectedItem?.label === data?.label}>
            <span
              id="my-tooltip"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={iconOnlyMode ? data[nodeKey] : null}
              style={{ display: "flex", alignItems: "center" }}
            >
              {data?.icon ? <img style={{ maxWidth: 24 }} src={data?.icon} alt="icon" /> : null}
            </span>
            <span>{data[nodeKey]}</span>
          </IconAndNode>
          {iconOnlyMode ? null : (
            <figure style={{ width: "min-content" }}>
              {dataHasChildren ? (
                <ArrowIcon
                  size={24}
                  color={selectedItem?.label === data?.label ? selectedTextColor : textColor}
                  isCollapsed={new Set(collapsedIds).has(data.id)}
                />
              ) : null}
            </figure>
          )}
        </StyledLink>
      </ListItem>

      {new Set(collapsedIds).has(data.id) ? null : (
        <ShowWithAnimation
          style={{ backgroundColor: childrenBackgroundColor }}
          isMounted={!new Set(collapsedIds).has(data.id)}
        >
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
}

function DropdownSidebar({
  width,
  iconSize = 40,
  toggleSidebar,
  setWidth,
  data,
  nodeKey,
  setSidebarWidth,
}) {
  const isArray = Array.isArray(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [collapsedIds, setCollapsedIds] = useState(new Set([]));
  const [sidebarItems, setSidebarItems] = useState([]);

  // const handleClickDelegation = (e) => {
  //   let itemId = e.target.getAttribute("data-item-id");
  //   if (itemId) {
  //     const selected = data.findNode((item) => String(item?.id) === String(itemId));
  //     setSelectedItem(selected);
  //     handleClick(selected);
  //   }
  // };

  const handleClick = (e, item) => {
    setSelectedItem(item);
    const isNode = item?.children && item.children.length;
    if (isNode) {
      // console.log("node is clicked", item.id);
      handleCollpaseChange(item.id);
      // console.log("node is clicked", item);
    }
    const isLeaf = !isNode;
    // or
    // const isLeaf = !item?.children || !item.children.length;
    if (isLeaf) {
      // console.log("leaf is clicked", item.id);
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

  useEffect(() => {
    if (!data || !data?.length) return;
    setSidebarItems(data);
  }, [data]);

  // traverse tree data and find Node where collapsed is true then set the collapsedIds.
  useEffect(() => {
    if (!sidebarItems) return;
    const result = sidebarItems.filterNode((item) => item?.collasped);
    const resultIds = result.map((item) => item.id);
    const ids = new Set([...collapsedIds, ...resultIds]);
    setCollapsedIds(ids);
  }, [sidebarItems]);

  // setting first item as selected Item
  useEffect(() => {
    if (sidebarItems && sidebarItems[0]) setSelectedItem(sidebarItems[0]);
  }, []);

  if (!nodeKey) return <div>Please Provide Node Key Name</div>;

  return (
    <SidebarContainer
    // onClick={handleClickDelegation}
    >
      {width === iconSize ? null : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "64px",
            marginTop: "25px",
          }}
        >
          <img src={"/logo.svg"} alt="logo" />
        </div>
      )}
      {isArray ? (
        sidebarItems.map((item) => (
          <SidebarItem
            key={`$${item.label}-${item.path}`}
            data={item}
            data-item={JSON.stringify(sidebarItems)}
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
          data-item={JSON.stringify(sidebarItems)}
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
          marginTop: "1em",
          marginRight: "1em",
        }}
      >
        <RightArrow size={24} iconOnlyMode={width === iconSize} onClick={toggleSidebar} />
      </div>
    </SidebarContainer>
  );
}

export default DropdownSidebar;
