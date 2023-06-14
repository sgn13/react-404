import { Button, Grid, MenuItem, Select, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import ConfirmationModal from "src/components/ConfirmationModal/ConfirmationModal";
import { BASConfigTableProps, RegionProps } from "src/interfaces/configs";
// import { deleteAPI, getAPI } from 'services/axiosClient';
import moment from "moment";
// import './table.scss';
import { MoreVert } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlusIcon from "src/assets/icons/plus-white.svg";
import sortIcon from "src/assets/icons/sort.svg";
import FilterModal from "src/components/FilterModal/FilterModal";
import { defaultQuery } from "src/constants/query";
import { useReactTheme } from "src/containers/ReactThemeProvider/ReactThemeProvider";
// import { lato } from "src/fonts";
import defaultFont from "src/constants/css/font";
import { metadataType } from "src/store/app/reducers";
import { RadioOptions } from "src/utils/chips";
import NoDataFound from "../NoDataFound";
import PerPageSelect, { rowsPerPageOptions } from "../PerPageSelect";
import Search from "../Search";
import { IndividualListDisplay } from "./PopUp";
import Row from "./Row";
import TableColumns from "./TableColumns";

export interface ConfigTableUrlUtils {
  q?: string;
  archived?: string;
  page: number;
  size: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function isValidDate(d: string) {
  return moment(d).isValid();
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: string;
  label: string;
  action?: boolean;
  show: boolean;
  index: number;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  fetchData: (arg?: any) => {};
}

function EnhancedTableHead(props: EnhancedTableProps) {
  // const theme = useTheme();
  const { theme } = useReactTheme();
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    fetchData,
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      style={{
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            checkedIcon={<img src={CheckIcon} alt="check" />}
            icon={<img src={UnCheckIcon} alt="uncheck" />}
            indeterminateIcon={<img src={CheckRemoveIcon} alt="indeterminate" />}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => {
          return (
            <React.Fragment key={headCell.id}>
              {!headCell?.action && headCell.show && (
                <TableCell
                  key={headCell.id}
                  //   align={headCell.numeric ? "right" : "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <div
                    className="table-head-custom"
                    style={{
                      display: "flex",
                      fontSize: "1.2em",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // backgroundColor: theme.palette.secondary.light,
                      // padding: '12px 0px',
                      fontFamily: defaultFont,
                      fontWeight: 700,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                      IconComponent={() => <img src={sortIcon} alt="sort" width={16} height={16} />}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc" ? "sorted descending" : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>{" "}
                    <MoreVert sx={{ color: "#868FA0", height: 20 }} />
                  </div>
                </TableCell>
              )}
              {headCell.action && headCell.show && (
                <TableCell
                  key={headCell.id}
                  sx={{
                    textAlign: "end",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      left: "-15px",
                      fontSize: "1.2em",
                      // padding: '12px 0px',
                    }}
                  >
                    {headCell.label}
                  </div>
                </TableCell>
              )}
            </React.Fragment>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  configName: string;
  backendUrl: string;
  count: number;
  additionalEdit?: string;
  onDataChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditTable: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  handleFilterTable: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  archivedCount: number | undefined | null;
  tableTitle?: string;
  tableIndicator?: tableIndicatorProps;
  textTitleLength?: number;
  csvDownload?: boolean;
  isAddModal?: boolean;
  setOpenAddModal?: (arg?: any) => void;
  searchValue?: string;
  allowFilter?: boolean;
  onAdd?: (arg?: any) => void;
  name?: string;
}

// these are used to show name, set the backend url for csv download, help in setting the
// frontend route to click. Field nam
export interface tableIndicatorProps {
  buttonName?: string;
  backendUrl?: string;
  frontEndUrl?: string;
  sectionTitle?: string;
  editFrontEndUrlGetter?: (arg?: any) => void | null;
  deleteFieldName?: string;
  subSectionUrl?: (arg?: any) => void | null;
  popUpField?: {
    key: string;
    label: string;
  };
}

function AddButton({ tableIndicator, letterHandler, configName, location }: any) {
  return (
    <Link
      to={`${
        tableIndicator?.frontEndUrl ? tableIndicator?.frontEndUrl : `${location?.pathname}/add`
      }`}
    >
      <Button
        variant="contained"
        startIcon={<img width={24} height={24} src={PlusIcon} alt="plus" />}
      >
        Add{" "}
        {letterHandler({
          title: tableIndicator?.buttonName ? tableIndicator?.buttonName : configName,
        })}
      </Button>
    </Link>
  );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    onDataChange,
    handleEditTable,
    handleFilterTable,
    configName,
    count,
    archivedCount,
    backendUrl,
    additionalEdit,
    tableTitle,
    tableIndicator,
    textTitleLength,
    csvDownload = true,
    isAddModal = false,
    searchValue,
    setOpenAddModal = () => {},
    allowFilter,
    onAdd,
    name,
  } = props;

  const [param, setparam] = React.useState("");

  // const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  // csv download
  const handleDownload = async () => {
    // const { status, data } = await getAPI(`${backendUrl}/export-csv`);
    // if (status === 200) {
    //   const url = window.URL.createObjectURL(new Blob([data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   let fileName =
    //     configName
    //       ?.toString()
    //       .split('/')
    //       .slice(-1)
    //       ?.join('') || '';
    //   link.setAttribute('download', `${fileName || 'untitled'}.csv`);
    //   document.body.appendChild(link);
    //   link.click();
    // } else {
    //   enqueueSnackbar('Something went wrong', { variant: 'error' });
    // }
  };

  const letterHandler = ({ title }: any) => {
    let words = "";
    const tableHead = title;
    for (let i = 0; i < tableHead?.length; i++) {
      if (tableHead?.includes("-")) {
        const splitedWords = tableHead?.split("-");
        for (let i = 0; i < splitedWords.length; i++) {
          splitedWords[i] = `${
            splitedWords[i].charAt(0).toUpperCase() + splitedWords[i].slice(1)
          } `;
          words = splitedWords.join("");
        }
      } else {
        words = tableHead?.charAt(0).toUpperCase() + tableHead?.slice(1);
      }
    }
    return `${title ? "" : "All "} ${words}`;
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" paddingY={2}>
        <div className="left-block">
          <Typography
            variant="h5"
            component={"h3"}
            sx={{ color: "#252423", textAlign: "left", fontFamily: defaultFont }}
          >
            {name}
          </Typography>
          <Typography sx={{ fontSize: "0.9em", color: "#484644", fontFamily: defaultFont }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accumsan
          </Typography>

          {/* <Typography variant="h5" component="h3">
              {GetShorterText({
                value: letterHandler({
                  title: tableTitle ? tableTitle : configName,
                }),
                length: textTitleLength,
              })}
              <Chip label={`${count} Total`} />
            </Typography>
            <Typography variant="body1" component="p">
              {archivedCount ?? '0'} Archived
            </Typography> */}
        </div>
        <div className="right-block">
          <Grid container spacing={2}>
            {/* <Grid item>
                {!!csvDownload && (
                  <Button
                    variant="outlined"
                    onClick={handleDownload}
                    startIcon={<img src={DownloadIcon} alt="download" />}>
                    Download CSV
                  </Button>
                )}
              </Grid> */}
            <Grid item>
              {onAdd && (
                <Button
                  variant="contained"
                  onClick={() => onAdd()}
                  style={{
                    textTransform: "none",
                    fontFamily: defaultFont,
                  }}
                >
                  + Add {name}
                </Button>
              )}
              {/* <AddButton
                  tableIndicator={tableIndicator}
                  letterHandler={letterHandler}
                  configName={configName}
                  location={location}
                  isAddModal={isAddModal}
                  setOpenAddModal={setOpenAddModal}
                /> */}
              {/* <Link
                to={`${
                  tableIndicator?.frontEndUrl
                    ? tableIndicator?.frontEndUrl
                    : `${location?.pathname}/add`
                }`}>
                <Button
                  variant="contained"
                  startIcon={<img src="/assets/icons/plus-white.svg" alt="plus" />}>
                  Add {letterHandler({ title: configName })}
                </Button>
              </Link> */}
            </Grid>
          </Grid>
        </div>
      </Stack>

      {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
          <div className="left-block"></div>
          <div className="right-block">
            <Grid container spacing={2}>
              <Grid item>
                <form className="search-form">
                  <OutlinedInput
                    placeholder={`Search for ${configName}`}
                    startAdornment={<img src={SearchIcon} alt="search" />}
                    value={searchValue}
                    fullWidth
                    sx={{
                      minWidth: 400,
                    }}
                    onChange={onDataChange}
                  />
                </form>
                <SearchInput
                placeholder={`Search for ${configName}`}
                startAdornment={<img src="/assets/icons/search.svg" alt="search" />}
                fullWidth
                sx={{
                  minWidth: 400,
                }}
                onChange={onDataChange}
                debounceDelay={500}
              />
              </Grid>
              {allowFilter && (
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={handleFilterTable}
                    startIcon={<img src={FilterIcon} alt="edit" />}>
                    Filter
                  </Button>
                </Grid>
              )}
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleEditTable}
                  startIcon={<img src={EditIcon} alt="edit" />}>
                  Customize Table
                </Button>
              </Grid>
            </Grid>
          </div>
        </Stack> */}
    </div>
  );
}

const defaultDisable = ["created_at", "created_by", "updated_at", "updated_by", "fields"];

const transformHeaderCells = (
  headcells: { [key: string]: any },
  defaultDisable: Array<string>,
): HeadCell[] => {
  const tempArr: HeadCell[] = [];
  let index = 0;
  for (const key in headcells) {
    if (Object.prototype.hasOwnProperty.call(headcells, key)) {
      const element = headcells[key];

      if (key !== "id") {
        tempArr.push({
          id: key,
          index,
          label: element,
          show: !defaultDisable?.some((el) => el === key),
        });
        index++;
      }
    }
  }
  return [
    ...tempArr,
    {
      id: "action",
      index: tempArr.length,
      label: "Actions",
      action: true,
      show: true,
    },
  ];
};

// checking if we have html content
function hasHtmlTags(str: string) {
  const htmlRegex = /<\/?[a-z][\s\S]*>/i; // Regular expression to match against any HTML tags
  return htmlRegex.test(str); // Returns true if HTML tags are present in the string, false otherwise
}

function converText(str: string) {
  const parser = new DOMParser();
  if (hasHtmlTags(str)) {
    const doc = parser.parseFromString(str, "text/html");

    const plainTextContent: any = doc.body.textContent;

    return plainTextContent?.toString()?.length >= 80
      ? `${plainTextContent?.toString()?.slice(0, 80)}...`
      : plainTextContent;
  }
  return str?.length >= 80 ? `${str?.toString().slice(0, 80)}...` : str;
}

// getting value component
function GetValue({
  row,
  columnName,
  showNumber = 2,
  showText = false,
  popUpDisplay = false,
  onTitleNavigate,
  title,
  tableOptions,
}: any) {
  const value = row[columnName];
  // const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = React.useState<any>();
  const [showAll, setShowAll] = React.useState(false);
  // Use state to keep track of whether the button has been clicked

  if (columnName === "attachments") {
    return <></>;
  }

  // if (tableOptions?.[`${columnName?.toLowerCase()}`]?.select) {
  //   setSelectedOptions(value);
  // }

  if (Array.isArray(value)) {
    // Determine which items to display based on whether the button has been clicked
    const displayedValue = showAll ? value : value.slice(0, showNumber);

    return (
      <div>
        {displayedValue?.map((item: any, index: number) => {
          if (item instanceof Object) {
            const MAX_CHARACTERS = 100;
            const isTruncated = item?.description?.length > MAX_CHARACTERS;
            return (
              <IndividualListDisplay
                key={item?.id}
                // navigate={navigate}
                id={item?.id}
                individualData={item}
                domain={title}
              >
                <p>
                  {item?.description?.toString()?.length >= MAX_CHARACTERS
                    ? `${item?.description.toString().slice(0, MAX_CHARACTERS)}...`
                    : item?.description}
                </p>
              </IndividualListDisplay>
            );
          }
          return (
            <div key={item}>
              {/* Display each item in the array */}
              {item}
            </div>
          );
        })}
        {/* Show the "Show More" button if there are more than 1 items */}
        {!popUpDisplay ? (
          value?.length > showNumber && (
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "small", cursor: "pointer" }}
              component="div"
              onClick={(e) => {
                e.stopPropagation();
                // Toggle the showAll state when the button is clicked
                setShowAll(!showAll);
              }}
            >
              {showText
                ? showAll
                  ? "Show Less"
                  : `Show ${value?.length - showNumber} more`
                : showAll
                ? "Show less"
                : "..."}
            </Typography>
          )
        ) : (
          <></>
        )}
      </div>
    );
  }

  // Return the value as is if it's not an array
  return (
    <div
      style={{ fontSize: "1.1em" }}
      onClick={(e) => {
        if (onTitleNavigate?.navigateColumnName == columnName) {
          e.stopPropagation();
          onTitleNavigate?.navigateTo?.(row?.id, value);
        }
      }}
      className={onTitleNavigate?.navigateColumnName == columnName ? "hover__effect-underline" : ""}
    >
      {(() => {
        switch (columnName?.toLowerCase()) {
          case "website":
            return (
              <a href={value} target="_blank" rel="noreferrer">
                {converText(value)}
              </a>
            );
          default:
            if (
              !tableOptions?.[`${columnName?.toLowerCase()}`]?.select &&
              tableOptions?.chipOptionsName?.includes(columnName?.toLowerCase())
            ) {
              return (
                <div
                  style={{
                    display: "inline-block",
                    background: RadioOptions?.[`${value}`]
                      ? RadioOptions?.[`${value}`].backgroundColor
                      : RadioOptions?.default.backgroundColor,
                    padding: "8px 12px",
                    paddingLeft: "30px",
                    borderRadius: "20px",
                    position: "relative",
                    color: RadioOptions?.[`${value}`]
                      ? RadioOptions?.[`${value}`]?.textColor
                      : RadioOptions?.default?.textColor,
                  }}
                  className="badge__creator"
                >
                  <span
                    style={{
                      background: RadioOptions?.[`${value}`]
                        ? RadioOptions?.[`${value}`]?.dotColor
                        : RadioOptions?.default?.dotColor,
                    }}
                  />
                  {converText(value)}
                </div>
              );
            }

            if (tableOptions?.[`${columnName?.toLowerCase()}`]) {
              const keyName = `${tableOptions[`${columnName?.toLowerCase()}`]?.displayKeyName}`;
              const backendDataSetKeyName = `${
                tableOptions[`${columnName?.toLowerCase()}`]?.setKeyName
              }`;
              const options = { [keyName]: value };
              const chipTrue = tableOptions?.chipOptionsName?.indexOf(columnName) !== -1;

              const getStyle = function (item: any) {
                const active = selectedOptions?.[keyName]
                  ? selectedOptions?.[keyName] === item?.[keyName]
                  : options?.[keyName] === item?.[keyName];
                return {
                  background: active ? "rgba(144, 202, 249, 0.16)" : "transparent",
                };
              };

              return (
                <div
                  style={{ overflow: "hidden" }}
                  className="parent__box"
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: RadioOptions?.[`${value}`]
                        ? RadioOptions?.[`${value}`].backgroundColor
                        : RadioOptions?.default.backgroundColor,
                      padding: "8px 12px",
                      paddingLeft: "30px",
                      borderRadius: "20px",
                      position: "relative",
                      color: RadioOptions?.[`${value}`]
                        ? RadioOptions?.[`${value}`]?.textColor
                        : RadioOptions?.default?.textColor,
                    }}
                    className="badge__creator"
                  >
                    <span
                      style={{
                        background: RadioOptions?.[`${value}`]
                          ? RadioOptions?.[`${value}`]?.dotColor
                          : RadioOptions?.default?.dotColor,
                      }}
                    />
                    {selectedOptions?.[keyName] ? selectedOptions?.[keyName] : options?.[keyName]}
                  </div>
                  <Select
                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                    id={`${tableOptions[`${columnName?.toLowerCase()}`]?.field}`}
                    size="small"
                    multiple={tableOptions[`${columnName?.toLowerCase()}`]?.multiple || false}
                    fullWidth
                    data-testid="address_type"
                    placeholder="Select here"
                    autoComplete="off"
                    name={`${tableOptions[`${columnName?.toLowerCase()}`]?.field}`}
                    value={
                      selectedOptions?.[keyName] ? selectedOptions?.[keyName] : options?.[keyName]
                    }
                    className={chipTrue ? "hide__select" : ""}
                    renderValue={(val) => {
                      return val;
                    }}
                    // defaultValue={options?.[keyName]}
                    // onChange={(e: any) => {
                    //   e?.stopPropagation();
                    //   if (!tableOptions[`${columnName?.toLowerCase()}`]?.multiple) {
                    //     setSelectedOptions(e?.target?.value);
                    //     (async function apiHit() {
                    //       const apiResponse = await patchApiData({
                    //         values: {
                    //           status: e.target.value?.id,
                    //         },
                    //         id: row[tableOptions?.[`${columnName?.toLowerCase()}`]?.api?.columnId],
                    //         url: tableOptions?.[`${columnName?.toLowerCase()}`]?.api?.api,
                    //         enqueueSnackbar: enqueueSnackbar,
                    //         domain: 'Status',
                    //         setterLoading: tableOptions?.setIsLoading,
                    //       });
                    //       if (!apiResponse) {
                    //         const findData = tableOptions?.[
                    //           `${columnName?.toLowerCase()}`
                    //         ]?.options?.find(
                    //           (it: any) => it?.[keyName] == selectedOptions?.[keyName],
                    //         );
                    //         setSelectedOptions({ ...findData });
                    //       }
                    //     })();
                    //   } else {
                    //   }
                    // }}
                  >
                    {tableOptions?.[`${columnName?.toLowerCase()}`]?.options?.map(
                      (item: any, index: number) => (
                        <MenuItem
                          key={`${item?.[`${keyName}`]}`}
                          value={item}
                          style={{ ...getStyle(item) }}
                        >
                          {item?.[`${keyName}`]}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </div>
              );
            }

            return converText(value);
        }
      })()}

      {/* {tableOptions?.chipOptionsName?.includes(columnName?.toLowerCase()) ? (
        <div
          style={{
            display: 'inline-block',
            background: RadioOptions?.[`${value}`]
              ? RadioOptions?.[`${value}`].backgroundColor
              : RadioOptions?.[`default`].backgroundColor,
            padding: '8px 12px',
            paddingLeft: '30px',
            borderRadius: '20px',
            position: 'relative',
            color: RadioOptions?.[`${value}`]
              ? RadioOptions?.[`${value}`]?.textColor
              : RadioOptions?.[`default`]?.textColor,
          }}
          className="badge__creator">
          <span
            style={{
              background: RadioOptions?.[`${value}`]
                ? RadioOptions?.[`${value}`]?.dotColor
                : RadioOptions?.[`default`]?.dotColor,
            }}></span>
          {value}
        </div>
      ) : columnName?.toLowerCase() === 'website' ? (
        <a href={value} target="_blank">
          {value}
        </a>
      ) : (
        value
      )} */}
    </div>
  );
}

const DataContainer: React.FC<{
  data?: BASConfigTableProps;
  configName?: string;
  deletePath?: string;
  count?: number;
  backendUrl?: string;
  additionalEdit?: string;
  onDataChange?: (ev?: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: any;
  setterFunction?: (arg?: any) => void;
  popUpDisplay?: boolean;
  staticHeader?: any;
  onTitleNavigate?: any;
  tableTitle?: string;
  tableIndicator?: tableIndicatorProps;
  textTitleLength?: number;
  keyName?: string;
  csvDownload?: boolean;
  isAddModal?: boolean;
  setOpenAddModal?: (arg?: any) => void;
  urlUtils?: ConfigTableUrlUtils;
  allowFilter?: boolean;
  tableOptions?: any;
  children?: any;
  onAdd?: (arg?: any) => void;
  onUpdate?: (arg?: any) => void;
  name: string;
  defaultDisable?: Array<string>;
  fetchData?: (arg?: any) => Promise<boolean>;
  metadata?: metadataType;
  onStatusToggle?: (arg?: any) => void;
  expandableRow?: boolean;
}> = ({
  data,
  onDataChange,
  configName,
  count,
  deletePath,
  backendUrl,
  onDelete,
  additionalEdit,
  setterFunction,
  popUpDisplay = false,
  staticHeader = {},
  onTitleNavigate,
  tableTitle,
  urlUtils,
  tableIndicator,
  textTitleLength,
  keyName = "name",
  csvDownload = true,
  isAddModal = false,
  setOpenAddModal = () => {},
  allowFilter = false,
  tableOptions,
  children,
  onAdd,
  onUpdate,
  name,
  defaultDisable = [],
  fetchData,
  metadata = {
    perPage: defaultQuery.perPage,
    page: defaultQuery.page,
    totalItemsCount: 0,
    totalPagesCount: 0,
  },
  onStatusToggle,
  expandableRow = false,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  //  ------ Selected Row For Multiple Delete Start --------
  const [selected, setSelected] = React.useState<readonly object[]>([]);
  const [selectedData, setSelectedData] = React.useState<readonly object[]>([]);
  const [dense, setDense] = React.useState(false);
  // ------ Selected Row For Multiple Delete End --------
  const [page, setPage] = React.useState(metadata?.page || defaultQuery.page);
  const [rowsPerPage, setRowsPerPage] = React.useState(metadata?.perPage || defaultQuery.perPage);
  const [rows, setRows] = React.useState<RegionProps[]>(data?.items || []);
  const [headCells, setHeadCells] = React.useState<HeadCell[]>(
    transformHeaderCells(data?.headers || [], defaultDisable),
  );

  const [isHeaderCellEdit, setIsHeaderCellEdit] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [key, setKey] = React.useState<number>(new Date().getTime());
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const [filterModal, setFilterModal] = React.useState(false);
  const handleRequestSort = async (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";

    if (
      await fetchData({
        query: {
          sort: isAsc ? "desc" : "asc",
          order_by: property,
          size: rowsPerPage,
          page: 1,
        },
      })
    ) {
      setOrderBy(property);
      setOrder(isAsc ? "desc" : "asc");
    }
  };

  const handleIndividualDelete = (id: number, name: string) => {
    const foundData = data?.items.find((rg: any) => rg.id === id);
    foundData && setSelected([{ id, name }]);
    setOpenModal(true);
  };

  // on every item click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => ({ name: n.name, id: n.id }));
      setSelectedData(newSelected);
      return;
    }

    setSelectedData([]);
  };

  // on row click
  const handleClick = (event: React.MouseEvent<unknown>, name: string, id: any) => {
    const target = event.target as HTMLElement;

    if (target?.tagName?.includes("IMG") || target?.tagName?.includes("A")) return;

    const SelectedDataIndex = selectedData.findIndex(
      (data: { name?: string }) => data?.name === name,
    );

    let newSelected: readonly object[] = [];

    if (SelectedDataIndex === -1) {
      newSelected = newSelected.concat(selectedData, { name, id });
    } else if (SelectedDataIndex === 0) {
      newSelected = newSelected.concat(selectedData.slice(1));
    } else if (SelectedDataIndex === selectedData.length - 1) {
      newSelected = newSelected.concat(selectedData.slice(0, -1));
    } else if (SelectedDataIndex > 0) {
      newSelected = newSelected.concat(
        selectedData.slice(0, SelectedDataIndex),
        selectedData.slice(SelectedDataIndex + 1),
      );
    }
    setSelectedData(newSelected);
  };

  const handleTableCellVisibility = (id: string): string => {
    return headCells.some((hc) => hc.id == id && hc.show) ? "cell-visible" : "cell-hidden";
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
    fetchData({ query: { page: newPage + 1, perPage: rowsPerPage } });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isSelected = (name: string) =>
    selectedData.findIndex((data: { name?: string }) => data?.name === name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleEditTable = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setIsHeaderCellEdit(!isHeaderCellEdit);
  };
  const handleFilterTable = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setFilterModal(true);
  };

  const onUpdate1 = (headCells: HeadCell[]) => {
    setHeadCells(headCells);
    setIsHeaderCellEdit(false);
    setKey(new Date().getTime());
  };

  // handle delete
  const deleteHandler = async (datas: object[]) => {
    const selectedIds = datas?.map((data: { id?: number }) => data?.id);
    const selectedName = datas?.map((data: { name?: string }) => data?.name);
    // try {
    //   await deleteAPI(`${tableIndicator?.backendUrl ? tableIndicator?.backendUrl : backendUrl}/`, {
    //     config_ids: selectedIds,
    //   });
    //   enqueueSnackbar(
    //     `${
    //       selectedName?.length > 1 ? selectedName?.join(', ') : selectedName[0]
    //     } deleted successfully`,
    //     {
    //       variant: 'success',
    //     },
    //   );
    //   setterFunction?.((prev: any) => {
    //     // if(prev?.items)
    //     // need to put logic for those that have no items
    //     const newItems = prev?.items?.filter(
    //       (item: { id?: number }) => !selectedIds.includes(item.id),
    //     );
    //     return {
    //       ...prev,
    //       items: newItems,
    //       archivedCount: Number(prev?.archivedCount || 0) + 1,
    //     };
    //   });

    //   return true;
    // } catch (error) {
    //   enqueueSnackbar(
    //     error.message ||
    //       `Unable to delete ${
    //         selectedName?.length > 1 ? selectedName?.join(', ') : selectedName[0]
    //       }`,
    //     { variant: 'error' },
    //   );
    //   return true;
    // }
  };

  React.useEffect(() => {
    if (data?.items) {
      setRows(data?.items);
      if (data?.headers) {
        setHeadCells(transformHeaderCells(data?.headers, defaultDisable));
      }
    }
  }, [data?.items, data?.headers, defaultDisable]);

  React.useEffect(() => {
    if (Object.keys(staticHeader)?.length) {
      // setRows([]);
      setHeadCells?.(transformHeaderCells(staticHeader, defaultDisable));
    }
  }, [staticHeader]);

  // function
  function clearSelected() {
    setSelected([]);
    setSelectedData([]);
  }

  const searchParams = new URLSearchParams(location.pathname);
  const searchObject = Object.fromEntries(searchParams.entries());

  React.useEffect(() => {
    if (location?.pathname || Object?.keys(searchObject)?.length) {
      clearSelected();
    }
  }, [location?.pathname, Object?.keys(searchObject)?.length]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <ConfirmationModal
          openModal={openDeleteModal}
          setOpenModal={() => {
            setOpenDeleteModal(!openDeleteModal);
            setSelectedData([]);
          }}
          handelConfirmation={async () => {
            // deleteSelectedRows
            // await onDelete?.([...selectedData]);
            await deleteHandler([...selectedData]);
            setOpenDeleteModal(false);
            setSelectedData([]);
          }}
          confirmationHeading={`Do you want to delete these ${deletePath} ?`}
          confirmationDesc={`${selectedData?.map(
            (data: { name?: string }) => data?.name,
          )}  will be deleted.`}
          status="warning"
          confirmationIcon="/assets/icons/icon-feature.svg"
        />
        <FilterModal
          openModal={filterModal}
          setOpenModal={() => {
            setFilterModal(!filterModal);
            setSelectedData([]);
          }}
          // handelConfirmation={async () => {
          //   // deleteSelectedRows
          //   // await onDelete?.([...selectedData]);
          //   await deleteHandler([...selectedData]);
          //   setOpenDeleteModal(false);
          //   setSelectedData([]);
          // }}
          confirmationHeading={`Apply Filter`}
        >
          {children}
        </FilterModal>

        <TableColumns
          headCells={headCells}
          onHide={handleEditTable as any}
          modelOpen={isHeaderCellEdit}
          onUpdate={onUpdate1}
        />

        <div>
          <EnhancedTableToolbar
            name={name}
            onAdd={onAdd}
            count={count}
            configName={configName}
            numSelected={selectedData.length}
            onDataChange={onDataChange}
            handleEditTable={handleEditTable}
            handleFilterTable={handleFilterTable}
            archivedCount={data?.archivedCount}
            backendUrl={backendUrl}
            tableTitle={tableTitle}
            tableIndicator={tableIndicator}
            textTitleLength={textTitleLength}
            csvDownload={csvDownload}
            isAddModal={isAddModal}
            setOpenAddModal={setOpenAddModal}
            searchValue={urlUtils?.q}
            allowFilter={allowFilter}
          />
        </div>

        <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }} className="config-table-holder">
          {rows?.length ? (
            <Stack>
              <Box style={{ margin: 10 }}>
                <PerPageSelect
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  fetchData={fetchData}
                />
              </Box>
            </Stack>
          ) : null}
          <TableContainer>
            {rows?.length ? (
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                key={key}
              >
                <EnhancedTableHead
                  numSelected={selectedData.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headCells={headCells}
                  fetchData={fetchData}
                />
                <TableBody>
                  {/* Search row */}
                  <TableRow key={11} style={{ height: 40 }}>
                    {(rows || []).slice(0, 1).map((row: any, index: number) => {
                      return [...headCells]?.map((hc, index) => {
                        if (hc.action) return;
                        if (!hc.show) return;
                        return (
                          <TableCell sx={{ borderBottom: "none" }} key={hc.id}>
                            <Search searchField={hc?.id} onSearch={fetchData} />
                          </TableCell>
                        );
                      });
                    })}
                  </TableRow>
                  {(rows || []).map((row: any, index: number) => {
                    return (
                      <Row
                        key={index}
                        row={row}
                        headCells={headCells}
                        expandableRow={expandableRow}
                        {...{
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
                        }}
                      />
                    );
                    // const name =
                    //   row?.[`${tableIndicator?.deleteFieldName}`] || row?.name;
                    // const isItemSelected = isSelected(name as string);
                    // const labelId = `enhanced-table-checkbox-${index}`;
                    // let rowEditLink = '';
                    // if (additionalEdit) {
                    //   rowEditLink = `${row?.id}?address=${
                    //     row[`${additionalEdit}`]?.length
                    //       ? row[`${additionalEdit}`][0].id
                    //       : ''
                    //   }`;
                    // } else {
                    //   rowEditLink = `${row?.id}`;
                    // }

                    // return (
                    //   <>
                    //     <TableRow
                    //       hover
                    //       onClick={(event) => {
                    //         handleClick(event, name, row.id);
                    //       }}
                    //       role="checkbox"
                    //       aria-checked={isItemSelected}
                    //       tabIndex={-1}
                    //       key={row.id}
                    //       selected={isItemSelected}
                    //     >
                    //       {/* checkbox */}
                    //       {/* <TableCell padding="checkbox">
                    //        <Checkbox
                    //          color="primary"
                    //          checkedIcon={<img src={CheckIcon} alt="check" />}
                    //          icon={<img src={UnCheckIcon} alt="uncheck" />}
                    //          checked={isItemSelected}
                    //          inputProps={{
                    //            'aria-labelledby': labelId,
                    //          }}
                    //        />
                    //      </TableCell> */}

                    //       {[...headCells]?.map((hc, index) => {
                    //         if (hc.action) return;
                    //         if (hc.id === 'created_at' || hc.id === 'updated_at')
                    //           return (
                    //             <TableCell
                    //               key={index}
                    //               className={handleTableCellVisibility(hc.id)}
                    //               sx={{
                    //                 fontFamily: 'Lato',
                    //                 borderBottom: 'none',
                    //               }}
                    //             >
                    //               {moment(new Date(row[hc.id])).format(
                    //                 'MMM Do YY'
                    //               )}
                    //             </TableCell>
                    //           );
                    //         if (hc.id === 'status')
                    //           return (
                    //             <TableCell
                    //               className={handleTableCellVisibility(hc.id)}
                    //               sx={{
                    //                 borderBottom: 'none',
                    //                 fontFamily: 'Lato',
                    //               }}
                    //             >
                    //               <IOSSwitch
                    //                 checked={row['status']}
                    //                 // disableText
                    //                 onChange={(e) => onStatusToggle(row)}
                    //               />
                    //             </TableCell>
                    //           );

                    //         return (
                    //           <TableCell
                    //             className={handleTableCellVisibility(hc.id)}
                    //             key={hc.id}
                    //             sx={{
                    //               borderBottom: 'none',
                    //               fontFamily: 'Lato',
                    //               fontSize: '1.5rem',
                    //             }}
                    //           >
                    //             <GetValue
                    //               row={row}
                    //               columnName={hc?.id}
                    //               popUpDisplay={
                    //                 tableIndicator?.popUpField?.key === hc?.id
                    //                   ? popUpDisplay
                    //                   : false
                    //               }
                    //               onTitleNavigate={onTitleNavigate}
                    //               title={hc?.label}
                    //               tableOptions={tableOptions}
                    //             />
                    //             {tableIndicator?.popUpField?.key === hc?.id && (
                    //               <PopUpCustom
                    //                 data={row[tableIndicator?.popUpField?.key]}
                    //                 title={tableIndicator?.popUpField?.label}
                    //                 ID={row?.id}
                    //                 tableIndicator={tableIndicator}
                    //               />
                    //             )}

                    //             {hc?.id === 'attachments' && (
                    //               <PopUpCustom
                    //                 data={row[hc?.id]?.map(
                    //                   (data: any) => data?.attachment
                    //                 )}
                    //                 ID={row?.id}
                    //                 title="View Attachments"
                    //                 tableIndicator={tableIndicator}
                    //                 openInNewWindow={true}
                    //               />
                    //             )}
                    //           </TableCell>
                    //         );
                    //       })}

                    //       <TableCell
                    //         className={handleTableCellVisibility('action')}
                    //         sx={{ borderBottom: 'none' }}
                    //       >
                    //         <div
                    //           className="actions-btns-holder"
                    //           style={{
                    //             display: 'flex',
                    //             justifyContent: 'end',
                    //           }}
                    //         >
                    //           <Button
                    //             style={{ minWidth: '0' }}
                    //             onClick={() => {
                    //               onDelete({ item: row });
                    //               const name =
                    //                 row?.[`${tableIndicator?.deleteFieldName}`] ||
                    //                 row?.name;
                    //               handleIndividualDelete(row.id, name);
                    //             }}
                    //             startIcon={
                    //               <img
                    //                 width={18}
                    //                 height={18}
                    //                 src={deleteIcon}
                    //                 alt="delete"
                    //               />
                    //             }
                    //           />
                    //           {/* <Link
                    //              href={`${
                    //                tableIndicator?.editFrontEndUrlGetter
                    //                  ? tableIndicator?.editFrontEndUrlGetter(row?.id)
                    //                  : rowEditLink
                    //                  ? `edit/${rowEditLink}`
                    //                  : `edit/${row?.id}`
                    //              }`}>
                    //              <Button
                    //                style={{ minWidth: '0' }}
                    //                startIcon={<img src={IconEdit} alt="edit" />}
                    //              />
                    //            </Link> */}
                    //           <Button
                    //             onClick={() => {
                    //               onUpdate({ item: row });
                    //             }}
                    //             style={{ minWidth: '0' }}
                    //             startIcon={
                    //               <img
                    //                 width={18}
                    //                 height={18}
                    //                 src={editIcon}
                    //                 alt="edit"
                    //               />
                    //             }
                    //           />
                    //         </div>
                    //       </TableCell>
                    //     </TableRow>
                    //   </>
                    // );
                  })}
                </TableBody>
              </Table>
            ) : null}
            {rows?.length === 0 && (
              <Box sx={{ pb: 4, width: "100%" }}>
                <NoDataFound
                  title={name}
                  // link={`${location.pathname}/add`}
                  // title={`${letterHandler(deletePath)}`}
                />
              </Box>
            )}
          </TableContainer>
          {rows?.length ? (
            <TablePagination
              className="table-pagination"
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={Number(metadata?.totalItemsCount)}
              rowsPerPage={Number(metadata.perPage) || Number(defaultQuery.perPage)}
              page={Number(metadata.page - 1) || Number(defaultQuery.page - 1)}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ fontFamily: defaultFont }}
            />
          ) : null}
        </Paper>

        {/* {selectedData.length > 0 && (
          <AppBar
            position="sticky"
            enableColorOnDark
            style={{ top: 'auto', bottom: 0, borderRadius: '15px' }}
          >
            <Toolbar
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className="left_items">
                <InfoIcon />
                <div
                  className="no_of_selected_text"
                  style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    marginLeft: '15px',
                  }}
                >
                  {selectedData.length} {configName} Selected
                </div>
              </div>
              <div className="right_items">
                <DeleteOutlineIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                />
                <ClearIcon
                  sx={{ marginLeft: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedData([]);
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        )} */}
        {/* {!!(data?.items?.length === 0) && (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Link
              href={`${
                tableIndicator?.frontEndUrl
                  ? tableIndicator?.frontEndUrl
                  : `${location?.pathname}/add`
              }`}
            >
              <Button variant="contained">
                + Add{' '}
                {(tableIndicator?.buttonName
                  ? tableIndicator?.buttonName
                  : configName) || ''}
              </Button>
            </Link>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default DataContainer;
