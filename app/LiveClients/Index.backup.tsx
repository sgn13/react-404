import React, { useEffect, useMemo, useRef, useState } from "react";
import Table from "containers/Table/Table";
import Header from "containers/Table/Header";
import Cell from "containers/Table/Cell";
import styled from "theme/styled";
import { connect, ConnectedProps } from "react-redux";
import { setMe } from "store/app/actions";
import { deleteLiveClient, fetchLiveClients } from "store/liveClient/actions";
import { AppState } from "store/reducer";
import { useNavigate } from "react-router-dom";
import app from "constants/app";
import { Buffering } from "components/Spinner/Spinner";
import { DeleteModal } from "components/Modal/Index";
import { defaultQuery } from "constants/query";
import Pagination from "components/PageNumbers/Pagination";
import Search from "components/Search/Search";
import { primary } from "theme";
import Button from "components/Button/Button";
import { CiFilter } from "react-icons/ci";
import { BiColumns } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import DropdownMenu from "components/DropdownMenu/DropDown";

import SearchColumns, { getSearchColumns } from "components/SearchColumns/SearchColumns";
import Filters from "components/Filters/Filters";
import { AiOutlineExport } from "react-icons/ai";
import Chip from "components/Chip/Chip";
import { useSessionStorage } from "hooks/useStorage/useStorage";
import { SlReload } from "react-icons/sl";
import { RxReset } from "react-icons/rx";
import { Flexbox } from "containers/Grid/Grid";

const DataGridContainer = styled.div`
  margin: 10px;
`;
const ActionContainer = styled.div`
  max-width: fit-content;
  white-space: nowrap;
  button {
    margin: 0.15rem;
  }
`;

const PageNumbers = styled(Pagination)`
  /* .page-number {
    color: ${primary};
    font-weight: normal;
  } */
`;

