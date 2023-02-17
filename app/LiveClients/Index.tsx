import React, { useEffect, useRef, useState } from "react";
import Table from "containers/Table/Table";
import styled from "theme/styled";
import { connect, ConnectedProps } from "react-redux";
import { setMe } from "store/app/actions";
import { deleteLiveClient, fetchLiveClients } from "store/liveClient/actions";
import { AppState } from "store/reducer";
import { useNavigate } from "react-router-dom";
import app from "constants/app";
import { Buffering } from "components/Spinner/Spinner";
import Modal, { DeleteModal } from "components/Modal/Index";
import { defaultQuery } from "constants/query";
import Pagination from "components/PageNumbers/Pagination";
import Search from "components/Search/Search";
import { primary } from "theme";
import Button from "components/Button/Button";
import Center from "containers/Center/Center";
import { CiFilter } from "react-icons/ci";
import { BiColumns } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import DropdownMenu from "components/DropdownMenu/DropDown";
import Input from "components/Input/Input";
import { Box, Col, Container } from "containers/Grid/Grid";

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

const GridButton = styled(Button).attrs({ fill: "white", backgroundColor: "#cd171f" })`
  border-radius: 8px;
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

const Header = styled.div`
  border-right: 1px solid #cbd1cf;
`;

const Cell = styled.div`
  border-right: 0.5px solid #cbd1cf;
`;

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

const CustomizeSearchColumns = ({
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
        <p style={{ fontStyle: "bold", fontSize: "1.2rem" }}>Customize Search Column </p>
      </div>
      <hr />
      <br />
      <ul style={{ display: "flex", flexWrap: "wrap" }}>{list}</ul>
    </div>
  );
};

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

  const handleModalClose = () => setShowModal(null);

  useEffect(() => {
    fetchLiveClients({});
  }, []);

  const columns = [
    {
      // accessorFn:()=>{}
      accessorKey: "serial",
      header: "#",
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "fullName",
      header: (
        <Header>
          Name <CgSortAz />
        </Header>
      ),
      cell: (info) => <Cell>{info.getValue()}</Cell>,
      // footer: (
      //   <div style={{ textAlign: "right", width: "100%" }}>
      //     <span>Total</span>
      //   </div>
      // ),
    },
    {
      accessorKey: "functionalTitle",
      header: (
        <Header>
          Functional Title <CgSortZa />
        </Header>
      ),
      cell: (info) => <Cell>{info.getValue()}</Cell>,
      // footer: creditTotal,
    },

    {
      accessorKey: "email",
      header: (
        <Header>
          Email <CgSortAz />
        </Header>
      ),
      cell: (info) => <Cell>{info.getValue()}</Cell>,

      // it is recommended to do heavy calculations outside the columns
      // footer: (info) =>
      //   info.table.getFilteredRowModel().rows.reduce((acc, curr) => {
      //     acc += curr.getValue("dr_amount") ? Number(curr.getValue("dr_amount")) : 0;
      //     return acc;
      //   }, 0),
    },

    {
      accessorKey: "city",
      header: (
        <Header>
          City <CgSortAz />
        </Header>
      ),
      cell: (info) => <Cell>{info.getValue()}</Cell>,

      // footer: creditTotal,
    },
    {
      accessorKey: "department",
      header: (
        <Header>
          Department <CgSortAz />
        </Header>
      ),
      cell: (info) => <Cell>{info.getValue()}</Cell>,
      // footer: creditTotal,
    },

    {
      accessorKey: null,
      // header: <HeaderCell>Actions</HeaderCell>,
      header: "Actions",
      cell: (info) => {
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
  ];

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
        <CustomizeSearchColumns
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
        <>
          <li>Filter list 1</li>
        </>
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
        <Center style={{ width: "100%", justifyContent: "flex-start" }}>
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
        </Center>

        <Center style={{ textAlign: "center", justifyContent: "space-around" }}>
          <TableName>Users Table </TableName>
          <GridButton size="sm" icon={<IoMdAddCircleOutline size={20} fill="white" />}>
            User
          </GridButton>
        </Center>
      </Toolbar>
      <Table loader={loader} isLoading={isLoading} dataSource={liveclients} columns={columns} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Center>
          <label style={{ marginRight: 10, fontFamily: "Poppins", fontWeight: 300 }}>
            Rows per page
          </label>
          <select
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
            const query = {
              page,
              perPage,
            };
            if (searchKey) {
              query.search = searchKey;
              searchColumns = searchColumnsKeysRef.current || [];
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
