const appRoot = {
  desk: "/desk",
};

const app = {
  me: "/",
  changepassword: "/change-password",
  desk: {
    root: appRoot.desk,
    welcome: `${appRoot.desk}/welcome/`,
    user: {
      root: () => `${appRoot.desk}/user/`,
      create: () => `${appRoot.desk}/user/create`,
      update: (id = "") => `${appRoot.desk}/user/${id}/update`,
      view: (id = "") => `${appRoot.desk}/user/${id}/view`,
    },
  },
};

export default app;
