export default {
  profile: {
    id: 21,
    email: "firojsiddiki@gmail.com",
    full_name: "Test User",
    profile_pic:
      "https://api.vkyc.prabhu.mangosoftsolution.dev/media/profile/pics/screenshot_2.png",
    branch_name: "Anamnagar",
    branch_code: "004",
    department: "Central Operations",
    functional_title: "Junior Assistant",
    is_superuser: false,
    is_active: true,
    is_staff: false,
    is_admin: false,
  },
  roles: {
    user: {
      status: true,
      display_name: "Normal User",
      name: "is_active",
    },
    superuser: {
      status: false,
      display_name: "Super User",
      name: "is_superuser",
    },
  },
  permissions: {
    "Video KYC": [
      {
        permission: "kyc.verify_kyc",
        id: 29,
        has_permission: false,
        display_name: "Verify KYC",
      },
      {
        permission: "kyc.approve_kyc",
        id: 30,
        has_permission: false,
        display_name: "Approve KYC",
      },
      {
        permission: "kyc.manage_guidelines",
        id: 69,
        has_permission: false,
        display_name: "Manage guidelines",
      },
      {
        permission: "kyc.manage_checklist",
        id: 70,
        has_permission: true,
        display_name: "Manage Checklist",
      },
      {
        permission: "kyc.manage_account_types",
        id: 71,
        has_permission: true,
        display_name: "Manage Account Types",
      },
      {
        permission: "kyc.supervisor",
        id: 31,
        has_permission: true,
        display_name: "Supervisor",
      },
      {
        permission: "kyc.admin",
        id: 64,
        has_permission: true,
        display_name: "KYC Admin",
      },
    ],
  },
};
