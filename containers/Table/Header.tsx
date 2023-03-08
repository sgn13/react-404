import shadows from "constants/css/shadows";
import { ReactNode, useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { connect, ConnectedProps } from "react-redux";
import { fetchLiveClients } from "store/liveClient/actions";
import { AppState } from "store/reducer";
import styled from "theme/styled";

type TableHeaderProps = PropsFromRedux & {
  children: ReactNode;
  headerId: string;
  sort?: Object;
  setSort?: (arg: any) => void;
};

const HeaderContent = styled.div<{ selected?: boolean }>`
  border-right: 1px solid #cbd1cf;
  display: flex;
  gap: 5px;
  cursor: pointer;
  user-select: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  line-height: 1.15rem;
  background-color: ${({ selected }) => (selected ? "#6e1705ae" : "transparent")};
  border-radius: ${({ selected }) => (selected ? "4px" : "0px")};
  box-shadow: ${({ selected }) => (selected ? shadows[1] : "none")};

  :hover {
    border-radius: 4px;
    background-color: #6e1705ae;
    /* border-right-color: #6e1705ae; */
  }
`;

const TableHeader = ({
  children,
  headerId,
  sort,
  setSort,
  fetchLiveClients,
  metadata,
}: TableHeaderProps) => {
  const handleHeaderClick = async (e: any) => {
    e.preventDefault();
    const sortQueries = {
      sortBy: headerId,
      order: sort?.order === "asc" ? "desc" : "asc",
    };
    if (
      await fetchLiveClients({
        query: {
          ...sortQueries,
          perPage: metadata?.perPage,
          page: metadata?.page,
        },
      })
    ) {
      setSort(JSON.stringify(sortQueries));
      // window.sessionStorage.setItem("sort", JSON.stringify({ ...query }));
      // A manual storage event is dispatched.
      // This will effectively trigger the storage event listener twice on other tabs/windows (of the same app)
      // window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <HeaderContent selected={sort?.sortBy === headerId} onClick={handleHeaderClick}>
      <div>{children}</div>
      <div style={{ paddingRight: 5 }}>
        {/* {sort?.sortBy === headerId && sort?.order === "asc" ? <CgSortZa /> : <CgSortAz />} */}
        {sort?.sortBy === headerId && sort?.order === "asc" ? (
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowUpwardIcon"
            height="1.1rem"
            width="1.1rem"
            fill="white"
          >
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
          </svg>
        ) : (
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowDownwardIcon"
            height="1.1rem"
            width="1.1rem"
            fill="white"
          >
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
          </svg>
        )}
      </div>{" "}
    </HeaderContent>
  );
};

const mapStateToProps = ({
  liveClientState: { liveclients, metadata, isLoading, isSubmitting },
}: AppState) => ({
  liveclients,
  metadata,
  isLoading,
  isSubmitting,
});

const mapDispatchToProps = {
  fetchLiveClients,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TableHeader);
