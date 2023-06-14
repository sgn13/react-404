import { Box, Button, Collapse, TableCell, TableRow, styled } from "@mui/material";
import moment from "moment";
import React from "react";
import deleteIcon from "src/assets/icons/delete.svg";
import editIcon from "src/assets/icons/edit.svg";
import ExpandRowIcon from "src/assets/icons/expand-row.svg";
// import { lato } from 'src/fonts';
import defaultFont from "src/constants/css/font";
import IOSSwitch from "../switch";
import PopUpCustom from "./PopUp";

const ExpandedRowContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: 2,
  padding: 8,
}));

function Row({
  row,
  headCells,
  handleClick,
  onAdd,
  onUpdate,
  onStatusToggle,
  onDelete,
  handleIndividualDelete,
  isSelected,
  handleTableCellVisibility,
  tableIndicator,
  GetValue,
  popUpDisplay,
  onTitleNavigate,
  tableOptions,
  index,
  additionalEdit,
  expandableRow,
}) {
  const [open, setOpen] = React.useState(false);

  const name = row?.[`${tableIndicator?.deleteFieldName}`] || row?.name;
  const isItemSelected = isSelected(name as string);
  const labelId = `enhanced-table-checkbox-${index}`;
  let rowEditLink = "";
  if (additionalEdit) {
    rowEditLink = `${row?.id}?address=${
      row[`${additionalEdit}`]?.length ? row[`${additionalEdit}`][0].id : ""
    }`;
  } else {
    rowEditLink = `${row?.id}`;
  }

  return (
    <>
      <TableRow
        // sx={{ '& > *': { borderBottom: 'unset' } }}
        hover
        onClick={(event) => {
          handleClick(event, name, row.id);
        }}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        {(headCells || []).map((hc, index) => {
          if (hc.action) return;
          if (hc.id === "created_at" || hc.id === "updated_at")
            return (
              <TableCell
                key={index}
                className={handleTableCellVisibility(hc.id)}
                sx={{
                  fontFamily: defaultFont,
                  borderBottom: "none",
                }}
              >
                {moment(new Date(row[hc.id])).format("MMM Do YY")}
              </TableCell>
            );
          if (hc.id === "status")
            return (
              <TableCell
                className={handleTableCellVisibility(hc.id)}
                sx={{
                  borderBottom: "none",
                  fontFamily: defaultFont,
                }}
              >
                <IOSSwitch
                  checked={row.status}
                  // disableText
                  onChange={(e) => onStatusToggle(row)}
                />
              </TableCell>
            );

          return (
            <TableCell
              className={handleTableCellVisibility(hc.id)}
              key={hc.id}
              sx={{
                borderBottom: "none",
                fontFamily: defaultFont,
                fontSize: "1.5rem",
              }}
            >
              <GetValue
                row={row}
                columnName={hc?.id}
                popUpDisplay={tableIndicator?.popUpField?.key === hc?.id ? popUpDisplay : false}
                onTitleNavigate={onTitleNavigate}
                title={hc?.label}
                tableOptions={tableOptions}
              />
              {tableIndicator?.popUpField?.key === hc?.id && (
                <PopUpCustom
                  data={row[tableIndicator?.popUpField?.key]}
                  title={tableIndicator?.popUpField?.label}
                  ID={row?.id}
                  tableIndicator={tableIndicator}
                />
              )}

              {hc?.id === "attachments" && (
                <PopUpCustom
                  data={row[hc?.id]?.map((data: any) => data?.attachment)}
                  ID={row?.id}
                  title="View Attachments"
                  tableIndicator={tableIndicator}
                  openInNewWindow
                />
              )}
            </TableCell>
          );
        })}

        {/* <TableCell align="right">{row.protein}</TableCell> */}
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </TableCell> */}

        <TableCell className={handleTableCellVisibility("action")} sx={{ borderBottom: "none" }}>
          <div
            className="actions-btns-holder"
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              style={{ minWidth: "32px" }}
              onClick={() => {
                onDelete({ item: row });
                const name = row?.[`${tableIndicator?.deleteFieldName}`] || row?.name;
                handleIndividualDelete(row.id, name);
              }}
              startIcon={<img width={18} height={18} src={deleteIcon} alt="delete" />}
              sx={{
                ".MuiButton-iconSizeMedium": {
                  marginRight: "0px !important",
                },
              }}
            />

            <Button
              onClick={() => {
                onUpdate({ item: row });
              }}
              style={{ minWidth: "32px" }}
              startIcon={<img width={18} height={18} src={editIcon} alt="edit" />}
              sx={{
                ".MuiButton-iconSizeMedium": {
                  marginRight: "0px !important",
                },
              }}
            />

            {expandableRow ? (
              <Button
                onClick={() => setOpen(!open)}
                style={{ minWidth: "32px" }}
                startIcon={<img width={28} height={28} src={ExpandRowIcon} alt="expand-row" />}
                sx={{
                  ".MuiButton-iconSizeMedium": {
                    marginRight: "0px !important",
                  },
                }}
              />
            ) : null}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ExpandedRowContainer sx={{ margin: 1 }}>
              {row?.notes || "No Data"}
            </ExpandedRowContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default Row;
