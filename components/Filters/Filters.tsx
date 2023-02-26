import { useEffect, useState } from "react";
import Select from "components/Select/Select";
import Button from "components/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";
import { getNanoID } from "utils/general";
import Input from "components/Input/Input";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { GrFormDown } from "react-icons/gr";
import debounce from "utils/debounce";
import throttle from "utils/throttle";
import { useSessionStorage } from "hooks/useStorage/useStorage";

const ReactIcon = styled.div<{ color?: string; hoverColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${({ color }) => color ?? "black"};
  }
  svg:hover {
    color: ${({ hoverColor }) => hoverColor ?? "red"};
  }
`;

const StyledSelect = styled.div`
  .highlightOption {
    background-color: #cd171f;
  }
  .multiSelectContainer li:hover {
    background: #cd171f;
  }
`;

const FilterInput = styled(Input)`
  border-radius: 4px;
  border-color: #cbd1cf;
  margin: 0px;
  height: 24px;
  font-size: 1rem;
  box-shadow: none;
`;

type CriteriaItem = { title: string; queryKey: string; type: string };
type ConditionItem = { title?: string; queryKey: string; type: string };
type ValueItem = { type: string; options: { title: string; queryKey: any }[] };

type FilterItem = {
  id: string;
  condition?: string;
  value?: string;
  from?: string;
  to?: string;
} & CriteriaItem & { valueTitle?: Object };

function getFilterItem(): FilterItem {
  return {
    id: getNanoID(),
    title: "",
    queryKey: "",
    type: "",
    condition: "",
    value: "",
    from: "",
    to: "",
  };
}

const id = `${getNanoID()}`;
const initialCriteriaItem: FilterItem = {
  id,
  title: "",
  valueTitle: {},
  queryKey: "",
  type: "",
  condition: "",
  value: "",
  from: "",
  to: "",
};

export const getFiltersKeys = (filters) =>
  filters
    .filter((item) => item.title)
    ?.reduce((acc, curr) => {
      if (curr.condition === "=") {
        // for numbers and strings
        acc[curr.queryKey] = curr.value;
      } else {
        // only for numbers
        acc[curr.queryKey] = `${curr.condition}${curr.value}`;
      }
      return acc;
    }, {});

function Filters({
  filterName,
  criterias,
  conditions,
  values,
  onApply,
  onFilterChange,
}: {
  criterias: CriteriaItem[];
  conditions: ConditionItem[];
  values: ValueItem[];
  onFilterChange: Function;
  onApply: Function;
}) {
  const [filters, setFilters, removeFilters] = useSessionStorage<FilterItem[]>(
    `${filterName}-filters`,
    [initialCriteriaItem],
  );

  const [remainingCriterias, setRemainingCriterias] = useState<CriteriaItem[]>([]);

  // initialize with empty filters when menu is mounted no saved filters available
  useEffect(() => {
    if (filters?.length === 0) setFilters([initialCriteriaItem]);
  }, []);

  // only show criterias which have not been previously selected
  useEffect(() => {
    if (!filters || !filters.length || !criterias.length) return;

    const filtersTitles = filters.reduce((acc, curr) => {
      if (curr.title) acc.push(curr.title);
      return acc;
    }, []);
    const result = criterias.filter((item) => !filtersTitles.includes(item.title));
    setRemainingCriterias(result);
  }, [filters, criterias]);

  useEffect(() => {
    if (!onFilterChange) return;
    const initialFiltersState = getFiltersKeys(filters);
    onFilterChange(initialFiltersState);
  }, [filters]);

  const addNewFilter = () => {
    setFilters((prev) => [...prev, getFilterItem()]);
  };

  const removeFilter = (remove: FilterItem) =>
    setFilters((prev) => prev.filter((item) => item.id !== remove.id));

  const handleCriteriaSelect = (criterias: CriteriaItem[], filter: FilterItem) => {
    const current = criterias[0];
    if (["string", "boolean"].includes(current.type)) {
      // need to auto set condition because condition select would be disabled
      setFilters((prev) =>
        prev.map((p) => (p.id === filter.id ? { ...p, ...current, condition: "=" } : p)),
      );
    } else {
      setFilters((prev) => prev.map((p) => (p.id === filter.id ? { ...p, ...current } : p)));
    }
  };

  const handleConditionSelect = (conditions: ConditionItem[], filter: FilterItem) => {
    const current = conditions[0];
    setFilters((prev) =>
      prev.map((p) => (p.id === filter.id ? { ...p, condition: current.queryKey } : p)),
    );
  };

  const handleValueChange = (value: any, filter: FilterItem) => {
    setFilters((prev) => prev.map((p) => (p.id === filter.id ? { ...p, value } : p)));
  };

  const handleValueSelect = (value: any, filter: FilterItem) => {
    const current = value[0];
    setFilters((prev) =>
      prev.map((p) =>
        p.id === filter.id ? { ...p, value: current.queryKey, valueTitle: current?.valueTitle } : p,
      ),
    );
  };

  const getCondition = (item: FilterItem) => {
    const conditionMap = {
      number: (
        <Select
          singleSelect
          selectedValues={conditions.filter((f) => f.queryKey === item.condition)}
          options={conditions.filter((item: ConditionItem) => item.type === "number")}
          displayValue="title"
          placeholder="Select Condition"
          style={{
            searchBox: { minWidth: 170 },
            chips: {
              marginBottom: 0,
            },
          }}
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
          onSelect={(conditions: ConditionItem[]) => handleConditionSelect(conditions, item)}
        />
      ),

      string: (
        <Select
          singleSelect
          isObject={false}
          displayValue="title"
          placeholder="Select Condition"
          selectedValues={["Equals to"]}
          disable
          style={{
            searchBox: { minWidth: 170 },
            chips: {
              marginBottom: 0,
            },
          }}
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
        />
      ),

      boolean: (
        <Select
          singleSelect
          isObject={false}
          displayValue="title"
          placeholder="Select Condition"
          selectedValues={["Equals to"]}
          disable
          style={{
            searchBox: { minWidth: 170 },
            chips: {
              marginBottom: 0,
            },
          }}
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
        />
      ),
    };
    return conditionMap[item.type];
  };

  const getValue = (item: FilterItem) => {
    const valueMap = {
      boolean: (
        <Select
          singleSelect
          options={values.filter((item) => item.type === "boolean")[0].options}
          displayValue="valueTitle"
          placeholder="Select Value"
          style={{
            searchBox: { minWidth: 170 },
            chips: {
              marginBottom: 0,
            },
          }}
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
          onSelect={(values: []) => handleValueSelect(values, item)}
          selectedValues={[{ valueTitle: item?.valueTitle, queryKey: item?.queryKey }]}
        />
      ),
      string: (
        <FilterInput
          name={"name"}
          inputSize="sm"
          textSize="sm"
          placeholder="Enter Value"
          // onChange={debounce((e) => {
          //   const { value } = e.target;
          //   handleValueChange(value, item);
          // }, 400)}
          onChange={(e) => {
            const { value } = e.target;
            handleValueChange(value, item);
          }}
          value={item.value}
        />
      ),
      number: (
        <FilterInput
          type="number"
          disabled={!item.condition}
          name={"name"}
          inputSize="sm"
          textSize="sm"
          placeholder="Enter Value"
          // onChange={debounce((e) => {
          //   const { value } = e.target;
          //   handleValueChange(value, item);
          // }, 400)}
          onChange={(e) => {
            const { value } = e.target;
            handleValueChange(value, item);
          }}
          value={item.value}
        />
      ),
    };
    return valueMap[item.type];
  };

  const filterList = filters.map((item: FilterItem) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        marginBottom: 5,
      }}
    >
      <StyledSelect>
        <Select
          singleSelect
          selectedValues={item.title ? filters.filter((f) => f.title === item.title) : []}
          options={remainingCriterias}
          displayValue="title"
          placeholder="Select Criteria"
          style={{
            searchBox: { minWidth: 170 },
            chips: {
              marginBottom: 0,
            },
          }}
          onSelect={(criteria: CriteriaItem[]) => {
            handleCriteriaSelect(criteria, item);
          }}
          arrowIcon
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
        />
      </StyledSelect>

      {getCondition(item) || (
        <Select
          singleSelect
          options={conditions.filter((item: ConditionItem) => item.type === "number")}
          displayValue="title"
          placeholder="Select Condition"
          disable
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
        />
      )}

      {getValue(item) || (
        <Select
          singleSelect
          isObject={false}
          options={values.filter((item: ValueItem) => item.type === "boolean")[0].options}
          displayValue="title"
          placeholder="Select Value"
          disable
          customArrow={
            <ReactIcon style={{ width: 20 }}>
              <GrFormDown size={20} />
            </ReactIcon>
          }
        />
      )}

      <Button
        size="sm"
        backgroundColor="transparent"
        backgroundColorOnHover="#f0ebeb"
        style={{
          margin: 0,
          padding: 4,
          border: "1px solid #CCC",
        }}
      >
        <ReactIcon
          color="#a8a6a6"
          hoverColor="red"
          onClick={(e) => {
            e.stopPropagation();
            removeFilter(item);
          }}
        >
          <TiDeleteOutline size={24} style={{ marginRight: 0 }} />
        </ReactIcon>
      </Button>
    </div>
  ));

  return (
    <div style={{ width: 580, fontFamily: "Poppins", paddingBottom: "5px" }}>
      <div style={{ padding: "10px 0px" }}>
        <p style={{ fontStyle: "bold", fontSize: "1.2rem" }}>Advanced Filter </p>
      </div>
      <hr />
      <br />
      <ul>{filterList}</ul>
      <div style={{ margin: "10px 0px" }}>
        <Button
          size="sm"
          backgroundColor="transparent"
          color="#cd171f"
          noTextShadow
          noRipple
          icon={<IoMdAddCircleOutline style={{ marginRight: "0.3rem" }} size={20} fill="#cd171f" />}
          style={{ paddingLeft: "0px" }}
          onClick={addNewFilter}
        >
          Add Filter
        </Button>
        <hr />

        <Button
          style={{ marginTop: 10, marginLeft: "auto" }}
          size="sm"
          backgroundColor="#cd171f"
          onClick={() => {
            const filtersKeys = getFiltersKeys(filters);
            onApply(filtersKeys);
          }}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default Filters;
