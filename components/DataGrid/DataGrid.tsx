import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Table from "containers/Table/Table";
import Header from "containers/Table/Header";
import styled from "theme/styled";
import { useNavigate } from "react-router-dom";
import app from "constants/app";
import { Buffering } from "components/Spinner/Spinner";
import { DeleteModal } from "components/Modal/Index";
import { defaultQuery } from "constants/query";
import Pagination from "components/PageNumbers/Pagination";
import Search from "components/Search/Search";
import Button from "components/Button/Button";
import { CiEdit, CiFilter } from "react-icons/ci";
import { BiColumns } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import DropdownMenu from "components/DropdownMenu/DropDown";

import SearchColumns, { getSearchColumns } from "components/SearchColumns/SearchColumns";
import Filters from "components/Filters/Filters";
import { AiOutlineDelete, AiOutlineExport } from "react-icons/ai";
import Chip from "components/Chip/Chip";
import { useSessionStorage } from "hooks/useStorage/useStorage";
import { SlReload } from "react-icons/sl";
import { RxReset } from "react-icons/rx";
import { Flexbox } from "containers/Grid/Grid";

import Cell from "containers/Table/Cell";
import ReactIcon from "components/ReactIcon/ReactIcon";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { ChipsDisplay } from "components/Chip/Chip";
import { ThemeContext } from "containers/ReactThemeProvider/ReactThemeProvider";
import { ThemeType } from "theme";

const actionIconsColor = "#cd171f";
const DataGridContainer = styled.div`
  margin: 10px;
`;
const ActionContainer = styled.div`
  max-width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
`;

const PageNumbers = styled(Pagination)`
  .page-number {
  }
`;

const GridButton = styled(Button).attrs({
  fill: "white",
  backgroundColor: "#cd171f",
})`
  border-radius: 8px;
  color: white;
  padding: 0.5rem 1rem;
`;

const Toolbar = styled.div`
  /* border: 1px solid gray; */
  background-color: #f7f7f7;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;
`;

const TableName = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  color: white;
  padding: 0.5em;

  background-color: #cd171f;
  margin-right: auto;
  width: fit-content;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Chips = styled.div`
  display: flex;
  gap: 5;
`;

const PerPageSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > label {
    margin-right: 10px;
    font-family: "Poppins";
    font-weight: 300;
  }
`;

const TablePagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f7f7f7;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TableActions = styled.div`
  display: flex;
  gap: 5px;
