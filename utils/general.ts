export const getArrayOfCountingNumbers = (length = 10) =>
  Array(length)
    .fill(0)
    .map((_, i) => i + 1);

export const getArrayOfCountingNumbers2 = (length = 10) => Array.from({ length }, (_, i) => i + 1);

export const getQueryString = (obj: any) => new URLSearchParams(obj).toString();

export const consoleLogFormData = (formData: any) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const pair of formData.entries()) {
    console.info(`${pair[0]} = ${pair[1]}`);
  }
};

export const shallowEqual = ({ object1, object2 }: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
};

export const getFileExtension = (filename: any) => {
  const splittedFileIcon = String(filename).split(".");

  if (splittedFileIcon.length) {
    return splittedFileIcon[splittedFileIcon.length - 1];
  }
  return undefined;
};

export const checkPermission = ({ permission, permissions = [] }: any) => {
  const result =
    !permission ||
    !permission.length ||
    (permissions.length && Array.isArray(permission)
      ? permissions.some((v) => permission.includes(v))
      : permissions.includes(permission));

  return result;
};

// export const parseJwt = (token?: string) => {
//   if (!token) return "";
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
//       })
//       .join(""),
//   );

//   return JSON.parse(jsonPayload);
// };

// export const getParsedJWT = parseJwt(sessionStorage.getItem(`accessToken`) as any);

export function setIntervalWithCount(delay = 500, noOfTimes = 5) {
  let count = 0;
  const intervalID = setInterval(() => {
    count += 1;
    if (count === noOfTimes) {
      window.clearInterval(intervalID);
    }
  }, delay);
}
