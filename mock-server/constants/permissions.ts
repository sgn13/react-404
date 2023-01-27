type PermissionsType = {
  kyc: {
    [key: string]: string | object;

    view: string;
    add: string;
    change: string;
    delete: string;
    verify: string;
    approve: string;
    superuser: string;
    kycAdmin: string;
    supervisor: string;
    onlineresponse: { [key: string]: string };
    liveresponse: { [key: string]: string };
    checklist: { [key: string]: string };
    methodmanagement: { [key: string]: string };
    accounttype: { [key: string]: string };
    deviceinfo: { [key: string]: string };
    guideline: { [key: string]: string };
  };
};

// auto infer types
export const permissions: PermissionsType = {
  kyc: {
    view: "kyc.view_kyc",
    add: "kyc.add_kyc",
    change: "kyc.change_kyc",
    delete: "kyc.delete_kyc",
    verify: "kyc.verify_kyc",
    approve: "kyc.approve_kyc",
    supervisor: "kyc.supervisor",
    superuser: "kyc.superuser",
    kycAdmin: "kyc.admin",

    onlineresponse: {
      add: "kyc.add_onlineresponse",
      view: "kyc.view_onlineresponse",
      change: "kyc.change_onlineresponse",
      delete: "kyc.delete_onlineresponse",
    },

    liveresponse: {
      add: "kyc.add_liveresponse",
      view: "kyc.view_liveresponse",
      change: "kyc.change_liveresponse",
      delete: "kyc.delete_liveresponse",
    },

    checklist: {
      add: "kyc.add_checklist",
      delete: "kyc.delete_checklist",
      view: "kyc.view_checklist",
      change: "kyc.change_checklist",
      manage: "kyc.manage_checklist",
    },

    guideline: {
      manage: "kyc.manage_guidelines",
    },

    deviceinfo: {
      add: "kyc.add_deviceinfo",
      view: "kyc.view_deviceinfo",
      change: "kyc.change_deviceinfo",
      delete: "kyc.delete_deviceinfo",
    },

    methodmanagement: {
      add: "kyc.add_methodmanagement",
      view: "kyc.view_methodmanagement",
      change: "kyc.change_methodmanagement",
      delete: "kyc.delete_methodmanagement",
    },

    accounttype: {
      add: "kyc.add_accounttype",
      view: "kyc.view_accounttype",
      change: "kyc.change_accounttype",
      delete: "kyc.delete_accounttype",
      manage: "kyc.manage_account_types",
    },
  },
};

export const permissionMethods = ["add", "change", "delete", "view"];

export const kycCrudPermissions = permissionMethods.map((method) => permissions.kyc[method]);

export const kycAllPermissions = [
  ...permissionMethods,
  "verify",
  "approve",
  "superuser",
  "kycAdmin",
].map((method) => permissions.kyc[method]);

export const onlineresponsePermissions = permissionMethods.map(
  (method) => permissions.kyc.onlineresponse[method],
);

export const liveresponsePermissions = permissionMethods.map(
  (method) => permissions.kyc.liveresponse[method],
);

export const methodmanagementPermissions = permissionMethods.map(
  (method) => permissions.kyc.methodmanagement[method],
);

export const deviceinfoPermissions = permissionMethods.map(
  (method) => permissions.kyc.deviceinfo[method],
);

export const checklistPermissions = permissionMethods.map(
  (method) => permissions.kyc.checklist[method],
);

export const rolePermissions = {
  kyc: {
    user: [],
    admin: kycCrudPermissions,
    superuser: kycAllPermissions,
  },
};

// better to generate the array using loop or recursion so that it will be dynamic
export const allPermissions = [
  "authentication.view_customuser",
  "kyc.change_accounttype",
  "kyc.add_liveresponse",
  "admin.view_logentry",
  "kyc.delete_methodmanagement",
  "authtoken.add_token",
  "sites.view_site",
  "authtoken.delete_token",
  "kyc.change_methodmanagement",
  "authtoken.view_token",
  "sites.delete_site",
  "video_call.view_onlineusers",
  "kyc.add_deviceinfo",
  "auth.view_group",
  "kyc.view_kyc",
  "kyc.view_liveresponse",
  "sites.change_site",
  "auth.delete_group",
  "kyc.view_checklist",
  "kyc.change_checklist",
  "kyc.change_kyc",
  "authentication.delete_customuser",
  "authtoken.change_tokenproxy",
  "kyc.delete_kyc",
  "kyc.delete_liveresponse",
  "admin.delete_logentry",
  "kyc.change_deviceinfo",
  "video_call.change_onlineusers",
  "kyc.change_liveresponse",
  "sites.add_site",
  "contenttypes.add_contenttype",
  "video_call.add_onlineusers",
  "kyc.manage_guidelines",
  "auth.change_permission",
  "kyc.delete_deviceinfo",
  "kyc.add_onlineresponse",
  "kyc.add_methodmanagement",
  "contenttypes.view_contenttype",
  "kyc.add_kyc",
  "kyc.delete_onlineresponse",
  "kyc.view_onlineresponse",
  "authtoken.delete_tokenproxy",
  "auth.view_permission",
  "kyc.admin",
  "authtoken.add_tokenproxy",
  "kyc.change_onlineresponse",
  "authentication.add_customuser",
  "auth.add_permission",
  "kyc.approve_kyc",
  "kyc.view_deviceinfo",
  "contenttypes.change_contenttype",
  "kyc.add_accounttype",
  "kyc.verify_kyc",
  "admin.change_logentry",
  "kyc.delete_checklist",
  "authtoken.change_token",
  "auth.add_group",
  "admin.add_logentry",
  "authtoken.view_tokenproxy",
  "video_call.delete_onlineusers",
  "auth.delete_permission",
  "kyc.manage_checklist",
  "kyc.view_accounttype",
  "kyc.add_checklist",
  "auth.change_group",
  "kyc.delete_accounttype",
  "contenttypes.delete_contenttype",
  "kyc.view_methodmanagement",
  "authentication.change_customuser",
  "kyc.manage_account_types",
  "kyc.supervisor",
];
