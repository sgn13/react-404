export const checkPermission = ({ permission, permissions = [] }) => {
  const result =
    !permission ||
    !permission.length ||
    (permissions.length && Array.isArray(permission)
      ? permissions.some((v) => permission.includes(v))
      : permissions.includes(permission));

  return result;
};

export const parseJwt = (token) => {
  if (!token) return '';
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const getParsedJWT = parseJwt(sessionStorage.getItem(`accessToken`) as any);
