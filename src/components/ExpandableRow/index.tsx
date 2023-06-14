import { Collapse, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

function ExpandingRow({ summary, details }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TableCell>{summary}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }}>
          <Collapse in={open}>{details}</Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
