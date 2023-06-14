import { storiesOf } from "@storybook/react";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import data from "./data";
import styled from "styled-components";

const TablePagination = styled(Pagination)`
  .page-number {
    color: red;
    font-weight: normal;
  }
`;

function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    setPageData(data.slice((page - 1) * perPage, page * perPage));
  }, []);

  return (
    <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
      <div>
        <label style={{ marginRight: 10 }}>Show</label>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(e.target.value);
            setPage(1);
            // funktion({
            //   query: {
            //     perPage: Number(e.target.value),
            //     page: 1,
            //   },
            // });
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <TablePagination
        currentPage={page}
        totalCount={data?.length || 0}
        perPage={perPage}
        onPageChange={(page) => {
          let pageNumber = Number(page);
          setPage(pageNumber);
          setPageData(
            data.slice((pageNumber - 1) * perPage, pageNumber * perPage)
          );
        }}
      />
    </div>
  );
}

storiesOf("Components/Pagination", module).add("Demo", () => (
  <PaginationDemo />
));
