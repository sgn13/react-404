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
  environment: { root: "/venv_management_handler/" },
  configuration: {
    root: apiRoot.configuation,
    controller: `/controller/`,
    library: `/library/`,
    exclusion: `/exclusion/`,
    placement: `/placement/`,
  },
  data: {
    annotationImage: "/image-upload/",
    annotationData: "/image-upload/annotate",
  },
  source: {
    root: apiRoot.source,
    folder: `/folder/`,
    fileUpload: `/file-upload/`,
    streaming: `/streaming/`,
    dbPull: `/db-pull/`,
  },
  model: {
    root: "/model/",
  },

  feature: {
    root: "/feature_en/",
  },

  template: {
    root: "/template/",
  },

  mlPipe: {
    root: "/ml_pipe/",
  },

  mlPipeBuild: {
    root: "/ml_pipe/tunnel/build",
  },

  predict: "/ml_pipe/tunnel/predict",
  featureFiles: "/ml_pipe/get_feature_engineering_files/",

  logout: "/logout/",
  me: "/me/",
  folder: "/folder",
  getUserVideoUploadPath: (id: string) => `/users/${id}/upload/video/`,
  uploadFile: "/upload/file",

  permission: "/permission",
  userPermission: "/user-permission",
};

export default api;
