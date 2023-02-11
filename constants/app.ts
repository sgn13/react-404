// in case of multiple apps with their own sidebar
const appRoots = {
  desk: "/desk",
};

const app = {
  root: "/",
  welcome: `/welcome`,
  auth: {
    me: "/me",
    changepassword: "/change-password",
  },
  user: {
    root: "/user",
    create: `/user/create`,
    update: (id = "") => `/user/${id}/update`,
    view: (id = "") => `/user/${id}/view`,
  },
  movie: {
    root: "/movie",
    create: `/movie/create`,
    update: (id = "") => `/movie/${id}/update`,
    view: (id = "") => `/movie/${id}/view`,
  },
  online: `/online-users`,
};

export default app;