const GridButton = styled(Button).attrs({
  fill: "white",
  backgroundColor: "#cd171f",
})`
  border-radius: 8px;
  color: white;
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

  background-color: ${primary};
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

const columnList = [
  { position: 1, title: "Name", queryKey: "fullName", checked: true },
  { position: 2, title: "Functional Title", queryKey: "functionalTitle", checked: true },
  { position: 3, title: "Email", queryKey: "email", checked: false },
  { position: 4, title: "City", queryKey: "city", checked: true },
  { position: 5, title: "Department", queryKey: "department", checked: false },
];

const criteriaOptions = [
  { title: "Name", queryKey: "fullName", type: "string" },
  { title: "Age", queryKey: "age", type: "number" },
  { title: "Functional Title", queryKey: "functionalTitle", type: "string" },
  { title: "Email", queryKey: "email", type: "string" },
  { title: "City", queryKey: "city", type: "string" },
  { title: "Department", queryKey: "department", type: "string" },
  { title: "Is Admin", queryKey: "isAdmin", type: "boolean" },
  { title: "Is User", queryKey: "isUser", type: "boolean" },
  { title: "Experience", queryKey: "experience", type: "number" },
  { title: "Joined", queryKey: "joined", type: "date" },
];

const conditionOptions = [
  { title: "Greater than", queryKey: ">", type: "number" },
  { title: "Less than", queryKey: "<", type: "number" },
  { title: "Equals to", queryKey: "=", type: "number" },
  { title: null, queryKey: "=", type: "string" },
  { title: null, queryKey: "=", type: "date" },
  { title: null, queryKey: "=", type: "boolean" },
];

const valueOptions = [
  {
    type: "boolean",
    options: [
      { valueTitle: "Yes", queryKey: true },
      { valueTitle: "No", queryKey: false },
    ],
  },
];

function Index({
  liveclients = [],
  metadata,
  isLoading,
  isSubmitting,
  fetchLiveClients: fetchFunction,
  tableName = "Users Table",
}: PropsFromRedux) {
  const navigate = useNavigate();
  const [page, setPage] = useState(defaultQuery.page);
  const [perPage, setPerPage] = useState<any>(defaultQuery.perPage);
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchColumnsKeysRef = useRef(null);
  const [sort, setSort, removeSort] = useSessionStorage("sort", "");
  const [filters, setFilters] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchKey, setSearchKey, removeSearchKey] = useSessionStorage("searchkey", "");

  const handleModalClose = () => setShowModal(null);

  // initialize searchColumns
  useEffect(() => {
    searchColumnsKeysRef.current = getSearchColumns(columnList);
  }, []);

  useEffect(() => {
    fetchFunction({});
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

    fetchFunction({
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

    fetchFunction({
      query: { ...paginationQuery, ...features },
    });
  };

  const reload = () => {
    let reloadQuery = {
      page,
      perPage,
    };
    const features = getFeaturesQueries();
    fetchFunction({
      query: { ...reloadQuery, ...features },
    });
  };

  const reset = () => {
    fetchFunction({
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

  const columns = useMemo(
    () => [
      {
        // accessorFn:()=>{}
        accessorKey: "serial",
        header: "#",
        cell: (info: any) => info.getValue(),
      },

      {
        accessorKey: "fullName",
        header: (info: any) => (
          <Header
            headerId={info.header.id}
            sort={sort ? JSON.parse(sort) : undefined}
            setSort={setSort}
          >
            Name
          </Header>
        ),
        cell: (info: any) => <Cell>{info.getValue()}</Cell>,
        // footer: (
        //   <div style={{ textAlign: "right", width: "100%" }}>
        //     <span>Total</span>
        //   </div>
        // ),
      },
      {
        accessorKey: "functionalTitle",
        header: (info: any) => (
          <Header
            headerId={info.header.id}
            sort={sort ? JSON.parse(sort) : undefined}
            setSort={setSort}
          >
            Functional Title
          </Header>
        ),
        cell: (info: any) => <Cell>{info.getValue()}</Cell>,
        // footer: creditTotal,
      },

      {
        accessorKey: "email",
        header: (info: any) => (
          <Header
            headerId={info.header.id}
            sort={sort ? JSON.parse(sort) : undefined}
            setSort={setSort}
          >
            Email
          </Header>
        ),
        cell: (info: any) => <Cell>{info.getValue()}</Cell>,

        // it is recommended to do heavy calculations outside the columns
        // footer: (info) =>
        //   info.table.getFilteredRowModel().rows.reduce((acc, curr) => {
        //     acc += curr.getValue("dr_amount") ? Number(curr.getValue("dr_amount")) : 0;
        //     return acc;
        //   }, 0),
      },

      {
        accessorKey: "city",
        header: (info: any) => (
          <Header
            headerId={info.header.id}
            sort={sort ? JSON.parse(sort) : undefined}
            setSort={setSort}
          >
            City
          </Header>
        ),
        cell: (info: any) => <Cell>{info.getValue()}</Cell>,

        // footer: creditTotal,
      },
      {
        accessorKey: "department",
        header: (info: any) => (
          <Header
            headerId={info.header.id}
            sort={sort ? JSON.parse(sort) : undefined}
            setSort={setSort}
          >
            Department
          </Header>
        ),
        cell: (info: any) => <Cell>{info.getValue()}</Cell>,
        // footer: creditTotal,
      },

      {
        accessorKey: null,
        // header: <HeaderCell>Actions</HeaderCell>,
        header: "Actions",
        cell: (info: any) => {
          return (
            <ActionContainer>
              <button
                onClick={() => {
                  navigate(`${app.user.view(info.row.original.id)}`);
                }}
              >
                view
              </button>
              <button onClick={() => navigate(`${app.user.update(info.row.original.id)}`)}>
                edit
              </button>
              <button
                onClick={() => {
                  setSelectedItem(info.row.original);
                  setShowModal("delete");
                }}
              >
                delete
              </button>
            </ActionContainer>
          );
        },
      },
    ],
    [sort],
  );

  const handleSearch = ({
    searchQuery,
    searchColumns,
  }: {
    searchQuery?: string;
    filterQueries?: any;
  }) => {
    if (searchQuery) {
      const firstTimeSearch = !searchKey;
      fetchFunction({
        query: {
          search: searchQuery,
          searchColumns,
          page: firstTimeSearch ? 1 : page,
          perPage: firstTimeSearch ? 2 : perPage,
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

        if (
          await deleteLiveClient({
            userId: selectedItem?.id,
          })
        ) {
          handleModalClose();
          fetchFunction({ query: { page, perPage } });
        }
      }}
    />
  );
  const columnDropdown = (
    <DropdownMenu
      list={
        <SearchColumns
          items={columnList}
          onCheckboxStateChange={(keys) => {
            searchColumnsKeysRef.current = keys;
          }}
          searchColumnsKeysRef={searchColumnsKeysRef}
        />
      }
      offsetTop={50}
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
        fetchFunction({});
      }}
      searchContainerStyle={{ margin: 10, marginLeft: 0, marginRight: 0 }}
      color={"#cd171f"}
      style={{ fontSize: "1.2em", width: "100%" }}
    />
  );

  const filterDropdown = (
    <DropdownMenu
      list={
        <Filters
          criterias={criteriaOptions}
          conditions={conditionOptions}
          values={valueOptions}
          onFilterChange={(queries) => {
            setFilters(queries);
            setIsFiltered(false);
          }}
          onApply={async (filters) => {
            if (
              await fetchFunction({
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
      offsetTop={50}
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
        backgroundColor="white"
        iconSize={16}
        color="black"
        size="sm"
        style={{ border: "none", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.8rem" }}
        iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
      />

      <Chip
        label={searchKey ? `Searched` : ""}
        onDelete={() => {
          removeSearchKey();
          reset();
        }}
        backgroundColor="white"
        iconSize={16}
        color="black"
        size="sm"
        style={{ border: "none", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.8rem" }}
        iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
      />

      <Chip
        label={isFiltered ? `Filtered` : ""}
        onDelete={() => {
          setFilters(null);
          setIsFiltered(false);
          window.sessionStorage.removeItem("filters");
          reset();
        }}
        backgroundColor="white"
        iconSize={16}
        color="black"
        size="sm"
        style={{ border: "none", marginBottom: 5, marginRight: 5 }}
        textStyle={{ fontSize: "0.8rem" }}
        iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
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
      >
        User
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
          <Flexbox alignItems="center" gap="10px">
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
      <Table loader={loader} isLoading={isLoading} dataSource={liveclients} columns={columns} />
      {pagination}
    </DataGridContainer>
  );
}

const mapStateToProps = ({
  appState: { me },
  liveClientState: { liveclients, metadata, isLoading, isSubmitting },
}: AppState) => ({
  me,
  liveclients,
  metadata,
  isLoading,
  isSubmitting,
});

const mapDispatchToProps = {
  setMe,
  fetchLiveClients,
  deleteLiveClient,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Index);
