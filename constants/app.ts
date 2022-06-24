const appRoot = {
  driver: "/vehicle-reservation",
  courier: "/courier",
  appBuilder: "/digital-logbook-form",
  dartaChalani: "/darta-chalani",
  darta: "/darta",
  chalani: "/chalani",
  role: "/role",
  group: "/group",
  user: "/user",
};

const app = {
  me: "/",
  changepassword: "/change-password",

  driver: {
    root: appRoot.driver,
    create: () => `${appRoot.driver}/create`,
    update: (id) => `${appRoot.driver}/update/${id}`,
    view: (id) => `${appRoot.driver}/view/${id}`,
    manage: (id) => `${appRoot.driver}/manage/${id}`,
    book: `${appRoot.driver}/reserve`,
    reservations: `${appRoot.driver}/reservations`,
    reserved: `${appRoot.driver}/reserved`,
    recommended: `${appRoot.driver}/recommended`,
    confirmed: `${appRoot.driver}/confirmed`,
    track: `${appRoot.driver}/track`,
    report: `${appRoot.driver}/report`,
    vehicle: `${appRoot.driver}/vehicle`,
    driver: `${appRoot.driver}/driver`,
    shift: `${appRoot.driver}/shift`,
    createShift: () => `${appRoot.driver}/shift/create`,
    updateShift: (id) => `${appRoot.driver}/shift/update/${id}`,

    createVehicle: () => `${appRoot.driver}/vehicle/create`,
    changeShift: `${appRoot.driver}/shift/change`,
    maintanence: `${appRoot.driver}/maintanence`,
  },

  courier: {
    root: appRoot.courier,
    create: () => `${appRoot.courier}/create`,
    update: (id) => `${appRoot.courier}/update/${id}`,
    view: (id) => `${appRoot.courier}/view/${id}`,
    manage: (id) => `${appRoot.courier}/manage/${id}`,
  },

  dartaChalani: {
    root: appRoot.dartaChalani,
  },

  darta: {
    root: appRoot.darta,
    create: () => `${appRoot.darta}/create`,
    update: (id) => `${appRoot.darta}/update/${id}`,
    view: (id) => `${appRoot.darta}/view/${id}`,
    manage: () => `${appRoot.darta}/manage/`,
  },
  chalani: {
    root: appRoot.chalani,
    create: () => `${appRoot.chalani}/create`,
    update: (id) => `${appRoot.chalani}/update/${id}`,
    view: (id) => `${appRoot.chalani}/view/${id}`,
    manage: () => `${appRoot.chalani}/manage`,
  },

  appBuilder: {
    root: appRoot.appBuilder,
    create: () => `${appRoot.appBuilder}/create`,
    update: (id) => `${appRoot.appBuilder}/update/${id}`,
    view: (id) => `${appRoot.appBuilder}/view/${id}`,
    manage: () => `${appRoot.appBuilder}/manage`,
  },
  user: {
    root: appRoot.user,
    create: () => `${appRoot.user}/create`,
    update: (id) => `${appRoot.user}/update/${id}`,
    view: (id) => `${appRoot.user}/view/${id}`,
    manage: () => `${appRoot.user}/manage/`,
  },
  group: {
    root: appRoot.group,
    create: () => `${appRoot.group}/create`,
    update: (id) => `${appRoot.group}/update/${id}`,
    view: (id) => `${appRoot.group}/view/${id}`,
    manage: () => `${appRoot.group}/manage/`,
  },
  role: {
    root: appRoot.role,
    create: () => `${appRoot.role}/create`,
    update: (id) => `${appRoot.role}/update/${id}`,
    view: (id) => `${appRoot.role}/view/${id}`,
    manage: () => `${appRoot.role}/manage/`,
    execute: (id) => `${appRoot.role}/execute/${id}`,
  },
};

export default app;
