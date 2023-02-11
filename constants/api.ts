const api = {
  login: "/login/",
  logout: "/logout/",
  me: "/me/",
  user: "/users/",
  getUserVideoUploadPath: (id: string) => `/users/${id}/upload/video/`,
  uploadFile: "/upload/file",
};

export default api;
