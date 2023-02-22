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

const TableHeader = ({ children, headerId, sort, setSort, fetchLiveClients }: TableHeaderProps) => {
  const handleHeaderClick = async (e: any) => {
    e.preventDefault();
    const query = {
      sortBy: headerId,
      order: sort?.order === "asc" ? "desc" : "asc",
    };
    if (
      await fetchLiveClients({
        query,
      })
    ) {
      setSort(JSON.stringify(query));
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
        {sort?.sortBy === headerId && sort?.order === "asc" ? <CgSortZa /> : <CgSortAz />}
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
