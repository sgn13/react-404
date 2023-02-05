function checkPermission(givenPermission?: string | string[], allPermissions?: string[]) {
  if (!givenPermission || !allPermissions || !allPermissions.length) return false;
  if (Array.isArray(givenPermission))
    return allPermissions.some((item) => givenPermission.includes(item));
  return allPermissions.includes(givenPermission); // if permission is not array.
}

export default checkPermission;
