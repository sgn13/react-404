import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { memo, useEffect, useReducer, useState } from "react";
import Center from "src/containers/Center/Center";
import styled from "styled-components";

const TableStyles = styled.div<{ backgroundColor; textColor }>`
  width: 100%;
  overflow-x: auto;

  table {
    // auto: [column width for entire is decided based the maximum width of any cell]
    // It is useful if you want automatic column size width based on cell's content which will fit the cell content.
    // If no column size is specified manually, columns width will be the width of the cell which has the longest content.
    // However, you can assign specific width to specific column as well and the rest of the column will follow the column width based longest cell width.
    table-layout: auto;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    vertical-align: middle;
    min-width: 700px;
  }

  td,
  th {
    /* border: 0.5px solid #bebcbc74; */
    border-top: none;
    border-bottom: none;
    vertical-align: middle;
    font-family: "Poppins";
    font-weight: 300;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  /* thead th {
    border-top: 0.1px solid #dbd3d374;
    border-right: 1px solid #c6c1c174;
  } */

  td:first-child,
  th:first-child {
    width: 60px;
    padding-left: 16px;
  }
  // Use a small value (different from 0) to have the fit-content behavior
  td:last-child,
  th:last-child {
    width: 1px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th {
    /* padding-top: 16px;
    padding-bottom: 16px; */

    text-align: left;
    background-color: ${({ backgroundColor }) => backgroundColor ?? "#cd171f"};
    color: ${({ textColor }) => textColor ?? "white"};
    font-weight: 400;
  }

  td {
    padding-left: 5px;
  }

  table tr:hover {
    background-color: #ddd;
  }

  table tfoot td {
    background-color: ${({ backgroundColor }) => backgroundColor ?? "gray"};
    color: ${({ textColor }) => textColor ?? "white"};
  }
`;

function TableLoader({ children }) {
  return (
    <tr>
      <td colSpan="100%">{children}</td>
    </tr>
  );
}

function Table({
  isLoading,
  loader = <div>loading...</div>,
  dataSource = [],
  columns,
  backgroundColor,
  textColor,
}) {
  const [data, setData] = useState([]);

  const rerender = useReducer(() => ({}), {})[1];

  const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!dataSource || !dataSource.length) return;
    setData(() => [
      // adding serial number  to each item
      ...dataSource.map((item, index) => {
        item.serial = index + 1;
        return item;
      }),
    ]);
  }, [dataSource]);

  return (
    <TableStyles backgroundColor={backgroundColor} textColor={textColor}>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <TableLoader>
              <Center>{loader}</Center>
            </TableLoader>
          ) : (
            <>
              {getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
        <tfoot>
          {getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
        {/* <tfoot>
          <tr>
            <th colSpan={2} style={{ textAlign: "right" }}>
              Total
            </th>
            <th>5000</th>
            <th>10000</th>
            <th />
          </tr>
        </tfoot> */}
      </table>
    </TableStyles>
  );
}

export default memo(Table);
