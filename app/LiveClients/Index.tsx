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
import Center from "containers/Center/Center";
import { CiFilter } from "react-icons/ci";
import { BiColumns } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import DropdownMenu from "components/DropdownMenu/DropDown";
import { IoIosRefresh } from "react-icons/io";

import SearchColumns from "components/SearchColumns/SearchColumns";
import Filters, { getFiltersKeys } from "components/Filters/Filters";
import { AiOutlineExport } from "react-icons/ai";
import Chip from "components/Chip/Chip";
import { useSessionStorage } from "hooks/useStorage/useStorage";

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
  .page-number {
    color: ${primary};
    font-weight: normal;
  }
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

// const Header = styled.div`
//   border-right: 1px solid #cbd1cf;
// `;

let searchKey = "";
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
  fetchLiveClients,
}: PropsFromRedux) {
  const navigate = useNavigate();
  const [page, setPage] = useState(metadata?.page || defaultQuery.page);
  const [perPage, setPerPage] = useState<any>(metadata?.perPage || defaultQuery.perPage);
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchColumnsKeysRef = useRef(null);
  const [sort, setSort, removeSort] = useSessionStorage("sort", "");
  const [filtersData, setFiltersData] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  console.log("filtersData", filtersData);

  // const handleStorageChange = (e) => {
  //   const savedSort = window.sessionStorage.getItem("sort");
  //   console.log("storage change detected");
  //   if (savedSort) {
  //     console.log("savedSort", savedSort);
  //     const json = JSON.parse(savedSort);
  //     if (json.sortBy) {
  //       setTableStatus({ dataType: "sort", data: json, status: "Sorted" });
  //       return;
  //     }
  //   }
  //   const savedFitlers = window.sessionStorage.getItem("filters");
  //   if (savedFitlers) {
  //     console.log("savedFilters", savedFitlers);
  //     const json = JSON.parse(savedFitlers);
  //     const queries = getFiltersKeys(json);
  //     if (queries.length) {
  //       setTableStatus({ dataType: "filters", data: queries, status: "Filtered" });
  //       return;
  //     }
  //   }
  //   // key removed
  //   setTableStatus(undefined);
  // };

  const handleModalClose = () => setShowModal(null);

  useEffect(() => {
    fetchLiveClients({});
  }, []);

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
    filterQueries,
  }: {
    searchQuery?: string;
    filterQueries?: any;
  }) => {
    if (searchQuery) {
      const firstTimeSearch = !searchKey;
      fetchLiveClients({
        query: {
          search: searchQuery,
          searchColumns,
          page: firstTimeSearch ? 1 : page,
          perPage: firstTimeSearch ? 2 : perPage,
        },
      });
      searchKey = searchQuery;
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
          fetchLiveClients({ query: { page, perPage } });
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
            console.log({ keys });
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

  const filterDropdown = (
    <DropdownMenu
      list={
        <Filters
          criterias={criteriaOptions}
          conditions={conditionOptions}
          values={valueOptions}
          onFilterChange={(queries) => {
            setFiltersData(queries);
            setIsFiltered(false);

            // if (queries && queries.length && !Object.keys(queries[0]).length) {
            //   console.log("off");
            //   setIsFiltered(false);
            // }
          }}
          onApply={async (filters) => {
            if (
              await fetchLiveClients({
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

  return (
    <DataGridContainer>
      {deleteModal}
      <Toolbar>
        <Center style={{ width: "100%", justifyContent: "space-between" }}>
          <Center style={{ gap: 10 }}>
            {columnDropdown}
            <Search
              onEnter={(searchValue = "null") => {
                handleSearch({
                  searchQuery: searchValue,
                  searchColumns: searchColumnsKeysRef.current || [],
                });
              }}
              onSearchClose={() => {
                searchKey = "";
                fetchLiveClients({});
              }}
              searchContainerStyle={{ margin: 10, marginLeft: 0, marginRight: 0 }}
              color={"#cd171f"}
              style={{ fontSize: "1.2em", width: "100%" }}
            />
            {filterDropdown}
          </Center>

          <div style={{ display: "flex", gap: 5 }}>
            {sort ? (
              <Chip
                label={sort ? `Sorted` : ""}
                onDelete={removeSort}
                backgroundColor="white"
                iconSize={16}
                color="black"
                size="sm"
                style={{ border: "none", marginBottom: 5, marginRight: 5 }}
                textStyle={{ fontSize: "0.8rem" }}
                iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
              />
            ) : null}

            {isFiltered ? (
              <Chip
                label={isFiltered ? `Filtered` : ""}
                onDelete={() => {
                  setFiltersData(undefined);
                  setIsFiltered(false);
                  window.sessionStorage.removeItem("filters");
                }}
                backgroundColor="white"
                iconSize={16}
                color="black"
                size="sm"
                style={{ border: "none", marginBottom: 5, marginRight: 5 }}
                textStyle={{ fontSize: "0.8rem" }}
                iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
              />
            ) : null}
          </div>
        </Center>

        <Center style={{ textAlign: "center", justifyContent: "space-between" }}>
          <TableName>Users Table </TableName>

          <div style={{ display: "flex", gap: 5 }}>
            <GridButton
              size="sm"
              icon={<AiOutlineExport style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
            >
              Export
            </GridButton>
            <GridButton
              size="sm"
              icon={<IoIosRefresh style={{ marginRight: "0.3rem" }} size={20} fill="white" />}
              onClick={() => fetchLiveClients({})}
            >
              Refresh
            </GridButton>
            <GridButton
              size="sm"
              icon={
                <IoMdAddCircleOutline style={{ marginRight: "0.3rem" }} size={20} fill="white" />
              }
            >
              User
            </GridButton>
          </div>
        </Center>
      </Toolbar>
      <Table loader={loader} isLoading={isLoading} dataSource={liveclients} columns={columns} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#f7f7f7",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Center>
          <label style={{ marginRight: 10, fontFamily: "Poppins", fontWeight: 300 }}>
            Rows per page
          </label>
          <select
            style={{ height: 25 }}
            value={perPage}
            onChange={(e) => {
              const currentPage = e.target.value;
              setPerPage(currentPage);
              setPage(1);
              fetchLiveClients({
                query: {
                  perPage: Number(e.target.value),
                  page: 1,
                },
              });
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </Center>

        <PageNumbers
          totalCount={metadata?.totalCount || 0}
          currentPage={page}
          perPage={perPage}
          onPageChange={(page) => {
            let pageNumber = Number(page);
            setPage(pageNumber);
            // setPageno(page);
            let query = {
              page,
              perPage,
            };

            if (searchKey) {
              query.search = searchKey;
              searchColumns = searchColumnsKeysRef.current || [];
            }

            const savedFilterQueries = window.sessionStorage.getItem("filters");

            if (isFiltered && savedFilterQueries) {
              const json = JSON.parse(savedFilterQueries);
              const queries = getFiltersKeys(json);
              query = { ...query, ...queries };
            }

            const savedSortQueries = window.sessionStorage.getItem("sort");
            if (savedSortQueries) {
              const json = JSON.parse(savedSortQueries);
              const queries = json;
              query = { ...query, ...queries };
            }

            fetchLiveClients({
              query,
            });
          }}
        />
      </div>
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
