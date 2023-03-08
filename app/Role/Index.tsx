import DataGrid, { columnItem } from "components/DataGrid/DataGrid";
import { fetchLiveClients } from "store/liveClient/actions";
import { AppState } from "store/reducer";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import app from "constants/app";

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
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Permission Set",
    accessorKey: "permissions",
  },
  { header: "Created at", accessorKey: "createdAt" },
];

export const defaultRoles = [
  {
    id: "1",
    role: "User",
    permissions: [
      {
        id: 1,
        permission: "kyc.admin",
        displayName: "KYC Admin",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
      {
        id: 2,
        permission: "kyc.view",
        displayName: "View KYC",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
    ],
    createdAt: `${new Date().getTime()}`,
  },
  {
    id: "2",
    role: "Manager",
    permissions: [
      {
        id: 1,
        permission: "kyc.admin",
        displayName: "KYC Admin",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
      {
        id: 2,
        permission: "kyc.view",
        displayName: "View KYC",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
    ],
    createdAt: `${new Date().getTime()}`,
  },
  {
    id: "3",
    role: "Admin",
    permissions: [
      {
        id: 1,
        permission: "kyc.admin",
        displayName: "KYC Admin",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
      {
        id: 2,
        permission: "kyc.view",
        displayName: "View KYC",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
    ],
    createdAt: `${new Date().getTime()}`,
  },
  {
    id: "4",
    role: "Support",
    permissions: [
      {
        id: 1,
        permission: "kyc.admin",
        displayName: "KYC Admin",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
      {
        id: 2,
        permission: "kyc.view",
        displayName: "View KYC",
        resource: "kyc",
        database: "database1",
        assignedToRoles: ["roleId1", "roleId2"],
      },
    ],
    createdAt: `${new Date().getTime()}`,
  },
];

function Index({
  roles = defaultRoles,
  metadata,
  isLoading,
  isSubmitting,
  fetchLiveClients,
}: PropsFromRedux) {
  const navigate = useNavigate();

  const handleView = (row) => {
    const item = row.original;
    console.log("view", item);
  };

  const handleUpdate = (row) => {
    console.log("update", row);
    const item = row.original;
    navigate(`${app.role.update(item?.id)}`);
  };

  const handleDelete = (row) => {
    console.log("delete", row);
  };

  return (
    <DataGrid
      entityName="Role"
      tableName="Role List"
      data={roles}
      dataColumns={columns}
      searchColumns={searchOptions.columns}
      fetcher={fetchLiveClients}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      metadata={metadata}
      criteriaOptions={filterOptions.criterias}
      conditionOptions={filterOptions.conditions}
      valueOptions={filterOptions.values}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      onView={handleView}
      onAdd={() => navigate(app.role.create)}
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
