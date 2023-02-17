import React from "react";
import { storiesOf } from "@storybook/react";
import Table from "./Table";

import data from "./data";
import styled from "styled-components";

const ActionContainer = styled.div`
  max-width: fit-content;
  white-space: nowrap;
  button {
    margin: 0.15rem;
  }
`;

const creditTotal = data.reduce((acc, curr) => {
  acc += curr.cr_amount ? Number(curr.cr_amount) : 0;
  return acc;
}, 0);

const columns = [
  {
    // accessorFn:()=>{}
    accessorKey: "serial",
    header: "#",
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "title",
    header: "Particular",
    cell: (info) => info.getValue(),
    footer: (
      <div style={{ textAlign: "right", width: "100%" }}>
        <span>Total</span>
      </div>
    ),
  },

  {
    accessorKey: "dr_amount",
    header: "Debit",
    cell: (info) => info.getValue(),
    // it is recommended to do heavy calculations outside the columns
    footer: (info) =>
      info.table.getFilteredRowModel().rows.reduce((acc, curr) => {
        acc += curr.getValue("dr_amount") ? Number(curr.getValue("dr_amount")) : 0;
        return acc;
      }, 0),
  },

  {
    accessorKey: "cr_amount",
    header: "Credit",
    cell: (info) => info.getValue(),
    footer: creditTotal,
  },

  {
    accessorKey: null,
    header: "Actions",
    cell: (info) => {
      return (
        <ActionContainer>
          <button onClick={() => console.log("view", info.row.original)}>view</button>
          <button onClick={() => console.log("edit", info.row.original)}>edit</button>
          <button onClick={() => console.log("delete", info.row.original)}>delete</button>
        </ActionContainer>
      );
    },
  },
];

storiesOf("Components/Table", module).add("Table", () => (
  <Table dataSource={data} columns={columns} />
));
