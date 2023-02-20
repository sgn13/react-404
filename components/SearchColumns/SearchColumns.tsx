import Input from "components/Input/Input";
import React, { useEffect, useState } from "react";

const SearchColumns = ({
  items,
  onCheckboxStateChange,
  searchColumnsKeysRef,
}: {
  items: { position: number; title: string; queryKey: string; checked: boolean }[];
  onCheckboxStateChange: Function;
  searchColumnsKeysRef: any;
}) => {
  const [columns, setColumns] = useState(items);

  const getSearchColumns = (newColumns) =>
    newColumns.filter((item) => item.checked)?.map((item) => item?.queryKey);

  const handleCheckboxChange = (item) => {
    const newColumns = columns.map((i) =>
      i.queryKey === item.queryKey ? { ...i, checked: !i.checked } : i,
    );
    const checkedBoxes = getSearchColumns(newColumns);
    onCheckboxStateChange(checkedBoxes);
    setColumns(newColumns);
  };

  useEffect(() => {
    searchColumnsKeysRef.current = getSearchColumns(items);
  }, []);

  const list = columns.map((item) => {
    return (
      <li
        key={item?.queryKey}
        style={{ display: "flex", alignItems: "center", flexGrow: 1, flexBasis: "50%" }}
      >
        <Input
          type="checkbox"
          checked={item.checked}
          value={item?.checked}
          style={{ width: 20, marginRight: "1ch", outline: "none", accentColor: "#cd171f" }}
          onChange={() => handleCheckboxChange(item)}
        />
        <label>{item.title}</label>
      </li>
    );
  });

  return (
    <div style={{ width: 280, fontFamily: "Poppins", paddingBottom: "5px" }}>
      <div style={{ padding: "10px 0px" }}>
        <p style={{ fontStyle: "bold", fontSize: "1.2rem" }}>Search Columns </p>
      </div>
      <hr />
      <br />
      <ul style={{ display: "flex", flexWrap: "wrap" }}>{list}</ul>
    </div>
  );
};

export default SearchColumns;
