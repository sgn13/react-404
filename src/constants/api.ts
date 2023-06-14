// const api = {
//   login: "/login/",
//   logout: "/logout/",
//   me: "/me/",
//   user: "/users/",
//   liveclient: "/users",
//   getUserVideoUploadPath: (id: string) => `/users/${id}/upload/video/`,
//   uploadFile: "/upload/file",
// };

const apiRoot = {
  configuation: "/configuration",
  source: "/source",
};

const api = {
  login: "/user/auth/login",
  otp_login: "/user/auth/send_token",
  forgotPassword: "/user/auth/reset-password",
  changePassword: "/user/change-password",
  configuration: {
    root: apiRoot.configuation,
    controller: `/controller/`,
    library: `/library/`,
    exclusion: `/exclusion/`,
    placement: `/placement/`,
  },
  source: {
    root: apiRoot.source,
    folder: `/folder/`,
    fileUpload: `/file-upload/`,
    streaming: `/streaming/`,
    dbPull: `/db-pull/`,
  },

  logout: "/logout/",
  me: "/me/",
  folder: "/folder",
  getUserVideoUploadPath: (id: string) => `/users/${id}/upload/video/`,
  uploadFile: "/upload/file",

  permission: "/permission",
  userPermission: "/user-permission",
};

export default api;