`;

const loader = (
  <Buffering color="red">
    {new Array(12).fill(0).map((item) => (
      <div />
    ))}
  </Buffering>
);

export type columnItem = {
  accessorKey: string;
  header: string;
  // cell: string;
  // footer?: string;
};

const VisibilityController = ({
  children,
  visible = true,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => (visible ? children : null);

function DataGrid({
  tableName = "Table",
  data = [],
  dataColumns = [],
  isLoading,
  isSubmitting,
  metadata,
  fetcher = () => {},
  searchColumns,
  criteriaOptions,
  conditionOptions,
  valueOptions,
  onDelete,
  onView,
  onUpdate,
  onAdd,
  entityName = "entityName",
  theme,
}: {
  tableName?: string;
  dataColumns?: Array<any>;
  data?: Array<any>;
  fetcher?: Function;
  isSubmitting?: boolean;
  isLoading?: boolean;
  metadata?: any;
  searchColumns?: any[];
  criteriaOptions?: any[];
  conditionOptions?: any[];
  valueOptions?: any[];
  onDelete?: Function;
  onView?: Function;
  onUpdate?: Function;
  onAdd?: Function;
  entityName?: string;
  theme: ThemeType;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(defaultQuery.page);
  const [perPage, setPerPage] = useState<any>(defaultQuery.perPage);
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchColumnsKeysRef = useRef(null);
  const [sort, setSort, removeSort] = useSessionStorage(`${tableName}-sort`, "");
  const [filters, setFilters] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchKey, setSearchKey, removeSearchKey] = useSessionStorage(
    `${tableName}-searchkey`,
    "",
  );

  const handleModalClose = () => setShowModal(null);

  // initialize searchColumns
  useEffect(() => {
    searchColumnsKeysRef.current = getSearchColumns(searchColumns);
  }, []);

  useEffect(() => {
    fetcher({});
  }, []);

  const getFeaturesQueries = () => {
    // features refers to search, sort and filtering.
    let featuresQueries = {};
    if (sort) {
      const sortJson = JSON.parse(sort);
      featuresQueries = { ...featuresQueries, ...sortJson };
    }

    if (searchKey) {
      featuresQueries = {
        ...featuresQueries,
        search: searchKey,
        searchColumns: searchColumnsKeysRef.current || [],
      };
    }

    if (isFiltered) {
      featuresQueries = { ...featuresQueries, ...filters };
    }

    return featuresQueries;
  };

  const handlePerPageChange = (e) => {
    const currentPage = e.target.value;
    setPerPage(currentPage);
    setPage(defaultQuery.page);

    let selectQueries = {
      page: defaultQuery.page,
      perPage: currentPage,
    };

    const features = getFeaturesQueries();

    fetcher({
      query: { ...selectQueries, ...features },
    });
  };

  const handlePageChange = (page: string) => {
    let pageNumber = Number(page);
    setPage(pageNumber);
    let paginationQuery = {
      page: pageNumber,
      perPage,
    };

    const features = getFeaturesQueries();

    fetcher({
      query: { ...paginationQuery, ...features },
    });
  };

  const reload = () => {
    let reloadQuery = {
      page,
      perPage,
    };
    const features = getFeaturesQueries();
    fetcher({
      query: { ...reloadQuery, ...features },
    });
  };

  const reset = () => {
    fetcher({
      query: {
        page: defaultQuery.page,
        perPage: defaultQuery.perPage,
      },
    });
    setPage(defaultQuery.page);
    setPerPage(defaultQuery.perPage);
  };

  // keeping for reference
  // useEventListener("storage", handleStorageChange);
  // const handleChipDelete = () => {
  //   if (tableStatus?.dataType) {
  //     window.sessionStorage.removeItem(tableStatus.dataType);
  //     window.dispatchEvent(new Event("storage"));
  //   }
  // };

  const getViewButton = (info) => (
    <Button
      onClick={() => {
        if (onView) onView(info?.row);
      }}
      style={{ padding: 0, display: onView ? "block" : "none" }}
      backgroundColor="transparent"
      borderColorOnHover={actionIconsColor}
    >
      <ReactIcon
        color="gray"
        hoverColor={actionIconsColor}
        style={{ backgroundColor: "transparent" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          font-size="1.5rem"
          width="0.9em"
          height="0.9em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
          ></path>
        </svg>
      </ReactIcon>
    </Button>
  );

  const getUpdateButton = (info) => (
    <Button
      onClick={() => {
        if (onUpdate) onUpdate(info?.row);
      }}
      style={{ padding: 0, display: onUpdate ? "block" : "none" }}
      backgroundColor="transparent"
    >
      <ReactIcon
        color="gray"
        hoverColor={actionIconsColor}
        style={{ backgroundColor: "transparent" }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1.6rem"
          width="1.6rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            d="M11.9955241,8.33576576 L15.4932862,11.8335278 L11.9955241,8.33576576 Z M17.5365751,7.79609426 C17.9262629,8.18578207 17.9321949,8.81165877 17.5321697,9.21168397 L10.0807224,16.6631313 L6,17.829052 L7.16592069,13.7483296 L14.617368,6.29688224 C15.0094888,5.90476144 15.6393004,5.89881957 16.0329577,6.29247691 L17.5365751,7.79609426 Z"
          ></path>
        </svg>
      </ReactIcon>
    </Button>
  );

  const getDeleteButton = (info) => (
    <Button
      onClick={() => {
        setSelectedItem(info.row.original);
        setShowModal("delete");
      }}
      style={{ padding: 0, display: onDelete ? "block" : "none" }}
      backgroundColor="transparent"
    >
      <ReactIcon
        color="gray"
        hoverColor={actionIconsColor}
        style={{ backgroundColor: "transparent" }}
      >
        <MdOutlineDelete size={22} />
      </ReactIcon>
    </Button>
  );

  const columns = useMemo(() => {
    const firstColumn = {
      // accessorFn:()=>{}
      accessorKey: "serial",
      header: "#",
      cell: (info: any) => info.getValue(),
    };

    const middleColumns = dataColumns.map((item) => ({
      accessorKey: item?.accessorKey,
      header: (info: any) => (
        <Header
          headerId={info.header.id}
          sort={sort ? JSON.parse(sort) : undefined}
          setSort={setSort}
        >
          {item?.header}
        </Header>
      ),
      cell: ["Permission Set", "Assigned To"].includes(item?.header)
        ? (info: any) => <ChipsDisplay chips={info.getValue() || []} show={3} />
        : (info: any) => <Cell>{info.getValue()}</Cell>,
      footer: null,
    }));

    const lastColumn = {
      accessorKey: null,
      // header: <HeaderCell>Actions</HeaderCell>,
      header: "Actions",
      cell: (info: any) => {
        return (
          <ActionContainer>
            {getViewButton(info)}
            {getUpdateButton(info)}
            {getDeleteButton(info)}
          </ActionContainer>
        );
      },
    };

    return [firstColumn, ...middleColumns, lastColumn];
  }, [dataColumns, sort]);

  const handleSearch = ({
    searchQuery,
    searchColumns,
  }: {
    searchQuery?: string;
    filterQueries?: any;
  }) => {
    if (searchQuery) {
      const firstTimeSearch = !searchKey;
      fetcher({
        query: {
          search: searchQuery,
          searchColumns,
          page: firstTimeSearch ? defaultQuery.page : page,
          perPage: firstTimeSearch ? defaultQuery.perPage : perPage,
        },
      });
      setSearchKey(searchQuery);
    }
  };

  const deleteModal = (
    <DeleteModal
      name="User"
      show={showModal === "delete"}
      onClose={handleModalClose}
      isSubmitting={isSubmitting}
      onClick={async () => {
        if (!selectedItem) return;

        // if (
        //   await deleteLiveClient({
        //     userId: selectedItem?.id,
        //   })
        // ) {
        //   handleModalClose();
        //   fetcher({ query: { page, perPage } });
        // }
      }}
    />
  );

  const columnDropdown = (
    <DropdownMenu
      list={
        <SearchColumns
          items={searchColumns}
          onCheckboxStateChange={(keys) => {
            searchColumnsKeysRef.current = keys;
          }}
          searchColumnsKeysRef={searchColumnsKeysRef}
        />
      }
      offsetTop={46.5}
      closeOnOutsideClick
    >
      {({ toggle }) => {
        return (
          <GridButton
            title="Search Setting"
            size="sm"
            icon={<BiColumns size={24} fill="white" />}
            onClick={toggle}
          ></GridButton>
        );
      }}
    </DropdownMenu>
  );

  const search = (
    <Search
      initialValue={searchKey}
      openSearchOnMount={!!searchKey}
      onEnter={(searchValue = "null") => {
        handleSearch({
          searchQuery: searchValue,
          searchColumns: searchColumnsKeysRef.current || [],
        });
      }}
      onSearchClose={() => {
        removeSearchKey();
        fetcher({});
      }}
      searchContainerStyle={{
        marginLeft: 0,
        marginRight: 0,
      }}
      color={"#cd171f"}
      style={{ fontSize: "1.2em", width: "100%" }}
    />
  );

  const filterDropdown = (
    <DropdownMenu
      list={
        <Filters
          filterName={tableName}
          criterias={criteriaOptions}
          conditions={conditionOptions}
          values={valueOptions}
          onFilterChange={(queries) => {
            setFilters(queries);
            setIsFiltered(false);
          }}
          onApply={async (filters) => {
            if (
              await fetcher({
                query: filters,
                page: defaultQuery.page,
                perPage: defaultQuery.perPage,
              })
            ) {
              setIsFiltered(true);
            }
          }}
        />
      }
      offsetTop={46.5}
      closeOnOutsideClick
    >
      {({ toggle }) => {
        return (
          <GridButton
            title="Filter"
            size="sm"
            icon={<CiFilter size={24} fill="white" />}
            onClick={toggle}
          >
            Filter
          </GridButton>
        );
      }}
    </DropdownMenu>
  );

  const chips = (
    <Chips>
      <Chip
        label={sort ? `Sorted` : ""}
        onDelete={() => {
          removeSort();
          reset();
        }}
        iconSize={16}
        backgroundColor="#f4182319"
        color="#cd1720"
        shadowOnHover="0 0 0.1rem #e04a52dd"
        size="sm"
        style={{ border: "0.1px solid #cccccc80", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.9rem" }}
        iconWrapperStyle={{}}
      />

      <Chip
        label={searchKey ? `Searched` : ""}
        onDelete={() => {
          removeSearchKey();
          reset();
        }}
        iconSize={16}
        backgroundColor="#f4182319"
        color="#cd1720"
        shadowOnHover="0 0 0.1rem #e04a52dd"
        size="sm"
        style={{ border: "none", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.9rem" }}
        iconWrapperStyle={{}}
      />

      <Chip
        label={isFiltered ? `Filtered` : ""}
        onDelete={() => {
          setFilters(null);
          setIsFiltered(false);
          window.sessionStorage.removeItem("filters");
          reset();
        }}
        iconSize={16}
        backgroundColor="#f4182319"
        color="#cd1720"
        shadowOnHover="0 0 0.1rem #e04a52dd"
        size="sm"
        style={{ border: "none", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.9rem" }}
        iconWrapperStyle={{}}
      />
    </Chips>
  );

  const tableActions = (
    <TableActions>
      <GridButton
        size="sm"
        icon={<AiOutlineExport style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
      >
        Export
      </GridButton>
      <GridButton
        size="sm"
        icon={<RxReset style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
        onClick={reset}
      >
        Reset
      </GridButton>
      <GridButton
        size="sm"
        icon={<SlReload style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
        onClick={reload}
      >
        Reload
      </GridButton>
      <GridButton
        size="sm"
        icon={<IoMdAddCircleOutline style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
        onClick={onAdd}
      >
        {entityName}
      </GridButton>
    </TableActions>
  );

  const pagination = (
    <TablePagination>
      <PerPageSelect>
        <label>Rows per page</label>
        <select style={{ height: 25 }} value={perPage} onChange={handlePerPageChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </PerPageSelect>

      <PageNumbers
        totalCount={metadata?.totalCount || 0}
        currentPage={page}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </TablePagination>
  );

  return (
    <DataGridContainer>
      {deleteModal}
      <Toolbar>
        <Flexbox fluidWidth justifyContent="space-between" alignItems="center">
          <Flexbox alignItems="center" gap="10px" style={{ marginBottom: "0.4em" }}>
            {columnDropdown}
            {search}
            {filterDropdown}
          </Flexbox>
          {chips}
        </Flexbox>
        <Flexbox justifyContent="space-between" alignItems="center" style={{ textAlign: "center" }}>
          <TableName>{tableName} </TableName>
          {tableActions}
        </Flexbox>
      </Toolbar>
      <Table
        backgroundColor={theme.color.secondary.default}
        loader={loader}
        isLoading={isLoading}
        dataSource={data}
        columns={columns}
      />
      {pagination}
    </DataGridContainer>
  );
}

export default DataGrid;
