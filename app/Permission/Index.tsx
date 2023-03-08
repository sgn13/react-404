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

// permisions and resources are harded by backend and cannot be made dynamic to create them using frontend
const myPermissions = [
  {
    id: 1,
    permission: "kyc.admin",
    displayName: "KYC Admin",
    resource: "kyc",
    database: "database1",
    description: "",
    assignedToRoles: ["roleId1", "roleId2"],
  },
  {
    id: 2,
    permission: "kyc.view",
    displayName: "View KYC",
    resource: "kyc",
    database: "database1",
    description: "",
    assignedToRoles: ["roleId1", "roleId2"],
  },
];

// roles can be dynamically created and deleted from frontend
// Role is composed of a group of permissions.
const myRoles = [
  {
    id: "1",
    role: "User",
    description: "",
    permissions: ["permissionId1", "permissionId2"],
  },
  {
    id: "2",
    role: "Manager",
    description: "",
    permissions: ["permissionId1", "permissionId2"],
  },
  {
    id: "3",
    role: "Admin",
    description: "",
    permissions: ["permissionId1", "permissionId2"],
  },
  {
    id: "4",
    role: "Support",
    description: "",
    permissions: ["permissionId1", "permissionId2"],
  },
];

const columns: columnItem[] = [
  {
    header: "Permission",
    accessorKey: "name",
  },
  {
    header: "Assigned To",
    accessorKey: "assignedTo",
  },
  { header: "Created At", accessorKey: "createdAt" },
];

function Index({
  permissions = [
    {
      id: 1,
      name: "KYC View",
      assignedTo: [
        { id: 1, displayName: "Manager" },
        { id: 2, displayName: "User Admin" },
        { id: 3, displayName: "Project Manager" },
        { id: 4, displayName: "Superuser" },
      ],
      createdAt: `${new Date().getTime()}`,
    },
    {
      id: 2,
      name: "KYC Update",
      assignedTo: [{ id: 32, displayName: "KYC Admin" }],
      createdAt: `${new Date().getTime()}`,
    },
  ],
  metadata,
  isLoading,
  isSubmitting,
  fetchLiveClients,
}: PropsFromRedux) {
  return (
    <DataGrid
      tableName="Permissions List"
      data={permissions}
      dataColumns={columns}
      searchColumns={searchOptions.columns}
      // fetcher={fetchLiveClients}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      metadata={metadata}
      criteriaOptions={filterOptions.criterias}
      conditionOptions={filterOptions.conditions}
      valueOptions={filterOptions.values}
      onView={() => {}}
      onUpdate={() => {}}
    />
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
  fetchLiveClients,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Index);
