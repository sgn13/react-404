import DataGrid, { columnItem } from "components/DataGrid/DataGrid";
import { fetchLiveClients } from "store/liveClient/actions";
import { AppState } from "store/reducer";
import { connect, ConnectedProps } from "react-redux";

const searchColumns = [
  { position: 1, title: "Name", queryKey: "fullName", checked: true },
  { position: 2, title: "Functional Title", queryKey: "functionalTitle", checked: true },
  { position: 3, title: "Email", queryKey: "email", checked: false },
  { position: 4, title: "City", queryKey: "city", checked: true },
  { position: 5, title: "Department", queryKey: "department", checked: false },
];

const criterias = [
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

const conditions = [
  { title: "Greater than", queryKey: ">", type: "number" },
  { title: "Less than", queryKey: "<", type: "number" },
  { title: "Equals to", queryKey: "=", type: "number" },
  { title: null, queryKey: "=", type: "string" },
  { title: null, queryKey: "=", type: "date" },
  { title: null, queryKey: "=", type: "boolean" },
];

const values = [
  {
    type: "boolean",
    options: [
      { valueTitle: "Yes", queryKey: true },
      { valueTitle: "No", queryKey: false },
    ],
  },
];

const filterOptions: { criterias: any; conditions: any; values: any } = {
  criterias,
  conditions,
  values,
};

const searchOptions = {
  columns: searchColumns,
};

const columns: columnItem[] = [
  {
    header: "Name",
    accessorKey: "fullName",
  },
  {
    header: "Functional Title",
    accessorKey: "functionalTitle",
  },
  { header: "Email", accessorKey: "email" },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
];

function Index({
  liveclients = [],
  metadata,
  isLoading,
  isSubmitting,
  fetchLiveClients,
  theme,
}: PropsFromRedux) {
  return (
    <DataGrid
      tableName="Users Data"
      data={liveclients}
      dataColumns={columns}
      searchColumns={searchOptions.columns}
      fetcher={fetchLiveClients}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      metadata={metadata}
      criteriaOptions={filterOptions.criterias}
      conditionOptions={filterOptions.conditions}
      valueOptions={filterOptions.values}
      onDelete={() => {}}
      onUpdate={() => {}}
      onView={() => {}}
      theme={theme}
    />
  );
}

const mapStateToProps = ({
  appState: { me },
  liveClientState: { liveclients, metadata, isLoading, isSubmitting },
  themeState: { theme },
}: AppState) => ({
  me,
  liveclients,
  metadata,
  isLoading,
  isSubmitting,
  theme,
});

const mapDispatchToProps = {
  fetchLiveClients,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Index);
