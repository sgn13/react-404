type PermissionsType = {
  auth: {
    admin: { [key: string]: string };
    user: { [key: string]: string };
    group: { [key: string]: string };
    permission: { [key: string]: string };
    token: { [key: string]: string };
  };
  courier_services: {
    supervisor: string;
    courier: { [key: string]: string };
  };
  vehicle_reservation: {
    driver_head: string;
    reservation_approve: string;
    reservation_admin: string;
    drivers: {
      [key: string]: string;
    };
    drivershift: {
      [key: string]: string;
    };
    reservation: {
      [key: string]: string;
    };
    vehicle: {
      [key: string]: string;
    };
  };
};

export const permissions: PermissionsType = {
  auth: {
    admin: {
      add: "auth.admin_add",
      change: "auth.admin_change",
      delete: "auth.admin_delete",
      view: "auth.admin_view",
    },
    user: {
      add: "auth.add_user",
      change: "auth.change_user",
      delete: "auth.delete_user",
      view: "auth.view_user",
    },
    group: {
      add: "auth.add_group",
      change: "auth.change_group",
      delete: "auth.delete_group",
      view: "auth.view_group",
    },
    permission: {
      add: "auth.add_permission",
      change: "auth.change_permission",
      delete: "auth.delete_permission",
      view: "auth.view_permission",
    },
    token: {
      add: "auth.add_token",
      change: "auth.change_token",
      delete: "auth.delete_token",
      view: "auth.view_token",
    },
  },

  courier_services: {
    supervisor: "courier_services.supervisor",
    courier: {
      add: "courier_services.add_courier",
      change: "courier_services.change_courier",
      delete: "courier_services.delete_courier",
      view: "courier_services.view_courier",
    },
  },

  vehicle_reservation: {
    driver_head: "vehicle_reservation.driver_head",
    reservation_approve: "vehicle_reservation.reservation_approve",
    reservation_admin: "vehicle_reservation.reservation_admin",
    drivers: {
      add: "vehicle_reservation.add_drivers",
      change: "vehicle_reservation.change_drivers",
      delete: "vehicle_reservation.delete_drivers",
      view: "vehicle_reservation.view_drivers",
    },
    drivershift: {
      add: "vehicle_reservation.add_drivershift",
      change: "vehicle_reservation.change_drivershift",
      delete: "vehicle_reservation.delete_drivershift",
      view: "vehicle_reservation.view_drivershift",
    },
    reservation: {
      add: "vehicle_reservation.add_reservation",
      change: "vehicle_reservation.change_reservation",
      delete: "vehicle_reservation.delete_reservation",
      manage: "vehicle_reservation.manage_reservation",
      view: "vehicle_reservation.view_reservation",
    },
    vehicle: {
      add: "vehicle_reservation.add_vehicle",
      change: "vehicle_reservation.change_vehicle",
      delete: "vehicle_reservation.delete_vehicle",
      view: "vehicle_reservation.view_vehicle",
    },
  },
};

export const permissionMethods = ["add", "change", "delete", "view", "manage"];

export const GroupPermissions = permissionMethods.map((method) => permissions.auth.group[method]);
export const PermissionPermissions = permissionMethods.map(
  (method) => permissions.auth.permission[method],
);
export const UserPermissions = permissionMethods.map((method) => permissions.auth.user[method]);

export const CourierPermissions = permissionMethods.map(
  (method) => permissions.courier_services.courier[method],
);

export const DriversPermissions = permissionMethods.map(
  (method) => permissions.vehicle_reservation.drivers[method],
);
export const DriverShiftPermissions = permissionMethods.map(
  (method) => permissions.vehicle_reservation.drivershift[method],
);
export const ReservationPermissions = permissionMethods.map(
  (method) => permissions.vehicle_reservation.reservation[method],
);
export const VehiclePermissions = [
  permissions.vehicle_reservation.driver_head,
  permissions.vehicle_reservation.reservation_admin,
  permissions.vehicle_reservation.reservation_approve,
  ...permissionMethods.map((method) => permissions.vehicle_reservation.vehicle[method]),
];

export const AllCourierPermissionList = [
  "courier_services.add_courier",
  "courier_services.view_courier",
  "courier_services.supervisor",
];

export const AllVehicleReservationPermissionList = [
  "vehicle_reservation.add_reservation",
  "vehicle_reservation.driver_head",
  "vehicle_reservation.reservation_admin",
  "vehicle_reservation.reservation_approve",
];

export const rolePermissions = {
  auth: { admin: [] },
  authentication: { admin: [] },
  courier_services: {
    admin: AllCourierPermissionList,
    employee: [permissions.courier_services.courier.add, permissions.courier_services.courier.view],
    delivery: [
      permissions.courier_services.courier.change,
      permissions.courier_services.courier.view,
    ],
  },

  vehicle_reservation: {
    admin: AllVehicleReservationPermissionList,
    employee: [
      permissions.vehicle_reservation.reservation.add,
      permissions.vehicle_reservation.drivers.view,
      permissions.vehicle_reservation.vehicle.view,
      permissions.vehicle_reservation.reservation.view,
    ],
    headDriver: [
      permissions.vehicle_reservation.drivers.change,
      permissions.vehicle_reservation.reservation.change,
      permissions.vehicle_reservation.vehicle.change,
      permissions.vehicle_reservation.drivers.view,
      permissions.vehicle_reservation.reservation.view,
      permissions.vehicle_reservation.vehicle.view,
      permissions.vehicle_reservation.reservation.manage,
    ],
    headOfDepartment: ReservationPermissions,
  },
};
