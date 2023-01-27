const appRoot = {
  desk: "/desk",
};

const app = {
  me: "/",
  changepassword: "/change-password",
  desk: {
    root: appRoot.desk,
    welcome: `${appRoot.desk}/welcome/`,
    online: `${appRoot.desk}/online-users/`,
    movie: {
      root: () => `${appRoot.desk}/movie/`,
      create: () => `${appRoot.desk}/movie/create`,
      update: (id = "") => `${appRoot.desk}/movie/${id}/update`,
      view: (id = "") => `${appRoot.desk}/movie/${id}/view`,
    },
    user: {
      root: () => `${appRoot.desk}/user/`,
      create: () => `${appRoot.desk}/user/create`,
      update: (id = "") => `${appRoot.desk}/user/${id}/update`,
      view: (id = "") => `${appRoot.desk}/user/${id}/view`,
    },
  },
};

export default app;
